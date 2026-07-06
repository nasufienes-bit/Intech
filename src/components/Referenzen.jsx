import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MapPin, ArrowUpRight } from 'lucide-react'
import { references } from '../data/content.js'
import { Reveal, SectionHead, Brackets, Magnetic, Arrow, EASE } from './shared.jsx'
import './Referenzen.css'

const VIEWPORT = { once: true, margin: '-12% 0px' }

/** Hebt ein einzelnes Wort des Titels mit Verlaufstext hervor */
function accentWord(title, word) {
  const i = title.indexOf(word)
  if (i === -1) return title
  return (
    <>
      {title.slice(0, i)}
      <span className="grad-text">{word}</span>
      {title.slice(i + word.length)}
    </>
  )
}

/** Bildfläche einer Kachel: Clip-Reveal, Hover-Zoom, Scrim, Index & Pfeil-Chip */
function TileMedia({ project, number, delay = 0 }) {
  return (
    <motion.div
      className="ref-media"
      initial={{ clipPath: 'inset(0% 0% 100% 0%)' }}
      whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }}
      viewport={VIEWPORT}
      transition={{ duration: 1.1, delay, ease: EASE }}
    >
      <motion.div
        className="ref-media__inner"
        initial={{ scale: 1.18, y: -44 }}
        whileInView={{ scale: 1, y: 0 }}
        viewport={VIEWPORT}
        transition={{ duration: 1.5, delay, ease: EASE }}
      >
        <img
          src={project.image}
          alt={`${project.name} — ${project.scope}, ${project.location}`}
          loading="lazy"
        />
      </motion.div>
      <span className="ref-media__scrim" aria-hidden="true" />
      <span className="ref-media__index" aria-hidden="true">{number}</span>
      <span className="ref-media__cta" aria-hidden="true">
        <ArrowUpRight size={20} strokeWidth={2.2} />
      </span>
    </motion.div>
  )
}

/** Teaser-Kachel (Startseite): helle Karte mit Bild oben und Textzeile unten */
function ProjectCard({ project, index, wide = false, delay = 0 }) {
  const number = String(index + 1).padStart(2, '0')
  return (
    <motion.article
      className={`ref-tile card${wide ? ' ref-tile--wide' : ''}`}
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6, transition: { duration: 0.55, ease: EASE } }}
      viewport={VIEWPORT}
      transition={{ duration: 0.95, delay, ease: EASE }}
    >
      <TileMedia project={project} number={number} delay={delay + 0.1} />

      <motion.div
        className="ref-tile__body"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={VIEWPORT}
        transition={{ duration: 0.9, delay: delay + 0.3, ease: EASE }}
      >
        <div className="ref-tile__text">
          <h3 className="ref-tile__name">{project.name}</h3>
          <p className="ref-tile__scope">{project.scope}</p>
        </div>
        <span className="ref-chip">
          <MapPin size={13} aria-hidden="true" />
          {project.location}
        </span>
      </motion.div>

      <span className="ref-tile__brackets" aria-hidden="true">
        <Brackets size={26} />
      </span>
    </motion.article>
  )
}

/** Grosszügige Projektzeile (Unterseite): Bildkarte + editorialer Textblock */
function ProjectRow({ project, index }) {
  const number = String(index + 1).padStart(2, '0')
  const flip = index % 2 === 1
  return (
    <article className={`ref-row${flip ? ' ref-row--flip' : ''}`}>
      <div className="ref-row__media card">
        <TileMedia project={project} number={number} />
        <span className="ref-tile__brackets" aria-hidden="true">
          <Brackets size={26} />
        </span>
      </div>

      <div className="ref-row__panel">
        <Reveal>
          <span className="eyebrow">Projekt {number}</span>
        </Reveal>
        <Reveal delay={0.08}>
          <h3 className="ref-row__name">{project.name}</h3>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="ref-row__scope">{project.scope}</p>
        </Reveal>
        {project.description && (
          <Reveal delay={0.22}>
            <p className="ref-row__desc">{project.description}</p>
          </Reveal>
        )}
        <Reveal delay={0.28} className="ref-row__rule-wrap">
          <span className="ref-row__rule" aria-hidden="true" />
        </Reveal>
        {project.facts && (
          <Reveal delay={0.34}>
            <dl className="ref-row__facts">
              {project.facts.map((fact) => (
                <div key={fact.label} className="ref-row__fact">
                  <dt>{fact.label}</dt>
                  <dd>{fact.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        )}
        <Reveal delay={0.4}>
          <span className="ref-chip">
            <MapPin size={13} aria-hidden="true" />
            {project.location}
          </span>
        </Reveal>
      </div>
    </article>
  )
}

/**
 * Referenzen-Sektion.
 * teaser=true  → Startseite: SectionHead, editorialer Showcase, Link zur Unterseite.
 * teaser=false → Unterseite: grosszügige, alternierende Projektzeilen ohne SectionHead.
 */
export default function Referenzen({ teaser = false }) {
  if (teaser) {
    const [featured, ...rest] = references.projects
    return (
      <section id="referenzen" className="ref section section--tint">
        <div className="container">
          <SectionHead
            eyebrow={references.eyebrow}
            title={accentWord(references.title, 'Träume')}
          />

          <div className="ref__grid">
            <ProjectCard project={featured} index={0} wide />
            {rest.map((project, i) => (
              <ProjectCard
                key={project.name}
                project={project}
                index={i + 1}
                delay={0.12 + i * 0.14}
              />
            ))}
          </div>

          <Reveal className="ref__more" delay={0.1}>
            <Magnetic>
              <Link to="/referenzen" className="btn btn--ghost">
                Alle Referenzen ansehen <Arrow />
              </Link>
            </Magnetic>
          </Reveal>
        </div>
      </section>
    )
  }

  return (
    <section className="ref ref--detail section" aria-labelledby="ref-projekte-titel">
      <div className="container">
        {/* Schliesst die Lücke h1 → h3 in der Überschriften-Hierarchie */}
        <h2 id="ref-projekte-titel" className="visually-hidden">Unsere Projekte</h2>
        <div className="ref__rows">
          {references.projects.map((project, i) => (
            <ProjectRow key={project.name} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
