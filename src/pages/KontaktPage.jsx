import { MapPin } from 'lucide-react'
import PageHero from '../components/PageHero.jsx'
import Kontakt from '../components/Kontakt.jsx'
import { Reveal, SectionHead, Brackets, Arrow } from '../components/shared.jsx'
import { site, contact } from '../data/content.js'
import './KontaktPage.css'

const MAPS_EMBED = 'https://www.google.com/maps?q=T%C3%B6ssfeldstrasse+37,+8406+Winterthur&output=embed'
const MAPS_ROUTE = 'https://www.google.com/maps/dir/?api=1&destination=T%C3%B6ssfeldstrasse+37,+8406+Winterthur'

export default function KontaktPage() {
  return (
    <>
      <PageHero
        eyebrow={contact.eyebrow}
        title={contact.title}
        lead={contact.lead}
        tone="blue"
        crumbs={[{ label: 'Kontakt' }]}
      />

      {/* Titel steht bereits im PageHero — Sektion ohne eigenen Kopf */}
      <Kontakt showHead={false} />

      {/* ---------- Karte / Anfahrt ---------- */}
      <section className="section section--white kontakt-page__map-section" aria-label="Anfahrt und Standort">
        <div className="container">
          <SectionHead
            eyebrow="Standort"
            title="Besuchen Sie uns vor Ort."
            lead="Sie finden uns im Tössfeld-Quartier in Winterthur — gut erreichbar mit Auto und ÖV."
          />

          <Reveal delay={0.1}>
            <div className="card kontakt-page__map-card">
              <Brackets size={34} />

              <iframe
                className="kontakt-page__map"
                src={MAPS_EMBED}
                title="Karte: Intech Sanitär GmbH, Tössfeldstrasse 37, 8406 Winterthur"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />

              <div className="kontakt-page__map-foot">
                <span className="kontakt-page__map-pin" aria-hidden="true">
                  <MapPin size={17} />
                </span>
                <span className="kontakt-page__map-addr">
                  {site.name} · {site.address}
                </span>
                <a
                  className="kontakt-page__map-route"
                  href={MAPS_ROUTE}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Route planen <Arrow size={15} />
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
