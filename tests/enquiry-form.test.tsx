// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  ENQUIRY_NETWORK_ERROR,
  ENQUIRY_SUCCESS_MESSAGE,
} from "@/content/enquiry";
import { EnquiryForm } from "@/components/forms/enquiry-form";

const fetchMock = vi.fn();

async function fillValidForm(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText(/Full name/i), "Ada Lovelace");
  await user.type(screen.getByLabelText(/Business email/i), "ada@example.com");
  await user.type(screen.getByLabelText(/Company name/i), "Example Industries");
  await user.selectOptions(
    screen.getByLabelText(/Service of interest/i),
    "business-strategy-advisory",
  );
  await user.type(
    screen.getByLabelText(/^Message/i),
    "We need support entering the West African market and building a three-year strategy.",
  );
  await user.click(screen.getByLabelText(/I consent/i));
}

describe("EnquiryForm with FormSubmit", () => {
  beforeEach(() => {
    fetchMock.mockReset();
    vi.stubGlobal("fetch", fetchMock);
    vi.stubEnv("NEXT_PUBLIC_FORMSUBMIT_RECIPIENT", "enquiries@example.com");
    vi.stubEnv("NEXT_PUBLIC_FORMSUBMIT_SUBJECT", "New website enquiry");
    vi.stubEnv("NEXT_PUBLIC_FORMSUBMIT_CAPTCHA", "true");
    vi.stubEnv("NEXT_PUBLIC_FORMSUBMIT_BLACKLIST", "");
  });

  afterEach(() => {
    cleanup();
    vi.unstubAllEnvs();
  });

  it("shows validation errors for missing fields", async () => {
    const user = userEvent.setup();
    render(<EnquiryForm />);

    await user.click(screen.getByRole("button", { name: /send enquiry/i }));

    expect(await screen.findByText("Enter your full name.")).toBeInTheDocument();
    expect(screen.getByText("Enter your business email address.")).toBeInTheDocument();
    expect(screen.getByText("Select a service of interest.")).toBeInTheDocument();
    expect(
      screen.getByText("You must consent before submitting an enquiry."),
    ).toBeInTheDocument();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("posts to FormSubmit with loading and success states", async () => {
    let resolveFetch!: (value: unknown) => void;
    fetchMock.mockImplementation(
      () => new Promise((resolve) => { resolveFetch = resolve; }),
    );

    const user = userEvent.setup();
    render(<EnquiryForm />);
    await fillValidForm(user);
    await user.click(screen.getByRole("button", { name: /send enquiry/i }));

    expect(screen.getByRole("button", { name: /sending enquiry/i })).toBeDisabled();

    resolveFetch({
      ok: true,
      json: async () => ({ success: "true", message: "Form was submitted successfully." }),
    });

    expect(await screen.findByText(ENQUIRY_SUCCESS_MESSAGE)).toBeInTheDocument();
    expect(screen.getByLabelText(/Full name/i)).toHaveValue("");

    const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    const payload = JSON.parse(init.body as string) as Record<string, unknown>;

    expect(url).toBe("https://formsubmit.co/ajax/enquiries@example.com");
    expect(init.headers).toMatchObject({
      "Content-Type": "application/json",
      Accept: "application/json",
    });
    expect(payload).toMatchObject({
      name: "Ada Lovelace",
      email: "ada@example.com",
      company: "Example Industries",
      service: "Business Strategy & Advisory",
      _replyto: "ada@example.com",
      _subject: "New website enquiry",
      _honey: "",
    });
    expect(payload).not.toHaveProperty("_captcha");
  });

  it("treats HTTP 200 with success false as an error", async () => {
    fetchMock.mockResolvedValue({
      ok: true,
      json: async () => ({ success: "false", message: "This form needs activation." }),
    });

    const user = userEvent.setup();
    render(<EnquiryForm />);
    await fillValidForm(user);
    await user.click(screen.getByRole("button", { name: /send enquiry/i }));

    expect(await screen.findByText("Unable to send enquiry")).toBeInTheDocument();
    expect(screen.getByText("This form needs activation.")).toBeInTheDocument();
    expect(screen.getByLabelText(/Full name/i)).toHaveValue("Ada Lovelace");
  });

  it("shows a network error when the request fails", async () => {
    fetchMock.mockRejectedValue(new Error("offline"));

    const user = userEvent.setup();
    render(<EnquiryForm />);
    await fillValidForm(user);
    await user.click(screen.getByRole("button", { name: /send enquiry/i }));

    expect(await screen.findByText(ENQUIRY_NETWORK_ERROR)).toBeInTheDocument();
  });

  it("disables submission and explains missing configuration", async () => {
    vi.stubEnv("NEXT_PUBLIC_FORMSUBMIT_RECIPIENT", "");
    const user = userEvent.setup();
    render(<EnquiryForm />);

    expect(screen.getByText("Delivery not configured")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /send enquiry/i })).toBeDisabled();

    await fillValidForm(user);
    expect(fetchMock).not.toHaveBeenCalled();
  });
});
