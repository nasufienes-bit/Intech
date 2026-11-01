"""Baut die neue, schlichte Website von Intech Sanitär (statisches HTML)."""
import json, pathlib, html as H
W = pathlib.Path.home() / 'Nasuvia/Intech/web'
TEL, TEL_LINK, MAIL = '+41 78 244 71 19', 'tel:+41782447119', 'info@intech-sanitaer.ch'
ADR = 'Tössfeldstrasse 37, 8406 Winterthur'
GOOGLE = 'https://www.google.com/maps/place/Intech+Sanit%C3%A4r+GmbH/@47.4914904,8.7156996,17z/data=!4m6!3m5!1s0x479a9932637f8381:0x866c5301cdf9ad9b!8m2!3d47.4914904!4d8.7156996!16s%2Fg%2F11l66t1w9q'
V = '1'
PFEIL = '<span class="pfeil" aria-hidden="true">→</span>'

ICON = {
  'tropfen': '<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11Z"/><path d="M9.5 14.5a2.5 2.5 0 0 0 2.5 2.5"/>',
  'flamme': '<path d="M12 3c1 3.5 5 5.5 5 10a5 5 0 0 1-10 0c0-2.5 1.5-4 2.5-5 .3 1.6 1 2.6 2 3 0-3 .5-5.5.5-8Z"/>',
  'wp': '<rect x="3" y="6" width="18" height="13" rx="2"/><circle cx="10" cy="12.5" r="3.5"/><path d="M10 9v7M6.5 12.5h7M16.5 9.5h2M16.5 12.5h2M16.5 15.5h2"/>',
  'sonne': '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
  'plan': '<path d="M3 21V8l6-5 6 5v13"/><path d="M9 21v-6h6v6M15 12h6v9"/>',
  'helm': '<path d="M4 17a8 8 0 0 1 16 0"/><path d="M2 17h20v3H2zM10 9V5h4v4"/>',
  'bad': '<path d="M3 12h18v3a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5v-3Z"/><path d="M6 12V5a2 2 0 0 1 4 0M7 20l-1 2M17 20l1 2"/>',
  'dusche': '<path d="M5 21V8a5 5 0 0 1 10 0"/><path d="M12 8h6M14 12v1M17 12v1M20 12v1M15 16v1M18 16v1"/>',
  'griff': '<path d="M4 12h16"/><circle cx="4" cy="12" r="1.5"/><circle cx="20" cy="12" r="1.5"/><path d="M8 7v10M16 7v10"/>',
  'kueche': '<path d="M4 11h16v9H4z"/><path d="M8 11V7a3 3 0 0 1 6 0M14 7h2"/>',
  'praxis': '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M12 8v8M8 12h8"/>',
  'stil': '<path d="M12 3l2.5 5.5L20 9.5l-4 4 1 6-5-3-5 3 1-6-4-4 5.5-1Z"/>',
  'kessel': '<rect x="6" y="6" width="12" height="15" rx="2"/><path d="M9 6V3h6v3M9 11h6M9 15h3"/>',
  'boiler': '<rect x="7" y="2" width="10" height="20" rx="5"/><path d="M10 9h4M12 15v3"/>',
  'rohr': '<path d="M3 7h9a4 4 0 0 1 4 4v10"/><path d="M3 11h9M12 21h8"/>',
  'renov': '<path d="M14.5 5.5a3.5 3.5 0 0 0-4.9 4.9L3 17l4 4 6.6-6.6a3.5 3.5 0 0 0 4.9-4.9l-2.3 2.3-2.4-.6-.6-2.4Z"/>',
  'wartung': '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 9h18M8 3v4M16 3v4M9 15l2 2 4-4"/>',
  'notfall': '<path d="M12 3l9 16H3Z"/><path d="M12 10v4M12 17h.01"/>',
  'tel': '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>',
  'mail': '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
  'ort': '<path d="M12 21s7-6.2 7-11a7 7 0 0 0-14 0c0 4.8 7 11 7 11Z"/><circle cx="12" cy="10" r="2.5"/>',
}
def icon(n): return f'<svg viewBox="0 0 24 24" aria-hidden="true">{ICON[n]}</svg>'
def bild(name, alt, groesse='(max-width: 1000px) 100vw, 33vw', eager=False):
    src = f'/images/{name}.jpg'
    srcset = f'/images/{name}-480.jpg 480w, /images/{name}-960.jpg 960w, {src} 1600w' if name != 'hero-bad' else ''
    s = f' srcset="{srcset}" sizes="{groesse}"' if srcset else ''
    return f'<img src="{src}"{s} alt="{H.escape(alt)}" loading="{"eager" if eager else "lazy"}" decoding="async">'

LOGO = '<a href="/" class="logo" aria-label="Intech Sanitär, zur Startseite"><i class="tl"></i><span class="lw"><b>INTECH</b><span class="ls"><em>Sanitär</em><em>Heizung</em></span></span><i class="br"></i></a>'
NAV = [('/neubau/', 'Neubau'), ('/umbau/', 'Umbau'), ('/sanierung/', 'Renovation & Sanierung'), ('/referenzen/', 'Referenzen'), ('/ueber-uns/', 'Über uns')]

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
  <meta name="theme-color" content="#f7f8f6" />
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  <link rel="preload" href="/fonts/space-grotesk.woff2" as="font" type="font/woff2" crossorigin />
  <link rel="stylesheet" href="/css/site.css?v={V}" />
{extra}</head>'''

def nav(aktiv):
    akt = ' aria-current="page"'
    links = ''.join(f'<a href="{h}"{akt if h == aktiv else ""}>{t}</a>' for h, t in NAV)
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
    {''.join(f'<a href="{h}">{t}</a>' for h, t in NAV)}
    <a href="/kontakt/" class="klein">Kontakt</a>
    <a href="/kontakt/" class="btn btn-haupt">Offerte anfragen</a>
    <a href="{TEL_LINK}" class="btn btn-zweit"><span class="punkt-live"></span>{TEL}</a>
  </nav>
  <main>'''

FUSS = f'''  </main>
  <footer class="fuss">
    <div class="wrap">
      <div class="fuss-raster">
        <div>{LOGO}<p style="margin-top:14px;max-width:300px">Sanitär und Heizung für Neubau, Umbau und Sanierung. Familienunternehmen aus Winterthur, seit 2010.</p></div>
        <div><h4>Leistungen</h4><a href="/neubau/">Neubau</a><a href="/umbau/">Umbau</a><a href="/sanierung/">Renovation & Sanierung</a><a href="/sanierung/#service">Service & Reparatur</a></div>
        <div><h4>Intech</h4><a href="/referenzen/">Referenzen</a><a href="/ueber-uns/">Über uns</a><a href="/ueber-uns/#stellen">Offene Stellen</a><a href="/kontakt/">Kontakt</a></div>
        <div><h4>Kontakt</h4><a href="{TEL_LINK}">{TEL}</a><a href="mailto:{MAIL}">{MAIL}</a><a href="{GOOGLE}" target="_blank" rel="noopener">{ADR}</a></div>
      </div>
      <div class="fuss-unten"><span>© 2026 Intech Sanitär GmbH</span><nav><a href="/impressum/">Impressum</a><a href="/datenschutz/">Datenschutz</a></nav></div>
    </div>
  </footer>
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
        <div class="kopf mitte zeig"><p class="label">Gut zu wissen</p><h2>{titel}</h2></div>
        <div class="faq zeig">{teile}</div>
      </div>
    </section>
''', f'  <script type="application/ld+json">{json.dumps(ld, ensure_ascii=False)}</script>\n'

