"""Baut die Website von Intech Sanitär (statisches HTML). Aufbau wie nasuvia.ch:
Start mit Illustration, Scroll-Geschichte, drei Hauptthemen, Referenzen, Bewertungen, Abschluss."""
import json, pathlib, shutil, html as H
W = pathlib.Path(__file__).resolve().parent.parent / 'web'
TEL, TEL_LINK, MAIL = '+41 78 244 71 19', 'tel:+41782447119', 'info@intech-sanitaer.ch'
ADR = 'Tössfeldstrasse 37, 8406 Winterthur'
WA = 'https://wa.me/41782447119?text=' + 'Guten%20Tag%2C%20ich%20brauche%20Hilfe%20bei%20einer%20Reparatur.'
GOOGLE = 'https://www.google.com/maps/place/Intech+Sanit%C3%A4r+GmbH/@47.4914904,8.7156996,17z/data=!4m6!3m5!1s0x479a9932637f8381:0x866c5301cdf9ad9b!8m2!3d47.4914904!4d8.7156996!16s%2Fg%2F11l66t1w9q'
V = '3'
PFEIL = '<span class="pfeil" aria-hidden="true">→</span>'
LABEL = lambda t, k='': f'<p class="label{k}"><i></i>{t}</p>'

ICON = {
  'tel': '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>',
  'mail': '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
  'ort': '<path d="M12 21s7-6.2 7-11a7 7 0 0 0-14 0c0 4.8 7 11 7 11Z"/><circle cx="12" cy="10" r="2.5"/>',
}
WA_ICON = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.7-1.4a.5.5 0 0 0 0-.4l-.8-1.9c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 0 0 1.8-1.3 2.2 2.2 0 0 0 .2-1.3c-.1-.1-.3-.2-.5-.3Z"/></svg>'
def icon(n): return f'<svg viewBox="0 0 24 24" aria-hidden="true">{ICON[n]}</svg>'
def bild(name, alt, groesse='(max-width: 1000px) 100vw, 50vw', eager=False):
    src = f'/images/{name}.jpg'
    srcset = f'/images/{name}-480.jpg 480w, /images/{name}-960.jpg 960w, {src} 1600w'
    return f'<img src="{src}" srcset="{srcset}" sizes="{groesse}" alt="{H.escape(alt)}" loading="{"eager" if eager else "lazy"}" decoding="async">'

LOGO = '<a href="/" class="logo" aria-label="Intech Sanitär, zur Startseite"><i class="tl"></i><span class="lw"><b>INTECH</b><span class="ls"><em>Sanitär</em><em>Heizung</em></span></span><i class="br"></i></a>'
NAV = [('/sanitaer/', 'Sanitär'), ('/heizung/', 'Heizung'), ('/reparaturservice/', 'Reparaturservice'), ('/referenzen/', 'Referenzen'), ('/ueber-uns/', 'Über uns')]

def kopf(titel, beschreibung, pfad, extra=''):
    url = 'https://www.intech-sanitaer.ch' + pfad
    return f'''<!doctype html>
<html lang="de-CH">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <script>document.documentElement.classList.add('js');</script>
  <title>{H.escape(titel)}</title>
  <meta name="description" content="{H.escape(beschreibung)}" />
  <link rel="canonical" href="{url}" />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="{url}" />
  <meta property="og:title" content="{H.escape(titel)}" />
  <meta property="og:description" content="{H.escape(beschreibung)}" />
  <meta property="og:image" content="https://www.intech-sanitaer.ch/images/hero-bad.jpg" />
  <meta property="og:locale" content="de_CH" />
  <meta name="theme-color" content="#f6f7fa" />
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  <link rel="preload" href="/fonts/space-grotesk.woff2" as="font" type="font/woff2" crossorigin />
  <link rel="stylesheet" href="/css/site.css?v={V}" />
{extra}</head>'''

def nav(aktiv):
    akt = ' aria-current="page"'
    links = ''.join(f'<a href="{h}"{akt if h == aktiv else ""}>{t}</a>' for h, t in NAV)
    menu = ''.join(f'<a href="{h}">{t}</a>' for h, t in NAV)
    return f'''<body>
  <header class="nav">
    <div class="wrap">
      {LOGO}
      <nav class="nav-links" aria-label="Hauptnavigation">{links}</nav>
      <a href="/kontakt/" class="btn btn-haupt btn-klein">Offerte anfragen</a>
      <button class="nav-burger" type="button" aria-label="Menü" aria-expanded="false" aria-controls="menu"><i></i><i></i><i></i></button>
    </div>
  </header>
  <nav class="menu" id="menu" aria-label="Menü">
    {menu}
    <a href="/kontakt/" class="klein">Kontakt</a>
    <a href="/kontakt/" class="btn btn-haupt">Offerte anfragen</a>
    <a href="{TEL_LINK}" class="btn btn-zweit"><span class="punkt-live"></span>Notfall 24/7: {TEL}</a>
  </nav>
  <main>'''

FUSS = f'''  </main>
  <footer class="fuss">
    <div class="wrap">
      <div class="fuss-raster">
        <div>{LOGO}<p style="margin-top:16px;max-width:300px">Sanitär, Heizung und Reparaturservice. Familienunternehmen aus Winterthur, seit 2010.</p></div>
        <div class="links"><h4>Leistungen</h4><a href="/sanitaer/">Sanitär</a><a href="/heizung/">Heizung</a><a href="/reparaturservice/">Reparaturservice</a><a href="/reparaturservice/#wasserschaden">Wasserschaden</a><a href="/reparaturservice/#notfall">Notfalldienst 24/7</a></div>
        <div class="links"><h4>Intech</h4><a href="/referenzen/">Referenzen</a><a href="/ueber-uns/">Über uns</a><a href="/ueber-uns/#stellen">Offene Stellen</a><a href="/kontakt/">Kontakt</a></div>
        <div class="links"><h4>Kontakt</h4><a href="{TEL_LINK}">{TEL}</a><a href="mailto:{MAIL}">{MAIL}</a><a href="{GOOGLE}" target="_blank" rel="noopener">{ADR}</a></div>
      </div>
      <div class="fuss-unten"><span>© 2026 Intech Sanitär GmbH</span><nav><a href="/impressum/">Impressum</a><a href="/datenschutz/">Datenschutz</a></nav></div>
    </div>
  </footer>
  <script src="/js/zugang.js?v={V}"></script>
  <script src="/js/site.js?v={V}" defer></script>
'''

def seite(pfad, titel, beschreibung, inhalt, aktiv=None, extra=''):
    datei = W / 'index.html' if pfad == '/' else W / pfad.strip('/') / 'index.html'
    datei.parent.mkdir(parents=True, exist_ok=True)
    datei.write_text(kopf(titel, beschreibung, pfad, extra) + '\n' + nav(aktiv) + inhalt + FUSS + '</body>\n</html>\n')
    return datei

def band(titel='Dem Zuhause Ihrer Träume einen Schritt näher.', text='Erzählen Sie uns von Ihrem Projekt. Wir beraten Sie vor Ort, kostenlos und unverbindlich.', anliegen=''):
    q = f'?anliegen={anliegen}' if anliegen else ''
    return f'''
    <section class="abschnitt eng">
      <div class="wrap">
        <div class="band zeig">
          <div><h2>{titel}</h2><p>{text}</p></div>
          <div class="knoepfe"><a href="/kontakt/{q}" class="btn btn-haupt">Offerte anfragen {PFEIL}</a><a href="{TEL_LINK}" class="btn btn-zweit">{TEL}</a></div>
        </div>
      </div>
    </section>
'''

def faq(fragen, titel='Häufige Fragen'):
    teile = ''.join(f'<details><summary>{q}</summary><p>{a}</p></details>' for q, a in fragen)
    ld = {'@context': 'https://schema.org', '@type': 'FAQPage', 'mainEntity': [{'@type': 'Question', 'name': q, 'acceptedAnswer': {'@type': 'Answer', 'text': a}} for q, a in fragen]}
    return f'''
    <section class="abschnitt">
      <div class="wrap">
        <div class="kopf mitte zeig">{LABEL('Gut zu wissen')}<h2>{titel}</h2></div>
        <div class="faq zeig">{teile}</div>
      </div>
    </section>
''', f'  <script type="application/ld+json">{json.dumps(ld, ensure_ascii=False)}</script>\n'

def ablauf(schritte):
    return '<div class="ablauf">' + ''.join(f'<div class="schritt zeig{" v" + str(i) if i else ""}"><h3>{t}</h3><p>{p}</p></div>' for i, (t, p) in enumerate(schritte)) + '</div>'

# ================================================================ Szenen
TXT = "font:600 11px 'Space Grotesk',sans-serif;letter-spacing:.12em;fill:#8a90a0"

