import { z } from "zod";
import { SERVICE_VALUES, type ServiceValue } from "@/content/enquiry";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const enquirySchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, { error: "Enter your full name." })
    .max(100, { error: "Full name must be 100 characters or fewer." }),

  email: z
    .string()
    .trim()
    .min(3, { error: "Enter your business email address." })
    .max(254, { error: "Email address must be 254 characters or fewer." })
    .refine((value) => EMAIL_PATTERN.test(value), {
      error: "Enter a valid business email address.",
    }),

  company: z
    .string()
    .trim()
    .min(2, { error: "Enter your company name." })
    .max(120, { error: "Company name must be 120 characters or fewer." }),

  service: z
    .string()
    .min(1, { error: "Select a service of interest." })
    .refine((value) => SERVICE_VALUES.includes(value as ServiceValue), {
      error: "Select a valid service of interest.",
    }),

  message: z
    .string()
    .trim()
    .min(20, { error: "Tell us a little more (at least 20 characters)." })
    .max(5000, { error: "Message must be 5,000 characters or fewer." }),

  consent: z.boolean().refine((value) => value === true, {
    error: "You must consent before submitting an enquiry.",
  }),

  // Honeypot field. Bots tend to fill every input; real users never see it.
  website: z.string().max(200).optional(),
});

export type EnquiryInput = z.infer<typeof enquirySchema>;
export type EnquiryFieldErrors = Partial<Record<keyof EnquiryInput, string[]>>;

export function getEnquiryFieldErrors(
  error: z.ZodError<EnquiryInput>,
): EnquiryFieldErrors {
  return error.flatten().fieldErrors as EnquiryFieldErrors;
}
