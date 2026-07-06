import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import './ScrollExtras.css'

/** Dünner Scroll-Fortschrittsbalken im Blau→Rot-Verlauf, oben fixiert */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 })
  return <motion.div className="scroll-progress" style={{ scaleX }} aria-hidden="true" />
}

/** Schwebender "Nach oben"-Button, erscheint nach 600px Scroll */
export function ScrollTopButton() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          className="scroll-top"
          onClick={() => {
            if (window.__lenis) window.__lenis.scrollTo(0, { duration: 1.2 })
            else window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
          aria-label="Nach oben scrollen"
          initial={{ opacity: 0, y: 24, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.8 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ y: -4 }}
        >
          <ArrowUp size={19} aria-hidden="true" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
