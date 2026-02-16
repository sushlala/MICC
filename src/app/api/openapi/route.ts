import { NextResponse } from "next/server";
import { BUDGET_RANGES, PILLARS, VIBE_TAGS } from "@/lib/constants";

const spec = {
  openapi: "3.1.0",
  info: {
    title: "MICC Hospitality API",
    version: "0.1.0",
    description:
      "API for MICC — a premium concierge platform for luxury event production in Los Angeles.",
  },
  paths: {
    "/api/request": {
      post: {
        operationId: "createRequest",
        summary: "Submit a concierge request",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: [
                  "name",
                  "email",
                  "phone",
                  "datetime",
                  "location",
                  "party_size",
                  "budget_range",
                  "pillars",
                  "vibe_tags",
                ],
                properties: {
                  name: {
                    type: "string",
                    minLength: 2,
                    description: "Full name of the requester",
                  },
                  email: {
                    type: "string",
                    format: "email",
                    description: "Contact email address",
                  },
                  phone: {
                    type: "string",
                    minLength: 10,
                    description: "Contact phone number",
                  },
                  datetime: {
                    type: "string",
                    format: "date-time",
                    description:
                      "Requested event date/time (must be at least 48 hours from now)",
                  },
                  location: {
                    type: "string",
                    minLength: 2,
                    description: "Event location",
                  },
                  party_size: {
                    type: "integer",
                    minimum: 1,
                    maximum: 10000,
                    description: "Number of guests",
                  },
                  budget_range: {
                    type: "string",
                    enum: BUDGET_RANGES.map((b) => b.label),
                    description: "Selected budget range",
                  },
                  pillars: {
                    type: "array",
                    items: {
                      type: "string",
                      enum: PILLARS.map((p) => p.slug),
                    },
                    minItems: 1,
                    description: "Selected service pillars",
                  },
                  vibe_tags: {
                    type: "array",
                    items: {
                      type: "string",
                      enum: [...VIBE_TAGS],
                    },
                    description: "Selected vibe tags",
                  },
                  notes: {
                    type: "string",
                    description: "Additional notes (optional)",
                  },
                },
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Request submitted successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: { type: "boolean", const: true },
                    message: { type: "string" },
                    id: { type: "string" },
                  },
                },
              },
            },
          },
          "400": {
            description: "Validation error",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    error: { type: "string" },
                    details: { type: "object" },
                  },
                },
              },
            },
          },
          "429": {
            description: "Rate limit exceeded",
            headers: {
              "X-RateLimit-Remaining": {
                schema: { type: "string" },
                description: "Number of requests remaining in the window",
              },
              "X-RateLimit-Reset": {
                schema: { type: "string" },
                description: "Unix timestamp when the rate limit resets",
              },
            },
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    error: { type: "string" },
                  },
                },
              },
            },
          },
          "500": {
            description: "Internal server error",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    error: { type: "string" },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};

export function GET() {
  return NextResponse.json(spec);
}
