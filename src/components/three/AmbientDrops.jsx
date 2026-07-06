import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import Scene3D from './Scene3D.jsx'

/**
 * Schwebende, glasige Wassertropfen für die Seitenköpfe der Unterseiten:
 * treiben langsam, drehen sich kaum merklich und weichen der Maus aus —
 * ein ruhiger 3D-Layer, der sich in die helle Seite einfügt.
 */

function Drops({ count = 16 }) {
  const group = useRef(null)
  const meshes = useRef([])
  const seeds = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        x: Math.sin(i * 12.9898) * 3.1,
        y: Math.sin(i * 78.233) * 1.5,
        z: -0.6 - (i % 5) * 0.35,
        r: 0.055 + ((i * 0.09) % 0.13),
        speed: 0.25 + ((i * 0.17) % 0.35),
        phase: i * 0.7,
        blue: i % 3 !== 2,
      })),
    [count]
  )

  useFrame(({ pointer, clock }) => {
    if (group.current) {
      group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, pointer.x * 0.18, 0.04)
      group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -pointer.y * 0.1, 0.04)
    }
    meshes.current.forEach((m, i) => {
      if (!m) return
      const s = seeds[i]
      m.position.y = s.y + Math.sin(clock.elapsedTime * s.speed + s.phase) * 0.28
      m.position.x = s.x + Math.cos(clock.elapsedTime * s.speed * 0.6 + s.phase) * 0.12
      m.rotation.z = clock.elapsedTime * 0.05 + s.phase
    })
  })

  return (
    <group ref={group}>
      {seeds.map((s, i) => (
        <mesh key={i} ref={(el) => { meshes.current[i] = el }} position={[s.x, s.y, s.z]}>
          <sphereGeometry args={[s.r, 24, 24]} />
          <meshPhysicalMaterial
            color={s.blue ? '#8ea4ff' : '#ffb0a6'}
            metalness={0.05}
            roughness={0.05}
            transparent
            opacity={0.5}
            envMapIntensity={1.4}
          />
        </mesh>
      ))}
    </group>
  )
}

export default function AmbientDrops() {
  return (
    <Scene3D camera={{ position: [0, 0, 5.2], fov: 40 }}>
      <Drops />
    </Scene3D>
  )
}
