import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import * as THREE from 'three';

// Tek bir küp için bileşen
function Box(props) {
  const meshRef = useRef();
  const [color] = useMemo(() => [new THREE.Color(Math.random() * 0xffffff)], []);
  const initialPosition = useMemo(() => [
    (Math.random() - 0.5) * 10,
    (Math.random() - 0.5) * 10,
    (Math.random() - 0.5) * 10
  ], []);
  const rotationSpeed = useMemo(() => Math.random() * 0.02 + 0.005, []);
  const movementSpeed = useMemo(() => Math.random() * 0.01 + 0.002, []);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += rotationSpeed;
      meshRef.current.rotation.y += rotationSpeed;
      // Küpleri yavaşça hareket ettir
      meshRef.current.position.x += Math.sin(state.clock.elapsedTime + initialPosition[0]) * movementSpeed;
      meshRef.current.position.y += Math.cos(state.clock.elapsedTime + initialPosition[1]) * movementSpeed;
    }
  });

  return (
    <mesh {...props} ref={meshRef} position={initialPosition}>
      <boxGeometry args={[0.3, 0.3, 0.3]} />
      <meshStandardMaterial color={color} roughness={0.5} metalness={0.5} />
    </mesh>
  );
}

const HeroCanvas = () => {
  const numBoxes = 30; // Oluşturulacak küp sayısı

  return (
    <Canvas 
      camera={{ position: [0, 0, 5], fov: 60 }}
      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}
    >
      <ambientLight intensity={0.6} color="#E0E0FF" />
      <pointLight position={[10, 10, 10]} intensity={1.2} color="#FFFFFF" />
      <pointLight position={[-10, -10, -10]} intensity={0.9} color="#7B61FF"/>
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      
      {Array.from({ length: numBoxes }).map((_, i) => (
        <Box key={i} />
      ))}
      
      {/* <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} /> */}
    </Canvas>
  );
};

export default HeroCanvas; 