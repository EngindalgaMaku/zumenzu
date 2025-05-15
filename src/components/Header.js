import React, { useState, useEffect, useRef } from 'react';
import './Header.css';
import { motion, useScroll, useMotionValueEvent, LayoutGroup } from 'framer-motion';
import logoImage from '../images/logo.png';

const Header = () => {
  // const name = "Zumenzu"; // Artık logo resmi kullanılacak
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();
  const [activeSection, setActiveSection] = useState('ana-sayfa');
  const navLinksRef = useRef([]);

  const sections = ['ana-sayfa', 'projelerimiz', 'hizmetlerimiz', 'iletisim'];

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }

    // Aktif bölümü belirle
    let currentSection = 'ana-sayfa'; // Varsayılan olarak ana-sayfa
    const mainThreshold = 130; // Header yüksekliği + bir miktar ofset

    for (const sectionId of sections) {
      const element = document.getElementById(sectionId);
      if (element) {
        const rect = element.getBoundingClientRect();
        
        // Ana sayfa için özel koşul (en üstte ve ekranın yarısından yukarıdaysa)
        if (sectionId === 'ana-sayfa' && rect.top >= -10 && rect.top < window.innerHeight / 2) {
             currentSection = sectionId;
             // break; // KALDIRILDI - Diğer bölümlerin de kontrol edilmesine izin ver
        } 
        // Diğer bölümler için genel koşul
        // Bölümün üstü ana eşik çizgisinin üzerinde veya eşittir VE bölümün altı bu çizginin altındadır
        else if (rect.top <= mainThreshold && rect.bottom > mainThreshold) {
          currentSection = sectionId; // currentSection güncellenir, döngüdeki sonraki eşleşen bölüm bunu geçersiz kılabilir
          // break; // KALDIRILDI - Bu, yeteneklerim ve iletişim arasında doğru seçim yapılmasını sağlar
        }
      }
    }
    
    // Döngüden sonra, eğer scroll pozisyonu sayfanın en altındaysa ve son bölüm görünürse onu aktif yap
    const isAtBottom = (window.innerHeight + latest) >= document.documentElement.scrollHeight - 15; // 15px tolerans
    if (isAtBottom && sections.length > 0) {
        const lastSectionId = sections[sections.length - 1];
        const lastElement = document.getElementById(lastSectionId);
        if (lastElement) {
            const rect = lastElement.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) { // Eğer son bölüm görünürse
                currentSection = lastSectionId;
            }
        }
    }

    if (activeSection !== currentSection) {
      setActiveSection(currentSection);
    }
  });

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    setActiveSection(targetId); // Tıklanan linki hemen aktif yap
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      let headerOffset = 80; // Ortalama header yüksekliği
      if (targetId === 'ana-sayfa') { // Ana sayfaya giderken header offset'i olmasın ya da daha az olsun
        headerOffset = 0;
      }
      const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    } else {
      console.warn(`Hedef element bulunamadı: ${targetId}`);
    }
  };

  const letterVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        type: 'spring',
        stiffness: 120,
      },
    }),
  };

  const navItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        delay: 0.5 + i * 0.1,
      },
    }),
    // hover için ayrıca bir varyant tanımlamak yerine whileHover'ı kullanacağız
    // veya doğrudan motion component'inin style prop'unda dinamik stiller verebiliriz.
  };

  // Navigasyon isimleri ve ID'lerinin sırası güncellendi
  const navItems = [
    { name: 'Ana Sayfa', id: 'ana-sayfa' },
    { name: 'Projelerimiz', id: 'projelerimiz' },
    { name: 'Hizmetlerimiz', id: 'hizmetlerimiz' },
    { name: 'İletişim', id: 'iletisim' }
  ];
  
  return (
    <motion.header
      className={`portfolio-header ${isScrolled ? 'scrolled' : ''}`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 80, delay: 0.2 }}
    >
      <div className="header-content-wrapper">
        <div className="logo">
          <a href="#ana-sayfa" onClick={(e) => {e.preventDefault(); document.getElementById('ana-sayfa').scrollIntoView({behavior:'smooth'})}}>
            <motion.img 
              src={logoImage} 
              alt="Zumenzu Ajans Logosu" 
              className="header-logo-image"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 100 }}
            />
          </a>
        </div>
        <nav>
          <LayoutGroup>
            <ul>
              {navItems.map((item, index) => {
                const isActive = activeSection === item.id;
                return (
                  <motion.li
                    key={item.id}
                    custom={index}
                    variants={navItemVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover={{ scale: 1.02 }}
                    className={`nav-item ${isActive ? 'active' : ''}`}
                    ref={el => navLinksRef.current[index] = el}
                  >
                    <a
                      href={`#${item.id}`}
                      onClick={(e) => handleNavClick(e, item.id)}
                      className={isActive ? 'active-link-text' : ''}
                    >
                      {item.name}
                    </a>
                    {isActive && (
                      <motion.div
                        className="active-nav-indicator"
                        layoutId="activeIndicator"
                        initial={false}
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      />
                    )}
                  </motion.li>
                );
              })}
            </ul>
          </LayoutGroup>
        </nav>
      </div>
    </motion.header>
  );
};

export default Header; 