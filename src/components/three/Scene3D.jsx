import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment } from '@react-three/drei'

/**
 * Gemeinsame 3D-Basis aller Szenen: Canvas mit transparentem Hintergrund,
 * Studio-Beleuchtung und lokal gerenderter Umgebung in Markenfarben
 * (keine externen HDR-Downloads).
 */

export const CHROME = { color: '#e9edf6', metalness: 0.95, roughness: 0.14 }
export const BLUE = { color: '#2440d0', metalness: 0.8, roughness: 0.24 }
export const RED = { color: '#fc0101', metalness: 0.8, roughness: 0.24 }

export const WATER_TONES = {
  blue: '#3d5bff',
  grad: '#7a2fb8',
  red: '#ff5a4d',
}

export function StudioEnv() {
  return (
    <Environment resolution={128}>
      <mesh scale={12} position={[0, 4, -6]}>
        <planeGeometry />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      <mesh scale={9} position={[-7, 1, 3]} rotation={[0, Math.PI / 2.6, 0]}>
        <planeGeometry />
        <meshBasicMaterial color="#93a5ff" />
      </mesh>
      <mesh scale={9} position={[7, 1, 3]} rotation={[0, -Math.PI / 2.6, 0]}>
        <planeGeometry />
        <meshBasicMaterial color="#ffa79d" />
      </mesh>
      <mesh scale={14} position={[0, -6, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry />
        <meshBasicMaterial color="#dfe4f0" />
      </mesh>
    </Environment>
  )
}

export default function Scene3D({ camera, children }) {
  return (
    <Canvas dpr={[1, 2]} camera={camera} gl={{ antialias: true, alpha: true }}>
      <Suspense fallback={null}>
        <ambientLight intensity={0.55} />
        <directionalLight position={[4, 6, 5]} intensity={0.9} />
        <directionalLight position={[-5, 3, 2]} intensity={0.35} color="#aab6ff" />
        <StudioEnv />
        {children}
      </Suspense>
    </Canvas>
  )
}

/* Sanftes Ease-Out mit Überschwingen — für "Aufbau"-Animationen */
export function easeOutBack(x) {
  const c1 = 1.70158
  const c3 = c1 + 1
  return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2)
}

export function clamp01(x) {
  return Math.min(Math.max(x, 0), 1)
}
