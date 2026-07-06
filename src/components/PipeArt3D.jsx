import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, ContactShadows, RoundedBox } from '@react-three/drei'
import * as THREE from 'three'
import Scene3D, { CHROME, BLUE, RED, easeOutBack, clamp01 } from './three/Scene3D.jsx'
import './PipeArt3D.css'

/**
 * 3D-Hero: Kalt- (blau) und Warmwasserrohr (rot) münden in eine
 * Mischbatterie. Die Baugruppe BAUT SICH BEIM LADEN AUF (Rohre gleiten
 * von oben ein, Mischbatterie ploppt auf, dann startet das Wasser),
 * folgt der Maus in echter Tiefe und sinkt beim Scrollen sanft mit
 * der Seite weg.
 */

/* ---------- Rohrstrang: senkrecht → Bogen → waagrecht ---------- */
function PipeRun({ side = 1, tone }) {
  const x = 1.55 * side
  return (
    <group>
      <mesh position={[x, 3.0, 0]}>
        <cylinderGeometry args={[0.27, 0.27, 3.9, 40]} />
        <meshStandardMaterial {...tone} />
      </mesh>
      <mesh position={[x, 1.5, 0]}>
        <torusGeometry args={[0.29, 0.05, 16, 40]} />
        <meshStandardMaterial {...CHROME} />
      </mesh>
      <mesh position={[x, 2.9, 0]}>
        <torusGeometry args={[0.29, 0.05, 16, 40]} />
        <meshStandardMaterial {...CHROME} />
      </mesh>
      <mesh position={[1.0 * side, 1.05, 0]} rotation={[0, 0, side < 0 ? Math.PI : -Math.PI / 2]}>
        <torusGeometry args={[0.55, 0.27, 24, 40, Math.PI / 2]} />
        <meshStandardMaterial {...tone} />
      </mesh>
      <mesh position={[0.75 * side, 0.5, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.27, 0.27, 0.55, 40]} />
        <meshStandardMaterial {...tone} />
      </mesh>
    </group>
  )
}

/* ---------- Manometer am blauen Rohr ---------- */
function Gauge() {
  const needle = useRef(null)
  useFrame(({ clock }) => {
    if (needle.current) needle.current.rotation.y = Math.sin(clock.elapsedTime * 0.9) * 0.5
  })
  return (
    <group position={[-1.55, 2.35, 0.28]}>
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.08]}>
        <cylinderGeometry args={[0.05, 0.05, 0.22, 16]} />
        <meshStandardMaterial {...CHROME} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.26]}>
        <cylinderGeometry args={[0.2, 0.2, 0.08, 32]} />
        <meshStandardMaterial {...CHROME} />
      </mesh>
      <mesh position={[0, 0, 0.305]}>
        <circleGeometry args={[0.165, 32]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      <group position={[0, 0, 0.315]} ref={needle}>
        <mesh position={[0, 0.06, 0]}>
          <boxGeometry args={[0.018, 0.12, 0.008]} />
          <meshBasicMaterial color="#2440d0" />
        </mesh>
        <mesh>
          <circleGeometry args={[0.03, 16]} />
          <meshBasicMaterial color="#2440d0" />
        </mesh>
      </group>
    </group>
  )
}

/* ---------- Drehendes Ventilrad am roten Rohr ---------- */
function ValveWheel() {
  const wheel = useRef(null)
  useFrame((_, delta) => {
    if (wheel.current) wheel.current.rotation.x += delta * 0.45
  })
  return (
    <group position={[1.55, 2.35, 0]}>
      <mesh rotation={[0, 0, Math.PI / 2]} position={[0.28, 0, 0]}>
        <cylinderGeometry args={[0.055, 0.055, 0.34, 16]} />
        <meshStandardMaterial {...CHROME} />
      </mesh>
      <group position={[0.48, 0, 0]} ref={wheel}>
        <mesh rotation={[0, Math.PI / 2, 0]}>
          <torusGeometry args={[0.24, 0.045, 16, 40]} />
          <meshStandardMaterial {...RED} />
        </mesh>
        <mesh>
          <boxGeometry args={[0.04, 0.46, 0.04]} />
          <meshStandardMaterial {...RED} />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <boxGeometry args={[0.04, 0.46, 0.04]} />
          <meshStandardMaterial {...RED} />
        </mesh>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <sphereGeometry args={[0.08, 20, 20]} />
          <meshStandardMaterial {...CHROME} />
        </mesh>
      </group>
    </group>
  )
}

