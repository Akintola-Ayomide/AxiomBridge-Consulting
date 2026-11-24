export const DEFAULT_FORMSUBMIT_SUBJECT = "New website enquiry — AxiomBridge Consulting";

export type FormSubmitConfig = {
  recipient: string;
  subject: string;
  captcha: boolean;
  blacklist?: string;
};

/** Reads public FormSubmit settings. Returns null until a recipient is configured. */
export function getFormSubmitConfig(): FormSubmitConfig | null {
  const recipient = process.env.NEXT_PUBLIC_FORMSUBMIT_RECIPIENT?.replace(/\s/g, "");

  if (!recipient) {
    return null;
  }

  const blacklist = process.env.NEXT_PUBLIC_FORMSUBMIT_BLACKLIST?.trim();

  return {
    recipient,
    subject:
      process.env.NEXT_PUBLIC_FORMSUBMIT_SUBJECT?.trim() || DEFAULT_FORMSUBMIT_SUBJECT,
    captcha:
      process.env.NEXT_PUBLIC_FORMSUBMIT_CAPTCHA?.trim().toLowerCase() !== "false",
    blacklist: blacklist || undefined,
  };
}

export function getFormSubmitEndpoint(recipient: string) {
  return `https://formsubmit.co/ajax/${recipient.replace(/\s/g, "")}`;
}

/**
 * FormSubmit returns HTTP 200 even for rejected submissions, and uses the
 * string "true" on success. Never use truthiness on `success` here.
 */
export function isFormSubmitSuccess(payload: unknown) {
  if (!payload || typeof payload !== "object") {
    return false;
  }

  const success = (payload as { success?: unknown }).success;
  return success === true || success === "true";
}

export function getFormSubmitError(payload: unknown, fallback: string) {
  if (payload && typeof payload === "object") {
    const message = (payload as { message?: unknown }).message;

    if (typeof message === "string" && message.trim()) {
      return message.trim();
    }
  }

  return fallback;
}
