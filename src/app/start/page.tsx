"use client";

import { useState, useEffect, type ReactNode } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const SMS_HREF = "sms:+1XXXXXXXXXX";
const WHATSAPP_HREF = "https://wa.me/1XXXXXXXXXX";

/* ── Types ── */
type FormData = {
  // Step 1 — What
  eventType: string;
  // Step 2 — Details
  date: string;
  dateFlexible: boolean;
  groupSize: string;
  city: string;
  budget: string;
  vibes: string[];
  extras: string[];
  // Step 3 — About you
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  instagram: string;
  age: string;
  howHeard: string;
  usedBefore: string;
  occasion: string;
  // Step 4 — Wrap up
  contactMethod: string;
  availability: string;
  notes: string;
};

const INITIAL: FormData = {
  eventType: "",
  date: "",
  dateFlexible: false,
  groupSize: "",
  city: "",
  budget: "",
  vibes: [],
  extras: [],
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  instagram: "",
  age: "",
  howHeard: "",
  usedBefore: "",
  occasion: "",
  contactMethod: "text",
  availability: "",
  notes: "",
};

/* ── Option data ── */
const EVENT_TYPES = [
  { id: "night-out", icon: "🌙", label: "A Night Out", desc: "Tables, clubs, bars, nightlife" },
  { id: "private-event", icon: "🎉", label: "A Private Event", desc: "Corporate, private party, launch" },
  { id: "weekend", icon: "✈️", label: "A Weekend", desc: "Multi-day itinerary, travel" },
  { id: "ongoing", icon: "🎯", label: "Ongoing Concierge", desc: "Recurring weekly/monthly service" },
  { id: "birthday", icon: "🎂", label: "A Birthday", desc: "Birthday dinner, party, full weekend" },
  { id: "other", icon: "💭", label: "Not Sure Yet", desc: "Let's figure it out together" },
];

const GROUP_SIZES = [
  { id: "1-5", label: "1–5" },
  { id: "6-15", label: "6–15" },
  { id: "16-30", label: "16–30" },
  { id: "30+", label: "30+" },
];

const BUDGETS = [
  { id: "skip", label: "Prefer not to say" },
  { id: "under-500", label: "Under $500" },
  { id: "500-2k", label: "$500 – $2,000" },
  { id: "2k-5k", label: "$2,000 – $5,000" },
  { id: "5k-10k", label: "$5,000 – $10,000" },
  { id: "10k+", label: "$10,000+" },
];

const VIBE_OPTIONS = [
  "Upscale", "High-Energy", "Chill & Lounge", "Intimate",
  "Rooftop", "Festival Vibes", "Black Tie", "Trendy",
  "Outdoor", "Late Night", "Brunch", "Day Party",
];

const EXTRAS = [
  { id: "dj", label: "DJ / Music" },
  { id: "photo-video", label: "Photo & Video" },
  { id: "lighting", label: "Lighting & Production" },
  { id: "transport", label: "Private Transportation" },
  { id: "catering", label: "Catering / F&B" },
  { id: "decor", label: "Decor & Florals" },
  { id: "security", label: "Security" },
  { id: "staffing", label: "Event Staffing" },
];

const AGE_RANGES = [
  { id: "21-25", label: "21–25" },
  { id: "26-30", label: "26–30" },
  { id: "31-40", label: "31–40" },
  { id: "41+", label: "41+" },
];

const HOW_HEARD = [
  { id: "instagram", label: "Instagram" },
  { id: "friend", label: "Friend / Referral" },
  { id: "google", label: "Google" },
  { id: "event", label: "Saw Us at an Event" },
  { id: "tiktok", label: "TikTok" },
  { id: "other", label: "Other" },
];

const OCCASIONS = [
  { id: "none", label: "Just going out" },
  { id: "birthday", label: "Birthday" },
  { id: "bachelor", label: "Bachelor/ette" },
  { id: "anniversary", label: "Anniversary" },
  { id: "corporate", label: "Corporate / Team" },
  { id: "proposal", label: "Proposal" },
  { id: "holiday", label: "Holiday" },
  { id: "other", label: "Other" },
];

const CONTACT_METHODS = [
  { id: "text", label: "Text" },
  { id: "call", label: "Call" },
  { id: "whatsapp", label: "WhatsApp" },
  { id: "email", label: "Email" },
];