HAUS = f'''<svg viewBox="0 0 440 360" role="img" aria-label="Haus mit Wasser, Heizung, Wärmepumpe und Solaranlage">
  <rect width="440" height="360" rx="20" fill="#f2f4fb"/>
  <circle cx="372" cy="52" r="15" fill="#ffd36b"/>
  <g class="sonne-strahl" stroke="#ffc53d" stroke-width="3" stroke-linecap="round"><path d="M372 26v-8M372 86v-8M346 52h-8M406 52h-8M354 34l-6-6M390 70l6 6M390 34l6-6M354 70l-6 6"/></g>
  <path d="M58 132 210 50l152 82" fill="#fff" stroke="#0c0f1a" stroke-width="3" stroke-linejoin="round"/>
  <path d="M246 76l52 28-9 6-52-28Z" fill="#2440d0"/><path d="M251 80l40 21M243 86l40 21" stroke="#8ea0ff" stroke-width="1.5"/>
  <rect x="78" y="130" width="264" height="182" fill="#fff" stroke="#0c0f1a" stroke-width="3"/>
  <path d="M78 222h264" stroke="#0c0f1a" stroke-width="2.5"/>
  <path d="M20 312h400" stroke="#0c0f1a" stroke-width="3" stroke-linecap="round"/>
  <text x="92" y="150" style="{TXT}">BAD</text><text x="92" y="242" style="{TXT}">WOHNEN</text>
  <path d="M40 312H118V158h16" fill="none" stroke="#dbe2f7" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
  <path class="fluss" d="M40 312H118V158h16" fill="none" stroke="#3d5bff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M134 152h12v10" fill="none" stroke="#0c0f1a" stroke-width="3" stroke-linecap="round"/><rect x="136" y="162" width="20" height="5" rx="2.5" fill="#0c0f1a"/>
  <g fill="#3d5bff"><rect class="tropf" x="139" y="172" width="2.5" height="7" rx="1.2"/><rect class="tropf t2" x="145" y="172" width="2.5" height="7" rx="1.2"/><rect class="tropf t3" x="151" y="172" width="2.5" height="7" rx="1.2"/></g>
  <path d="M110 206h88v4a8 8 0 0 1-8 8h-72a8 8 0 0 1-8-8Z" fill="#edf0ff" stroke="#0c0f1a" stroke-width="2.5"/>
  <path d="M396 290H292" fill="none" stroke="#fbd5d2" stroke-width="7" stroke-linecap="round"/>
  <path class="fluss" d="M396 290H292" fill="none" stroke="#e3261b" stroke-width="3" stroke-linecap="round"/>
  <rect x="226" y="262" width="66" height="40" rx="6" fill="#fff" stroke="#0c0f1a" stroke-width="2.5"/><path d="M240 268v28M252 268v28M264 268v28M276 268v28" stroke="#fbd5d2" stroke-width="4" stroke-linecap="round"/>
  <g stroke="#e3261b" stroke-width="2.4" fill="none" stroke-linecap="round"><path class="waerme" d="M240 252c-4-6 4-8 0-14"/><path class="waerme w2" d="M259 252c-4-6 4-8 0-14"/><path class="waerme w3" d="M278 252c-4-6 4-8 0-14"/></g>
  <rect x="372" y="266" width="52" height="44" rx="8" fill="#fff" stroke="#0c0f1a" stroke-width="2.5"/><circle cx="392" cy="288" r="13" fill="#f2f4fb" stroke="#0c0f1a" stroke-width="2"/>
  <g class="rotor"><path d="M392 288c0-9 6-10 8-6s-4 6-8 6Zm0 0c8 4 6 10 1 10s-2-6-1-10Zm0 0c-8 4-12 0-9-3s7 0 9 3Z" fill="#2440d0"/></g>
</svg>'''

def szene(inhalt, an=False):
    return f'<div class="szene{" an" if an else ""}"><svg viewBox="0 0 400 300" aria-hidden="true"><rect width="400" height="300" fill="#f2f4fb"/>{inhalt}</svg></div>'

UHR_SVG = '''<svg class="uhr" viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="44" fill="#fff" stroke="#0c0f1a" stroke-width="4"/><circle cx="50" cy="50" r="44" fill="none" stroke="#e3261b" stroke-width="4" stroke-dasharray="40 240" stroke-linecap="round"/>
<path d="M50 12v6M50 82v6M12 50h6M82 50h6" stroke="#0c0f1a" stroke-width="3" stroke-linecap="round"/>
<path class="zeiger h" d="M50 50V30" stroke="#0c0f1a" stroke-width="4" stroke-linecap="round"/><path class="zeiger" d="M50 50V18" stroke="#2440d0" stroke-width="3" stroke-linecap="round"/><circle cx="50" cy="50" r="4" fill="#e3261b"/></svg>'''

WEG = [
  ('Beraten', 'Wir kommen vorbei, schauen uns alles an und hören zu. Die Beratung vor Ort ist kostenlos und unverbindlich.',
   '<rect x="130" y="40" width="140" height="210" rx="14" fill="#fff" stroke="#0c0f1a" stroke-width="3"/><rect x="170" y="30" width="60" height="22" rx="8" fill="#2440d0"/>'
   + ''.join(f'<rect x="178" y="{90 + i*46}" width="72" height="8" rx="4" fill="#dbe2f7"/><g class="ploppt" style="--v:{.4 + i*.5}s"><circle cx="160" cy="{94 + i*46}" r="11" fill="#16a06c"/><path d="M155 {94 + i*46}l3.5 3.5 7-7" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>' for i in range(3))),
  ('Planen', 'Wir planen Leitungen, Bad und Heizung gemeinsam mit Ihnen. Mit einer klaren Offerte, bevor es losgeht.',
   '<path d="M40 30v240M80 30v240M120 30v240M160 30v240M200 30v240M240 30v240M280 30v240M320 30v240M360 30v240M20 70h360M20 110h360M20 150h360M20 190h360M20 230h360" stroke="#dde3f3"/>'
   '<path class="zeichne" style="--l:900" d="M80 70h240v160H80Z M200 70v90 M80 160h120 M260 160v70" fill="none" stroke="#2440d0" stroke-width="5" stroke-linejoin="round"/>'
   '<path class="zeichne" style="--l:300;--v:1.2s" d="M100 210h60M290 90v50" fill="none" stroke="#e3261b" stroke-width="5" stroke-linecap="round"/>'),
  ('Installieren', 'Sauber, termingerecht und mit festem Ansprechpartner. Wasser und Wärme kommen genau dorthin, wo Sie sie brauchen.',
   '<path class="zeichne" style="--l:420" d="M30 250H150V110h120" fill="none" stroke="#3d5bff" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>'
   '<path class="zeichne" style="--l:420;--v:.5s" d="M30 270H190V150h140" fill="none" stroke="#e3261b" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>'
   '<g class="ploppt" style="--v:1.6s"><path d="M270 100h26v16" stroke="#0c0f1a" stroke-width="6" fill="none" stroke-linecap="round"/><rect x="286" y="116" width="20" height="8" rx="4" fill="#0c0f1a"/></g>'
   '<g fill="#3d5bff"><rect class="tropf" x="294" y="130" width="4" height="10" rx="2"/><rect class="tropf t2" x="294" y="130" width="4" height="10" rx="2"/></g>'
   '<g class="ploppt" style="--v:2s"><rect x="320" y="134" width="56" height="40" rx="6" fill="#fff" stroke="#0c0f1a" stroke-width="3"/><path d="M332 140v28M344 140v28M356 140v28M368 140v28" stroke="#fbd5d2" stroke-width="4"/></g>'),
  ('Betreuen', 'Auch nach der Arbeit sind wir für Sie da: mit Service, Pikettdienst und einem Notfalldienst rund um die Uhr.',
   '<g transform="translate(130 40) scale(1.4)">' + UHR_SVG.replace('<svg class="uhr" viewBox="0 0 100 100" aria-hidden="true">', '<g class="uhr">').replace('</svg>', '</g>') + '</g>'
   '<text x="200" y="262" text-anchor="middle" style="font:700 30px \'Space Grotesk\',sans-serif;fill:#e3261b;letter-spacing:.02em">24/7</text>'),
]

# Kleine Bilder der drei Hauptthemen (300 x 150)
def themenbild(art):
    if art == 'sanitaer':
        inhalt = ('<path d="M70 40h70v18" stroke="#0c0f1a" stroke-width="7" fill="none" stroke-linecap="round"/><rect x="124" y="58" width="32" height="10" rx="5" fill="#0c0f1a"/>'
                  '<g fill="#3d5bff"><rect class="tropf" x="132" y="74" width="4" height="11" rx="2"/><rect class="tropf t2" x="140" y="74" width="4" height="11" rx="2"/><rect class="tropf t3" x="148" y="74" width="4" height="11" rx="2"/></g>'
                  '<path d="M100 112h120v6a14 14 0 0 1-14 14h-92a14 14 0 0 1-14-14Z" fill="#edf0ff" stroke="#0c0f1a" stroke-width="3"/>'
                  '<path d="M210 40c0 0-14 15-14 24a14 14 0 0 0 28 0c0-9-14-24-14-24Z" fill="#3d5bff" opacity=".9"/>')
    elif art == 'heizung':
        inhalt = ('<rect x="70" y="70" width="110" height="60" rx="8" fill="#fff" stroke="#0c0f1a" stroke-width="3"/><path d="M90 78v44M108 78v44M126 78v44M144 78v44M162 78v44" stroke="#fbd5d2" stroke-width="6" stroke-linecap="round"/>'
                  '<g stroke="#e3261b" stroke-width="3" fill="none" stroke-linecap="round"><path class="waerme" d="M95 58c-5-8 5-10 0-18"/><path class="waerme w2" d="M125 58c-5-8 5-10 0-18"/><path class="waerme w3" d="M155 58c-5-8 5-10 0-18"/></g>'
                  '<rect x="200" y="74" width="66" height="56" rx="10" fill="#fff" stroke="#0c0f1a" stroke-width="3"/><circle cx="224" cy="102" r="16" fill="#f2f4fb" stroke="#0c0f1a" stroke-width="2"/>'
                  '<g class="rotor"><path d="M224 102c0-11 7-12 9-7s-5 7-9 7Zm0 0c10 5 7 12 1 12s-2-7-1-12Zm0 0c-10 5-14 0-11-4s9 0 11 4Z" fill="#2440d0"/></g>')
    else:
        inhalt = ('<g transform="translate(66 22) scale(1.06)">' + UHR_SVG.replace('<svg class="uhr" viewBox="0 0 100 100" aria-hidden="true">', '<g class="uhr">').replace('</svg>', '</g>') + '</g>'
                  '<path d="M196 112l40-40a14 14 0 1 1 10 10l-40 40-12 2Z" fill="#fff" stroke="#0c0f1a" stroke-width="3" stroke-linejoin="round"/>'
                  '<text x="230" y="140" style="font:700 22px \'Space Grotesk\',sans-serif;fill:#e3261b">24/7</text>')
    return f'<div class="bild anim"><svg viewBox="0 0 300 150" aria-hidden="true">{inhalt}</svg></div>'

# --- Szenen für die Themenseiten (400 x 300) ---
def karte(svg, unten='', klasse=''):
    u = f'<div class="szene-unten">{unten}</div>' if unten else ''
    return f'<div class="szene-karte anim zeig {klasse}">{svg}{u}</div>'

