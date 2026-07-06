import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import './ScrollPipe.css'

/**
 * Scroll-Wasserleitung der Startseite, Ausbaustufe 2:
 * Metallrohr mit Winkelklammer-Halterungen (Logo-Motiv), Wasser im
 * Blau→Rot-Verlauf mit Schimmer und Blasen, tropfenförmiger Wasserfront
 * und T-Abzweigungen, die aufleuchten, sobald das Wasser sie erreicht.
 */

/* Position + Farbe entlang des Blau→Rot-Verlaufs */
const JUNCTIONS = [
  { pos: 0.22, color: '#3d5bff' },
  { pos: 0.46, color: '#6247d8' },
  { pos: 0.7, color: '#a238a4' },
  { pos: 0.9, color: '#e01b12' },
]

function Junction({ pos, color, progress }) {
  const filled = useTransform(progress, [pos - 0.035, pos], [0, 1])
  const stubScale = useTransform(progress, [pos - 0.02, pos + 0.015], [0, 1])
  return (
    <div className="scroll-pipe__junction" style={{ top: `${pos * 100}%`, '--junction-color': color }}>
      <span className="scroll-pipe__ring" />
      <motion.span className="scroll-pipe__stub" style={{ scaleX: stubScale }} />
      <motion.span className="scroll-pipe__node" style={{ opacity: filled, scale: filled }} />
    </div>
  )
}

export default function ScrollPipe({ containerRef }) {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.5 })
  const headTop = useTransform(progress, (v) => `${Math.min(v * 100, 99)}%`)
  const headOpacity = useTransform(progress, [0, 0.015, 0.985, 1], [0, 1, 1, 0])
  const dripOpacity = useTransform(progress, [0.96, 1], [0, 1])
  /* Clip-Reveal statt scaleY: der Blau→Rot-Verlauf bleibt über die
     volle Rohrlänge fixiert und wird nur freigelegt — kein Stauchen */
  const waterClip = useTransform(progress, (v) => `inset(0px 0px ${Math.max((1 - v) * 100, 0)}% 0px round 99px)`)

  return (
    <div className="scroll-pipe" aria-hidden="true">
      {/* Halterungen im Logo-Stil */}
      <span className="scroll-pipe__mount scroll-pipe__mount--top" />
      <span className="scroll-pipe__mount scroll-pipe__mount--bottom" />

      {/* Rohrgehäuse mit Lichtkante */}
      <div className="scroll-pipe__casing">
        <span className="scroll-pipe__gloss" />
      </div>

      {/* T-Abzweigungen — leuchten auf, wenn das Wasser sie erreicht */}
      {JUNCTIONS.map((j) => (
        <Junction key={j.pos} pos={j.pos} color={j.color} progress={progress} />
      ))}

      {/* Wassersäule mit Schimmer & Blasen */}
      <motion.div className="scroll-pipe__water" style={{ clipPath: waterClip }}>
        <span className="scroll-pipe__shimmer" />
        <span className="scroll-pipe__bubble scroll-pipe__bubble--1" />
        <span className="scroll-pipe__bubble scroll-pipe__bubble--2" />
        <span className="scroll-pipe__bubble scroll-pipe__bubble--3" />
        <span className="scroll-pipe__bubble scroll-pipe__bubble--4" />
      </motion.div>

      {/* Tropfenförmige Wasserfront mit Puls-Ring */}
      <motion.span className="scroll-pipe__head" style={{ top: headTop, opacity: headOpacity }}>
        <span className="scroll-pipe__head-drop" />
        <span className="scroll-pipe__head-ring" />
      </motion.span>

      {/* Endstück: Ventil + Tropfen, wenn die Leitung voll ist */}
      <span className="scroll-pipe__outlet">
        <motion.span className="scroll-pipe__drip" style={{ opacity: dripOpacity }} />
      </span>
    </div>
  )
}
