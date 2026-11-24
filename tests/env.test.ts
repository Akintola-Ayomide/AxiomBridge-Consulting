import { afterEach, describe, expect, it, vi } from "vitest";

async function readEnv() {
  vi.resetModules();
  return import("@/lib/env");
}

describe("site URL resolution", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.resetModules();
  });

  it("prefers an explicit site URL", async () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://www.example.com");
    vi.stubEnv("VERCEL_URL", "axiombridge-git-main.vercel.app");

    const { env } = await readEnv();
    expect(env.siteUrl.toString()).toBe("https://www.example.com/");
  });

  it("uses the automatic Vercel URL when no custom URL is set", async () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "");
    vi.stubEnv("VERCEL_URL", "axiombridge-git-main.vercel.app");

    const { env } = await readEnv();
    expect(env.siteUrl.toString()).toBe(
      "https://axiombridge-git-main.vercel.app/",
    );
  });

  it("falls back to localhost outside Vercel", async () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "");
    vi.stubEnv("VERCEL_URL", "");

    const { env } = await readEnv();
    expect(env.siteUrl.toString()).toBe("http://localhost:3000/");
  });
});
