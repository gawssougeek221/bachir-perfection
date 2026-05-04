"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Wheel({ position }: { position: [number, number, number] }) {
  const wheelRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (wheelRef.current) {
      wheelRef.current.rotation.x += delta * 0.5;
    }
  });

  return (
    <group ref={wheelRef} position={position}>
      {/* Tire */}
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.25, 0.1, 16, 32]} />
        <meshPhysicalMaterial
          color={0x222222}
          metalness={0.2}
          roughness={0.8}
        />
      </mesh>
      {/* Rim */}
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.22, 0.22, 0.12, 24]} />
        <meshPhysicalMaterial
          color={0x444444}
          metalness={0.95}
          roughness={0.15}
          clearcoat={1.0}
          clearcoatRoughness={0.05}
        />
      </mesh>
      {/* Hub cap */}
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.08, 0.08, 0.14, 16]} />
        <meshPhysicalMaterial
          color={0x333333}
          metalness={0.9}
          roughness={0.2}
        />
      </mesh>
    </group>
  );
}

export default function CarModel() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.position.y = -0.6 + Math.sin(clock.getElapsedTime() * 0.8) * 0.04;
    }
  });

  const bodyMaterial = new THREE.MeshPhysicalMaterial({
    color: 0x111111,
    metalness: 0.9,
    roughness: 0.3,
    clearcoat: 1.0,
    clearcoatRoughness: 0.1,
  });

  const glassMaterial = new THREE.MeshPhysicalMaterial({
    color: 0x88aacc,
    metalness: 0.1,
    roughness: 0.0,
    transmission: 0.9,
    thickness: 0.3,
    transparent: true,
    opacity: 0.4,
  });

  const chromeMaterial = new THREE.MeshPhysicalMaterial({
    color: 0xcccccc,
    metalness: 1.0,
    roughness: 0.05,
    clearcoat: 1.0,
    clearcoatRoughness: 0.02,
  });

  return (
    <group ref={groupRef} scale={1.4} position={[0, -0.6, 0]}>
      {/* Main body - lower chassis */}
      <mesh position={[0, 0, 0]} material={bodyMaterial} castShadow>
        <boxGeometry args={[2.2, 0.35, 1.0]} />
      </mesh>

      {/* Front hood - tapered */}
      <mesh position={[0.75, 0.22, 0]} material={bodyMaterial} castShadow>
        <boxGeometry args={[0.85, 0.12, 0.92]} />
      </mesh>
      <mesh position={[1.15, 0.17, 0]} material={bodyMaterial} castShadow>
        <boxGeometry args={[0.25, 0.12, 0.88]} />
      </mesh>

      {/* Cabin / passenger area */}
      <mesh position={[-0.1, 0.38, 0]} material={bodyMaterial} castShadow>
        <boxGeometry args={[1.1, 0.28, 0.88]} />
      </mesh>

      {/* Windshield - front glass */}
      <mesh
        position={[0.42, 0.42, 0]}
        rotation={[0, 0, 0.55]}
        material={glassMaterial}
      >
        <boxGeometry args={[0.52, 0.02, 0.85]} />
      </mesh>

      {/* Rear window */}
      <mesh
        position={[-0.62, 0.42, 0]}
        rotation={[0, 0, -0.55]}
        material={glassMaterial}
      >
        <boxGeometry args={[0.42, 0.02, 0.82]} />
      </mesh>

      {/* Side windows - left */}
      <mesh
        position={[-0.1, 0.44, 0.45]}
        material={glassMaterial}
      >
        <boxGeometry args={[0.9, 0.18, 0.02]} />
      </mesh>

      {/* Side windows - right */}
      <mesh
        position={[-0.1, 0.44, -0.45]}
        material={glassMaterial}
      >
        <boxGeometry args={[0.9, 0.18, 0.02]} />
      </mesh>

      {/* Trunk */}
      <mesh position={[-0.85, 0.18, 0]} material={bodyMaterial} castShadow>
        <boxGeometry args={[0.5, 0.12, 0.9]} />
      </mesh>

      {/* Front bumper */}
      <mesh position={[1.12, -0.02, 0]} material={bodyMaterial} castShadow>
        <boxGeometry args={[0.08, 0.22, 0.96]} />
      </mesh>

      {/* Rear bumper */}
      <mesh position={[-1.12, -0.02, 0]} material={bodyMaterial} castShadow>
        <boxGeometry args={[0.08, 0.22, 0.96]} />
      </mesh>

      {/* Headlights - front left */}
      <mesh position={[1.13, 0.08, 0.32]}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshPhysicalMaterial
          color={0xffffff}
          emissive={0xffffcc}
          emissiveIntensity={2}
          metalness={0.5}
          roughness={0.1}
        />
      </mesh>

      {/* Headlights - front right */}
      <mesh position={[1.13, 0.08, -0.32]}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshPhysicalMaterial
          color={0xffffff}
          emissive={0xffffcc}
          emissiveIntensity={2}
          metalness={0.5}
          roughness={0.1}
        />
      </mesh>

      {/* Tail lights - rear left */}
      <mesh position={[-1.13, 0.08, 0.32]}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshPhysicalMaterial
          color={0xff0000}
          emissive={0xff0000}
          emissiveIntensity={1}
          metalness={0.3}
          roughness={0.2}
        />
      </mesh>

      {/* Tail lights - rear right */}
      <mesh position={[-1.13, 0.08, -0.32]}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshPhysicalMaterial
          color={0xff0000}
          emissive={0xff0000}
          emissiveIntensity={1}
          metalness={0.3}
          roughness={0.2}
        />
      </mesh>

      {/* Grille - chrome strip */}
      <mesh position={[1.13, 0.0, 0]} material={chromeMaterial}>
        <boxGeometry args={[0.02, 0.12, 0.5]} />
      </mesh>

      {/* Roof rail accents */}
      <mesh position={[-0.1, 0.53, 0.42]} material={chromeMaterial}>
        <boxGeometry args={[1.0, 0.015, 0.015]} />
      </mesh>
      <mesh position={[-0.1, 0.53, -0.42]} material={chromeMaterial}>
        <boxGeometry args={[1.0, 0.015, 0.015]} />
      </mesh>

      {/* Door line - left */}
      <mesh position={[0.15, 0.1, 0.505]} material={chromeMaterial}>
        <boxGeometry args={[1.4, 0.005, 0.005]} />
      </mesh>

      {/* Door line - right */}
      <mesh position={[0.15, 0.1, -0.505]} material={chromeMaterial}>
        <boxGeometry args={[1.4, 0.005, 0.005]} />
      </mesh>

      {/* Side skirts */}
      <mesh position={[0, -0.08, 0.5]} material={bodyMaterial}>
        <boxGeometry args={[2.0, 0.06, 0.04]} />
      </mesh>
      <mesh position={[0, -0.08, -0.5]} material={bodyMaterial}>
        <boxGeometry args={[2.0, 0.06, 0.04]} />
      </mesh>

      {/* Wheels */}
      <Wheel position={[0.7, -0.18, 0.55]} />
      <Wheel position={[0.7, -0.18, -0.55]} />
      <Wheel position={[-0.7, -0.18, 0.55]} />
      <Wheel position={[-0.7, -0.18, -0.55]} />

      {/* Undercarriage shadow plate */}
      <mesh position={[0, -0.2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[2.1, 0.95]} />
        <meshBasicMaterial color={0x000000} transparent opacity={0.3} />
      </mesh>
    </group>
  );
}
