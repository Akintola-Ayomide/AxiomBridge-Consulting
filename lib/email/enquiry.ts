import { Resend } from "resend";
import { getServiceLabel } from "@/content/enquiry";
import type { EnquiryEmailConfig } from "@/lib/env.server";
import type { EnquiryInput } from "@/lib/validation/enquiry";
import { escapeHtml } from "@/lib/email/escape";
import { siteConfig } from "@/lib/site";

type SendPayload = {
  from: string;
  to: string;
  replyTo: string;
  subject: string;
  text: string;
  html: string;
};

type SendResult = {
  data: { id: string } | null;
  error: unknown | null;
};

type EmailClient = {
  emails: {
    send: (payload: SendPayload) => Promise<SendResult>;
  };
};

export class EmailDeliveryError extends Error {
  constructor(public readonly reason: string) {
    super("Enquiry email delivery failed.");
    this.name = "EmailDeliveryError";
  }
}

function buildNotification(input: EnquiryInput) {
  const service = getServiceLabel(input.service);
  const text = [
    "New website enquiry",
    "",
    `Name: ${input.fullName}`,
    `Email: ${input.email}`,
    `Company: ${input.company}`,
    `Service: ${service}`,
    `Submitted: ${new Date().toISOString()}`,
    "",
    "Message:",
    input.message,
  ].join("\n");

  const html = `
    <div style="font-family:Arial,sans-serif;color:#202a36;line-height:1.6">
      <h2 style="color:#101c32">New website enquiry</h2>
      <p><strong>Name:</strong> ${escapeHtml(input.fullName)}</p>
      <p><strong>Email:</strong> ${escapeHtml(input.email)}</p>
      <p><strong>Company:</strong> ${escapeHtml(input.company)}</p>
      <p><strong>Service:</strong> ${escapeHtml(service)}</p>
      <p><strong>Submitted:</strong> ${new Date().toISOString()}</p>
      <h3 style="color:#101c32;margin-top:24px">Message</h3>
      <p style="white-space:pre-wrap">${escapeHtml(input.message)}</p>
    </div>
  `.trim();

  return { text, html };
}

function buildConfirmation(input: EnquiryInput) {
  const service = getServiceLabel(input.service);
  const text = [
    `Hi ${input.fullName},`,
    "",
    `Thank you for contacting ${siteConfig.name}. We have received your enquiry about ${service}.`,
    "",
    "A senior advisor will review your message and respond to this email address.",
    "",
    "If you need to add anything urgent, please reply to this email.",
    "",
    `— ${siteConfig.name} ${siteConfig.consulting}`,
  ].join("\n");

  const html = `
    <div style="font-family:Arial,sans-serif;color:#202a36;line-height:1.6">
      <h2 style="color:#101c32">Thank you for your enquiry</h2>
      <p>Hi ${escapeHtml(input.fullName)},</p>
      <p>
        Thank you for contacting ${escapeHtml(siteConfig.name)}. We have received
        your enquiry about <strong>${escapeHtml(service)}</strong>.
      </p>
      <p>A senior advisor will review your message and respond to this email address.</p>
      <p>If you need to add anything urgent, please reply to this email.</p>
      <p>— ${escapeHtml(siteConfig.name)} ${escapeHtml(siteConfig.consulting)}</p>
    </div>
  `.trim();

  return { text, html };
}

export async function sendEnquiryEmails(
  input: EnquiryInput,
  config: EnquiryEmailConfig,
  client?: EmailClient,
) {
  const resend = (client ?? new Resend(config.apiKey)) as unknown as EmailClient;
  const notification = buildNotification(input);
  const confirmation = buildConfirmation(input);

  const deliveries: Array<{ label: "Notification" | "Confirmation"; payload: SendPayload }> = [
    {
      label: "Notification",
      payload: {
        from: config.from,
        to: config.to,
        replyTo: input.email,
        subject: `New website enquiry — ${siteConfig.name}`,
        text: notification.text,
        html: notification.html,
      },
    },
    {
      label: "Confirmation",
      payload: {
        from: config.from,
        to: input.email,
        replyTo: config.to,
        subject: `We've received your ${siteConfig.name} enquiry`,
        text: confirmation.text,
        html: confirmation.html,
      },
    },
  ];

  const results = await Promise.allSettled(
    deliveries.map((delivery) => resend.emails.send(delivery.payload)),
  );

  const reasons: string[] = [];

  results.forEach((result, index) => {
    const label = deliveries[index]?.label ?? "Email";

    if (result.status === "rejected") {
      reasons.push(`${label} request failed`);
      return;
    }

    if (result.value.error) {
      reasons.push(`${label} rejected by provider`);
    }
  });

  if (reasons.length > 0) {
    throw new EmailDeliveryError(reasons.join("; "));
  }

  return {
    notificationId:
      results[0]?.status === "fulfilled" ? (results[0].value.data?.id ?? null) : null,
    confirmationId:
      results[1]?.status === "fulfilled" ? (results[1].value.data?.id ?? null) : null,
  };
}
