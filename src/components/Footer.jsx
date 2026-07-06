import { Link } from 'react-router-dom'
import { MapPin, Phone, Star } from 'lucide-react'
import { nav, site, footerLegal, reviews, whatsapp } from '../data/content.js'
import { Reveal, WhatsAppIcon } from './shared.jsx'
import Logo from './Logo.jsx'
import './Footer.css'

const companyLinks = [
  { label: 'Team', href: '/team' },
  { label: 'Referenzen', href: '/referenzen' },
  { label: 'Kontakt', href: '/kontakt' },
]

export default function Footer() {
  const serviceLinks = nav[0].children

  return (
    <footer className="footer">
      <span className="footer__ghost" aria-hidden="true">
        INTECH
      </span>

      <div className="container footer__inner">
        <div className="footer__top">
          <Reveal className="footer__brand">
            <Logo scale={1.3} />
            <p className="footer__claim">{site.tagline}</p>
          </Reveal>

          <Reveal delay={0.08}>
            <nav className="footer__col" aria-label="Leistungen">
              <h3 className="footer__col-title">Leistungen</h3>
              <ul className="footer__list">
                {serviceLinks.map((item) => (
                  <li key={item.href}>
                    <Link to={item.href} className="footer__link">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </Reveal>

          <Reveal delay={0.14}>
            <nav className="footer__col" aria-label="Unternehmen">
              <h3 className="footer__col-title">Unternehmen</h3>
              <ul className="footer__list">
                {companyLinks.map((item) => (
                  <li key={item.href}>
                    <Link to={item.href} className="footer__link">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="footer__col">
              <h3 className="footer__col-title">Kontakt</h3>
              <ul className="footer__list">
                <li>
                  <a href={site.phoneHref} className="footer__link footer__link--icon">
                    <Phone size={15} aria-hidden="true" />
                    {site.phone}
                  </a>
                </li>
                <li>
                  <a
                    href={whatsapp.beratung}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer__link footer__link--icon footer__link--whatsapp"
                  >
                    <WhatsAppIcon size={15} />
                    WhatsApp-Chat starten
                  </a>
                </li>
                <li>
                  <span className="footer__link footer__link--icon footer__link--static">
                    <MapPin size={15} aria-hidden="true" />
                    {site.address}
                  </span>
                </li>
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.26}>
            <div className="footer__col">
              <h3 className="footer__col-title">Rechtliches</h3>
              <ul className="footer__list">
                {footerLegal.map((label) => (
                  <li key={label}>
                    <span className="footer__link footer__link--static">{label}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="footer__rating">
            <span className="footer__rating-stars" aria-hidden="true">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} fill="currentColor" strokeWidth={0} />
              ))}
            </span>
            <strong className="footer__rating-value">{reviews.rating.toFixed(1)}</strong>
            <a
              href={reviews.googleUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="footer__rating-link"
            >
              auf Google
            </a>
          </div>
        </Reveal>

        <div className="footer__bottom">
          <p>
            © 2026 {site.name} · {site.uid} · Geschäftsführer: {site.ceo}
          </p>
          <p>{site.address}</p>
        </div>
      </div>
    </footer>
  )
}
