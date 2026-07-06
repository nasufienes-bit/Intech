# Deployment: intech-sanitaer.ch auf GitHub Pages

Gleiches Setup wie bei **nasuvia.ch** (GitHub Pages + eigene Domain).
Die Seite wird bei jedem Push auf `main` automatisch neu gebaut und deployt.

## Einmalige Einrichtung

### 1. GitHub-Repository anlegen und pushen

1. Auf https://github.com/new gehen (eingeloggt als `nasufienes-bit`).
2. Repository-Name: `intech-sanitaer` · Sichtbarkeit: **Public** (nötig für
   kostenloses GitHub Pages) · KEINE Haken bei README/gitignore setzen.
3. Im Terminal:

   ```bash
   cd ~/Desktop/intech-sanitaer
   git remote add origin https://github.com/nasufienes-bit/intech-sanitaer.git
   git push -u origin main
   ```

### 2. GitHub Pages aktivieren

1. Im Repo: **Settings → Pages**.
2. Bei „Build and deployment“ → Source: **GitHub Actions** wählen.
3. Der Workflow (`.github/workflows/deploy.yml`) läuft beim nächsten Push
   automatisch — oder unter **Actions → Deploy auf GitHub Pages → Run workflow**
   manuell starten.
4. Wenn der Workflow grün ist: zurück zu **Settings → Pages** →
   bei „Custom domain“ `www.intech-sanitaer.ch` eintragen und speichern.
   (Der Haken **Enforce HTTPS** lässt sich setzen, sobald das DNS unten
   umgestellt und das Zertifikat ausgestellt ist — dauert bis ~1 Stunde.)

### 3. DNS bei Wix umstellen

Die Domain nutzt aktuell die Wix-Nameserver — die DNS-Einträge werden
darum im **Wix-Konto** verwaltet: https://www.wix.com/my-account →
**Domains** → `intech-sanitaer.ch` → **DNS-Einträge verwalten**.
(Falls Wix das Bearbeiten blockiert, zuerst unter „Domain zuweisen“ die
Verbindung der Domain zur alten Wix-Website trennen.)

**Ändern:**

| Typ   | Host/Name | Alter Wert                  | Neuer Wert                  |
| ----- | --------- | --------------------------- | --------------------------- |
| A     | `@`       | 185.230.63.x (Wix, alle löschen) | `185.199.108.153`      |
| A     | `@`       | —                           | `185.199.109.153`           |
| A     | `@`       | —                           | `185.199.110.153`           |
| A     | `@`       | —                           | `185.199.111.153`           |
| CNAME | `www`     | `cdn1.wixdns.net`           | `nasufienes-bit.github.io`  |

**NICHT anfassen (sonst fällt die Firmen-E-Mail aus!):**

- Alle **MX**-Einträge (`aspmx.l.google.com` usw. — Google Workspace)
- Alle **TXT**-Einträge (`v=spf1 include:_spf.google.com ~all` und die
  `google-site-verification`-Einträge)

DNS-Änderungen brauchen wenige Minuten bis ein paar Stunden. Danach in
GitHub **Settings → Pages** den Haken **Enforce HTTPS** setzen.

### 4. Kontrolle

- https://www.intech-sanitaer.ch öffnen → neue Seite mit Schloss-Symbol (HTTPS).
- https://intech-sanitaer.ch (ohne www) → leitet automatisch auf www um.
- Test-Mail an info@intech-sanitaer.ch schicken → muss weiterhin ankommen.
- Danach kann das Wix-Abo gekündigt werden (die Domain-Registrierung bei
  Wix aber **behalten**, solange sie dort registriert ist!).

## Jedes weitere Update deployen

```bash
cd ~/Desktop/intech-sanitaer
git add -A
git commit -m "Beschreibung der Änderung"
git push
```

→ GitHub Actions baut und veröffentlicht automatisch (~2 Minuten,
Fortschritt unter dem Tab **Actions** im Repo).