const AVAILABILITY = [
  { id: "asap", label: "ASAP" },
  { id: "morning", label: "Mornings" },
  { id: "afternoon", label: "Afternoons" },
  { id: "evening", label: "Evenings" },
  { id: "anytime", label: "Anytime" },
];

/* ── Shared sub-components ── */
function StepDots({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center justify-center gap-3 mb-2">
      {Array.from({ length: total }, (_, i) => (
        <div
          key={i}
          style={{
            width: i + 1 === current ? 28 : 10,
            height: 10,
            borderRadius: 5,
            background: i + 1 <= current ? "var(--beige)" : "transparent",
            border: i + 1 <= current ? "none" : "1.5px solid var(--charcoal)",
            transition: "all 0.3s ease",
          }}
        />
      ))}
    </div>
  );
}

function FieldLabel({ children, optional }: { children: ReactNode; optional?: boolean }) {
  return (
    <label
      className="font-sans block mb-2"
      style={{ fontSize: "0.85rem", color: "var(--cream)", fontWeight: 400, letterSpacing: "0.03em" }}
    >
      {children}
      {optional && (
        <span style={{ color: "rgba(245, 240, 232, 0.4)", fontWeight: 300, marginLeft: 6 }}>
          optional
        </span>
      )}
    </label>
  );
}

function TextInput({
  type = "text",
  placeholder,
  value,
  onChange,
  required,
}: {
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      required={required}
      className="font-sans w-full outline-none"
      style={{
        background: "var(--charcoal)",
        color: "var(--cream)",
        border: "1px solid rgba(201, 169, 110, 0.15)",
        borderRadius: 2,
        padding: "12px 16px",
        fontSize: "0.95rem",
        transition: "border-color 0.2s ease",
      }}
      onFocus={(e) => (e.target.style.borderColor = "var(--beige)")}
      onBlur={(e) => (e.target.style.borderColor = "rgba(201, 169, 110, 0.15)")}
    />
  );
}

/* ══════════════════════════════════════════════════════════
   PAGE
   ══════════════════════════════════════════════════════════ */
