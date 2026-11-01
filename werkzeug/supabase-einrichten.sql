-- Intech Sanitär: Einrichtung der Datenbank in Supabase (Buchhaltung, Rechnungen, Admin)
-- Einmal im SQL Editor ausführen (New query, alles einfügen, Run).

-- ---------- Buchhaltung und Rechnungen ----------
-- Alle Buchungen, Belege, Rechnungen und Einstellungen in einer Tabelle.
-- Jede Zeile gehört genau einem Benutzer.
create table if not exists public.datensaetze (
  user_id uuid not null default auth.uid() references auth.users on delete cascade,
  id text not null,
  art text not null,
  daten jsonb not null default '{}'::jsonb,
  geaendert timestamptz not null,
  geloescht boolean not null default false,
  aktualisiert timestamptz not null default now(),
  primary key (user_id, id)
);
create index if not exists datensaetze_aktualisiert on public.datensaetze (user_id, aktualisiert);

-- Nur der eigene Benutzer sieht und ändert seine Daten
alter table public.datensaetze enable row level security;
drop policy if exists "eigene Daten" on public.datensaetze;
create policy "eigene Daten" on public.datensaetze for all to authenticated
  using (user_id = (select auth.uid()))
  with check (user_id = (select auth.uid()));

-- Ältere Stände überschreiben nie neuere; jede Änderung bekommt einen Serverzeitpunkt
create or replace function public.datensaetze_stand() returns trigger
language plpgsql set search_path = '' as $$
begin
  if tg_op = 'UPDATE' and new.geaendert < old.geaendert then
    return old;
  end if;
  new.aktualisiert := clock_timestamp();
  return new;
end $$;
drop trigger if exists datensaetze_stand on public.datensaetze;
create trigger datensaetze_stand before insert or update on public.datensaetze
  for each row execute function public.datensaetze_stand();

-- Ablage für Belegfotos und Rechnungs-PDFs (nicht öffentlich)
insert into storage.buckets (id, name, public) values ('belege', 'belege', false)
  on conflict (id) do nothing;

drop policy if exists "Belege lesen" on storage.objects;
drop policy if exists "Belege hochladen" on storage.objects;
drop policy if exists "Belege ersetzen" on storage.objects;
drop policy if exists "Belege loeschen" on storage.objects;
create policy "Belege lesen" on storage.objects for select to authenticated
  using (bucket_id = 'belege' and (storage.foldername(name))[1] = (select auth.uid())::text);
create policy "Belege hochladen" on storage.objects for insert to authenticated
  with check (bucket_id = 'belege' and (storage.foldername(name))[1] = (select auth.uid())::text);
create policy "Belege ersetzen" on storage.objects for update to authenticated
  using (bucket_id = 'belege' and (storage.foldername(name))[1] = (select auth.uid())::text);
create policy "Belege loeschen" on storage.objects for delete to authenticated
  using (bucket_id = 'belege' and (storage.foldername(name))[1] = (select auth.uid())::text);

-- ---------- Admin: Anfragen von der Website ----------
create table if not exists public.anfragen (
  id uuid primary key default gen_random_uuid(),
  erstellt timestamptz not null default now(),
  art text not null check (char_length(art) <= 80),
  nummer text check (char_length(nummer) <= 40),
  name text check (char_length(name) <= 200),
  email text check (char_length(email) <= 200),
  telefon text check (char_length(telefon) <= 60),
  daten jsonb not null default '{}'::jsonb check (pg_column_size(daten) < 20000),
  status text not null default 'neu' check (status in ('neu', 'in_arbeit', 'erledigt')),
  notiz text not null default '' check (char_length(notiz) <= 5000)
);
create index if not exists anfragen_erstellt on public.anfragen (erstellt desc);
alter table public.anfragen enable row level security;

-- Besucher der Website dürfen nur neue Anfragen eintragen, nichts lesen und nichts ändern
drop policy if exists "Website traegt ein" on public.anfragen;
create policy "Website traegt ein" on public.anfragen for insert to anon, authenticated
  with check (status = 'neu' and notiz = '');

-- Nur angemeldet (das eigene Konto, neue Konten sind gesperrt) lesen, bearbeiten und löschen
drop policy if exists "Admin liest" on public.anfragen;
drop policy if exists "Admin aendert" on public.anfragen;
drop policy if exists "Admin loescht" on public.anfragen;
create policy "Admin liest" on public.anfragen for select to authenticated using (true);
create policy "Admin aendert" on public.anfragen for update to authenticated using (true) with check (true);
create policy "Admin loescht" on public.anfragen for delete to authenticated using (true);

revoke all on public.anfragen from anon;
grant insert on public.anfragen to anon;
grant select, insert, update, delete on public.anfragen to authenticated;
