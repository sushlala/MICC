type RateLimitEntry = {
  count: number;
  resetTime: number;
};

type RateLimitResult = {
  success: boolean;
  remaining: number;
  reset: number;
};

export function rateLimit({
  interval,
  limit,
}: {
  interval: number;
  limit: number;
}) {
  const cache = new Map<string, RateLimitEntry>();

  return {
    check(key: string): RateLimitResult {
      const now = Date.now();
      const entry = cache.get(key);

      // Clean up expired entries periodically
      if (cache.size > 1000) {
        for (const [k, v] of cache) {
          if (now >= v.resetTime) cache.delete(k);
        }
      }

      if (!entry || now >= entry.resetTime) {
        cache.set(key, { count: 1, resetTime: now + interval });
        return { success: true, remaining: limit - 1, reset: now + interval };
      }

      if (entry.count >= limit) {
        return { success: false, remaining: 0, reset: entry.resetTime };
      }

      entry.count++;
      return {
        success: true,
        remaining: limit - entry.count,
        reset: entry.resetTime,
      };
    },
  };
}