def unterthemen(liste):
    teile = []
    for i, (anker, ic, titel, text, punkte, warm) in enumerate(liste):
        v = f' v{i % 3}' if i % 3 else ''
        pk = ''.join(f'<li>{p}</li>' for p in punkte)
        teile.append(f'<article class="unter zeig{v}{" warm" if warm else ""}" id="{anker}"><div class="ic">{icon(ic)}</div><h3>{titel}</h3><p>{text}</p><ul>{pk}</ul></article>')
    return '<div class="unterthemen">' + ''.join(teile) + '</div>'

def ablauf(schritte):
    return '<div class="ablauf">' + ''.join(f'<div class="schritt zeig{" v" + str(i) if i else ""}"><h3>{t}</h3><p>{p}</p></div>' for i, (t, p) in enumerate(schritte)) + '</div>'

def seitenkopf(label, titel, lead, bildname, bildalt, sprung, anliegen):
    links = ''.join(f'<a href="#{a}">{t}</a>' for a, t in sprung)
    return f'''
    <section class="seitenkopf">
      <div class="wrap">
        <div>
          <nav class="pfad zeig" aria-label="Pfad"><a href="/">Start</a><span>/</span><span>{label}</span></nav>
          <p class="label zeig">{label}</p>
          <h1 class="zeig v1">{titel}</h1>
          <p class="lead zeig v2">{lead}</p>
          <div class="knoepfe zeig v3"><a href="/kontakt/?anliegen={anliegen}" class="btn btn-haupt">Offerte anfragen {PFEIL}</a><a href="{TEL_LINK}" class="btn btn-zweit">{TEL}</a></div>
          <div class="sprung zeig v3">{links}</div>
        </div>
        <div class="rahmen"><div class="rahmen-bild">{bild(bildname, bildalt, '(max-width: 1000px) 100vw, 45vw', True)}</div></div>
      </div>
    </section>
'''

# ------------------------------------------------------------------ Szenen
KESSEL = '''<svg class="ks" viewBox="0 0 520 340" role="img" aria-label="Der alte Ölkessel wird durch eine Wärmepumpe ersetzt">
  <rect width="520" height="340" rx="18" fill="#f3f5fa"/>
  <path d="M20 300H500" stroke="#c9cfdc" stroke-width="3" stroke-linecap="round"/>
  <text x="28" y="40" style="font:600 12px 'Space Grotesk',sans-serif;letter-spacing:.14em;fill:#8a91a0">HEIZRAUM</text>
  <path class="rohr warm" d="M282 150H404" stroke-width="10" stroke-linecap="round" fill="none"/>
  <path class="rohr kalt" d="M282 220H404" stroke-width="10" stroke-linecap="round" fill="none"/>
  <path class="fluss" d="M282 150H404" stroke="#fff" stroke-width="3" fill="none"/>
  <path class="fluss" d="M404 220H282" stroke="#fff" stroke-width="3" fill="none"/>
  <g><rect x="404" y="110" width="78" height="150" rx="10" fill="#fff" stroke="#d6dbe6" stroke-width="2"/>
    <path d="M420 124v122M436 124v122M452 124v122M468 124v122" stroke="#e1e5ee" stroke-width="6" stroke-linecap="round"/></g>
  <g class="alt">
    <path d="M178 112V48" stroke="#8a919e" stroke-width="16"/>
    <g class="rauch"><circle cx="178" cy="44" r="10"/><circle cx="178" cy="44" r="10"/><circle cx="178" cy="44" r="10"/></g>
    <rect x="104" y="110" width="178" height="190" rx="12" fill="#5d6472"/>
    <rect x="120" y="128" width="146" height="64" rx="8" fill="#4a505c"/>
    <text x="193" y="168" text-anchor="middle" style="font:700 22px 'Space Grotesk',sans-serif;fill:#cfd3db;letter-spacing:.1em">ÖL</text>
    <circle cx="140" cy="236" r="16" fill="#3f444f" stroke="#7a818e" stroke-width="3"/><path d="M140 236l8-8" stroke="#e3261b" stroke-width="3" stroke-linecap="round"/>
    <rect x="176" y="222" width="90" height="10" rx="5" fill="#4a505c"/><rect x="176" y="242" width="70" height="10" rx="5" fill="#4a505c"/>
  </g>
  <g class="neu">
    <rect x="96" y="160" width="186" height="140" rx="16" fill="#fff" stroke="#d6dbe6" stroke-width="2"/>
    <circle cx="160" cy="230" r="44" fill="#f3f5fa" stroke="#d6dbe6" stroke-width="2"/>
    <g class="rotor"><path d="M160 230c0-26 18-30 22-18s-10 16-22 18Zm0 0c22 13 16 30 3 28s-6-18-3-28Zm0 0c-22 13-34 0-26-10s20 0 26 10Z" fill="#3d5bff"/><circle cx="160" cy="230" r="6" fill="#16247e"/></g>
    <path d="M224 196h40M224 214h40M224 232h40M224 250h40M224 268h40" stroke="#e1e5ee" stroke-width="5" stroke-linecap="round"/>
    <text x="110" y="184" style="font:700 11px 'Space Grotesk',sans-serif;fill:#2440d0;letter-spacing:.12em">WÄRMEPUMPE</text>
  </g>
  <g class="anzeige"><rect x="300" y="38" width="196" height="44" rx="22" fill="#e9f7f1"/><path d="M322 66c0-12 9-18 22-18-1 13-8 20-22 18Zm0 0 9-9" stroke="#1a9b6c" stroke-width="2.4" fill="none" stroke-linecap="round"/><text x="354" y="65" style="font:600 14px 'Space Grotesk',sans-serif;fill:#127a54">Ohne Öl, ohne Abgase</text></g>
</svg>'''

def kessel_szene():
    return f'''<div class="szene zeig">{KESSEL}<div class="szene-unten"><small>So sieht ein Heizungsersatz aus: Der alte Ölkessel geht, die Wärmepumpe kommt.</small><button class="szene-knopf" type="button" data-ks>Kessel ersetzen</button></div></div>'''

