import { z } from "zod";

export const requestFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  datetime: z.string().refine(
    (val) => {
      const date = new Date(val);
      const now = new Date();
      const minDate = new Date(now.getTime() + 48 * 60 * 60 * 1000);
      return date >= minDate;
    },
    { message: "Date must be at least 48 hours from now" }
  ),
  location: z.string().min(2, "Please enter a location"),
  party_size: z
    .coerce.number()
    .min(1, "Party size must be at least 1")
    .max(10000, "Party size seems too large"),
  budget_range: z.string().min(1, "Please select a budget range"),
  pillars: z
    .array(z.string())
    .min(1, "Please select at least one pillar"),
  vibe_tags: z.array(z.string()),
  notes: z.string().optional(),
});

export type RequestFormData = z.infer<typeof requestFormSchema>;
