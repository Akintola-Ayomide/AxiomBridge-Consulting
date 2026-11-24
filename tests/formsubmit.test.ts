import { afterEach, describe, expect, it, vi } from "vitest";
import {
  DEFAULT_FORMSUBMIT_SUBJECT,
  getFormSubmitConfig,
  getFormSubmitEndpoint,
  getFormSubmitError,
  isFormSubmitSuccess,
} from "@/lib/formsubmit";

describe("FormSubmit configuration", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("uses the configured contact email as the default recipient", () => {
    vi.stubEnv("NEXT_PUBLIC_FORMSUBMIT_RECIPIENT", "");
    expect(getFormSubmitConfig().recipient).toBe("contact@axiombridge.com");
  });

  it("uses defaults for optional settings", () => {
    vi.stubEnv("NEXT_PUBLIC_FORMSUBMIT_RECIPIENT", " enquiries@example.com ");
    vi.stubEnv("NEXT_PUBLIC_FORMSUBMIT_SUBJECT", "");
    vi.stubEnv("NEXT_PUBLIC_FORMSUBMIT_CAPTCHA", "");
    vi.stubEnv("NEXT_PUBLIC_FORMSUBMIT_BLACKLIST", "");

    expect(getFormSubmitConfig()).toEqual({
      recipient: "enquiries@example.com",
      subject: DEFAULT_FORMSUBMIT_SUBJECT,
      captcha: true,
      blacklist: undefined,
    });
  });

  it("honours captcha opt-out and blacklist settings", () => {
    vi.stubEnv("NEXT_PUBLIC_FORMSUBMIT_RECIPIENT", "enquiries@example.com");
    vi.stubEnv("NEXT_PUBLIC_FORMSUBMIT_CAPTCHA", "false");
    vi.stubEnv("NEXT_PUBLIC_FORMSUBMIT_BLACKLIST", "viagra, crypto");

    const config = getFormSubmitConfig();
    expect(config?.captcha).toBe(false);
    expect(config?.blacklist).toBe("viagra, crypto");
  });

  it("builds the AJAX endpoint", () => {
    expect(getFormSubmitEndpoint("enquiries@example.com")).toBe(
      "https://formsubmit.co/ajax/enquiries@example.com",
    );
  });
});

describe("FormSubmit response handling", () => {
  it("accepts only explicit success values", () => {
    expect(isFormSubmitSuccess({ success: "true" })).toBe(true);
    expect(isFormSubmitSuccess({ success: true })).toBe(true);
    expect(isFormSubmitSuccess({ success: "false" })).toBe(false);
    expect(isFormSubmitSuccess({ success: false })).toBe(false);
    expect(isFormSubmitSuccess({})).toBe(false);
    expect(isFormSubmitSuccess(null)).toBe(false);
  });

  it("returns a provider message or the supplied fallback", () => {
    expect(getFormSubmitError({ message: "Needs activation" }, "Fallback")).toBe(
      "Needs activation",
    );
    expect(getFormSubmitError({ message: 42 }, "Fallback")).toBe("Fallback");
    expect(getFormSubmitError(null, "Fallback")).toBe("Fallback");
  });
});
