import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { about, process } from '../data/content.js'
import { Reveal, SectionHead, Brackets, Counter, Arrow, EASE } from './shared.jsx'
import './About.css'

const STEP_TONES = ['blue', 'grad', 'red']
const TITLE_ACCENT = 'Seit 2010.'

export default function About() {
  /* Parallax für das Technik-Bild */
  const mediaRef = useRef(null)
  const { scrollYProgress: mediaProgress } = useScroll({
    target: mediaRef,
    offset: ['start end', 'end start'],
  })
  const mediaY = useTransform(mediaProgress, [0, 1], ['-7%', '7%'])

  /* Scroll-Progress für die Timeline-Linie */
  const timelineRef = useRef(null)
  const { scrollYProgress: lineProgress } = useScroll({
    target: timelineRef,
    offset: ['start 0.75', 'end 0.6'],
  })
  const lineScale = useSpring(lineProgress, { stiffness: 70, damping: 20, mass: 0.4 })

  /* "Seit 2010." als Gradient-Akzent aus dem Content-Titel herauslösen */
  const accentIndex = about.title.indexOf(TITLE_ACCENT)
  const titleStart = accentIndex >= 0 ? about.title.slice(0, accentIndex) : about.title
  const titleAccent = accentIndex >= 0 ? about.title.slice(accentIndex) : ''

  return (
    <section id="ueber-uns" className="section section--white about">
      <div className="about__glow glow-blue" aria-hidden="true" />

      <div className="container">
        <div className="about__grid">
          {/* ---------- Links: Über uns ---------- */}
          <div className="about__intro">
            <SectionHead
              eyebrow={about.eyebrow}
              title={
                <>
                  {titleStart}
                  {titleAccent && <span className="grad-text">{titleAccent}</span>}
                </>
              }
              style={{ marginBottom: 28 }}
            />

            <Reveal delay={0.18}>
              <p className="about__text">{about.text}</p>
            </Reveal>

            <Reveal delay={0.24}>
              <Link to="/team" className="about__team-link">
                Unser Team kennenlernen <Arrow size={16} />
              </Link>
            </Reveal>

            <div className="about__stats">
              {about.stats.map((stat, i) => (
                <Reveal key={stat.label} delay={0.28 + i * 0.1} className="about__stat">
                  <span className="about__stat-value grad-text">
                    <Counter to={stat.value} suffix={stat.suffix} />
                  </span>
                  <span className="about__stat-label">{stat.label}</span>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.3}>
              <figure className="about__media" ref={mediaRef}>
                <Brackets size={40} />
                <div className="about__media-frame">
                  <motion.img
                    src="/images/technik-anlage.jpg"
                    srcSet="/images/technik-anlage-480.jpg 480w, /images/technik-anlage-960.jpg 960w, /images/technik-anlage.jpg 1600w"
                    sizes="(max-width: 960px) 100vw, 50vw"
                    alt="Sauber installierte Heizungs- und Sanitärtechnik von Intech Sanitär"
                    style={{ y: mediaY }}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <figcaption className="about__media-caption">
                  Technik, auf die Verlass ist — sauber geplant, sauber montiert.
                </figcaption>
              </figure>
            </Reveal>
          </div>

          {/* ---------- Rechts: Prozess-Timeline ---------- */}
          <div className="about__timeline" ref={timelineRef}>
            <Reveal>
              <span className="eyebrow">Unser Prozess</span>
            </Reveal>
            <Reveal delay={0.08}>
              <h3 className="about__timeline-title">Wie wir vorgehen</h3>
            </Reveal>

            <div className="about__steps">
              <span className="about__line" aria-hidden="true">
                <motion.span
                  className="about__line-progress"
                  style={{ scaleY: lineScale }}
                />
              </span>

              <ol className="about__steps-list">
                {process.map((item, i) => (
                  <li key={item.step} className="about__step">
                    <motion.span
                      className={`about__step-num about__step-num--${STEP_TONES[i % STEP_TONES.length]}`}
                      aria-hidden="true"
                      initial={{ scale: 0.4, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true, margin: '-12% 0px' }}
                      transition={{ duration: 0.7, delay: 0.1 + i * 0.06, ease: EASE }}
                    >
                      {item.step}
                    </motion.span>
                    <Reveal delay={0.16 + i * 0.08} className="about__step-body">
                      <h4 className="about__step-title">{item.title}</h4>
                      <p className="about__step-text">{item.text}</p>
                    </Reveal>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
