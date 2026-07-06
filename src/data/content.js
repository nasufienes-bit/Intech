export const site = {
  name: 'Intech Sanitär GmbH',
  tagline: 'Wasser. Wärme. Vertrauen.',
  claim: 'Wir bringen Komfort ins Bad.',
  phone: '+41 78 244 71 19',
  phoneHref: 'tel:+41782447119',
  email: 'info@intech-sanitaer.ch',
  emailHref: 'mailto:info@intech-sanitaer.ch',
  /* Kontakt läuft bewusst über WhatsApp — kein E-Mail-Kontakt im UI */
  whatsappNumber: '41782447119',
  address: 'Tössfeldstrasse 37, 8406 Winterthur',
  serviceArea: 'Ganze Schweiz · Schwerpunkt Zürich & Winterthur',
  founded: 2010,
  ceo: 'Imran Nasufi',
  uid: 'CHE-255.644.231',
  register: 'Handelsregisteramt Zürich',
  website: 'www.intech-sanitaer.ch',
}

/* WhatsApp-Links mit vorbefüllten Nachrichten — DER Kontaktweg der Seite */
const WA_BASE = `https://wa.me/${site.whatsappNumber}`
export const whatsapp = {
  base: WA_BASE,
  beratung: `${WA_BASE}?text=${encodeURIComponent('Guten Tag! Ich interessiere mich für eine kostenlose Beratung.')}`,
  voranschlag: `${WA_BASE}?text=${encodeURIComponent('Guten Tag! Ich möchte gerne einen Voranschlag anfordern.')}`,
  bewerbung: `${WA_BASE}?text=${encodeURIComponent('Guten Tag! Ich möchte mich bei Intech Sanitär bewerben.')}`,
}

/* Hauptnavigation — Leistungen als Dropdown mit Unterseiten */
export const nav = [
  {
    label: 'Leistungen',
    href: '/leistungen/neubau',
    children: [
      { label: 'Neubau', href: '/leistungen/neubau', detail: 'Sanitär & Heizung für Neubauten' },
      { label: 'Umbau', href: '/leistungen/umbau', detail: 'Badsanierung & Modernisierung' },
      { label: 'Service', href: '/leistungen/service', detail: 'Reparatur, Wartung & Notfall' },
    ],
  },
  { label: 'Team', href: '/team' },
  { label: 'Referenzen', href: '/referenzen' },
  { label: 'Kontakt', href: '/kontakt' },
]

export const hero = {
  badge: 'Familienunternehmen seit 2010',
  words: [
    { text: 'Wasser.', tone: 'blue' },
    { text: 'Wärme.', tone: 'red' },
    { text: 'Vertrauen.', tone: 'ink' },
  ],
  lead: 'Durch unsere grosse Auswahl an Produkten und innovativen Designs ermöglichen wir Ihnen ein wunderschönes Badezimmererlebnis — schweizweit, mit Schwerpunkt Zürich und Winterthur.',
}

export const marqueeItems = [
  'Sanitär', 'Heizung', 'Solar', 'Kälte', 'Neubau', 'Umbau', 'Service',
]

/* Teaser-Karten auf der Startseite — verlinken auf die Unterseiten */
export const services = [
  {
    index: '01',
    slug: 'neubau',
    href: '/leistungen/neubau',
    title: 'Neubau',
    tone: 'blue',
    description:
      'Von der ersten Leitung bis zum fertigen Traumbad: Wir planen und installieren die komplette Sanitär- und Heizungstechnik für Ihren Neubau — präzise, termingerecht und in Schweizer Qualität.',
    image: '/images/neubau-bad.jpg',
    tags: ['Sanitärinstallationen', 'Heizungssysteme', 'Badplanung'],
  },
  {
    index: '02',
    slug: 'umbau',
    href: '/leistungen/umbau',
    title: 'Umbau',
    tone: 'grad',
    description:
      'Wir verwandeln Ihr bestehendes Bad in eine moderne Wohlfühloase. Mit grosser Produktauswahl und innovativen Designs begleiten wir Ihren Umbau von der Idee bis zur Übergabe.',
    image: '/images/umbau-bad.jpg',
    tags: ['Badsanierung', 'Modernisierung', 'Design'],
  },
  {
    index: '03',
    slug: 'service',
    href: '/leistungen/service',
    title: 'Service',
    tone: 'red',
    description:
      'Reparaturen, Wartung und schnelle Hilfe im Notfall: Unser Serviceteam hält Ihre Anlagen zuverlässig am Laufen — damit Wasser und Wärme immer dort sind, wo Sie sie brauchen.',
    image: '/images/service-montage.jpg',
    tags: ['Reparaturen', 'Wartung', 'Notfallservice'],
  },
]

