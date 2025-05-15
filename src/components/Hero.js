import React from 'react';
import './Hero.css';
import { motion, useScroll, useTransform } from 'framer-motion';
// import HeroCanvas from './HeroCanvas'; // KALDIRILDI
// Three.js bileşenini daha sonra ekleyeceğiz
// import SpaceBackground from './three/SpaceBackground'; 

// Basit bir parıltı SVG'si
const SparkleIcon = (props) => (
  <svg width="12" height="12" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M5 0L6.12257 3.87743L10 5L6.12257 6.12257L5 10L3.87743 6.12257L0 5L3.87743 3.87743L5 0Z" fill="currentColor"/>
  </svg>
);

const Sparkle = ({ top, left, right, bottom, delay }) => {
  const sparkleVariants = {
    initial: { opacity: 0, scale: 0.5 },
    animate: {
      opacity: [0, 1, 0],
      scale: [0.5, 1.2, 0.5],
      transition: {
        duration: 1.5 + Math.random() * 1, // Rastgele süre
        repeat: Infinity,
        repeatDelay: 1 + Math.random() * 2, // Rastgele tekrar gecikmesi
        delay: delay + Math.random() * 0.5, // Başlangıç gecikmesi
        ease: "easeInOut"
      }
    }
  };
  return (
    <motion.div
      style={{
        position: 'absolute',
        top,
        left,
        right,
        bottom,
        color: '#ADD8E6', // Yıldız parıltısı rengi
      }}
      variants={sparkleVariants}
      initial="initial"
      animate="animate"
    >
      <SparkleIcon />
    </motion.div>
  );
};

