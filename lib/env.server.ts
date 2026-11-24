import "server-only";
import { z } from "zod";

const emailConfigSchema = z.object({
  apiKey: z.string().min(1),
  from: z.email(),
  to: z.email(),
});

export type EnquiryEmailConfig = z.infer<typeof emailConfigSchema>;

/**
 * Reads Resend configuration lazily so missing credentials never break the
 * build. The route handler converts a null result into a generic 503 response.
 */
export function getEnquiryEmailConfig(): EnquiryEmailConfig | null {
  const result = emailConfigSchema.safeParse({
    apiKey: process.env.RESEND_API_KEY?.trim(),
    from: process.env.ENQUIRY_FROM_EMAIL?.trim(),
    to: process.env.ENQUIRY_TO_EMAIL?.trim(),
  });

  return result.success ? result.data : null;
}
