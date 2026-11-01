# Intech Sanitär: Website, Buchhaltung, Rechnungen und Admin

Die Website ist statisches HTML im Ordner `web/`. GitHub Pages liefert den
Branch `gh-pages` unter www.intech-sanitaer.ch aus.

## Aufbau

- `web/`: die fertige Website (Seiten, `css/site.css`, `js/site.js`, Bilder, Schriften)
- `web/buchhaltung/` und `web/buchhaltung/rechnungen/`: Buchhaltung und Rechnungen
- `web/admin/`: Admin-Bereich mit den Anfragen von der Website
- `werkzeug/bauen.py`: baut die Seiten der Website neu
- `werkzeug/apps_uebernehmen.py`: übernimmt Buchhaltung, Rechnungen und Admin 1 zu 1
  von Nasuvia und setzt Intech-Logo, Firmenangaben und den Supabase-Zugang ein
- `werkzeug/supabase.json`: Project URL und Publishable key (nicht geheim)
- `werkzeug/supabase-einrichten.sql`: Einrichtung der Datenbank (einmalig)

Die alte React-Fassung liegt noch in `src/` und `public/`, wird aber nicht mehr veröffentlicht.

## Änderung veröffentlichen

```bash
cd ~/Nasuvia/Intech
python3 werkzeug/bauen.py            # nach Änderungen an Seiten
python3 werkzeug/apps_uebernehmen.py # nach Änderungen an den Nasuvia-Programmen
git add -A && git commit -m "Beschreibung der Änderung" && git push

git worktree add /tmp/intech-pages origin/gh-pages -B gh-pages-lokal
cd /tmp/intech-pages && git rm -rq . && cp -R ~/Nasuvia/Intech/web/. . && touch .nojekyll
git add -A && git commit -m "Website aktualisieren" && git push origin HEAD:gh-pages
cd ~/Nasuvia/Intech && git worktree remove /tmp/intech-pages
```

## DNS (unverändert lassen)

- A `@` → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
- CNAME `www` → `nasufienes-bit.github.io`
- MX (Google Workspace) und TXT (SPF/Verification) nicht anfassen, sonst fällt info@intech-sanitaer.ch aus.
