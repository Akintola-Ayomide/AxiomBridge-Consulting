"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Loader2 } from "lucide-react";
import {
  ENQUIRY_ERROR_MESSAGE,
  ENQUIRY_NETWORK_ERROR,
  ENQUIRY_SUCCESS_MESSAGE,
  getServiceLabel,
  serviceOptions,
} from "@/content/enquiry";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { FormField } from "@/components/forms/form-field";
import { StatusAlert } from "@/components/forms/status-alert";
import {
  getFormSubmitConfig,
  getFormSubmitEndpoint,
  getFormSubmitError,
  isFormSubmitSuccess,
} from "@/lib/formsubmit";
import { siteConfig } from "@/lib/site";
import { enquirySchema, type EnquiryInput } from "@/lib/validation/enquiry";
import { cn } from "@/lib/utils";

type SubmitState =
  | { status: "idle" }
  | { status: "success"; message: string }
  | { status: "error"; message: string };

function describedBy(id: string, error?: string, hasDescription = false) {
  const ids = [
    hasDescription ? `${id}-description` : undefined,
    error ? `${id}-error` : undefined,
  ].filter(Boolean);

  return ids.length ? ids.join(" ") : undefined;
}

type EnquiryFormProps = {
  className?: string;
};

function EnquiryForm({ className }: EnquiryFormProps) {
  const [submitState, setSubmitState] = useState<SubmitState>({ status: "idle" });
  const [isProcessing, setIsProcessing] = useState(false);
  const config = getFormSubmitConfig();

  const form = useForm<EnquiryInput>({
    resolver: zodResolver(enquirySchema),
    mode: "onBlur",
    defaultValues: {
      fullName: "",
      email: "",
      company: "",
      service: "",
      message: "",
      consent: false,
      _honey: "",
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = form;

  const onSubmit = handleSubmit(async (values) => {
    if (isProcessing) {
      return;
    }

    setIsProcessing(true);
    setSubmitState({ status: "idle" });

    try {
      const response = await fetch(getFormSubmitEndpoint(config.recipient), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: values.fullName,
          email: values.email,
          company: values.company,
          service: getServiceLabel(values.service),
          message: values.message,
          _replyto: values.email,
          _subject: config.subject,
          _honey: values._honey,
          ...(config.captcha ? {} : { _captcha: "false" }),
          ...(config.blacklist ? { _blacklist: config.blacklist } : {}),
        }),
      });

      const data: unknown = await response.json().catch(() => null);

      if (!response.ok || !isFormSubmitSuccess(data)) {
        setSubmitState({
          status: "error",
          message: getFormSubmitError(data, ENQUIRY_ERROR_MESSAGE),
        });
        return;
      }

      reset();
      setSubmitState({
        status: "success",
        message: ENQUIRY_SUCCESS_MESSAGE,
      });
    } catch {
      setSubmitState({ status: "error", message: ENQUIRY_NETWORK_ERROR });
    } finally {
      setIsProcessing(false);
    }
  });

  return (
    <Card className={cn("p-6 md:p-8", className)}>
      <form onSubmit={onSubmit} noValidate aria-busy={isSubmitting}>
        {submitState.status === "success" ? (
          <StatusAlert tone="success" title="Enquiry received" className="mb-6">
            {submitState.message}
          </StatusAlert>
        ) : null}

        {submitState.status === "error" ? (
          <StatusAlert tone="error" title="Unable to send enquiry" className="mb-6">
            <p>{submitState.message}</p>
            <p className="mt-1">
              You can email us directly at{" "}
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="font-medium underline decoration-gold/50 underline-offset-2"
              >
                {siteConfig.contact.email}
              </a>
              .
            </p>
          </StatusAlert>
        ) : null}

        <div className="grid gap-5 sm:grid-cols-2">
          <FormField
            id="enquiry-full-name"
            label="Full name"
            required
            error={errors.fullName?.message}
          >
            <Input
              id="enquiry-full-name"
              autoComplete="name"
              placeholder="Your full name"
              aria-invalid={Boolean(errors.fullName)}
              aria-describedby={describedBy("enquiry-full-name", errors.fullName?.message)}
              {...register("fullName")}
            />
          </FormField>

          <FormField
            id="enquiry-email"
            label="Business email"
            required
            error={errors.email?.message}
          >
            <Input
              id="enquiry-email"
              type="email"
              autoComplete="email"
              placeholder="you@company.com"
              aria-invalid={Boolean(errors.email)}
              aria-describedby={describedBy("enquiry-email", errors.email?.message)}
              {...register("email")}
            />
          </FormField>

          <FormField
            id="enquiry-company"
            label="Company name"
            required
            error={errors.company?.message}
          >
            <Input
              id="enquiry-company"
              autoComplete="organization"
              placeholder="Your organisation"
              aria-invalid={Boolean(errors.company)}
              aria-describedby={describedBy("enquiry-company", errors.company?.message)}
              {...register("company")}
            />
          </FormField>

          <FormField
            id="enquiry-service"
            label="Service of interest"
            required
            error={errors.service?.message}
          >
            <Select
              id="enquiry-service"
              defaultValue=""
              aria-invalid={Boolean(errors.service)}
              aria-describedby={describedBy("enquiry-service", errors.service?.message)}
              {...register("service")}
            >
              <option value="" disabled>
                Select a service
              </option>
              {serviceOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
          </FormField>
        </div>

        <FormField
          id="enquiry-message"
          label="Message"
          required
          className="mt-5"
          description="Tell us about your mandate, the decision in front of you and any timing considerations."
          error={errors.message?.message}
        >
          <Textarea
            id="enquiry-message"
            rows={6}
            placeholder="How can our senior advisors help?"
            aria-invalid={Boolean(errors.message)}
            aria-describedby={describedBy(
              "enquiry-message",
              errors.message?.message,
              true,
            )}
            {...register("message")}
          />
        </FormField>

        <div className="mt-6 border-t border-line pt-6">
          <p className="text-body-sm text-slate">
            We use your details only to respond to this enquiry. We do not sell
            or share them. By submitting, you consent to this processing. You
            can withdraw consent at any time by emailing{" "}
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="font-medium text-gold-dark underline decoration-gold/40 underline-offset-2 hover:text-navy"
            >
              {siteConfig.contact.email}
            </a>
            .
          </p>

          <div className="mt-4 flex items-start gap-3">
            <input
              id="enquiry-consent"
              type="checkbox"
              className="mt-1 size-4 shrink-0 rounded-xs border-line-strong accent-navy"
              aria-invalid={Boolean(errors.consent)}
              aria-describedby={describedBy(
                "enquiry-consent",
                errors.consent?.message,
                true,
              )}
              {...register("consent")}
            />
            <div>
              <label
                htmlFor="enquiry-consent"
                className="block font-sans text-body-sm text-charcoal"
              >
                I consent to AxiomBridge Consulting processing my details to
                respond to this enquiry.
                <span aria-hidden="true" className="ml-0.5 text-gold-dark">
                  *
                </span>
              </label>
              <p id="enquiry-consent-description" className="mt-1 text-body-sm text-slate">
                You can withdraw consent at any time by contacting us.
              </p>
              {errors.consent?.message ? (
                <p id="enquiry-consent-error" role="alert" className="mt-1 text-body-sm text-red-700">
                  {errors.consent.message}
                </p>
              ) : null}
            </div>
          </div>
        </div>

        <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
          <label htmlFor="enquiry-honey">Website</label>
          <input
            id="enquiry-honey"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            {...register("_honey")}
          />
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Button type="submit" size="lg" disabled={isSubmitting || isProcessing}>
            {isSubmitting ? (
              <>
                <Loader2 aria-hidden="true" className="animate-spin" />
                Sending enquiry
              </>
            ) : (
              <>
                Send enquiry
                <ArrowRight aria-hidden="true" />
              </>
            )}
          </Button>
          <p className="text-body-sm text-slate">
            Our senior advisors will review your enquiry.
          </p>
        </div>
      </form>
    </Card>
  );
}

export { EnquiryForm };
