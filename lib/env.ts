const DEFAULT_CONTACT_EMAIL = "contact@axiombridge.com";
const DEFAULT_CONTACT_PHONE = "+234 1 800 2946";
const LOCAL_FALLBACK = "http://localhost:3000";

function readSiteUrl(): URL {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  const vercelUrl = process.env.VERCEL_URL?.trim();
  const value = explicit || (vercelUrl ? `https://${vercelUrl}` : LOCAL_FALLBACK);

  try {
    const url = new URL(value);

    if (!["http:", "https:"].includes(url.protocol)) {
      throw new Error("Unsupported protocol");
    }

    return url;
  } catch {
    if (explicit) {
      throw new Error(
        "NEXT_PUBLIC_SITE_URL must be a valid absolute URL, for example https://axiombridge.com.",
      );
    }

    return new URL(LOCAL_FALLBACK);
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
 * Public environment values. Vercel's automatic `VERCEL_URL` is used when no
 * explicit site URL is set, so a custom domain is never required.
 */
export const env = {
  siteUrl: readSiteUrl(),
  contactEmail: readEmail(),
  contactPhone: readPhone(),
  linkedinUrl: readLinkedInUrl(),
} as const;