/* Ausführliche Inhalte der Dienstleistungs-Unterseiten */
export const serviceDetails = {
  neubau: {
    slug: 'neubau',
    eyebrow: 'Leistungen — Neubau',
    title: 'Sanitär & Heizung für Ihren Neubau.',
    tone: 'blue',
    intro:
      'Ein Neubau ist die Chance, alles von Anfang an richtig zu machen. Wir planen und installieren die komplette Gebäudetechnik rund um Wasser und Wärme — abgestimmt auf Architektur, Budget und Ihre Vorstellungen.',
    image: '/images/neubau-bad.jpg',
    imageAlt: 'Neu gebautes Badezimmer mit Glasdusche und Doppellavabo',
    features: [
      { icon: 'Droplets', title: 'Sanitärinstallationen', text: 'Komplette Wasser- und Abwasserinstallationen — von der Steigleitung bis zur Armatur, sauber dimensioniert und normgerecht.' },
      { icon: 'Flame', title: 'Heizungssysteme', text: 'Moderne Wärmeerzeugung und -verteilung: Bodenheizung, Radiatoren, Wärmepumpen — energieeffizient geplant.' },
      { icon: 'Sun', title: 'Solaranlagen', text: 'Solarthermie für Warmwasser und Heizungsunterstützung — erneuerbare Energie direkt vom eigenen Dach.' },
      { icon: 'PencilRuler', title: 'Badplanung', text: 'Vom Grundriss bis zur Fliese: Wir gestalten Bäder, die funktionieren und begeistern.' },
      { icon: 'ClipboardCheck', title: 'Koordination', text: 'Wir stimmen uns mit Architekten und allen Gewerken ab — damit Termine und Schnittstellen sitzen.' },
      { icon: 'ShieldCheck', title: 'Abnahme & Garantie', text: 'Dokumentierte Druckproben, saubere Übergabe und verlässliche Garantieleistungen.' },
    ],
    steps: [
      { title: 'Planung & Konzept', text: 'Wir erarbeiten das Sanitär- und Heizungskonzept auf Basis Ihrer Pläne — transparent kalkuliert.' },
      { title: 'Installation im Rohbau', text: 'Leitungen, Steigzonen und Verteilungen werden termingerecht im Bauablauf installiert.' },
      { title: 'Fertigmontage & Übergabe', text: 'Apparate, Armaturen und Feinjustierung — geprüft, dokumentiert und übergeben.' },
    ],
    faq: [
      { q: 'Ab wann sollten wir Sie in den Neubau einbeziehen?', a: 'Idealerweise bereits in der Planungsphase — so können Steigzonen, Technikräume und Anschlüsse optimal gesetzt werden und Sie sparen spätere Anpassungskosten.' },
      { q: 'Arbeiten Sie mit Architekten und der Bauleitung zusammen?', a: 'Ja, das ist unser Alltag. Wir liefern die nötigen Angaben, halten Termine im Bauprogramm ein und koordinieren uns mit den übrigen Gewerken.' },
      { q: 'Übernehmen Sie auch grössere Objekte?', a: 'Ja — von Einfamilienhäusern über Mehrfamilienhäuser bis zu Gewerbeflächen. Referenzen wie Eichhof West oder das MFH Oberstrasse zeigen unsere Erfahrung.' },
    ],
  },
  umbau: {
    slug: 'umbau',
    eyebrow: 'Leistungen — Umbau',
    title: 'Aus Ihrem Bad wird ein Zuhause-Highlight.',
    tone: 'grad',
    intro:
      'Badsanierung heisst bei uns: eine grosse Auswahl an Produkten, innovative Designs und ein Team, das Ihren Umbau von der Idee bis zur Übergabe begleitet — mit möglichst kurzer Bauzeit und sauberer Baustelle.',
    image: '/images/umbau-bad.jpg',
    imageAlt: 'Modernisiertes Badezimmer mit freistehender Badewanne',
    features: [
      { icon: 'Bath', title: 'Komplette Badsanierung', text: 'Alles aus einer Hand: Demontage, Installationen, Apparate, Koordination der Nebengewerke.' },
      { icon: 'Sparkles', title: 'Design & Produktauswahl', text: 'Grosse Auswahl an Armaturen, Keramik und Möbeln — wir finden den Stil, der zu Ihnen passt.' },
      { icon: 'Accessibility', title: 'Altersgerechtes Bad', text: 'Bodenebene Duschen, Haltegriffe, rutschfeste Beläge — Komfort und Sicherheit für jede Lebensphase.' },
      { icon: 'Gauge', title: 'Heizungsmodernisierung', text: 'Wir ersetzen alte Wärmeerzeuger durch effiziente Systeme — oft mit Fördergeldern.' },
      { icon: 'Timer', title: 'Kurze Bauzeit', text: 'Durchdachte Planung und feste Termine — damit Sie Ihr Bad so schnell wie möglich wieder nutzen können.' },
      { icon: 'Wallet', title: 'Transparente Kosten', text: 'Klare Offerte vor Baubeginn — Design und Budget bleiben im Einklang.' },
    ],
    steps: [
      { title: 'Vor-Ort-Beratung', text: 'Wir schauen uns Ihr Bad an, hören zu und entwickeln erste Ideen — kostenlos und unverbindlich.' },
      { title: 'Design & Offerte', text: 'Sie erhalten ein konkretes Konzept mit transparenter Kostenschätzung.' },
      { title: 'Umbau & Übergabe', text: 'Wir bauen zügig, sauber und koordiniert — bis zur schlüsselfertigen Übergabe.' },
    ],
    faq: [
      { q: 'Wie lange dauert eine Badsanierung?', a: 'Ein Standardbad ist je nach Umfang in zwei bis vier Wochen saniert. Den genauen Terminplan erhalten Sie mit der Offerte.' },
      { q: 'Bleibt das Wasser während des Umbaus abgestellt?', a: 'Nein — Unterbrüche beschränken wir auf wenige Stunden und kündigen sie immer rechtzeitig an.' },
      { q: 'Koordinieren Sie auch Plattenleger, Maler und Elektriker?', a: 'Ja. Auf Wunsch übernehmen wir die gesamte Koordination der Nebengewerke — Sie haben nur einen Ansprechpartner.' },
    ],
  },
  service: {
    slug: 'service',
    eyebrow: 'Leistungen — Service',
    title: 'Schnell da, wenn es zählt.',
    tone: 'red',
    intro:
      'Ein tropfender Hahn, eine verstopfte Leitung oder eine Heizung, die kalt bleibt: Unser Serviceteam repariert, wartet und hilft schnell — damit Wasser und Wärme immer dort sind, wo Sie sie brauchen.',
    image: '/images/service-montage.jpg',
    imageAlt: 'Servicemonteur repariert eine Wasserleitung',
    features: [
      { icon: 'Wrench', title: 'Reparaturen', text: 'Tropfende Armaturen, defekte Spülkästen, undichte Leitungen — schnell und sauber behoben.' },
      { icon: 'CalendarCheck', title: 'Wartung', text: 'Regelmässige Wartung von Heizung und Sanitäranlagen verlängert die Lebensdauer und spart Energie.' },
      { icon: 'Siren', title: 'Notfallservice', text: 'Wasserschaden oder Heizungsausfall? Wir sind schnell vor Ort — mit dem richtigen Material im Fahrzeug.' },
      { icon: 'Replace', title: 'Apparate-Austausch', text: 'Boiler, Armaturen, WC-Anlagen: Wir ersetzen Altgeräte durch effiziente Neugeräte.' },
      { icon: 'Snowflake', title: 'Kälte & Klima', text: 'Service und Unterhalt von Kälteanlagen — vom Gewerbe bis zur Klinik.' },
      { icon: 'FileCheck', title: 'Zustandsanalyse', text: 'Wir prüfen Ihre Installationen und sagen Ihnen ehrlich, was nötig ist — und was nicht.' },
    ],
    steps: [
      { title: 'Kontakt & Diagnose', text: 'Anruf oder Nachricht genügt — wir klären das Problem, oft schon am Telefon.' },
      { title: 'Einsatz vor Ort', text: 'Unser Monteur kommt mit dem passenden Material und behebt die Störung.' },
      { title: 'Dokumentation', text: 'Sie erhalten einen klaren Rapport — und Empfehlungen, falls weitere Massnahmen sinnvoll sind.' },
    ],
    faq: [
      { q: 'Wie schnell sind Sie im Notfall vor Ort?', a: 'In der Region Winterthur und Zürich in der Regel innert weniger Stunden — rufen Sie uns direkt an: +41 78 244 71 19.' },
      { q: 'Was kostet ein Serviceeinsatz?', a: 'Wir rechnen transparent nach Aufwand ab und nennen Ihnen vorab die Ansätze. Keine versteckten Kosten.' },
      { q: 'Bieten Sie Wartungsabos an?', a: 'Ja — für Heizungen und Sanitäranlagen bieten wir regelmässige Wartung mit Erinnerungsservice an.' },
    ],
  },
}

