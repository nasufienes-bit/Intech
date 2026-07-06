import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, MapPin, Globe, CheckCircle2 } from 'lucide-react'
import { site, contact, whatsapp } from '../data/content.js'
import { Reveal, SectionHead, Brackets, WhatsAppIcon, EASE } from './shared.jsx'
import './Kontakt.css'

const infoItems = [
  {
    icon: WhatsAppIcon,
    tone: 'whatsapp',
    label: 'WhatsApp — unser direkter Draht',
    value: site.phone,
    href: whatsapp.beratung,
    external: true,
    big: true,
    aria: `WhatsApp-Chat starten mit ${site.phone}`,
  },
  {
    icon: Phone,
    tone: 'blue',
    label: 'Telefon',
    value: site.phone,
    href: site.phoneHref,
    aria: `Jetzt anrufen: ${site.phone}`,
  },
  {
    icon: MapPin,
    tone: 'blue',
    label: 'Adresse',
    value: site.address,
  },
  {
    icon: Globe,
    tone: 'red',
    label: 'Servicegebiet',
    value: site.serviceArea,
  },
]

/**
 * Wiederverwendbare helle Kontakt-Sektion:
 * links Kontaktinfo, rechts weisse Formular-Karte.
 * showHead=false, wenn die Seite den Titel bereits im PageHero zeigt.
 */
export default function Kontakt({ showHead = true }) {
  const [sent, setSent] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const get = (key) => String(fd.get(key) || '').trim()

    const firstName = get('firstName')
    const lastName = get('lastName')
    const lines = [
      `Guten Tag! ${get('subject') || 'Anfrage über die Website'}`,
      '',
      `Name: ${firstName} ${lastName}`,
      get('phone') && `Telefon: ${get('phone')}`,
      get('address') && `Adresse: ${get('address')}`,
      '',
      get('message'),
    ].filter((l) => l !== false)

    // Öffnet WhatsApp mit der fertig formulierten Nachricht
    window.open(
      `${whatsapp.base}?text=${encodeURIComponent(lines.join('\n'))}`,
      '_blank',
      'noopener'
    )
    setSent(true)
  }

  return (
    <section id="kontakt" className="section kontakt">
      <div className="grid-lines" aria-hidden="true" />
      <div className="kontakt__glow" aria-hidden="true" />

      <div className="container">
        {showHead && (
          <SectionHead eyebrow={contact.eyebrow} title={contact.title} lead={contact.lead} />
        )}

        <div className="kontakt__grid">
          {/* ---------- Kontaktinfo ---------- */}
          <div className="kontakt__info">
            <Reveal>
              <span className="kontakt__badge">
                <span className="kontakt__badge-dot" aria-hidden="true" />
                Kostenlose Erstberatung
              </span>
            </Reveal>

            <div className="kontakt__list">
              {infoItems.map((item, i) => {
                const Icon = item.icon
                const Tag = item.href ? 'a' : 'div'
                const cls = [
                  'kontakt__item',
                  `kontakt__item--${item.tone}`,
                  item.big ? 'kontakt__item--big' : '',
                ]
                  .filter(Boolean)
                  .join(' ')
                return (
                  <Reveal key={item.label} delay={0.08 + i * 0.08}>
                    <Tag
                      className={cls}
                      href={item.href}
                      aria-label={item.aria}
                      {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    >
                      <span className={`kontakt__icon kontakt__icon--${item.tone}`}>
                        <Icon size={20} aria-hidden="true" />
                      </span>
                      <span className="kontakt__item-text">
                        <span className="kontakt__item-label">{item.label}</span>
                        <span className="kontakt__item-value">{item.value}</span>
                      </span>
                    </Tag>
                  </Reveal>
                )
              })}
            </div>
          </div>

          {/* ---------- Formular-Karte ---------- */}
          <Reveal delay={0.18} className="kontakt__form-wrap">
            <div className="card kontakt__card">
              <Brackets size={28} />

              <AnimatePresence mode="wait" initial={false}>
                {sent ? (
                  <motion.div
                    key="success"
                    className="kontakt__success"
                    role="status"
                    initial={{ opacity: 0, y: 24, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.7, ease: EASE }}
                  >
                    <motion.span
                      className="kontakt__success-icon"
                      initial={{ scale: 0, rotate: -30 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
                    >
                      <CheckCircle2 size={42} aria-hidden="true" />
                    </motion.span>
                    <p>{contact.fields.success}</p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    className="kontakt__form"
                    onSubmit={handleSubmit}
                    exit={{ opacity: 0, y: -16, transition: { duration: 0.35, ease: EASE } }}
                  >
                    <div className="kontakt__row">
                      <div className="field">
                        <label htmlFor="k-firstname">{contact.fields.firstName}</label>
                        <input id="k-firstname" name="firstName" type="text" autoComplete="given-name" required />
                      </div>
                      <div className="field">
                        <label htmlFor="k-lastname">{contact.fields.lastName}</label>
                        <input id="k-lastname" name="lastName" type="text" autoComplete="family-name" required />
                      </div>
                    </div>

                    <div className="kontakt__row">
                      <div className="field">
                        <label htmlFor="k-phone">{contact.fields.phone}</label>
                        <input id="k-phone" name="phone" type="tel" autoComplete="tel" />
                      </div>
                      <div className="field">
                        <label htmlFor="k-address">{contact.fields.address}</label>
                        <input id="k-address" name="address" type="text" autoComplete="street-address" />
                      </div>
                    </div>

                    <div className="field">
                      <label htmlFor="k-subject">{contact.fields.subject}</label>
                      <input id="k-subject" name="subject" type="text" />
                    </div>

                    <div className="field">
                      <label htmlFor="k-message">{contact.fields.message}</label>
                      <textarea id="k-message" name="message" rows={5} required />
                    </div>

                    <button type="submit" className="btn btn--whatsapp kontakt__submit">
                      <WhatsAppIcon /> {contact.fields.submit}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
