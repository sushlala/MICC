-- Requests table
create table if not exists requests (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text not null,
  datetime timestamptz not null,
  location text not null,
  party_size integer not null,
  budget_min integer not null,
  budget_max integer not null,
  pillars text[] not null default '{}',
  vibe_tags text[] not null default '{}',
  notes text,
  status text not null default 'new' check (status in ('new', 'contacted', 'confirmed', 'completed', 'cancelled')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Packages table
create table if not exists packages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text not null,
  pillar text not null,
  base_price integer not null,
  inclusions text[] not null default '{}',
  image_url text not null default '',
  active boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- RLS
alter table requests enable row level security;
alter table packages enable row level security;

-- Packages: public read for active records
create policy "Public can read active packages"
  on packages for select
  using (active = true);

-- Requests: no public access (use service role key via API route)
-- No public policies needed for requests

-- Seed packages
insert into packages (name, slug, description, pillar, base_price, inclusions, image_url, sort_order) values
  ('The Spotlight', 'the-spotlight', 'Full-service media coverage for your event — photography, videography, and a same-day highlight reel delivered before the night ends.', 'media-marketing', 3500, array['2 photographers', '1 videographer', 'Same-day highlight reel', 'Full edited gallery within 72 hours', 'Social-ready content pack'], '/images/packages/spotlight.jpg', 1),
  ('The Atmosphere', 'the-atmosphere', 'Transform any venue with premium lighting and sound that sets the perfect mood for your event.', 'illumination-infrastructure', 5000, array['Custom lighting design', 'Professional sound system', 'On-site sound engineer', 'Setup & teardown', 'LED uplighting package'], '/images/packages/atmosphere.jpg', 2),
  ('The Insider', 'the-insider', 'Your personal key to the city — VIP reservations, priority access, and white-glove coordination for a flawless night.', 'concierge', 2000, array['VIP table reservations', 'Priority venue access', 'Dedicated concierge for the evening', 'Transportation coordination', 'After-party arrangements'], '/images/packages/insider.jpg', 3),
  ('The Grand Affair', 'the-grand-affair', 'A fully produced celebration from concept to confetti — we handle every detail so you can simply enjoy the moment.', 'creative-events', 15000, array['Full event concept & design', 'Vendor sourcing & management', 'Day-of coordination team', 'Custom decor & florals', 'Entertainment booking'], '/images/packages/grand-affair.jpg', 4),
  ('The Full MICC', 'the-full-micc', 'The ultimate luxury experience — every MICC pillar working in concert to deliver an evening that transcends expectations.', 'creative-events', 35000, array['Full media coverage', 'Premium lighting & sound', 'Dedicated concierge team', 'Complete event production', 'Custom branding & signage', 'VIP guest management'], '/images/packages/full-micc.jpg', 5);
