import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";

type SendPayload = Record<string, string>;
type SendResult = { data: { id: string } | null; error: unknown | null };

const { sendMock } = vi.hoisted(() => ({
  sendMock: vi.fn<(payload: SendPayload) => Promise<SendResult>>(),
}));

vi.mock("resend", () => ({
  Resend: class {
    emails = { send: sendMock };
  },
}));

async function loadRoute() {
  vi.resetModules();
  return import("@/app/api/enquiries/route");
}

function makeRequest(body: unknown, overrides: Record<string, string> = {}) {
  const headers: Record<string, string> = {
    "content-type": "application/json",
    "x-requested-with": "XMLHttpRequest",
    origin: "http://localhost:3000",
    ...overrides,
  };

  return new NextRequest("http://localhost:3000/api/enquiries", {
    method: "POST",
    headers,
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

const validEnquiry = {
  fullName: "Ada Lovelace",
  email: "ada@example.com",
  company: "Example Industries",
  service: "business-strategy-advisory",
  message: "We need support entering the West African market and building a three-year strategy.",
  consent: true,
  website: "",
};

describe("POST /api/enquiries", () => {
  beforeEach(() => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "http://localhost:3000");
    vi.stubEnv("NEXT_PUBLIC_CONTACT_EMAIL", "contact@example.com");
    vi.stubEnv("NEXT_PUBLIC_CONTACT_PHONE", "+234 1 800 2946");
    vi.stubEnv("RESEND_API_KEY", "test-key");
    vi.stubEnv("ENQUIRY_FROM_EMAIL", "sender@example.com");
    vi.stubEnv("ENQUIRY_TO_EMAIL", "enquiries@example.com");

    sendMock.mockReset();
    sendMock.mockResolvedValue({ data: { id: "email_1" }, error: null });

    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("sends a valid enquiry and returns success", async () => {
    const { POST } = await loadRoute();
    const response = await POST(makeRequest(validEnquiry));

    expect(response.status).toBe(200);
    expect(await response.json()).toMatchObject({ success: true });
    expect(sendMock).toHaveBeenCalledTimes(2);

    const [notification, confirmation] = sendMock.mock.calls.map((call) => call[0]);
    expect(notification.to).toBe("enquiries@example.com");
    expect(notification.replyTo).toBe("ada@example.com");
    expect(confirmation.to).toBe("ada@example.com");
    expect(confirmation.replyTo).toBe("enquiries@example.com");
    expect(response.headers.get("cache-control")).toBe("no-store");
  });

  it("rejects invalid field values without echoing them", async () => {
    const { POST } = await loadRoute();
    const response = await POST(
      makeRequest({
        ...validEnquiry,
        email: "not-an-email",
        service: "unknown-service",
        message: "short",
        consent: false,
      }),
    );

    expect(response.status).toBe(400);
    const body = await response.text();
    expect(body).toContain("fieldErrors");
    expect(body).not.toContain("not-an-email");
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("reports all missing fields", async () => {
    const { POST } = await loadRoute();
    const response = await POST(makeRequest({}));

    expect(response.status).toBe(400);
    const data = (await response.json()) as { fieldErrors: Record<string, string[]> };
    expect(Object.keys(data.fieldErrors).sort()).toEqual(
      ["company", "consent", "email", "fullName", "message", "service"].sort(),
    );
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("silently drops honeypot submissions", async () => {
    const { POST } = await loadRoute();
    const response = await POST(
      makeRequest({ ...validEnquiry, website: "https://spam.example" }),
    );

    expect(response.status).toBe(200);
    expect(await response.json()).toMatchObject({ success: true });
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("rate limits repeated submissions", async () => {
    const { POST } = await loadRoute();

    for (let index = 0; index < 5; index += 1) {
      const response = await POST(makeRequest(validEnquiry));
      expect(response.status).toBe(200);
    }

    const limited = await POST(makeRequest(validEnquiry));
    expect(limited.status).toBe(429);
    expect(limited.headers.get("retry-after")).toBeTruthy();
    // Two emails are sent per accepted enquiry: notification + confirmation.
    expect(sendMock).toHaveBeenCalledTimes(10);
  });

  it("returns a generic error and redacted logs when email delivery fails", async () => {
    sendMock.mockRejectedValue(new Error("secret api key ADA@EXAMPLE.COM"));
    const { POST } = await loadRoute();

    const response = await POST(makeRequest(validEnquiry));

    expect(response.status).toBe(502);
    const body = await response.text();
    expect(body).not.toContain("secret api key");
    expect(body).not.toContain("ada@example.com");

    const logged = JSON.stringify(vi.mocked(console.error).mock.calls);
    expect(logged).toContain("email_delivery_failed");
    expect(logged).not.toContain("secret api key");
    expect(logged).not.toContain("ada@example.com");
  });

  it("returns 503 when email configuration is missing", async () => {
    vi.stubEnv("RESEND_API_KEY", "");
    const { POST } = await loadRoute();

    const response = await POST(makeRequest(validEnquiry));

    expect(response.status).toBe(503);
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("rejects unsafe request shapes", async () => {
    const { POST } = await loadRoute();

    expect(
      (await POST(makeRequest(validEnquiry, { "content-type": "text/plain" }))).status,
    ).toBe(415);
    expect(
      (await POST(makeRequest(validEnquiry, { origin: "https://evil.example" }))).status,
    ).toBe(403);
    expect(
      (await POST(makeRequest(validEnquiry, { "x-requested-with": "" }))).status,
    ).toBe(403);
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("rejects oversized bodies", async () => {
    const { POST } = await loadRoute();
    const response = await POST(makeRequest("x".repeat(17 * 1024)));

    expect(response.status).toBe(413);
    expect(sendMock).not.toHaveBeenCalled();
  });
});
