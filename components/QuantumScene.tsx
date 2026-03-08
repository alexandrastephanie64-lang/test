/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, Torus, Cylinder, Stars, Environment, Box } from '@react-three/drei';
import * as THREE from 'three';

const QuantumParticle = ({ position, color, scale = 1 }: { position: [number, number, number]; color: string; scale?: number }) => {
  const ref = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.getElapsedTime();
      ref.current.position.y = position[1] + Math.sin(t * 2 + position[0]) * 0.2;
      ref.current.rotation.x = t * 0.5;
      ref.current.rotation.z = t * 0.3;
    }
  });

  return (
    <Sphere ref={ref} args={[1, 32, 32]} position={position} scale={scale}>
      <MeshDistortMaterial
        color={color}
        envMapIntensity={1}
        clearcoat={1}
        clearcoatRoughness={0}
        metalness={0.8}
        distort={0.4}
        speed={2}
      />
    </Sphere>
  );
};

const MacroscopicWave = () => {
  const ref = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (ref.current) {
       const t = state.clock.getElapsedTime();
       ref.current.rotation.x = Math.sin(t * 0.2) * 0.2;
       ref.current.rotation.y = t * 0.1;
    }
  });

  return (
    <Torus ref={ref} args={[3, 0.05, 16, 100]} rotation={[Math.PI / 2, 0, 0]}>
      <meshStandardMaterial color="#00f2ff" emissive="#00f2ff" emissiveIntensity={1} transparent opacity={0.3} wireframe />
    </Torus>
  );
}

export const HeroScene: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#00f2ff" />
        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
          <QuantumParticle position={[0, 0, 0]} color="#00f2ff" scale={1.2} />
          <MacroscopicWave />
        </Float>
        
        <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
           <QuantumParticle position={[-3, 1, -2]} color="#00ff41" scale={0.5} />
           <QuantumParticle position={[3, -1, -3]} color="#00f2ff" scale={0.6} />
        </Float>

        <Environment preset="night" />
        <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />
      </Canvas>
    </div>
  );
};

export const QuantumComputerScene: React.FC = () => {
  return (
    <div className="w-full h-full absolute inset-0">
      <Canvas camera={{ position: [0, 0, 4.5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[5, 5, 5]} angle={0.3} penumbra={1} intensity={3} color="#00f2ff" />
        <pointLight position={[-5, -5, -5]} intensity={0.5} color="#00ff41" />
        <Environment preset="night" />
        
        <Float rotationIntensity={0.4} floatIntensity={0.2} speed={1}>
          <group rotation={[0, 0, 0]} position={[0, 0.5, 0]}>
            {/* Main Cryostat Structure (Industrial/Cyber look) */}
            
            {/* Top Plate */}
            <Cylinder args={[1.2, 1.2, 0.1, 64]} position={[0, 1, 0]}>
              <meshStandardMaterial color="#1f1f1f" metalness={1} roughness={0.1} />
            </Cylinder>
            
            {/* Middle Stage */}
            <Cylinder args={[1, 1, 0.1, 64]} position={[0, 0.2, 0]}>
              <meshStandardMaterial color="#1f1f1f" metalness={1} roughness={0.1} />
            </Cylinder>
            
            {/* Bottom Stage */}
            <Cylinder args={[0.6, 0.6, 0.1, 64]} position={[0, -0.6, 0]}>
              <meshStandardMaterial color="#1f1f1f" metalness={1} roughness={0.1} />
            </Cylinder>

            {/* Connecting Rods - Cyan glowing */}
            <Cylinder args={[0.02, 0.02, 0.8, 16]} position={[0.5, 0.6, 0]}>
               <meshStandardMaterial color="#00f2ff" emissive="#00f2ff" emissiveIntensity={2} />
            </Cylinder>
            <Cylinder args={[0.02, 0.02, 0.8, 16]} position={[-0.5, 0.6, 0]}>
               <meshStandardMaterial color="#00f2ff" emissive="#00f2ff" emissiveIntensity={2} />
            </Cylinder>
            
             {/* Coils/Wires - Green glowing */}
            <Torus args={[0.7, 0.01, 16, 64]} position={[0, -0.2, 0]} rotation={[Math.PI/2, 0, 0]}>
               <meshStandardMaterial color="#00ff41" emissive="#00ff41" emissiveIntensity={1} />
            </Torus>
             <Torus args={[0.3, 0.01, 16, 64]} position={[0, -1, 0]} rotation={[Math.PI/2, 0, 0]}>
               <meshStandardMaterial color="#00ff41" emissive="#00ff41" emissiveIntensity={1} />
            </Torus>
            
            {/* Central processor chip */}
            <Box args={[0.2, 0.05, 0.2]} position={[0, -0.7, 0]}>
                <meshStandardMaterial color="#00f2ff" emissive="#00f2ff" emissiveIntensity={2} metalness={1} roughness={0} />
            </Box>
          </group>
        </Float>
      </Canvas>
    </div>
  );
}
