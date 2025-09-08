// Barra de navegação do topo
import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import styles from './Navbar.module.css';
import HubGlobe from '../../assets/HubGlobe.png';
import accountIcon from '../../assets/images/account_ex.jpg';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const location = useLocation();

  // Theme management (light/dark)
  const getPreferredTheme = () => {
    const saved = localStorage.getItem('theme');
    if (saved === 'light' || saved === 'dark') return saved;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  };
  const [theme, setTheme] = useState(getPreferredTheme);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Close panels when route changes
  useEffect(() => {
    setMobileOpen(false);
    setAccountOpen(false);
  }, [location.pathname]);

  const pages = [
    { label: 'Início', path: '/' },
    { label: 'ChooseUrCharacter', path: '/chooseurcharacter' },
    { label: 'GenerateUrPortfolio', path: '/generateurportfolio' },
    { label: 'ThePortfolio', path: '/theportfolio' },
  ];

  const aboutItems = [
    { label: 'Quem somos', href: '#sobre-nos' },
    { label: 'Missão', href: '#missao' },
    { label: 'Contato', href: '#contato' },
  ];

  const currentPath = location.pathname.toLowerCase();
  const isCurrent = (path) => currentPath === path.toLowerCase();

  return (
    <nav className={`${styles.nav} ${isScrolled ? styles.scrolled : ''}`}>
      {/* Logo - on mobile toggles the panel */}
      <div className={styles.logo} onClick={() => setMobileOpen((v) => !v)} role="button" aria-label="Abrir menu">
        <img src={HubGlobe} alt="Hub Globe" />
        <div className={styles.brandContainer}>
          <span className={styles.brand}>HUB</span>
          <div className={styles.brandGlow}></div>
        </div>
      </div>

      {/* Center + Right */}
      <ul className={styles.navLinks}>
        {/* Center menu */}
        <li className={styles.centerGroup}>
          <ul className={styles.centerMenu}>
            {/* Páginas dropdown */}
            <li className={`${styles.menuItem} ${styles.dropdown}`}>
              <button type="button" className={styles.dropdownTrigger}>
                Páginas <span className={styles.caret}>›</span>
              </button>
              <ul className={styles.dropdownMenu}>
                {pages.map((p) => (
                  <li key={p.path}>
                    {isCurrent(p.path) ? (
                      <span className={`${styles.dropdownLink} ${styles.disabled}`}>{p.label}</span>
                    ) : (
                      <NavLink to={p.path} className={styles.dropdownLink}>{p.label}</NavLink>
                    )}
                  </li>
                ))}
              </ul>
            </li>

            {/* Sobre‑nós dropdown */}
            <li className={`${styles.menuItem} ${styles.dropdown}`}>
              <button type="button" className={styles.dropdownTrigger}>
                Sobre‑nós <span className={styles.caret}>›</span>
              </button>
              <ul className={styles.dropdownMenu}>
                {aboutItems.map((a) => (
                  <li key={a.label}>
                    <a href={a.href} className={styles.dropdownLink}>{a.label}</a>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        </li>

        {/* Right actions */}
        <li><NavLink to="/signin" className={styles.joinBtn}>Juntar‑se</NavLink></li>
        <li className={styles.accountWrap}>
          <div className={styles.profilePic} title="Conta" onClick={() => setAccountOpen((v) => !v)}>
            <img src={accountIcon} alt="Account Icon" />
          </div>
          {accountOpen && (
            <div className={styles.accountMenu}>
              <NavLink to="/theportfolio" className={styles.accountLink}>Perfil</NavLink>
              <NavLink to="/generateurportfolio" className={styles.accountLink}>Criar Portfólio</NavLink>
              <hr className={styles.accountDivider} />
              <button className={styles.themeBtn} disabled={theme === 'dark'} onClick={() => setTheme('dark')}>Tema: Escuro</button>
              <button className={styles.themeBtn} disabled={theme === 'light'} onClick={() => setTheme('light')}>Tema: Claro</button>
              <hr className={styles.accountDivider} />
              <button className={styles.accountLink} onClick={() => console.log('Sair')}>Sair</button>
            </div>
          )}
        </li>
      </ul>

      {/* Painel móvel (aparece ao tocar no globo) */}
      {mobileOpen && (
        <div className={styles.mobilePanel}>
          <div className={styles.mobileSection}>
            <div className={styles.mobileGroup}>
              <div className={styles.mobileGroupTitle}>Páginas</div>
              <ul className={styles.mobileList}>
                {pages.map((p) => (
                  <li key={p.path}>
                    {isCurrent(p.path) ? (
                      <span className={`${styles.dropdownLink} ${styles.disabled}`}>{p.label}</span>
                    ) : (
                      <NavLink to={p.path} className={styles.dropdownLink}>{p.label}</NavLink>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.mobileGroup}>
              <div className={styles.mobileGroupTitle}>Sobre‑nós</div>
              <ul className={styles.mobileList}>
                {aboutItems.map((a) => (
                  <li key={a.label}><a href={a.href} className={styles.dropdownLink}>{a.label}</a></li>
                ))}
              </ul>
            </div>

            <div className={styles.mobileActions}>
              <NavLink to="/signin" className={styles.joinBtn}>Juntar‑se</NavLink>
              <div className={styles.mobileTheme}>
                <button className={styles.themeBtn} disabled={theme === 'dark'} onClick={() => setTheme('dark')}>Escuro</button>
                <button className={styles.themeBtn} disabled={theme === 'light'} onClick={() => setTheme('light')}>Claro</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
