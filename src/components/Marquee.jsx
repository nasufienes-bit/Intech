import { useRef } from 'react'
import { useInView } from 'framer-motion'
import { marqueeItems } from '../data/content.js'
import './Marquee.css'

/** Endlos-Laufband im Blau→Rot-Verlauf (Logofarben).
 *  Zwei Kopien pro Gruppe reichen für den nahtlosen 50%-Loop;
 *  ausserhalb des Viewports pausieren alle Animationen. */
export default function Marquee() {
  const ref = useRef(null)
  const inView = useInView(ref, { margin: '10% 0px' })
  const row = [...marqueeItems, ...marqueeItems]
  return (
    <div ref={ref} className={`marquee${inView ? '' : ' marquee--paused'}`} aria-hidden="true">
      <div className="marquee__track">
        {[0, 1].map((copy) => (
          <div className="marquee__group" key={copy}>
            {row.map((item, i) => (
              <span className="marquee__item" key={`${copy}-${i}`}>
                {item}
                <svg viewBox="0 0 24 24" className="marquee__star">
                  <path d="M12 0l2.6 9.4L24 12l-9.4 2.6L12 24l-2.6-9.4L0 12l9.4-2.6z" fill="currentColor" />
                </svg>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
