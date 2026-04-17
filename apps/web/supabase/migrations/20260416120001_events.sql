-- Migration: events table for LeanLLM
-- This table is written by the leanllm_service (via service role key) and read by the dashboard.

create table if not exists public.events (
  event_id text primary key,
  account_id uuid not null references public.accounts(id) on delete cascade,
  api_key_id uuid references public.api_keys(api_key_id) on delete set null,
  timestamp timestamptz not null,
  model text not null,
  provider text not null,
  input_tokens int default 0,
  output_tokens int default 0,
  total_tokens int default 0,
  cost_usd double precision default 0,
  latency_ms int default 0,
  user_id text,
  environment text,
  feature text,
  labels jsonb default '{}'::jsonb,
  prompt text,
  response text,
  metadata jsonb default '{}'::jsonb,
  schema_version int default 1,
  ingested_at_utc timestamptz not null default now()
);

-- Indexes
create index idx_events_account_timestamp on public.events (account_id, timestamp);
create index idx_events_model on public.events (model);
create index idx_events_user_id on public.events (user_id);
create index idx_events_environment on public.events (environment);
create index idx_events_feature on public.events (feature);
create index idx_events_labels on public.events using gin (labels);

-- Enable RLS
alter table public.events enable row level security;

-- Revoke default access, then grant explicit permissions
revoke all on public.events from authenticated, service_role;
grant select on table public.events to authenticated;
grant select, insert, update, delete on table public.events to service_role;

-- RLS Policies

-- SELECT: users can read events for accounts they belong to
create policy events_select on public.events
  for select to authenticated
  using (public.has_role_on_account(account_id));

-- No INSERT/UPDATE/DELETE for authenticated users.
-- The leanllm_service inserts via service_role (bypasses RLS).
