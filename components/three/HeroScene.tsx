"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

function ParticleField() {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const count = 2000;
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 10;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 10;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    ref.current.rotation.x = t * 0.03;
    ref.current.rotation.y = t * 0.05;
    // Gentle drift
    ref.current.position.y = Math.sin(t * 0.2) * 0.1;
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#a78bfa"
        size={0.015}
        sizeAttenuation
        depthWrite={false}
        opacity={0.7}
      />
    </Points>
  );
}

function FloatingRing() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    ref.current.rotation.x = t * 0.2;
    ref.current.rotation.y = t * 0.15;
    ref.current.position.y = Math.sin(t * 0.5) * 0.3;
  });

  return (
    <mesh ref={ref} position={[2.5, 0, -2]}>
      <torusGeometry args={[1.2, 0.03, 16, 80]} />
      <meshStandardMaterial
        color="#7c3aed"
        emissive="#7c3aed"
        emissiveIntensity={0.5}
        transparent
        opacity={0.5}
      />
    </mesh>
  );
}

function FloatingSphere() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    ref.current.position.y = Math.sin(t * 0.4) * 0.4;
    ref.current.position.x = Math.cos(t * 0.3) * 0.2 - 2.5;
    ref.current.rotation.y = t * 0.2;
  });

  return (
    <mesh ref={ref} position={[-2.5, 0, -1.5]}>
      <icosahedronGeometry args={[0.5, 1]} />
      <meshStandardMaterial
        color="#06b6d4"
        emissive="#0891b2"
        emissiveIntensity={0.4}
        wireframe
      />
    </mesh>
  );
}

export function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 3], fov: 60 }}
      className="!absolute inset-0"
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 1.5]}
    >
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={0.8} color="#7c3aed" />
      <pointLight position={[-5, -5, 5]} intensity={0.5} color="#06b6d4" />
      <ParticleField />
      <FloatingRing />
      <FloatingSphere />
    </Canvas>
  );
}
