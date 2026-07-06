import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, ChevronDown } from 'lucide-react'
import Logo from './Logo.jsx'
import { nav, site, whatsapp } from '../data/content.js'
import { EASE, WhatsAppIcon } from './shared.jsx'
import './Nav.css'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false)
  const location = useLocation()
  const burgerRef = useRef(null)
  const overlayRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
    setMobileServicesOpen(false)
  }, [location.pathname])

  /* Offenes Menü: Scroll sperren (Lenis + body), Escape schliesst,
     Fokus wandert ins Overlay und beim Schliessen zurück zum Burger. */
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    if (window.__lenis) {
      if (open) window.__lenis.stop()
      else window.__lenis.start()
    }
    if (!open) return () => { document.body.style.overflow = '' }

    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false)
      if (e.key === 'Tab' && overlayRef.current) {
        // Fokus-Falle: Tab zirkuliert zwischen Burger (X) und Overlay-Links
        const focusables = [
          burgerRef.current,
          ...overlayRef.current.querySelectorAll('a, button'),
        ].filter(Boolean)
        const first = focusables[0]
        const last = focusables[focusables.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    document.addEventListener('keydown', onKey)
    const focusTimer = setTimeout(() => {
      overlayRef.current?.querySelector('a, button')?.focus()
    }, 350)
    return () => {
      document.removeEventListener('keydown', onKey)
      clearTimeout(focusTimer)
      document.body.style.overflow = ''
      burgerRef.current?.focus()
    }
  }, [open])

  const closeMenu = () => setOpen(false)

  return (
    <>
      <motion.header
        className={`nav ${scrolled ? 'nav--scrolled' : ''}`}
        initial={{ y: -90, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.2, ease: EASE }}
      >
        <div className="nav__inner container">
          <Link to="/" className="nav__logo" aria-label="Zur Startseite" onClick={closeMenu}>
            <Logo scale={0.92} />
          </Link>

          <nav className="nav__links" aria-label="Hauptnavigation">
            {nav.map((item) =>
              item.children ? (
                <div
                  key={item.label}
                  className="nav__dropdown"
                  onMouseEnter={() => setDropdownOpen(true)}
                  onMouseLeave={() => setDropdownOpen(false)}
                  onFocus={() => setDropdownOpen(true)}
                  onBlur={(e) => {
                    if (!e.currentTarget.contains(e.relatedTarget)) setDropdownOpen(false)
                  }}
                >
                  <NavLink
                    to={item.href}
                    aria-haspopup="true"
                    aria-expanded={dropdownOpen}
                    className={({ isActive }) =>
                      `nav__link ${isActive || location.pathname.startsWith('/leistungen') ? 'nav__link--active' : ''}`
                    }
                  >
                    {item.label}
                    <ChevronDown size={14} aria-hidden="true" />
                  </NavLink>
                  <div className="nav__menu">
                    {item.children.map((child) => (
                      <NavLink key={child.href} to={child.href} className="nav__menu-item">
                        <span className="nav__menu-label">{child.label}</span>
                        <span className="nav__menu-detail">{child.detail}</span>
                      </NavLink>
                    ))}
                  </div>
                </div>
              ) : (
                <NavLink
                  key={item.href}
                  to={item.href}
                  className={({ isActive }) => `nav__link ${isActive ? 'nav__link--active' : ''}`}
                >
                  {item.label}
                </NavLink>
              )
            )}
          </nav>

          <div className="nav__actions">
            <a href={site.phoneHref} className="nav__phone">
              <Phone size={15} aria-hidden="true" />
              <span>{site.phone}</span>
            </a>
            <a
              href={whatsapp.beratung}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--whatsapp nav__cta"
            >
              <WhatsAppIcon size={15} /> Beratung anfordern
            </a>
            <button
              ref={burgerRef}
              className={`nav__burger ${open ? 'is-open' : ''}`}
              onClick={() => setOpen(!open)}
              aria-label={open ? 'Menü schliessen' : 'Menü öffnen'}
              aria-expanded={open}
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            ref={overlayRef}
            className="nav__overlay"
            role="dialog"
            aria-modal="true"
            aria-label="Menü"
            data-lenis-prevent
            initial={{ opacity: 0, clipPath: 'circle(0% at calc(100% - 48px) 40px)' }}
            animate={{ opacity: 1, clipPath: 'circle(150% at calc(100% - 48px) 40px)' }}
            exit={{ opacity: 0, clipPath: 'circle(0% at calc(100% - 48px) 40px)' }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <div className="nav__overlay-inner">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15, ease: EASE }}
              >
                <button
                  className="nav__overlay-link nav__overlay-toggle"
                  onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                  aria-expanded={mobileServicesOpen}
                >
                  <span className="nav__overlay-num">01</span>
                  Leistungen
                  <ChevronDown
                    size={22}
                    style={{
                      transform: mobileServicesOpen ? 'rotate(180deg)' : 'none',
                      transition: 'transform 0.4s',
                    }}
                    aria-hidden="true"
                  />
                </button>
                <AnimatePresence>
                  {mobileServicesOpen && (
                    <motion.div
                      className="nav__overlay-sub"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: EASE }}
                    >
                      {nav[0].children.map((child) => (
                        <Link
                          key={child.href}
                          to={child.href}
                          className="nav__overlay-sublink"
                          onClick={closeMenu}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {nav.slice(1).map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.22 + i * 0.07, ease: EASE }}
                >
                  <Link to={item.href} className="nav__overlay-link" onClick={closeMenu}>
                    <span className="nav__overlay-num">0{i + 2}</span>
                    {item.label}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                className="nav__overlay-meta"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <a href={site.phoneHref}>{site.phone}</a>
                <a href={whatsapp.beratung} target="_blank" rel="noopener noreferrer">
                  WhatsApp-Chat starten
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
