import { useRef, useState, useCallback } from 'react'
import Preloader from '../components/Preloader.jsx'
import Hero from '../components/Hero.jsx'
import Marquee from '../components/Marquee.jsx'
import Services from '../components/Services.jsx'
import About from '../components/About.jsx'
import Reviews from '../components/Reviews.jsx'
import CtaBand from '../components/CtaBand.jsx'
import ScrollPipe from '../components/ScrollPipe.jsx'

export default function Home() {
  const pipeRef = useRef(null)
  const [introDone, setIntroDone] = useState(false)
  const onIntroDone = useCallback(() => setIntroDone(true), [])

  return (
    <>
      <Preloader onDone={onIntroDone} />
      {/* Rohr endet vor dem CTA-Band — deshalb eigener Wrapper */}
      <div ref={pipeRef} style={{ position: 'relative' }}>
        <ScrollPipe containerRef={pipeRef} />
        <Hero start={introDone} />
        <Marquee />
        <Services />
        <About />
        <Reviews />
      </div>
      <CtaBand />
    </>
  )
}
