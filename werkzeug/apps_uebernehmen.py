"""Übernimmt Buchhaltung, Rechnungen und Admin von Nasuvia 1 zu 1 für Intech Sanitär.

Quelle: die Nasuvia-Programme (Buchhaltung mit Rechnungen, Admin-Seite der Website).
Ziel:   web/buchhaltung, web/buchhaltung/rechnungen und web/admin dieser Website.
Ausgetauscht werden nur Name, Logo, Firmenangaben und der Supabase-Zugang.
Erneut ausführen, wenn sich die Nasuvia-Programme ändern.
"""
import base64, json, pathlib, re, shutil

HOME = pathlib.Path.home()
QUELLE = HOME / 'Nasuvia/nasuvia-buchhaltung'
ADMIN_QUELLE = HOME / 'Desktop/nasuvia-website/admin/index.html'
NASUVIA_CSS = HOME / 'Desktop/nasuvia-website/site.css'
NASUVIA_FONTS = HOME / 'Desktop/nasuvia-website/assets'
HIER = pathlib.Path(__file__).parent
WEB = HIER.parent / 'web'
ZIEL = WEB / 'buchhaltung'
BILDER = HIER / 'bilder'
SB = json.loads((HIER / 'supabase.json').read_text())  # {"url": ..., "schluessel": ...}

ALT_URL = 'https://dyepnomhidubsfwyorke.supabase.co'
ALT_KEY = 'sb_publishable_zEmC1R5vq234zR6ST7PTmA_uY7Z1-ph'

def ers(text, alt, neu, mind=1):
    n = text.count(alt)
    assert n >= mind, f'nicht gefunden: {alt[:70]}'
    return text.replace(alt, neu)

def datei(pfad, *paare):
    t = pfad.read_text()
    for alt, neu in paare:
        t = ers(t, alt, neu)
    pfad.write_text(t)

# ---------- Kopieren ----------
if ZIEL.exists():
    shutil.rmtree(ZIEL)
shutil.copytree(QUELLE, ZIEL, ignore=shutil.ignore_patterns('.git', '.DS_Store', '.claude'))
for name in ('logo.png', 'icon-180.png', 'icon-192.png', 'icon-512.png'):
    shutil.copy(BILDER / name, ZIEL / name)

ZUGANG = [(ALT_URL, SB['url']), (ALT_KEY, SB['schluessel'])]

# ---------- Buchhaltung ----------
datei(ZIEL / 'index.html',
      ('<title>Nasuvia Buchhaltung</title>', '<title>Intech Buchhaltung</title>'),
      ('NASUVIA BUCHHALTUNG', 'INTECH BUCHHALTUNG'),
      ('<img src="logo.png" alt="Nasuvia" />', '<img src="logo.png" alt="Intech Sanitär" />'),
      ('.logo-zeile img { height: 21px;', '.logo-zeile img { height: 40px;'))
datei(ZIEL / 'app.js',
      ('// Nasuvia Buchhaltung', '// Intech Buchhaltung'),
      ("'z. B. Spleissarbeiten Winterthur'", "'z. B. Badumbau Winterthur'"),
      ("'z. B. Kabel und OTO-Dosen'", "'z. B. Armaturen und Rohre'"),
      ('aus dem Ordner „Nasuvia Rechnungen“ auf dem Schreibtisch oder eine Sicherung', 'aus einer Sicherung'),
      ("art: 'nasuvia-buchhaltung'", "art: 'intech-buchhaltung'"),
      ("d.art !== 'nasuvia-buchhaltung'", "d.art !== 'intech-buchhaltung'"),
      ('`Nasuvia Buchhaltung Sicherung', '`Intech Buchhaltung Sicherung'),
      ('`Nasuvia Buchungen', '`Intech Buchungen'),
      ('`Nasuvia MWST', '`Intech MWST'))
datei(ZIEL / 'speicher.js', ("const NAME = 'nasuvia-buchhaltung';", "const NAME = 'intech-buchhaltung';"))
datei(ZIEL / 'abgleich.js', *ZUGANG)
datei(ZIEL / 'manifest.webmanifest', ('"name": "Nasuvia Buchhaltung"', '"name": "Intech Buchhaltung"'))
datei(ZIEL / 'sw.js', ("const VERSION = 'nb-", "const VERSION = 'ib-"))

