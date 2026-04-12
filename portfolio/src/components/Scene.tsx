import { Canvas, useThree } from '@react-three/fiber';
import { ScrollControls, Scroll, Float, Environment, PerspectiveCamera } from '@react-three/drei';
import { Suspense, useRef, useEffect } from 'react';
import * as THREE from 'three';
import { Temple } from './Temple';
import { Particles } from './Particles';
import { Overlay } from './Overlay';

function ResponsiveCamera() {
  const { size } = useThree();
  const isMobile = size.width < 768;
  
  return (
    <PerspectiveCamera 
      makeDefault 
      position={[0, 2, 10]} 
      fov={isMobile ? 75 : 50} 
    />
  );
}

export function Scene() {
  return (
    <div className="fixed inset-0 bg-black">
      <Canvas shadows gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}>
        <Suspense fallback={null}>
          <ResponsiveCamera />
          <color attach="background" args={['#000000']} />
          <fog attach="fog" args={['#000000', 5, 45]} />
          
          <ambientLight intensity={0.05} />
          <pointLight position={[10, 10, 10]} intensity={0.2} color="#4DA6FF" />
          <spotLight 
            position={[0, 15, 0]} 
            angle={0.4} 
            penumbra={1} 
            intensity={3} 
            castShadow 
            color="#4DA6FF"
          />

          <Temple />
          <Particles count={1000} />
          
          <Environment preset="night" />
        </Suspense>
      </Canvas>
    </div>
  );
}


