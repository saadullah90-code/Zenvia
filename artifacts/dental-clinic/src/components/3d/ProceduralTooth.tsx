import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function ProceduralTooth(props: any) {
  const groupRef = useRef<THREE.Group>(null);
  
  // Create a stylized tooth using simple geometries combined or a custom shape
  // A tooth roughly has a crown (rounded top) and roots (prongs at bottom)
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <group ref={groupRef} {...props}>
      {/* Crown */}
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[1.2, 1, 1]} />
        <meshPhysicalMaterial 
          color="#ffffff"
          roughness={0.1}
          transmission={0.9}
          thickness={2}
          clearcoat={1}
          clearcoatRoughness={0.1}
          ior={1.5}
        />
      </mesh>
      {/* Roots */}
      <mesh position={[-0.3, -0.4, 0]}>
        <capsuleGeometry args={[0.2, 0.8, 4, 8]} />
        <meshPhysicalMaterial 
          color="#e0f2fe"
          roughness={0.2}
          transmission={0.8}
          thickness={1}
        />
      </mesh>
      <mesh position={[0.3, -0.4, 0]}>
        <capsuleGeometry args={[0.2, 0.8, 4, 8]} />
        <meshPhysicalMaterial 
          color="#e0f2fe"
          roughness={0.2}
          transmission={0.8}
          thickness={1}
        />
      </mesh>
    </group>
  );
}