/* ---------- Wasserstrahl mit wandernden Ringen ---------- */
function Stream() {
  const rings = useRef([])
  useFrame(({ clock }) => {
    rings.current.forEach((r, i) => {
      if (!r) return
      const t = (clock.elapsedTime * 0.45 + i / 3) % 1
      r.position.y = -0.5 - t * 1.4
      r.material.opacity = 0.55 * Math.sin(Math.PI * t)
    })
  })
  return (
    <group>
      <mesh position={[0, -1.18, 0]}>
        <cylinderGeometry args={[0.075, 0.095, 1.55, 24]} />
        <meshPhysicalMaterial
          color="#5b5be8"
          transparent
          opacity={0.62}
          roughness={0.05}
          metalness={0.1}
          transmission={0.35}
        />
      </mesh>
      {[0, 1, 2].map((i) => (
        <mesh key={i} ref={(el) => { rings.current[i] = el }} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.11, 0.016, 10, 24]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.5} />
        </mesh>
      ))}
    </group>
  )
}

/* ---------- Fallende Tropfen (instanziert) ---------- */
function Droplets({ count = 14 }) {
  const mesh = useRef(null)
  const dummy = useMemo(() => new THREE.Object3D(), [])
  const seeds = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        phase: (i * 0.37) % 1,
        speed: 0.35 + ((i * 0.13) % 0.3),
        x: Math.sin(i * 2.3) * 0.32,
        z: Math.cos(i * 1.7) * 0.16,
      })),
    [count]
  )
  useFrame(({ clock }) => {
    if (!mesh.current) return
    seeds.forEach((s, i) => {
      const t = (clock.elapsedTime * s.speed + s.phase) % 1
      dummy.position.set(s.x * (0.5 + t), -0.55 - t * 1.4, s.z * (0.5 + t))
      const sc = 0.5 + 0.5 * Math.sin(Math.PI * t)
      dummy.scale.setScalar(sc)
      dummy.updateMatrix()
      mesh.current.setMatrixAt(i, dummy.matrix)
    })
    mesh.current.instanceMatrix.needsUpdate = true
  })
  return (
    <instancedMesh ref={mesh} args={[null, null, count]}>
      <sphereGeometry args={[0.045, 12, 12]} />
      <meshStandardMaterial color="#3d5bff" roughness={0.1} metalness={0.2} transparent opacity={0.85} />
    </instancedMesh>
  )
}

/* ---------- Becken mit Wellenringen ---------- */
function Basin() {
  const ripples = useRef([])
  useFrame(({ clock }) => {
    ripples.current.forEach((r, i) => {
      if (!r) return
      const t = (clock.elapsedTime * 0.4 + i / 2) % 1
      r.scale.setScalar(0.4 + t * 1.9)
      r.material.opacity = 0.45 * (1 - t)
    })
  })
  return (
    <group position={[0, -2.05, 0]}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.74, 0.06, 16, 48]} />
        <meshStandardMaterial {...CHROME} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
        <circleGeometry args={[0.71, 48]} />
        <meshStandardMaterial color="#3d5bff" transparent opacity={0.4} roughness={0.05} />
      </mesh>
      {[0, 1].map((i) => (
        <mesh
          key={i}
          ref={(el) => { ripples.current[i] = el }}
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, 0.03, 0]}
        >
          <ringGeometry args={[0.28, 0.32, 40]} />
          <meshBasicMaterial color="#3d5bff" transparent opacity={0.4} side={THREE.DoubleSide} />
        </mesh>
      ))}
    </group>
  )
}

