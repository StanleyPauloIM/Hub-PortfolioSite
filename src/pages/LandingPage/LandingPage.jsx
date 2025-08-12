// Página inicial que renderiza a seção de destaque
import React from 'react';
import styles from './LandingPage.module.css';
import HeroSection from './components/HeroSection';

const LandingPage = () => {
  return (
    <div className={styles.container}>
      <HeroSection />
    </div>
  );
};

export default LandingPage;
