"use client";

import { useGLTF } from "@react-three/drei";
import { useRef, useEffect, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

export default function CarModel() {
  const { scene } = useGLTF("/car.glb");
  const groupRef = useRef<THREE.Group>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!scene) return;

    // 1. Fix materials: Phong → Standard for visibility
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        const materials = Array.isArray(mesh.material)
          ? mesh.material
          : [mesh.material];

        materials.forEach((mat, idx) => {
          if ((mat as any).isMeshPhongMaterial) {
            const phongMat = mat as THREE.MeshPhongMaterial;
            const stdMat = new THREE.MeshStandardMaterial({
              color: phongMat.color
                ? phongMat.color.clone()
                : new THREE.Color(0x666666),
              roughness: 0.3,
              metalness: 0.5,
              emissive: phongMat.emissive
                ? phongMat.emissive.clone()
                : new THREE.Color(0x000000),
              emissiveIntensity: 0.15,
              side: THREE.DoubleSide,
            });
            if (Array.isArray(mesh.material)) {
              mesh.material[idx] = stdMat;
            } else {
              mesh.material = stdMat;
            }
          } else if (mat instanceof THREE.MeshStandardMaterial) {
            mat.roughness = mat.roughness !== undefined ? mat.roughness : 0.3;
            mat.metalness = mat.metalness !== undefined ? mat.metalness : 0.4;
            mat.emissiveIntensity = 0.1;
            mat.side = THREE.DoubleSide;
            // Fix pure black materials
            if (
              mat.color &&
              mat.color.r < 0.01 &&
              mat.color.g < 0.01 &&
              mat.color.b < 0.01
            ) {
              mat.color.set(0x555555);
            }
            mat.needsUpdate = true;
          }
        });

        mesh.castShadow = true;
        mesh.receiveShadow = true;
      }
    });

    // 2. Compute bounding box and auto-scale
    const box = new THREE.Box3().setFromObject(scene);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);

    // Target size: ~4 units wide (reasonable for Three.js scene)
    const maxDim = Math.max(size.x, size.y, size.z);
    const targetSize = 4;
    const autoScale = targetSize / maxDim;

    // Center the model at origin
    scene.position.set(-center.x, -center.y, -center.z);
    scene.scale.setScalar(autoScale);

    console.log(
      `CarModel: bbox=(${size.x.toFixed(1)}, ${size.y.toFixed(1)}, ${size.z.toFixed(1)}), autoScale=${autoScale.toFixed(4)}`
    );

    setReady(true);
  }, [scene]);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = -0.3 + Math.sin(clock.getElapsedTime() * 0.08) * 0.1;
      groupRef.current.position.y =
        Math.sin(clock.getElapsedTime() * 0.4) * 0.02;
    }
  });

  if (!ready) return null;

  return (
    <group ref={groupRef}>
      <primitive object={scene} />
    </group>
  );
}

useGLTF.preload("/car.glb");