export const competencies = [
  { label: 'Wasser', detail: 'Sanitärinstallationen & Badtechnik', tone: 'blue' },
  { label: 'Wärme', detail: 'Heizungssysteme & Wärmeverteilung', tone: 'red' },
  { label: 'Solar', detail: 'Solaranlagen & erneuerbare Energie', tone: 'blue' },
  { label: 'Kälte', detail: 'Kälteanlagen & Klimatechnik', tone: 'red' },
]

export const about = {
  eyebrow: 'Über Intech Sanitär',
  title: 'Ein Familienunternehmen. Seit 2010.',
  text: 'Als Familienunternehmen seit 2010 haben wir schweizweit zahlreiche Kunden von unseren Qualitäten und unserem Können überzeugt. Seither haben wir uns in Umbauten sowie im Service bewiesen — mit Erfolg! Wir sind mit Leidenschaft in der Sanitärtechnik tätig und entwickeln uns stetig weiter. Sie können sich auf uns verlassen.',
  stats: [
    { value: 16, suffix: '+', label: 'Jahre Erfahrung' },
    { value: 100, suffix: '%', label: 'Familienunternehmen' },
    { value: 4, suffix: '', label: 'Fachbereiche' },
  ],
}

/* Reihenfolge entspricht dem Ablauf auf den Leistungs-Unterseiten:
   erst Beratung vor Ort, dann Planung, dann Design & Kosten. */
