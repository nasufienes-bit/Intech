import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { motion, MotionConfig } from 'framer-motion'
import Lenis from 'lenis'
import Nav from './components/Nav.jsx'
import Footer from './components/Footer.jsx'
import { ScrollProgress, ScrollTopButton } from './components/ScrollExtras.jsx'
import Home from './pages/Home.jsx'
import ServicePage from './pages/ServicePage.jsx'
import TeamPage from './pages/TeamPage.jsx'
import ReferenzenPage from './pages/ReferenzenPage.jsx'
import KontaktPage from './pages/KontaktPage.jsx'

/* Bei Seitenwechsel sofort nach oben scrollen */
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    if (window.__lenis) window.__lenis.scrollTo(0, { immediate: true })
    else window.scrollTo(0, 0)
  }, [pathname])
  return null
}

/* Sanfter Einblende-Übergang bei jedem Routenwechsel */
function AnimatedRoutes() {
  const location = useLocation()
  return (
    <motion.div
      key={location.pathname}
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
    >
      <Routes location={location}>
        <Route path="/" element={<Home />} />
        <Route path="/leistungen/:slug" element={<ServicePage />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/referenzen" element={<ReferenzenPage />} />
        <Route path="/kontakt" element={<KontaktPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </motion.div>
  )
}

export default function App() {
  useEffect(() => {
    // Nutzer mit reduzierter Bewegung bekommen nativen Scroll statt Lenis
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true })
    window.__lenis = lenis
    let rafId
    function raf(time) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)
    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
      delete window.__lenis
    }
  }, [])

  return (
    /* reducedMotion="user": framer-motion respektiert die Systemeinstellung */
    <MotionConfig reducedMotion="user">
      <BrowserRouter>
        <ScrollToTop />
        <ScrollProgress />
        <Nav />
        <main>
          <AnimatedRoutes />
        </main>
        <Footer />
        <ScrollTopButton />
      </BrowserRouter>
    </MotionConfig>
  )
}
