import { NextResponse, type NextRequest } from "next/server";
import { ENQUIRY_SUCCESS_MESSAGE } from "@/content/enquiry";
import { getEnquiryEmailConfig } from "@/lib/env.server";
import { EmailDeliveryError, sendEnquiryEmails } from "@/lib/email/enquiry";
import { createRateLimiter, getClientKey } from "@/lib/server/rate-limit";
import { siteConfig } from "@/lib/site";
import { enquirySchema, getEnquiryFieldErrors } from "@/lib/validation/enquiry";

const MAX_BODY_BYTES = 16 * 1024;
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 10 * 60 * 1000;

const limiter = createRateLimiter({
  limit: RATE_LIMIT,
  windowMs: RATE_WINDOW_MS,
});

const NO_STORE = { "Cache-Control": "no-store" } as const;

function json(body: unknown, status: number, headers?: HeadersInit) {
  return NextResponse.json(body, {
    status,
    headers: { ...NO_STORE, ...headers },
  });
}

function failure(message: string, status: number, headers?: HeadersInit) {
  return json({ success: false, message }, status, headers);
}

function isAllowedOrigin(request: NextRequest) {
  const origin = request.headers.get("origin");

  // Same-origin fetches normally include Origin. Browsers block cross-origin
  // application/json POSTs via CORS preflight, but validate it when present.
  if (!origin) return true;

  try {
    return new URL(origin).origin === siteConfig.url.origin;
  } catch {
    return false;
  }
}

function logServerError(event: string, detail?: string | number) {
  console.error("[enquiry]", event, detail ?? "");
}

export async function POST(request: NextRequest) {
  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    return failure("Unsupported content type.", 415);
  }

  if (request.headers.get("x-requested-with") !== "XMLHttpRequest") {
    return failure("Invalid request.", 403);
  }

  if (!isAllowedOrigin(request)) {
    return failure("Invalid request origin.", 403);
  }

  const declaredLength = Number(request.headers.get("content-length") ?? "0");
  if (Number.isFinite(declaredLength) && declaredLength > MAX_BODY_BYTES) {
    return failure("Enquiry is too large.", 413);
  }

  const rate = limiter.check(getClientKey(request));
  if (!rate.allowed) {
    return failure("Too many enquiries. Please try again later.", 429, {
      "Retry-After": String(rate.retryAfterSeconds),
    });
  }

  let rawBody: string;
  try {
    rawBody = await request.text();
  } catch {
    return failure("We could not read your enquiry.", 400);
  }

  if (new TextEncoder().encode(rawBody).byteLength > MAX_BODY_BYTES) {
    return failure("Enquiry is too large.", 413);
  }

  let payload: unknown;
  try {
    payload = JSON.parse(rawBody);
  } catch {
    return failure("Invalid request body.", 400);
  }

  const parsed = enquirySchema.safeParse(payload);
  if (!parsed.success) {
    logServerError("validation_failed");
    return json(
      {
        success: false,
        message: "Please correct the highlighted fields.",
        fieldErrors: getEnquiryFieldErrors(parsed.error),
      },
      400,
    );
  }

  // Honeypot: respond as if the enquiry succeeded, but do not send email.
  if ((parsed.data.website ?? "").trim() !== "") {
    logServerError("spam_dropped");
    return json({ success: true, message: ENQUIRY_SUCCESS_MESSAGE }, 200);
  }

  const config = getEnquiryEmailConfig();
  if (!config) {
    logServerError("email_not_configured");
    return failure("Enquiry service is temporarily unavailable.", 503);
  }

  try {
    await sendEnquiryEmails(parsed.data, config);
  } catch (error) {
    if (error instanceof EmailDeliveryError) {
      logServerError("email_delivery_failed", error.reason);
    } else {
      logServerError(
        "email_delivery_failed",
        error instanceof Error ? error.name : "UnknownError",
      );
    }

    return failure(
      "Your enquiry could not be sent. Please email us directly or try again.",
      502,
    );
  }

  return json({ success: true, message: ENQUIRY_SUCCESS_MESSAGE }, 200);
}
