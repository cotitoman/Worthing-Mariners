-- =====================================================================
--  Worthing Mariners AFC — configuración de Supabase
--  Pégalo completo en  Supabase → SQL Editor → New query → Run
--  ANTES de ejecutarlo, cambia TU_CORREO@gmail.com (3.ª línea de código)
--  por el correo de la cuenta de administrador.
-- =====================================================================

create or replace function public.is_admin() returns boolean
language sql stable as $$
  select lower(coalesce(auth.jwt() ->> 'email', '')) = lower('TU_CORREO@gmail.com')
$$;

-- ---------- Tablas ----------
create table if not exists public.players (
  id uuid primary key default gen_random_uuid(),
  first_name text not null,
  last_name text not null,
  number int not null,
  position text,
  nationality text,
  photo_url text,
  created_at timestamptz not null default now()
);

create table if not exists public.matches (
  id uuid primary key default gen_random_uuid(),
  match_date timestamptz not null,
  rival text not null,
  rival_crest_url text,
  competition text,
  is_home boolean not null default true,
  venue text,
  played boolean not null default false,
  goals_for int,
  goals_against int,
  formation text,
  lineup_starters text,
  lineup_subs text,
  created_at timestamptz not null default now()
);

create table if not exists public.tickets (
  id uuid primary key default gen_random_uuid(),
  event_date timestamptz not null,
  rival text not null,
  competition text,
  venue text,
  price_adult numeric,
  price_junior numeric,
  price_senior numeric,
  available int not null default 0,
  away_allocation int not null default 0,
  on_sale boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.news (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  kind text not null default 'noticia',
  author text,
  summary text,
  body text,
  image_url text,
  video_url text,
  created_at timestamptz not null default now()
);

create table if not exists public.site_content (
  key text primary key,
  value jsonb not null
);

-- ---------- Seguridad: todos leen, solo el administrador escribe ----------
do $$
declare t text;
begin
  foreach t in array array['players','matches','tickets','news','site_content'] loop
    execute format('alter table public.%I enable row level security', t);
    execute format('drop policy if exists "lectura publica" on public.%I', t);
    execute format('drop policy if exists "solo admin escribe" on public.%I', t);
    execute format('create policy "lectura publica" on public.%I for select using (true)', t);
    execute format('create policy "solo admin escribe" on public.%I for all using (public.is_admin()) with check (public.is_admin())', t);
  end loop;
end $$;

-- ---------- Almacenamiento de imágenes y vídeos ----------
insert into storage.buckets (id, name, public, file_size_limit)
values ('media', 'media', true, 52428800)
on conflict (id) do nothing;

drop policy if exists "media lectura publica" on storage.objects;
drop policy if exists "media admin escribe" on storage.objects;
drop policy if exists "media admin actualiza" on storage.objects;
drop policy if exists "media admin borra" on storage.objects;

create policy "media lectura publica" on storage.objects for select using (bucket_id = 'media');
create policy "media admin escribe"  on storage.objects for insert with check (bucket_id = 'media' and public.is_admin());
create policy "media admin actualiza" on storage.objects for update using (bucket_id = 'media' and public.is_admin());
create policy "media admin borra"    on storage.objects for delete using (bucket_id = 'media' and public.is_admin());

-- ---------- Datos iniciales: los dos jugadores del PDF ----------
insert into public.players (first_name, last_name, number, position, nationality)
select 'Oliver', 'Bennett', 5, 'DFC', 'Inglaterra'
where not exists (select 1 from public.players where last_name = 'Bennett' and number = 5);
insert into public.players (first_name, last_name, number, position, nationality)
select 'Harry', 'Whitfield', 9, 'DC', 'Inglaterra'
where not exists (select 1 from public.players where last_name = 'Whitfield' and number = 9);