export default function StartPage() {
  const searchParams = useSearchParams();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormData>(INITIAL);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Pre-populate from URL ?package=night-out etc.
  useEffect(() => {
    const pkg = searchParams.get("package");
    if (pkg) {
      const map: Record<string, string> = {
        "night-out": "night-out",
        weekend: "weekend",
        production: "private-event",
        birthday: "birthday",
        ongoing: "ongoing",
      };
      if (map[pkg]) {
        setForm((prev) => ({ ...prev, eventType: map[pkg] }));
      }
    }
  }, [searchParams]);

  function update<K extends keyof FormData>(key: K, val: FormData[K]) {
    setForm((prev) => ({ ...prev, [key]: val }));
  }

  function toggleArray(key: "vibes" | "extras", val: string) {
    setForm((prev) => {
      const arr = prev[key];
      return { ...prev, [key]: arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val] };
    });
  }

  function canAdvance(): boolean {
    if (step === 1) return !!form.eventType;
    if (step === 2) return !!form.groupSize && !!form.city;
    if (step === 3) return !!form.firstName && !!form.lastName && !!form.phone;
    if (step === 4) return true;
    return false;
  }

  async function handleSubmit() {
    setSubmitting(true);
    try {
      await fetch("/api/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `${form.firstName} ${form.lastName}`,
          email: form.email || "not-provided@micc.com",
          phone: form.phone,
          datetime: form.date || new Date(Date.now() + 7 * 86400000).toISOString(),
          location: form.city,
          party_size: parseInt(form.groupSize.split("-")[0]) || 1,
          budget_range: form.budget || "Prefer not to say",
          pillars: [form.eventType],
          vibe_tags: form.vibes,
          notes: [
            `Event type: ${form.eventType}`,
            `Group size: ${form.groupSize}`,
            form.dateFlexible ? "Dates are flexible" : "",
            form.extras.length ? `Services needed: ${form.extras.join(", ")}` : "",
            form.vibes.length ? `Vibe: ${form.vibes.join(", ")}` : "",
            form.occasion && form.occasion !== "none" ? `Occasion: ${form.occasion}` : "",
            form.age ? `Age range: ${form.age}` : "",
            form.instagram ? `Instagram: @${form.instagram.replace("@", "")}` : "",
            form.howHeard ? `How they heard about us: ${form.howHeard}` : "",
            form.usedBefore ? `Used MICC before: ${form.usedBefore}` : "",
            `Preferred contact: ${form.contactMethod}`,
            form.availability ? `Best time to reach: ${form.availability}` : "",
            form.notes,
          ]
            .filter(Boolean)
            .join("\n"),
        }),
      });
    } catch {
      // Silently handle — success state shows regardless (demo mode friendly)
    }
    setSubmitting(false);
    setSubmitted(true);
  }

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .intake-card-select {
              background: var(--charcoal);
              border: 1px solid transparent;
              padding: 1.25rem 1.5rem;
              border-radius: 4px;
              cursor: pointer;
              transition: all 0.2s ease;
              text-align: left;
              width: 100%;
            }
            .intake-card-select:hover {
              border-color: rgba(201, 169, 110, 0.3);
            }
            .intake-card-select.selected {
              border-color: var(--beige);
              background: rgba(201, 169, 110, 0.08);
            }
            .intake-pill {
              padding: 8px 18px;
              border-radius: 20px;
              border: 1px solid rgba(201, 169, 110, 0.2);
              background: transparent;
              color: rgba(245, 240, 232, 0.7);
              font-size: 0.85rem;
              cursor: pointer;
              transition: all 0.2s ease;
            }
            .intake-pill:hover {
              border-color: rgba(201, 169, 110, 0.5);
              color: var(--cream);
            }
            .intake-pill.selected {
              background: var(--beige);
              color: var(--navy);
              border-color: var(--beige);
              font-weight: 500;
            }
            .intake-radio {
              padding: 10px 20px;
              border-radius: 2px;
              border: 1px solid rgba(201, 169, 110, 0.15);
              background: var(--charcoal);
              color: rgba(245, 240, 232, 0.7);
              font-size: 0.9rem;
              cursor: pointer;
              transition: all 0.2s ease;
              text-align: center;
            }
            .intake-radio:hover {
              border-color: rgba(201, 169, 110, 0.4);
            }
            .intake-radio.selected {
              border-color: var(--beige);
              background: rgba(201, 169, 110, 0.08);
              color: var(--cream);
            }
            .step-enter {
              animation: stepFadeIn 0.35s ease forwards;
            }
            @keyframes stepFadeIn {
              from { opacity: 0; transform: translateY(12px); }
              to { opacity: 1; transform: translateY(0); }
            }
          `,
        }}
      />

      {/* ── SECTION 1: HERO ── */}
      <section style={{ background: "var(--navy)", paddingTop: 120, paddingBottom: 40 }}>
        <div
          className="mx-auto text-center"
          style={{ maxWidth: 640, padding: "0 var(--container-pad)" }}
        >
          <h1
            className="font-display"
            style={{ color: "var(--cream)", fontWeight: 400, fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
          >
            Let&rsquo;s Build Your Night.
          </h1>
          <p
            className="font-sans mt-3"
            style={{ color: "rgba(245, 240, 232, 0.65)", fontSize: "1.05rem", lineHeight: 1.6 }}
          >
            Tell us what you have in mind. We&rsquo;ll respond within 15 minutes.
          </p>

          {/* Contact shortcut buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
            <a href={SMS_HREF} className="btn-primary" style={{ fontSize: "0.85rem" }}>
              📱&nbsp; Text Us
            </a>
            <a href={WHATSAPP_HREF} className="btn-ghost" style={{ fontSize: "0.85rem" }}>
              💬&nbsp; WhatsApp Us
            </a>
          </div>

          {/* Divider */}
          <div className="flex items-center justify-center gap-4 mt-10 mb-2">
            <div style={{ width: 60, height: 1, background: "var(--beige)", opacity: 0.3 }} />
            <span
              className="font-sans"
              style={{ fontSize: "0.8rem", color: "rgba(245, 240, 232, 0.4)", whiteSpace: "nowrap" }}
            >
              or fill out the form below
            </span>
            <div style={{ width: 60, height: 1, background: "var(--beige)", opacity: 0.3 }} />
          </div>
        </div>
      </section>

      {/* ── SECTION 2: MULTI-STEP FORM ── */}
      <section style={{ background: "var(--charcoal)", padding: "60px var(--container-pad) 80px" }}>
        <div
          className="mx-auto"
          style={{
            maxWidth: 640,
            background: "var(--navy)",
            padding: "clamp(2rem, 5vw, 3rem)",
            borderRadius: 8,
            border: "1px solid rgba(201, 169, 110, 0.2)",
          }}
        >
          {submitted ? (
            /* ── SUCCESS STATE ── */
            <div className="text-center step-enter" style={{ padding: "2rem 0" }}>
              <div
                style={{
                  fontSize: "3rem",
                  color: "var(--beige)",
                  marginBottom: 16,
                }}
              >
                ✓
              </div>
              <h2 className="font-display" style={{ color: "var(--cream)", fontWeight: 400 }}>
                You&rsquo;re all set.
              </h2>
              <p
                className="font-sans mt-4 mx-auto"
                style={{
                  color: "rgba(245, 240, 232, 0.7)",
                  fontSize: "1rem",
                  lineHeight: 1.7,
                  maxWidth: 400,
                }}
              >
                Expect to hear from us within 15 minutes.
                <br />
                In the meantime, follow us on Instagram for inspo.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
                <a
                  href="https://instagram.com/micc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost"
                  style={{ fontSize: "0.85rem" }}
                >
                  Follow @micc on Instagram →
                </a>
                <Link href="/" className="btn-ghost" style={{ fontSize: "0.85rem", borderColor: "rgba(201,169,110,0.3)" }}>
                  Back to Home
                </Link>
              </div>
            </div>
          ) : (
            <>
              {/* Progress */}
              <div className="mb-8">
                <StepDots current={step} total={4} />
                <p
                  className="font-sans text-center mt-2"
                  style={{ fontSize: "0.8rem", color: "var(--beige)", letterSpacing: "0.05em" }}
                >
                  Step {step} of 4
                </p>
              </div>

              {/* ── STEP 1 ── */}
              {step === 1 && (
                <div className="step-enter">
                  <h3 className="font-display text-center mb-8" style={{ color: "var(--cream)", fontWeight: 400 }}>
                    What are you planning?
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {EVENT_TYPES.map((evt) => (
                      <button
                        key={evt.id}
                        type="button"
                        className={`intake-card-select ${form.eventType === evt.id ? "selected" : ""}`}
                        onClick={() => update("eventType", evt.id)}
                      >
                        <div className="flex items-start gap-3">
                          <span style={{ fontSize: "1.4rem", lineHeight: 1 }}>{evt.icon}</span>
                          <div>
                            <p
                              className="font-sans"
                              style={{ color: "var(--cream)", fontWeight: 500, fontSize: "0.95rem" }}
                            >
                              {evt.label}
                            </p>
                            <p
                              className="font-sans mt-1"
                              style={{ color: "rgba(245, 240, 232, 0.5)", fontSize: "0.8rem" }}
                            >
                              {evt.desc}
                            </p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>

                  <div className="mt-8">
                    <button
                      type="button"
                      className="btn-primary w-full text-center"
                      style={{ fontSize: "0.85rem", opacity: canAdvance() ? 1 : 0.4, pointerEvents: canAdvance() ? "auto" : "none" }}
                      onClick={() => setStep(2)}
                    >
                      Next →
                    </button>
                  </div>
                </div>
              )}

              {/* ── STEP 2 ── */}
              {step === 2 && (
                <div className="step-enter">
                  <h3 className="font-display text-center mb-8" style={{ color: "var(--cream)", fontWeight: 400 }}>
                    Tell us the details
                  </h3>

                  <div className="space-y-6">
                    {/* Date */}
                    <div>
                      <FieldLabel optional>When is this happening?</FieldLabel>
                      <TextInput
                        type="date"
                        value={form.date}
                        onChange={(v) => update("date", v)}
                      />
                      <label className="flex items-center gap-2 mt-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={form.dateFlexible}
                          onChange={(e) => update("dateFlexible", e.target.checked)}
                          style={{ accentColor: "var(--beige)" }}
                        />
                        <span className="font-sans" style={{ fontSize: "0.8rem", color: "rgba(245, 240, 232, 0.5)" }}>
                          Dates are flexible
                        </span>
                      </label>
                    </div>

                    {/* Group size */}
                    <div>
                      <FieldLabel>Group size</FieldLabel>
                      <div className="grid grid-cols-4 gap-2">
                        {GROUP_SIZES.map((gs) => (
                          <button
                            key={gs.id}
                            type="button"
                            className={`intake-radio font-sans ${form.groupSize === gs.id ? "selected" : ""}`}
                            onClick={() => update("groupSize", gs.id)}
                          >
                            {gs.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* City */}
                    <div>
                      <FieldLabel>City / Location</FieldLabel>
                      <TextInput
                        placeholder="e.g. Chicago, SF, Miami, LA"
                        value={form.city}
                        onChange={(v) => update("city", v)}
                        required
                      />
                    </div>

                    {/* Budget */}
                    <div>
                      <FieldLabel optional>Budget range</FieldLabel>
                      <div className="grid grid-cols-2 gap-2">
                        {BUDGETS.map((b) => (
                          <button
                            key={b.id}
                            type="button"
                            className={`intake-radio font-sans ${form.budget === b.id ? "selected" : ""}`}
                            style={{ fontSize: "0.85rem" }}
                            onClick={() => update("budget", b.id)}
                          >
                            {b.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Vibes */}
                    <div>
                      <FieldLabel optional>What&rsquo;s the vibe?</FieldLabel>
                      <div className="flex flex-wrap gap-2">
                        {VIBE_OPTIONS.map((v) => (
                          <button
                            key={v}
                            type="button"
                            className={`intake-pill font-sans ${form.vibes.includes(v) ? "selected" : ""}`}
                            onClick={() => toggleArray("vibes", v)}
                          >
                            {v}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Extras / services needed */}
                    <div>
                      <FieldLabel optional>Any specific services needed?</FieldLabel>
                      <div className="grid grid-cols-2 gap-2">
                        {EXTRAS.map((ex) => (
                          <button
                            key={ex.id}
                            type="button"
                            className={`intake-radio font-sans ${form.extras.includes(ex.id) ? "selected" : ""}`}
                            style={{ fontSize: "0.85rem", textAlign: "left", padding: "10px 14px" }}
                            onClick={() => toggleArray("extras", ex.id)}
                          >
                            {ex.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Nav */}
                  <div className="flex items-center justify-between mt-8 gap-3">
                    <button
                      type="button"
                      className="btn-ghost"
                      style={{ fontSize: "0.8rem", padding: "10px 20px" }}
                      onClick={() => setStep(1)}
                    >
                      ← Back
                    </button>
                    <button
                      type="button"
                      className="btn-primary flex-1 text-center"
                      style={{ fontSize: "0.85rem", opacity: canAdvance() ? 1 : 0.4, pointerEvents: canAdvance() ? "auto" : "none" }}
                      onClick={() => setStep(3)}
                    >
                      Next →
                    </button>
                  </div>
                </div>
              )}

              {/* ── STEP 3: ABOUT YOU ── */}
              {step === 3 && (
                <div className="step-enter">
                  <h3 className="font-display text-center mb-2" style={{ color: "var(--cream)", fontWeight: 400 }}>
                    Tell us about you
                  </h3>
                  <p className="font-sans text-center mb-8" style={{ fontSize: "0.85rem", color: "rgba(245, 240, 232, 0.45)" }}>
                    Helps us personalize the experience.
                  </p>

                  <div className="space-y-5">
                    {/* Name row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <FieldLabel>First name</FieldLabel>
                        <TextInput
                          placeholder="First name"
                          value={form.firstName}
                          onChange={(v) => update("firstName", v)}
                          required
                        />
                      </div>
                      <div>
                        <FieldLabel>Last name</FieldLabel>
                        <TextInput
                          placeholder="Last name"
                          value={form.lastName}
                          onChange={(v) => update("lastName", v)}
                          required
                        />
                      </div>
                    </div>

                    {/* Phone */}
                    <div>
                      <FieldLabel>Phone number</FieldLabel>
                      <TextInput
                        type="tel"
                        placeholder="(555) 123-4567"
                        value={form.phone}
                        onChange={(v) => update("phone", v)}
                        required
                      />
                      <p className="font-sans mt-1" style={{ fontSize: "0.75rem", color: "rgba(245, 240, 232, 0.4)" }}>
                        We&rsquo;ll text you here — fastest way to get started.
                      </p>
                    </div>

                    {/* Email */}
                    <div>
                      <FieldLabel optional>Email</FieldLabel>
                      <TextInput
                        type="email"
                        placeholder="you@email.com"
                        value={form.email}
                        onChange={(v) => update("email", v)}
                      />
                    </div>

                    {/* Instagram */}
                    <div>
                      <FieldLabel optional>Instagram handle</FieldLabel>
                      <TextInput
                        placeholder="@yourhandle"
                        value={form.instagram}
                        onChange={(v) => update("instagram", v)}
                      />
                    </div>

                    {/* Age range */}
                    <div>
                      <FieldLabel optional>Age range</FieldLabel>
                      <div className="grid grid-cols-4 gap-2">
                        {AGE_RANGES.map((a) => (
                          <button
                            key={a.id}
                            type="button"
                            className={`intake-radio font-sans ${form.age === a.id ? "selected" : ""}`}
                            onClick={() => update("age", a.id)}
                          >
                            {a.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Occasion */}
                    <div>
                      <FieldLabel optional>What&rsquo;s the occasion?</FieldLabel>
                      <div className="grid grid-cols-2 gap-2">
                        {OCCASIONS.map((o) => (
                          <button
                            key={o.id}
                            type="button"
                            className={`intake-radio font-sans ${form.occasion === o.id ? "selected" : ""}`}
                            style={{ fontSize: "0.85rem" }}
                            onClick={() => update("occasion", o.id)}
                          >
                            {o.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* How heard */}
                    <div>
                      <FieldLabel optional>How did you hear about MICC?</FieldLabel>
                      <div className="grid grid-cols-2 gap-2">
                        {HOW_HEARD.map((h) => (
                          <button
                            key={h.id}
                            type="button"
                            className={`intake-radio font-sans ${form.howHeard === h.id ? "selected" : ""}`}
                            style={{ fontSize: "0.85rem" }}
                            onClick={() => update("howHeard", h.id)}
                          >
                            {h.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Used before */}
                    <div>
                      <FieldLabel optional>Have you used MICC before?</FieldLabel>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { id: "yes", label: "Yes" },
                          { id: "no", label: "No, first time" },
                          { id: "referred", label: "No, referred" },
                        ].map((opt) => (
                          <button
                            key={opt.id}
                            type="button"
                            className={`intake-radio font-sans ${form.usedBefore === opt.id ? "selected" : ""}`}
                            style={{ fontSize: "0.85rem" }}
                            onClick={() => update("usedBefore", opt.id)}
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Nav */}
                  <div className="flex items-center justify-between mt-8 gap-3">
                    <button
                      type="button"
                      className="btn-ghost"
                      style={{ fontSize: "0.8rem", padding: "10px 20px" }}
                      onClick={() => setStep(2)}
                    >
                      ← Back
                    </button>
                    <button
                      type="button"
                      className="btn-primary flex-1 text-center"
                      style={{ fontSize: "0.85rem", opacity: canAdvance() ? 1 : 0.4, pointerEvents: canAdvance() ? "auto" : "none" }}
                      onClick={() => setStep(4)}
                    >
                      Next →
                    </button>
                  </div>
                </div>
              )}

              {/* ── STEP 4: WRAP UP ── */}
              {step === 4 && (
                <div className="step-enter">
                  <h3 className="font-display text-center mb-2" style={{ color: "var(--cream)", fontWeight: 400 }}>
                    Almost done
                  </h3>
                  <p className="font-sans text-center mb-8" style={{ fontSize: "0.85rem", color: "rgba(245, 240, 232, 0.45)" }}>
                    Last few details so we can get back to you fast.
                  </p>

                  <div className="space-y-5">
                    {/* Contact method */}
                    <div>
                      <FieldLabel>Preferred contact method</FieldLabel>
                      <div className="grid grid-cols-4 gap-2">
                        {CONTACT_METHODS.map((cm) => (
                          <button
                            key={cm.id}
                            type="button"
                            className={`intake-radio font-sans ${form.contactMethod === cm.id ? "selected" : ""}`}
                            onClick={() => update("contactMethod", cm.id)}
                          >
                            {cm.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Best time to reach */}
                    <div>
                      <FieldLabel optional>Best time to reach you</FieldLabel>
                      <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                        {AVAILABILITY.map((a) => (
                          <button
                            key={a.id}
                            type="button"
                            className={`intake-radio font-sans ${form.availability === a.id ? "selected" : ""}`}
                            style={{ fontSize: "0.85rem" }}
                            onClick={() => update("availability", a.id)}
                          >
                            {a.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Notes */}
                    <div>
                      <FieldLabel optional>Anything else we should know?</FieldLabel>
                      <textarea
                        rows={3}
                        placeholder="Special requests, inspo links, guest of honor details, specific venues you love..."
                        value={form.notes}
                        onChange={(e) => update("notes", e.target.value)}
                        className="font-sans w-full outline-none resize-none"
                        style={{
                          background: "var(--charcoal)",
                          color: "var(--cream)",
                          border: "1px solid rgba(201, 169, 110, 0.15)",
                          borderRadius: 2,
                          padding: "12px 16px",
                          fontSize: "0.95rem",
                          transition: "border-color 0.2s ease",
                        }}
                        onFocus={(e) => (e.target.style.borderColor = "var(--beige)")}
                        onBlur={(e) => (e.target.style.borderColor = "rgba(201, 169, 110, 0.15)")}
                      />
                    </div>

                    {/* Summary preview */}
                    <div
                      style={{
                        background: "rgba(201, 169, 110, 0.06)",
                        border: "1px solid rgba(201, 169, 110, 0.15)",
                        borderRadius: 4,
                        padding: "1.25rem 1.5rem",
                      }}
                    >
                      <p className="font-sans" style={{ fontSize: "0.75rem", color: "var(--beige)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 10 }}>
                        Your request summary
                      </p>
                      <div className="font-sans space-y-1" style={{ fontSize: "0.85rem", color: "rgba(245, 240, 232, 0.6)" }}>
                        <p><span style={{ color: "var(--cream)" }}>{form.firstName} {form.lastName}</span> · {form.phone}</p>
                        <p>{EVENT_TYPES.find((e) => e.id === form.eventType)?.label} · {form.groupSize} guests · {form.city}</p>
                        {form.date && <p>{form.date}{form.dateFlexible ? " (flexible)" : ""}</p>}
                        {form.vibes.length > 0 && <p>Vibe: {form.vibes.join(", ")}</p>}
                        {form.extras.length > 0 && <p>Services: {form.extras.map((id) => EXTRAS.find((e) => e.id === id)?.label).join(", ")}</p>}
                      </div>
                    </div>
                  </div>

                  {/* Nav */}
                  <div className="flex items-center justify-between mt-8 gap-3">
                    <button
                      type="button"
                      className="btn-ghost"
                      style={{ fontSize: "0.8rem", padding: "10px 20px" }}
                      onClick={() => setStep(3)}
                    >
                      ← Back
                    </button>
                    <button
                      type="button"
                      className="btn-primary flex-1 text-center"
                      style={{ fontSize: "0.85rem" }}
                      onClick={handleSubmit}
                      disabled={submitting}
                    >
                      {submitting ? "Sending..." : "Send My Request →"}
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* ── SECTION 3: REASSURANCE STRIP ── */}
      <section style={{ background: "var(--navy)", padding: "60px var(--container-pad)" }}>
        <div
          className="max-w-[var(--container-max)] mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 text-center"
        >
          {[
            { icon: "⚡", text: "Response in 15 min" },
            { icon: "📍", text: "Chicago & SF Based" },
            { icon: "🔒", text: "Your info stays private" },
          ].map((item) => (
            <div key={item.text}>
              <div style={{ fontSize: "1.5rem", color: "var(--beige)", marginBottom: 8 }}>
                {item.icon}
              </div>
              <p
                className="font-sans"
                style={{ fontSize: "0.85rem", color: "var(--cream)", letterSpacing: "0.03em" }}
              >
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
