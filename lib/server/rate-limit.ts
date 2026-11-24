import { createHash, randomBytes } from "node:crypto";

type RateLimitResult = {
  allowed: boolean;
  remaining: number;
  retryAfterSeconds: number;
};

type RateLimiterOptions = {
  limit: number;
  windowMs: number;
  now?: () => number;
};

type RateLimiter = {
  check: (key: string) => RateLimitResult;
  reset: () => void;
};

/**
 * Small in-process sliding-window limiter. Suitable for a single instance.
 * Replace with a shared store (for example Redis) when running multiple
 * serverless instances; the public API is intentionally minimal.
 */
export function createRateLimiter({
  limit,
  windowMs,
  now = Date.now,
}: RateLimiterOptions): RateLimiter {
  const hits = new Map<string, { count: number; resetAt: number }>();

  return {
    check(key) {
      const current = now();
      const entry = hits.get(key);

      if (!entry || current >= entry.resetAt) {
        hits.set(key, { count: 1, resetAt: current + windowMs });
        prune(current);
        return { allowed: true, remaining: limit - 1, retryAfterSeconds: 0 };
      }

      if (entry.count >= limit) {
        return {
          allowed: false,
          remaining: 0,
          retryAfterSeconds: Math.max(1, Math.ceil((entry.resetAt - current) / 1000)),
        };
      }

      entry.count += 1;
      return {
        allowed: true,
        remaining: Math.max(0, limit - entry.count),
        retryAfterSeconds: 0,
      };
    },

    reset() {
      hits.clear();
    },
  };

  function prune(current: number) {
    if (hits.size < 1000) return;

    for (const [key, value] of hits) {
      if (current >= value.resetAt) hits.delete(key);
    }
  }
}

const clientSalt = randomBytes(16).toString("hex");

/** Derives a pseudonymous limiter key without retaining the raw IP address. */
export function getClientKey(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  const ip =
    forwarded?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip")?.trim() ||
    request.headers.get("cf-connecting-ip")?.trim() ||
    "unknown";

  return createHash("sha256").update(`${clientSalt}:${ip}`).digest("hex");
}
