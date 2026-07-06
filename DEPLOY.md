# Deployment: intech-sanitaer.ch auf GitHub Pages

Gleiches Prinzip wie bei **nasuvia.ch** (GitHub Pages + eigene Domain).
Repo: https://github.com/nasufienes-bit/Intech

Veröffentlicht wird über den `gh-pages`-Branch: `npm run deploy` baut die
Seite und pusht den fertigen Build dorthin — GitHub Pages liefert ihn aus.

## Einmalige Einrichtung (Stand: DNS bei Wix ist bereits umgestellt ✓)

1. **Code pushen** (falls noch nicht geschehen):

   ```bash
   cd ~/Desktop/intech-sanitaer
   git push -u origin main
   ```

2. **Erste Veröffentlichung:**

   ```bash
   npm run deploy
   ```

3. **GitHub Pages aktivieren:** Im Repo → **Settings → Pages** →
   Source: **Deploy from a branch** → Branch: **gh-pages** / **(root)** → Save.

4. **Domain:** Bei „Custom domain“ `www.intech-sanitaer.ch` eintragen
   (steht sie schon da, weil die CNAME-Datei mitdeployt wird: nur prüfen).
   Sobald verfügbar: Haken bei **Enforce HTTPS** setzen (Zertifikat
   braucht nach der DNS-Umstellung bis ~1 Stunde).

5. **Kontrolle:** https://www.intech-sanitaer.ch zeigt die neue Seite mit
   Schloss-Symbol; https://intech-sanitaer.ch leitet auf www um; eine
   Test-Mail an info@intech-sanitaer.ch kommt weiterhin an.

## DNS-Referenz (bereits erledigt, im Wix-Konto)

- A `@` → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
- CNAME `www` → `nasufienes-bit.github.io`
- **Unverändert lassen:** MX (Google Workspace) und TXT (SPF/Verification)
  — sonst fällt info@intech-sanitaer.ch aus!

## Jedes weitere Update veröffentlichen

```bash
cd ~/Desktop/intech-sanitaer
git add -A && git commit -m "Beschreibung der Änderung"
git push          # Quellcode sichern
npm run deploy    # Seite bauen & live stellen (~1 Minute)
```

Hinweis: Automatisches Deployen per GitHub Actions war vorbereitet, ist
aber mit dem aktuellen GitHub-Token nicht möglich (fehlender
„workflow“-Scope). Falls gewünscht: Token unter github.com/settings/tokens
um den Scope **workflow** erweitern — dann kann der Actions-Workflow
wieder eingerichtet werden und `npm run deploy` entfällt.
