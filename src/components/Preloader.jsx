import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { EASE } from './shared.jsx'
import './Preloader.css'

/* Nur beim ersten vollständigen Laden zeigen — nicht bei SPA-Routenwechseln */
let introShown = false

/**
 * Marken-Intro: Winkelklammern zeichnen sich, INTECH steigt Buchstabe
 * für Buchstabe auf, Verlaufslinie lädt — dann hebt sich der Vorhang.
 * onDone feuert, sobald der Inhalt dahinter starten darf.
 */
export default function Preloader({ onDone }) {
  const [show, setShow] = useState(() => !introShown)

  useEffect(() => {
    if (!show) {
      onDone?.()
      return
    }
    introShown = true
    const t = setTimeout(() => {
      setShow(false)
      onDone?.()
    }, 2050)
    return () => clearTimeout(t)
  }, [show, onDone])

  const letters = 'INTECH'.split('')

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="preloader"
          aria-hidden="true"
          exit={{ y: '-100%' }}
          transition={{ duration: 0.85, ease: EASE }}
        >
          <div className="preloader__stage">
            <motion.span
              className="preloader__bracket preloader__bracket--tl"
              initial={{ opacity: 0, x: -26, y: -26 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
            />
            <motion.span
              className="preloader__bracket preloader__bracket--br"
              initial={{ opacity: 0, x: 26, y: 26 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
            />

            <span className="preloader__word">
              {letters.map((l, i) => (
                <motion.span
                  key={i}
                  className="preloader__letter"
                  initial={{ y: '110%' }}
                  animate={{ y: '0%' }}
                  transition={{ duration: 0.7, delay: 0.3 + i * 0.06, ease: EASE }}
                >
                  {l}
                </motion.span>
              ))}
            </span>

            <motion.span
              className="preloader__sub"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.85, ease: EASE }}
            >
              <b className="preloader__sub-blue">Sanitär</b>
              <b className="preloader__sub-red">Heizung</b>
            </motion.span>

            <span className="preloader__track">
              <motion.span
                className="preloader__bar"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.35, delay: 0.45, ease: [0.3, 0, 0.2, 1] }}
              />
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
