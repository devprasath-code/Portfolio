import { useFrame, useThree } from '@react-three/fiber';
import { useRef, useMemo, useEffect } from 'react';
import * as THREE from 'three';

export function Temple() {
  const { size } = useThree();
  const isMobile = size.width < 768;
  const group = useRef<THREE.Group>(null);
  const portalRef = useRef<THREE.Mesh>(null);
  const neuralRef = useRef<THREE.Group>(null);
  const monolithsRef = useRef<THREE.Group>(null);
  const scrollOffset = useRef(0);

  const streamsRef = useRef<THREE.InstancedMesh>(null);
  const fragmentsRef = useRef<THREE.InstancedMesh>(null);

  // Data streams data
  const streams = useMemo(() => {
    return Array.from({ length: 100 }).map(() => ({
      position: new THREE.Vector3(
        (Math.random() - 0.5) * 40,
        Math.random() * 20,
        (Math.random() - 0.5) * 40
      ),
      scale: new THREE.Vector3(0.01, 2 + Math.random() * 5, 0.01),
      seed: Math.random() * 10
    }));
  }, []);

  // Fragments data
  const fragments = useMemo(() => {
    return Array.from({ length: 60 }).map(() => ({
      position: new THREE.Vector3(
        (Math.random() - 0.5) * 50,
        Math.random() * 25,
        (Math.random() - 0.5) * 50
      ),
      rotation: new THREE.Euler(Math.random() * Math.PI, Math.random() * Math.PI, 0),
      scale: new THREE.Vector3().setScalar(0.2 + Math.random() * 0.6),
      seed: Math.random() * 10
    }));
  }, []);

  useEffect(() => {
    if (streamsRef.current) {
      const dummy = new THREE.Object3D();
      streams.forEach((stream, i) => {
        dummy.position.copy(stream.position);
        dummy.scale.copy(stream.scale);
        dummy.updateMatrix();
        streamsRef.current!.setMatrixAt(i, dummy.matrix);
      });
      streamsRef.current.instanceMatrix.needsUpdate = true;
    }

    if (fragmentsRef.current) {
      const dummy = new THREE.Object3D();
      fragments.forEach((fragment, i) => {
        dummy.position.copy(fragment.position);
        dummy.rotation.copy(fragment.rotation);
        dummy.scale.copy(fragment.scale);
        dummy.updateMatrix();
        fragmentsRef.current!.setMatrixAt(i, dummy.matrix);
      });
      fragmentsRef.current.instanceMatrix.needsUpdate = true;
    }
  }, [streams, fragments]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state) => {
    const scrollY = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const targetOffset = maxScroll > 0 ? scrollY / maxScroll : 0;
    
    // Smoothly interpolate the offset for the camera path
    scrollOffset.current = THREE.MathUtils.lerp(scrollOffset.current, targetOffset, 0.1);
    const offset = scrollOffset.current;
    
    // Cinematic Camera Path
    // Scene 1: Hero (0.0 - 0.125)
    // Scene 2: About (0.125 - 0.25)
    // Scene 3: Skills (0.25 - 0.375)
    // Scene 4: Projects (0.375 - 0.5)
    // Scene 5: Vision (0.5 - 0.625)
    // Scene 6: Evolution (0.625 - 0.75)
    // Scene 7: Tech Stack (0.75 - 0.875)
    // Scene 8: Contact (0.875 - 1.0)
    
    if (offset < 0.125) {
      // Hero: Approaching the monolith
      const t = offset * 8;
      state.camera.position.z = THREE.MathUtils.lerp(15, 5, t);
      state.camera.position.y = THREE.MathUtils.lerp(2, 4, t);
      state.camera.lookAt(0, 2, -20);
    } else if (offset < 0.25) {
      // About: Diving into the left monolith
      const t = (offset - 0.125) * 8;
      state.camera.position.x = THREE.MathUtils.lerp(0, -8, t);
      state.camera.position.z = THREE.MathUtils.lerp(5, -5, t);
      state.camera.lookAt(-10, 5, -20);
    } else if (offset < 0.375) {
      // Skills: Rising above the structure
      const t = (offset - 0.25) * 8;
      state.camera.position.x = THREE.MathUtils.lerp(-8, 8, t);
      state.camera.position.y = THREE.MathUtils.lerp(4, 15, t);
      state.camera.position.z = THREE.MathUtils.lerp(-5, 0, t);
      state.camera.lookAt(0, 10, -20);
    } else if (offset < 0.5) {
      // Projects: Looking down from the top
      const t = (offset - 0.375) * 8;
      state.camera.position.x = THREE.MathUtils.lerp(8, 0, t);
      state.camera.position.y = THREE.MathUtils.lerp(15, 25, t);
      state.camera.position.z = THREE.MathUtils.lerp(0, -10, t);
      state.camera.lookAt(0, 0, -20);
    } else if (offset < 0.625) {
      // Vision: Sweeping view
      const t = (offset - 0.5) * 8;
      state.camera.position.x = THREE.MathUtils.lerp(0, -15, t);
      state.camera.position.y = THREE.MathUtils.lerp(25, 10, t);
      state.camera.position.z = THREE.MathUtils.lerp(-10, -5, t);
      state.camera.lookAt(0, 5, -20);
    } else if (offset < 0.75) {
      // Evolution: Moving through the pillars
      const t = (offset - 0.625) * 8;
      state.camera.position.x = THREE.MathUtils.lerp(-15, 15, t);
      state.camera.position.y = THREE.MathUtils.lerp(10, 8, t);
      state.camera.position.z = THREE.MathUtils.lerp(-5, -15, t);
      state.camera.lookAt(0, 8, -25);
    } else if (offset < 0.875) {
      // Tech Stack: Orbiting the core
      const t = (offset - 0.75) * 8;
      state.camera.position.x = THREE.MathUtils.lerp(15, 0, t);
      state.camera.position.y = THREE.MathUtils.lerp(8, 20, t);
      state.camera.position.z = THREE.MathUtils.lerp(-15, -5, t);
      state.camera.lookAt(0, 15, -20);
    } else {
      // Contact: Entering the central core
      const t = (offset - 0.875) * 8;
      state.camera.position.y = THREE.MathUtils.lerp(20, 2, t);
      state.camera.position.z = THREE.MathUtils.lerp(-5, -15, t);
      state.camera.lookAt(0, 2, -30);
    }

    // Subtle rotation based on mouse
    if (group.current) {
      group.current.rotation.y = THREE.MathUtils.lerp(
        group.current.rotation.y,
        (state.mouse.x * Math.PI) / (isMobile ? 60 : 40),
        0.1
      );
    }

    // Portal glow pulse
    if (portalRef.current) {
      const material = portalRef.current.material as THREE.MeshStandardMaterial;
      material.emissiveIntensity = 2 + Math.sin(state.clock.elapsedTime * 2) * 1;
    }

    // Neural network rotation and float
    if (neuralRef.current) {
      neuralRef.current.rotation.y += 0.003;
      neuralRef.current.position.y = 15 + Math.sin(state.clock.elapsedTime) * 0.5;
    }

    // Monoliths subtle float
    if (monolithsRef.current) {
      monolithsRef.current.children.forEach((child, i) => {
        child.position.y += Math.sin(state.clock.elapsedTime + i) * 0.002;
        child.rotation.y += 0.001;
      });
    }

    // Fragments movement (Instanced)
    if (fragmentsRef.current) {
      fragments.forEach((fragment, i) => {
        dummy.position.copy(fragment.position);
        dummy.position.y += Math.sin(state.clock.elapsedTime + fragment.seed) * 0.05;
        dummy.rotation.copy(fragment.rotation);
        dummy.rotation.x += state.clock.elapsedTime * 0.1;
        dummy.rotation.z += state.clock.elapsedTime * 0.1;
        dummy.scale.copy(fragment.scale);
        dummy.updateMatrix();
        fragmentsRef.current!.setMatrixAt(i, dummy.matrix);
      });
      fragmentsRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <group ref={group}>
      {/* Floor with grid */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]} receiveShadow>
        <planeGeometry args={[200, 200]} />
        <meshStandardMaterial 
          color="#000000" 
          roughness={0.02} 
          metalness={1} 
        />
      </mesh>
      <gridHelper args={[200, 100, '#4DA6FF', '#050505']} position={[0, 0, 0]} />

      {/* Main Temple Structure */}
      <group position={[0, 0, -20]}>
        {/* Massive Monolithic Pillars */}
        <group ref={monolithsRef}>
          {/* Front Left */}
          <mesh position={[-10, 10, 0]} castShadow receiveShadow>
            <boxGeometry args={[4, 25, 4]} />
            <meshStandardMaterial color="#050505" roughness={0.1} metalness={0.9} />
          </mesh>
          {/* Front Right */}
          <mesh position={[10, 10, 0]} castShadow receiveShadow>
            <boxGeometry args={[4, 25, 4]} />
            <meshStandardMaterial color="#050505" roughness={0.1} metalness={0.9} />
          </mesh>
          {/* Mid Left */}
          <mesh position={[-15, 8, -10]} castShadow receiveShadow>
            <boxGeometry args={[3, 20, 3]} />
            <meshStandardMaterial color="#080808" roughness={0.1} metalness={0.9} />
          </mesh>
          {/* Mid Right */}
          <mesh position={[15, 8, -10]} castShadow receiveShadow>
            <boxGeometry args={[3, 20, 3]} />
            <meshStandardMaterial color="#080808" roughness={0.1} metalness={0.9} />
          </mesh>
        </group>

        {/* Central Monolith (The Core) */}
        <mesh position={[0, 15, -15]} castShadow>
          <boxGeometry args={[6, 30, 6]} />
          <meshStandardMaterial color="#020202" roughness={0.05} metalness={1} />
        </mesh>

        {/* The Portal Frame (Obsidian Arch) */}
        <group position={[0, 6, -5]}>
          <mesh position={[-4, 0, 0]}>
            <boxGeometry args={[1, 12, 1]} />
            <meshStandardMaterial color="#050505" />
          </mesh>
          <mesh position={[4, 0, 0]}>
            <boxGeometry args={[1, 12, 1]} />
            <meshStandardMaterial color="#050505" />
          </mesh>
          <mesh position={[0, 6, 0]}>
            <boxGeometry args={[9, 1, 1]} />
            <meshStandardMaterial color="#050505" />
          </mesh>
          
          {/* Glowing Accents */}
          <mesh position={[-3.6, 0, 0.6]}>
            <boxGeometry args={[0.1, 11, 0.1]} />
            <meshStandardMaterial color="#4DA6FF" emissive="#4DA6FF" emissiveIntensity={5} />
          </mesh>
          <mesh position={[3.6, 0, 0.6]}>
            <boxGeometry args={[0.1, 11, 0.1]} />
            <meshStandardMaterial color="#4DA6FF" emissive="#4DA6FF" emissiveIntensity={5} />
          </mesh>
        </group>

        {/* The Portal (Energy Core) */}
        <mesh ref={portalRef} position={[0, 6, -4.9]}>
          <planeGeometry args={[7, 11]} />
          <meshStandardMaterial 
            color="#000000" 
            emissive="#4DA6FF" 
            emissiveIntensity={2} 
            transparent 
            opacity={0.8}
          />
        </mesh>

        {/* Volumetric Light Beams */}
        <group position={[0, 6, -4.8]}>
          <mesh rotation={[0, 0, 0]}>
            <cylinderGeometry args={[4, 8, 40, 32, 1, true]} />
            <meshBasicMaterial 
              color="#4DA6FF" 
              transparent 
              opacity={0.05} 
              side={THREE.DoubleSide}
            />
          </mesh>
          {/* Secondary Beams */}
          {Array.from({ length: 8 }).map((_, i) => (
            <mesh key={i} rotation={[0, 0, (i * Math.PI) / 4]}>
              <cylinderGeometry args={[0.1, 2, 60, 8, 1, true]} />
              <meshBasicMaterial 
                color="#4DA6FF" 
                transparent 
                opacity={0.1} 
                side={THREE.DoubleSide}
              />
            </mesh>
          ))}
        </group>

        {/* Neural Network Structure (Floating Geometric) */}
        <group ref={neuralRef} position={[0, 18, -10]}>
          {Array.from({ length: 24 }).map((_, i) => (
            <group key={i} rotation={[Math.random() * Math.PI, Math.random() * Math.PI, 0]}>
              <mesh position={[Math.random() * 10 - 5, Math.random() * 10 - 5, Math.random() * 10 - 5]}>
                <octahedronGeometry args={[0.3]} />
                <meshStandardMaterial color="#4DA6FF" emissive="#4DA6FF" emissiveIntensity={10} />
              </mesh>
              {/* Connecting "Neural" Lines */}
              <mesh position={[0, 0, 0]} rotation={[0, 0, Math.random() * Math.PI]}>
                <boxGeometry args={[0.02, 10, 0.02]} />
                <meshStandardMaterial color="#4DA6FF" emissive="#4DA6FF" emissiveIntensity={1} transparent opacity={0.1} />
              </mesh>
            </group>
          ))}
        </group>

        {/* About Me Chamber Waypoint (Holographic Panels) */}
        <group position={[-10, 5, -15]}>
          {Array.from({ length: 3 }).map((_, i) => (
            <mesh key={i} position={[i * 2 - 2, 0, 0]} rotation={[0, 0.2, 0]}>
              <planeGeometry args={[1.5, 2]} />
              <meshStandardMaterial color="#4DA6FF" transparent opacity={0.1} side={THREE.DoubleSide} />
            </mesh>
          ))}
        </group>
        <group position={[8, 10, -10]}>
          {[
            { label: "Python", pos: [-2, 2, 0] },
            { label: "React", pos: [2, 2, 0] },
            { label: "ML", pos: [-2, -2, 0] },
            { label: "DL", pos: [2, -2, 0] },
          ].map((tech, i) => (
            <group key={i} position={tech.pos as any}>
              <mesh>
                <sphereGeometry args={[0.5, 32, 32]} />
                <meshStandardMaterial color="#4DA6FF" emissive="#4DA6FF" emissiveIntensity={2} transparent opacity={0.3} />
              </mesh>
              <mesh position={[0, 0, 0.6]}>
                <boxGeometry args={[1, 0.2, 0.01]} />
                <meshBasicMaterial color="#4DA6FF" />
              </mesh>
            </group>
          ))}
        </group>
        {/* AI Projects Lab Waypoint (Glass Cubes) */}
        <group position={[0, 20, -15]}>
          {Array.from({ length: 4 }).map((_, i) => (
            <mesh key={i} position={[(i % 2) * 4 - 2, Math.floor(i / 2) * 4 - 2, 0]}>
              <boxGeometry args={[3, 3, 3]} />
              <meshStandardMaterial color="#4DA6FF" transparent opacity={0.05} roughness={0} metalness={1} />
            </mesh>
          ))}
        </group>
        {Array.from({ length: 30 }).map((_, i) => (
          <mesh key={i} position={[0, i * 0.2, i * 0.8]} castShadow receiveShadow>
            <boxGeometry args={[12, 0.2, 0.8]} />
            <meshStandardMaterial color="#0A0A0A" roughness={0.1} metalness={0.9} />
          </mesh>
        ))}
      </group>

        {/* Contact Terminal Waypoint (Central Core) */}
        <group position={[0, 2, -35]}>
          <mesh>
            <sphereGeometry args={[2, 64, 64]} />
            <meshStandardMaterial color="#4DA6FF" emissive="#4DA6FF" emissiveIntensity={5} transparent opacity={0.8} />
          </mesh>
          <pointLight color="#4DA6FF" intensity={10} distance={20} />
        </group>

      {/* Data Streams (Vertical Light Particles) */}
      <instancedMesh ref={streamsRef} args={[undefined, undefined, 100]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#4DA6FF" emissive="#4DA6FF" emissiveIntensity={3} transparent opacity={0.2} />
      </instancedMesh>

      {/* Floating Obsidian Fragments */}
      <instancedMesh ref={fragmentsRef} args={[undefined, undefined, 60]} castShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#050505" roughness={0.05} metalness={1} />
      </instancedMesh>
    </group>
  );
}

