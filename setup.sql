
/* 
  RUN THIS IN YOUR SUPABASE SQL EDITOR 
  This version uses "drop if exists" to prevent "already exists" errors.
*/

-- 1. Create tables if they don't exist
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  email text,
  plan text default 'free' check (plan in ('free', 'pro', 'elite')),
  credits int default 5,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table if not exists public.subscriptions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  email text not null,
  plan_type text not null check (plan_type in ('pro', 'elite')),
  start_date timestamp with time zone default timezone('utc'::text, now()) not null,
  status text default 'active' check (status in ('active', 'cancelled', 'expired')),
  stripe_session_id text
);

-- 2. Enable Row Level Security (RLS)
alter table public.profiles enable row level security;
alter table public.subscriptions enable row level security;

-- 3. Cleanup existing policies to avoid "already exists" errors
drop policy if exists "Users can view own profile." on public.profiles;
drop policy if exists "Users can update own profile." on public.profiles;
drop policy if exists "Users can view own subscriptions." on public.subscriptions;

-- 4. Re-create the security policies
create policy "Users can view own profile." on public.profiles
  for select using (auth.uid() = id);

create policy "Users can update own profile." on public.profiles
  for update using (auth.uid() = id);

create policy "Users can view own subscriptions." on public.subscriptions
  for select using (auth.uid() = user_id);

-- 5. Setup the trigger function for new user registration
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, credits, plan)
  values (new.id, new.email, 5, 'free');
  return new;
end;
$$ language plpgsql security definer;

-- 6. Re-attach the trigger to the auth.users table
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