export const process = [
  {
    step: '01',
    title: 'Vor-Ort-Beratung',
    text: 'Ihre Ideen, unsere Expertise: Wir kommen zu Ihnen, besprechen Ihre Ideen direkt vor Ort und entwickeln massgeschneiderte Lösungen — damit Ihr Projekt perfekt umgesetzt wird.',
  },
  {
    step: '02',
    title: 'Entwurf & Bauplanung',
    text: 'Die Planung Ihrer Sanitärinstallationen wird bei uns zur gemeinsamen Aufgabe. Wir hören Ihnen aufmerksam zu, nehmen Ihren Bedarf genau auf und erstellen klare, transparente Pläne mit allen Details und Kosten — damit Sie den Prozess verstehen und Ihre persönliche Note einbringen können.',
  },
  {
    step: '03',
    title: 'Design & Kostenschätzung',
    text: 'Wir gestalten Ihr Projekt nach Ihren Vorstellungen und berücksichtigen dabei jedes Detail. Transparente Kostenschätzungen stellen sicher, dass Design und Budget im Einklang stehen — wir bringen Ihre Visionen zum Leben und behalten die Kosten im Blick.',
  },
]

/* ============================================================
   TEAM — echte Besetzung (vom Kunden bestätigt, 06.07.2026).
   photo: null → es wird ein Initialen-Avatar gerendert;
   Fotos werden nachgeliefert.
   ============================================================ */
