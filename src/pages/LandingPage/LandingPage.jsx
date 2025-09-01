// Página inicial que renderiza a seção de destaque
import React from 'react';
import styles from './LandingPage.module.css';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection/FeaturesSection';

const LandingPage = () => {
  return (
    <div className={styles.container}>
      <HeroSection />
      <FeaturesSection />
    </div>
  );
};

export default LandingPage;
