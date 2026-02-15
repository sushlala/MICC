"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { requestFormSchema, type RequestFormData } from "@/lib/validations";
import { PILLARS, VIBE_TAGS, BUDGET_RANGES } from "@/lib/constants";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

const STEPS = [
  { id: 1, title: "Contact", fields: ["name", "email", "phone"] as const },
  {
    id: 2,
    title: "Event",
    fields: ["datetime", "location", "party_size", "budget_range"] as const,
  },
  { id: 3, title: "Services", fields: ["pillars", "vibe_tags"] as const },
  { id: 4, title: "Details", fields: ["notes"] as const },
];

const stepVariants = {
  enter: { opacity: 0, y: 40 },
  center: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -40 },
};

export function MembershipForm() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<RequestFormData>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(requestFormSchema) as any,
    defaultValues: {
      pillars: [],
      vibe_tags: [],
      notes: "",
    },
  });

  const selectedPillars = watch("pillars");
  const selectedVibes = watch("vibe_tags");
  const progress = ((currentStep + 1) / STEPS.length) * 100;

  async function goNext() {
    const fieldsToValidate = STEPS[currentStep]
      .fields as unknown as (keyof RequestFormData)[];
    const valid = await trigger(fieldsToValidate);
    if (valid && currentStep < STEPS.length - 1) {
      setCurrentStep((s) => s + 1);
    }
  }

  function goBack() {
    if (currentStep > 0) setCurrentStep((s) => s - 1);
  }

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
    <Section aria-label="Request form">
      <Container className="max-w-2xl">
        {/* Progress bar */}
        <div className="mb-10">
          <div className="flex justify-between text-xs text-dark-muted mb-2">
            {STEPS.map((step, i) => (
              <span
                key={step.id}
                className={cn(
                  "transition-colors",
                  i <= currentStep ? "text-gold" : "text-dark-muted"
                )}
              >
                {step.title}
              </span>
            ))}
          </div>
          <div
            className="h-1 bg-dark-border rounded-full overflow-hidden"
            role="progressbar"
            aria-valuenow={currentStep + 1}
            aria-valuemin={1}
            aria-valuemax={STEPS.length}
            aria-label="Form progress"
          >
            <motion.div
              className="h-full bg-gold rounded-full"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <h2 className="font-display text-2xl font-semibold mb-6">
                {STEPS[currentStep].title === "Contact" &&
                  "Contact Information"}
                {STEPS[currentStep].title === "Event" && "Event Details"}
                {STEPS[currentStep].title === "Services" && "Services & Vibe"}
                {STEPS[currentStep].title === "Details" &&
                  "Additional Details"}
              </h2>

              {/* Step 1: Contact */}
              {currentStep === 0 && (
                <div className="space-y-4">
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
                  <div>
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
              )}

              {/* Step 2: Event Details */}
              {currentStep === 1 && (
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
                      placeholder="City or venue"
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
                      placeholder="Guests"
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
                      <option value="">Select range</option>
                      {BUDGET_RANGES.map((r) => (
                        <option key={r.label} value={r.label}>
                          {r.label}
                        </option>
                      ))}
                    </Select>
                  </div>
                </div>
              )}

              {/* Step 3: Pillars & Vibes */}
              {currentStep === 2 && (
                <div className="space-y-8">
                  <div>
                    <p className="text-sm text-dark-muted mb-4">
                      Select services you need (at least one)
                    </p>
                    {errors.pillars && (
                      <p className="text-sm text-red-500 mb-3">
                        {errors.pillars.message}
                      </p>
                    )}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {PILLARS.map((pillar) => {
                        const Icon = pillar.icon;
                        const isSelected = selectedPillars?.includes(
                          pillar.slug
                        );
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
                              <p className="font-medium text-sm">
                                {pillar.name}
                              </p>
                              <p className="text-xs text-dark-muted">
                                {pillar.tagline}
                              </p>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-dark-muted mb-4">
                      Mood / vibe (optional)
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
                </div>
              )}

              {/* Step 4: Notes */}
              {currentStep === 3 && (
                <div>
                  <p className="text-sm text-dark-muted mb-4">
                    Anything else we should know about your vision?
                  </p>
                  <Textarea
                    placeholder="Tell us more about your vision, special requests, or anything else..."
                    rows={6}
                    {...register("notes")}
                  />
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Error */}
          {serverError && (
            <div className="mt-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
              {serverError}
            </div>
          )}

          {/* Navigation */}
          <div className="mt-8 flex justify-between">
            <Button
              type="button"
              variant="ghost"
              onClick={goBack}
              className={cn(currentStep === 0 && "invisible")}
            >
              Back
            </Button>
            {currentStep < STEPS.length - 1 ? (
              <Button type="button" onClick={goNext}>
                Continue
              </Button>
            ) : (
              <Button type="submit" disabled={submitting}>
                {submitting ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit Request"
                )}
              </Button>
            )}
          </div>
        </form>
      </Container>
    </Section>
  );
}
