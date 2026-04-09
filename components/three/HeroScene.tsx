"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Sphere, MeshTransmissionMaterial } from "@react-three/drei";
import * as THREE from "three";

/**
 * Advanced Instanced Particle Swarm (Data Fragments)
 */
function ParticleSwarm({ count = 800 }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  
  // Setup particle data (initial positions, phases)
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const radius = 5 + Math.random() * 12;
      const angle1 = Math.random() * Math.PI * 2;
      const angle2 = Math.random() * Math.PI * 2;
      const speed = 0.05 + Math.random() * 0.15;
      temp.push({ radius, angle1, angle2, speed });
    }
    return temp;
  }, [count]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();

    particles.forEach((particle, i) => {
      // Orbiting calculation
      const a = particle.angle1 + t * particle.speed * 0.5;
      const b = particle.angle2 + t * particle.speed * 0.2;
      
      const x = Math.sin(a) * Math.cos(b) * particle.radius;
      const y = Math.sin(a) * Math.sin(b) * particle.radius;
      const z = Math.cos(a) * particle.radius;

      dummy.position.set(x, y, z);
      
      // Look at center to give them direction
      dummy.lookAt(0, 0, 0);
      dummy.rotation.z += t * particle.speed;
      
      // Scaling pulse
      const scale = 0.04 + Math.sin(t * particle.speed * 2) * 0.02;
      dummy.scale.set(scale, scale, scale * 3);
      
      dummy.updateMatrix();
      meshRef.current?.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  // Use a sleek geometric tetrahedron for shards
  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]} frustumCulled={false} position={[3, 0, -2]}>
      <octahedronGeometry args={[1, 0]} />
      <meshStandardMaterial color="#0284c7" metalness={0.8} roughness={0.2} transparent opacity={0.4} />
    </instancedMesh>
  );
}

/**
 * Cyber-Robotic AI Gyroscopic Core 
 */
function CyberCore() {
  const coreRef = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);
  const outerWireRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (ring1Ref.current) {
        ring1Ref.current.rotation.x = t * 0.4;
        ring1Ref.current.rotation.y = t * 0.2;
    }

    if (ring2Ref.current) {
        ring2Ref.current.rotation.y = t * 0.5;
        ring2Ref.current.rotation.z = t * 0.3;
    }

    if (ring3Ref.current) {
        ring3Ref.current.rotation.x = t * -0.6;
        ring3Ref.current.rotation.z = t * 0.4;
    }
    
    if (outerWireRef.current) {
        outerWireRef.current.rotation.y = t * 0.1;
        outerWireRef.current.rotation.x = t * 0.05;
        const scale = 1 + Math.sin(t * 1.5) * 0.03;
        outerWireRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <group ref={coreRef} position={[3, 0, -2]}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        {/* Inner Glowing Brain */}
        <Sphere args={[1.2, 64, 64]}>
          <meshStandardMaterial 
            color="#ffffff" 
            emissive="#0ea5e9" 
            emissiveIntensity={2.5} 
            toneMapped={false}
          />
        </Sphere>
        
        {/* High-End Glass shield over core */}
        <Sphere args={[1.5, 64, 64]}>
          <MeshTransmissionMaterial 
             transmission={0.95} 
             thickness={0.8} 
             roughness={0.05} 
             ior={1.5} 
             chromaticAberration={0.06} 
             resolution={256}
          />
        </Sphere>

        {/* Gyroscopic Rings */}
        <mesh ref={ring1Ref}>
          <torusGeometry args={[2.4, 0.08, 16, 128]} />
          <meshPhysicalMaterial color="#e2e8f0" metalness={1} roughness={0.05} clearcoat={1} clearcoatRoughness={0.1} />
        </mesh>
        
        <mesh ref={ring2Ref}>
          <torusGeometry args={[3.0, 0.06, 16, 128]} />
          <meshPhysicalMaterial color="#94a3b8" metalness={0.9} roughness={0.1} clearcoat={1} />
        </mesh>
        
        <mesh ref={ring3Ref}>
          <torusGeometry args={[3.6, 0.04, 16, 128]} />
          <meshPhysicalMaterial color="#f8fafc" metalness={1} roughness={0} clearcoat={1} />
        </mesh>

        {/* Outer complex architectural wireframe */}
        <mesh ref={outerWireRef}>
          <icosahedronGeometry args={[4.8, 1]} />
          <meshBasicMaterial color="#38bdf8" wireframe transparent opacity={0.15} />
        </mesh>
      </Float>
    </group>
  );
}

/**
 * Camera & Mouse Parallax Controller
 */
function Rig() {
  const { camera, mouse } = useThree();
  const vec = new THREE.Vector3();

  return useFrame(() => {
    // Parallax logic: smoothly shift camera based on mouse
    camera.position.lerp(
      vec.set(mouse.x * 2.5, mouse.y * 1.5, 12),
      0.05
    );
    camera.lookAt(0, 0, -2);
  });
}

export function HeroScene() {
  return (
    <div className="w-full h-full relative">
      <Canvas
        className="!absolute inset-0 z-0"
        gl={{ antialias: true, alpha: true, logarithmicDepthBuffer: true }}
        dpr={[1, 2]}
      >
        <Rig />
        
        {/* Cinematic Advanced Lighting */}
        <ambientLight intensity={1.5} color="#ffffff" />
        <directionalLight position={[10, 10, 10]} intensity={3.5} color="#ffffff" />
        <spotLight position={[-10, -10, -10]} intensity={5} color="#0ea5e9" angle={0.5} penumbra={1} />
        <pointLight position={[5, -5, 5]} intensity={2.5} color="#0284c7" />

        <CyberCore />
        <ParticleSwarm count={1200} />
      </Canvas>
      
      {/* Light gradient overlay to blend 3D natively into HTML limits */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-[hsl(var(--background))] via-[hsl(var(--background)/0.4)] to-transparent z-10" />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[hsl(var(--background))] via-transparent to-[hsl(var(--background)/0.1)] z-10" />
    </div>
  );
}