export const team = {
  eyebrow: 'Unser Team',
  title: 'Die Menschen hinter Intech.',
  lead: 'Ein eingespieltes Team aus Fachleuten für Wasser, Wärme, Solar und Kälte — mit Leidenschaft für sauberes Handwerk.',
  members: [
    { name: 'Imran Nasufi', role: 'Geschäftsführer', focus: 'Dipl. Sanitärmeister', tone: 'blue', photo: null },
    { name: 'Ali Kqiku', role: 'Projektleiter Heizung', focus: '', tone: 'red', photo: null },
    { name: 'Amin Omrani', role: 'Bauleitender Sanitärinstallateur', focus: '', tone: 'blue', photo: null },
  ],
  values: [
    { title: 'Handwerk mit Stolz', text: 'Wir liefern Arbeit ab, hinter der wir stehen — jedes Detail zählt.' },
    { title: 'Ehrliche Beratung', text: 'Wir empfehlen, was Sie brauchen — nicht, was am meisten kostet.' },
    { title: 'Verlässlichkeit', text: 'Termine, Offerten, Zusagen: Was wir versprechen, halten wir.' },
  ],
  /* Bewusste Du-Anrede: In Schweizer Handwerks-Stellenanzeigen üblich
     und gewollt persönlicher als das Sie der restlichen Website. */
  hiring: {
    title: 'Wir suchen Verstärkung.',
    text: 'Du bist Sanitärinstallateur:in oder Heizungsmonteur:in und suchst ein familiäres Team? Melde dich bei uns.',
  },
}

/* ============================================================
   GOOGLE-BEWERTUNGEN — ECHT.
   Wörtlich übernommen vom Google-Maps-Profil der Intech Sanitär
   GmbH (5,0 Sterne, abgerufen am 03.07.2026). Die Anzahl wird
   bewusst nicht angezeigt — nur die Bewertungen selbst.
   ============================================================ */
export const reviews = {
  eyebrow: 'Google Bewertungen',
  title: 'Das sagen unsere Kunden.',
  rating: 5.0,
  googleUrl: 'https://www.google.com/maps/place/Intech+Sanit%C3%A4r+GmbH/@47.4914904,8.7156996,17z/data=!4m6!3m5!1s0x479a9932637f8381:0x866c5301cdf9ad9b!8m2!3d47.4914904!4d8.7156996!16s%2Fg%2F11l66t1w9q',
  items: [
    {
      author: 'Alem Bally',
      rating: 5,
      date: 'vor einem Monat',
      text: 'Mega gueti Erfahrig gmacht. De alti Ölkessel isch schnell und sauber usgebaut worde und d Wärmepumpe perfekt installiert. D Arbeit isch sehr professionell gmacht worde und alles isch ordentlich hinderlah worde. Me het gmerkt, dass sie vom Fach sind. Sehr zuverlässig, freundlich und immer erreichbar bi Frage. Bi sehr froh, hani die Firma gnoh. Klari Wiiterempfehlung.',
      service: 'Wärmepumpe',
    },
    {
      author: 'Ali Kqiku',
      rating: 5,
      date: 'vor 3 Wochen',
      text: 'Er het bi mir ide attikawohnig all die mengelliste vo ich kah han verbessert und het mini heizigsahlang in ordning bracht als so en junge mah chan mer das echt nöd besser mache viele dank Imran Nasufi.',
      service: 'Heizung',
    },
    {
      author: 'Luca Andrist',
      rating: 5,
      date: 'vor einem Monat',
      text: 'Bin sehr zfriede gsi mit de Badzimmersanierig. De Sanitär isch pünktlich cho, het sauber gschafft und s Problem schnell gfunde und behobe. Sehr freundlich und professionell gsi. Preis-Leistig stimmt absolut. Cha ich nur wiiterempfähle.',
      service: 'Badsanierung',
    },
  ],
}

/* ============================================================
   REFERENZEN — Projektnamen, Umfang und Bilder stammen von der
   alten Website. ACHTUNG: description-Texte sind aus dem scope
   abgeleitet, die facts (Zeitraum/Dauer/Grössen) sind PLATZHALTER
   und müssen mit den echten Projektdaten bestätigt/ersetzt werden.
   ============================================================ */
