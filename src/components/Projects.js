import React, { useState } from 'react';
import './Projects.css';
import { motion, AnimatePresence } from 'framer-motion';
import proje1Image from '../images/proje1.png'; // Resim import edildi

// Proje verileri güncellendi
const sampleProjects = [
  {
    id: 1,
    title: 'Cafe Yonetim Paneli',
    description: 'React, Next.js ve TailwindCSS kullanılarak geliştirilmiş, kullanıcı dostu ve modern bir kafe yönetim paneli.',
    imageUrl: proje1Image, // Import edilen resim kullanıldı
    tags: ['React', 'Next.js', 'TailwindCSS'],
    detailedFeatures: [
      "Kullanıcı dostu ve modern arayüz tasarımı.",
      "React ve Next.js ile yüksek performanslı yapı.",
      "TailwindCSS kullanılarak esnek ve hızlı stil geliştirme.",
      "Sipariş alma ve yönetimi modülü.",
      "Dinamik menü yönetimi ve anlık güncellemeler.",
      "Stok takibi entegrasyonu için altyapı.",
      "Çoklu şube yönetimi.",
      "Satış raporları ve temel analiz özellikleri.",
    ]
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.2,
      type: 'spring',
      stiffness: 50,
      damping: 10
    },
  }),
  hover: {
    scale: 1.05,
    boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.3)',
    transition: { duration: 0.3 }
  }
};

// Basit Modal Bileşeni
const ProjectModal = ({ project, onClose }) => {
  // project null ise bir şey render etme (AnimatePresence zaten hallediyor olabilir ama güvence)
  if (!project) return null; 

  return (
    <motion.div 
      className="modal-overlay"
      key="modal-overlay" // AnimatePresence için key
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose} 
    >
      <motion.div 
        className="modal-content"
        key="modal-content" // AnimatePresence için key
        initial={{ scale: 0.9, opacity: 0, y: -30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: -30 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        onClick={(e) => e.stopPropagation()} 
      >
        <div className="modal-header">
          <h2>{project.title}</h2>
          <motion.button 
            onClick={onClose} 
            className="modal-close-button"
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
          >
            &times;
          </motion.button>
        </div>
        <div className="modal-body">
          <div className="modal-image-container">
            <img src={project.imageUrl} alt={`${project.title} Proje Resmi`} className="modal-project-image" />
          </div>
          <p className="modal-description">{project.description}</p>
          <h3>Öne Çıkan Özellikler:</h3>
          <ul>
            {project.detailedFeatures.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Projects = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const handleOpenModal = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    // selectedProject'i hemen null yapmak yerine AnimatePresence'ın çıkış animasyonunu tamamlamasına izin vermek için
    // bir timeout ile null yapmayı düşünebiliriz, ancak şimdilik Framer Motion'ın exit prop'u yeterli olabilir.
    // setSelectedProject(null); // Eğer animasyonlarla sorun yaşanırsa burası düzenlenebilir.
  };

  return (
    <section id="projelerimiz" className="projects-section">
      <motion.h2 
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        viewport={{ amount: 0.1 }}
      >
        Projelerimiz
      </motion.h2>
      <div className="projects-grid">
        {sampleProjects.map((project, index) => (
          <motion.div 
            key={project.id} 
            className="project-card"
            custom={index}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            whileHover="hover"
            viewport={{ amount: 0.2 }}
            role="region"
            aria-labelledby={`project-title-${project.id}`}
          >
            <div className="project-image-container">
              <img src={project.imageUrl} alt={`${project.title} Proje Resmi`} className="project-image" />
            </div>
            <div className="project-info">
              <h3 className="project-title" id={`project-title-${project.id}`}>{project.title}</h3>
              <p className="project-description">{project.description}</p>
              <div className="project-tags">
                {project.tags.map(tag => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
              <div className="project-links">
                <motion.button 
                  className="project-link details-button" 
                  onClick={() => handleOpenModal(project)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Detayları İncele
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      <AnimatePresence>
        {isModalOpen && selectedProject && (
          <ProjectModal project={selectedProject} onClose={handleCloseModal} />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects; 