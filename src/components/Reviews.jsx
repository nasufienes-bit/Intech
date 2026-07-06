import { motion } from 'framer-motion'
import { ExternalLink, Star } from 'lucide-react'
import { reviews } from '../data/content.js'
import { Brackets, Counter, Magnetic, Reveal, SectionHead } from './shared.jsx'
import './Reviews.css'

/* "unsere Kunden." als Gradient-Akzent aus dem Content-Titel herauslösen */
const TITLE_ACCENT = 'unsere Kunden.'

/* Initialen für den Avatar: "Martina B." → "MB", "Familie Kunz" → "FK" */
function getInitials(name) {
  return name
    .split(/\s+/)
    .map((word) => word[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

/* Sterne poppen nacheinander ein, sobald die Summary sichtbar wird */
const starPop = {
  hidden: { scale: 0, opacity: 0, rotate: -40 },
  show: (i) => ({
    scale: 1,
    opacity: 1,
    rotate: 0,
    transition: { type: 'spring', stiffness: 320, damping: 16, delay: 0.35 + i * 0.12 },
  }),
}

export default function Reviews() {
  const [whole, decimal] = reviews.rating.toFixed(1).split('.')
  const ratingLabel = `${reviews.rating.toFixed(1)} von 5 Sternen`

  const accentIndex = reviews.title.indexOf(TITLE_ACCENT)
  const titleStart = accentIndex >= 0 ? reviews.title.slice(0, accentIndex) : reviews.title
  const titleAccent = accentIndex >= 0 ? reviews.title.slice(accentIndex) : ''

  return (
    <section id="bewertungen" className="section section--tint reviews">
      <div className="reviews__glow reviews__glow--blue glow-blue" aria-hidden="true" />
      <div className="reviews__glow reviews__glow--red glow-red" aria-hidden="true" />

      <div className="container reviews__inner">
        <SectionHead
          eyebrow={reviews.eyebrow}
          title={
            <>
              {titleStart}
              {titleAccent && <span className="grad-text">{titleAccent}</span>}
            </>
          }
        />

        <div className="reviews__layout">
          {/* ---------- Summary-Karte ---------- */}
          <Reveal className="reviews__summary-col">
            <aside className="card reviews__summary" aria-label="Bewertungsübersicht auf Google">
              <Brackets size={26} />
              <span className="reviews__badge-g" aria-hidden="true">
                <span className="reviews__google-grad">G</span>
              </span>

              <div className="reviews__score-block">
                <span className="reviews__score" aria-hidden="true">
                  <Counter to={Number(whole)} duration={1.6} />
                  <span>.{decimal}</span>
                </span>

                <span className="reviews__stars" role="img" aria-label={ratingLabel}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <motion.span
                      key={i}
                      className="reviews__star"
                      custom={i}
                      variants={starPop}
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: true, margin: '-10% 0px' }}
                    >
                      <Star size={25} fill="currentColor" strokeWidth={0} aria-hidden="true" />
                    </motion.span>
                  ))}
                </span>

                <p className="reviews__count">
                  Echte Bewertungen auf{' '}
                  <span className="reviews__google">
                    <span className="reviews__google-grad">G</span>oogle
                  </span>
                </p>
              </div>

              <div className="reviews__summary-foot">
                <Magnetic>
                  <a
                    href={reviews.googleUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn--ghost"
                  >
                    Auf Google bewerten
                    <ExternalLink size={16} aria-hidden="true" />
                  </a>
                </Magnetic>
              </div>
            </aside>
          </Reveal>

          {/* ---------- Bewertungs-Karten ---------- */}
          <div className="reviews__grid">
            {reviews.items.map((item, i) => {
              const tone = i % 2 === 0 ? 'blue' : 'red'
              return (
                <Reveal key={item.author} delay={0.1 + i * 0.08} className="reviews__cell">
                  <article className="card reviews__card">
                    <header className="reviews__card-head">
                      <span
                        className={`reviews__avatar reviews__avatar--${tone}`}
                        aria-hidden="true"
                      >
                        {getInitials(item.author)}
                      </span>
                      <div className="reviews__card-meta">
                        <span className="reviews__author">{item.author}</span>
                        <span className="reviews__date">{item.date}</span>
                      </div>
                      <span className="reviews__card-g reviews__google-grad" aria-hidden="true">
                        G
                      </span>
                    </header>

                    <span
                      className="reviews__card-stars"
                      role="img"
                      aria-label={`Bewertung: ${item.rating} von 5 Sternen`}
                    >
                      {Array.from({ length: item.rating }).map((_, s) => (
                        <Star key={s} size={13} fill="currentColor" strokeWidth={0} aria-hidden="true" />
                      ))}
                    </span>

                    <p className="reviews__text">{item.text}</p>

                    <footer className="reviews__card-foot">
                      <span className={`reviews__chip reviews__chip--${tone}`}>{item.service}</span>
                    </footer>
                  </article>
                </Reveal>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
