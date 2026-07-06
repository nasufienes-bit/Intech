import { useEffect, useRef, useState } from 'react'
import { motion, useInView, animate, useMotionValue, useSpring, useTransform } from 'framer-motion'

export const EASE = [0.16, 1, 0.3, 1]

/** Scroll-Reveal mit Fade + Y-Shift + Blur.
 *  transitionEnd setzt filter zurück auf none, damit nach der Animation
 *  keine Filter-Ebene übrig bleibt (Repaint-Kosten). */
export function Reveal({ children, delay = 0, y = 30, className, style, once = true }) {
  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, y, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)', transitionEnd: { filter: 'none' } }}
      viewport={{ once, margin: '-10% 0px' }}
      transition={{ duration: 0.9, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}

/** Sektions-Kopf: Eyebrow + Titel + animierte Verlaufs-Linie + optionaler Lead */
export function SectionHead({ eyebrow, title, lead, align = 'left', style }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
        alignItems: align === 'center' ? 'center' : 'flex-start',
        textAlign: align,
        marginBottom: 'clamp(48px, 6vw, 72px)',
        ...style,
      }}
    >
      <Reveal><span className="eyebrow">{eyebrow}</span></Reveal>
      <Reveal delay={0.08}><h2 className="display">{title}</h2></Reveal>
      <motion.span
        aria-hidden="true"
        style={{
          display: 'block',
          height: 3,
          width: 76,
          borderRadius: 99,
          background: 'var(--grad)',
          transformOrigin: align === 'center' ? 'center' : 'left',
          marginTop: -6,
        }}
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true, margin: '-10% 0px' }}
        transition={{ duration: 0.9, delay: 0.35, ease: EASE }}
      />
      {lead && <Reveal delay={0.16}><p className="lead">{lead}</p></Reveal>}
    </div>
  )
}

/** 3D-Tilt beim Hover — Karte neigt sich sanft zur Mausposition */
export function Tilt({ children, max = 7, className, style }) {
  const ref = useRef(null)
  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)
  const rotateX = useSpring(useTransform(py, [0, 1], [max, -max]), { stiffness: 160, damping: 18 })
  const rotateY = useSpring(useTransform(px, [0, 1], [-max, max]), { stiffness: 160, damping: 18 })

  function onMove(e) {
    const r = ref.current.getBoundingClientRect()
    px.set((e.clientX - r.left) / r.width)
    py.set((e.clientY - r.top) / r.height)
  }
  function onLeave() {
    px.set(0.5)
    py.set(0.5)
  }
  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX, rotateY, transformPerspective: 900, transformStyle: 'preserve-3d', ...style }}
    >
      {children}
    </motion.div>
  )
}

/** Logo-Motiv: blaue Klammer oben links, rote unten rechts */
export function Brackets({ size = 30, width = 3 }) {
  return (
    <span className="brackets" aria-hidden="true">
      <i style={{ width: size, height: size, borderWidth: width }} />
      <i style={{ width: size, height: size, borderWidth: width }} />
    </span>
  )
}

/** Animierter Zähler — zählt hoch, sobald sichtbar */
export function Counter({ to, suffix = '', duration = 2 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!inView) return
    // Bei reduzierter Bewegung sofort den Endwert zeigen
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVal(to)
      return
    }
    const controls = animate(0, to, {
      duration,
      ease: EASE,
      onUpdate: (v) => setVal(Math.round(v)),
    })
    return () => controls.stop()
  }, [inView, to, duration])
  return (
    <span ref={ref}>
      {val}
      {suffix}
    </span>
  )
}

/** Magnetischer Hover-Wrapper für Buttons */
export function Magnetic({ children, strength = 0.35 }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 180, damping: 14, mass: 0.3 })
  const sy = useSpring(y, { stiffness: 180, damping: 14, mass: 0.3 })

  function onMove(e) {
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - r.left - r.width / 2) * strength)
    y.set((e.clientY - r.top - r.height / 2) * strength)
  }
  function onLeave() {
    x.set(0)
    y.set(0)
  }
  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: sx, y: sy, display: 'inline-block' }}
    >
      {children}
    </motion.div>
  )
}

/** Pfeil-Icon für Buttons */
export function Arrow({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/** WhatsApp-Glyphe (lucide führt keine Marken-Icons) */
export function WhatsAppIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

/** srcset für die generierten Bildvarianten (-480/-960 + Original 1600px) */
export function imgSrcSet(src) {
  const base = src.replace(/\.jpg$/, '')
  return `${base}-480.jpg 480w, ${base}-960.jpg 960w, ${src} 1600w`
}

/** Scrollt smooth (Lenis) zu einem Anker */
export function scrollToHash(href) {
  const el = document.querySelector(href)
  if (!el) return
  if (window.__lenis) window.__lenis.scrollTo(el, { offset: -70, duration: 1.4 })
  else el.scrollIntoView({ behavior: 'smooth' })
}

/** 3D nur, wo es sich lohnt: Desktop, WebGL vorhanden, keine reduzierte Bewegung */
export function useWants3D() {
  const [wants, setWants] = useState(false)
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const wide = window.matchMedia('(min-width: 760px)').matches
    let webgl = false
    try {
      const c = document.createElement('canvas')
      webgl = !!(c.getContext('webgl2') || c.getContext('webgl'))
    } catch {
      webgl = false
    }
    setWants(!reduced && wide && webgl)
  }, [])
  return wants
}
