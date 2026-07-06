import { lazy, Suspense, useRef, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from 'framer-motion'
import {
  Droplets, Flame, Sun, PencilRuler, ClipboardCheck, ShieldCheck,
  Bath, Sparkles, Accessibility, Gauge, Timer, Wallet,
  Wrench, CalendarCheck, Siren, Replace, Snowflake, FileCheck,
  Plus, ArrowUpRight,
} from 'lucide-react'
import { serviceDetails, services, site, whatsapp } from '../data/content.js'
import PageHero from '../components/PageHero.jsx'
import { Reveal, SectionHead, Brackets, Magnetic, WhatsAppIcon, useWants3D, imgSrcSet, EASE } from '../components/shared.jsx'
import './ServicePage.css'

/* 3D-Dusche — lazy als eigener Chunk, nur Desktop mit WebGL */
const ShowerScene = lazy(() => import('../components/three/ShowerScene.jsx'))

const SHOWER_CAPTIONS = {
  neubau: 'Frisch angeschlossen — Ihre neue Dusche läuft.',
  umbau: 'Nach dem Umbau: Wasser marsch.',
  service: 'Repariert — läuft wieder wie am ersten Tag.',
}

/** Scroll-Dusche: je weiter die Sektion ins Bild scrollt, desto mehr regnet es */
function ShowerBand({ tone, slug }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.95', 'center 0.42'] })
  const progress = useSpring(scrollYProgress, { stiffness: 55, damping: 20 })
  return (
    <section ref={ref} className="sp-shower" aria-label="3D-Animation: Dusche mit fliessendem Wasser">
      <div className="sp-shower__canvas">
        <Suspense fallback={null}>
          <ShowerScene progress={progress} tone={tone} />
        </Suspense>
      </div>
      <Reveal className="sp-shower__caption" delay={0.15}>
        <span className="eyebrow">{SHOWER_CAPTIONS[slug] ?? SHOWER_CAPTIONS.neubau}</span>
      </Reveal>
    </section>
  )
}

/* Icon-Zuordnung für die Feature-Karten (Namen aus content.js) */
const iconMap = {
  Droplets, Flame, Sun, PencilRuler, ClipboardCheck, ShieldCheck,
  Bath, Sparkles, Accessibility, Gauge, Timer, Wallet,
  Wrench, CalendarCheck, Siren, Replace, Snowflake, FileCheck,
}

/** Grosses Bild im Winkelklammer-Rahmen mit sanftem Scroll-Parallax */
function ParallaxImage({ src, alt }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-4%', '4%'])
  return (
    <figure className="sp-intro__media" ref={ref}>
      <Brackets size={34} />
      <div className="sp-intro__frame">
        <motion.img
          className="sp-intro__img"
          src={src}
          srcSet={imgSrcSet(src)}
          sizes="(max-width: 960px) 100vw, 50vw"
          alt={alt}
          style={{ y }}
          loading="lazy"
          decoding="async"
        />
      </div>
    </figure>
  )
}

/** Einzelnes FAQ-Element als barrierefreies Accordion */
function FaqItem({ item, id, open, onToggle }) {
  const btnId = `${id}-btn`
  const panelId = `${id}-panel`
  return (
    <div className={`sp-faq__item${open ? ' is-open' : ''}`}>
      <h3 className="sp-faq__q">
        <button
          id={btnId}
          className="sp-faq__btn"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
        >
          <span>{item.q}</span>
          <motion.span
            className="sp-faq__icon"
            animate={{ rotate: open ? 45 : 0 }}
            transition={{ duration: 0.45, ease: EASE }}
            aria-hidden="true"
          >
            <Plus size={17} />
          </motion.span>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            className="sp-faq__panel"
            role="region"
            aria-labelledby={btnId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <p className="sp-faq__a">{item.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/** Vorlage für alle drei Dienstleistungs-Unterseiten (/leistungen/:slug) */
export default function ServicePage() {
  const { slug } = useParams()
  const [openFaq, setOpenFaq] = useState(0)
  const wants3D = useWants3D()

  const valid = Object.prototype.hasOwnProperty.call(serviceDetails, slug)
  if (!valid) return <Navigate to="/" replace />

  const d = serviceDetails[slug]
  const teaser = services.find((s) => s.slug === slug)
  const others = services.filter((s) => s.slug !== slug)

  return (
    /* key={slug}: Beim Wechsel zwischen Services animiert alles neu */
    <div className={`sp sp--${d.tone}`} key={slug}>
      <PageHero
        eyebrow={d.eyebrow}
        title={d.title}
        lead={d.intro}
        tone={d.tone}
        crumbs={[{ label: 'Leistungen' }, { label: teaser?.title ?? d.title }]}
      />

      {/* ---------- Intro: Bild + Ablauf in drei Schritten ---------- */}
      <section className="section sp-intro">
        <div className="container sp-intro__grid">
          <Reveal y={40}>
            <ParallaxImage src={d.image} alt={d.imageAlt} />
          </Reveal>

          <div className="sp-intro__steps">
            <Reveal><span className="eyebrow">So läuft es ab</span></Reveal>
            <Reveal delay={0.08}>
              <h2 className="sp-intro__title">In drei Schritten zum Ziel.</h2>
            </Reveal>
            <ol className="sp-steps">
              {d.steps.map((st, i) => (
                <li key={st.title} className="sp-steps__item">
                  <Reveal delay={0.14 + i * 0.12} className="sp-steps__inner">
                    <span className="sp-steps__num grad-text" aria-hidden="true">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div className="sp-steps__body">
                      <h3>{st.title}</h3>
                      <p>{st.text}</p>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ---------- 3D-Dusche: regnet los, während man hineinscrollt ---------- */}
      {wants3D && <ShowerBand tone={d.tone} slug={slug} />}

      {/* ---------- Feature-Grid ---------- */}
      <section className="section section--white sp-features">
        <div className="container">
          <SectionHead
            eyebrow="Leistungsumfang"
            title="Was wir für Sie übernehmen."
          />
          <div className="sp-features__grid">
            {d.features.map((f, i) => {
              const Icon = iconMap[f.icon] || Wrench
              return (
                <Reveal key={f.title} delay={(i % 3) * 0.1} className="sp-features__cell">
                  <article className="card sp-feature">
                    <span className="sp-feature__icon">
                      <Icon size={22} aria-hidden="true" />
                    </span>
                    <h3 className="sp-feature__title">{f.title}</h3>
                    <p className="sp-feature__text">{f.text}</p>
                  </article>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* ---------- FAQ ---------- */}
      <section className="section section--tint sp-faq">
        <div className="container">
          <SectionHead align="center" eyebrow="Häufige Fragen" title="Gut zu wissen." />
          <div className="sp-faq__list">
            {d.faq.map((item, i) => (
              <Reveal key={item.q} delay={i * 0.08}>
                <FaqItem
                  item={item}
                  id={`sp-faq-${slug}-${i}`}
                  open={openFaq === i}
                  onToggle={() => setOpenFaq(openFaq === i ? -1 : i)}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- CTA-Zeile ---------- */}
      <section className="section sp-cta">
        <div className="container">
          <Reveal>
            <div className="sp-cta__box">
              <Brackets size={30} />
              <div className="sp-cta__text">
                <h2 className="sp-cta__title">Bereit für Ihr Projekt?</h2>
                <p className="sp-cta__sub">
                  Oder rufen Sie uns direkt an:{' '}
                  <a href={site.phoneHref} className="sp-cta__phone">{site.phone}</a>
                </p>
              </div>
              <Magnetic>
                <a
                  href={whatsapp.beratung}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--whatsapp"
                >
                  <WhatsAppIcon /> Kostenlose Beratung
                </a>
              </Magnetic>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- Weitere Leistungen ---------- */}
      <section className="section section--white sp-more">
        <div className="container">
          <SectionHead
            eyebrow="Weitere Leistungen"
            title="Das könnte Sie auch interessieren."
          />
          <div className="sp-more__grid">
            {others.map((s, i) => (
              <Reveal key={s.slug} delay={i * 0.12}>
                <Link
                  to={s.href}
                  className={`card sp-more__card sp-more__card--${s.tone}`}
                  aria-label={`Zur Leistung ${s.title}`}
                >
                  <div className="sp-more__media">
                    <img
                      src={s.image}
                      srcSet={imgSrcSet(s.image)}
                      sizes="(max-width: 720px) 100vw, 50vw"
                      alt={`${s.title} — ${s.tags.join(', ')}`}
                      loading="lazy"
                      decoding="async"
                    />
                    <span className="sp-more__index" aria-hidden="true">{s.index}</span>
                  </div>
                  <div className="sp-more__body">
                    <h3>{s.title}</h3>
                    <p className="sp-more__tags">{s.tags.join(' · ')}</p>
                    <span className="sp-more__link">
                      Mehr erfahren <ArrowUpRight size={16} aria-hidden="true" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
