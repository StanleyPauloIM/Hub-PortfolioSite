import React from 'react';
import LinkedInLogo from '../../../assets/images/LinkedIn-Logo.svg';

export default function LinkedInButton({ onClick, className = '' }) {
  return (
    <button type="button" onClick={onClick} className={`${className}`} aria-label="Continuar com LinkedIn">
      <img src={LinkedInLogo} alt="LinkedIn" style={{ width: 18, height: 18 }} />
      <span style={{ marginLeft: 8 }}>Continuar com LinkedIn</span>
    </button>
  );
}
