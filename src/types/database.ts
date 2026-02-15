export type RequestStatus =
  | "new"
  | "contacted"
  | "confirmed"
  | "completed"
  | "cancelled";

export type RequestRow = {
  id: string;
  name: string;
  email: string;
  phone: string;
  datetime: string;
  location: string;
  party_size: number;
  budget_min: number;
  budget_max: number;
  pillars: string[];
  vibe_tags: string[];
  notes: string | null;
  status: RequestStatus;
  created_at: string;
  updated_at: string;
};

export type PackageRow = {
  id: string;
  name: string;
  slug: string;
  description: string;
  pillar: string;
  base_price: number;
  inclusions: string[];
  image_url: string;
  active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
};
