// Página para gerar um novo portfólio (com sidebar + top bar + pré-visualização)
import React, { useEffect, useMemo, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import styles from './GenerateUrPortfolio.module.css';
import useOnClickOutside, { useOnEscape } from '../../hooks/useOnClickOutside';
import SidebarLayout from '../../components/layout/SidebarLayout/SidebarLayout';
import exStyles from '../TemplateExample/TemplateExample.module.css';
import { Icon as UIIcon } from '../../components/ui/Icons/Icons';
import layoutStyles from '../ChooseUrCharacter/ChooseUrCharacter.module.css';
import HubGlobe from '../../assets/HubGlobe.png';
import accountIcon from '../../assets/images/account_ex.jpg';
import ClassicPortfolio from '../ThePortfolio/templates/classic/ClassicPortfolio';
import ColorSwatches from '../../components/ui/ColorSwatches/ColorSwatches';
import ChipsInput from '../../components/ui/ChipsInput/ChipsInput';
import YearSelect from '../../components/ui/YearSelect/YearSelect';
import FileInput from '../../components/ui/FileInput/FileInput';
import AutocompleteSelect from '../../components/ui/AutocompleteSelect/AutocompleteSelect';
import { Field, FieldInput } from '../../components/ui/Field/Field';
import { JOB_TITLES } from '../../data/jobTitles';
import { COUNTRIES } from '../../data/countries';
import INSTITUTION_SUGGESTIONS from '../../data/institutions';
import { CALLING_CODES } from '../../data/callingCodes';

// Ícones inline reutilizados (iguais aos do ChooseUrCharacter)
const Icon = {
  home: (props) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M3 11l9-8 9 8"/><path d="M9 22V12h6v10"/>
    </svg>
  ),
  search: (props) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.3-4.3"/>
    </svg>
  ),
  portfolio: (props) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
    </svg>
  ),
  wand: (props) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M6 6l12 12"/><path d="M14 6l4-4"/><path d="M4 14l-4 4"/>
    </svg>
  ),
  settings: (props) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="3"/>
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 8.6 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 8.6a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 8.6 4.6a1.65 1.65 0 0 0 1-.33V4a2 2 0 1 1 4 0v.09c.36.14.69.34 1 .59.3.25.55.56.74.9.18.34.29.73.33 1.12.04.39 0 .78-.12 1.16"/>
    </svg>
  ),
  bell: (props) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M18 8a6 6 0 10-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
    </svg>
  ),
  arrow: (props) => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <polyline points="15 18 9 12 15 6" />
    </svg>
  ),
  user: (props) => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
    </svg>
  ),
  briefcase: (props) => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
    </svg>
  ),
  mapPin: (props) => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M21 10c0 6-9 12-9 12S3 16 3 10a9 9 0 1 1 18 0z"/><circle cx="12" cy="10" r="3"/>
    </svg>
  ),
  image: (props) => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/>
    </svg>
  ),
  mail: (props) => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M4 4h16v16H4z" fill="none"/><path d="M22 6l-10 7L2 6"/>
    </svg>
  ),
  phone: (props) => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M22 16.92V21a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2 4.18 2 2 0 0 1 4 2h4.09a2 2 0 0 1 2 1.72l.57 4a2 2 0 0 1-.55 1.73L8.91 12.09a16 16 0 0 0 6 6l2.64-1.2a2 2 0 0 1 1.73.55l4 4.09A2 2 0 0 1 22 16.92z"/>
    </svg>
  ),
};

const defaultData = {
  template: 'classic',
  theme: {
    primary: '#1e90ff',
    secondary: '#b0b8c1',
    background: '#0b0b0b',
    text: '#ffffff',
  },
  profile: {
    name: '',
    title: '',
    location: '',
    avatarUrl: '',
  },
  stats: { likes: 0, views: 0 },
  about: { summary: '' },
  contact: { email: '', phone: '', website: '' },
  socials: { github: '', linkedin: '', twitter: '', instagram: '' },
  skills: ['React', 'Design'],
  projects: [
    { title: 'HUB – Website', description: 'Plataforma social de portfólios.', link: '', imageUrl: '', videoUrl: '' },
  ],
  certificates: [
    // { name:'', issuer:'', year:'', link:'', fileUrl:'', fileType:'' }
  ],
  diplomas: [
    // { school:'', degree:'', year:'', link:'', fileUrl:'', fileType:'' }
  ],
  links: [],
  media: [],
};

const STORAGE_DRAFT = 'hub_portfolio_draft';
const STORAGE_PUBLISHED = 'hub_portfolio_published';