KESSEL = '''<svg class="ks" viewBox="0 0 520 340" role="img" aria-label="Der alte Ölkessel wird durch eine Wärmepumpe ersetzt">
  <rect width="520" height="340" rx="18" fill="#f2f4fb"/>
  <path d="M20 300H500" stroke="#c9cfdc" stroke-width="3" stroke-linecap="round"/>
  <text x="28" y="40" style="font:600 12px 'Space Grotesk',sans-serif;letter-spacing:.14em;fill:#8a90a0">HEIZRAUM</text>
  <path class="rohr warm" d="M282 150H404" stroke-width="10" stroke-linecap="round" fill="none"/>
  <path class="rohr kalt" d="M282 220H404" stroke-width="10" stroke-linecap="round" fill="none"/>
  <path class="ksfluss" d="M282 150H404" stroke="#fff" stroke-width="3" fill="none"/>
  <path class="ksfluss" d="M404 220H282" stroke="#fff" stroke-width="3" fill="none"/>
  <g><rect x="404" y="110" width="78" height="150" rx="10" fill="#fff" stroke="#d6dbe6" stroke-width="2"/><path d="M420 124v122M436 124v122M452 124v122M468 124v122" stroke="#e1e5ee" stroke-width="6" stroke-linecap="round"/></g>
  <g class="alt">
    <path d="M178 112V48" stroke="#8a919e" stroke-width="16"/>
    <g class="rauch"><circle cx="178" cy="44" r="10"/><circle cx="178" cy="44" r="10"/><circle cx="178" cy="44" r="10"/></g>
    <rect x="104" y="110" width="178" height="190" rx="12" fill="#5d6472"/><rect x="120" y="128" width="146" height="64" rx="8" fill="#4a505c"/>
    <text x="193" y="168" text-anchor="middle" style="font:700 22px 'Space Grotesk',sans-serif;fill:#cfd3db;letter-spacing:.1em">ÖL</text>
    <circle cx="140" cy="236" r="16" fill="#3f444f" stroke="#7a818e" stroke-width="3"/><path d="M140 236l8-8" stroke="#e3261b" stroke-width="3" stroke-linecap="round"/>
    <rect x="176" y="222" width="90" height="10" rx="5" fill="#4a505c"/><rect x="176" y="242" width="70" height="10" rx="5" fill="#4a505c"/>
  </g>
  <g class="neu">
    <rect x="96" y="160" width="186" height="140" rx="16" fill="#fff" stroke="#d6dbe6" stroke-width="2"/><circle cx="160" cy="230" r="44" fill="#f2f4fb" stroke="#d6dbe6" stroke-width="2"/>
    <g class="rotor"><path d="M160 230c0-26 18-30 22-18s-10 16-22 18Zm0 0c22 13 16 30 3 28s-6-18-3-28Zm0 0c-22 13-34 0-26-10s20 0 26 10Z" fill="#3d5bff"/><circle cx="160" cy="230" r="6" fill="#16247e"/></g>
    <path d="M224 196h40M224 214h40M224 232h40M224 250h40M224 268h40" stroke="#e1e5ee" stroke-width="5" stroke-linecap="round"/>
    <text x="110" y="184" style="font:700 11px 'Space Grotesk',sans-serif;fill:#2440d0;letter-spacing:.12em">WÄRMEPUMPE</text>
  </g>
  <g class="anzeige"><rect x="300" y="38" width="196" height="44" rx="22" fill="#e9f7f1"/><path d="M322 66c0-12 9-18 22-18-1 13-8 20-22 18Zm0 0 9-9" stroke="#16a06c" stroke-width="2.4" fill="none" stroke-linecap="round"/><text x="354" y="65" style="font:600 14px 'Space Grotesk',sans-serif;fill:#127a54">Ohne Öl, ohne Abgase</text></g>
</svg>'''

SOLAR = f'''<svg viewBox="0 0 400 300" role="img" aria-label="Die Sonne erwärmt über Kollektoren das Wasser im Speicher">
  <rect width="400" height="300" rx="18" fill="#f2f4fb"/>
  <circle cx="70" cy="62" r="24" fill="#ffd36b"/>
  <g class="sonne-strahl" stroke="#ffc53d" stroke-width="4" stroke-linecap="round"><path d="M70 22v-10M70 112v-10M30 62H20M120 62h-10M42 34l-7-7M98 90l7 7M98 34l7-7M42 90l-7 7"/></g>
  <path d="M130 140l80-44 70 38-80 44Z" fill="#2440d0"/><path d="M150 129l70 38M170 118l70 38M190 107l70 38M160 158l80-44" stroke="#8ea0ff" stroke-width="1.5"/>
  <path d="M200 178v40H300" fill="none" stroke="#fbd5d2" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>
  <path class="fluss" d="M200 178v40H300" fill="none" stroke="#e3261b" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  <rect x="300" y="150" width="62" height="120" rx="31" fill="#fff" stroke="#0c0f1a" stroke-width="3"/>
  <clipPath id="tank"><rect x="303" y="153" width="56" height="114" rx="28"/></clipPath>
  <g clip-path="url(#tank)"><rect class="fuellung" x="303" y="153" width="56" height="114" fill="#e3261b" opacity=".85"/></g>
  <text x="331" y="290" text-anchor="middle" style="{TXT}">SPEICHER</text>
  <path d="M20 270h260" stroke="#0c0f1a" stroke-width="3" stroke-linecap="round"/>
</svg>'''

THERMO = f'''<svg class="thermo-svg" viewBox="0 0 400 300" role="img" aria-label="Die Heizung wird repariert und wieder warm">
  <rect width="400" height="300" rx="18" fill="#f2f4fb"/>
  <rect x="70" y="140" width="170" height="100" rx="10" fill="#fff" stroke="#0c0f1a" stroke-width="3"/>
  <path d="M96 150v80M122 150v80M148 150v80M174 150v80M200 150v80" stroke="#e7eaf2" stroke-width="9" stroke-linecap="round"/>
  <g stroke="#e3261b" stroke-width="3" fill="none" stroke-linecap="round"><path class="waerme" d="M110 126c-5-8 5-10 0-18"/><path class="waerme w2" d="M155 126c-5-8 5-10 0-18"/><path class="waerme w3" d="M200 126c-5-8 5-10 0-18"/></g>
  <rect x="290" y="50" width="34" height="180" rx="17" fill="#fff" stroke="#0c0f1a" stroke-width="3"/><circle cx="307" cy="240" r="26" fill="#fff" stroke="#0c0f1a" stroke-width="3"/>
  <rect class="quecksilber" x="299" y="70" width="16" height="170" rx="8"/><circle cx="307" cy="240" r="18" class="quecksilber-kugel"/>
  <text class="wert-kalt" x="250" y="44" style="font:700 18px 'Space Grotesk',sans-serif;fill:#3d5bff">12°</text>
  <text class="wert-warm" x="250" y="44" style="font:700 18px 'Space Grotesk',sans-serif;fill:#e3261b">21°</text>
  <path d="M20 268h360" stroke="#0c0f1a" stroke-width="3" stroke-linecap="round"/>
</svg>'''

LECK = '''<svg viewBox="0 0 400 300" role="img" aria-label="Ein Leck an der Leitung wird repariert">
  <rect width="400" height="300" rx="18" fill="#f2f4fb"/>
  <path d="M20 130H380" stroke="#0c0f1a" stroke-width="22" stroke-linecap="round"/><path d="M20 130H380" stroke="#dbe2f7" stroke-width="14" stroke-linecap="round"/>
  <rect x="178" y="112" width="44" height="36" rx="6" fill="#fff" stroke="#0c0f1a" stroke-width="3"/>
  <g fill="#3d5bff"><rect class="tropf" x="198" y="152" width="5" height="12" rx="2.5"/><rect class="tropf t2" x="198" y="152" width="5" height="12" rx="2.5"/><rect class="tropf t3" x="198" y="152" width="5" height="12" rx="2.5"/></g>
  <g class="schluessel"><path d="M232 62l52 52-12 12-52-52a20 20 0 1 1 12-12Z" fill="#fff" stroke="#0c0f1a" stroke-width="3" stroke-linejoin="round"/><circle cx="214" cy="56" r="7" fill="#f2f4fb" stroke="#0c0f1a" stroke-width="2"/></g>
  <g class="ok"><circle cx="300" cy="210" r="30" fill="#16a06c"/><path d="M286 210l10 10 18-20" stroke="#fff" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>
  <path d="M60 240h170" stroke="#e3e7f1" stroke-width="10" stroke-linecap="round"/>
</svg>'''

TAGNACHT = '''<svg viewBox="0 0 400 300" role="img" aria-label="Tag und Nacht unterwegs zu Ihnen">
  <rect width="400" height="300" rx="18" fill="#dfe8ff"/><rect class="nachtfarbe" width="400" height="300" rx="18" fill="#141a33"/>
  <g class="nachtfarbe" fill="#fff"><circle cx="60" cy="50" r="1.6"/><circle cx="140" cy="30" r="1.2"/><circle cx="250" cy="60" r="1.6"/><circle cx="330" cy="36" r="1.2"/><circle cx="360" cy="90" r="1.4"/></g>
  <g class="sonne"><circle cx="200" cy="80" r="20" fill="#ffd36b"/></g>
  <g class="mond"><circle cx="200" cy="80" r="16" fill="#f4f1d0"/><circle cx="208" cy="74" r="13" fill="#141a33" opacity=".9"/></g>
  <rect y="218" width="400" height="82" rx="0" fill="#c9d3ea"/><path d="M0 252h400" stroke="#fff" stroke-width="4" stroke-dasharray="22 18"/>
  <path d="M290 218v-70l40-28 40 28v70Z" fill="#fff" stroke="#0c0f1a" stroke-width="3" stroke-linejoin="round"/><rect x="318" y="180" width="22" height="38" fill="#ffd36b" stroke="#0c0f1a" stroke-width="2"/>
  <g class="auto"><rect x="80" y="214" width="120" height="44" rx="10" fill="#fff" stroke="#0c0f1a" stroke-width="3"/><path d="M200 226h22l16 18v14h-38Z" fill="#fff" stroke="#0c0f1a" stroke-width="3" stroke-linejoin="round"/>
    <path d="M86 236h108" stroke="#2440d0" stroke-width="5"/><path d="M86 246h108" stroke="#e3261b" stroke-width="5"/>
    <circle cx="110" cy="262" r="11" fill="#0c0f1a"/><circle cx="210" cy="262" r="11" fill="#0c0f1a"/><rect x="120" y="206" width="16" height="8" rx="3" fill="#e3261b"/></g>
</svg>'''