NEUBAU = '''<svg class="nb" viewBox="0 0 520 400" role="img" aria-label="Querschnitt durch einen Neubau mit Leitungen, Bodenheizung, Wärmepumpe und Solaranlage">
  <rect width="520" height="400" rx="18" fill="#f3f5fa"/>
  <path d="M70 140 260 40l190 100" fill="#fff" stroke="#0e1016" stroke-width="3" stroke-linejoin="round"/>
  <rect x="90" y="140" width="340" height="200" fill="#fff" stroke="#0e1016" stroke-width="3"/>
  <path d="M90 240h340" stroke="#0e1016" stroke-width="3"/>
  <rect x="90" y="340" width="340" height="44" fill="#e6e9f1"/>
  <path d="M40 340h440" stroke="#0e1016" stroke-width="3" stroke-linecap="round"/>
  <g class="geraet g4"><path d="M300 86l60 31-12 8-60-31Z" fill="#2440d0"/><path d="M306 92l48 25M296 99l48 25" stroke="#8ea0ff" stroke-width="1.5"/></g>
  <path class="boden" style="--l:520" d="M100 232h30l6-6 6 6 6-6 6 6 6-6 6 6 6-6 6 6 6-6 6 6 6-6 6 6 6-6 6 6 6-6 6 6 6-6 6 6 6-6 6 6h150"/>
  <path class="boden" style="--l:520" d="M100 332h30l6-6 6 6 6-6 6 6 6-6 6 6 6-6 6 6 6-6 6 6 6-6 6 6 6-6 6 6 6-6 6 6 6-6 6 6 6-6 6 6h150"/>
  <path class="leitung kalt" style="--l:420" d="M60 372H200V170H330"/>
  <path class="leitung kalt" style="--l:200" d="M200 290H330"/>
  <path class="leitung warm" style="--l:420" d="M140 362H220V180H346"/>
  <path class="leitung warm" style="--l:300" d="M220 120V100L300 100"/>
  <g class="geraet g1"><rect x="330" y="160" width="70" height="20" rx="8" fill="#fff" stroke="#0e1016" stroke-width="2.5"/><path d="M365 160v-14h10" stroke="#0e1016" stroke-width="2.5" fill="none"/></g>
  <g class="geraet g2"><rect x="330" y="280" width="70" height="46" rx="4" fill="#fff" stroke="#0e1016" stroke-width="2.5"/><path d="M342 280v-8h46v8" stroke="#0e1016" stroke-width="2.5" fill="none"/></g>
  <g class="geraet g3"><rect x="112" y="350" width="64" height="30" rx="6" fill="#fff" stroke="#2440d0" stroke-width="2.5"/><circle cx="132" cy="365" r="9" fill="none" stroke="#2440d0" stroke-width="2.5"/></g>
  <text x="104" y="160" style="font:600 11px 'Space Grotesk',sans-serif;fill:#8a91a0;letter-spacing:.12em">BAD</text>
  <text x="104" y="260" style="font:600 11px 'Space Grotesk',sans-serif;fill:#8a91a0;letter-spacing:.12em">KÜCHE</text>
</svg>'''

def neubau_szene():
    return f'<div class="szene zeig">{NEUBAU}<div class="szene-unten"><small><b style="color:#3d5bff">Blau</b> Kaltwasser, <b style="color:#e3261b">Rot</b> Wärme und Warmwasser, dazu Bodenheizung, Wärmepumpe und Solar.</small></div></div>'

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
    return f'''<div class="szene zeig"><div class="vn">{VORHER}{NACHHER}<span class="griff" aria-hidden="true"></span><span class="tag l">Vorher</span><span class="tag r">Nachher</span>
      <input type="range" min="0" max="100" value="50" aria-label="Vorher und Nachher vergleichen"></div>
      <div class="szene-unten"><small>Ziehen Sie den Regler: aus der alten Badewanne wird eine bodenebene Dusche.</small></div></div>'''

# ------------------------------------------------------------------ Inhalte
BEWERTUNGEN = [
  ('Alem Bally', 'Wärmepumpe', 'Mega gueti Erfahrig gmacht. De alti Ölkessel isch schnell und sauber usgebaut worde und d Wärmepumpe perfekt installiert. D Arbeit isch sehr professionell gmacht worde und alles isch ordentlich hinderlah worde. Me het gmerkt, dass sie vom Fach sind. Sehr zuverlässig, freundlich und immer erreichbar bi Frage. Bi sehr froh, hani die Firma gnoh. Klari Wiiterempfehlung.'),
  ('Luca Andrist', 'Badsanierung', 'Bin sehr zfriede gsi mit de Badzimmersanierig. De Sanitär isch pünktlich cho, het sauber gschafft und s Problem schnell gfunde und behobe. Sehr freundlich und professionell gsi. Preis-Leistig stimmt absolut. Cha ich nur wiiterempfähle.'),
  ('Ali Kqiku', 'Heizung', 'Er het bi mir ide attikawohnig all die mengelliste vo ich kah han verbessert und het mini heizigsahlang in ordning bracht als so en junge mah chan mer das echt nöd besser mache viele dank Imran Nasufi.'),
]
def bewertungen():
    k = ''.join(f'<figure class="stimme zeig{" v" + str(i) if i else ""}"><div class="sterne" aria-label="5 von 5 Sternen">★★★★★</div><blockquote>{t}</blockquote><footer><b>{n}</b><span>{s}</span></footer></figure>' for i, (n, s, t) in enumerate(BEWERTUNGEN))
    return f'''
    <section class="abschnitt">
      <div class="wrap">
        <div class="kopf mitte zeig"><p class="label">Google Bewertungen</p><h2>Das sagen unsere Kunden.</h2></div>
        <div class="bewertungen">{k}</div>
        <div class="google-zeile zeig"><a class="btn btn-zweit" href="{GOOGLE}" target="_blank" rel="noopener">Alle Bewertungen auf Google ↗</a></div>
      </div>
    </section>
'''

REFS = [
  ('ref-derma-clinic', 'Derma Medical Clinic Sihlcity', 'Zürich', 'Mieterausbau: Sanitär, Heizung und Kälteanlagen für eine Privatklinik im Einkaufszentrum Sihlcity.'),
  ('ref-eichhof-west', 'Eichhof West', 'Kriens', 'Haus B, C und D: Heizung und Solaranlagen in einer grossen Überbauung.'),
  ('ref-mfh-oberstrasse', 'MFH Oberstrasse', 'Zürich', 'Mehrfamilienhaus mit 10 Eigentumswohnungen: Sanitär und Heizung komplett.'),
]
def ref_karten(breit=False):
    if breit:
        return ''.join(f'<article class="ref breit zeig" style="margin-bottom:20px"><div class="bild">{bild(b, n, "(max-width: 1000px) 100vw, 55vw")}</div><div class="text"><p class="ort">{o}</p><h3>{n}</h3><p>{t}</p></div></article>' for b, n, o, t in REFS)
    return '<div class="referenzen">' + ''.join(f'<article class="ref zeig{" v" + str(i) if i else ""}"><div class="bild">{bild(b, n)}</div><div class="text"><p class="ort">{o}</p><h3>{n}</h3><p>{t}</p></div></article>' for i, (b, n, o, t) in enumerate(REFS)) + '</div>'

