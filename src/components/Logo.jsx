import './Logo.css'

/**
 * INTECH-Logo als CSS/HTML-Rebuild des Original-Logos:
 * blaue Winkelklammer oben links, rote unten rechts,
 * INTECH in Versalien, darunter SANITÄR (blau) / HEIZUNG (rot).
 */
export default function Logo({ inverted = false, scale = 1 }) {
  return (
    <span
      className={`logo ${inverted ? 'logo--inverted' : ''}`}
      style={{ fontSize: `${scale}rem` }}
      role="img"
      aria-label="Intech Sanitär GmbH"
    >
      <i className="logo__bracket logo__bracket--tl" aria-hidden="true" />
      <span className="logo__stack">
        <span className="logo__name">INTECH</span>
        <span className="logo__sub">
          <b className="logo__sanitaer">Sanitär</b>
          <b className="logo__heizung">Heizung</b>
        </span>
      </span>
      <i className="logo__bracket logo__bracket--br" aria-hidden="true" />
    </span>
  )
}