KALENDER = '''<svg viewBox="0 0 400 300" role="img" aria-label="Pikettdienst: auch am Wochenende erreichbar">
  <rect width="400" height="300" rx="18" fill="#f2f4fb"/>
  <rect x="60" y="50" width="280" height="210" rx="16" fill="#fff" stroke="#0c0f1a" stroke-width="3"/><rect x="60" y="50" width="280" height="44" rx="16" fill="#2440d0"/><rect x="60" y="78" width="280" height="16" fill="#2440d0"/>
  <text x="200" y="79" text-anchor="middle" style="font:700 15px 'Space Grotesk',sans-serif;fill:#fff;letter-spacing:.14em">PIKETTDIENST</text>
''' + ''.join(f'<text x="{92 + i*36}" y="122" text-anchor="middle" style="font:600 11px \'Space Grotesk\',sans-serif;fill:#8a90a0">{d}</text>' for i, d in enumerate(['MO', 'DI', 'MI', 'DO', 'FR', 'SA', 'SO'])) + ''.join(
  f'<g class="ploppt" style="--v:{.15*i:.2f}s"><rect x="{78 + (i%7)*36}" y="{134 + (i//7)*40}" width="28" height="28" rx="8" fill="{"#e3261b" if i % 7 >= 5 else "#edf0ff"}"/></g>' for i in range(21)) + '''
</svg>'''

UHR_GROSS = f'''<svg viewBox="0 0 400 300" role="img" aria-label="Notfalldienst rund um die Uhr">
  <rect width="400" height="300" rx="18" fill="#f2f4fb"/>
  <g transform="translate(110 40) scale(1.8)">{UHR_SVG.replace('<svg class="uhr" viewBox="0 0 100 100" aria-hidden="true">', '<g class="uhr">').replace('</svg>', '</g>')}</g>
  <text x="310" y="150" style="font:700 40px 'Space Grotesk',sans-serif;fill:#e3261b">24/7</text>
</svg>'''

WASSERSCHADEN = '''<svg class="ws" viewBox="0 0 400 300" role="img" aria-label="Wasserschaden: Leck abdichten, Wasser trocknen">
  <rect width="400" height="300" rx="18" fill="#f2f4fb"/>
  <text x="28" y="34" style="font:600 11px 'Space Grotesk',sans-serif;letter-spacing:.12em;fill:#8a90a0">KELLER</text>
  <path d="M20 62H380" stroke="#0c0f1a" stroke-width="16" stroke-linecap="round"/><path d="M20 62H380" stroke="#dbe2f7" stroke-width="9" stroke-linecap="round"/>
  <circle cx="140" cy="62" r="5" fill="#3d5bff"/>
  <g class="ws-klemme"><rect x="118" y="48" width="44" height="28" rx="6" fill="#2440d0"/><path d="M128 48v28M152 48v28" stroke="#8ea0ff" stroke-width="2"/></g>
  <g fill="#3d5bff"><path class="ws-t" d="M140 72c-3 5-5 8-5 11a5 5 0 0 0 10 0c0-3-2-6-5-11Z"/><path class="ws-t w2" d="M140 72c-3 5-5 8-5 11a5 5 0 0 0 10 0c0-3-2-6-5-11Z"/><path class="ws-t w3" d="M140 72c-3 5-5 8-5 11a5 5 0 0 0 10 0c0-3-2-6-5-11Z"/></g>
  <ellipse class="ws-pfuetze" cx="140" cy="262" rx="96" ry="11" fill="#3d5bff" opacity=".4"/>
  <path d="M20 262H380" stroke="#0c0f1a" stroke-width="3" stroke-linecap="round"/>
  <g class="ws-trockner"><rect x="276" y="166" width="72" height="92" rx="10" fill="#fff" stroke="#0c0f1a" stroke-width="3"/><path d="M288 182h48M288 194h48" stroke="#e1e5ee" stroke-width="5" stroke-linecap="round"/><circle cx="312" cy="226" r="16" fill="#f2f4fb" stroke="#0c0f1a" stroke-width="2"/>
    <g class="rotor"><path d="M312 226c0-10 7-11 8-6s-4 6-8 6Zm0 0c9 4 6 11 1 11s-2-6-1-11Zm0 0c-9 4-12 0-9-4s7 0 9 4Z" fill="#2440d0"/></g>
    <g class="ws-luft" fill="none" stroke="#8ea0ff" stroke-width="3" stroke-linecap="round"><path d="M268 200c-8-4-8 4-16 0s-8 4-16 0"/><path d="M268 220c-8-4-8 4-16 0s-8 4-16 0"/><path d="M268 240c-8-4-8 4-16 0s-8 4-16 0"/></g>
    <text x="312" y="154" text-anchor="middle" style="font:600 11px 'Space Grotesk',sans-serif;letter-spacing:.12em;fill:#8a90a0">TROCKNER</text></g>
  <g class="ws-ok"><circle cx="350" cy="110" r="22" fill="#16a06c"/><path d="M340 110l7 7 13-14" stroke="#fff" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>
</svg>'''

VORHER = '''<svg viewBox="0 0 640 440" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
  <rect width="640" height="440" fill="#eadcc0"/>
  <path d="M0 60h640M0 120h640M0 180h640M0 240h640M0 300h640M80 0v330M160 0v330M240 0v330M320 0v330M400 0v330M480 0v330M560 0v330" stroke="#d8c7a4" stroke-width="2"/>
  <rect y="330" width="640" height="110" fill="#a9825a"/><path d="M0 360h640M0 395h640" stroke="#93704b" stroke-width="2"/>
  <path d="M40 70h250" stroke="#b9b9b9" stroke-width="5" stroke-linecap="round"/>
  <path d="M60 74c10 30-10 60 0 90s-10 60 0 90 4 40 0 60h60c-4-20 6-40 0-60s10-60 0-90 10-60 0-90Z" fill="#e9a6b4" opacity=".92"/>
  <rect x="40" y="250" width="260" height="80" rx="10" fill="#f4f1ea" stroke="#cfc8b8" stroke-width="3"/>
  <rect x="380" y="110" width="90" height="70" rx="6" fill="#cfe3ea" stroke="#b8a98b" stroke-width="6"/>
  <path d="M400 230h50l-6 40h-38Z" fill="#f4f1ea" stroke="#cfc8b8" stroke-width="3"/><rect x="415" y="270" width="20" height="60" fill="#f4f1ea" stroke="#cfc8b8" stroke-width="3"/>
  <rect x="520" y="200" width="56" height="70" rx="6" fill="#f4f1ea" stroke="#cfc8b8" stroke-width="3"/><path d="M512 290h72l-10 40h-52Z" fill="#f4f1ea" stroke="#cfc8b8" stroke-width="3"/>
</svg>'''
NACHHER = '''<svg class="nachher" viewBox="0 0 640 440" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
  <rect width="640" height="440" fill="#e4e6e8"/>
  <path d="M0 110h640M0 220h640M160 0v330M320 0v330M480 0v330" stroke="#d3d6d9" stroke-width="2"/>
  <rect y="330" width="640" height="110" fill="#8c9096"/><path d="M160 330v110M320 330v110M480 330v110" stroke="#7d8187" stroke-width="2"/>
  <rect x="40" y="40" width="250" height="290" fill="#d7dbe0"/>
  <path d="M110 40v40" stroke="#5c6168" stroke-width="5"/><rect x="80" y="78" width="60" height="10" rx="5" fill="#5c6168"/>
  <path d="M92 96v14M110 96v18M128 96v14" stroke="#9fc4ff" stroke-width="3" stroke-linecap="round" opacity=".8"/>
  <rect x="200" y="60" width="90" height="270" rx="4" fill="#cfe6ff" opacity=".45" stroke="#b9c6d4" stroke-width="3"/><path d="M220 80l30 60" stroke="#fff" stroke-width="6" opacity=".7" stroke-linecap="round"/>
  <circle cx="430" cy="140" r="52" fill="#e9eef3" stroke="#c9b28f" stroke-width="5"/><circle cx="430" cy="140" r="58" fill="none" stroke="#fff3d6" stroke-width="4" opacity=".7"/>
  <rect x="360" y="226" width="140" height="56" rx="6" fill="#b07a4a"/><rect x="388" y="214" width="84" height="16" rx="8" fill="#fff" stroke="#d5d8db" stroke-width="2"/><path d="M430 200v14" stroke="#5c6168" stroke-width="4"/>
  <path d="M534 250h60v26a16 16 0 0 1-16 16h-28a16 16 0 0 1-16-16Z" fill="#fff" stroke="#d5d8db" stroke-width="3"/><rect x="540" y="214" width="48" height="36" rx="4" fill="#fff" stroke="#d5d8db" stroke-width="3"/>
  <path d="M600 330v-48" stroke="#4f7d4f" stroke-width="4"/><path d="M600 300c-18-6-22-24-10-32 6 10 12 20 10 32Zm0-10c16-8 26-2 22 12-10 2-18-2-22-12Z" fill="#6aa36a"/><rect x="588" y="318" width="24" height="12" rx="3" fill="#c96f4a"/>
</svg>'''
def vorher_nachher():
    return f'''<div class="szene-karte zeig"><div class="vn">{VORHER}{NACHHER}<span class="griff" aria-hidden="true"></span><span class="tag l">Vorher</span><span class="tag r">Nachher</span>
      <input type="range" min="0" max="100" value="50" aria-label="Vorher und Nachher vergleichen"></div>
      <div class="szene-unten"><small>Ziehen Sie den Regler: aus der alten Badewanne wird eine bodenebene Dusche.</small></div></div>'''

