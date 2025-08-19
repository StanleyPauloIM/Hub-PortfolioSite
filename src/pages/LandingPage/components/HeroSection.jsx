// Seção de herói que apresenta o produto
import React from 'react';

const HeroSection = () => {
  return (
    <section>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <img
          src="/src/assets/HUBlogo_t512.png"
          alt="Hub Logo"
          style={{ width: 128, height: 128 }}
        />
        <div>
          <h1>Welcome to Hub – ThePortfolioWebsite</h1>
          <p>Build your portfolio with style.</p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
