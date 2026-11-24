// @vitest-environment jsdom
import type { ReactNode } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { EnquiryForm } from "@/components/forms/enquiry-form";

vi.mock("next/link", () => ({
  default: ({
    children,
    ...props
  }: { children: ReactNode } & Record<string, unknown>) => (
    <a {...props}>{children}</a>
  ),
}));

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

describe("EnquiryForm", () => {
  beforeEach(() => {
    fetchMock.mockReset();
    vi.stubGlobal("fetch", fetchMock);
  });

  afterEach(() => {
    cleanup();
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

  it("shows loading and success states, then resets the form", async () => {
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
      json: async () => ({ success: true, message: "Thanks for getting in touch." }),
    });

    expect(await screen.findByText("Thanks for getting in touch.")).toBeInTheDocument();
    expect(screen.getByRole("status")).toHaveTextContent("Enquiry received");
    expect(screen.getByLabelText(/Full name/i)).toHaveValue("");

    const [, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    const body = JSON.parse(init.body as string) as Record<string, unknown>;
    expect(body.website).toBe("");
    expect(body.consent).toBe(true);
  });

  it("shows a server error and maps field errors back to inputs", async () => {
    fetchMock.mockResolvedValue({
      ok: false,
      json: async () => ({
        success: false,
        message: "Please correct the highlighted fields.",
        fieldErrors: { email: ["Enter a valid business email address."] },
      }),
    });

    const user = userEvent.setup();
    render(<EnquiryForm />);
    await fillValidForm(user);
    await user.click(screen.getByRole("button", { name: /send enquiry/i }));

    expect(await screen.findByText("Unable to send enquiry")).toBeInTheDocument();
    expect(screen.getByText("Please correct the highlighted fields.")).toBeInTheDocument();
    expect(screen.getByLabelText(/Business email/i)).toHaveAttribute("aria-invalid", "true");
  });
});