const Hero = () => {
  // Metinler şirket kimliğine göre güncellendi
  const greetingText = "Dijital Dünyada Markanızın İmzası:"; 
  const name = "Zumenzu"; 
  const title = "Yaratıcı Web Çözümleri ve Marka Stratejileri";
  const subtitle = "İşletmenizi geleceğe taşıyan, yenilikçi ve kullanıcı odaklı dijital deneyimler tasarlıyoruz.";
  const ctaButtonText = "Hizmetlerimizi Keşfedin";
  const ctaButtonLink = "#hizmetlerimiz"; // Header'daki yeni ID ile eşleşmeli

  // Parallax için scroll hook'ları
  const { scrollYProgress } = useScroll(); // Tüm sayfanın kaydırma ilerlemesini alır
  
  // Metinler için y ekseninde farklı hızlarda hareket (paralaks)
  // scrollYProgress 0 (en üst) ile 1 (en alt) arasında bir değerdir.
  // Bu değeri [-100px, 100px] gibi bir aralığa dönüştüreceğiz.
  const yName = useTransform(scrollYProgress, [0, 0.3], [0, -30]); // İsim biraz daha yavaş yukarı kaysın (veya aşağı)
  const yTitle = useTransform(scrollYProgress, [0, 0.3], [0, -50]); // Başlık biraz daha hızlı
  const ySubtitle = useTransform(scrollYProgress, [0, 0.3], [0, -70]); // Altbaşlık daha da hızlı
  const yButton = useTransform(scrollYProgress, [0, 0.3], [0, -80]); // Buton

  // Hero section arka planı için bir parallax efekti (opsiyonel, eğer .hero-overlay veya .hero-section'a uygulanacaksa)
  // const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]); // Arka plan pozisyonunu kaydırır

  const heroContentVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Ana elemanların (h1, p, a) stagger'ı
        delayChildren: 0.3, 
      },
    },
  };

  const baseItemVariants = { // Temel kayma ve belirme animasyonu
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 100, damping: 12 },
    },
  };

  // İsim (Zumenzu) için container varyantı, harfleri sırayla getirecek
  const nameContainerVariants = {
    hidden: { opacity: 1 }, // Container görünür olsun, harfler gizli başlasın
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.07, // Harflerin gelme hızı
        delayChildren: 0.7, // "Dijital Dünyada Markanızın İmzası:"den sonra başlasın (greetingText için delay ile uyumlu)
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 20, x: -5, rotateZ: -5 },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      rotateZ: 0,
      transition: { type: 'spring', stiffness: 150, damping: 10 },
    },
    hover: {
      scale: 1.1,
      color: '#ADD8E6', // Yıldız parıltısı rengi
      transition: { duration: 0.2 }
    }
  };
  
  const greetingVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { type: 'spring', stiffness: 100, damping: 15, delay: 0.5 }
    }
  };

  return (
    <section id="ana-sayfa" className="hero-section">
      {/* <Suspense fallback={<div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: 'white' }}>3D Sahne Yükleniyor...</div>}> */}
      {/*  <HeroCanvas /> */}
      {/* </Suspense> */}
      
      {/* hero-overlay div'i Three.js canvasının üzerinde kalabilir veya kaldırılabilir. Şimdilik bırakıyorum, gerekirse CSS ile ayarlanır. */}
      {/* <div className="hero-overlay"></div> */}

      <motion.div 
        className="hero-content"
        variants={heroContentVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 
          className="hero-name" 
          style={{ y: yName }} // Parallax efekti tüm h1'e uygulansın
          // variants={baseItemVariants} // Artık kendi iç animasyonları var
        >
          <motion.span variants={greetingVariants} style={{ display: 'block', marginBottom: '10px' }}>{greetingText}</motion.span> {/* display: block ve margin eklendi */} 
          <motion.span 
            variants={nameContainerVariants} 
            className="highlight" 
            style={{ display: 'inline-block', position: 'relative' }} // Harflerin yan yana doğru sıralanması için
          >
            {name.split('').map((char, index) => (
              <motion.span 
                key={index} 
                variants={letterVariants}
                whileHover="hover"
                style={{ display: 'inline-block', position: 'relative' }} // whileHover için önemli
              >
                {char === ' ' ? '\u00A0' : char} {/* Boşlukları koru */}
              </motion.span>
            ))}
            {/* Parıltılar Zumenzu ismi etrafında kalabilir veya ayarlanabilir */}
            <Sparkle top="-20%" left="-5%" delay={0.1} />
            <Sparkle top="5%" right="-10%" delay={0.3} />
            <Sparkle bottom="-15%" left="30%" delay={0.5} />
            <Sparkle bottom="5%" right="10%" delay={0.2} />
          </motion.span>
        </motion.h1>

        <motion.p 
          className="hero-title" 
          variants={baseItemVariants} // Diğerleri temel animasyonu kullanabilir
          style={{ y: yTitle }}
        >
          {title}
        </motion.p>
        <motion.p 
          className="hero-subtitle" 
          variants={baseItemVariants}
          style={{ y: ySubtitle }}
        >
          {subtitle} {/* Yeni alt başlık */} 
        </motion.p>
        <motion.a 
          href={ctaButtonLink} // Yeni link
          className="hero-cta-button"
          variants={baseItemVariants} // Buton da temel animasyonla gelsin
          whileHover={{ 
            scale: 1.08, 
            textShadow: "0px 0px 10px rgba(123, 97, 255, 0.8)",
            boxShadow: "0px 0px 18px rgba(123, 97, 255, 0.6)",
            transition: { duration: 0.2, type: 'spring', stiffness: 300 }
          }}
          whileTap={{ scale: 0.92 }}
          style={{ y: yButton, position: 'relative' }} // Buton etrafına parıltı için
        >
          {ctaButtonText} {/* Yeni buton metni */} 
          {/* Buton etrafındaki parıltılar */}
          <Sparkle top="-30%" left="-10%" delay={0.2} />
          <Sparkle bottom="-30%" right="-10%" delay={0.4} />
        </motion.a>
      </motion.div>
    </section>
  );
};

export default Hero; 