/* ---------- Baugruppe: Aufbau-Choreografie + Maus + Scroll ---------- */
function Assembly() {
  const root = useRef(null)
  const pipes = useRef(null)
  const fittings = useRef(null)
  const mixer = useRef(null)
  const water = useRef(null)
  const basin = useRef(null)
  const started = useRef(-1)

  useFrame(({ pointer, clock }) => {
    if (!root.current) return
    if (started.current < 0) started.current = clock.elapsedTime
    const e = clock.elapsedTime - started.current
    // Phasen: Rohre 0–0.9s · Armaturen 0.7–1.3s · Mischer 0.9–1.5s · Wasser 1.4–2s · Becken 1.3–1.9s
    const kPipes = easeOutBack(clamp01(e / 0.9))
    const kFit = clamp01((e - 0.7) / 0.6)
    const kMixer = easeOutBack(clamp01((e - 0.9) / 0.6))
    const kWater = clamp01((e - 1.4) / 0.6)
    const kBasin = easeOutBack(clamp01((e - 1.3) / 0.6))

    if (pipes.current) pipes.current.position.y = (1 - kPipes) * 5.2
    if (fittings.current) {
      fittings.current.scale.setScalar(Math.max(kFit, 0.001))
      fittings.current.visible = kFit > 0.01
    }
    if (mixer.current) mixer.current.scale.setScalar(Math.max(kMixer, 0.001))
    if (water.current) {
      water.current.scale.y = Math.max(kWater, 0.001)
      water.current.visible = kWater > 0.01
    }
    if (basin.current) basin.current.scale.setScalar(Math.max(kBasin, 0.001))

    // Maus-Parallax + Grundrotation
    const idle = Math.sin(clock.elapsedTime * 0.25) * 0.06
    root.current.rotation.y = THREE.MathUtils.lerp(
      root.current.rotation.y,
      pointer.x * 0.38 + idle,
      0.045
    )
    // Scroll-Kopplung: die Baugruppe wandert mit der Seite nach oben
    // und neigt sich leicht — sie gehört zur Seite, klebt nicht am Glas
    const sc = clamp01(window.scrollY / window.innerHeight)
    root.current.position.y = -0.1 + sc * 1.6
    root.current.rotation.x = THREE.MathUtils.lerp(
      root.current.rotation.x,
      -pointer.y * 0.16 + sc * 0.22,
      0.045
    )
    root.current.rotation.z = sc * -0.08
  })

  return (
    <group ref={root} position={[0, -0.1, 0]}>
      <Float speed={1.4} rotationIntensity={0.1} floatIntensity={0.45}>
        <group ref={pipes}>
          <PipeRun side={-1} tone={BLUE} />
          <PipeRun side={1} tone={RED} />
        </group>
        <group ref={fittings}>
          <Gauge />
          <ValveWheel />
        </group>
        <group ref={mixer}>
          <RoundedBox args={[1.35, 0.8, 0.8]} radius={0.14} smoothness={5} position={[0, 0.5, 0]}>
            <meshStandardMaterial {...CHROME} />
          </RoundedBox>
          <mesh position={[0, 1.02, 0]} rotation={[0, 0, 0.15]}>
            <boxGeometry args={[0.12, 0.28, 0.12]} />
            <meshStandardMaterial {...CHROME} />
          </mesh>
          <mesh position={[0, -0.05, 0]}>
            <cylinderGeometry args={[0.15, 0.15, 0.45, 28]} />
            <meshStandardMaterial {...CHROME} />
          </mesh>
          <mesh position={[0, -0.32, 0]}>
            <cylinderGeometry args={[0.13, 0.2, 0.16, 28]} />
            <meshStandardMaterial {...CHROME} />
          </mesh>
        </group>
        {/* Wasser wächst von der Armatur nach unten (Origin nahe Auslauf) */}
        <group ref={water} position={[0, -0.42, 0]}>
          <group position={[0, 0.42, 0]}>
            <Stream />
            <Droplets />
          </group>
        </group>
        <group ref={basin}>
          <Basin />
        </group>
      </Float>
      <ContactShadows position={[0, -2.45, 0]} opacity={0.32} scale={7} blur={2.6} far={3} />
    </group>
  )
}

export default function PipeArt3D() {
  return (
    <div className="pipe3d" aria-label="3D-Illustration: Kalt- und Warmwasserleitung mit Mischbatterie" role="img">
      {/* Kamera so gerahmt, dass Becken + Schatten NIE abgeschnitten werden */}
      <Scene3D camera={{ position: [0, 0.1, 8.3], fov: 37 }}>
        <Assembly />
      </Scene3D>
    </div>
  )
}
