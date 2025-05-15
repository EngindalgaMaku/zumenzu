import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import { useScroll } from 'framer-motion';

// Yıldızlar için Parallax Katmanı
const ParallaxStarsLayer = ({ scrollYProgress, speedFactor = 0.1, ...starsProps }) => {
  const groupRef = useRef();
  useFrame(() => {
    if (groupRef.current) {
      const movementRange = window.innerHeight * 0.5; 
      groupRef.current.position.y = scrollYProgress.get() * movementRange * speedFactor * -1;
      // Yıldız katmanlarının X ve Z pozisyonları sabit (0) kalacak
      groupRef.current.position.x = 0;
      groupRef.current.position.z = 0;
    }
  });
  return (
    <group ref={groupRef}>
      <Stars {...starsProps} />
    </group>
  );
};

const SpaceParallaxBackground = () => {
  const { scrollYProgress } = useScroll(); 

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }}>
      <Canvas camera={{ position: [0, 0, 1], fov: 75 }}>
        <ambientLight intensity={0.1} />
        
        {/* Uzak Yıldızlar - En Yavaş */}
        <ParallaxStarsLayer
          scrollYProgress={scrollYProgress}
          speedFactor={0.05}
          radius={80}
          depth={80}
          count={6000}
          factor={3}
          saturation={0}
          fade
          speed={0.5}
        />

        {/* Orta Mesafeli Yıldızlar - Biraz Daha Hızlı */}
        <ParallaxStarsLayer
          scrollYProgress={scrollYProgress}
          speedFactor={0.2}
          radius={90}
          depth={60}
          count={3000}
          factor={4}
          saturation={0}
          fade
          speed={0.3}
        />

      </Canvas>
    </div>
  );
};

export default SpaceParallaxBackground; 