
import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { 
  PerspectiveCamera, 
  Environment,
  Float,
  Center
} from '@react-three/drei';
import * as THREE from 'three';

const Clapperboard = ({ isVisible }: { isVisible: boolean }) => {
  const groupRef = useRef<THREE.Group>(null);
  const hingeRef = useRef<THREE.Group>(null);
  
  const stripeTexture = useMemo(() => {
    const size = 256;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, size, size);
      ctx.fillStyle = '#ffffff';
      const stripeWidth = size / 4;
      for (let i = -size; i < size * 2; i += stripeWidth * 2) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i + stripeWidth, 0);
        ctx.lineTo(i + stripeWidth + 64, size);
        ctx.lineTo(i + 64, size);
        ctx.closePath();
        ctx.fill();
      }
    }
    return new THREE.CanvasTexture(canvas);
  }, []);

  const stripeMaterial = new THREE.MeshStandardMaterial({ 
    map: stripeTexture,
    roughness: 0.2,
    metalness: 0.5,
    transparent: true
  });
  
  const bodyMaterial = new THREE.MeshStandardMaterial({ 
    color: '#111111',
    roughness: 0.1,
    metalness: 0.6,
    transparent: true
  });

  useFrame((state) => {
    if (groupRef.current) {
      // Fade logic based on isVisible prop
      const targetOpacity = isVisible ? 1 : 0;
      groupRef.current.children.forEach((child: any) => {
        if (child.material) {
          child.material.opacity = THREE.MathUtils.lerp(child.material.opacity, targetOpacity, 0.1);
        }
        if (child.children) {
          child.children.forEach((grandChild: any) => {
            if (grandChild.material) {
              grandChild.material.opacity = THREE.MathUtils.lerp(grandChild.material.opacity, targetOpacity, 0.1);
            }
          });
        }
      });

      // Rotation and floating
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    }

    if (hingeRef.current && isVisible) {
      const t = state.clock.elapsedTime * 2;
      // Clapping animation
      hingeRef.current.rotation.z = Math.max(0, Math.sin(t) * 0.4);
    }
  });

  return (
    <group ref={groupRef} scale={1.2}>
      {/* Bottom Main Body */}
      <mesh material={bodyMaterial} position={[0, -0.5, 0]}>
        <boxGeometry args={[3, 2, 0.2]} />
      </mesh>
      
      {/* Fixed Stripe Bar on the Body */}
      <mesh material={stripeMaterial} position={[0, 0.65, 0.01]}>
        <boxGeometry args={[3, 0.4, 0.22]} />
      </mesh>

      {/* Top Movable Clapper Hinge */}
      <group ref={hingeRef} position={[-1.5, 0.85, 0]}>
        <mesh position={[1.5, 0.2, 0]} material={stripeMaterial}>
          <boxGeometry args={[3, 0.4, 0.22]} />
        </mesh>
      </group>
    </group>
  );
};

const ThreeScene: React.FC<{ isDark: boolean }> = ({ isDark }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full -z-1 pointer-events-none">
      <Canvas dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={50} />
        
        <ambientLight intensity={0.8} />
        <pointLight position={[10, 10, 10]} intensity={2} color="#ffffff" />
        <spotLight 
          position={[-10, 10, 10]} 
          angle={0.15} 
          penumbra={1} 
          intensity={5} 
          color="#ffffff" 
        />

        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
          <Center>
            <Clapperboard isVisible={!isDark} />
          </Center>
        </Float>

        <Environment preset="studio" />
      </Canvas>
    </div>
  );
};

export default ThreeScene;
