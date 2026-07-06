import { motion } from 'framer-motion'
import { cta, whatsapp } from '../data/content.js'
import { Magnetic, WhatsAppIcon, EASE } from './shared.jsx'
import './CtaBand.css'

const lineAnim = {
  hidden: { y: '110%', rotate: 3 },
  show: (i) => ({
    y: '0%',
    rotate: 0,
    transition: { duration: 1.1, delay: 0.15 + i * 0.14, ease: EASE },
  }),
}

export default function CtaBand() {
  return (
    <section className="ctaband" aria-labelledby="ctaband-title">
      <div className="ctaband__glow" aria-hidden="true" />
      <div className="ctaband__texture" aria-hidden="true" />
      <span className="ctaband__bracket ctaband__bracket--tl" aria-hidden="true" />
      <span className="ctaband__bracket ctaband__bracket--br" aria-hidden="true" />
      <div className="ctaband__shine" aria-hidden="true" />

      <div className="container ctaband__inner">
        <h2 id="ctaband-title" className="ctaband__title">
          {cta.lines.map((line, i) => (
            <span key={line} className="ctaband__row">
              <motion.span
                className="ctaband__row-inner"
                custom={i}
                variants={lineAnim}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-15% 0px' }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h2>

        <motion.div
          className="ctaband__action"
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15% 0px' }}
          transition={{ duration: 0.9, delay: 0.5, ease: EASE }}
        >
          <Magnetic>
            <a
              href={whatsapp.voranschlag}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--light ctaband__btn"
            >
              <span className="ctaband__wa" aria-hidden="true"><WhatsAppIcon /></span>
              {cta.button}
            </a>
          </Magnetic>
        </motion.div>
      </div>
    </section>
  )
}
