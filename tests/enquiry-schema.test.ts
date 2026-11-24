import { describe, expect, it } from "vitest";
import {
  enquirySchema,
  getEnquiryFieldErrors,
} from "@/lib/validation/enquiry";

const validEnquiry = {
  fullName: "Ada Lovelace",
  email: "ada@example.com",
  company: "Example Industries",
  service: "business-strategy-advisory",
  message: "We need support entering the West African market and building a three-year strategy.",
  consent: true,
  _honey: "",
};

describe("enquirySchema", () => {
  it("accepts a complete enquiry", () => {
    const result = enquirySchema.safeParse(validEnquiry);

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.email).toBe("ada@example.com");
      expect(result.data._honey).toBe("");
    }
  });

  it("reports every missing required field", () => {
    const result = enquirySchema.safeParse({});

    expect(result.success).toBe(false);
    if (!result.success) {
      const errors = getEnquiryFieldErrors(result.error);
      expect(Object.keys(errors).sort()).toEqual(
        ["company", "consent", "email", "fullName", "message", "service"].sort(),
      );
    }
  });

  it("rejects malformed email, unknown service, short message and missing consent", () => {
    const result = enquirySchema.safeParse({
      ...validEnquiry,
      email: "not-an-email",
      service: "unknown-service",
      message: "Too short",
      consent: false,
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      const errors = getEnquiryFieldErrors(result.error);
      expect(errors.email?.[0]).toMatch(/valid business email/i);
      expect(errors.service?.[0]).toMatch(/valid service/i);
      expect(errors.message?.[0]).toMatch(/at least 20 characters/i);
      expect(errors.consent?.[0]).toMatch(/consent/i);
    }
  });

  it("trims whitespace before validating", () => {
    const result = enquirySchema.safeParse({
      ...validEnquiry,
      fullName: "  Ada Lovelace  ",
      message: `  ${validEnquiry.message}  `,
    });

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.fullName).toBe("Ada Lovelace");
      expect(result.data.message).toBe(validEnquiry.message);
    }
  });

  it("rejects an overlong message", () => {
    const result = enquirySchema.safeParse({
      ...validEnquiry,
      message: "a".repeat(5001),
    });

    expect(result.success).toBe(false);
  });
});
