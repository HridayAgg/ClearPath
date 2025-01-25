/*
  # Initial Schema Setup for ClearPath

  1. Authentication and Users
    - Uses Supabase Auth for user management
    - Extended user profile table
    - Role-based access control

  2. Core Features
    - AQI monitoring and alerts
    - Infrastructure issues reporting
    - Public transport schedules
    - Rewards and points system

  3. Security
    - Row Level Security (RLS) policies
    - Role-based access control
*/

-- Enable necessary extensions
create extension if not exists "postgis";

-- Set up profiles table to extend auth.users
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text unique not null,
  role text not null check (role in ('admin', 'user')),
  points integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.profiles enable row level security;

create policy "Public profiles are viewable by everyone"
  on profiles for select
  using (true);

create policy "Users can update own profile"
  on profiles for update
  using (auth.uid() = id);

-- AQI Monitoring
create table public.aqi_readings (
  id uuid primary key default gen_random_uuid(),
  location geometry(Point, 4326) not null,
  aqi_value integer not null,
  pm25 numeric,
  pm10 numeric,
  no2 numeric,
  so2 numeric,
  o3 numeric,
  co numeric,
  alert_level text check (alert_level in ('low', 'moderate', 'high', 'severe')),
  recommendations text[],
  created_at timestamptz default now()
);

create index aqi_readings_location_idx on aqi_readings using gist(location);
alter table public.aqi_readings enable row level security;

create policy "AQI readings are viewable by everyone"
  on aqi_readings for select
  using (true);

-- Infrastructure Issues
create table public.infrastructure_issues (
  id uuid primary key default gen_random_uuid(),
  reporter_id uuid references public.profiles(id),
  issue_type text not null check (
    issue_type in (
      'TRAFFIC', 'POLLUTION', 'INFRASTRUCTURE',
      'CONSTRUCTION', 'POTHOLE', 'STREETLIGHT', 'DUMPING'
    )
  ),
  status text not null check (status in ('PENDING', 'IN_REVIEW', 'RESOLVED')) default 'PENDING',
  location geometry(Point, 4326) not null,
  address text not null,
  description text not null,
  images text[],
  points_awarded integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index infrastructure_issues_location_idx on infrastructure_issues using gist(location);
alter table public.infrastructure_issues enable row level security;

create policy "Issues are viewable by everyone"
  on infrastructure_issues for select
  using (true);

create policy "Authenticated users can create issues"
  on infrastructure_issues for insert
  to authenticated
  with check (auth.uid() = reporter_id);

create policy "Users can update their own issues"
  on infrastructure_issues for update
  to authenticated
  using (auth.uid() = reporter_id);

-- Transport Schedules
create table public.transport_routes (
  id uuid primary key default gen_random_uuid(),
  type text not null check (type in ('bus', 'metro')),
  route_number text not null,
  start_location text not null,
  end_location text not null,
  created_at timestamptz default now()
);

create table public.transport_schedules (
  id uuid primary key default gen_random_uuid(),
  route_id uuid references public.transport_routes(id),
  departure_time time not null,
  arrival_time time not null,
  frequency_minutes integer not null,
  status text check (status in ('on-time', 'delayed', 'cancelled')) default 'on-time',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.transport_routes enable row level security;
alter table public.transport_schedules enable row level security;

create policy "Transport routes are viewable by everyone"
  on transport_routes for select
  using (true);

create policy "Transport schedules are viewable by everyone"
  on transport_schedules for select
  using (true);

-- Rewards System
create table public.rewards (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  points_cost integer not null,
  sponsor_name text not null,
  sponsor_logo text not null,
  valid_until timestamptz not null,
  created_at timestamptz default now()
);

create table public.claimed_rewards (
  id uuid primary key default gen_random_uuid(),
  reward_id uuid references public.rewards(id),
  user_id uuid references public.profiles(id),
  claimed_at timestamptz default now()
);

alter table public.rewards enable row level security;
alter table public.claimed_rewards enable row level security;

create policy "Rewards are viewable by everyone"
  on rewards for select
  using (true);

create policy "Authenticated users can claim rewards"
  on claimed_rewards for insert
  to authenticated
  with check (auth.uid() = user_id);

create policy "Users can view their claimed rewards"
  on claimed_rewards for select
  to authenticated
  using (auth.uid() = user_id);

-- Functions
create or replace function public.get_nearby_aqi_readings(
  lat double precision,
  lng double precision,
  radius_meters double precision
) returns setof aqi_readings
language sql
security definer
as $$
  select *
  from aqi_readings
  where ST_DWithin(
    location,
    ST_SetSRID(ST_MakePoint(lng, lat), 4326),
    radius_meters
  )
  order by created_at desc
  limit 10;
$$;

-- Triggers
create or replace function public.handle_issue_points() returns trigger as $$
begin
  if (TG_OP = 'INSERT') then
    update profiles
    set points = points + new.points_awarded
    where id = new.reporter_id;
  end if;
  return new;
end;
$$ language plpgsql security definer;

create trigger on_issue_reported
  after insert on infrastructure_issues
  for each row
  execute function handle_issue_points();