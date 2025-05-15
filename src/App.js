import React from 'react';
import './App.css';
import Header from './components/Header';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';
import SpaceParallaxBackground from './components/SpaceParallaxBackground';
// import { motion } from 'framer-motion'; // Şimdilik ana App componentinde motion kullanmıyoruz, alt componentlerde olacak

function App() {
  return (
    <>
      <SpaceParallaxBackground />
      <div className="App">
        <Header />
        <main>
          <Hero />
          <Projects />
          <Skills />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App; 