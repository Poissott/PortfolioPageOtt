'use client';

import { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useGLTF } from '@react-three/drei';

function SpringChain() {
  const lightRef = useRef<THREE.PointLight>(null);
  const springsRef = useRef<THREE.Group[]>([]);
  const gltf = useGLTF('/spring.glb');

  // Animate springs with pulsating white effect
  useFrame(({ clock }) => {
    const time = clock.elapsedTime;
    
    springsRef.current.forEach((spring, i) => {
      if (!spring) return;
      
      // Pulsating effect - each spring slightly offset
      const pulsate = Math.sin(time * 2 + i * 0.5) * 0.5 + 0.5; // 0 to 1
      
      // Update material color for pulsating white shades
      spring.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh;
          const material = mesh.material as THREE.MeshStandardMaterial;
          if (material && 'emissiveIntensity' in material) {
            // Pulsate between pure white and slightly dimmer white
            const brightness = 0.7 + pulsate * 0.3; // 0.7 to 1.0
            material.color.setRGB(brightness, brightness, brightness);
            material.emissiveIntensity = 0.2 + pulsate * 0.4;
          }
        }
      });
    });
    
    // Animate light
    if (lightRef.current) {
      lightRef.current.position.y = -10 + Math.sin(time) * 2;
    }
  });

  return (
    <>
      {/* Multiple connected springs */}
      {Array.from({ length: 30 }).map((_, i) => {
        const clonedScene = gltf.scene.clone();
        
        // Apply white material to meshes
        clonedScene.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            mesh.material = new THREE.MeshStandardMaterial({
              color: '#ffffff',
              metalness: 0.7,
              roughness: 0.3,
              emissive: '#ffffff',
              emissiveIntensity: 0.3,
            });
          }
        });
        
        return (
          <group 
            key={i} 
            ref={(el: THREE.Group) => {
              if (el) springsRef.current[i] = el;
            }}
            position={[0, -10 + i * 100, 0]} 
            scale={1}
          >
            <primitive object={clonedScene} />
          </group>
        );
      })}
      
      <pointLight ref={lightRef} intensity={3} color="#ffffff" distance={8} />
    </>
  );
}

export default function ZigzagDivider() {
  return (
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-full pointer-events-none z-10">
      <Canvas
        camera={{ position: [100, 1000, 7], rotation: [-1.47, 1.3, 1.45], fov: 150 }}
        style={{ width: '100%', height: '100%' }}
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[2, 0, 5]} intensity={1} />
        <Suspense fallback={null}>
          <SpringChain />
        </Suspense>
      </Canvas>
    </div>
  );
}