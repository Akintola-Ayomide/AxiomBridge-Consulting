import { describe, expect, it, vi } from "vitest";
import { EmailDeliveryError, sendEnquiryEmails } from "@/lib/email/enquiry";
import { escapeHtml } from "@/lib/email/escape";
import type { EnquiryInput } from "@/lib/validation/enquiry";

const config = {
  apiKey: "test-key",
  from: "sender@example.com",
  to: "enquiries@example.com",
};

const input: EnquiryInput = {
  fullName: "Ada Lovelace",
  email: "ada@example.com",
  company: "Example Industries",
  service: "business-strategy-advisory",
  message: 'Please contact me <script>alert("x")</script> about & growth.',
  consent: true,
  website: "",
};

describe("escapeHtml", () => {
  it("escapes characters that are meaningful in HTML", () => {
    expect(escapeHtml('<a href="x">Tom & Jerry</a>')).toBe(
      "&lt;a href=&quot;x&quot;&gt;Tom &amp; Jerry&lt;/a&gt;",
    );
  });
});

describe("sendEnquiryEmails", () => {
  it("sends a notification and a confirmation with escaped user content", async () => {
    const send = vi.fn().mockResolvedValue({ data: { id: "email_123" }, error: null });
    const result = await sendEnquiryEmails(input, config, { emails: { send } });

    expect(send).toHaveBeenCalledTimes(2);
    expect(result).toEqual({ notificationId: "email_123", confirmationId: "email_123" });

    const [notification, confirmation] = send.mock.calls.map((call) => call[0]);
    expect(notification.to).toBe(config.to);
    expect(notification.replyTo).toBe(input.email);
    expect(confirmation.to).toBe(input.email);
    expect(confirmation.replyTo).toBe(config.to);

    expect(notification.html).toContain("&lt;script&gt;");
    expect(notification.html).not.toContain("<script>");
    expect(notification.html).toContain("&amp; growth.");
  });

  it("throws a safe error when the provider rejects an email", async () => {
    const send = vi.fn().mockResolvedValue({ data: null, error: { message: "rejected" } });

    await expect(
      sendEnquiryEmails(input, config, { emails: { send } }),
    ).rejects.toBeInstanceOf(EmailDeliveryError);

    await expect(
      sendEnquiryEmails(input, config, { emails: { send } }),
    ).rejects.toMatchObject({
      reason: expect.stringContaining("rejected by provider"),
    });
  });

  it("throws a safe error when the email request fails", async () => {
    const send = vi.fn().mockRejectedValue(new Error("network failure with api key"));

    await expect(
      sendEnquiryEmails(input, config, { emails: { send } }),
    ).rejects.toMatchObject({
      reason: expect.stringContaining("request failed"),
    });
  });
});
