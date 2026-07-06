import { lazy, Suspense } from 'react'
import { Link } from 'react-router-dom'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { MapPin, Star } from 'lucide-react'
import { hero, site, reviews, whatsapp } from '../data/content.js'
import PipeArt from './PipeArt.jsx'
import { Magnetic, Arrow, WhatsAppIcon, scrollToHash, useWants3D, EASE } from './shared.jsx'
import './Hero.css'

/* three.js lädt als eigener Chunk — nur wenn die 3D-Szene gebraucht wird */
const PipeArt3D = lazy(() => import('./PipeArt3D.jsx'))

const wordAnim = {
  hidden: { y: '110%', rotate: 4 },
  show: (i) => ({
    y: '0%',
    rotate: 0,
    transition: { duration: 1.1, delay: 0.25 + i * 0.14, ease: EASE },
  }),
}

/**
 * start=false hält alle Entrance-Animationen an (bis das Marken-Intro
 * den Vorhang hebt); Standard true für direkte Verwendung.
 */
export default function Hero({ start = true }) {
  const use3D = useWants3D()
  // Maus-Parallax: die Rohr-Illustration folgt dem Cursor sanft.
  // In 3D übernimmt die Szene selbst die Tiefenrotation — der Wrapper
  // bewegt sich dann nur noch minimal mit.
  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)
  const spring = { stiffness: 60, damping: 18, mass: 0.6 }
  const shift = use3D ? 6 : 16
  const artX = useSpring(useTransform(mx, [0, 1], [-shift, shift]), spring)
  const artY = useSpring(useTransform(my, [0, 1], [-shift * 0.6, shift * 0.6]), spring)
  const artRotate = useSpring(useTransform(mx, [0, 1], use3D ? [0, 0] : [-1.6, 1.6]), spring)

  function onMouseMove(e) {
    mx.set(e.clientX / window.innerWidth)
    my.set(e.clientY / window.innerHeight)
  }

  const fade = (delay, from = { opacity: 0, y: 24 }) => ({
    initial: from,
    animate: start ? { opacity: 1, y: 0, x: 0 } : from,
    transition: { duration: 0.9, delay, ease: EASE },
  })

  return (
    <section id="top" className="hero" onMouseMove={onMouseMove}>
      <div className="grid-lines" />
      <div className="hero__glow hero__glow--blue glow-blue" />
      <div className="hero__glow hero__glow--red glow-red" />

      <div className="hero__inner container">
        <div className="hero__content">
          <motion.div className="hero__badge" {...fade(0.1)}>
            <span className="hero__badge-dot" aria-hidden="true" />
            {hero.badge}
          </motion.div>

          <h1 className="hero__title">
            {hero.words.map((w, i) => (
              <span key={w.text} className="hero__line">
                <motion.span
                  className={`hero__word hero__word--${w.tone}`}
                  custom={i}
                  variants={wordAnim}
                  initial="hidden"
                  animate={start ? 'show' : 'hidden'}
                >
                  {w.text}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p className="hero__lead lead" {...fade(0.85)}>
            {hero.lead}
          </motion.p>

          <motion.div className="hero__actions" {...fade(1)}>
            <Magnetic>
              <a
                href={whatsapp.beratung}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--whatsapp"
              >
                <WhatsAppIcon /> Kostenlose Beratung
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href="#leistungen"
                className="btn btn--ghost"
                onClick={(e) => { e.preventDefault(); scrollToHash('#leistungen') }}
              >
                Unsere Leistungen
              </a>
            </Magnetic>
          </motion.div>

          <motion.div
            className="hero__meta"
            initial={{ opacity: 0 }}
            animate={start ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 1, delay: 1.25 }}
          >
            <span className="hero__meta-item">
              <MapPin size={14} aria-hidden="true" />
              {site.serviceArea}
            </span>
            <button
              className="hero__rating"
              onClick={() => scrollToHash('#bewertungen')}
              aria-label={`${reviews.rating.toFixed(1)} Sterne bei Google — zu den Bewertungen`}
            >
              <span className="hero__rating-g" aria-hidden="true">G</span>
              <span className="hero__rating-stars" aria-hidden="true">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={13} fill="currentColor" strokeWidth={0} />
                ))}
              </span>
              <strong>{reviews.rating.toFixed(1)}</strong>
              <span className="hero__rating-count">bei Google</span>
            </button>
          </motion.div>
        </div>

        <motion.div
          className="hero__art"
          style={{ x: artX, y: artY, rotate: artRotate }}
          initial={{ opacity: 0, scale: 0.94 }}
          animate={start ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.94 }}
          transition={{ duration: 1.1, delay: 0.35, ease: EASE }}
        >
          {start && (use3D ? (
            <Suspense fallback={<PipeArt />}>
              <PipeArt3D />
            </Suspense>
          ) : (
            <PipeArt />
          ))}
          <motion.span className="hero__chip-pos hero__chip-pos--blue" {...fade(1.45, { opacity: 0, x: -20 })}>
            <span className="hero__chip hero__chip--blue">Kaltwasser</span>
          </motion.span>
          <motion.span className="hero__chip-pos hero__chip-pos--red" {...fade(1.6, { opacity: 0, x: 20 })}>
            <span className="hero__chip hero__chip--red">Warmwasser</span>
          </motion.span>
          <motion.span className="hero__chip-pos hero__chip-pos--comfort" {...fade(1.75)}>
            <span className="hero__chip hero__chip--comfort">Ihr Komfort</span>
          </motion.span>
        </motion.div>
      </div>
    </section>
  )
}
