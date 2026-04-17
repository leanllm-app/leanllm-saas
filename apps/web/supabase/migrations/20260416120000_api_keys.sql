-- Migration: api_keys table for LeanLLM
-- This table is written by the Makerkit dashboard and read by the leanllm_service for auth.

create table if not exists public.api_keys (
  api_key_id uuid primary key default gen_random_uuid(),
  account_id uuid not null references public.accounts(id) on delete cascade,
  key_hash text not null unique,
  key_prefix text not null,
  name text not null default 'default',
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  last_used_at timestamptz
);

-- Indexes
create index idx_api_keys_account_id on public.api_keys (account_id);
create index idx_api_keys_key_hash on public.api_keys (key_hash);

-- Enable RLS
alter table public.api_keys enable row level security;

-- Revoke default access, then grant explicit permissions
revoke all on public.api_keys from authenticated, service_role;
grant select, insert, update, delete on table public.api_keys to authenticated, service_role;

-- RLS Policies

-- SELECT: users can read api_keys for accounts they belong to
create policy api_keys_select on public.api_keys
  for select to authenticated
  using (public.has_role_on_account(account_id));

-- INSERT: users can create api_keys for accounts they belong to
create policy api_keys_insert on public.api_keys
  for insert to authenticated
  with check (public.has_role_on_account(account_id));

-- UPDATE: users can update api_keys for accounts they belong to
create policy api_keys_update on public.api_keys
  for update to authenticated
  using (public.has_role_on_account(account_id))
  with check (public.has_role_on_account(account_id));

-- DELETE: users can delete api_keys for accounts they belong to
create policy api_keys_delete on public.api_keys
  for delete to authenticated
  using (public.has_role_on_account(account_id));