# ------------------------------------------------------------------ Startseite
LD_FIRMA = {'@context': 'https://schema.org', '@type': 'Plumber', 'name': 'Intech Sanitär GmbH', 'url': 'https://www.intech-sanitaer.ch/', 'telephone': '+41782447119', 'email': MAIL,
  'address': {'@type': 'PostalAddress', 'streetAddress': 'Tössfeldstrasse 37', 'postalCode': '8406', 'addressLocality': 'Winterthur', 'addressCountry': 'CH'},
  'foundingDate': '2010', 'areaServed': ['Winterthur', 'Zürich', 'Schweiz'], 'image': 'https://www.intech-sanitaer.ch/images/hero-bad.jpg',
  'aggregateRating': {'@type': 'AggregateRating', 'ratingValue': '5.0', 'bestRating': '5', 'reviewCount': '3'}}
THEMEN = [
  ('/neubau/', 'neubau-bad', 'Neubau', 'Die ganze Haustechnik für Wasser und Wärme, von Anfang an richtig geplant.', ['Sanitär', 'Bodenheizung', 'Wärmepumpe', 'Solar']),
  ('/umbau/', 'umbau-bad', 'Umbau', 'Aus Ihrem alten Bad wird ein neues. Von der Idee bis zur Übergabe aus einer Hand.', ['Badumbau', 'Barrierefrei', 'Küche', 'Praxis und Gewerbe']),
  ('/sanierung/', 'technik-anlage', 'Renovation & Sanierung', 'Alte Heizung, alte Leitungen, alter Boiler: Wir erneuern, was in die Jahre gekommen ist.', ['Kesselsanierung', 'Strangsanierung', 'Boilerersatz', 'Service']),
]
themen_html = '<div class="themen">' + ''.join(f'''<a class="thema zeig{" v" + str(i) if i else ""}" href="{h}"><div class="thema-bild">{bild(b, t)}<span class="nr">0{i+1}</span></div><div class="thema-text"><h3>{t}</h3><p>{p}</p><div class="chips">{"".join(f"<span>{c}</span>" for c in ch)}</div><span class="weiter">Mehr erfahren <span>→</span></span></div></a>''' for i, (h, b, t, p, ch) in enumerate(THEMEN)) + '</div>'

start = f'''
    <section class="hero">
      <div class="wrap">
        <div>
          <p class="marke-klein zeig"><i></i>Familienunternehmen seit 2010</p>
          <h1 class="zeig v1"><span class="b">Wasser.</span><span class="r">Wärme.</span><span>Vertrauen.</span></h1>
          <p class="lead zeig v2">Sanitär und Heizung für Neubau, Umbau und Sanierung. Aus Winterthur, für Zürich und die ganze Schweiz.</p>
          <div class="knoepfe zeig v3"><a href="/kontakt/" class="btn btn-haupt">Offerte anfragen {PFEIL}</a><a href="{TEL_LINK}" class="btn btn-zweit"><span class="punkt-live"></span>{TEL}</a></div>
        </div>
        <div class="rahmen">
          <div class="rahmen-bild">{bild('hero-bad', 'Modernes Badezimmer, umgesetzt von Intech Sanitär', eager=True)}</div>
          <a class="bewertung-zettel" href="{GOOGLE}" target="_blank" rel="noopener"><b>5,0</b><div><span class="sterne">★★★★★</span><small>Google Bewertungen</small></div></a>
        </div>
      </div>
    </section>

    <section class="abschnitt eng">
      <div class="wrap">
        <div class="kopf zeig"><p class="label">Was wir machen</p><h2>Drei Bereiche. Alles aus einer Hand.</h2><p>Ob neu gebaut, umgebaut oder saniert: Sie haben einen Ansprechpartner für Sanitär und Heizung, vom ersten Gespräch bis zur Übergabe.</p></div>
        {themen_html}
      </div>
    </section>

    <section class="abschnitt weiss">
      <div class="wrap zweispalt">
        <div class="zeig">
          <p class="label rot">Kesselsanierung</p>
          <h2 style="font-size:clamp(1.8rem,3.4vw,2.6rem)">Vom Ölkessel zur Wärmepumpe.</h2>
          <p style="margin-top:14px;font-size:1.08rem">Ihre Heizung ist alt und läuft noch mit Öl oder Gas? Wir bauen den alten Kessel aus und setzen eine moderne Wärmepumpe ein. Sauber, mit festen Terminen und einem Ansprechpartner.</p>
          <div class="knoepfe"><a href="/sanierung/#kesselsanierung" class="btn btn-haupt">Mehr zur Sanierung {PFEIL}</a></div>
        </div>
        {kessel_szene()}
      </div>
    </section>

    <section class="abschnitt">
      <div class="wrap">
        <div class="kopf zeig"><p class="label">Referenzen</p><h2>Projekte, auf die wir stolz sind.</h2><p>Von der Klinik bis zum Mehrfamilienhaus.</p></div>
        {ref_karten()}
        <div class="knoepfe zeig" style="justify-content:center"><a href="/referenzen/" class="btn btn-zweit">Alle Referenzen {PFEIL}</a></div>
      </div>
    </section>
{bewertungen()}
    <section class="abschnitt weiss">
      <div class="wrap zweispalt">
        <div class="rahmen"><div class="rahmen-bild">{bild('service-montage', 'Monteur von Intech Sanitär bei der Arbeit', '(max-width: 1000px) 100vw, 45vw')}</div></div>
        <div class="zeig">
          <p class="label">Über uns</p>
          <h2 style="font-size:clamp(1.8rem,3.4vw,2.6rem)">Ein Familienunternehmen. Seit 2010.</h2>
          <p style="margin-top:14px;font-size:1.06rem">Seit 2010 haben wir schweizweit viele Kundinnen und Kunden mit unserer Arbeit überzeugt, im Neubau, im Umbau und im Service. Wir sind mit Leidenschaft in der Sanitärtechnik tätig und entwickeln uns laufend weiter.</p>
          <div class="zahlen"><div class="zahl"><b data-zahl="16" data-nach="+">16+</b><span>Jahre Erfahrung</span></div><div class="zahl"><b>2010</b><span>gegründet</span></div><div class="zahl"><b data-zahl="4">4</b><span>Fachbereiche</span></div></div>
          <div class="knoepfe"><a href="/ueber-uns/" class="btn btn-zweit">Team kennenlernen {PFEIL}</a></div>
        </div>
      </div>
    </section>
{band()}'''
seite('/', 'Intech Sanitär GmbH: Sanitär und Heizung in Winterthur und Zürich', 'Intech Sanitär GmbH aus Winterthur: Sanitär und Heizung für Neubau, Umbau, Renovation und Sanierung. Familienunternehmen seit 2010.', start,
      extra=f'  <script type="application/ld+json">{json.dumps(LD_FIRMA, ensure_ascii=False)}</script>\n')