NEUBAU = '''<svg class="nb" viewBox="0 0 520 400" role="img" aria-label="Querschnitt durch einen Neubau mit Leitungen und Bodenheizung">
  <rect width="520" height="400" rx="18" fill="#f2f4fb"/>
  <path d="M70 140 260 40l190 100" fill="#fff" stroke="#0c0f1a" stroke-width="3" stroke-linejoin="round"/>
  <rect x="90" y="140" width="340" height="200" fill="#fff" stroke="#0c0f1a" stroke-width="3"/><path d="M90 240h340" stroke="#0c0f1a" stroke-width="3"/>
  <rect x="90" y="340" width="340" height="44" fill="#e6e9f1"/><path d="M40 340h440" stroke="#0c0f1a" stroke-width="3" stroke-linecap="round"/>
  <path class="boden" style="--l:520" d="M100 232h30l6-6 6 6 6-6 6 6 6-6 6 6 6-6 6 6 6-6 6 6 6-6 6 6 6-6 6 6 6-6 6 6 6-6 6 6 6-6 6 6h150"/>
  <path class="boden" style="--l:520" d="M100 332h30l6-6 6 6 6-6 6 6 6-6 6 6 6-6 6 6 6-6 6 6 6-6 6 6 6-6 6 6 6-6 6 6 6-6 6 6 6-6 6 6h150"/>
  <path class="leitung kalt" style="--l:420" d="M60 372H200V170H330"/><path class="leitung kalt" style="--l:200" d="M200 290H330"/>
  <path class="leitung warm" style="--l:420" d="M140 362H220V180H346"/>
  <g class="geraet g1"><rect x="330" y="160" width="70" height="20" rx="8" fill="#fff" stroke="#0c0f1a" stroke-width="2.5"/><path d="M365 160v-14h10" stroke="#0c0f1a" stroke-width="2.5" fill="none"/></g>
  <g class="geraet g2"><rect x="330" y="280" width="70" height="46" rx="4" fill="#fff" stroke="#0c0f1a" stroke-width="2.5"/><path d="M342 280v-8h46v8" stroke="#0c0f1a" stroke-width="2.5" fill="none"/></g>
  <g class="geraet g3"><rect x="112" y="350" width="64" height="30" rx="6" fill="#fff" stroke="#2440d0" stroke-width="2.5"/><circle cx="132" cy="365" r="9" fill="none" stroke="#2440d0" stroke-width="2.5"/></g>
</svg>'''

# ================================================================ Inhalte
BEWERTUNGEN = [
  ('Alem Bally', 'Wärmepumpe', 'Mega gueti Erfahrig gmacht. De alti Ölkessel isch schnell und sauber usgebaut worde und d Wärmepumpe perfekt installiert. D Arbeit isch sehr professionell gmacht worde und alles isch ordentlich hinderlah worde. Me het gmerkt, dass sie vom Fach sind. Sehr zuverlässig, freundlich und immer erreichbar bi Frage. Bi sehr froh, hani die Firma gnoh. Klari Wiiterempfehlung.'),
  ('Luca Andrist', 'Badsanierung', 'Bin sehr zfriede gsi mit de Badzimmersanierig. De Sanitär isch pünktlich cho, het sauber gschafft und s Problem schnell gfunde und behobe. Sehr freundlich und professionell gsi. Preis-Leistig stimmt absolut. Cha ich nur wiiterempfähle.'),
]
def bewertungen():
    k = ''.join(f'<figure class="stimme zeig{" v1" if i else ""}"><div class="sterne" aria-label="5 von 5 Sternen">★★★★★</div><blockquote>{t}</blockquote><footer><b>{n}</b><span>{s}</span></footer></figure>' for i, (n, s, t) in enumerate(BEWERTUNGEN))
    return f'''
    <section class="abschnitt">
      <div class="wrap">
        <div class="kopf mitte zeig">{LABEL('Google Bewertungen')}<h2>Das sagen unsere Kunden.</h2></div>
        <div class="bewertungen">{k}</div>
        <div class="google-zeile zeig"><a class="btn btn-zweit" href="{GOOGLE}" target="_blank" rel="noopener">Alle Bewertungen auf Google ↗</a></div>
      </div>
    </section>
'''

REFS = [
  ('derma', 'ref-derma-clinic', 'Derma Medical Clinic Sihlcity', 'Zürich', 'Mieterausbau einer Privatklinik im Einkaufszentrum Sihlcity.', ['Sanitär', 'Heizung', 'Kälteanlagen']),
  ('eichhof', 'ref-eichhof-west', 'Eichhof West', 'Kriens', 'Haus B, C und D einer grossen Überbauung.', ['Heizung', 'Solaranlagen']),
  ('oberstrasse', 'ref-mfh-oberstrasse', 'MFH Oberstrasse', 'Zürich', 'Mehrfamilienhaus mit 10 Eigentumswohnungen.', ['Sanitär komplett', 'Heizung']),
]

def notfallband():
    return f'''
    <section class="abschnitt eng">
      <div class="wrap">
        <div class="notfall zeig anim">{UHR_SVG}
          <div><p class="label rot"><i></i>Notfalldienst 24/7</p><h2>Wasserschaden? Heizung aus? Wir sind Tag und Nacht für Sie da.</h2><p>Auch bei Wasserschaden: Rufen Sie direkt an. Wir kommen so schnell wie möglich.</p></div>
          <div class="knoepfe"><a href="{TEL_LINK}" class="btn btn-rot"><span class="punkt-live" style="background:#fff"></span>{TEL}</a></div>
        </div>
      </div>
    </section>
'''

# ================================================================ Startseite
THEMEN = [
  ('/sanitaer/', 'sanitaer', 'Sanitär', 'Neue Bäder, Neubauten und alles, was mit Wasser zu tun hat. Sauber geplant und installiert.', ['Badumbau', 'Neubau', 'Service'], ''),
  ('/heizung/', 'heizung', 'Heizung', 'Wärmepumpen statt Ölkessel, Solar vom eigenen Dach und schnelle Hilfe, wenn die Heizung streikt.', ['Wärmepumpe', 'Kesselsanierung', 'Solar', 'Reparatur'], ' warm'),
  ('/reparaturservice/', 'reparatur', 'Reparaturservice', 'Reparaturen, Hilfe bei Wasserschäden, Pikettdienst und ein Notfalldienst rund um die Uhr. Wir lassen Sie nicht im Kalten stehen.', ['Reparaturen', 'Wasserschaden', 'Pikettdienst', 'Notfall 24/7'], ''),
]
themen_html = '<div class="themen">' + ''.join(
  f'<a class="thema zeig{k}{" v" + str(i) if i else ""}" href="{h}">{themenbild(art)}<h3>{t}</h3><p>{p}</p><div class="chips">{"".join("<span>" + c + "</span>" for c in ch)}</div><span class="weiter">Mehr erfahren <span>→</span></span></a>'
  for i, (h, art, t, p, ch, k) in enumerate(THEMEN)) + '</div>'
WEG_SZENEN = ''.join(szene(svg, i == 0) for i, (_, _, svg) in enumerate(WEG))
WEG_TEXT = ''.join('<div class="weg-schritt%s"><p class="nr">0%d / 0%d</p><h3>%s</h3><p>%s</p></div>' % (' an' if i == 0 else '', i + 1, len(WEG), t, p) for i, (t, p, _) in enumerate(WEG))
ref_reihe = '<div class="ref-reihe">' + ''.join(
  f'<a class="ref-karte zeig{" v" + str(i) if i else ""}" href="/referenzen/#{a}">{bild(b, n, "(max-width: 1000px) 100vw, 33vw")}<div class="text"><p class="ort">{o}</p><h3>{n}</h3><p>{" und ".join(l)}</p></div></a>'
  for i, (a, b, n, o, t, l) in enumerate(REFS)) + '</div>'
LD = {'@context': 'https://schema.org', '@type': 'Plumber', 'name': 'Intech Sanitär GmbH', 'url': 'https://www.intech-sanitaer.ch/', 'telephone': '+41782447119', 'email': MAIL,
  'address': {'@type': 'PostalAddress', 'streetAddress': 'Tössfeldstrasse 37', 'postalCode': '8406', 'addressLocality': 'Winterthur', 'addressCountry': 'CH'},
  'foundingDate': '2010', 'areaServed': ['Winterthur', 'Zürich', 'Schweiz'], 'openingHours': 'Mo-Su 00:00-23:59'}

start = f'''
    <section class="hero">
      <div class="wrap">
        <div>
          <p class="marke-klein zeig"><i></i>Familienunternehmen seit 2010</p>
          <h1 class="zeig v1"><span class="b">Wasser.</span><span class="r">Wärme.</span><span>Vertrauen.</span></h1>
          <p class="lead zeig v2">Sanitär, Heizung und Reparaturservice aus Winterthur. Für Zürich und die ganze Schweiz, mit Notfalldienst rund um die Uhr.</p>
          <div class="knoepfe zeig v3"><a href="/kontakt/" class="btn btn-haupt">Offerte anfragen {PFEIL}</a><a href="{TEL_LINK}" class="btn btn-zweit"><span class="punkt-live"></span>{TEL}</a></div>
        </div>
        <div class="ecken zeig v2"><div class="buehne anim">{HAUS}</div></div>
      </div>
    </section>

    <section class="abschnitt eng">
      <div class="wrap">
        <div class="kopf zeig">{LABEL('Was wir machen')}<h2>Drei Bereiche. Ein Ansprechpartner.</h2><p>Ob neues Bad, neue Heizung oder ein Notfall in der Nacht: Bei uns haben Sie für alles rund um Wasser und Wärme eine Nummer.</p></div>
        {themen_html}
      </div>
    </section>

    <section class="abschnitt">
      <div class="wrap">
        <div class="kopf zeig">{LABEL('So arbeiten wir')}<h2>Von der ersten Idee bis zum Service danach.</h2></div>
        <div class="weg">
          <div class="weg-buehne" aria-hidden="true"><div class="weg-zaehler">{"<i></i>" * len(WEG)}</div>{WEG_SZENEN}</div>
          <div class="weg-schritte">{WEG_TEXT}</div>
        </div>
      </div>
    </section>
{notfallband()}
    <section class="abschnitt">
      <div class="wrap">
        <div class="kopf zeig">{LABEL('Referenzen')}<h2>Projekte, auf die wir stolz sind.</h2><p>Von der Klinik bis zum Mehrfamilienhaus.</p></div>
        {ref_reihe}
        <div class="knoepfe zeig" style="justify-content:center"><a href="/referenzen/" class="btn btn-zweit">Alle Referenzen ansehen {PFEIL}</a></div>
      </div>
    </section>
{bewertungen()}{band()}'''
seite('/', 'Intech Sanitär GmbH: Sanitär, Heizung und Reparaturservice in Winterthur', 'Intech Sanitär aus Winterthur: Badumbau, Neubau, Wärmepumpe, Kesselsanierung, Solar, Reparaturen, Wasserschaden, Pikettdienst und Notfalldienst 24/7.', start,
      extra=f'  <script type="application/ld+json">{json.dumps(LD, ensure_ascii=False)}</script>\n')

