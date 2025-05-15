import React from 'react';
import './Skills.css';
import { motion } from 'framer-motion';
import { FaReact, FaHtml5, FaCss3Alt, FaNodeJs, FaGitAlt, FaFigma, FaSass } from 'react-icons/fa';
import { IoLogoJavascript } from 'react-icons/io5';
import { SiFramer, SiThreedotjs, SiExpress, SiMongodb, SiTypescript, SiNextdotjs } from 'react-icons/si';
import { MdPhonelinkSetup, MdOutlineWebhook } from 'react-icons/md';

// Örnek yetenek verileri ve react-icons ile ikonlar
const skillsData = [
  { name: 'React & Next.js', level: 90, icon: <FaReact /> },
  { name: 'JavaScript (ES6+)', level: 95, icon: <IoLogoJavascript /> },
  { name: 'TypeScript', level: 80, icon: <SiTypescript /> },
  { name: 'Framer Motion', level: 85, icon: <SiFramer /> },
  { name: 'Three.js / R3F', level: 70, icon: <SiThreedotjs /> },
  { name: 'HTML5', level: 95, icon: <FaHtml5 /> },
  { name: 'CSS3 / SASS', level: 90, icon: <FaSass /> },
  { name: 'Node.js', level: 75, icon: <FaNodeJs /> },
  { name: 'Express.js', level: 70, icon: <SiExpress /> },
  { name: 'MongoDB / SQL', level: 65, icon: <SiMongodb /> },
  { name: 'Git & GitHub', level: 85, icon: <FaGitAlt /> },
  { name: 'API Development', level: 70, icon: <MdOutlineWebhook />},
  { name: 'UI/UX (Figma)', level: 75, icon: <FaFigma /> },
  { name: 'Responsive Design', level: 95, icon: <MdPhonelinkSetup /> },
];

const skillItemVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.1,
      type: 'spring',
      stiffness: 80
    }
  })
};

const progressBarVariants = {
  hidden: { width: 0 },
  visible: (level) => ({
    width: `${level}%`,
    transition: {
      duration: 1,
      ease: "easeOut",
      delay: 0.5 // Üstteki animasyondan biraz sonra başlasın
    }
  })
};

const Skills = () => {
  return (
    <section id="hizmetlerimiz" className="skills-section">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        viewport={{ amount: 0.1 }}
      >
        Hizmetlerimiz
      </motion.h2>
      <div className="skills-container">
        {skillsData.map((skill, index) => (
          <motion.div 
            key={skill.name} 
            className="skill-item"
            custom={index}
            variants={skillItemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ amount: 0.2 }}
            role="article"
            aria-labelledby={`skill-name-${index}`}
          >
            <div className="skill-info">
              <div className="skill-icon-wrapper" aria-hidden="true">{skill.icon}</div>
              <span className="skill-name" id={`skill-name-${index}`}>{skill.name}</span>
            </div>
            <div className="skill-level-bar-container" aria-label={`${skill.name} seviyesi: ${skill.level}%`}>
              <motion.div 
                className="skill-level-bar"
                custom={skill.level}
                variants={progressBarVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ amount: 0.8 }}
              >
                <span className="skill-level-text">{skill.level}%</span>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Skills; 