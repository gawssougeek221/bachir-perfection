"use client";

import { useGLTF } from "@react-three/drei";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export default function CarModel() {
  const { scene } = useGLTF("/car.glb");
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.position.y = -0.2 + Math.sin(clock.getElapsedTime() * 0.5) * 0.02;
    }
  });

  // Auto-center and scale the model
  return (
    <primitive
      ref={groupRef}
      object={scene}
      scale={0.8}
      position={[0, -0.2, 0]}
      rotation={[0, -0.3, 0]}
    />
  );
}

useGLTF.preload("/car.glb");