export const references = {
  eyebrow: 'Referenzen',
  title: 'Wir helfen Ihnen, Ihre Träume zu realisieren.',
  lead: 'Ausgewählte Projekte aus Neubau, Umbau und Gebäudetechnik — von der Klinik bis zum Mehrfamilienhaus.',
  projects: [
    {
      name: 'Derma Medical Clinic Sihlcity',
      scope: 'Mieterausbau — Sanitär, Heizung & Kälteanlagen',
      location: 'Zürich',
      image: '/images/ref-derma-clinic.jpg',
      description:
        'Kompletter Mieterausbau für eine dermatologische Privatklinik im Einkaufszentrum Sihlcity: Wir installierten die gesamte Sanitärtechnik für Behandlungsräume und Personalbereiche, die Wärmeverteilung sowie die Kälteanlagen für die medizinische Kühlung — bei laufendem Centerbetrieb und unter erhöhten Hygieneanforderungen.',
      facts: [
        { label: 'Zeitraum', value: '2023 · 6 Monate Bauzeit' },
        { label: 'Leistungen', value: 'Sanitär, Heizung, Kälteanlagen' },
        { label: 'Besonderheit', value: 'Ausbau bei laufendem Centerbetrieb' },
      ],
    },
    {
      name: 'Eichhof West',
      scope: 'Haus B, C & D — Heizung & Solaranlagen',
      location: 'Kriens',
      image: '/images/ref-eichhof-west.jpg',
      description:
        'In der Grossüberbauung Eichhof West rüsteten wir die Häuser B, C und D mit modernen Heizungssystemen und thermischen Solaranlagen aus — von den Steigzonen über die Wärmeverteilung bis zur Einbindung der Kollektoren. Enge Koordination mit Bauleitung und Nebengewerken im Takt des Bauprogramms.',
      facts: [
        { label: 'Zeitraum', value: '2022–2024 · 3 Gebäude' },
        { label: 'Leistungen', value: 'Heizung & Solaranlagen' },
        { label: 'Besonderheit', value: 'Grossprojekt im Generalunternehmer-Takt' },
      ],
    },
    {
      name: 'MFH Oberstrasse',
      scope: '10 Eigentumswohnungen — Sanitär & Heizung',
      location: 'Zürich',
      image: '/images/ref-mfh-oberstrasse.jpg',
      description:
        'Für ein Mehrfamilienhaus mit 10 Eigentumswohnungen realisierten wir sämtliche Sanitärinstallationen und die komplette Heizungsanlage — inklusive Bäder in gehobenem Standard, Bodenheizung in allen Wohnungen und zentraler Warmwasseraufbereitung.',
      facts: [
        { label: 'Zeitraum', value: '2021–2022 · 10 Wohneinheiten' },
        { label: 'Leistungen', value: 'Sanitär komplett & Heizung' },
        { label: 'Besonderheit', value: 'Bäder in gehobenem Ausbaustandard' },
      ],
    },
  ],
}

export const cta = {
  lines: ['Dem Zuhause Ihrer Träume', 'einen Schritt näher.'],
  button: 'Voranschlag anfordern',
}

export const contact = {
  eyebrow: 'Kontakt',
  title: 'Ihr nächstes Projekt planen.',
  lead: 'Schreiben Sie uns direkt per WhatsApp — für eine kostenlose Beratung.',
  fields: {
    firstName: 'Vorname',
    lastName: 'Nachname',
    phone: 'Telefon',
    address: 'Adresse',
    subject: 'Betreff',
    message: 'Nachricht schreiben …',
    submit: 'Per WhatsApp senden',
    /* Ehrlich formuliert: Das Formular öffnet WhatsApp mit der
       vorbereiteten Nachricht — abgesendet wird dort. */
    success: 'WhatsApp öffnet sich mit Ihrer Nachricht — einfach absenden. Oder rufen Sie uns direkt an: +41 78 244 71 19.',
  },
}

export const footerLegal = ['Impressum', 'Datenschutz', 'Cookies']
