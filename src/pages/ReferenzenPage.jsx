import PageHero from '../components/PageHero.jsx'
import Referenzen from '../components/Referenzen.jsx'
import { references, whatsapp } from '../data/content.js'
import { Reveal, Magnetic, WhatsAppIcon } from '../components/shared.jsx'
import './ReferenzenPage.css'

export default function ReferenzenPage() {
  return (
    <>
      <PageHero
        eyebrow={references.eyebrow}
        title="Projekte, die für uns sprechen."
        lead={references.lead}
        tone="grad"
        crumbs={[{ label: 'Referenzen' }]}
      />

      <Referenzen />

      {/* Schlanker CTA-Abschnitt */}
      <section className="refpage-cta section section--white">
        <div className="grid-lines" />
        <div className="refpage-cta__glow refpage-cta__glow--blue glow-blue" />
        <div className="refpage-cta__glow refpage-cta__glow--red glow-red" />

        <div className="container refpage-cta__inner">
          <Reveal>
            <h2 className="refpage-cta__title">
              Ihr Projekt könnte <span className="grad-text">das nächste</span> sein.
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <Magnetic>
              <a
                href={whatsapp.voranschlag}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--whatsapp"
              >
                <WhatsAppIcon /> Voranschlag anfordern
              </a>
            </Magnetic>
          </Reveal>
        </div>
      </section>
    </>
  )
}
