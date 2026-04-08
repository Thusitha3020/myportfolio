"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Line } from "@react-three/drei";
import * as THREE from "three";

/**
 * Geometric hardware lattice representing a circuit flow.
 * Now reacts to mouse movement for depth and "gamified" feel.
 */
function HardwareLattice() {
  const groupRef = useRef<THREE.Group>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouse({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Nodes
  const nodeCount = 600;
  const positions = useMemo(() => {
    const arr = new Float32Array(nodeCount * 3);
    for (let i = 0; i < nodeCount; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 15;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 15;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 15;
    }
    return arr;
  }, []);

  // Wires
  const wireLines = useMemo(() => {
    const lines = [];
    for (let i = 0; i < 80; i++) {
      const start = [
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 12,
      ];
      const end = [
        start[0] + (Math.random() - 0.5) * 3,
        start[1] + (Math.random() - 0.5) * 3,
        start[2] + (Math.random() - 0.5) * 3,
      ];
      lines.push({ start: start as [number, number, number], end: end as [number, number, number] });
    }
    return lines;
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    
    // Parallax effect based on mouse
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, mouse.x * 0.2 + t * 0.05, 0.1);
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -mouse.y * 0.2, 0.1);
    groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, mouse.y * 0.5, 0.1);
  });

  return (
    <group ref={groupRef}>
      <Points positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#06b6d4"
          size={0.06}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
      {wireLines.map((line, i) => (
        <Line
          key={i}
          points={[line.start, line.end]}
          color="#818cf8"
          lineWidth={0.8}
          transparent
          opacity={0.2}
        />
      ))}
    </group>
  );
}

/**
 * Background technical scanlines/grid effect
 */
function TechGrid() {
  const gridPositions = useMemo(() => {
    const count = 4000;
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 80;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 80;
      arr[i * 3 + 2] = -30;
    }
    return arr;
  }, []);

  return (
    <Points positions={gridPositions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#06b6d4"
        size={0.02}
        sizeAttenuation
        depthWrite={false}
        opacity={0.2}
      />
    </Points>
  );
}

export function HeroScene() {
  return (
    <div className="w-full h-full relative">
      <Canvas
        camera={{ position: [0, 0, 12], fov: 45 }}
        className="!absolute inset-0"
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={2} color="#06b6d4" />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#818cf8" />
        
        <HardwareLattice />
        <TechGrid />
      </Canvas>
      {/* Dynamic scanline overlay within the canvas area */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.05)_50%),linear-gradient(90deg,rgba(255,0,0,0.01),rgba(0,255,0,0.01),rgba(0,0,255,0.01))] bg-[length:100%_2px,2px_100%]" />
    </div>
  );
}