# ------------------------------------------------------------------ Neubau
NB_UNTER = [
  ('sanitaer', 'tropfen', 'Sanitärinstallationen', 'Komplette Wasser- und Abwasserinstallationen, sauber dimensioniert und nach Norm.', ['Kalt- und Warmwasserleitungen', 'Abwasser und Entwässerung', 'Vorwandinstallationen'], False),
  ('bodenheizung', 'flamme', 'Heizung und Bodenheizung', 'Behagliche Wärme in jedem Raum, effizient verteilt.', ['Fussbodenheizung', 'Heizkörper', 'Einzelraumregelung'], True),
  ('waermepumpe', 'wp', 'Wärmepumpe', 'Von Anfang an erneuerbar heizen, passend zu Haus und Grundstück geplant.', ['Luft-Wasser-Wärmepumpe', 'Erdsonde', 'Warmwasser inklusive'], True),
  ('solar', 'sonne', 'Solarthermie', 'Warmwasser und Heizungsunterstützung direkt vom eigenen Dach.', ['Kollektoren auf dem Dach', 'Speicher im Keller', 'Einbindung in die Heizung'], False),
  ('badplanung', 'plan', 'Badplanung', 'Vom Grundriss bis zur Armatur: Bäder, die funktionieren und gefallen.', ['Grundriss und Masse', 'Produkte und Design', 'Klare Offerte'], False),
  ('koordination', 'helm', 'Koordination und Abnahme', 'Wir stimmen uns mit Architekt, Bauleitung und allen Gewerken ab.', ['Termine im Bauprogramm', 'Druckproben dokumentiert', 'Saubere Übergabe'], False),
]
nb_faq, nb_ld = faq([
  ('Ab wann sollten wir Sie in den Neubau einbeziehen?', 'Am besten schon in der Planung. So können Steigzonen, Technikraum und Anschlüsse optimal gesetzt werden, und Sie sparen spätere Anpassungen.'),
  ('Arbeiten Sie mit Architekten und der Bauleitung zusammen?', 'Ja, das ist unser Alltag. Wir liefern die nötigen Angaben, halten die Termine im Bauprogramm ein und stimmen uns mit den übrigen Gewerken ab.'),
  ('Übernehmen Sie auch grössere Objekte?', 'Ja, vom Einfamilienhaus über Mehrfamilienhäuser bis zu Gewerbeflächen. Beispiele finden Sie bei unseren Referenzen.')])
neubau = seitenkopf('Neubau', 'Sanitär und Heizung für Ihren Neubau.', 'Ein Neubau ist die Chance, alles von Anfang an richtig zu machen. Wir planen und installieren die ganze Haustechnik für Wasser und Wärme, abgestimmt auf Architektur, Budget und Ihre Wünsche.',
  'neubau-bad', 'Neu gebautes Badezimmer mit Glasdusche', [(a, t) for a, _, t, *_ in NB_UNTER], 'Neubau') + f'''
    <section class="abschnitt eng">
      <div class="wrap">
        <div class="kopf zeig"><p class="label">Unsere Leistungen</p><h2>Alles, was ein Neubau an Wasser und Wärme braucht.</h2></div>
        {unterthemen(NB_UNTER)}
      </div>
    </section>
    <section class="abschnitt weiss">
      <div class="wrap zweispalt">
        <div class="zeig"><p class="label">So entsteht es</p><h2 style="font-size:clamp(1.8rem,3.4vw,2.6rem)">Leitung für Leitung, Stockwerk für Stockwerk.</h2><p style="margin-top:14px;font-size:1.06rem">Im Rohbau legen wir die Leitungen, danach folgen Bodenheizung, Apparate und Technik. Am Schluss prüfen wir alles und übergeben es mit Protokoll.</p></div>
        {neubau_szene()}
      </div>
    </section>
    <section class="abschnitt">
      <div class="wrap">
        <div class="kopf zeig"><p class="label">Ablauf</p><h2>In drei Schritten zum fertigen Neubau.</h2></div>
        {ablauf([('Planung und Konzept', 'Wir erarbeiten das Konzept für Sanitär und Heizung auf Basis Ihrer Pläne, transparent kalkuliert.'), ('Installation im Rohbau', 'Leitungen, Steigzonen und Verteilungen werden termingerecht im Bauablauf installiert.'), ('Fertigmontage und Übergabe', 'Apparate, Armaturen und Feineinstellung, geprüft, dokumentiert und übergeben.')])}
      </div>
    </section>
{nb_faq}{band('Sie planen einen Neubau?', 'Je früher wir dabei sind, desto einfacher wird es. Wir beraten Sie gerne.', 'Neubau')}'''
seite('/neubau/', 'Neubau: Sanitär und Heizung | Intech Sanitär', 'Sanitärinstallationen, Bodenheizung, Wärmepumpe, Solarthermie und Badplanung für Ihren Neubau. Intech Sanitär aus Winterthur.', neubau, '/neubau/', nb_ld)

# ------------------------------------------------------------------ Umbau
UB_UNTER = [
  ('badumbau', 'bad', 'Badumbau komplett', 'Alles aus einer Hand: Rückbau, Installationen, Apparate und die Koordination aller Handwerker.', ['Ein Ansprechpartner', 'Kurze Bauzeit', 'Saubere Baustelle'], False),
  ('barrierefrei', 'griff', 'Barrierefreies Bad', 'Komfort und Sicherheit für jede Lebensphase.', ['Bodenebene Dusche', 'Haltegriffe und Sitz', 'Rutschfeste Beläge'], False),
  ('dusche', 'dusche', 'Dusche statt Badewanne', 'Aus der alten Wanne wird eine grosszügige, bodenebene Dusche.', ['Oft in wenigen Tagen', 'Glaswand nach Mass', 'Moderne Armaturen'], False),
  ('kueche', 'kueche', 'Küche und Waschküche', 'Neue Anschlüsse, wenn Küche oder Waschküche umgebaut werden.', ['Leitungen versetzen', 'Geräte anschliessen', 'Abläufe erneuern'], False),
  ('gewerbe', 'praxis', 'Praxis und Gewerbe', 'Mieterausbau für Praxen, Büros und Läden, auch bei laufendem Betrieb.', ['Sanitär und Heizung', 'Kälteanlagen', 'Termine nach Ihrem Betrieb'], True),
  ('design', 'stil', 'Design und Produktauswahl', 'Grosse Auswahl an Armaturen, Keramik und Möbeln. Wir finden den Stil, der zu Ihnen passt.', ['Beratung vor Ort', 'Muster und Varianten', 'Design im Budget'], False),
]
ub_faq, ub_ld = faq([
  ('Wie lange dauert ein Badumbau?', 'Ein normales Bad ist je nach Umfang in zwei bis vier Wochen umgebaut. Den genauen Terminplan erhalten Sie mit der Offerte.'),
  ('Haben wir während des Umbaus Wasser?', 'Ja. Unterbrüche beschränken wir auf wenige Stunden und kündigen sie immer rechtzeitig an.'),
  ('Koordinieren Sie auch Plattenleger, Maler und Elektriker?', 'Ja. Auf Wunsch übernehmen wir die ganze Koordination. Sie haben nur einen Ansprechpartner.')])
