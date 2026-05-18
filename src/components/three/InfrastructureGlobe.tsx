'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Stars } from '@react-three/drei'
import * as THREE from 'three'

function GlowingGlobe() {
  const meshRef = useRef<THREE.Mesh>(null)
  const glowRef = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.15
    }
    if (glowRef.current) {
      glowRef.current.rotation.y = clock.getElapsedTime() * 0.12
      const scale = 1 + Math.sin(clock.getElapsedTime() * 2) * 0.02
      glowRef.current.scale.setScalar(scale * 1.08)
    }
  })

  return (
    <group>
      <mesh ref={glowRef}>
        <sphereGeometry args={[1.15, 64, 64]} />
        <meshBasicMaterial
          color="#6366f1"
          transparent
          opacity={0.08}
          side={THREE.BackSide}
        />
      </mesh>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1, 4]} />
        <meshStandardMaterial
          color="#0a1628"
          emissive="#3b82f6"
          emissiveIntensity={0.4}
          wireframe
          transparent
          opacity={0.85}
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.98, 64, 64]} />
        <meshStandardMaterial
          color="#1e1b4b"
          emissive="#6366f1"
          emissiveIntensity={0.15}
          transparent
          opacity={0.3}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  )
}

function OrbitalNodes() {
  const groupRef = useRef<THREE.Group>(null)
  const nodes = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => {
      const angle = (i / 12) * Math.PI * 2
      const radius = 1.6 + (i % 3) * 0.15
      return {
        position: [
          Math.cos(angle) * radius,
          Math.sin(i * 0.7) * 0.4,
          Math.sin(angle) * radius,
        ] as [number, number, number],
        color: i % 3 === 0 ? '#22d3ee' : i % 3 === 1 ? '#a855f7' : '#3b82f6',
      }
    })
  }, [])

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.25
    }
  })

  return (
    <group ref={groupRef}>
      {nodes.map((node, i) => (
        <mesh key={i} position={node.position}>
          <sphereGeometry args={[0.04, 16, 16]} />
          <meshBasicMaterial color={node.color} />
        </mesh>
      ))}
      {nodes.map((node, i) => {
        const next = nodes[(i + 1) % nodes.length]
        const points = [
          new THREE.Vector3(...node.position),
          new THREE.Vector3(0, 0, 0),
          new THREE.Vector3(...next.position),
        ]
        const curve = new THREE.CatmullRomCurve3(points)
        const geo = new THREE.TubeGeometry(curve, 20, 0.003, 8, false)
        return (
          <mesh key={`beam-${i}`} geometry={geo}>
            <meshBasicMaterial
              color="#6366f1"
              transparent
              opacity={0.3}
            />
          </mesh>
        )
      })}
    </group>
  )
}

function ParticleRing() {
  const ref = useRef<THREE.Points>(null)
  const count = 400

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = 1.3 + Math.random() * 0.5
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      pos[i * 3 + 2] = r * Math.cos(phi)
      col[i * 3] = 0.4
      col[i * 3 + 1] = 0.5
      col[i * 3 + 2] = 1
    }
    return [pos, col]
  }, [])

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.getElapsedTime() * 0.05
      ref.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.1) * 0.1
    }
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.015}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  )
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#6366f1" />
      <pointLight position={[-10, -5, -10]} intensity={0.5} color="#22d3ee" />
      <GlowingGlobe />
      <OrbitalNodes />
      <ParticleRing />
      <Stars radius={80} depth={50} count={2000} factor={3} fade speed={0.5} />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
        maxPolarAngle={Math.PI / 1.5}
        minPolarAngle={Math.PI / 3}
      />
    </>
  )
}

export function InfrastructureGlobe() {
  return (
    <div className="relative h-full w-full min-h-[400px]">
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-500/10 via-transparent to-cyan-500/10 blur-3xl" />
      <Canvas
        camera={{ position: [0, 0, 4], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Scene />
      </Canvas>
      <div className="pointer-events-none absolute inset-0 rounded-2xl border border-indigo-500/20" />
      <div className="pointer-events-none absolute bottom-4 left-4 right-4 flex justify-between font-mono text-[10px] uppercase tracking-widest text-indigo-400/60">
        <span>INFRA_MESH.v2</span>
        <span className="animate-blink text-emerald-400">● LIVE</span>
      </div>
    </div>
  )
}
