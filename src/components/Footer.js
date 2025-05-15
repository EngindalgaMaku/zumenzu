import React from 'react';
import './Footer.css';
import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <motion.footer 
      className="portfolio-footer"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      viewport={{ once: true }}
    >
      <div className="footer-content">
        <p>&copy; {currentYear} Zumenzu. Tüm hakları saklıdır.</p>
        <div className="footer-links">
          <a href="#ana-sayfa" onClick={(e) => {e.preventDefault(); document.getElementById('ana-sayfa').scrollIntoView({behavior:'smooth'})}}>Ana Sayfa</a>
          <a href="#hizmetlerimiz" onClick={(e) => {e.preventDefault(); document.getElementById('hizmetlerimiz').scrollIntoView({behavior:'smooth'})}}>Hizmetlerimiz</a>
          <a href="#projelerimiz" onClick={(e) => {e.preventDefault(); document.getElementById('projelerimiz').scrollIntoView({behavior:'smooth'})}}>Projelerimiz</a>
          <a href="#iletisim" onClick={(e) => {e.preventDefault(); document.getElementById('iletisim').scrollIntoView({behavior:'smooth'})}}>İletişim</a>
        </div>
        <button onClick={scrollToTop} className="scroll-to-top" aria-label="Yukarı Çık">
          &uarr; {/* Yukarı ok sembolü */}
        </button>
      </div>
    </motion.footer>
  );
};

export default Footer; 