umbau = seitenkopf('Umbau', 'Aus Ihrem Bad wird ein neues Lieblingszimmer.', 'Grosse Auswahl, schöne Designs und ein Team, das Ihren Umbau von der Idee bis zur Übergabe begleitet. Mit kurzer Bauzeit und sauberer Baustelle.',
  'umbau-bad', 'Modernisiertes Badezimmer mit freistehender Badewanne', [(a, t) for a, _, t, *_ in UB_UNTER], 'Umbau') + f'''
    <section class="abschnitt weiss">
      <div class="wrap zweispalt">
        <div class="zeig"><p class="label">Vorher und Nachher</p><h2 style="font-size:clamp(1.8rem,3.4vw,2.6rem)">Sehen Sie selbst, was ein Umbau verändert.</h2><p style="margin-top:14px;font-size:1.06rem">Aus Badewanne, Duschvorhang und alten Fliesen wird ein helles Bad mit bodenebener Dusche, Wand-WC und Möbeln nach Mass.</p></div>
        {vorher_nachher()}
      </div>
    </section>
    <section class="abschnitt">
      <div class="wrap">
        <div class="kopf zeig"><p class="label">Unsere Leistungen</p><h2>Umbauen, ohne sich um alles kümmern zu müssen.</h2></div>
        {unterthemen(UB_UNTER)}
      </div>
    </section>
    <section class="abschnitt eng">
      <div class="wrap">
        <div class="kopf zeig"><p class="label">Ablauf</p><h2>So läuft Ihr Umbau ab.</h2></div>
        {ablauf([('Beratung vor Ort', 'Wir schauen uns Ihr Bad an, hören zu und entwickeln erste Ideen. Kostenlos und unverbindlich.'), ('Design und Offerte', 'Sie erhalten ein konkretes Konzept mit einer klaren Kostenschätzung.'), ('Umbau und Übergabe', 'Wir bauen zügig, sauber und gut abgestimmt, bis zur fertigen Übergabe.')])}
      </div>
    </section>
{ub_faq}{band('Ihr neues Bad beginnt mit einem Gespräch.', 'Wir kommen vorbei, schauen es uns an und machen Ihnen eine klare Offerte.', 'Umbau')}'''
seite('/umbau/', 'Umbau und Badsanierung | Intech Sanitär', 'Badumbau, barrierefreies Bad, Dusche statt Badewanne, Küche und Praxis: Intech Sanitär plant und baut um, aus einer Hand.', umbau, '/umbau/', ub_ld)

# ------------------------------------------------------------------ Renovation und Sanierung
SN_UNTER = [
  ('kesselsanierung', 'kessel', 'Kesselsanierung und Heizungsersatz', 'Wir ersetzen alte Öl- und Gaskessel durch moderne Wärmepumpen und bauen den alten Kessel sauber aus.', ['Ausbau und Entsorgung des alten Kessels', 'Neue Wärmepumpe inklusive Einbindung', 'Hinweise zu möglichen Fördergeldern'], True),
  ('boiler', 'boiler', 'Boilerersatz und Warmwasser', 'Alter Boiler, zu wenig Warmwasser oder Kalk: Wir ersetzen ihn durch ein effizientes Gerät.', ['Boiler und Wärmepumpenboiler', 'Entkalken und Prüfen', 'Schneller Austausch'], True),
  ('leitungen', 'rohr', 'Leitungs- und Strangsanierung', 'Alte Wasserleitungen und Abwasserstränge erneuern, im Einfamilien- und im Mehrfamilienhaus.', ['Steigleitungen ersetzen', 'Etappenweise, Wohnung für Wohnung', 'Wasserunterbrüche kurz halten'], False),
  ('renovation', 'renov', 'Badrenovation', 'Nicht immer muss alles raus. Wir erneuern gezielt Apparate, Armaturen und Spülkästen.', ['WC, Lavabo und Armaturen', 'Spülkasten und Einbauteile', 'Silikonfugen und Abdichtungen'], False),
  ('wartung', 'wartung', 'Wartung von Heizung und Sanitär', 'Regelmässige Wartung verlängert die Lebensdauer und spart Energie.', ['Heizungsservice', 'Kontrolle der Anlagen', 'Erinnerung an den nächsten Termin'], False),
  ('service', 'notfall', 'Reparaturen und Notfall', 'Tropfender Hahn, verstopfter Ablauf, Heizung kalt oder Wasserschaden: Wir helfen schnell.', ['Reparaturen aller Art', 'Schnell vor Ort in der Region', 'Klarer Rapport nach dem Einsatz'], True),
]
sn_faq, sn_ld = faq([
  ('Lohnt sich der Ersatz meiner alten Ölheizung?', 'Oft ja. Eine Wärmepumpe braucht kein Öl und verursacht keine Abgase. Wir schauen uns Ihre Anlage an und sagen Ihnen ehrlich, was sinnvoll ist.'),
  ('Gibt es Fördergelder für den Heizungsersatz?', 'Für den Ersatz von Öl- und Gasheizungen gibt es je nach Kanton und Gemeinde Fördergelder. Wir sagen Ihnen, worauf Sie achten müssen.'),
  ('Wie schnell sind Sie im Notfall da?', f'In der Region Winterthur und Zürich in der Regel innert weniger Stunden. Rufen Sie uns direkt an: {TEL}.'),
  ('Was kostet ein Serviceeinsatz?', 'Wir rechnen transparent nach Aufwand ab und nennen Ihnen die Ansätze vorab. Ohne versteckte Kosten.')])
