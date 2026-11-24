import { describe, expect, it } from "vitest";
import { createRateLimiter } from "@/lib/server/rate-limit";

describe("createRateLimiter", () => {
  it("allows requests up to the limit, then blocks with retry information", () => {
    let now = 0;
    const limiter = createRateLimiter({ limit: 2, windowMs: 1000, now: () => now });

    expect(limiter.check("client")).toMatchObject({ allowed: true, remaining: 1 });
    expect(limiter.check("client")).toMatchObject({ allowed: true, remaining: 0 });
    expect(limiter.check("client")).toMatchObject({
      allowed: false,
      remaining: 0,
      retryAfterSeconds: 1,
    });

    now = 500;
    expect(limiter.check("client")).toMatchObject({
      allowed: false,
      retryAfterSeconds: 1,
    });

    now = 1001;
    expect(limiter.check("client")).toMatchObject({ allowed: true, remaining: 1 });
  });

  it("tracks clients independently and can be reset", () => {
    const limiter = createRateLimiter({ limit: 1, windowMs: 60_000, now: () => 0 });

    expect(limiter.check("a").allowed).toBe(true);
    expect(limiter.check("a").allowed).toBe(false);
    expect(limiter.check("b").allowed).toBe(true);

    limiter.reset();
    expect(limiter.check("a").allowed).toBe(true);
  });

  it("does not throw for empty keys", () => {
    const limiter = createRateLimiter({ limit: 1, windowMs: 60_000 });
    expect(() => limiter.check("")).not.toThrow();
  });
});
