import { Link } from 'react-router-dom'
import { Droplets, Flame, Sun, Snowflake } from 'lucide-react'
import { services, competencies } from '../data/content.js'
import { Reveal, SectionHead, Brackets, Arrow, Tilt, imgSrcSet } from './shared.jsx'
import './Services.css'

const compIcons = {
  Wasser: Droplets,
  Wärme: Flame,
  Solar: Sun,
  Kälte: Snowflake,
}

export default function Services() {
  return (
    <section id="leistungen" className="section services">
      <div className="glow-blue services__glow services__glow--blue" aria-hidden="true" />
      <div className="glow-red services__glow services__glow--red" aria-hidden="true" />

      <div className="container">
        <SectionHead
          eyebrow="Was wir bieten"
          title={
            <>
              Neubau. Umbau. <span className="grad-text">Service.</span>
            </>
          }
          lead="Drei Leistungsbereiche, ein Anspruch: Sanitär- und Heizungstechnik, die von der ersten Skizze bis zum laufenden Betrieb überzeugt — geplant, installiert und gewartet aus einer Hand."
        />

        {/* ---------- Teaser-Karten: ganze Karte verlinkt auf die Unterseite ---------- */}
        <div className="services__grid">
          {services.map((s, i) => (
            <Reveal key={s.slug} delay={i * 0.12} className="services__cell">
              <Tilt className="services__tilt">
              <Link
                to={s.href}
                className={`services__card card services__card--${s.tone}`}
                aria-label={`${s.title} — mehr erfahren`}
              >
                <div className="services__media">
                  <img
                    src={s.image}
                    srcSet={imgSrcSet(s.image)}
                    sizes="(max-width: 920px) 100vw, 33vw"
                    alt={`${s.title} durch Intech Sanitär — ${s.tags.join(', ')}`}
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="services__scrim" aria-hidden="true" />
                  <span className="services__index" aria-hidden="true">
                    {s.index}
                  </span>
                </div>

                <div className="services__body">
                  <h3 className="services__title">{s.title}</h3>
                  <p className="services__desc">{s.description}</p>

                  <ul className="services__tags" aria-label={`Schwerpunkte im Bereich ${s.title}`}>
                    {s.tags.map((tag) => (
                      <li key={tag} className="services__tag">
                        {tag}
                      </li>
                    ))}
                  </ul>

                  <span className="services__more">
                    <span className="services__more-label">Mehr erfahren</span>
                    <Arrow size={17} />
                  </span>
                </div>

                <div className="services__frame" aria-hidden="true">
                  <Brackets size={24} />
                </div>
              </Link>
              </Tilt>
            </Reveal>
          ))}
        </div>

        {/* ---------- Vier Fachbereiche ---------- */}
        <Reveal className="services__sub">
          <span className="eyebrow">Vier Fachbereiche</span>
        </Reveal>

        <div className="services__comp-grid">
          {competencies.map((c, i) => {
            const Icon = compIcons[c.label] ?? Droplets
            return (
              <Reveal key={c.label} delay={0.08 + i * 0.1} className="services__cell">
                <div className={`services__comp card services__comp--${c.tone}`}>
                  <span className="services__comp-icon" aria-hidden="true">
                    <Icon size={22} strokeWidth={1.9} />
                  </span>
                  <div className="services__comp-text">
                    <h3 className="services__comp-label">{c.label}</h3>
                    <p className="services__comp-detail">{c.detail}</p>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