sanierung = seitenkopf('Renovation & Sanierung', 'Erneuern, was in die Jahre gekommen ist.', 'Alte Heizung, alte Leitungen, alter Boiler: Wir sanieren gezielt und sauber. Und wenn etwas kaputt geht, sind wir schnell zur Stelle.',
  'technik-anlage', 'Moderne Heizungsanlage', [('kesselsanierung', 'Kesselsanierung'), ('boiler', 'Boilerersatz'), ('leitungen', 'Strangsanierung'), ('renovation', 'Badrenovation'), ('wartung', 'Wartung'), ('service', 'Notfall')], 'Sanierung') + f'''
    <section class="abschnitt weiss">
      <div class="wrap zweispalt">
        <div class="zeig"><p class="label rot">Kesselsanierung</p><h2 style="font-size:clamp(1.8rem,3.4vw,2.6rem)">Raus mit dem Ölkessel, rein mit der Wärmepumpe.</h2><p style="margin-top:14px;font-size:1.06rem">Wir bauen den alten Kessel aus, entsorgen ihn und setzen eine moderne Wärmepumpe ein. Die bestehende Wärmeverteilung binden wir sauber an.</p></div>
        {kessel_szene()}
      </div>
    </section>
    <section class="abschnitt">
      <div class="wrap">
        <div class="kopf zeig"><p class="label">Unsere Leistungen</p><h2>Sanieren, renovieren, reparieren.</h2></div>
        {unterthemen(SN_UNTER)}
      </div>
    </section>
    <section class="abschnitt eng">
      <div class="wrap">
        <div class="kopf zeig"><p class="label">Ablauf</p><h2>So gehen wir vor.</h2></div>
        {ablauf([('Anschauen und beraten', 'Wir prüfen Ihre Anlage vor Ort und sagen Ihnen ehrlich, was nötig ist und was nicht.'), ('Offerte und Termin', 'Sie erhalten eine klare Offerte und einen festen Termin. Unterbrüche kündigen wir rechtzeitig an.'), ('Ausführen und übergeben', 'Wir arbeiten sauber, prüfen alles und erklären Ihnen die neue Anlage.')])}
      </div>
    </section>
{sn_faq}{band('Heizung alt, Wasser kalt?', 'Rufen Sie an oder schreiben Sie uns. Wir kommen vorbei und finden die passende Lösung.', 'Sanierung')}'''
seite('/sanierung/', 'Renovation und Sanierung: Kesselsanierung, Boiler, Leitungen | Intech Sanitär', 'Kesselsanierung und Heizungsersatz, Boilerersatz, Strangsanierung, Badrenovation, Wartung und Notfall-Service von Intech Sanitär aus Winterthur.', sanierung, '/sanierung/', sn_ld)

# ------------------------------------------------------------------ Referenzen
referenzen = f'''
    <section class="seitenkopf">
      <div class="wrap" style="display:block">
        <nav class="pfad zeig" aria-label="Pfad"><a href="/">Start</a><span>/</span><span>Referenzen</span></nav>
        <p class="label zeig">Referenzen</p>
        <h1 class="zeig v1" style="max-width:820px">Wir helfen Ihnen, Ihre Träume zu verwirklichen.</h1>
        <p class="lead zeig v2">Ausgewählte Projekte aus Neubau, Umbau und Gebäudetechnik.</p>
      </div>
    </section>
    <section class="abschnitt eng"><div class="wrap">{ref_karten(True)}</div></section>
{bewertungen()}{band('Ihr Projekt als nächste Referenz?', 'Wir freuen uns darauf, von Ihrem Vorhaben zu hören.')}'''
seite('/referenzen/', 'Referenzen | Intech Sanitär', 'Referenzen von Intech Sanitär: Derma Medical Clinic Sihlcity, Eichhof West in Kriens und MFH Oberstrasse in Zürich.', referenzen, '/referenzen/')

# ------------------------------------------------------------------ Über uns
TEAM = [('Imran Nasufi', 'Geschäftsführer', 'Dipl. Sanitärmeister', 'IN', ''), ('Ali Kqiku', 'Projektleiter Heizung', '', 'AK', ' r'), ('Amin Omrani', 'Bauleitender Sanitärinstallateur', '', 'AO', '')]
team_html = '<div class="team">' + ''.join(f'<div class="person zeig{" v" + str(i) if i else ""}{c}"><span class="init">{k}</span><div><b>{n}</b><small>{r}{"<br>" + f if f else ""}</small></div></div>' for i, (n, r, f, k, c) in enumerate(TEAM)) + '</div>'
WERTE = [('stil', 'Handwerk mit Stolz', 'Wir liefern Arbeit ab, hinter der wir stehen. Jedes Detail zählt.'), ('plan', 'Ehrliche Beratung', 'Wir empfehlen, was Sie brauchen, und nicht, was am meisten kostet.'), ('wartung', 'Verlässlichkeit', 'Termine, Offerten, Zusagen: Was wir versprechen, halten wir.')]
werte_html = '<div class="unterthemen">' + ''.join(f'<article class="unter zeig{" v" + str(i) if i else ""}"><div class="ic">{icon(ic)}</div><h3>{t}</h3><p>{p}</p></article>' for i, (ic, t, p) in enumerate(WERTE)) + '</div>'
ueber = f'''
    <section class="seitenkopf">
      <div class="wrap">
        <div>
          <nav class="pfad zeig" aria-label="Pfad"><a href="/">Start</a><span>/</span><span>Über uns</span></nav>
          <p class="label zeig">Über uns</p>
          <h1 class="zeig v1">Ein Familienunternehmen. Seit 2010.</h1>
          <p class="lead zeig v2">Seit 2010 haben wir schweizweit viele Kundinnen und Kunden mit unserer Arbeit überzeugt, im Neubau, im Umbau und im Service. Wir sind mit Leidenschaft in der Sanitärtechnik tätig und entwickeln uns laufend weiter. Sie können sich auf uns verlassen.</p>
        </div>
        <div class="rahmen"><div class="rahmen-bild">{bild('service-montage', 'Monteur von Intech Sanitär bei der Arbeit', '(max-width: 1000px) 100vw, 45vw', True)}</div></div>
      </div>
    </section>
    <section class="abschnitt eng">
      <div class="wrap">
        <div class="kopf zeig"><p class="label">Unser Team</p><h2>Die Menschen hinter Intech.</h2><p>Ein eingespieltes Team aus Fachleuten für Wasser, Wärme, Solar und Kälte.</p></div>
        {team_html}
      </div>
    </section>
    <section class="abschnitt eng">
      <div class="wrap">
        <div class="kopf zeig"><p class="label">Was uns wichtig ist</p><h2>Darauf können Sie zählen.</h2></div>
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

# ------------------------------------------------------------------ Kontakt
ANLIEGEN = ['Neubau', 'Umbau', 'Sanierung', 'Service und Reparatur', 'Etwas anderes']
wahl = ''.join(f'<label><input type="radio" name="Anliegen" value="{a}"><span>{a}</span></label>' for a in ANLIEGEN)
kontakt = f'''
    <section class="seitenkopf">
      <div class="wrap" style="display:block">
        <nav class="pfad zeig" aria-label="Pfad"><a href="/">Start</a><span>/</span><span>Kontakt</span></nav>
        <p class="label zeig">Kontakt</p>
        <h1 class="zeig v1" style="max-width:820px">Ihr nächstes Projekt planen.</h1>
        <p class="lead zeig v2">Schreiben Sie uns oder rufen Sie an. Die Beratung vor Ort ist kostenlos und unverbindlich.</p>
      </div>
    </section>
    <section class="abschnitt eng">
      <div class="wrap zweispalt" style="align-items:start;grid-template-columns:1.25fr .75fr">
        <form class="form zeig" data-form novalidate>
          <div data-form-inhalt>
            <fieldset class="frage" data-pflicht><legend>Worum geht es?</legend><div class="wahl">{wahl}</div></fieldset>
            <div class="felder">
              <label class="feld" data-pflicht><span>Vorname und Name</span><input type="text" name="Name" autocomplete="name" maxlength="120"></label>
              <label class="feld" data-pflicht><span>Telefon</span><input type="tel" name="Telefon" autocomplete="tel" maxlength="40"></label>
              <label class="feld" data-pflicht data-email><span>E-Mail</span><input type="email" name="E-Mail" autocomplete="email" maxlength="120"></label>
              <label class="feld"><span>Ort <small>(freiwillig)</small></span><input type="text" name="Ort" autocomplete="address-level2" maxlength="120"></label>
            </div>
            <label class="feld" data-pflicht><span>Ihre Nachricht</span><textarea name="Nachricht" maxlength="3000" placeholder="Zum Beispiel: Wir möchten unser Bad umbauen und die Badewanne durch eine Dusche ersetzen."></textarea></label>
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
          <a class="kontaktweg zeig" href="{TEL_LINK}"><span class="ic">{icon('tel')}</span><span><b>{TEL}</b><small>Am schnellsten, auch im Notfall</small></span></a>
          <a class="kontaktweg zeig v1" href="mailto:{MAIL}"><span class="ic">{icon('mail')}</span><span><b>E-Mail</b><small>{MAIL}</small></span></a>
          <a class="kontaktweg zeig v2" href="{GOOGLE}" target="_blank" rel="noopener"><span class="ic">{icon('ort')}</span><span><b>Intech Sanitär GmbH</b><small>{ADR}</small></span></a>
        </div>
      </div>
    </section>
