import { describe, it, expect } from "vitest";
import { requestFormSchema } from "../validations";

function validInput() {
  const future = new Date(Date.now() + 72 * 60 * 60 * 1000).toISOString();
  return {
    name: "John Doe",
    email: "john@example.com",
    phone: "1234567890",
    datetime: future,
    location: "Los Angeles",
    party_size: 50,
    budget_range: "$5,000 - $10,000",
    pillars: ["moments"],
    vibe_tags: ["Upscale"],
  };
}

describe("requestFormSchema", () => {
  it("accepts valid input", () => {
    const result = requestFormSchema.safeParse(validInput());
    expect(result.success).toBe(true);
  });

  it("accepts valid input with optional notes", () => {
    const result = requestFormSchema.safeParse({
      ...validInput(),
      notes: "VIP area needed",
    });
    expect(result.success).toBe(true);
  });

  it("rejects name shorter than 2 characters", () => {
    const result = requestFormSchema.safeParse({ ...validInput(), name: "J" });
    expect(result.success).toBe(false);
  });

  it("rejects invalid email", () => {
    const result = requestFormSchema.safeParse({
      ...validInput(),
      email: "not-an-email",
    });
    expect(result.success).toBe(false);
  });

  it("rejects short phone number", () => {
    const result = requestFormSchema.safeParse({
      ...validInput(),
      phone: "123",
    });
    expect(result.success).toBe(false);
  });

  it("rejects datetime less than 48 hours from now", () => {
    const tooSoon = new Date(Date.now() + 1 * 60 * 60 * 1000).toISOString();
    const result = requestFormSchema.safeParse({
      ...validInput(),
      datetime: tooSoon,
    });
    expect(result.success).toBe(false);
  });

  it("rejects party_size of 0", () => {
    const result = requestFormSchema.safeParse({
      ...validInput(),
      party_size: 0,
    });
    expect(result.success).toBe(false);
  });

  it("rejects party_size over 10000", () => {
    const result = requestFormSchema.safeParse({
      ...validInput(),
      party_size: 10001,
    });
    expect(result.success).toBe(false);
  });

  it("rejects empty pillars array", () => {
    const result = requestFormSchema.safeParse({
      ...validInput(),
      pillars: [],
    });
    expect(result.success).toBe(false);
  });

  it("allows empty vibe_tags array", () => {
    const result = requestFormSchema.safeParse({
      ...validInput(),
      vibe_tags: [],
    });
    expect(result.success).toBe(true);
  });

  it("rejects missing budget_range", () => {
    const result = requestFormSchema.safeParse({
      ...validInput(),
      budget_range: "",
    });
    expect(result.success).toBe(false);
  });
});
