import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { RoundedBox, ContactShadows } from '@react-three/drei'
import * as THREE from 'three'
import Scene3D, { CHROME, WATER_TONES, clamp01 } from './Scene3D.jsx'

/**
 * Scroll-Dusche der Leistungsseiten: Eine verchromte Regendusche über
 * einer Duschtasse. `progress` (Framer-MotionValue 0..1, vom Scroll
 * gesteuert) dreht das Wasser auf — erst tropft es, dann regnet es,
 * die Tasse füllt sich und Wellen laufen zum Ablauf.
 * tone: 'blue' | 'grad' | 'red' färbt das Wasser.
 */

const RAIN_COUNT = 72

function Rain({ progress, color }) {
  const mesh = useRef(null)
  const dummy = useMemo(() => new THREE.Object3D(), [])
  const seeds = useMemo(
    () =>
      Array.from({ length: RAIN_COUNT }, (_, i) => {
        const a = (i / RAIN_COUNT) * Math.PI * 2 * 7.13
        const rad = 0.06 + ((i * 0.618) % 1) * 0.42
        return {
          x: Math.cos(a) * rad,
          z: Math.sin(a) * rad * 0.7,
          phase: (i * 0.618) % 1,
          speed: 0.55 + ((i * 0.271) % 0.4),
          gate: i / RAIN_COUNT, // Tropfen i erscheint erst ab progress > gate
        }
      }),
    []
  )
  useFrame(({ clock }) => {
    if (!mesh.current) return
    const p = clamp01(progress.get())
    seeds.forEach((s, i) => {
      const active = p > s.gate * 0.9
      const t = (clock.elapsedTime * s.speed + s.phase) % 1
      if (active) {
        dummy.position.set(s.x, 1.05 - t * 2.1, s.z)
        // gestreckter Tropfen, blendet oben ein und unten aus
        const fade = Math.sin(Math.PI * Math.min(t * 1.4, 1))
        dummy.scale.set(0.55 * fade, 2.6 * fade, 0.55 * fade)
      } else {
        dummy.scale.setScalar(0.0001)
      }
      dummy.updateMatrix()
      mesh.current.setMatrixAt(i, dummy.matrix)
    })
    mesh.current.instanceMatrix.needsUpdate = true
  })
  return (
    <instancedMesh ref={mesh} args={[null, null, RAIN_COUNT]}>
      <sphereGeometry args={[0.028, 8, 8]} />
      <meshStandardMaterial color={color} roughness={0.1} transparent opacity={0.8} />
    </instancedMesh>
  )
}

function Tray({ progress, color }) {
  const film = useRef(null)
  const ripples = useRef([])
  useFrame(({ clock }) => {
    const p = clamp01(progress.get())
    if (film.current) film.current.material.opacity = 0.08 + p * 0.34
    ripples.current.forEach((r, i) => {
      if (!r) return
      const t = (clock.elapsedTime * 0.5 + i / 3) % 1
      r.scale.setScalar(0.3 + t * 1.6)
      r.material.opacity = p * 0.4 * (1 - t)
    })
  })
  return (
    <group position={[0, -1.18, 0]}>
      {/* Duschtasse */}
      <RoundedBox args={[3.6, 0.14, 1.9]} radius={0.06} smoothness={4}>
        <meshStandardMaterial color="#f2f4f9" metalness={0.2} roughness={0.35} />
      </RoundedBox>
      {/* Chrom-Rahmen */}
      <mesh position={[0, -0.02, 0]}>
        <boxGeometry args={[3.72, 0.06, 2.02]} />
        <meshStandardMaterial {...CHROME} />
      </mesh>
      {/* Wasserfilm — wird mit dem Scroll sichtbarer */}
      <mesh ref={film} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.085, 0]}>
        <planeGeometry args={[3.4, 1.72]} />
        <meshStandardMaterial color={color} transparent opacity={0.1} roughness={0.05} />
      </mesh>
      {/* Ablauf */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.09, 0]}>
        <circleGeometry args={[0.11, 24]} />
        <meshStandardMaterial color="#6b7387" metalness={0.8} roughness={0.3} />
      </mesh>
      {/* Wellenringe */}
      {[0, 1, 2].map((i) => (
        <mesh
          key={i}
          ref={(el) => { ripples.current[i] = el }}
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, 0.1, 0]}
        >
          <ringGeometry args={[0.3, 0.34, 40]} />
          <meshBasicMaterial color={color} transparent opacity={0} side={THREE.DoubleSide} />
        </mesh>
      ))}
    </group>
  )
}

function Shower({ progress, tone }) {
  const root = useRef(null)
  const color = WATER_TONES[tone] ?? WATER_TONES.blue
  useFrame(({ pointer }) => {
    if (!root.current) return
    root.current.rotation.y = THREE.MathUtils.lerp(root.current.rotation.y, pointer.x * 0.22, 0.05)
    root.current.rotation.x = THREE.MathUtils.lerp(root.current.rotation.x, -pointer.y * 0.08, 0.05)
  })
  return (
    <group ref={root} position={[0, 0.15, 0]}>
      {/* Wandarm von links oben */}
      <mesh position={[-1.35, 1.78, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.07, 0.07, 2.7, 24]} />
        <meshStandardMaterial {...CHROME} />
      </mesh>
      {/* Bogen zum Kopf */}
      <mesh position={[0, 1.62, 0]}>
        <cylinderGeometry args={[0.07, 0.07, 0.36, 24]} />
        <meshStandardMaterial {...CHROME} />
      </mesh>
      {/* Regenduschen-Kopf */}
      <mesh position={[0, 1.4, 0]}>
        <cylinderGeometry args={[0.52, 0.44, 0.12, 40]} />
        <meshStandardMaterial {...CHROME} />
      </mesh>
      <mesh position={[0, 1.33, 0]} rotation={[Math.PI, 0, 0]}>
        <circleGeometry args={[0.46, 40]} />
        <meshStandardMaterial color="#c9d0e0" metalness={0.6} roughness={0.4} />
      </mesh>
      <Rain progress={progress} color={color} />
      <Tray progress={progress} color={color} />
      <ContactShadows position={[0, -1.42, 0]} opacity={0.3} scale={7} blur={2.4} far={2.5} />
    </group>
  )
}

export default function ShowerScene({ progress, tone = 'blue' }) {
  return (
    <Scene3D camera={{ position: [0.4, 0.5, 5.6], fov: 36 }}>
      <Shower progress={progress} tone={tone} />
    </Scene3D>
  )
}