# ---------- Rechnungen ----------
R = ZIEL / 'rechnungen'
logo64 = 'data:image/png;base64,' + base64.b64encode((BILDER / 'logo.png').read_bytes()).decode()
t = (R / 'index.html').read_text()
t = re.sub(r'const LOGO_SRC = "data:image/png;base64,[^"]+";', lambda m: f'const LOGO_SRC = "{logo64}";', t)
for alt, neu in [
    ('<title>Nasuvia Rechnungen</title>', '<title>Intech Rechnungen</title>'),
    ('id="panelLogo" alt="Nasuvia"', 'id="panelLogo" alt="Intech Sanitär"'),
    ('id="sheetLogo" alt="Nasuvia"', 'id="sheetLogo" alt="Intech Sanitär"'),
    ('NASUVIA — TÖSSFELDSTRASSE 37 — 8406 WINTERTHUR', 'INTECH SANITÄR GMBH — TÖSSFELDSTRASSE 37 — 8406 WINTERTHUR'),
    ('<span class="b mono">NASUVIA</span> · Tössfeldstrasse 37 · 8406 Winterthur', '<span class="b mono">INTECH SANITÄR GMBH</span> · Tössfeldstrasse 37 · 8406 Winterthur'),
    ('+41 79 821 84 08 · info@nasuvia.ch · www.nasuvia.ch', '+41 78 244 71 19 · info@intech-sanitaer.ch · www.intech-sanitaer.ch'),
    ('<span>CHE-345.606.175 MWST</span>', '<span>CHE-255.644.231 MWST</span>'),
    ('placeholder="z. B. Nasuvia (direkt)"', 'placeholder="z. B. Intech (direkt)"'),
    ('id="eName" placeholder="Nasuvia"', 'id="eName" placeholder="Intech Sanitär GmbH"'),
    ('im Nasuvia-Design', 'im Intech-Design'),
    ('const LOGO_CID = "cid:nasuvia-logo";', 'const LOGO_CID = "cid:intech-logo";'),
    ("const ABSENDER = 'info@nasuvia.ch';", "const ABSENDER = 'info@intech-sanitaer.ch';"),
    ("name: 'Nasuvia',\n    zusatz: 'Glasfasertechnik',", "name: 'Intech Sanitär GmbH',\n    zusatz: 'Sanitär und Heizung',"),
    ("tel: '+41 79 821 84 08',\n    mail: 'info@nasuvia.ch',\n    web: 'www.nasuvia.ch',\n    uid: 'CHE-345.606.175 MWST',",
     "tel: '+41 78 244 71 19',\n    mail: 'info@intech-sanitaer.ch',\n    web: 'www.intech-sanitaer.ch',\n    uid: 'CHE-255.644.231 MWST',"),
    ("{ id: 'nasuvia', bez: 'Nasuvia (direkt an uns)', name: 'Nasuvia',", "{ id: 'intech', bez: 'Intech Sanitär (direkt an uns)', name: 'Intech Sanitär GmbH',"),
    ('GLASFASER? WIR ZIEHEN DURCH.', 'WASSER. WÄRME. VERTRAUEN.'),
    ('Glasfaser? Wir ziehen durch.`', 'Wasser. Wärme. Vertrauen.`'),
    ('info@nasuvia.ch, Rechnung', 'info@intech-sanitaer.ch, Rechnung'),
    ('das Konto info@nasuvia.ch wählen', 'das Konto info@intech-sanitaer.ch wählen'),
    ('.panel-logo { height: 21px;', '.panel-logo { height: 38px;'),
    ('.sheet .logo { height: 9mm;', '.sheet .logo { height: 15mm;'),
]:
    t = ers(t, alt, neu)
assert not re.search(r'(?i)nasuvia\.ch|glasfaser|CHE-345', t), 'Nasuvia-Angaben übrig'
(R / 'index.html').write_text(t)
datei(R / 'dienst.js', *ZUGANG,
      ('Öffnen Sie auf dem Schreibtisch den Ordner „Nasuvia Rechnungen“. Wählen Sie dort die Datei <b>rechnungen.json</b> und alle PDFs im Ordner des Jahres aus (mit gedrückter Befehlstaste mehrere anklicken).',
       'Wählen Sie eine Datei <b>rechnungen.json</b> und die dazugehörigen PDFs aus (mit gedrückter Befehlstaste mehrere anklicken).'),
      ("indexedDB.open('nasuvia-rechnungen'", "indexedDB.open('intech-rechnungen'"))
datei(R / 'manifest.webmanifest', ('"name": "Nasuvia Rechnungen"', '"name": "Intech Rechnungen"'))

# ---------- Admin ----------
A = WEB / 'admin'
A.mkdir(exist_ok=True)
(A / 'fonts').mkdir(exist_ok=True)
css = NASUVIA_CSS.read_text()
for f in re.findall(r'/assets/([\w-]+\.woff2)', css):
    shutil.copy(NASUVIA_FONTS / f, A / 'fonts' / f)
