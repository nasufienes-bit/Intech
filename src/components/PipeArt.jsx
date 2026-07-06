import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { EASE } from './shared.jsx'
import './PipeArt.css'

/**
 * Animiertes Rohrsystem: blaues Kaltwasser- und rotes Warmwasserrohr
 * fliessen in eine Mischbatterie — die Blau/Rot-Dualität des Logos als
 * lebendige Illustration. Wasserfluss, Manometer, Ventilrad, Tropfen
 * und Wellen sind permanent animiert; der Aufbau wird beim Laden
 * einmalig "gezeichnet" (pathLength).
 */

const BLUE_PIPE = 'M92 -30 V 148 Q 92 172 116 172 H 236 Q 260 172 260 196 V 296'
const RED_PIPE = 'M468 -30 V 148 Q 468 172 444 172 H 324 Q 300 172 300 196 V 296'
const STREAM = 'M280 372 V 508'

const draw = (delay) => ({
  hidden: { pathLength: 0 },
  show: { pathLength: 1, transition: { duration: 1.3, delay, ease: EASE } },
})

const pop = (delay) => ({
  hidden: { opacity: 0, scale: 0.85 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.7, delay, ease: EASE } },
})

export default function PipeArt() {
  const ref = useRef(null)
  // Endlos-Loops pausieren, sobald der Hero aus dem Viewport scrollt
  const inView = useInView(ref, { margin: '10% 0px' })
  return (
    <motion.svg
      ref={ref}
      className={`pipe-art${inView ? '' : ' pipe-art--paused'}`}
      viewBox="0 0 560 600"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Animierte Illustration: Kalt- und Warmwasserleitung treffen sich in einer Mischbatterie"
      initial="hidden"
      animate="show"
    >
      <defs>
        <linearGradient id="pipe-mix" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#5b5be8" />
          <stop offset="100%" stopColor="#7a68e6" />
        </linearGradient>
        <linearGradient id="pipe-metal" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f2f4f9" />
          <stop offset="100%" stopColor="#dde2ee" />
        </linearGradient>
      </defs>

      {/* ---- Rohr-Gehäuse ---- */}
      <motion.g variants={pop(0.15)}>
        <path d={BLUE_PIPE} className="pipe-art__casing" />
        <path d={BLUE_PIPE} className="pipe-art__body" />
        <path d={RED_PIPE} className="pipe-art__casing" />
        <path d={RED_PIPE} className="pipe-art__body" />
      </motion.g>

      {/* ---- Flansche ---- */}
      <motion.g variants={pop(0.35)} className="pipe-art__flanges">
        <rect x="70" y="52" width="44" height="14" rx="5" />
        <rect x="446" y="52" width="44" height="14" rx="5" />
        <rect x="160" y="150" width="14" height="44" rx="5" />
        <rect x="386" y="150" width="14" height="44" rx="5" />
        <rect x="238" y="240" width="44" height="14" rx="5" transform="rotate(90 260 247)" />
        <rect x="278" y="240" width="44" height="14" rx="5" transform="rotate(90 300 247)" />
      </motion.g>

      {/* ---- Wasser (einmalig gezeichnet) ---- */}
      <motion.path d={BLUE_PIPE} className="pipe-art__water pipe-art__water--blue" variants={draw(0.5)} />
      <motion.path d={RED_PIPE} className="pipe-art__water pipe-art__water--red" variants={draw(0.65)} />

      {/* ---- Fluss-Highlights (Endlos-Loop) ---- */}
      <path d={BLUE_PIPE} className="pipe-art__flow pipe-art__flow--in" />
      <path d={RED_PIPE} className="pipe-art__flow pipe-art__flow--in pipe-art__flow--offset" />

      {/* ---- Manometer am Kaltwasserrohr ---- */}
      <motion.g variants={pop(1.15)}>
        <rect x="168" y="130" width="12" height="26" rx="3" fill="#c6cddd" />
        <circle cx="174" cy="106" r="30" className="pipe-art__gauge-face" />
        <g stroke="#9aa3b8" strokeWidth="2" strokeLinecap="round">
          <line x1="174" y1="82" x2="174" y2="88" />
          <line x1="152" y1="106" x2="158" y2="106" />
          <line x1="190" y1="106" x2="196" y2="106" />
          <line x1="158" y1="91" x2="163" y2="95" />
          <line x1="190" y1="91" x2="185" y2="95" />
        </g>
        <line x1="174" y1="106" x2="174" y2="86" className="pipe-art__needle" />
        <circle cx="174" cy="106" r="4.5" fill="var(--blue)" />
      </motion.g>

      {/* ---- Ventilrad am Warmwasserrohr ---- */}
      <motion.g variants={pop(1.25)}>
        <rect x="482" y="100" width="30" height="12" rx="3" fill="#c6cddd" />
        <g className="pipe-art__wheel">
          <circle cx="522" cy="106" r="24" className="pipe-art__wheel-rim" />
          <line x1="522" y1="84" x2="522" y2="128" className="pipe-art__wheel-spoke" />
          <line x1="500" y1="106" x2="544" y2="106" className="pipe-art__wheel-spoke" />
          <line x1="507" y1="91" x2="537" y2="121" className="pipe-art__wheel-spoke" />
          <line x1="537" y1="91" x2="507" y2="121" className="pipe-art__wheel-spoke" />
          <circle cx="522" cy="106" r="6" fill="var(--red)" />
        </g>
      </motion.g>

      {/* ---- Mischbatterie ---- */}
      <motion.g variants={pop(0.95)}>
        <rect x="234" y="296" width="92" height="50" rx="14" fill="url(#pipe-metal)" stroke="#c3cadb" strokeWidth="2" />
        <rect x="252" y="282" width="56" height="20" rx="8" fill="#cdd4e3" />
        <rect x="262" y="346" width="36" height="30" rx="8" fill="url(#pipe-metal)" stroke="#c3cadb" strokeWidth="2" />
        {/* Hebel */}
        <g className="pipe-art__lever">
          <rect x="272" y="262" width="16" height="26" rx="6" fill="#aeb7cc" />
        </g>
        {/* Temperatur-Anzeige */}
        <text x="280" y="327" textAnchor="middle" className="pipe-art__temp">37.5°</text>
      </motion.g>

      {/* ---- Wasserstrahl ---- */}
      <motion.path d={STREAM} className="pipe-art__stream" variants={draw(1.35)} />
      <path d={STREAM} className="pipe-art__flow pipe-art__flow--stream" />

      {/* ---- Tropfen neben dem Strahl ---- */}
      <g className="pipe-art__drops">
        <circle cx="266" cy="420" r="4" className="pipe-art__drop pipe-art__drop--1" />
        <circle cx="294" cy="450" r="3.4" className="pipe-art__drop pipe-art__drop--2" />
        <circle cx="270" cy="470" r="3" className="pipe-art__drop pipe-art__drop--3" />
      </g>

      {/* ---- Becken mit Wellen ---- */}
      <motion.g variants={pop(1.5)}>
        <path d="M186 512 Q 190 552 236 556 H 324 Q 370 552 374 512" fill="none" stroke="#c3cadb" strokeWidth="5" strokeLinecap="round" />
        <ellipse cx="280" cy="512" rx="94" ry="13" fill="rgba(61, 91, 255, 0.18)" />
        <ellipse cx="280" cy="512" rx="94" ry="13" className="pipe-art__ripple pipe-art__ripple--1" />
        <ellipse cx="280" cy="512" rx="94" ry="13" className="pipe-art__ripple pipe-art__ripple--2" />
      </motion.g>
    </motion.svg>
  )
}
