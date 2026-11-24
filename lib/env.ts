const DEFAULT_CONTACT_EMAIL = "contact@axiombridge.com";
const DEFAULT_CONTACT_PHONE = "+234 1 800 2946";

function readSiteUrl(): URL {
  const value = process.env.NEXT_PUBLIC_SITE_URL?.trim();

  if (!value) {
    if (process.env.NODE_ENV === "production") {
      throw new Error(
        "NEXT_PUBLIC_SITE_URL is required in production. Add it to your environment before building.",
      );
    }

    return new URL("http://localhost:3000");
  }

  try {
    const url = new URL(value);

    if (!["http:", "https:"].includes(url.protocol)) {
      throw new Error("Unsupported protocol");
    }

    return url;
  } catch {
    throw new Error(
      "NEXT_PUBLIC_SITE_URL must be a valid absolute URL, for example https://axiombridge.com.",
    );
  }
}

function readEmail(): string {
  const value =
    process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || DEFAULT_CONTACT_EMAIL;

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    throw new Error("NEXT_PUBLIC_CONTACT_EMAIL must be a valid email address.");
  }

  return value;
}

function readPhone(): string {
  return process.env.NEXT_PUBLIC_CONTACT_PHONE?.trim() || DEFAULT_CONTACT_PHONE;
}

function readLinkedInUrl(): URL | null {
  const value = process.env.NEXT_PUBLIC_LINKEDIN_URL?.trim();

  if (!value) {
    return null;
  }

  try {
    const url = new URL(value);

    if (!["http:", "https:"].includes(url.protocol)) {
      throw new Error("Unsupported protocol");
    }

    return url;
  } catch {
    throw new Error(
      "NEXT_PUBLIC_LINKEDIN_URL must be a valid absolute URL, or left blank.",
    );
  }
}

/**
 * Public environment values. These are bundled into the client on purpose.
 * Server-only secrets belong in a separate module that imports "server-only".
 */
export const env = {
  siteUrl: readSiteUrl(),
  contactEmail: readEmail(),
  contactPhone: readPhone(),
  linkedinUrl: readLinkedInUrl(),
} as const;
