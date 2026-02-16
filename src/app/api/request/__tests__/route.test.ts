import { describe, it, expect, vi, beforeEach } from "vitest";
import { POST } from "../route";

// Mock Sentry so it doesn't error in tests
vi.mock("@sentry/nextjs", () => ({
  captureException: vi.fn(),
}));

// Ensure demo mode (no Supabase env vars)
beforeEach(() => {
  delete process.env.NEXT_PUBLIC_SUPABASE_URL;
  delete process.env.SUPABASE_SERVICE_ROLE_KEY;
});

function validBody() {
  const future = new Date(Date.now() + 72 * 60 * 60 * 1000).toISOString();
  return {
    name: "Jane Doe",
    email: "jane@example.com",
    phone: "1234567890",
    datetime: future,
    location: "Hollywood",
    party_size: 100,
    budget_range: "$5,000 - $10,000",
    pillars: ["immersion"],
    vibe_tags: ["High-Energy"],
  };
}

function makeRequest(body: unknown, ip = "127.0.0.1") {
  return new Request("http://localhost:3000/api/request", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-forwarded-for": ip,
    },
    body: JSON.stringify(body),
  });
}

describe("POST /api/request", () => {
  it("returns success in demo mode with valid data", async () => {
    const res = await POST(makeRequest(validBody()));
    const json = await res.json();
    expect(res.status).toBe(200);
    expect(json.success).toBe(true);
    expect(json.id).toMatch(/^demo-/);
  });

  it("returns 400 for invalid data", async () => {
    const res = await POST(makeRequest({ name: "" }));
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.error).toBe("Validation failed");
  });

  it("returns rate limit headers", async () => {
    const res = await POST(makeRequest(validBody(), "10.0.0.1"));
    expect(res.headers.get("X-RateLimit-Remaining")).toBeDefined();
    expect(res.headers.get("X-RateLimit-Reset")).toBeDefined();
  });

  it("returns 429 after exceeding rate limit", async () => {
    const ip = "10.0.0.99";
    // Fire 5 requests to exhaust the limit
    for (let i = 0; i < 5; i++) {
      await POST(makeRequest(validBody(), ip));
    }
    // 6th should be rate limited
    const res = await POST(makeRequest(validBody(), ip));
    expect(res.status).toBe(429);
    const json = await res.json();
    expect(json.error).toMatch(/too many requests/i);
  });
});
