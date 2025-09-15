// Barra de navegação do topo
import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../../auth/AuthProvider';
import styles from './Navbar.module.css';
import useOnClickOutside, { useOnEscape } from '../../hooks/useOnClickOutside';
import HubGlobe from '../../assets/HubGlobe.png';
import accountIcon from '../../assets/images/account_ex.jpg';
import { useI18n } from '../../i18n/I18nProvider';

export default function Navbar() {
  const { user, signOut } = useAuth();
  const { t, locale } = useI18n();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [showHint, setShowHint] = useState(false);
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

  // Mobile hint to tap the globe
  useEffect(() => {
    let mq;
    try {
      mq = window.matchMedia('(max-width: 700px)');
      const decide = () => {
        if (mq.matches && !mobileOpen) {
          setShowHint(true);
          // auto-hide after a few seconds
          setTimeout(() => setShowHint(false), 4000);
        } else {
          setShowHint(false);
        }
      };
      decide();
      const onChange = () => decide();
      if (mq.addEventListener) mq.addEventListener('change', onChange); else if (mq.addListener) mq.addListener(onChange);
      return () => { try { if (mq.removeEventListener) mq.removeEventListener('change', onChange); else if (mq.removeListener) mq.removeListener(onChange); } catch {} };
    } catch { /* noop */ }
  }, [mobileOpen]);

  // Close panels when route changes
  useEffect(() => {
    setMobileOpen(false);
    setAccountOpen(false);
  }, [location.pathname]);

  const pages = [
    { label: t('nav.home'), path: '/' },
    { label: 'ChooseUrCharacter', path: '/chooseurcharacter' },
    { label: 'GenerateUrPortfolio', path: '/generateurportfolio' },
    { label: 'ThePortfolio', path: '/theportfolio' },
  ];

  const aboutItems = [
    { label: t('nav.aboutWho'), href: '#sobre-nos' },
    { label: t('nav.aboutMission'), href: '#missao' },
    { label: t('nav.aboutContact'), href: '#contato' },
  ];
  const aboutLabel = t('nav.about');
  const aboutText = (aboutLabel && aboutLabel !== 'nav.about') ? aboutLabel : (locale === 'en' ? 'About' : 'Sobre‑nós');

  const currentPath = location.pathname.toLowerCase();
  const isCurrent = (path) => currentPath === path.toLowerCase();

  const accountRef = React.useRef(null);
  useOnClickOutside(accountRef, () => setAccountOpen(false), { enabled: accountOpen });
  useOnEscape(() => setAccountOpen(false), accountOpen);
  
  return (
    <nav className={`${styles.nav} ${isScrolled ? styles.scrolled : ''}`}>
      {/* Logo - on mobile toggles the panel */}
      <div className={styles.logo} onClick={() => setMobileOpen((v) => !v)} role="button" aria-label="Abrir menu">
        <img src={HubGlobe} alt="Hub Globe" />
        <div className={styles.brandContainer}>
          <span className={styles.brand}>HUB</span>
          <div className={styles.brandGlow}></div>
        </div>
        {showHint && (
          <div className={styles.tapHint} aria-hidden="true">Toca no globo</div>
        )}
      </div>

      {/* Center + Right */}
      <ul className={styles.navLinks}>
        {/* Center menu */}
        <li className={styles.centerGroup}>
          <ul className={styles.centerMenu}>
            {/* Páginas dropdown */}
            <li className={`${styles.menuItem} ${styles.dropdown}`}>
              <button type="button" className={styles.dropdownTrigger}>
                {t('nav.pages')} <span className={styles.caret}>›</span>
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
                {aboutText} <span className={styles.caret}>›</span>
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
        <li><NavLink to="/signin" className={`btn ${styles.joinBtn}`}>{t('nav.join')}</NavLink></li>
        <li className={styles.accountWrap} ref={accountRef}>
          <div className={styles.profilePic} title="Conta" onClick={() => setAccountOpen((v) => !v)}>
            <img src={user?.photoURL || accountIcon} alt={user?.displayName ? `Perfil de ${user.displayName}` : 'Perfil'} />
          </div>
          {accountOpen && (
            <div className={styles.accountMenu}>
              <NavLink to="/theportfolio" className={styles.accountLink}>
                <img className={styles.menuIcon} src="https://img.icons8.com/ios-glyphs/24/user.png" alt="" />
                Perfil
              </NavLink>
              <NavLink to="/generateurportfolio" className={styles.accountLink}>
                <img className={styles.menuIcon} src="https://img.icons8.com/ios-glyphs/24/resume.png" alt="" />
                Criar Portfólio
              </NavLink>
              <hr className={styles.accountDivider} />
              <button className={`btn btn--small btn--full ${styles.themeBtn}`} disabled={theme === 'dark'} onClick={() => setTheme('dark')}>Tema: Escuro</button>
              <button className={`btn btn--small btn--full ${styles.themeBtn}`} disabled={theme === 'light'} onClick={() => setTheme('light')}>Tema: Claro</button>
              <hr className={styles.accountDivider} />
              <button className={styles.accountLink} onClick={async () => { try { await signOut(); } catch {} window.location.assign('/signin'); }}>
                <img className={styles.menuIcon} src="https://img.icons8.com/ios-glyphs/24/exit.png" alt="" />
                Sair
              </button>
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
              <div className={styles.mobileGroupTitle}>{aboutText}</div>
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
