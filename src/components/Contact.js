import React from 'react';
import './Contact.css';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeInOut',
      staggerChildren: 0.2 // İçerisindeki elemanların sıralı animasyonu için
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' }
  }
};

const buttonVariants = {
  hover: {
    scale: 1.05,
    boxShadow: "0px 0px 12px rgb(97,218,251,0.7)", // Bionluk rengine yakın bir vurgu
    transition: { duration: 0.3, yoyo: Infinity },
  },
  tap: {
    scale: 0.95,
  },
};

const Contact = () => {
  const bionlukProfileUrl = "https://bionluk.com/zumenzu";
  const githubUrl = "https://github.com/umutdalga";
  const linkedinUrl = "https://linkedin.com/in/umutdalga";

  return (
    <motion.section 
      id="iletisim" 
      className="contact-section"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.2 }} // amount: 0.2 -> %20'si görününce tetiklenir
    >
      <motion.h2 variants={itemVariants}>
        İletişim & İş Birliği
      </motion.h2>
      <motion.p 
        className="contact-intro"
        variants={itemVariants}
      >
        Projelerinizde birlikte çalışmak, freelance hizmetlerimden faydalanmak veya sadece bir merhaba demek için benimle Bionluk üzerinden kolayca iletişime geçebilirsiniz.
      </motion.p>
      
      <motion.a 
        href={bionlukProfileUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="bionluk-button"
        variants={itemVariants} // itemVariants'ı burada da kullanabiliriz
        whileHover="hover"
        whileTap="tap"
      >
        Bionluk Profilimize Gidin
      </motion.a>

      <motion.div 
        className="social-links-contact"
        variants={itemVariants} // Bu bölüm için de genel item varyantı
      >
        <p>Diğer platformlarda da beni bulabilirsiniz:</p>
        <motion.a 
          href={githubUrl} 
          target="_blank" 
          rel="noopener noreferrer" 
          aria-label="GitHub Profili"
          whileHover={{ scale: 1.1, color: '#FAA4BD' }}
          whileTap={{ scale: 0.9 }}
        >
          <FaGithub />
        </motion.a>
        <motion.a 
          href={linkedinUrl} 
          target="_blank" 
          rel="noopener noreferrer" 
          aria-label="LinkedIn Profili"
          whileHover={{ scale: 1.1, color: '#FAA4BD' }}
          whileTap={{ scale: 0.9 }}
        >
          <FaLinkedin />
        </motion.a>
      </motion.div>
    </motion.section>
  );
};

export default Contact; 