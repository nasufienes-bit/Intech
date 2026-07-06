import { lazy, Suspense } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import { EASE, useWants3D } from './shared.jsx'
import './PageHero.css'

/* Schwebende 3D-Wassertropfen — lazy, nur auf Desktop mit WebGL */
const AmbientDrops = lazy(() => import('./three/AmbientDrops.jsx'))

/**
 * Einheitlicher Seitenkopf für alle Unterseiten:
 * heller Grund, Grid-Deko, Breadcrumb, grosser Titel mit Zeilen-Reveal.
 * tone: 'blue' | 'red' | 'grad' steuert den Akzent.
 */
export default function PageHero({ eyebrow, title, lead, tone = 'grad', crumbs = [] }) {
  const wants3D = useWants3D()
  return (
    <header className={`page-hero page-hero--${tone}`}>
      <div className="grid-lines" />
      <div className="page-hero__glow page-hero__glow--blue glow-blue" />
      <div className="page-hero__glow page-hero__glow--red glow-red" />

      {wants3D && (
        <div className="page-hero__drops" aria-hidden="true">
          <Suspense fallback={null}>
            <AmbientDrops />
          </Suspense>
        </div>
      )}

      <div className="container page-hero__inner">
        <motion.nav
          className="page-hero__crumbs"
          aria-label="Brotkrumen"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
        >
          <Link to="/">Start</Link>
          {crumbs.map((c, i) => {
            const isLast = i === crumbs.length - 1
            return (
              <span key={c.label} className="page-hero__crumb">
                <ChevronRight size={13} aria-hidden="true" />
                {c.href ? (
                  <Link to={c.href}>{c.label}</Link>
                ) : (
                  /* aria-current nur auf der letzten Krume — Zwischenkrumen
                     ohne Link sind nicht "die aktuelle Seite" */
                  <span aria-current={isLast ? 'page' : undefined}>{c.label}</span>
                )}
              </span>
            )
          })}
        </motion.nav>

        {eyebrow && (
          <motion.span
            className="eyebrow"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
          >
            {eyebrow}
          </motion.span>
        )}

        <h1 className="page-hero__title">
          <span className="page-hero__title-mask">
            <motion.span
              className="page-hero__title-inner"
              initial={{ y: '110%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 1, delay: 0.28, ease: EASE }}
            >
              {title}
            </motion.span>
          </span>
        </h1>

        {lead && (
          <motion.p
            className="lead page-hero__lead"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
          >
            {lead}
          </motion.p>
        )}
      </div>
    </header>
  )
}
