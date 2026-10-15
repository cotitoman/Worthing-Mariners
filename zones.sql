-- =====================================================================
--  Mapa del estadio — ejecútalo UNA vez en Supabase → SQL Editor
--  (Requiere haber ejecutado setup.sql antes: usa su función is_admin)
--  Si Supabase muestra el aviso de RLS, elige "Run and enable RLS".
-- =====================================================================

create table if not exists public.stadium_zones (
  id uuid primary key default gen_random_uuid(),
  slot text not null unique check (slot in ('north','main','opposite','south')),
  name text not null,
  kind text not null default 'asiento' check (kind in ('asiento','pie','visitantes')),
  capacity int not null default 0,
  price_adult numeric not null default 0,
  price_junior numeric,
  price_senior numeric,
  description text,
  created_at timestamptz not null default now()
);

alter table public.stadium_zones enable row level security;
drop policy if exists "lectura publica" on public.stadium_zones;
drop policy if exists "solo admin escribe" on public.stadium_zones;
create policy "lectura publica" on public.stadium_zones for select using (true);
create policy "solo admin escribe" on public.stadium_zones for all using (public.is_admin()) with check (public.is_admin());

-- Los precios de cada partido ahora salen de las zonas × una categoría del partido.
alter table public.tickets add column if not exists price_factor numeric not null default 1;

insert into public.stadium_zones (slot, name, kind, capacity, price_adult, price_junior, price_senior, description)
values
 ('north','The Dock','pie',1600,15,5,10,'La grada más ruidosa de Harbour Lane, en el extremo norte. Aquí se concentran los seguidores más apasionados del Mariners.'),
 ('main','Main Stand','asiento',1200,28,10,20,'La grada principal, junto a los vestuarios y la zona de prensa. Asientos cubiertos con la mejor vista del campo.'),
 ('opposite','Family Stand','asiento',1100,22,7,15,'La tribuna lateral frente a la principal, pensada para familias y aficionados jóvenes.'),
 ('south','South End','visitantes',950,16,6,12,'El extremo sur, de pie, reservado a los aficionados visitantes.')
on conflict (slot) do nothing;