# ================================================================ Themenseiten
def themenseite(pfad, label, titel, lead, buehne_svg, sprung, bloecke, anliegen, faq_liste, band_titel, band_text, extra_vor_faq=''):
    links = ''.join(f'<a href="#{a}">{t}</a>' for a, t in sprung)
    kopfteil = f'''
    <section class="seitenkopf">
      <div class="wrap">
        <div>
          <nav class="pfad zeig" aria-label="Pfad"><a href="/">Start</a><span>/</span><span>{label}</span></nav>
          {LABEL(label)}
          <h1 class="zeig v1">{titel}</h1>
          <p class="lead zeig v2">{lead}</p>
          <div class="knoepfe zeig v3"><a href="/kontakt/?anliegen={anliegen}" class="btn btn-haupt">Offerte anfragen {PFEIL}</a><a href="{TEL_LINK}" class="btn btn-zweit">{TEL}</a></div>
          <div class="sprung zeig v3">{links}</div>
        </div>
        <div class="ecken zeig v2"><div class="buehne anim">{buehne_svg}</div></div>
      </div>
    </section>
'''
    teile = []
    for i, (anker, nr, h2, text, punkte, szene_html, warm, knoepfe) in enumerate(bloecke):
        pk = ''.join(f'<li>{p}</li>' for p in punkte)
        kn = f'<div class="knoepfe">{knoepfe}</div>' if knoepfe else ''
        teile.append(f'<div class="block{" umgekehrt" if i % 2 else ""}{" warm" if warm else ""}" id="{anker}"><div class="zeig"><p class="nr">{nr}</p><h2>{h2}</h2><p>{text}</p><ul class="punkte">{pk}</ul>{kn}</div>{szene_html}</div>')
    f_html, f_ld = faq(faq_liste)
    inhalt = kopfteil + f'''
    <section class="abschnitt eng"><div class="wrap">{"".join(teile)}</div></section>
{extra_vor_faq}{f_html}{band(band_titel, band_text, anliegen)}'''
    return inhalt, f_ld

def gross(svg_400):
    return svg_400

# ---- Sanitär
sanitaer, sanitaer_ld = themenseite('/sanitaer/', 'Sanitär', 'Alles rund ums Wasser.',
  'Vom neuen Bad bis zur kompletten Installation im Neubau. Und wenn etwas tropft, sind wir schnell da.',
  themenbild('sanitaer').replace('<div class="bild anim">', '').replace('</div>', ''),
  [('badumbau', 'Badumbau'), ('neubau', 'Neubau'), ('service', 'Service')],
  [('badumbau', '01 / BADUMBAU', 'Aus Ihrem alten Bad wird ein neues Lieblingszimmer.',
    'Wir planen und bauen Ihr Bad um, von der Idee bis zur Übergabe aus einer Hand. Mit grosser Auswahl, schönen Designs und kurzer Bauzeit.',
    ['Komplette Badsanierung mit einem Ansprechpartner', 'Dusche statt Badewanne, bodeneben', 'Barrierefreies Bad mit Haltegriffen', 'Koordination von Plattenleger, Maler und Elektriker'], vorher_nachher(), False, ''),
   ('neubau', '02 / NEUBAU', 'Sanitär für Ihren Neubau, von Anfang an richtig.',
    'Wir planen und installieren alle Wasser- und Abwasserleitungen, abgestimmt mit Architekt und Bauleitung.',
    ['Kalt- und Warmwasser, Abwasser', 'Vorwandinstallationen und Apparate', 'Termine im Bauprogramm', 'Druckproben und saubere Übergabe'],
    karte(NEUBAU, '<small><b style="color:#3d5bff">Blau</b> Kaltwasser, <b style="color:#e3261b">Rot</b> Warmwasser und Bodenheizung.</small>'), False, ''),
   ('service', '03 / SERVICE', 'Tropft es? Wir reparieren es.',
    'Tropfende Armaturen, verstopfte Abläufe oder ein WC, das nicht mehr spült: Wir finden den Fehler und beheben ihn sauber.',
    ['Armaturen, WC und Spülkästen', 'Verstopfungen und Abläufe', 'Boiler und Warmwasser', 'Regelmässige Wartung'],
    karte(LECK, '<small>Leck gefunden, Rohr abgedichtet, alles wieder dicht.</small>', 'leck'), False,
    f'<a href="/reparaturservice/" class="btn btn-zweit">Zum Reparaturservice {PFEIL}</a>')],
  'Sanitär',
  [('Wie lange dauert ein Badumbau?', 'Ein normales Bad ist je nach Umfang in zwei bis vier Wochen umgebaut. Den genauen Terminplan erhalten Sie mit der Offerte.'),
   ('Haben wir während des Umbaus Wasser?', 'Ja. Unterbrüche halten wir auf wenige Stunden und kündigen sie rechtzeitig an.'),
   ('Ab wann sollten wir Sie in den Neubau einbeziehen?', 'Am besten schon in der Planung. So passen Steigzonen, Technikraum und Anschlüsse von Anfang an.')],
  'Neues Bad oder Neubau geplant?', 'Wir beraten Sie vor Ort und machen Ihnen eine klare Offerte.')
seite('/sanitaer/', 'Sanitär: Badumbau, Neubau, Service | Intech Sanitär', 'Badumbau, Sanitärinstallationen im Neubau und Sanitärservice von Intech Sanitär aus Winterthur.', sanitaer, '/sanitaer/', sanitaer_ld)

# ---- Heizung
heizung, heizung_ld = themenseite('/heizung/', 'Heizung', 'Wärme, die zuverlässig kommt.',
  'Wir ersetzen alte Öl- und Gaskessel durch Wärmepumpen, holen Wärme vom eigenen Dach und helfen schnell, wenn die Heizung streikt.',
  themenbild('heizung').replace('<div class="bild anim">', '').replace('</div>', ''),
  [('waermepumpe', 'Wärmepumpe'), ('solar', 'Solar'), ('reparatur', 'Reparaturservice')],
  [('waermepumpe', '01 / WÄRMEPUMPE UND KESSELSANIERUNG', 'Raus mit dem Ölkessel, rein mit der Wärmepumpe.',
    'Wir bauen den alten Kessel aus, entsorgen ihn und setzen eine moderne Wärmepumpe ein. Die bestehende Wärmeverteilung binden wir sauber an.',
    ['Ausbau und Entsorgung des alten Kessels', 'Luft-Wasser-Wärmepumpe oder Erdsonde', 'Hinweise zu möglichen Fördergeldern', 'Auch für den Neubau'],
    f'<div class="szene-karte zeig">{KESSEL}<div class="szene-unten"><small>Der alte Ölkessel geht, die Wärmepumpe kommt.</small><button class="szene-knopf" type="button" data-ks>Kessel ersetzen</button></div></div>', True, ''),
   ('solar', '02 / SOLAR', 'Warmes Wasser direkt von der Sonne.',
    'Solarkollektoren auf dem Dach erwärmen Ihr Wasser und unterstützen die Heizung. Wir planen, montieren und binden alles an.',
    ['Kollektoren auf dem Dach', 'Speicher im Keller', 'Einbindung in Heizung und Warmwasser'],
    karte(SOLAR, '<small>Die Sonne erwärmt das Wasser im Speicher.</small>', 'solar'), False, ''),
   ('reparatur', '03 / REPARATURSERVICE', 'Heizung kalt? Wir machen sie wieder warm.',
    'Ob Wärmepumpe, Heizkörper oder Bodenheizung: Wir finden die Ursache und reparieren sie. Mit regelmässiger Wartung passiert es gar nicht erst.',
    ['Störungen an Heizung und Wärmepumpe', 'Heizkörper und Bodenheizung', 'Heizungswartung'],
    karte(THERMO, '<small>Von 12 auf 21 Grad: Die Heizung läuft wieder.</small>', 'thermo'), True,
    f'<a href="/reparaturservice/" class="btn btn-zweit">Zum Reparaturservice {PFEIL}</a>')],
  'Heizung',
  [('Lohnt sich der Ersatz meiner alten Ölheizung?', 'Oft ja. Eine Wärmepumpe braucht kein Öl und verursacht keine Abgase. Wir schauen uns Ihre Anlage an und sagen Ihnen ehrlich, was sinnvoll ist.'),
   ('Gibt es Fördergelder für den Heizungsersatz?', 'Je nach Kanton und Gemeinde gibt es Fördergelder für den Ersatz von Öl- und Gasheizungen. Wir sagen Ihnen, worauf Sie achten müssen.'),
   ('Lohnt sich Solar auch bei uns?', 'Das hängt von Dach, Ausrichtung und Verbrauch ab. Wir schauen es uns an und rechnen es Ihnen offen vor.')],
  'Heizung alt oder kalt?', 'Wir kommen vorbei und finden die passende Lösung.')
seite('/heizung/', 'Heizung: Wärmepumpe, Kesselsanierung, Solar | Intech Sanitär', 'Wärmepumpen, Kesselsanierung, Solaranlagen und Heizungsreparatur von Intech Sanitär aus Winterthur.', heizung, '/heizung/', heizung_ld)

