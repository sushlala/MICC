import { NextResponse } from "next/server";
import { requestFormSchema } from "@/lib/validations";
import { createAdminClient } from "@/lib/supabase/admin";
import { BUDGET_RANGES } from "@/lib/constants";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = requestFormSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const data = parsed.data;

    const budgetRange = BUDGET_RANGES.find(
      (b) => b.label === data.budget_range
    );
    const budget_min = budgetRange?.min ?? 500;
    const budget_max = budgetRange?.max ?? 100000;

    // If Supabase is not configured, return success anyway (for dev/demo)
    if (
      !process.env.NEXT_PUBLIC_SUPABASE_URL ||
      !process.env.SUPABASE_SERVICE_ROLE_KEY
    ) {
      return NextResponse.json({
        success: true,
        message: "Request received (demo mode — database not configured)",
        id: "demo-" + Date.now(),
      });
    }

    const supabase = createAdminClient();

    const { data: row, error } = await supabase
      .from("requests")
      .insert({
        name: data.name,
        email: data.email,
        phone: data.phone,
        datetime: data.datetime,
        location: data.location,
        party_size: data.party_size,
        budget_min,
        budget_max,
        pillars: data.pillars,
        vibe_tags: data.vibe_tags,
        notes: data.notes || null,
        status: "new",
      })
      .select("id")
      .single();

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json(
        { error: "Failed to save request" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Request submitted successfully",
      id: row.id,
    });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