(A / 'admin.css').write_text(css.replace('/assets/', '/admin/fonts/'))
shutil.copy(ZIEL / 'lib/supabase.js', A / 'supabase.js')
a = ADMIN_QUELLE.read_text()
for alt, neu in [
    ('<title>Admin | Nasuvia</title>', '<title>Admin | Intech Sanitär</title>'),
    ('content="Nasuvia Admin"', 'content="Intech Admin"'),
    ('<link rel="icon" type="image/svg+xml" href="/favicon.svg" />\n  <link rel="apple-touch-icon" href="/apple-touch-icon.png" />',
     '<link rel="icon" type="image/svg+xml" href="/favicon.svg" />\n  <link rel="apple-touch-icon" href="/buchhaltung/icon-180.png" />'),
    ('/site.css?v=', '/admin/admin.css?v='),
    ('<img src="/logo.png" alt="Nasuvia" width="140" height="23" />', '<img src="/buchhaltung/logo.png" alt="Intech Sanitär" style="height:52px;width:auto" />'),
    ('<a href="/" class="nav-logo" aria-label="Zur Website"><span class="logo-punkt" aria-hidden="true"></span><img src="/logo-wort.png" alt="Nasuvia" width="94" height="18" /></a>',
     '<a href="/" aria-label="Zur Website" style="display:flex"><img src="/buchhaltung/logo.png" alt="Intech Sanitär" style="height:34px;width:auto" /></a>'),
    ('https://nasufienes-bit.github.io/nasuvia-buchhaltung/rechnungen/', '/buchhaltung/rechnungen/'),
    ('https://nasufienes-bit.github.io/nasuvia-buchhaltung/', '/buchhaltung/'),
    (ALT_URL, SB['url']), (ALT_KEY, SB['schluessel']),
    ("storageKey: 'nasuvia.admin'", "storageKey: 'intech.admin'"),
]:
    a = ers(a, alt, neu)
# Anfragen von der Intech-Website: nach Anliegen gruppieren
a = ers(a, """        <button class="chip" data-art="oto">OTO-Bestellungen</button>
        <button class="chip" data-art="heimnetz">Heimnetz</button>
        <button class="chip" data-art="stoerung">Störungen</button>
        <button class="chip" data-art="kontakt">Anfragen</button>""",
"""        <button class="chip" data-art="neubau">Neubau</button>
        <button class="chip" data-art="umbau">Umbau</button>
        <button class="chip" data-art="sanierung">Sanierung</button>
        <button class="chip" data-art="service">Service</button>
        <button class="chip" data-art="kontakt">Andere</button>""")
a = re.sub(r"    var ICON = \{.*?\n    \};\n", """    var ICON = {
      neubau: '<path d="M3 21V9l9-6 9 6v12"/><path d="M9 21v-6h6v6"/>',
      umbau: '<path d="M3 12h18v3a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5v-3Z"/><path d="M6 12V5a2 2 0 0 1 4 0"/>',
      sanierung: '<rect x="6" y="6" width="12" height="15" rx="2"/><path d="M9 6V3h6v3M9 11h6"/>',
      service: '<path d="M14.5 5.5a3.5 3.5 0 0 0-4.9 4.9L3 17l4 4 6.6-6.6a3.5 3.5 0 0 0 4.9-4.9l-2.3 2.3-2.4-.6-.6-2.4Z"/>',
      kontakt: '<path d="M4 5h16v11H8l-4 4z"/>'
    };
""", a, flags=re.S)
a = re.sub(r"    var gruppe = function\(a\)\{.*?\};\n",
           "    var gruppe = function(a){ a = (a.art || '') + ' ' + ((a.daten || {}).Anliegen || ''); return /Neubau/.test(a) ? 'neubau' : /Umbau/.test(a) ? 'umbau' : /Sanierung/.test(a) ? 'sanierung' : /Service|Reparatur/.test(a) ? 'service' : 'kontakt'; };\n", a, flags=re.S)
a = ers(a, "return d['PLZ und Ort'] || d['Ort oder Region'] || d.Adresse || '';", "return d.Ort || d['PLZ und Ort'] || d.Adresse || '';")
assert 'nasuvia' not in a.lower().replace('nasufienes', ''), 'Nasuvia im Admin übrig'
(A / 'index.html').write_text(a)
# Zugang für das Formular der Website (darf nur eintragen)
(WEB / 'js/zugang.js').write_text('window.INTECH_SB = ' + json.dumps({'url': SB['url'], 'schluessel': SB['schluessel']}) + ';\n')
print('übernommen')