export default function GenerateUrPortfolio() {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const Layout = SidebarLayout;
  const [notifOpen, setNotifOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const setTheme = (t) => { try { document.documentElement.setAttribute('data-theme', t); localStorage.setItem('theme', t); } catch {} };
  const [data, setData] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_DRAFT);
      if (raw) return JSON.parse(raw);
      const chosen = (localStorage.getItem('hub_selected_template') || '').toLowerCase();
      if (chosen === 'minimalist') return { ...defaultData, template: 'minimalist' };
      if (chosen === 'classic') return { ...defaultData, template: 'classic' };
      return defaultData;
    } catch {
      return defaultData;
    }
  });
  const [message, setMessage] = useState('');
  const [highlightTemplates, setHighlightTemplates] = useState(false);
  const [previews, setPreviews] = useState({ profileAvatar: '', projects: {}, media: {}, certificates: {}, diplomas: {}, stacks: { avatar: [], projects: {}, media: {}, certificates: {}, diplomas: {} } });


  // Persist draft on each change (debounced)
  useEffect(() => {
    const t = setTimeout(() => {
      try {
        const serialized = JSON.stringify(data, (k, v) => (typeof v === 'string' && /^blob:/.test(v) ? '' : v));
        localStorage.setItem(STORAGE_DRAFT, serialized);
      } catch {}
    }, 250);
    return () => clearTimeout(t);
  }, [data]);

  // Pulse gradient border on the templates box from time to time
  useEffect(() => {
    const tick = () => {
      setHighlightTemplates(true);
      setTimeout(() => setHighlightTemplates(false), 2200);
    };
    const delay = 14000; // every ~14s
    const id = setInterval(tick, delay);
    // first run after short delay
    const first = setTimeout(tick, 2000);
    return () => { clearInterval(id); clearTimeout(first); };
  }, []);

  const cssPreviewVars = useMemo(() => ({
    '--c-primary': data.theme?.primary || '#1e90ff',
    '--c-secondary': data.theme?.secondary || '#b0b8c1',
    '--c-bg': data.theme?.background || '#0b0b0b',
    '--c-text': data.theme?.text || '#ffffff',
  }), [data.theme]);

  const pages = [
    { label: 'Início', path: '/' },
    { label: 'ChooseUrCharacter', path: '/chooseurcharacter' },
    { label: 'GenerateUrPortfolio', path: '/generateurportfolio' },
    { label: 'ThePortfolio', path: '/theportfolio' },
  ];

  // Helpers to update nested fields
  const setField = (path, value) => {
    setData((prev) => {
      const next = typeof structuredClone === 'function' ? structuredClone(prev) : JSON.parse(JSON.stringify(prev));
      const parts = Array.isArray(path) ? path : String(path).split('.');
      let ref = next;
      for (let i = 0; i < parts.length - 1; i++) ref = ref[parts[i]] = ref[parts[i]] ?? {};
      ref[parts[parts.length - 1]] = value;
      return next;
    });
  };

  const updateArrayItem = (key, idx, patch) => {
    setData((prev) => {
      const arr = Array.isArray(prev[key]) ? [...prev[key]] : [];
      arr[idx] = { ...(arr[idx] || {}), ...patch };
      return { ...prev, [key]: arr };
    });
  };

  const addArrayItem = (key, item) => setData((prev) => ({ ...prev, [key]: [...(prev[key]||[]), item] }));
  const removeArrayItem = (key, idx) => setData((prev) => ({ ...prev, [key]: (prev[key]||[]).filter((_, i) => i !== idx) }));

  // Helpers: URL checks and file attachments (preview only)
  const isImageUrl = (url) => /\.(png|jpe?g|gif|webp|bmp|svg)$/i.test(String(url||''));
  const revoke = (u) => { try { if (u) URL.revokeObjectURL(u); } catch {} };
  const isPdf = (file) => file && file.type === 'application/pdf';

  const handleAvatarFile = (file) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) return setMessage('Arquivo inválido. Escolhe uma imagem.');
    if (file.size > 3 * 1024 * 1024) return setMessage('Imagem muito grande (máx. 3MB).');
    const url = URL.createObjectURL(file);
    setPreviews((p) => {
      const list = [...(p.stacks?.avatar || [])];
      list.push({ url, type: 'image' });
      if (list.length > 5) { const removed = list.shift(); revoke(removed?.url); }
      return { ...p, profileAvatar: url, stacks: { ...p.stacks, avatar: list } };
    });
    setField(['profile','avatarUrl'], url);
  };

  const handleProjectImageFile = (idx, file) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) return setMessage('Escolhe uma imagem.');
    if (file.size > 3 * 1024 * 1024) return setMessage('Imagem de projeto muito grande (máx. 3MB).');
    const url = URL.createObjectURL(file);
    setPreviews((p) => {
      const proj = p.stacks?.projects?.[idx] || [];
      const list = [...proj, { url, type: 'image' }];
      if (list.length > 5) { const removed = list.shift(); revoke(removed?.url); }
      return { ...p, projects: { ...(p.projects||{}), [idx]: (revoke(p.projects?.[idx]), url) }, stacks: { ...p.stacks, projects: { ...(p.stacks?.projects||{}), [idx]: list } } };
    });
    updateArrayItem('projects', idx, { imageUrl: url });
  };

  const handleMediaFile = (idx, file, type) => {
    if (!file) return;
    if (type === 'video') {
      if (!file.type.startsWith('video/')) return setMessage('Escolhe um vídeo.');
      if (file.size > 20 * 1024 * 1024) return setMessage('Vídeo muito grande (máx. 20MB).');
    } else {
      if (!file.type.startsWith('image/')) return setMessage('Escolhe uma imagem.');
      if (file.size > 3 * 1024 * 1024) return setMessage('Imagem muito grande (máx. 3MB).');
    }
    const url = URL.createObjectURL(file);
    setPreviews((p) => {
      const stacks = { ...(p.stacks||{}) };
      if (type === 'image') {
        const m = stacks.media?.[idx] || [];
        const list = [...m, { url, type: 'image' }];
        if (list.length > 5) { const removed = list.shift(); revoke(removed?.url); }
        stacks.media = { ...(stacks.media||{}), [idx]: list };
      }
      return { ...p, media: { ...(p.media||{}), [idx]: (revoke(p.media?.[idx]), url) }, stacks };
    });
    updateArrayItem('media', idx, { url });
  };

  const handleCertFile = (idx, file) => {
    if (!file) return;
    const type = isPdf(file) ? 'pdf' : (file.type.startsWith('image/') ? 'image' : '');
    if (!type) return setMessage('Anexa uma imagem ou PDF.');
    if (type === 'pdf' && file.size > 10 * 1024 * 1024) return setMessage('PDF muito grande (máx. 10MB).');
    if (type === 'image' && file.size > 3 * 1024 * 1024) return setMessage('Imagem muito grande (máx. 3MB).');
    const url = URL.createObjectURL(file);
    setPreviews((p) => {
      const cert = p.stacks?.certificates?.[idx] || [];
      const list = [...cert, { url, type, name: file.name }];
      if (list.length > 5) { const removed = list.shift(); revoke(removed?.url); }
      return { ...p, certificates: { ...(p.certificates||{}), [idx]: (revoke(p.certificates?.[idx]), url) }, stacks: { ...p.stacks, certificates: { ...(p.stacks?.certificates||{}), [idx]: list } } };
    });
    updateArrayItem('certificates', idx, { fileUrl: url, fileType: type, fileName: file.name });
  };

  const handleDiplomaFile = (idx, file) => {
    if (!file) return;
    const type = isPdf(file) ? 'pdf' : (file.type.startsWith('image/') ? 'image' : '');
    if (!type) return setMessage('Anexa uma imagem ou PDF.');
    if (type === 'pdf' && file.size > 10 * 1024 * 1024) return setMessage('PDF muito grande (máx. 10MB).');
    if (type === 'image' && file.size > 3 * 1024 * 1024) return setMessage('Imagem muito grande (máx. 3MB).');
    const url = URL.createObjectURL(file);
    setPreviews((p) => {
      const dip = p.stacks?.diplomas?.[idx] || [];
      const list = [...dip, { url, type, name: file.name }];
      if (list.length > 5) { const removed = list.shift(); revoke(removed?.url); }
      return { ...p, diplomas: { ...(p.diplomas||{}), [idx]: (revoke(p.diplomas?.[idx]), url) }, stacks: { ...p.stacks, diplomas: { ...(p.stacks?.diplomas||{}), [idx]: list } } };
    });
    updateArrayItem('diplomas', idx, { fileUrl: url, fileType: type, fileName: file.name });
  };

  const onSaveDraft = () => {
    try {
      const serialized = JSON.stringify(data, (k, v) => (typeof v === 'string' && /^blob:/.test(v) ? '' : v));
      localStorage.setItem(STORAGE_DRAFT, serialized);
      setMessage('Rascunho guardado.');
      setTimeout(() => setMessage(''), 1500);
    } catch {}
  };

  const onPublish = () => {
    try {
      // Guardar exatamente o que está no estado para testes (permite blob: em navegação imediata)
      const serialized = JSON.stringify(data);
      localStorage.setItem(STORAGE_PUBLISHED, serialized);
      // dispara evento manual para outras abas/componentes (fallback em single‑page)
      try { window.dispatchEvent(new StorageEvent('storage', { key: STORAGE_PUBLISHED, newValue: serialized })); } catch {}
      setMessage('Publicado!');
      setTimeout(() => setMessage(''), 800);
      navigate('/theportfolio');
    } catch {}
  };

  // Outside click/Escape for dropdowns
  const notifRef = React.useRef(null);
  const accountRef = React.useRef(null);
  useOnClickOutside(notifRef, () => setNotifOpen(false), { enabled: notifOpen });
  useOnClickOutside(accountRef, () => setAccountOpen(false), { enabled: accountOpen });
  useOnEscape(() => { setNotifOpen(false); setAccountOpen(false); }, notifOpen || accountOpen);

  return (
    <Layout>
      {({ styles: lay, mobileOpen, setMobileOpen }) => (
        <>
        {/* Top bar */}
        <div className={layoutStyles.topBar}>
          <button className={layoutStyles.mobileMenuBtn} onClick={() => setMobileOpen(true)} aria-label="Abrir menu">
            <span className={layoutStyles.hamburger} />
          </button>
          <div className={layoutStyles.pageTitleRow}>
            <button type="button" className={exStyles.backBtn} onClick={() => navigate(-1)} aria-label="Voltar">
              <span className={exStyles.backIcon}><UIIcon.arrowRight/></span>
              Voltar
            </button>
            <h1 className={layoutStyles.title}>Generate Your Portfolio</h1>
            <div className={layoutStyles.badge}>classic</div>
          </div>
          <div className={layoutStyles.topActions}>
            <div className={layoutStyles.bellWrap} ref={notifRef}>
              <button type="button" className={layoutStyles.iconBtn} onClick={() => setNotifOpen(v => !v)} aria-haspopup="menu" aria-expanded={notifOpen} aria-label="Notificações">
                <Icon.bell />
              </button>
              <span className={layoutStyles.bellDot} />
              {notifOpen && (
                <div className={layoutStyles.notifDropdown} role="menu">
                  <div className={layoutStyles.notifItem} role="menuitem">
                    <div className={layoutStyles.notifTitle}>Dica</div>
                    <div className={layoutStyles.notifMeta}>podes alterar as cores no painel de Tema</div>
                  </div>
                  <div className={layoutStyles.notifFooter}>Ver todas</div>
                </div>
              )}
            </div>
            <button type="button" className={layoutStyles.iconBtn} aria-label="Definições"><Icon.settings /></button>
            <div className={layoutStyles.accountWrap} ref={accountRef}>
              <div className={layoutStyles.avatar} onClick={() => setAccountOpen(v => !v)} role="button" aria-label="Conta"><img src={accountIcon} alt="Perfil" /></div>
              {accountOpen && (
                <div className={layoutStyles.accountMenu} role="menu">
                  <NavLink to="/theportfolio" className={layoutStyles.accountLink} role="menuitem">
                    <img className={layoutStyles.menuIcon} src="https://img.icons8.com/ios-glyphs/24/user.png" alt="" />
                    Perfil
                  </NavLink>
                  <NavLink to="/generateurportfolio" className={layoutStyles.accountLink} role="menuitem">
                    <img className={layoutStyles.menuIcon} src="https://img.icons8.com/ios-glyphs/24/resume.png" alt="" />
                    Criar Portfólio
                  </NavLink>
                  <hr className={layoutStyles.accountDivider} />
                  <button className={`btn btn--small btn--full ${layoutStyles.themeBtn}`} onClick={() => setTheme('dark')}>Tema: Escuro</button>
                  <button className={`btn btn--small btn--full ${layoutStyles.themeBtn}`} onClick={() => setTheme('light')}>Tema: Claro</button>
                  <hr className={layoutStyles.accountDivider} />
                  <button className={layoutStyles.accountLink} onClick={() => console.log('Sair')} role="menuitem">
                    <img className={layoutStyles.menuIcon} src="https://img.icons8.com/ios-glyphs/24/exit.png" alt="" />
                    Sair
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {message && <div className={styles.toast}>{message}</div>}

        {/* Grid: Form (L) + Preview (R) */}
        <div className={styles.pageGrid}>
          {/* Form */}
          <section className={styles.formColumn}>
            {/* Template */}
            <div className={[styles.formCard, styles.templateBox, styles.templateGlow, highlightTemplates ? styles.templateGlowActive : ''].join(' ')}>
            <div className={styles.sectionHeader}>
              <h2>Template</h2>
              <span className={styles.sectionHint}>Associe ao Classic Portfolio</span>
              <button type="button" className={styles.templatesCta} onClick={() => navigate('/templates')}>
                Ver galeria
              </button>
            </div>
              <div className={styles.row}>
                <label className={styles.radioCard}>
                  <input type="radio" name="template" checked={data.template === 'classic'} onChange={() => setField('template','classic')} />
                  <div className={styles.radioContent}>
                    <div className={styles.radioTitle}>Classic Portfolio</div>
                    <div className={styles.radioDesc}>Layout versátil e elegante</div>
                  </div>
                </label>
                <label className={`${styles.radioCard} ${styles.disabled}`} title="Brevemente">
                  <input type="radio" name="template" disabled />
                  <div className={styles.radioContent}>
                    <div className={styles.radioTitle}>Minimalist (em breve)</div>
                    <div className={styles.radioDesc}>Foco total no conteúdo</div>
                  </div>
                </label>
              </div>
            </div>

            {/* Perfil */}
            <div className={styles.formCard}>
              <div className={styles.sectionHeader}><h2>Perfil</h2></div>
              <div className={styles.grid2}>
<div className={styles.field}><label>Nome</label>
                <FieldInput
                  icon={<Icon.user className={styles.inputIcon} />}
                  spellCheck={false} autoComplete="off" autoCorrect="off" autoCapitalize="words"
                  value={data.profile.name}
                  onChange={(e)=>setField(['profile','name'], e.target.value)}
                  placeholder="Ex.: Ana Silva"
                />
                </div>
<div className={styles.field}><label>Título</label>
                  <Field icon={<Icon.briefcase className={styles.inputIcon} />} dropdown noInnerFrame>
                    <AutocompleteSelect
                    value={data.profile.title}
                    onChange={(val)=>setField(['profile','title'], val)}
                    options={JOB_TITLES}
                    placeholder="Ex.: Frontend Engineer"
                    allowCustom={true}
                    maxVisible={7}
renderLeadingIcon={() => null}
                    />
                  </Field>
                </div>
<div className={styles.field}><label>Localização</label>
                  <Field icon={<Icon.mapPin className={styles.inputIcon} />} dropdown noInnerFrame>
                    <AutocompleteSelect
                    value={data.profile.location}
                    onChange={(val)=>setField(['profile','location'], val)}
                    options={COUNTRIES}
                    placeholder="País"
                    allowCustom={true}
                    maxVisible={7}
renderLeadingIcon={() => null}
                    />
                  </Field>
                </div>
                <div className={styles.field}>
                  <label>Avatar URL</label>
<FieldInput icon={<Icon.image className={styles.inputIcon} />} spellCheck={false} autoComplete="off" autoCorrect="off" autoCapitalize="off" disabled={(previews.stacks?.avatar||[]).length>0} value={data.profile.avatarUrl} onChange={(e)=>setField(['profile','avatarUrl'], e.target.value)} placeholder="https://..." />
                  <div className={styles.orDivider}><span>OU</span></div>
                  <FileInput disabled={Boolean((data.profile.avatarUrl||'').trim())} accept="image/*" label="Selecionar imagem" hint="Imagem até 3MB. Apenas pré‑visualização local." onChange={(file)=>handleAvatarFile(file)} />
                  <div className={[styles.fileStack, (previews.stacks?.avatar||[]).length>3 ? styles.stacked : ''].join(' ')}>
                    {(previews.stacks?.avatar||[]).map((it, si) => (
                      <div key={si} className={[styles.stackItem, previews.profileAvatar===it.url ? styles.selected : ''].join(' ')} onClick={()=>{ setPreviews(p=>({...p, profileAvatar: it.url})); setField(['profile','avatarUrl'], it.url); }}>
                        {it.type==='image' ? (<img src={it.url} alt="" />) : (<div className={styles.stackPdf}>PDF</div>)}
                        <button type="button" className={styles.closeSm} onClick={(e)=>{ e.stopPropagation(); setPreviews(p=>{ const list=[...(p.stacks?.avatar||[])]; const [removed]=list.splice(si,1); revoke(removed?.url); const nextSel = p.profileAvatar===removed?.url ? (list[list.length-1]?.url||'') : p.profileAvatar; setField(['profile','avatarUrl'], nextSel||''); return { ...p, profileAvatar: nextSel, stacks:{...p.stacks, avatar:list} }; }); }}>×</button>
                      </div>
                    ))}
                  </div>
                  <div className={styles.previewRow}>
                    {previews.profileAvatar ? (
                      <img className={styles.avatarPreview} src={previews.profileAvatar} alt="Avatar preview" />
                    ) : (isImageUrl(data.profile.avatarUrl) && <img className={styles.avatarPreview} src={data.profile.avatarUrl} alt="Avatar preview" />)}
                  </div>
                </div>
              </div>
            </div>

            {/* Sobre */}
            <div className={styles.formCard}>
              <div className={styles.sectionHeader}><h2>Sobre</h2></div>
<div className={styles.field}><label>Resumo</label><textarea spellCheck={true} className={styles.textarea} rows={4} value={data.about.summary} onChange={(e)=>setField(['about','summary'], e.target.value)} placeholder="Breve apresentação"/></div>
            </div>

            {/* Contatos e Sociais */}
            <div className={styles.formCard}>
              <div className={styles.sectionHeader}><h2>Contato & Sociais</h2></div>
              <div className={styles.grid2}>
<div className={styles.field}><label>Email</label>
                <FieldInput icon={<Icon.mail className={styles.inputIcon} />} type="email" spellCheck={false} autoComplete="off" autoCorrect="off" autoCapitalize="off" value={data.contact.email} onChange={(e)=>setField(['contact','email'], e.target.value)} placeholder="nome@dominio.com" />
                </div>
                <div className={styles.field}>
                  <label>
                    Telefone
                    <select className={styles.codeSelect} value={data.contact.phoneCode || '+258'} onChange={(e)=>setField(['contact','phoneCode'], e.target.value)}>
                      {CALLING_CODES.map(({name, code}) => (
                        <option key={name+code} value={code}>{name} ({code})</option>
                      ))}
                    </select>
                  </label>
<FieldInput icon={<Icon.phone className={styles.inputIcon} />} spellCheck={false} autoComplete="off" autoCorrect="off" autoCapitalize="off" value={data.contact.phone} onChange={(e)=>setField(['contact','phone'], e.target.value)} placeholder="Número" />
                </div>
                <div className={styles.field}>
                  <label>Website</label>
<FieldInput icon={<svg className={styles.urlIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 0 20M12 2a15.3 15.3 0 0 0 0 20"/></svg>} spellCheck={false} autoComplete="off" autoCorrect="off" autoCapitalize="off" value={data.contact.website} onChange={(e)=>setField(['contact','website'], e.target.value)} placeholder="https://..." />
                </div>
<div className={styles.field}><label>GitHub</label>
                <FieldInput icon={<svg className={styles.urlIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3"/><path d="M15 22v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 18 3.77 5.07 5.07 0 0 0 17.91 1S16.73.65 13 2.48a13.38 13.38 0 0 0-8 0C1.27.65.09 1 .09 1A5.07 5.07 0 0 0 0 3.77 5.44 5.44 0 0 0 1.5 7.9c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 7 18.13V22"/></svg>} spellCheck={false} autoComplete="off" autoCorrect="off" autoCapitalize="off" value={data.socials.github} onChange={(e)=>setField(['socials','github'], e.target.value)} placeholder="https://github.com/..." />
                </div>
<div className={styles.field}><label>LinkedIn</label><div className={styles.urlWrap}><svg className={styles.urlIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="9" width="20" height="13" rx="2"/><path d="M7 9V5a5 5 0 0 1 10 0v4"/></svg><input spellCheck={false} autoComplete="off" autoCorrect="off" autoCapitalize="off" value={data.socials.linkedin} onChange={(e)=>setField(['socials','linkedin'], e.target.value)} placeholder="https://linkedin.com/in/..."/></div></div>
<div className={styles.field}><label>Twitter/X</label><div className={styles.urlWrap}><svg className={styles.urlIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.5c1.6 12-14 12-18 6 2 0 4-1 5-2-2-1-3-4-1-6 2 2 4 3 7 3-1-5 6-7 9-3z"/></svg><input spellCheck={false} autoComplete="off" autoCorrect="off" autoCapitalize="off" value={data.socials.twitter} onChange={(e)=>setField(['socials','twitter'], e.target.value)} placeholder="https://x.com/..."/></div></div>
<div className={styles.field}><label>Instagram</label><div className={styles.urlWrap}><svg className={styles.urlIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.5" y2="6.5"/></svg><input spellCheck={false} autoComplete="off" autoCorrect="off" autoCapitalize="off" value={data.socials.instagram} onChange={(e)=>setField(['socials','instagram'], e.target.value)} placeholder="https://instagram.com/..."/></div></div>
              </div>
            </div>

            {/* Skills */}
            <div className={styles.formCard}>
              <div className={styles.sectionHeader}><h2>Skills</h2></div>
              <div className={styles.field}> 
                <label>Adiciona como no LinkedIn (Enter para confirmar)</label>
                <ChipsInput
                  value={data.skills}
                  onChange={(skills)=> setData(d=>({ ...d, skills }))}
                  placeholder="Ex.: React, UX, TypeScript"
                  suggestions={[
                    'React','TypeScript','JavaScript','Vite','Next.js','Node.js','Express','HTML','CSS','SASS','Tailwind','Figma','UX','UI','Design Systems','Git','GitHub','CI/CD','Docker','Kubernetes','AWS','GCP','Azure','Firebase','Firestore','Storage','MongoDB','PostgreSQL','MySQL','Python','Django','Flask','TensorFlow','PyTorch','Data Analysis','PowerBI','Tableau','Go','Rust','Java','Spring','Kotlin','Swift','C#','.NET','PHP','Laravel','SEO','Marketing','Scrum','Agile'
                  ]}
                />
                <small className={styles.helper}>Evita duplicados; máximo 50 skills.</small>
              </div>
            </div>

            {/* Projetos */}
            <div className={styles.formCard}>
              <div className={styles.sectionHeader}><h2>Projetos</h2></div>
              {(data.projects||[]).map((p, idx) => (
                <div key={idx} className={styles.groupCard}>
                  <div className={styles.groupHeader}><strong>Projeto #{idx+1}</strong><button type="button" className={styles.linkBtn} onClick={()=>removeArrayItem('projects', idx)}>Remover</button></div>
                  <div className={styles.grid2}>
<div className={styles.field}><label>Título</label><input spellCheck={false} autoComplete="off" autoCorrect="off" autoCapitalize="sentences" value={p.title||''} onChange={(e)=>updateArrayItem('projects', idx, { title: e.target.value })}/></div>
<div className={styles.field}><label>Link</label><div className={styles.urlWrap}><svg className={styles.urlIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 0 20M12 2a15.3 15.3 0 0 0 0 20"/></svg><input spellCheck={false} autoComplete="off" autoCorrect="off" autoCapitalize="off" value={p.link||''} onChange={(e)=>updateArrayItem('projects', idx, { link: e.target.value })} placeholder="https://..."/></div></div>
                    <div className={styles.field}>
                      <label>Imagem URL</label>
<div className={styles.urlWrap}>
                        <svg className={styles.urlIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>
<input spellCheck={false} autoComplete="off" autoCorrect="off" autoCapitalize="off" disabled={(previews.stacks?.projects?.[idx]||[]).length>0} value={p.imageUrl||''} onChange={(e)=>updateArrayItem('projects', idx, { imageUrl: e.target.value })} placeholder="https://..."/>
                      </div>
                      <div className={styles.orDivider}><span>OU</span></div>
                      <FileInput disabled={Boolean(p.imageUrl && !/^blob:/.test(p.imageUrl))} accept="image/*" label="Selecionar imagem" hint="Imagem até 3MB" onChange={(file)=>handleProjectImageFile(idx, file)} />
                      <div className={[styles.fileStack, (previews.stacks?.projects?.[idx]||[]).length>3 ? styles.stacked : ''].join(' ')}>
                        {(previews.stacks?.projects?.[idx]||[]).map((it, si) => (
                          <div key={si} className={[styles.stackItem, (previews.projects?.[idx]||'')===it.url ? styles.selected : ''].join(' ')} onClick={()=>{ setPreviews(p=>({...p, projects:{...(p.projects||{}), [idx]: it.url}})); updateArrayItem('projects', idx, { imageUrl: it.url }); }}>
                            <img src={it.url} alt="" />
                            <button type="button" className={styles.closeSm} onClick={(e)=>{ e.stopPropagation(); setPreviews(p=>{ const list=[...((p.stacks?.projects?.[idx])||[])]; const [removed]=list.splice(si,1); revoke(removed?.url); const nextSel = (p.projects?.[idx]||'')===removed?.url ? (list[list.length-1]?.url||'') : (p.projects?.[idx]||''); const nextStacks = { ...(p.stacks||{}), projects:{ ...(p.stacks?.projects||{}), [idx]: list } }; const nextProj = { ...(p.projects||{}), [idx]: nextSel }; updateArrayItem('projects', idx, { imageUrl: nextSel }); return { ...p, stacks: nextStacks, projects: nextProj }; }); }}>×</button>
                          </div>
                        ))}
                      </div>
                      <div className={styles.previewRow}>
                        {previews.projects?.[idx] ? (
                          <img className={styles.thumb} src={previews.projects[idx]} alt="Preview" />
                        ) : (isImageUrl(p.imageUrl) && <img className={styles.thumb} src={p.imageUrl} alt="Preview" />)}
                      </div>
                    </div>
<div className={styles.field}><label>Vídeo URL</label><div className={styles.urlWrap}><svg className={styles.urlIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 0 20M12 2a15.3 15.3 0 0 0 0 20"/></svg><input spellCheck={false} autoComplete="off" autoCorrect="off" autoCapitalize="off" value={p.videoUrl||''} onChange={(e)=>updateArrayItem('projects', idx, { videoUrl: e.target.value })} placeholder="https://..."/></div></div>
<div className={styles.fieldFull}><label>Descrição</label><textarea spellCheck={true} className={styles.textarea} rows={3} value={p.description||''} onChange={(e)=>updateArrayItem('projects', idx, { description: e.target.value })} /></div>
                  </div>
                </div>
              ))}
              <div className={styles.actionsRow}>
                <button type="button" className={`btn ${styles.addBtn}`} onClick={()=>addArrayItem('projects', { title:'', description:'', link:'', imageUrl:'', videoUrl:'' })}>+ Adicionar projeto</button>
              </div>
            </div>

            {/* Certificados & Diplomas */}
            <div className={styles.formCard}>
              <div className={styles.sectionHeader}><h2>Certificados</h2></div>
              {(data.certificates||[]).map((c, idx) => (
                <div key={idx} className={styles.groupCard}>
                  <div className={styles.groupHeader}><strong>Certificado #{idx+1}</strong><button type="button" className={styles.linkBtn} onClick={()=>removeArrayItem('certificates', idx)}>Remover</button></div>
                  <div className={styles.grid3}>
<div className={styles.field}><label>Nome</label><input spellCheck={false} autoComplete="off" autoCorrect="off" autoCapitalize="words" value={c.name||''} onChange={(e)=>updateArrayItem('certificates', idx, { name: e.target.value })}/></div>
                    <div className={styles.field}><label>Entidade</label>
                      <div className={`${styles.inputWrap} noOuterField`}>
                        <Icon.briefcase className={styles.inputIcon} />
                        <AutocompleteSelect
                          value={c.issuer||''}
                          onChange={(val)=>updateArrayItem('certificates', idx, { issuer: val })}
                          options={INSTITUTION_SUGGESTIONS}
                          placeholder="Ex.: UEM, Coursera"
                          allowCustom={true}
                          maxVisible={7}
                        />
                      </div>
                    </div>
                    <div className={styles.field}><label>Ano</label><YearSelect value={c.year||''} onChange={(y)=>updateArrayItem('certificates', idx, { year: y })} /></div>
                    <div className={styles.fieldFull}>
                      <label>Link</label>
                      <div className={styles.urlWrap}>
                        <svg className={styles.urlIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 0 20M12 2a15.3 15.3 0 0 0 0 20"/></svg>
<input spellCheck={false} autoComplete="off" autoCorrect="off" autoCapitalize="off" disabled={Boolean(c.fileUrl)} value={c.link||''} onChange={(e)=>updateArrayItem('certificates', idx, { link: e.target.value })} placeholder="https://..."/>
                      </div>
                    </div>
                    <div className={styles.orDivider}><span>OU</span></div>
                    <div className={styles.fieldFull}>
                      <label>Ficheiro (PDF/Imagem)</label>
                      <FileInput disabled={Boolean((c.link||'').trim())} accept="image/*,application/pdf" label="Anexar ficheiro" hint="PDF até 10MB ou imagem até 3MB" onChange={(file)=>handleCertFile(idx, file)} />
                      <div className={[styles.fileStack, (previews.stacks?.certificates?.[idx]||[]).length>3 ? styles.stacked : ''].join(' ')}>
                        {(previews.stacks?.certificates?.[idx]||[]).map((it, si) => (
                          <div key={si} className={[styles.stackItem, (previews.certificates?.[idx]||'')===it.url ? styles.selected : ''].join(' ')} onClick={()=>{ setPreviews(p=>({...p, certificates:{...(p.certificates||{}), [idx]: it.url}})); updateArrayItem('certificates', idx, { fileUrl: it.url, fileType: it.type, fileName: it.name }); }}>
                            {it.type==='image' ? (<img src={it.url} alt="" />) : (<div className={styles.stackPdf}>PDF</div>)}
                            <button type="button" className={styles.closeSm} onClick={(e)=>{ e.stopPropagation(); setPreviews(p=>{ const list=[...((p.stacks?.certificates?.[idx])||[])]; const [removed]=list.splice(si,1); revoke(removed?.url); const nextSel = (p.certificates?.[idx]||'')===removed?.url ? (list[list.length-1]?.url||'') : (p.certificates?.[idx]||''); const nextStacks = { ...(p.stacks||{}), certificates:{ ...(p.stacks?.certificates||{}), [idx]: list } }; const nextC = { ...(p.certificates||{}), [idx]: nextSel }; const nextItem = list.length? list[list.length-1]: null; updateArrayItem('certificates', idx, { fileUrl: nextSel, fileType: nextItem?.type||'', fileName: nextItem?.name||'' }); return { ...p, stacks: nextStacks, certificates: nextC }; }); }}>×</button>
                          </div>
                        ))}
                      </div>
                      <div className={styles.previewRow}>
                        { (c.fileType||'') === 'image' ? (
                          previews.certificates?.[idx] ? (
                            <img className={styles.thumb} src={previews.certificates[idx]} alt="Certificado" />
                          ) : (isImageUrl(c.fileUrl) && <img className={styles.thumb} src={c.fileUrl} alt="Certificado" />)
                        ) : ( (c.fileType||'') === 'pdf' ? (
                          <div className={styles.docThumb}>📄 PDF</div>
                        ) : null) }
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div className={styles.actionsRow}>
                <button type="button" className={`btn ${styles.addBtn}`} onClick={()=>addArrayItem('certificates', { name:'', issuer:'', year:'', link:'', fileUrl:'', fileType:'', fileName:'' })}>+ Adicionar certificado</button>
              </div>
            </div>

            <div className={styles.formCard}>
              <div className={styles.sectionHeader}><h2>Diplomas</h2></div>
              {(data.diplomas||[]).map((d, idx) => (
                <div key={idx} className={styles.groupCard}>
                  <div className={styles.groupHeader}><strong>Diploma #{idx+1}</strong><button type="button" className={styles.linkBtn} onClick={()=>removeArrayItem('diplomas', idx)}>Remover</button></div>
                  <div className={styles.grid3}>
                    <div className={styles.field}><label>Instituição</label>
                      <div className={`${styles.inputWrap} noOuterField`}>
                        <Icon.briefcase className={styles.inputIcon} />
                        <AutocompleteSelect
                          value={d.school||''}
                          onChange={(val)=>updateArrayItem('diplomas', idx, { school: val })}
                          options={INSTITUTION_SUGGESTIONS}
                          placeholder="Ex.: UEM, UCM"
                          allowCustom={true}
                          maxVisible={7}
                        />
                      </div>
                    </div>
<div className={styles.field}><label>Grau</label><input spellCheck={false} autoComplete="off" autoCorrect="off" autoCapitalize="words" value={d.degree||''} onChange={(e)=>updateArrayItem('diplomas', idx, { degree: e.target.value })}/></div>
                    <div className={styles.field}><label>Ano</label><YearSelect value={d.year||''} onChange={(y)=>updateArrayItem('diplomas', idx, { year: y })} /></div>
                    <div className={styles.fieldFull}>
                      <label>Link</label>
                      <div className={styles.urlWrap}>
                        <svg className={styles.urlIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 0 20M12 2a15.3 15.3 0 0 0 0 20"/></svg>
<input spellCheck={false} autoComplete="off" autoCorrect="off" autoCapitalize="off" disabled={Boolean(d.fileUrl)} value={d.link||''} onChange={(e)=>updateArrayItem('diplomas', idx, { link: e.target.value })} placeholder="https://..."/>
                      </div>
                    </div>
                    <div className={styles.orDivider}><span>OU</span></div>
                    <div className={styles.fieldFull}>
                      <label>Ficheiro (PDF/Imagem)</label>
                      <FileInput disabled={Boolean((d.link||'').trim())} accept="image/*,application/pdf" label="Anexar ficheiro" hint="PDF até 10MB ou imagem até 3MB" onChange={(file)=>handleDiplomaFile(idx, file)} />
                      <div className={[styles.fileStack, (previews.stacks?.diplomas?.[idx]||[]).length>3 ? styles.stacked : ''].join(' ')}>
                        {(previews.stacks?.diplomas?.[idx]||[]).map((it, si) => (
                          <div key={si} className={[styles.stackItem, (previews.diplomas?.[idx]||'')===it.url ? styles.selected : ''].join(' ')} onClick={()=>{ setPreviews(p=>({...p, diplomas:{...(p.diplomas||{}), [idx]: it.url}})); updateArrayItem('diplomas', idx, { fileUrl: it.url, fileType: it.type, fileName: it.name }); }}>
                            {it.type==='image' ? (<img src={it.url} alt="" />) : (<div className={styles.stackPdf}>PDF</div>)}
                            <button type="button" className={styles.closeSm} onClick={(e)=>{ e.stopPropagation(); setPreviews(p=>{ const list=[...((p.stacks?.diplomas?.[idx])||[])]; const [removed]=list.splice(si,1); revoke(removed?.url); const nextSel = (p.diplomas?.[idx]||'')===removed?.url ? (list[list.length-1]?.url||'') : (p.diplomas?.[idx]||''); const nextStacks = { ...(p.stacks||{}), diplomas:{ ...(p.stacks?.diplomas||{}), [idx]: list } }; const nextD = { ...(p.diplomas||{}), [idx]: nextSel }; const nextItem = list.length? list[list.length-1]: null; updateArrayItem('diplomas', idx, { fileUrl: nextSel, fileType: nextItem?.type||'', fileName: nextItem?.name||'' }); return { ...p, stacks: nextStacks, diplomas: nextD }; }); }}>×</button>
                          </div>
                        ))}
                      </div>
                      <div className={styles.previewRow}>
                        { (d.fileType||'') === 'image' ? (
                          previews.diplomas?.[idx] ? (
                            <img className={styles.thumb} src={previews.diplomas[idx]} alt="Diploma" />
                          ) : (isImageUrl(d.fileUrl) && <img className={styles.thumb} src={d.fileUrl} alt="Diploma" />)
                        ) : ( (d.fileType||'') === 'pdf' ? (
                          <div className={styles.docThumb}>📄 PDF</div>
                        ) : null) }
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div className={styles.actionsRow}>
                <button type="button" className={`btn ${styles.addBtn}`} onClick={()=>addArrayItem('diplomas', { school:'', degree:'', year:'', link:'', fileUrl:'', fileType:'', fileName:'' })}>+ Adicionar diploma</button>
              </div>
            </div>

            {/* Links */}
            <div className={styles.formCard}>
              <div className={styles.sectionHeader}><h2>Links</h2></div>
              {(data.links||[]).map((l, idx) => (
                <div key={idx} className={styles.groupCard}>
                  <div className={styles.groupHeader}><strong>Link #{idx+1}</strong><button type="button" className={styles.linkBtn} onClick={()=>removeArrayItem('links', idx)}>Remover</button></div>
                  <div className={styles.grid2}>
<div className={styles.field}><label>Rótulo</label><input spellCheck={false} autoComplete="off" autoCorrect="off" autoCapitalize="sentences" value={l.label||''} onChange={(e)=>updateArrayItem('links', idx, { label: e.target.value })}/></div>
                    <div className={styles.field}>
                      <label>URL</label>
                      <div className={styles.urlWrap}>
                        <svg className={styles.urlIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 0 20M12 2a15.3 15.3 0 0 0 0 20"/></svg>
<input spellCheck={false} autoComplete="off" autoCorrect="off" autoCapitalize="off" value={l.url||''} onChange={(e)=>updateArrayItem('links', idx, { url: e.target.value })} placeholder="https://..."/>
                      </div>
                      <div className={styles.previewRow}>
                        {isImageUrl(l.url) && <img className={styles.thumb} src={l.url} alt="Preview" />}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div className={styles.actionsRow}>
                <button type="button" className={`btn ${styles.addBtn}`} onClick={()=>addArrayItem('links', { label:'', url:'' })}>+ Adicionar link</button>
              </div>
            </div>

            {/* Mídias */}
            <div className={styles.formCard}>
              <div className={styles.sectionHeader}><h2>Galeria</h2></div>
              {(data.media||[]).map((m, idx) => (
                <div key={idx} className={styles.groupCard}>
                  <div className={styles.groupHeader}><strong>Item #{idx+1}</strong><button type="button" className={styles.linkBtn} onClick={()=>removeArrayItem('media', idx)}>Remover</button></div>
                  <div className={styles.grid3}>
                    <div className={styles.field}><label>Tipo</label>
                      <select value={m.type||'image'} onChange={(e)=>updateArrayItem('media', idx, { type: e.target.value })}>
                        <option value="image">Imagem</option>
                        <option value="video">Vídeo</option>
                      </select>
                    </div>
                    <div className={styles.field} style={{gridColumn:'span 2'}}>
                      <label>URL</label>
                      <div className={styles.urlWrap}>
                        <svg className={styles.urlIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 0 20M12 2a15.3 15.3 0 0 0 0 20"/></svg>
<input spellCheck={false} autoComplete="off" autoCorrect="off" autoCapitalize="off" disabled={(m.type||'image')==='image' && (previews.stacks?.media?.[idx]||[]).length>0} value={m.url||''} onChange={(e)=>updateArrayItem('media', idx, { url: e.target.value })} placeholder="https://..."/>
                      </div>
                      <div className={styles.orDivider}><span>OU</span></div>
                      { (m.type||'image') === 'image' ? (
                        <FileInput disabled={Boolean(m.url && !/^blob:/.test(m.url))} accept="image/*" label="Selecionar imagem" hint="Imagem até 3MB" onChange={(file)=>handleMediaFile(idx, file, 'image')} />
                      ) : (
                        <FileInput accept="video/*" label="Selecionar vídeo" hint="Vídeo até 20MB" onChange={(file)=>handleMediaFile(idx, file, 'video')} />
                      ) }
                      {(m.type||'image') === 'image' && (
                        <div className={[styles.fileStack, (previews.stacks?.media?.[idx]||[]).length>3 ? styles.stacked : ''].join(' ')}>
                          {(previews.stacks?.media?.[idx]||[]).map((it, si) => (
                            <div key={si} className={[styles.stackItem, (previews.media?.[idx]||'')===it.url ? styles.selected : ''].join(' ')} onClick={()=>{ setPreviews(p=>({...p, media:{...(p.media||{}), [idx]: it.url}})); updateArrayItem('media', idx, { url: it.url }); }}>
                              <img src={it.url} alt="" />
                              <button type="button" className={styles.closeSm} onClick={(e)=>{ e.stopPropagation(); setPreviews(p=>{ const list=[...((p.stacks?.media?.[idx])||[])]; const [removed]=list.splice(si,1); revoke(removed?.url); const nextSel = (p.media?.[idx]||'')===removed?.url ? (list[list.length-1]?.url||'') : (p.media?.[idx]||''); const nextStacks = { ...(p.stacks||{}), media:{ ...(p.stacks?.media||{}), [idx]: list } }; const nextMedia = { ...(p.media||{}), [idx]: nextSel }; updateArrayItem('media', idx, { url: nextSel }); return { ...p, stacks: nextStacks, media: nextMedia }; }); }}>×</button>
                            </div>
                          ))}
                        </div>
                      )}
                      <div className={styles.previewRow}>
                        { (m.type||'image') === 'image' ? (
                          previews.media?.[idx] ? (
                            <img className={styles.thumb} src={previews.media[idx]} alt="Preview" />
                          ) : (isImageUrl(m.url) && <img className={styles.thumb} src={m.url} alt="Preview" />)
                        ) : (
                          previews.media?.[idx] ? (
                            <video className={styles.videoThumb} src={previews.media[idx]} controls />
                          ) : (m.url ? <video className={styles.videoThumb} src={m.url} controls /> : null)
                        ) }
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div className={styles.actionsRow}>
                <button type="button" className={`btn ${styles.addBtn}`} onClick={()=>addArrayItem('media', { type:'image', url:'' })}>+ Adicionar mídia</button>
              </div>
            </div>

            {/* Tema */}
            <div className={styles.formCard}>
              <div className={styles.sectionHeader}><h2>Tema (cores por quadradinhos)</h2></div>
              <div className={styles.grid2}>
                <div className={styles.field}>
                  <ColorSwatches label="Primária" value={data.theme.primary} onChange={(c)=>setField(['theme','primary'], c)} />
                </div>
                <div className={styles.field}>
                  <ColorSwatches label="Secundária" value={data.theme.secondary} onChange={(c)=>setField(['theme','secondary'], c)} />
                </div>
                <div className={styles.field}>
                  <ColorSwatches label="Fundo" value={data.theme.background} onChange={(c)=>setField(['theme','background'], c)} />
                </div>
                <div className={styles.field}>
                  <ColorSwatches label="Texto" value={data.theme.text} onChange={(c)=>setField(['theme','text'], c)} />
                </div>
              </div>
              <div className={styles.quickPalettesWrap}>
                <div className={styles.quickTitle}>Paletas rápidas</div>
                <div className={styles.quickGrid}>
                  {(() => {
                    const mode = document.documentElement.getAttribute('data-theme') || (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
                    const quick = mode === 'light' ? [
                      { name:'Aurora', primary:'#52097b', secondary:'#7a6f89', background:'#f6f2f8', text:'#0d0113' },
                      { name:'Sky', primary:'#0066ff', secondary:'#667085', background:'#f9fbff', text:'#101828' },
                      { name:'Forest', primary:'#0e8f6e', secondary:'#6b7280', background:'#f7faf7', text:'#0b1220' },
                      { name:'Sunset', primary:'#b54708', secondary:'#7a6f89', background:'#fff7ed', text:'#1f2937' },
                    ] : [
                      { name:'Neon', primary:'#1e90ff', secondary:'#b0b8c1', background:'#0a0a0a', text:'#ffffff' },
                      { name:'Indigo', primary:'#7b68ee', secondary:'#b0b8c1', background:'#0b0b0b', text:'#f5f5f5' },
                      { name:'Teal Dark', primary:'#14b8a6', secondary:'#9ca3af', background:'#0a0f0f', text:'#e5e7eb' },
                      { name:'Crimson', primary:'#e11d48', secondary:'#cbd5e1', background:'#0a0a0a', text:'#fafafa' },
                    ];
                    return quick.map((p, i) => (
                      <button key={p.name+i} type="button" className={styles.paletteCard} onClick={() => setData(d => ({
                        ...d,
                        theme: { primary:p.primary, secondary:p.secondary, background:p.background, text:p.text }
                      }))}>
                        <span className={styles.paletteName}>{p.name}</span>
                        <span className={styles.paletteDots}>
                          <i style={{'--dot': p.primary}} />
                          <i style={{'--dot': p.secondary}} />
                          <i style={{'--dot': p.background}} />
                          <i style={{'--dot': p.text}} />
                        </span>
                      </button>
                    ));
                  })()}
                </div>
              </div>
            </div>

            {/* Ações */}
            <div className={styles.actionsSticky}>
              <button type="button" className={`btn ${styles.saveBtn}`} onClick={onSaveDraft}>Guardar rascunho</button>
              <button type="button" className={`btn ${styles.publishBtn}`} onClick={onPublish}>Publicar (ver não editável)</button>
            </div>
          </section>

          {/* Preview */}
          <aside className={styles.previewColumn}>
            <div className={styles.previewHeader}>Pré-visualização — Classic Portfolio</div>
            <div className={styles.previewBox} style={cssPreviewVars}>
              <ClassicPortfolio data={data} />
            </div>
          </aside>
        </div>
        </>
      )}
    </Layout>
  );
}
