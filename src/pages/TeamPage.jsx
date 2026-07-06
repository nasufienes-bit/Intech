import { HeartHandshake, MessagesSquare, ShieldCheck } from 'lucide-react'
import PageHero from '../components/PageHero.jsx'
import { Reveal, Brackets, Counter, Magnetic, WhatsAppIcon } from '../components/shared.jsx'
import { team, about, whatsapp } from '../data/content.js'
import './TeamPage.css'

const valueIcons = [HeartHandshake, MessagesSquare, ShieldCheck]

/** Zwei Initialen aus dem Namen, z.B. "Imran Nasufi" → "IN" */
function getInitials(name) {
  const parts = name.trim().split(/\s+/)
  const first = parts[0]?.[0] ?? ''
  const last = parts.length > 1 ? parts[parts.length - 1][0] : (parts[0]?.[1] ?? '')
  return (first + last).toUpperCase()
}

export default function TeamPage() {
  return (
    <>
      <PageHero
        eyebrow={team.eyebrow}
        title={team.title}
        lead={team.lead}
        tone="grad"
        crumbs={[{ label: 'Team' }]}
      />

      {/* ---------- Team-Grid ---------- */}
      <section className="section tp-team" aria-labelledby="tp-team-title">
        <div className="container">
          <h2 id="tp-team-title" className="tp-hidden">Unsere Teammitglieder</h2>
          <div className="tp-grid">
            {team.members.map((m, i) => (
              <Reveal key={m.name} delay={i * 0.08} className="tp-grid__cell">
                <article className={`card tp-card tp-card--${m.tone}`}>
                  <Brackets size={24} />
                  <span className={`tp-card__avatar tp-card__avatar--${m.tone}`} aria-hidden="true">
                    {getInitials(m.name)}
                  </span>
                  <h3 className="tp-card__name">{m.name}</h3>
                  <p className="tp-card__role">{m.role}</p>
                  {m.focus && <p className="tp-card__focus">{m.focus}</p>}
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Werte ---------- */}
      <section className="section section--white tp-values" aria-labelledby="tp-values-title">
        <div className="container">
          <Reveal>
            <h2 id="tp-values-title" className="eyebrow tp-values__head">Wofür wir stehen</h2>
          </Reveal>
          <div className="tp-values__row">
            {team.values.map((v, i) => {
              const Icon = valueIcons[i % valueIcons.length]
              return (
                <Reveal key={v.title} delay={i * 0.12} className="tp-value">
                  <div className="tp-value__top">
                    <span className="tp-value__num grad-text" aria-hidden="true">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="tp-value__rule" aria-hidden="true" />
                    <span className={`tp-value__icon tp-value__icon--${i % 2 === 0 ? 'blue' : 'red'}`}>
                      <Icon size={20} strokeWidth={1.8} aria-hidden="true" />
                    </span>
                  </div>
                  <h3 className="tp-value__title">{v.title}</h3>
                  <p className="tp-value__text">{v.text}</p>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* ---------- Zahlen-Band ---------- */}
      <section className="section section--tint tp-stats" aria-label="Intech Sanitär in Zahlen">
        <div className="container">
          <div className="tp-stats__row">
            {about.stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.1} className="tp-stat">
                <span className="tp-stat__value grad-text">
                  <Counter to={s.value} suffix={s.suffix} />
                </span>
                <span className="tp-stat__label">{s.label}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Hiring ---------- */}
      <section className="section tp-hiring" aria-labelledby="tp-hiring-title">
        <div className="container">
          <Reveal>
            <div className="tp-hiring__card">
              <div className="tp-hiring__inner">
                <span className="tp-hiring__glow tp-hiring__glow--blue glow-blue" aria-hidden="true" />
                <span className="tp-hiring__glow tp-hiring__glow--red glow-red" aria-hidden="true" />
                <span className="eyebrow">Offene Stellen</span>
                <h2 id="tp-hiring-title" className="display tp-hiring__title">{team.hiring.title}</h2>
                <p className="lead tp-hiring__text">{team.hiring.text}</p>
                <Magnetic>
                  <a
                    href={whatsapp.bewerbung}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn--whatsapp"
                  >
                    <WhatsAppIcon /> Jetzt bewerben
                  </a>
                </Magnetic>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