'''
seite('/kontakt/', 'Kontakt und Offerte | Intech Sanitär', 'Kontakt zu Intech Sanitär in Winterthur: Telefon, E-Mail und Anfrage für eine kostenlose Beratung vor Ort.', kontakt)

# ------------------------------------------------------------------ Rechtliches
def textseite(pfad, titel, inhalt, beschreibung):
    seite(pfad, f'{titel} | Intech Sanitär', beschreibung, f'''
    <section class="seitenkopf"><div class="wrap" style="display:block"><p class="label">Rechtliches</p><h1>{titel}</h1></div></section>
    <section class="abschnitt eng"><div class="wrap"><div class="text-seite">{inhalt}</div></div></section>
''')
textseite('/impressum/', 'Impressum', f'''
      <h2>Anbieter</h2>
      <p>Intech Sanitär GmbH<br>{ADR}<br>Schweiz</p>
      <p><a href="{TEL_LINK}">{TEL}</a><br><a href="mailto:{MAIL}">{MAIL}</a></p>
      <h2>Vertretungsberechtigte Person</h2>
      <p>Imran Nasufi, Geschäftsführer</p>
      <h2>Handelsregister</h2>
      <p>Eingetragen im Handelsregister des Kantons Zürich<br>UID: CHE-255.644.231</p>
      <h2>Haftung</h2>
      <p>Die Inhalte dieser Website werden mit Sorgfalt erstellt. Für Richtigkeit, Vollständigkeit und Aktualität übernehmen wir keine Gewähr. Für Inhalte verlinkter Websites sind ausschliesslich deren Betreiber verantwortlich.</p>
      <h2>Urheberrecht</h2>
      <p>Texte, Bilder und Gestaltung dieser Website sind urheberrechtlich geschützt. Eine Verwendung ausserhalb dieser Website ist nur mit unserer Zustimmung erlaubt.</p>
''', 'Impressum der Intech Sanitär GmbH, Winterthur.')
textseite('/datenschutz/', 'Datenschutz', f'''
      <p>Wir behandeln Ihre Angaben vertraulich und nach dem Schweizer Datenschutzgesetz.</p>
      <h2>Kontaktformular</h2>
      <p>Wenn Sie uns über das Formular schreiben, werden Ihre Angaben per E-Mail an uns weitergeleitet (über den Dienst FormSubmit). Wir verwenden sie nur, um Ihre Anfrage zu beantworten, und geben sie nicht weiter.</p>
      <h2>Keine Werbe-Cookies</h2>
      <p>Diese Website setzt keine Cookies für Werbung oder Auswertungen. Schriften und Bilder liegen auf unserem eigenen Server.</p>
      <h2>Links zu Google</h2>
      <p>Die Links zu unseren Google-Bewertungen und zum Standort führen zu Google. Dort gelten die Datenschutzbestimmungen von Google.</p>
      <h2>Auskunft</h2>
      <p>Sie können jederzeit Auskunft über Ihre gespeicherten Angaben verlangen oder deren Löschung beantragen: <a href="mailto:{MAIL}">{MAIL}</a></p>
''', 'Datenschutz der Intech Sanitär GmbH.')

# ------------------------------------------------------------------ 404 und Weiterleitungen
d = seite('/404/', 'Seite nicht gefunden | Intech Sanitär', 'Diese Seite gibt es nicht.', f'''
    <section class="seitenkopf"><div class="wrap" style="display:block;text-align:center;padding:60px var(--rand)">
      <p class="label" style="justify-content:center">Fehler 404</p><h1>Hier ist leider ein Rohr leer.</h1>
      <p class="lead" style="margin:18px auto 0">Diese Seite gibt es nicht. Auf der Startseite finden Sie alles Wichtige.</p>
      <div class="knoepfe" style="justify-content:center"><a href="/" class="btn btn-haupt">Zur Startseite {PFEIL}</a><a href="/kontakt/" class="btn btn-zweit">Kontakt</a></div>
    </div></section>
''')
(W / '404.html').write_text(d.read_text().replace('<link rel="canonical" href="https://www.intech-sanitaer.ch/404/" />\n', ''))
d.unlink(); d.parent.rmdir()
for alt, neu in {'leistungen/neubau': '/neubau/', 'leistungen/umbau': '/umbau/', 'leistungen/service': '/sanierung/#service', 'team': '/ueber-uns/'}.items():
    p = W / alt / 'index.html'; p.parent.mkdir(parents=True, exist_ok=True)
    p.write_text(f'<!doctype html>\n<html lang="de-CH"><head><meta charset="UTF-8"><title>Intech Sanitär</title><meta name="robots" content="noindex"><link rel="canonical" href="https://www.intech-sanitaer.ch{neu.split("#")[0]}"><meta http-equiv="refresh" content="0; url={neu}"></head><body><a href="{neu}">Weiter</a></body></html>\n')
(W / 'robots.txt').write_text('User-agent: *\nAllow: /\n\nSitemap: https://www.intech-sanitaer.ch/sitemap.xml\n')
(W / 'sitemap.xml').write_text('<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + ''.join(
  f'  <url><loc>https://www.intech-sanitaer.ch{p}</loc></url>\n' for p in ['/', '/neubau/', '/umbau/', '/sanierung/', '/referenzen/', '/ueber-uns/', '/kontakt/', '/impressum/', '/datenschutz/']) + '</urlset>\n')
print('fertig')