# ---- Reparaturservice
kontaktstreifen = f'''
    <section class="abschnitt eng">
      <div class="wrap">
        <div class="kopf mitte zeig">{LABEL('So erreichen Sie uns')}<h2>Wählen Sie, was Ihnen am liebsten ist.</h2></div>
        <div class="kontaktwege" style="grid-template-columns:repeat(auto-fit,minmax(240px,1fr))">
          <a class="kontaktweg zeig" href="{TEL_LINK}"><span class="ic">{icon('tel')}</span><span><b>{TEL}</b><small>Am schnellsten, Tag und Nacht</small></span></a>
          <a class="kontaktweg wa zeig v1" href="{WA}" target="_blank" rel="noopener"><span class="ic">{WA_ICON}</span><span><b>WhatsApp</b><small>Schreiben Sie uns, gerne mit Foto</small></span></a>
          <a class="kontaktweg zeig v2" href="/kontakt/?anliegen=Reparaturservice"><span class="ic">{icon('mail')}</span><span><b>Formular</b><small>Für Reparaturen ohne Eile</small></span></a>
        </div>
      </div>
    </section>
'''
reparatur, reparatur_ld = themenseite('/reparaturservice/', 'Reparaturservice', 'Wir lassen Sie nicht im Kalten stehen.',
  'Reparaturen an Sanitär und Heizung, Hilfe bei Wasserschäden, Pikettdienst und ein Notfalldienst rund um die Uhr. Ein Anruf genügt.',
  UHR_GROSS,
  [('reparaturen', 'Reparaturen'), ('wasserschaden', 'Wasserschaden'), ('pikett', 'Pikettdienst'), ('notfall', 'Notfall 24/7')],
  [('reparaturen', '01 / REPARATUREN', 'Schnell gefunden, sauber repariert.',
    'Tropfende Leitungen, verstopfte Abläufe, ein defekter Boiler oder eine Heizung, die nicht warm wird: Wir kommen mit dem passenden Material und beheben den Fehler.',
    ['Sanitär: Leitungen, Armaturen, WC, Abläufe', 'Heizung: Störungen, Heizkörper, Wärmepumpe', 'Boiler und Warmwasser', 'Klarer Rapport nach dem Einsatz'],
    karte(LECK, '<small>Leck gefunden, abgedichtet, erledigt.</small>', 'leck'), False,
    f'<a href="{WA}" class="btn btn-wa" target="_blank" rel="noopener">{WA_ICON}WhatsApp schreiben</a>'),
   ('wasserschaden', '02 / WASSERSCHADEN', 'Wasser, wo es nicht hingehört? Wir handeln sofort.',
    'Bei einem Wasserschaden zählt jede Stunde. Wir finden und stoppen das Leck, saugen das Wasser ab, stellen Trockner auf und reparieren die Leitung. Auf Wunsch dokumentieren wir alles für Ihre Versicherung.',
    ['Leck orten und sofort stoppen', 'Wasser absaugen und Bautrocknung', 'Leitungen fachgerecht reparieren', 'Fotos und Rapport für die Versicherung'],
    karte(WASSERSCHADEN, '<small>Leck abgedichtet, Wasser getrocknet, alles wieder gut.</small>', 'wasser'), False,
    f'<a href="{TEL_LINK}" class="btn btn-rot"><span class="punkt-live" style="background:#fff"></span>{TEL}</a>'),
   ('pikett', '03 / PIKETTDIENST', 'Erreichbar, auch wenn andere Feierabend haben.',
    'Mit unserem Pikettdienst ist auch am Abend, am Wochenende und an Feiertagen jemand für Sie erreichbar. Ideal für Verwaltungen, Gewerbe und Liegenschaften.',
    ['Abends, am Wochenende und an Feiertagen', 'Für Verwaltungen und Gewerbe', 'Ein fester Ansprechpartner'],
    karte(KALENDER, '<small>Auch Samstag und Sonntag sind wir da.</small>'), False, ''),
   ('notfall', '04 / NOTFALLDIENST 24/7', 'Rohrbruch um Mitternacht? Wir kommen.',
    'Bei Wasserschaden, Rohrbruch oder Heizungsausfall sind wir rund um die Uhr für Sie da, 365 Tage im Jahr. Rufen Sie direkt an.',
    ['Rund um die Uhr erreichbar', 'Schnell vor Ort in der Region Winterthur und Zürich', 'Erste Hilfe gegen Wasserschäden'],
    karte(TAGNACHT, '<small>Tag und Nacht unterwegs zu Ihnen.</small>'), True,
    f'<a href="{TEL_LINK}" class="btn btn-rot"><span class="punkt-live" style="background:#fff"></span>{TEL}</a>')],
  'Reparaturservice',
  [('Wie schnell sind Sie im Notfall vor Ort?', 'In der Region Winterthur und Zürich in der Regel innert weniger Stunden. Rufen Sie uns direkt an.'),
   ('Was kostet ein Serviceeinsatz?', 'Wir rechnen transparent nach Aufwand ab und nennen Ihnen die Ansätze vorab. Ohne versteckte Kosten.'),
   ('Hilft Intech auch bei der Versicherung?', 'Ja. Wir halten den Schaden mit Fotos und einem Rapport fest. Diese Unterlagen können Sie direkt Ihrer Versicherung weitergeben.'),
   ('Kann ich Ihnen ein Foto vom Schaden schicken?', 'Ja, am einfachsten per WhatsApp. So können wir oft schon vorab sagen, was es braucht.')],
  'Etwas kaputt?', 'Rufen Sie an oder schreiben Sie uns. Wir helfen schnell.', kontaktstreifen)
seite('/reparaturservice/', 'Reparaturservice, Pikettdienst und Notfalldienst 24/7 | Intech Sanitär', 'Reparaturen an Sanitär und Heizung, Pikettdienst und Notfalldienst rund um die Uhr von Intech Sanitär in Winterthur und Zürich.', reparatur, '/reparaturservice/', reparatur_ld)

# ================================================================ Referenzen
vitrinen = ''.join(f'''<article class="vitrine{" umgekehrt" if i % 2 else ""}" id="{a}">
        <div class="ecken zeig"><div class="bild">{bild(b, n, "(max-width: 1000px) 100vw, 55vw")}</div></div>
        <div class="zeig v1"><p class="gross-nr">0{i+1}</p><p class="ort">{o}</p><h2>{n}</h2><p>{t}</p><div class="chips">{"".join("<span>" + x + "</span>" for x in l)}</div></div>
      </article>''' for i, (a, b, n, o, t, l) in enumerate(REFS))
referenzen = f'''
    <section class="seitenkopf einfach">
      <div class="wrap">
        <nav class="pfad zeig" aria-label="Pfad"><a href="/">Start</a><span>/</span><span>Referenzen</span></nav>
        {LABEL('Referenzen')}
        <h1 class="zeig v1" style="max-width:860px">Wir helfen Ihnen, Ihre Träume zu verwirklichen.</h1>
        <p class="lead zeig v2">Ausgewählte Projekte aus Sanitär, Heizung und Gebäudetechnik. Von der Klinik bis zum Mehrfamilienhaus.</p>
        <div class="zahlenband zeig v3" style="margin-top:40px"><div class="zahl"><b>2010</b><span>gegründet in Winterthur</span></div><div class="zahl"><b data-zahl="3">3</b><span>Fachbereiche: Sanitär, Heizung, Kälte</span></div><div class="zahl"><b>CH</b><span>Projekte in der ganzen Schweiz</span></div></div>
      </div>
    </section>
    <section class="abschnitt eng"><div class="wrap">{vitrinen}</div></section>
{bewertungen()}{band('Ihr Projekt als nächste Referenz?', 'Wir freuen uns darauf, von Ihrem Vorhaben zu hören.')}'''
seite('/referenzen/', 'Referenzen | Intech Sanitär', 'Referenzen von Intech Sanitär: Derma Medical Clinic Sihlcity, Eichhof West in Kriens und MFH Oberstrasse in Zürich.', referenzen, '/referenzen/')

# ================================================================ Über uns
TEAM = [('Imran Nasufi', 'Geschäftsführer', 'Dipl. Sanitärmeister', 'IN', ''), ('Ali Kqiku', 'Projektleiter Heizung', '', 'AK', ' r'), ('Amin Omrani', 'Bauleitender Sanitärinstallateur', '', 'AO', '')]
team_html = '<div class="team">' + ''.join(f'<div class="person zeig{" v" + str(i) if i else ""}{c}"><span class="init">{k}</span><div><b>{n}</b><small>{r}{"<br>" + f if f else ""}</small></div></div>' for i, (n, r, f, k, c) in enumerate(TEAM)) + '</div>'
WERTE = [('Handwerk mit Stolz', 'Wir liefern Arbeit ab, hinter der wir stehen. Jedes Detail zählt.'), ('Ehrliche Beratung', 'Wir empfehlen, was Sie brauchen, und nicht, was am meisten kostet.'), ('Verlässlichkeit', 'Termine, Offerten, Zusagen: Was wir versprechen, halten wir.')]
werte_html = '<div class="werte">' + ''.join(f'<div class="wert zeig{" v" + str(i) if i else ""}"><h3>{t}</h3><p>{p}</p></div>' for i, (t, p) in enumerate(WERTE)) + '</div>'
ueber = f'''
    <section class="seitenkopf">
      <div class="wrap">
        <div>
          <nav class="pfad zeig" aria-label="Pfad"><a href="/">Start</a><span>/</span><span>Über uns</span></nav>
          {LABEL('Über uns')}
          <h1 class="zeig v1">Ein Familienunternehmen. Seit 2010.</h1>
          <p class="lead zeig v2">Seit 2010 haben wir schweizweit viele Kundinnen und Kunden mit unserer Arbeit überzeugt, im Neubau, im Umbau und im Service. Wir sind mit Leidenschaft in der Sanitärtechnik tätig und entwickeln uns laufend weiter.</p>
        </div>
        <div class="ecken zeig v2"><div class="vitrine-bild" style="border-radius:20px;overflow:hidden;aspect-ratio:4/3">{bild('service-montage', 'Monteur von Intech Sanitär bei der Arbeit', '(max-width: 1000px) 100vw, 45vw', True).replace('<img ', '<img style="width:100%;height:100%;object-fit:cover" ')}</div></div>
      </div>
    </section>
    <section class="abschnitt eng">
      <div class="wrap">
        <div class="kopf zeig">{LABEL('Unser Team')}<h2>Die Menschen hinter Intech.</h2><p>Ein eingespieltes Team aus Fachleuten für Wasser, Wärme, Solar und Kälte.</p></div>
        {team_html}
      </div>
    </section>
    <section class="abschnitt eng">
      <div class="wrap">
        <div class="kopf zeig">{LABEL('Was uns wichtig ist')}<h2>Darauf können Sie zählen.</h2></div>
        {werte_html}
      </div>
    </section>
{bewertungen()}
    <section class="abschnitt eng" id="stellen">
      <div class="wrap">
        <div class="band zeig">
          <div><h2>Wir suchen Verstärkung.</h2><p>Du bist Sanitärinstallateur:in oder Heizungsmonteur:in und suchst ein familiäres Team? Melde dich bei uns, am liebsten per Telefon oder E-Mail.</p></div>
          <div class="knoepfe"><a href="mailto:{MAIL}?subject=Bewerbung" class="btn btn-haupt">Bewerbung senden {PFEIL}</a><a href="{TEL_LINK}" class="btn btn-zweit">{TEL}</a></div>
        </div>
      </div>
    </section>
'''
seite('/ueber-uns/', 'Über uns: Familienunternehmen seit 2010 | Intech Sanitär', 'Intech Sanitär ist ein Familienunternehmen aus Winterthur, seit 2010 in Sanitär und Heizung tätig. Lernen Sie unser Team kennen.', ueber, '/ueber-uns/')

