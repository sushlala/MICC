"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { requestFormSchema, type RequestFormData } from "@/lib/validations";
import { PILLARS, VIBE_TAGS, BUDGET_RANGES } from "@/lib/constants";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export function RequestForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const prefilledPillar = searchParams.get("pillar");

  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<RequestFormData>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(requestFormSchema) as any,
    defaultValues: {
      pillars: prefilledPillar ? [prefilledPillar] : [],
      vibe_tags: [],
      notes: "",
    },
  });

  const selectedPillars = watch("pillars");
  const selectedVibes = watch("vibe_tags");

  function togglePillar(slug: string) {
    const current = selectedPillars || [];
    const next = current.includes(slug)
      ? current.filter((s) => s !== slug)
      : [...current, slug];
    setValue("pillars", next, { shouldValidate: true });
  }

  function toggleVibe(tag: string) {
    const current = selectedVibes || [];
    const next = current.includes(tag)
      ? current.filter((t) => t !== tag)
      : [...current, tag];
    setValue("vibe_tags", next);
  }

  async function onSubmit(data: RequestFormData) {
    setSubmitting(true);
    setServerError(null);
    try {
      const res = await fetch("/api/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) {
        setServerError(json.error || "Something went wrong");
        return;
      }
      router.push(`/request/confirmation?id=${json.id}`);
    } catch {
      setServerError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Contact Info */}
      <div>
        <h2 className="font-display text-xl font-semibold mb-4">
          Contact Information
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-dark-muted mb-1.5">
              Full Name *
            </label>
            <Input
              placeholder="Your name"
              error={errors.name?.message}
              {...register("name")}
            />
          </div>
          <div>
            <label className="block text-sm text-dark-muted mb-1.5">
              Email *
            </label>
            <Input
              type="email"
              placeholder="you@email.com"
              error={errors.email?.message}
              {...register("email")}
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm text-dark-muted mb-1.5">
              Phone *
            </label>
            <Input
              type="tel"
              placeholder="(555) 123-4567"
              error={errors.phone?.message}
              {...register("phone")}
            />
          </div>
        </div>
      </div>

      {/* Event Details */}
      <div>
        <h2 className="font-display text-xl font-semibold mb-4">
          Event Details
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-dark-muted mb-1.5">
              Date & Time *
            </label>
            <Input
              type="datetime-local"
              error={errors.datetime?.message}
              {...register("datetime")}
            />
          </div>
          <div>
            <label className="block text-sm text-dark-muted mb-1.5">
              Location *
            </label>
            <Input
              placeholder="City, venue, or address"
              error={errors.location?.message}
              {...register("location")}
            />
          </div>
          <div>
            <label className="block text-sm text-dark-muted mb-1.5">
              Party Size *
            </label>
            <Input
              type="number"
              placeholder="Number of guests"
              min={1}
              error={errors.party_size?.message}
              {...register("party_size")}
            />
          </div>
          <div>
            <label className="block text-sm text-dark-muted mb-1.5">
              Budget Range *
            </label>
            <Select
              error={errors.budget_range?.message}
              {...register("budget_range")}
            >
              <option value="">Select budget range</option>
              {BUDGET_RANGES.map((range) => (
                <option key={range.label} value={range.label}>
                  {range.label}
                </option>
              ))}
            </Select>
          </div>
        </div>
      </div>

      {/* Pillars */}
      <div>
        <h2 className="font-display text-xl font-semibold mb-2">
          Select Pillars *
        </h2>
        <p className="text-sm text-dark-muted mb-4">
          Choose the services you&apos;re interested in (at least one)
        </p>
        {errors.pillars && (
          <p className="text-sm text-red-500 mb-3">{errors.pillars.message}</p>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {PILLARS.map((pillar) => {
            const Icon = pillar.icon;
            const isSelected = selectedPillars?.includes(pillar.slug);
            return (
              <button
                key={pillar.slug}
                type="button"
                onClick={() => togglePillar(pillar.slug)}
                className={cn(
                  "flex items-center gap-4 p-4 rounded-xl border transition-all text-left cursor-pointer",
                  isSelected
                    ? "border-gold bg-gold/10"
                    : "border-dark-border bg-dark-card hover:border-gold/30"
                )}
              >
                <div
                  className={cn(
                    "w-10 h-10 rounded-lg flex items-center justify-center shrink-0",
                    isSelected ? "bg-gold/20" : "bg-dark-border"
                  )}
                >
                  <Icon
                    className={cn(
                      "w-5 h-5",
                      isSelected ? "text-gold" : "text-dark-muted"
                    )}
                  />
                </div>
                <div>
                  <p className="font-medium text-sm">{pillar.name}</p>
                  <p className="text-xs text-dark-muted">{pillar.tagline}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Vibe Tags */}
      <div>
        <h2 className="font-display text-xl font-semibold mb-2">Vibe</h2>
        <p className="text-sm text-dark-muted mb-4">
          Select tags that describe the mood you&apos;re going for (optional)
        </p>
        <div className="flex flex-wrap gap-2">
          {VIBE_TAGS.map((tag) => {
            const isSelected = selectedVibes?.includes(tag);
            return (
              <button
                key={tag}
                type="button"
                onClick={() => toggleVibe(tag)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all border cursor-pointer",
                  isSelected
                    ? "bg-gold text-dark border-gold"
                    : "border-dark-border text-dark-muted hover:border-gold/30 hover:text-foreground"
                )}
              >
                {tag}
              </button>
            );
          })}
        </div>
      </div>

      {/* Notes */}
      <div>
        <h2 className="font-display text-xl font-semibold mb-2">
          Additional Notes
        </h2>
        <Textarea
          placeholder="Tell us more about your vision, special requests, or anything else we should know..."
          {...register("notes")}
        />
      </div>

      {/* Submit */}
      {serverError && (
        <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
          {serverError}
        </div>
      )}

      <Button type="submit" size="lg" className="w-full" disabled={submitting}>
        {submitting ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            Submitting...
          </>
        ) : (
          "Submit Request"
        )}
      </Button>
    </form>
  );
}