# ================================================================ Kontakt
ANLIEGEN = ['Sanitär', 'Heizung', 'Reparaturservice', 'Etwas anderes']
wahl = ''.join(f'<label><input type="radio" name="Anliegen" value="{a}"><span>{a}</span></label>' for a in ANLIEGEN)
kontakt = f'''
    <section class="seitenkopf einfach">
      <div class="wrap">
        <nav class="pfad zeig" aria-label="Pfad"><a href="/">Start</a><span>/</span><span>Kontakt</span></nav>
        {LABEL('Kontakt')}
        <h1 class="zeig v1" style="max-width:820px">Ihr nächstes Projekt planen.</h1>
        <p class="lead zeig v2">Schreiben Sie uns oder rufen Sie an. Die Beratung vor Ort ist kostenlos und unverbindlich. Im Notfall bitte direkt anrufen.</p>
      </div>
    </section>
    <section class="abschnitt eng">
      <div class="wrap" style="display:grid;grid-template-columns:minmax(0,1.25fr) minmax(0,.75fr);gap:clamp(24px,4vw,48px);align-items:start" id="kontaktraster">
        <form class="form zeig" data-form novalidate>
          <div data-form-inhalt>
            <fieldset class="frage" data-pflicht><legend>Worum geht es?</legend><div class="wahl">{wahl}</div></fieldset>
            <div class="felder">
              <label class="feld" data-pflicht><span>Vorname und Name</span><input type="text" name="Name" autocomplete="name" maxlength="120"></label>
              <label class="feld" data-pflicht><span>Telefon</span><input type="tel" name="Telefon" autocomplete="tel" maxlength="40"></label>
              <label class="feld" data-pflicht data-email><span>E-Mail</span><input type="email" name="E-Mail" autocomplete="email" maxlength="120"></label>
              <label class="feld"><span>Ort <small>(freiwillig)</small></span><input type="text" name="Ort" autocomplete="address-level2" maxlength="120"></label>
            </div>
            <label class="feld" data-pflicht><span>Ihre Nachricht</span><textarea name="Nachricht" maxlength="3000" placeholder="Zum Beispiel: Wir möchten unsere Ölheizung durch eine Wärmepumpe ersetzen."></textarea></label>
            <label class="honig" aria-hidden="true">Nicht ausfüllen<input type="text" name="_honey" tabindex="-1" autocomplete="off"></label>
            <p class="meldung" role="alert"></p>
            <div class="form-fuss"><p>Ihre Angaben verwenden wir nur, um Ihre Anfrage zu beantworten.</p><button type="submit" class="btn btn-haupt">Anfrage senden {PFEIL}</button></div>
          </div>
          <div class="fertig" data-fertig hidden>
            <svg viewBox="0 0 84 84" aria-hidden="true"><circle cx="42" cy="42" r="38"/><path d="M26 43l11 11 21-23"/></svg>
            <h3>Vielen Dank!</h3><p>Ihre Anfrage ist bei uns angekommen. Wir melden uns so schnell wie möglich bei Ihnen.</p>
          </div>
          <div class="fertig" data-fehler hidden>
            <h3>Das hat leider nicht geklappt.</h3><p>Schicken Sie uns Ihre Anfrage einfach per E-Mail, Ihre Angaben sind schon drin. Oder rufen Sie uns an.</p>
            <div class="knoepfe" style="justify-content:center"><a class="btn btn-haupt" data-mail href="mailto:{MAIL}">Per E-Mail senden</a><a class="btn btn-zweit" href="{TEL_LINK}">{TEL}</a></div>
          </div>
        </form>
        <div class="kontaktwege">
          <a class="kontaktweg zeig" href="{TEL_LINK}"><span class="ic">{icon('tel')}</span><span><b>{TEL}</b><small>Auch im Notfall, rund um die Uhr</small></span></a>
          <a class="kontaktweg zeig v1" href="mailto:{MAIL}"><span class="ic">{icon('mail')}</span><span><b>E-Mail</b><small>{MAIL}</small></span></a>
          <a class="kontaktweg zeig v2" href="{GOOGLE}" target="_blank" rel="noopener"><span class="ic">{icon('ort')}</span><span><b>Intech Sanitär GmbH</b><small>{ADR}</small></span></a>
        </div>
      </div>
    </section>
'''
seite('/kontakt/', 'Kontakt und Offerte | Intech Sanitär', 'Kontakt zu Intech Sanitär in Winterthur: Telefon, E-Mail und Anfrage für eine kostenlose Beratung vor Ort.', kontakt, None,
      '  <style>@media (max-width:1000px){#kontaktraster{grid-template-columns:minmax(0,1fr)!important}}</style>\n')

# ================================================================ Rechtliches
def textseite(pfad, titel, inhalt, beschreibung):
    seite(pfad, f'{titel} | Intech Sanitär', beschreibung, f'''
    <section class="seitenkopf einfach"><div class="wrap">{LABEL('Rechtliches')}<h1>{titel}</h1></div></section>
    <section class="abschnitt eng"><div class="wrap"><div class="text-seite">{inhalt}</div></div></section>
''')
textseite('/impressum/', 'Impressum', f'''
      <h2>Anbieter</h2><p>Intech Sanitär GmbH<br>{ADR}<br>Schweiz</p>
      <p><a href="{TEL_LINK}">{TEL}</a><br><a href="mailto:{MAIL}">{MAIL}</a></p>
      <h2>Vertretungsberechtigte Person</h2><p>Imran Nasufi, Geschäftsführer</p>
      <h2>Handelsregister</h2><p>Eingetragen im Handelsregister des Kantons Zürich<br>UID: CHE-255.644.231</p>
      <h2>Haftung</h2><p>Die Inhalte dieser Website werden mit Sorgfalt erstellt. Für Richtigkeit, Vollständigkeit und Aktualität übernehmen wir keine Gewähr. Für Inhalte verlinkter Websites sind ausschliesslich deren Betreiber verantwortlich.</p>
      <h2>Urheberrecht</h2><p>Texte, Bilder und Gestaltung dieser Website sind urheberrechtlich geschützt. Eine Verwendung ausserhalb dieser Website ist nur mit unserer Zustimmung erlaubt.</p>
''', 'Impressum der Intech Sanitär GmbH, Winterthur.')
textseite('/datenschutz/', 'Datenschutz', f'''
      <p>Wir behandeln Ihre Angaben vertraulich und nach dem Schweizer Datenschutzgesetz.</p>
      <h2>Kontaktformular</h2><p>Wenn Sie uns über das Formular schreiben, werden Ihre Angaben per E-Mail an uns weitergeleitet (über den Dienst FormSubmit) und in unserem geschützten Anfragen-Verzeichnis gespeichert. Wir verwenden sie nur, um Ihre Anfrage zu beantworten, und geben sie nicht weiter.</p>
      <h2>WhatsApp</h2><p>Wenn Sie uns über WhatsApp schreiben, gelten zusätzlich die Datenschutzbestimmungen von WhatsApp.</p>
      <h2>Keine Werbe-Cookies</h2><p>Diese Website setzt keine Cookies für Werbung oder Auswertungen. Schriften und Bilder liegen auf unserem eigenen Server.</p>
      <h2>Links zu Google</h2><p>Die Links zu unseren Google-Bewertungen und zum Standort führen zu Google. Dort gelten die Datenschutzbestimmungen von Google.</p>
      <h2>Auskunft</h2><p>Sie können jederzeit Auskunft über Ihre gespeicherten Angaben verlangen oder deren Löschung beantragen: <a href="mailto:{MAIL}">{MAIL}</a></p>
''', 'Datenschutz der Intech Sanitär GmbH.')

# ================================================================ 404 und Weiterleitungen
d = seite('/404/', 'Seite nicht gefunden | Intech Sanitär', 'Diese Seite gibt es nicht.', f'''
    <section class="seitenkopf einfach"><div class="wrap" style="text-align:center;padding-top:60px;padding-bottom:60px">
      <p class="label" style="justify-content:center"><i></i>Fehler 404</p><h1>Hier ist leider ein Rohr leer.</h1>
      <p class="lead" style="margin:18px auto 0">Diese Seite gibt es nicht. Auf der Startseite finden Sie alles Wichtige.</p>
      <div class="knoepfe" style="justify-content:center"><a href="/" class="btn btn-haupt">Zur Startseite {PFEIL}</a><a href="/kontakt/" class="btn btn-zweit">Kontakt</a></div>
    </div></section>
''')
(W / '404.html').write_text(d.read_text().replace('<link rel="canonical" href="https://www.intech-sanitaer.ch/404/" />\n', ''))
d.unlink(); d.parent.rmdir()
WEITER = {'neubau': '/sanitaer/#neubau', 'umbau': '/sanitaer/#badumbau', 'sanierung': '/heizung/#waermepumpe',
          'leistungen/neubau': '/sanitaer/#neubau', 'leistungen/umbau': '/sanitaer/#badumbau', 'leistungen/service': '/reparaturservice/', 'team': '/ueber-uns/'}
for alt, neu in WEITER.items():
    ordner = W / alt
    if ordner.exists():
        shutil.rmtree(ordner)
    ordner.mkdir(parents=True)
    (ordner / 'index.html').write_text(f'<!doctype html>\n<html lang="de-CH"><head><meta charset="UTF-8"><title>Intech Sanitär</title><meta name="robots" content="noindex"><link rel="canonical" href="https://www.intech-sanitaer.ch{neu.split("#")[0]}"><meta http-equiv="refresh" content="0; url={neu}"></head><body><a href="{neu}">Weiter</a></body></html>\n')
(W / 'robots.txt').write_text('User-agent: *\nAllow: /\nDisallow: /admin/\nDisallow: /buchhaltung/\n\nSitemap: https://www.intech-sanitaer.ch/sitemap.xml\n')
(W / 'sitemap.xml').write_text('<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + ''.join(
  f'  <url><loc>https://www.intech-sanitaer.ch{p}</loc></url>\n' for p in ['/', '/sanitaer/', '/heizung/', '/reparaturservice/', '/referenzen/', '/ueber-uns/', '/kontakt/', '/impressum/', '/datenschutz/']) + '</urlset>\n')
print('fertig')
