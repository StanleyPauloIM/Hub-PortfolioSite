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
import { useAuth } from '../../auth/AuthProvider';
import { useI18n } from '../../i18n/I18nProvider';
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
import DEGREE_OPTIONS from '../../data/degrees';
import { LANGUAGES, FLUENCY_OPTIONS } from '../../data/languages';
import { CALLING_CODES } from '../../data/callingCodes';
import { db, storage } from '../../firebase/firebase';
import { addDoc, setDoc, doc, collection, serverTimestamp, getDocs, getDoc, query, where } from 'firebase/firestore';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';

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
  text: (props) => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M3 6h18"/><path d="M12 6v10"/><path d="M5 20h14"/>
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
    gender: '',
    experience: '',
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
  languages: [
    // { language:'Português', fluency:'Nativo / Bilingue' }
  ],
};

const STORAGE_DRAFT = 'hub_portfolio_draft';
const STORAGE_PUBLISHED = 'hub_portfolio_published';

function slugify(input) {
  const base = String(input || '')
    .normalize('NFKD')
    .replace(/\p{Diacritic}+/gu, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')
    .slice(0, 60);
  const suffix = Math.random().toString(36).slice(2, 7);
  return base ? `${base}-${suffix}` : `portfolio-${suffix}`;
}

async function ensureUniqueSlug(baseSlug) {
  let candidate = baseSlug;
  for (let i = 0; i < 3; i++) {
    const snap = await getDocs(query(collection(db, 'portfolios'), where('slug', '==', candidate)));
    if (snap.empty) return candidate;
    candidate = `${baseSlug}-${Math.random().toString(36).slice(2,5)}`;
  }
  return `${baseSlug}-${Date.now().toString(36)}`;
}

export default function GenerateUrPortfolio() {
  const { user } = useAuth();
  const { t } = useI18n();
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
    const timeoutId = setTimeout(() => {
      try {
        const serialized = JSON.stringify(data, (k, v) => (typeof v === 'string' && /^blob:/.test(v) ? '' : v));
        localStorage.setItem(STORAGE_DRAFT, serialized);
      } catch {}
    }, 250);
    return () => clearTimeout(timeoutId);
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

      const GENDER_OPTIONS = [t('common.gender.male'), t('common.gender.female'), t('common.gender.other')];
  // import experiência do ChooseUrCharacter
  // Nota: import evitado para não criar dependência circular de páginas; replicamos localmente via export nomeado
  // Em produção, moveríamos para src/data/experience.js
  const EXPERIENCE_OPTIONS = [
    { value: 'junior', label: t('common.experience.junior') },
    { value: 'mid', label: t('common.experience.mid') },
    { value: 'senior', label: t('common.experience.senior') },
    { value: '5+', label: t('common.experience.fivePlus') },
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
    if (!file.type.startsWith('image/')) return setMessage(t('generate.msg.imageOnly'));
    if (file.size > 3 * 1024 * 1024) return setMessage(t('generate.msg.imageTooLarge'));
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
    if (!file.type.startsWith('image/')) return setMessage(t('generate.msg.imageOnly'));
    if (file.size > 3 * 1024 * 1024) return setMessage(t('generate.msg.imageTooLarge'));
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
      if (!file.type.startsWith('video/')) return setMessage(t('generate.msg.videoOnly'));
      if (file.size > 20 * 1024 * 1024) return setMessage(t('generate.msg.videoTooLarge'));
    } else {
      if (!file.type.startsWith('image/')) return setMessage(t('generate.msg.imageOnly'));
      if (file.size > 3 * 1024 * 1024) return setMessage(t('generate.msg.imageTooLarge'));
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
    if (!type) return setMessage(t('generate.msg.invalidFile'));
    if (type === 'pdf' && file.size > 10 * 1024 * 1024) return setMessage(t('generate.msg.pdfTooLarge'));
    if (type === 'image' && file.size > 3 * 1024 * 1024) return setMessage(t('generate.msg.imageTooLarge'));
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
      setMessage(t('generate.msg.draftSaved'));
      setTimeout(() => setMessage(''), 1500);
    } catch {}
  };

  function isBlobUrl(url) { return typeof url === 'string' && url.startsWith('blob:'); }
  async function blobFromUrl(url) { const res = await fetch(url); return await res.blob(); }
  function extFromType(type) {
    if (!type) return 'bin';
    if (type.includes('jpeg')) return 'jpg';
    const m = type.split('/')[1] || 'bin';
    return m.split(';')[0];
  }
  async function uploadPublic(uid, path, blob, contentType) {
    const ts = Date.now();
    const folder = `portfolio-assets/${uid}/${path}`;
    const r = storageRef(storage, `${folder}-${ts}`);
    const metadata = { contentType: contentType || blob.type, customMetadata: { public: 'true' } };
    await uploadBytes(r, blob, metadata);
    return await getDownloadURL(r);
  }
  async function normalizeDataForPublish(uid, data) {
    const clone = typeof structuredClone === 'function' ? structuredClone(data) : JSON.parse(JSON.stringify(data));
    // Avatar
    if (isBlobUrl(clone?.profile?.avatarUrl)) {
      const b = await blobFromUrl(clone.profile.avatarUrl);
      clone.profile.avatarUrl = await uploadPublic(uid, 'profile/avatar.' + extFromType(b.type), b, b.type);
    }
    // Projects images/videos
    if (Array.isArray(clone.projects)) {
      for (let i = 0; i < clone.projects.length; i++) {
        const p = clone.projects[i] || {};
        if (isBlobUrl(p.imageUrl)) {
          const b = await blobFromUrl(p.imageUrl);
          p.imageUrl = await uploadPublic(uid, `projects/${i}/image.${extFromType(b.type)}`, b, b.type);
        }
        if (isBlobUrl(p.videoUrl)) {
          const b = await blobFromUrl(p.videoUrl);
          p.videoUrl = await uploadPublic(uid, `projects/${i}/video.${extFromType(b.type)}`, b, b.type);
        }
        clone.projects[i] = p;
      }
    }
    // Media gallery
    if (Array.isArray(clone.media)) {
      for (let i = 0; i < clone.media.length; i++) {
        const m = clone.media[i] || {};
        if (isBlobUrl(m.url)) {
          const b = await blobFromUrl(m.url);
          m.url = await uploadPublic(uid, `media/${i}/file.${extFromType(b.type)}`, b, b.type);
        }
        clone.media[i] = m;
      }
    }
    // Certificates
    if (Array.isArray(clone.certificates)) {
      for (let i = 0; i < clone.certificates.length; i++) {
        const c = clone.certificates[i] || {};
        if (isBlobUrl(c.fileUrl)) {
          const b = await blobFromUrl(c.fileUrl);
          c.fileUrl = await uploadPublic(uid, `certificates/${i}/file.${extFromType(b.type)}`, b, b.type);
          c.fileType = b.type.includes('pdf') ? 'pdf' : 'image';
        }
        clone.certificates[i] = c;
      }
    }
    // Diplomas
    if (Array.isArray(clone.diplomas)) {
      for (let i = 0; i < clone.diplomas.length; i++) {
        const d = clone.diplomas[i] || {};
        if (isBlobUrl(d.fileUrl)) {
          const b = await blobFromUrl(d.fileUrl);
          d.fileUrl = await uploadPublic(uid, `diplomas/${i}/file.${extFromType(b.type)}`, b, b.type);
          d.fileType = b.type.includes('pdf') ? 'pdf' : 'image';
        }
        clone.diplomas[i] = d;
      }
    }
    return clone;
  }

  async function onPublish() {
    try {
      // 1) Salva local (mantém comportamento atual)
      const serialized = JSON.stringify(data);
      localStorage.setItem(STORAGE_PUBLISHED, serialized);
      try { window.dispatchEvent(new StorageEvent('storage', { key: STORAGE_PUBLISHED, newValue: serialized })); } catch {}

      // 2) Salva/Atualiza snapshot público único por usuário (docId = uid)
      if (!user?.uid) throw new Error('Sessão expirada. Faça login novamente.');
      const existingRef = doc(db, 'portfolios', user.uid);
      const existing = await getDoc(existingRef);

      // Normaliza dados e faz upload de ficheiros blob -> Storage (públicos)
      const normalized = await normalizeDataForPublish(user.uid, data);

      // Gera slug público único
      const baseSlug = slugify(normalized?.profile?.name || user.displayName || 'portfolio');
      const slug = await ensureUniqueSlug(baseSlug);

      const snapshot = {
        ownerId: user.uid,
        slug,
        displayName: normalized?.profile?.name || user.displayName || '',
        title: normalized?.profile?.title || '',
        city: normalized?.profile?.location || 'Remoto',
        area: normalized?.profile?.title || '',
        exp: normalized?.profile?.experience || 'mid',
        gender: normalized?.profile?.gender || 'other',
        avatar: normalized?.profile?.avatarUrl || user?.photoURL || '',
        skills: Array.isArray(normalized?.skills) ? normalized.skills.slice(0, 12) : [],
        likes: Number(data?.stats?.likes) || 0,
        views: Number(data?.stats?.views) || 0,
        visibility: 'public',
        status: 'published',
        publishedAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        createdAt: serverTimestamp(),
        profile: {
          name: normalized?.profile?.name || '',
          title: normalized?.profile?.title || '',
          location: normalized?.profile?.location || '',
          gender: normalized?.profile?.gender || '',
          experience: normalized?.profile?.experience || '',
          avatarUrl: normalized?.profile?.avatarUrl || '',
        },
        template: normalized?.template || 'classic',
        theme: normalized?.theme || {},
        about: normalized?.about || {},
        contact: normalized?.contact || {},
        socials: normalized?.socials || {},
        projects: Array.isArray(normalized?.projects) ? normalized.projects : [],
        media: Array.isArray(normalized?.media) ? normalized.media : [],
        certificates: Array.isArray(normalized?.certificates) ? normalized.certificates : [],
        diplomas: Array.isArray(normalized?.diplomas) ? normalized.diplomas : [],
        links: Array.isArray(normalized?.links) ? normalized.links : [],
        languages: Array.isArray(normalized?.languages) ? normalized.languages : [],
      };
      await setDoc(existingRef, snapshot, { merge: !!existing.exists() });
      try { localStorage.setItem('hub_portfolio_slug', slug); } catch {}

      // 3) Notificação de criação/atualização para o próprio usuário
      try {
        const notif = {
          receiverUid: user.uid,
          actorUid: user.uid,
          type: existing.exists() ? 'portfolio.updated' : 'portfolio.created',
          title: existing.exists() ? 'Portfólio atualizado' : 'Portfólio publicado',
          slug,
          createdAt: serverTimestamp(),
          read: false,
        };
        await addDoc(collection(db, 'users', user.uid, 'notifications'), notif);
      } catch {}
        },
      };
      await addDoc(collection(db, 'portfolios'), snapshot);
      try { localStorage.setItem('hub_portfolio_slug', slug); } catch {}

      setMessage(t('generate.msg.published'));
      setTimeout(() => setMessage(''), 800);
      navigate('/theportfolio');
    } catch (e) {
      console.error(e);
      setMessage('Não foi possível publicar. Tente novamente.');
      setTimeout(() => setMessage(''), 2000);
    }
  }

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
          <button className={layoutStyles.mobileMenuBtn} onClick={() => setMobileOpen(true)} aria-label={t('common.openMenu')}>
            <span className={layoutStyles.hamburger} />
          </button>
          <div className={layoutStyles.pageTitleRow}>
            <button type="button" className={exStyles.backBtn} onClick={() => navigate(-1)} aria-label={t('common.back')}>
              <span className={exStyles.backIcon}><UIIcon.arrowRight/></span>
              {t('common.back')}
            </button>
            <h1 className={layoutStyles.title}>{t('generate.title')}</h1>
            <div className={layoutStyles.badge}>classic</div>
          </div>
          <div className={layoutStyles.topActions}>
            <div className={layoutStyles.bellWrap} ref={notifRef}>
              <button type="button" className={layoutStyles.iconBtn} onClick={() => setNotifOpen(v => !v)} aria-haspopup="menu" aria-expanded={notifOpen} aria-label={t('nav.notifications')}>
                <Icon.bell />
              </button>
              <span className={layoutStyles.bellDot} />
              {notifOpen && (
                <div className={layoutStyles.notifDropdown} role="menu">
                  <div className={layoutStyles.notifItem} role="menuitem">
                    <div className={layoutStyles.notifTitle}>{t('generate.tip')}</div>
                    <div className={layoutStyles.notifMeta}>{t('generate.tipMeta')}</div>
                  </div>
                  <div className={layoutStyles.notifFooter}>{t('common.viewAll')}</div>
                </div>
              )}
            </div>
            <button type="button" className={layoutStyles.iconBtn} onClick={() => navigate('/settings')} aria-label={t('nav.settings')}><Icon.settings /></button>
              <div className={layoutStyles.accountWrap} ref={accountRef}>
                <div className={layoutStyles.avatar} onClick={() => setAccountOpen(v => !v)} role="button" aria-label={t('common.profile')}><img src={user?.photoURL || accountIcon} alt={user?.displayName ? t('common.profileOf',{name:user.displayName}) : t('common.profile')} /></div>
              {accountOpen && (
                <div className={layoutStyles.accountMenu} role="menu">
                  <NavLink to="/theportfolio" className={layoutStyles.accountLink} role="menuitem">
                    <img className={layoutStyles.menuIcon} src="https://img.icons8.com/ios-glyphs/24/user.png" alt="" />
                    {t('common.profile')}
                  </NavLink>
                  <NavLink to="/generateurportfolio" className={layoutStyles.accountLink} role="menuitem">
                    <img className={layoutStyles.menuIcon} src="https://img.icons8.com/ios-glyphs/24/resume.png" alt="" />
                    {t('common.createPortfolio')}
                  </NavLink>
                  <hr className={layoutStyles.accountDivider} />
                  <button className={`btn btn--small btn--full ${layoutStyles.themeBtn}`} onClick={() => setTheme('dark')}>{t('settings.theme')}: {t('settings.dark')}</button>
                  <button className={`btn btn--small btn--full ${layoutStyles.themeBtn}`} onClick={() => setTheme('light')}>{t('settings.theme')}: {t('settings.light')}</button>
                  <hr className={layoutStyles.accountDivider} />
                  <button className={layoutStyles.accountLink} onClick={() => console.log(t('auth.signOut'))} role="menuitem">
                    <img className={layoutStyles.menuIcon} src="https://img.icons8.com/ios-glyphs/24/exit.png" alt="" />
                    {t('auth.signOut')}
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
              <h2>{t('generate.template.title')}</h2>
              <span className={styles.sectionHint}>{t('generate.template.associateHint')}</span>
              <button type="button" className={styles.templatesCta} onClick={() => navigate('/templates')}>
                {t('generate.template.viewGallery')}
              </button>
            </div>
              <div className={styles.row}>
                <label className={styles.radioCard}>
                  <input type="radio" name="template" checked={data.template === 'classic'} onChange={() => setField('template','classic')} />
                  <div className={styles.radioContent}>
                    <div className={styles.radioTitle}>{t('generate.template.classicTitle')}</div>
                    <div className={styles.radioDesc}>{t('generate.template.classicDesc')}</div>
                  </div>
                </label>
                <label className={`${styles.radioCard} ${styles.disabled}`} title={t('generate.template.comingSoon')}>
                  <input type="radio" name="template" disabled />
                  <div className={styles.radioContent}>
                    <div className={styles.radioTitle}>{t('generate.template.minimalistTitle')}</div>
                    <div className={styles.radioDesc}>{t('generate.template.minimalistDesc')}</div>
                  </div>
                </label>
              </div>
            </div>

            {/* Perfil */}
            <div className={styles.formCard}>
              <div className={styles.sectionHeader}><h2>{t('generate.profile.title')}</h2></div>
              <div className={styles.grid2}>
<div className={styles.field}><label>{t('generate.profile.name.label')}</label>
<FieldInput
                  icon={<Icon.user className={styles.inputIcon} />}
                  spellCheck={false} autoComplete="off" autoCorrect="off" autoCapitalize="words"
                  maxLength={80}
                  value={data.profile.name}
                  onChange={(e)=>setField(['profile','name'], e.target.value)}
                  placeholder={t('generate.profile.name.placeholder')}
                />
                </div>
<div className={styles.field}><label>{t('generate.profile.titleField.label')}</label>
                  <Field icon={<Icon.briefcase className={styles.inputIcon} />} dropdown noInnerFrame>
                    <AutocompleteSelect
                    value={data.profile.title}
                    onChange={(val)=>setField(['profile','title'], val)}
                    options={JOB_TITLES}
                    placeholder={t('generate.profile.titleField.placeholder')}
                    allowCustom={true}
                    maxVisible={7}
renderLeadingIcon={() => null}
                    />
                  </Field>
                </div>
                <div className={styles.field}><label>{t('generate.profile.location.label')}</label>
                  <Field icon={<Icon.mapPin className={styles.inputIcon} />} dropdown noInnerField>
                    <AutocompleteSelect
                    value={data.profile.location}
                    onChange={(val)=>setField(['profile','location'], val)}
                    options={COUNTRIES}
                    placeholder={t('generate.profile.location.placeholder')}
                    allowCustom={true}
                    maxVisible={7}
                    renderLeadingIcon={() => null}
                    />
                  </Field>
                </div>
                <div className={styles.field}><label>{t('generate.profile.gender.label')}</label>
                  <Field icon={<Icon.user className={styles.inputIcon} />} dropdown noInnerField>
                    <AutocompleteSelect
                      value={data.profile.gender||''}
                      onChange={(val)=>setField(['profile','gender'], val)}
                      options={GENDER_OPTIONS}
                      placeholder={t('generate.profile.gender.placeholder')}
                      allowCustom={false}
                      maxVisible={7}
                      renderLeadingIcon={() => null}
                    />
                  </Field>
                </div>
                <div className={styles.field}><label>{t('generate.profile.experience.label')}</label>
                  <Field icon={<Icon.briefcase className={styles.inputIcon} />} dropdown noInnerField>
                    <AutocompleteSelect
                      value={data.profile.experience||''}
                      onChange={(val)=>setField(['profile','experience'], val)}
                      options={EXPERIENCE_OPTIONS.map(o=>o.label)}
                      placeholder={t('generate.profile.experience.placeholder')}
                      allowCustom={false}
                      maxVisible={7}
                      renderLeadingIcon={() => null}
                    />
                  </Field>
                </div>
                <div className={styles.field}>
                  <label>{t('generate.profile.avatarUrl.label')}</label>
<FieldInput icon={<Icon.image className={styles.inputIcon} />} spellCheck={false} autoComplete="off" autoCorrect="off" autoCapitalize="off" maxLength={400} disabled={(previews.stacks?.avatar||[]).length>0} value={data.profile.avatarUrl} onChange={(e)=>setField(['profile','avatarUrl'], e.target.value)} placeholder={t('generate.profile.avatarUrl.placeholder')} />
                  <div className={styles.orDivider}><span>{t('common.orUpper')}</span></div>
                  <FileInput disabled={Boolean((data.profile.avatarUrl||'').trim())} accept="image/*" label={t('generate.profile.selectImage')} hint={t('generate.profile.imageLocalHint')} onChange={(file)=>handleAvatarFile(file)} />
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
                      <img className={styles.avatarPreview} src={previews.profileAvatar} alt={t('generate.profile.avatarPreviewAlt')} />
                    ) : (isImageUrl(data.profile.avatarUrl) && <img className={styles.avatarPreview} src={data.profile.avatarUrl} alt={t('generate.profile.avatarPreviewAlt')} />)}
                  </div>
                </div>
              </div>
            </div>

            {/* Sobre */}
            <div className={styles.formCard}>
              <div className={styles.sectionHeader}><h2>{t('generate.about.title')}</h2></div>
<div className={styles.field}><label>{t('generate.about.summaryLabel')}</label><textarea spellCheck={true} className={styles.textarea} rows={4} value={data.about.summary} onChange={(e)=>setField(['about','summary'], e.target.value)} placeholder={t('generate.about.summaryPlaceholder')}/></div>
            </div>

            {/* Contatos e Sociais */}
            <div className={styles.formCard}>
              <div className={styles.sectionHeader}><h2>{t('generate.contact.title')}</h2></div>
              <div className={styles.grid2}>
<div className={styles.field}><label>{t('generate.contact.email')}</label>
<FieldInput icon={<Icon.mail className={styles.inputIcon} />} type="email" spellCheck={false} autoComplete="off" autoCorrect="off" autoCapitalize="off" maxLength={120} value={data.contact.email} onChange={(e)=>setField(['contact','email'], e.target.value)} placeholder="nome@dominio.com" />
                </div>
                <div className={styles.field}>
                  <label>
                    {t('generate.contact.phone')}
                    <select className={styles.codeSelect} value={data.contact.phoneCode || '+258'} onChange={(e)=>setField(['contact','phoneCode'], e.target.value)}>
                      {CALLING_CODES.map(({name, code}) => (
                        <option key={name+code} value={code}>{name} ({code})</option>
                      ))}
                    </select>
                  </label>
<FieldInput icon={<Icon.phone className={styles.inputIcon} />} spellCheck={false} autoComplete="off" autoCorrect="off" autoCapitalize="off" maxLength={32} value={data.contact.phone} onChange={(e)=>setField(['contact','phone'], e.target.value)} placeholder={t('generate.contact.phonePlaceholder')} />
                </div>
                <div className={styles.field}>
                  <label>{t('generate.contact.website')}</label>
<FieldInput icon={<svg className={styles.urlIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 0 20M12 2a15.3 15.3 0 0 0 0 20"/></svg>} spellCheck={false} autoComplete="off" autoCorrect="off" autoCapitalize="off" maxLength={200} value={data.contact.website} onChange={(e)=>setField(['contact','website'], e.target.value)} placeholder="https://..." />
                </div>
<div className={styles.field}><label>{t('generate.contact.github')}</label>
<FieldInput icon={<svg className={styles.urlIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3"/><path d="M15 22v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 18 3.77 5.07 5.07 0 0 0 17.91 1S16.73.65 13 2.48a13.38 13.38 0 0 0-8 0C1.27.65.09 1 .09 1A5.07 5.07 0 0 0 0 3.77 5.44 5.44 0 0 0 1.5 7.9c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 7 18.13V22"/></svg>} spellCheck={false} autoComplete="off" autoCorrect="off" autoCapitalize="off" maxLength={200} value={data.socials.github} onChange={(e)=>setField(['socials','github'], e.target.value)} placeholder="https://github.com/..." />
                </div>
<div className={styles.field}><label>{t('generate.contact.linkedin')}</label>
<FieldInput icon={<svg className={styles.urlIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="9" width="20" height="13" rx="2"/><path d="M7 9V5a5 5 0 0 1 10 0v4"/></svg>} spellCheck={false} autoComplete="off" autoCorrect="off" autoCapitalize="off" maxLength={200} value={data.socials.linkedin} onChange={(e)=>setField(['socials','linkedin'], e.target.value)} placeholder="https://linkedin.com/in/..." />
                </div>
<div className={styles.field}><label>{t('generate.contact.twitter')}</label>
<FieldInput icon={<svg className={styles.urlIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.5c1.6 12-14 12-18 6 2 0 4-1 5-2-2-1-3-4-1-6 2 2 4 3 7 3-1-5 6-7 9-3z"/></svg>} spellCheck={false} autoComplete="off" autoCorrect="off" autoCapitalize="off" maxLength={200} value={data.socials.twitter} onChange={(e)=>setField(['socials','twitter'], e.target.value)} placeholder="https://x.com/..." />
                </div>
<div className={styles.field}><label>{t('generate.contact.instagram')}</label>
<FieldInput icon={<svg className={styles.urlIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.5" y2="6.5"/></svg>} spellCheck={false} autoComplete="off" autoCorrect="off" autoCapitalize="off" maxLength={200} value={data.socials.instagram} onChange={(e)=>setField(['socials','instagram'], e.target.value)} placeholder="https://instagram.com/..." />
                </div>
              </div>
            </div>

            {/* Skills */}
            <div className={styles.formCard}>
              <div className={styles.sectionHeader}><h2>{t('generate.skills.title')}</h2></div>
              <div className={styles.field}> 
                <label>{t('generate.skills.hint')}</label>
                <ChipsInput
                  value={data.skills}
                  onChange={(skills)=> setData(d=>({ ...d, skills }))}
                  placeholder={t('generate.skills.placeholder')}
                  minInputWidth={320}
                  suggestions={[
                    'React','TypeScript','JavaScript','Vite','Next.js','Node.js','Express','HTML','CSS','SASS','Tailwind','Figma','UX','UI','Design Systems','Git','GitHub','CI/CD','Docker','Kubernetes','AWS','GCP','Azure','Firebase','Firestore','Storage','MongoDB','PostgreSQL','MySQL','Python','Django','Flask','TensorFlow','PyTorch','Data Analysis','PowerBI','Tableau','Go','Rust','Java','Spring','Kotlin','Swift','C#','.NET','PHP','Laravel','SEO','Marketing','Scrum','Agile'
                  ]}
                />
                <small className={styles.helper}>{t('generate.skills.helper')}</small>
              </div>
            </div>

            {/* Projetos */}
            <div className={styles.formCard}>
              <div className={styles.sectionHeader}><h2>{t('generate.projects.title')}</h2></div>
              {(data.projects||[]).map((p, idx) => (
                <div key={idx} className={styles.groupCard}>
                  <div className={styles.groupHeader}><strong>{t('generate.projects.itemTitle',{n: idx+1})}</strong><button type="button" className={styles.linkBtn} onClick={()=>removeArrayItem('projects', idx)}>{t('common.remove')}</button></div>
                  <div className={styles.grid2}>
<div className={styles.field}><label>{t('generate.projects.titleLabel')}</label>
<FieldInput icon={<Icon.text className={styles.inputIcon} />} spellCheck={false} autoComplete="off" autoCorrect="off" autoCapitalize="sentences" maxLength={80} value={p.title||''} onChange={(e)=>updateArrayItem('projects', idx, { title: e.target.value })} />
                    </div>
<div className={styles.field}><label>{t('generate.projects.linkLabel')}</label>
<FieldInput icon={<svg className={styles.urlIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 0 20M12 2a15.3 15.3 0 0 0 0 20"/></svg>} spellCheck={false} autoComplete="off" autoCorrect="off" autoCapitalize="off" maxLength={200} value={p.link||''} onChange={(e)=>updateArrayItem('projects', idx, { link: e.target.value })} placeholder="https://..." />
                    </div>
<div className={styles.field}><label>{t('generate.projects.imageUrlLabel')}</label>
<FieldInput icon={<svg className={styles.urlIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>} spellCheck={false} autoComplete="off" autoCorrect="off" autoCapitalize="off" disabled={(previews.stacks?.projects?.[idx]||[]).length>0} value={p.imageUrl||''} onChange={(e)=>updateArrayItem('projects', idx, { imageUrl: e.target.value })} placeholder="https://..." />
                      <div className={styles.orDivider}><span>{t('common.orUpper')}</span></div>
                      <FileInput disabled={Boolean(p.imageUrl && !/^blob:/.test(p.imageUrl))} accept="image/*" label={t('generate.projects.selectImageLabel')} hint={t('generate.projects.imageHint')} onChange={(file)=>handleProjectImageFile(idx, file)} />
                      <div className={[styles.fileStack, (previews.stacks?.projects?.[idx]||[]).length>3 ? styles.stacked : ''].join(' ')}>
                        {(previews.stacks?.projects?.[idx]||[]).map((it, si) => (
                          <div key={si} className={[styles.stackItem, (previews.projects?.[idx]||'')===it.url ? styles.selected : ''].join(' ')} onClick={()=>{ setPreviews(p=>({...p, projects:{...(p.projects||{}), [idx]: it.url}})); updateArrayItem('projects', idx, { imageUrl: it.url }); }}>
                            {it?.url ? <img src={it.url} alt="" /> : null}
                            <button type="button" className={styles.closeSm} onClick={(e)=>{ e.stopPropagation(); setPreviews(p=>{ const list=[...((p.stacks?.projects?.[idx])||[])]; const [removed]=list.splice(si,1); revoke(removed?.url); const nextSel = (p.projects?.[idx]||'')===removed?.url ? (list[list.length-1]?.url||'') : (p.projects?.[idx]||''); const nextStacks = { ...(p.stacks||{}), projects:{ ...(p.stacks?.projects||{}), [idx]: list } }; const nextProj = { ...(p.projects||{}), [idx]: nextSel }; updateArrayItem('projects', idx, { imageUrl: nextSel }); return { ...p, stacks: nextStacks, projects: nextProj }; }); }}>×</button>
                          </div>
                        ))}
                      </div>
                      <div className={styles.previewRow}>
                        {previews.projects?.[idx] ? (
                          <img className={styles.thumb} src={previews.projects[idx]} alt={t('generate.projects.previewAlt')} />
                        ) : (isImageUrl(p.imageUrl) && <img className={styles.thumb} src={p.imageUrl} alt={t('generate.projects.previewAlt')} />)}
                      </div>
                    </div>
<div className={styles.field}><label>{t('generate.projects.videoUrlLabel')}</label>
                      <FieldInput icon={<svg className={styles.urlIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 0 20M12 2a15.3 15.3 0 0 0 0 20"/></svg>} spellCheck={false} autoComplete="off" autoCorrect="off" autoCapitalize="off" value={p.videoUrl||''} onChange={(e)=>updateArrayItem('projects', idx, { videoUrl: e.target.value })} placeholder="https://..." />
                    </div>
<div className={styles.fieldFull}><label>Descrição</label><textarea spellCheck={true} className={styles.textarea} rows={3} value={p.description||''} onChange={(e)=>updateArrayItem('projects', idx, { description: e.target.value })} /></div>
                  </div>
                </div>
              ))}
              <div className={styles.actionsRow}>
                <button type="button" className={`btn ${styles.addBtn}`} onClick={()=>addArrayItem('projects', { title:'', description:'', link:'', imageUrl:'', videoUrl:'' })}>{t('generate.projects.add')}</button>
              </div>
            </div>

            {/* Línguas */}
            <div className={styles.formCard}>
              <div className={styles.sectionHeader}><h2>{t('generate.languages.title')}</h2></div>
              {(data.languages||[]).map((l, idx) => (
                <div key={idx} className={styles.groupCard}>
                  <div className={styles.grid3}>
                    <div className={styles.field}><label>{t('generate.languages.languageLabel')}</label>
                      <Field icon={<Icon.wand className={styles.inputIcon} />} dropdown noInnerFrame>
                        <AutocompleteSelect
                          value={l.language||''}
                          onChange={(val)=>updateArrayItem('languages', idx, { language: val })}
                          options={LANGUAGES}
                          placeholder={t('generate.languages.examplePlaceholder')}
                          allowCustom={true}
                          maxVisible={7}
                          renderLeadingIcon={() => null}
                        />
                      </Field>
                    </div>
                    <div className={styles.field}><label>{t('generate.languages.fluencyLabel')}</label>
                      <Field icon={<Icon.briefcase className={styles.inputIcon} />} dropdown noInnerFrame>
                        <AutocompleteSelect
                          value={l.fluency||''}
                          onChange={(val)=>updateArrayItem('languages', idx, { fluency: val })}
                          options={FLUENCY_OPTIONS}
                          placeholder={t('generate.languages.selectPlaceholder')}
                          allowCustom={true}
                          maxVisible={7}
                          renderLeadingIcon={() => null}
                        />
                      </Field>
                    </div>
                    <div className={styles.field}><label>&nbsp;</label>
                      <button type="button" className={styles.linkBtn} onClick={()=>removeArrayItem('languages', idx)}>{t('common.remove')}</button>
                    </div>
                  </div>
                </div>
              ))}
              <div className={styles.actionsRow}>
                <button type="button" className={`btn ${styles.addBtn}`} onClick={()=>addArrayItem('languages', { language:'', fluency:'' })}>{t('generate.languages.add')}</button>
              </div>
            </div>

            {/* Certificados & Diplomas */}
            <div className={styles.formCard}>
              <div className={styles.sectionHeader}><h2>{t('generate.certificates.title')}</h2></div>
              {(data.certificates||[]).map((c, idx) => (
                <div key={idx} className={styles.groupCard}>
                  <div className={styles.groupHeader}><strong>{t('generate.certificates.itemTitle',{n: idx+1})}</strong><button type="button" className={styles.linkBtn} onClick={()=>removeArrayItem('certificates', idx)}>{t('common.remove')}</button></div>
                  <div className={styles.grid3}>
<div className={styles.field}><label>{t('generate.certificates.nameLabel')}</label>
<FieldInput icon={<Icon.text className={styles.inputIcon} />} spellCheck={false} autoComplete="off" autoCorrect="off" autoCapitalize="words" value={c.name||''} onChange={(e)=>updateArrayItem('certificates', idx, { name: e.target.value })} />
                    </div>
<div className={styles.field}><label>{t('generate.certificates.issuerLabel')}</label>
                      <Field icon={<Icon.briefcase className={styles.inputIcon} />} dropdown noInnerFrame>
                        <AutocompleteSelect
                          value={c.issuer||''}
                          onChange={(val)=>updateArrayItem('certificates', idx, { issuer: val })}
                          options={INSTITUTION_SUGGESTIONS}
                          placeholder={t('generate.certificates.issuerPlaceholder')}
allowCustom={true}
                          maxVisible={7}
                          renderLeadingIcon={() => null}
                        />
                      </Field>
                    </div>
<div className={styles.field}><label>{t('generate.certificates.yearLabel')}</label>
                      <Field icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>} dropdown>
                        <YearSelect embedded value={c.year||''} onChange={(y)=>updateArrayItem('certificates', idx, { year: y })} />
                      </Field>
                    </div>
                    <div className={styles.fieldFull}>
                      <label>{t('generate.certificates.linkLabel')}</label>
                      <FieldInput icon={<svg className={styles.urlIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 0 20M12 2a15.3 15.3 0 0 0 0 20"/></svg>} spellCheck={false} autoComplete="off" autoCorrect="off" autoCapitalize="off" disabled={Boolean(c.fileUrl)} value={c.link||''} onChange={(e)=>updateArrayItem('certificates', idx, { link: e.target.value })} placeholder="https://..." />
                    </div>
                    <div className={styles.orDivider}><span>{t('common.orUpper')}</span></div>
                    <div className={styles.fieldFull}>
                      <label>{t('generate.certificates.fileLabel')}</label>
                      <FileInput disabled={Boolean((c.link||'').trim())} accept="image/*,application/pdf" label={t('generate.certificates.attachFileLabel')} hint={t('generate.certificates.fileHint')} onChange={(file)=>handleCertFile(idx, file)} />
                      <div className={[styles.fileStack, (previews.stacks?.certificates?.[idx]||[]).length>3 ? styles.stacked : ''].join(' ')}>
                        {(previews.stacks?.certificates?.[idx]||[]).map((it, si) => (
                          <div key={si} className={[styles.stackItem, (previews.certificates?.[idx]||'')===it.url ? styles.selected : ''].join(' ')} onClick={()=>{ setPreviews(p=>({...p, certificates:{...(p.certificates||{}), [idx]: it.url}})); updateArrayItem('certificates', idx, { fileUrl: it.url, fileType: it.type, fileName: it.name }); }}>
                            {it.type==='image' ? (it?.url ? <img src={it.url} alt="" /> : null) : (<div className={styles.stackPdf}>PDF</div>)}
                            <button type="button" className={styles.closeSm} onClick={(e)=>{ e.stopPropagation(); setPreviews(p=>{ const list=[...((p.stacks?.certificates?.[idx])||[])]; const [removed]=list.splice(si,1); revoke(removed?.url); const nextSel = (p.certificates?.[idx]||'')===removed?.url ? (list[list.length-1]?.url||'') : (p.certificates?.[idx]||''); const nextStacks = { ...(p.stacks||{}), certificates:{ ...(p.stacks?.certificates||{}), [idx]: list } }; const nextC = { ...(p.certificates||{}), [idx]: nextSel }; const nextItem = list.length? list[list.length-1]: null; updateArrayItem('certificates', idx, { fileUrl: nextSel, fileType: nextItem?.type||'', fileName: nextItem?.name||'' }); return { ...p, stacks: nextStacks, certificates: nextC }; }); }}>×</button>
                          </div>
                        ))}
                      </div>
                      <div className={styles.previewRow}>
                        { (c.fileType||'') === 'image' ? (
                          previews.certificates?.[idx] ? (
                            <img className={styles.thumb} src={previews.certificates[idx]} alt={t('generate.certificates.certAlt')} />
                          ) : (isImageUrl(c.fileUrl) && <img className={styles.thumb} src={c.fileUrl} alt={t('generate.certificates.certAlt')} />)
                        ) : ( (c.fileType||'') === 'pdf' ? (
                          <div className={styles.docThumb}>📄 PDF</div>
                        ) : null) }
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div className={styles.actionsRow}>
                <button type="button" className={`btn ${styles.addBtn}`} onClick={()=>addArrayItem('certificates', { name:'', issuer:'', year:'', link:'', fileUrl:'', fileType:'', fileName:'' })}>{t('generate.certificates.add')}</button>
              </div>
            </div>

            <div className={styles.formCard}>
              <div className={styles.sectionHeader}><h2>{t('generate.diplomas.title')}</h2></div>
              {(data.diplomas||[]).map((d, idx) => (
                <div key={idx} className={styles.groupCard}>
                  <div className={styles.groupHeader}><strong>{t('generate.diplomas.itemTitle',{n: idx+1})}</strong><button type="button" className={styles.linkBtn} onClick={()=>removeArrayItem('diplomas', idx)}>{t('common.remove')}</button></div>
                  <div className={styles.grid3}>
<div className={styles.field}><label>{t('generate.diplomas.schoolLabel')}</label>
                      <Field icon={<Icon.briefcase className={styles.inputIcon} />} dropdown noInnerFrame>
                        <AutocompleteSelect
                          value={d.school||''}
                          onChange={(val)=>updateArrayItem('diplomas', idx, { school: val })}
                          options={INSTITUTION_SUGGESTIONS}
                          placeholder="Ex.: UEM, UCM"
allowCustom={true}
                          maxVisible={7}
                          renderLeadingIcon={() => null}
                        />
                      </Field>
                    </div>
<div className={styles.field}><label>{t('generate.diplomas.degreeLabel')}</label>
                      <Field icon={<Icon.briefcase className={styles.inputIcon} />} dropdown noInnerFrame>
                        <AutocompleteSelect
                          value={d.degree||''}
                          onChange={(val)=>updateArrayItem('diplomas', idx, { degree: val })}
                          options={DEGREE_OPTIONS}
                          placeholder={t('generate.diplomas.degreePlaceholder')}
                          allowCustom={true}
                          maxVisible={7}
                          renderLeadingIcon={() => null}
                        />
                      </Field>
                    </div>
                    <div className={styles.field}><label>{t('generate.diplomas.yearLabel')}</label>
                      <Field icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>} dropdown>
                        <YearSelect embedded value={d.year||''} onChange={(y)=>updateArrayItem('diplomas', idx, { year: y })} />
                      </Field>
                    </div>
<div className={styles.fieldFull}>
                      <label>{t('generate.diplomas.linkLabel')}</label>
                      <FieldInput icon={<svg className={styles.urlIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 0 20M12 2a15.3 15.3 0 0 0 0 20"/></svg>} spellCheck={false} autoComplete="off" autoCorrect="off" autoCapitalize="off" disabled={Boolean(d.fileUrl)} value={d.link||''} onChange={(e)=>updateArrayItem('diplomas', idx, { link: e.target.value })} placeholder="https://..." />
                    </div>
                    <div className={styles.orDivider}><span>{t('common.orUpper')}</span></div>
                    <div className={styles.fieldFull}>
                      <label>{t('generate.diplomas.fileLabel')}</label>
                      <FileInput disabled={Boolean((d.link||'').trim())} accept="image/*,application/pdf" label={t('generate.diplomas.attachFileLabel')} hint={t('generate.diplomas.fileHint')} onChange={(file)=>handleDiplomaFile(idx, file)} />
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
                            <img className={styles.thumb} src={previews.diplomas[idx]} alt={t('generate.diplomas.diplomaAlt')} />
                          ) : (isImageUrl(d.fileUrl) && <img className={styles.thumb} src={d.fileUrl} alt={t('generate.diplomas.diplomaAlt')} />)
                        ) : ( (d.fileType||'') === 'pdf' ? (
                          <div className={styles.docThumb}>📄 PDF</div>
                        ) : null) }
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div className={styles.actionsRow}>
                <button type="button" className={`btn ${styles.addBtn}`} onClick={()=>addArrayItem('diplomas', { school:'', degree:'', year:'', link:'', fileUrl:'', fileType:'', fileName:'' })}>{t('generate.diplomas.add')}</button>
              </div>
            </div>

            {/* Links */}
            <div className={styles.formCard}>
              <div className={styles.sectionHeader}><h2>{t('generate.links.title')}</h2></div>
              {(data.links||[]).map((l, idx) => (
                <div key={idx} className={styles.groupCard}>
                  <div className={styles.groupHeader}><strong>{t('generate.links.itemTitle',{n: idx+1})}</strong><button type="button" className={styles.linkBtn} onClick={()=>removeArrayItem('links', idx)}>{t('common.remove')}</button></div>
                  <div className={styles.grid2}>
<div className={styles.field}><label>{t('generate.links.labelLabel')}</label>
                      <FieldInput icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16v16H4z"/><path d="M8 16c1.333-4 6.667-4 8 0"/><path d="M8 8c1.333-2 6.667-2 8 0"/></svg>} spellCheck={false} autoComplete="off" autoCorrect="off" autoCapitalize="sentences" value={l.label||''} onChange={(e)=>updateArrayItem('links', idx, { label: e.target.value })} />
                    </div>
                    <div className={styles.field}>
                      <label>{t('generate.links.urlLabel')}</label>
<FieldInput icon={<svg className={styles.urlIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 0 20M12 2a15.3 15.3 0 0 0 0 20"/></svg>} spellCheck={false} autoComplete="off" autoCorrect="off" autoCapitalize="off" value={l.url||''} onChange={(e)=>updateArrayItem('links', idx, { url: e.target.value })} placeholder="https://..." />
                      <div className={styles.previewRow}>
                        {isImageUrl(l.url) && <img className={styles.thumb} src={l.url} alt={t('generate.media.previewAlt')} />}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div className={styles.actionsRow}>
                <button type="button" className={`btn ${styles.addBtn}`} onClick={()=>addArrayItem('links', { label:'', url:'' })}>{t('generate.links.add')}</button>
              </div>
            </div>

            {/* Mídias */}
            <div className={styles.formCard}>
              <div className={styles.sectionHeader}><h2>{t('generate.media.title')}</h2></div>
              {(data.media||[]).map((m, idx) => (
                <div key={idx} className={styles.groupCard}>
                  <div className={styles.groupHeader}><strong>{t('generate.media.itemTitle',{n: idx+1})}</strong><button type="button" className={styles.linkBtn} onClick={()=>removeArrayItem('media', idx)}>{t('common.remove')}</button></div>
                  <div className={styles.grid3}>
                    <div className={styles.field}><label>{t('generate.media.typeLabel')}</label>
                      <select value={m.type||'image'} onChange={(e)=>updateArrayItem('media', idx, { type: e.target.value })}>
                        <option value="image">{t('generate.media.typeImage')}</option>
                        <option value="video">{t('generate.media.typeVideo')}</option>
                      </select>
                    </div>
<div className={styles.field} style={{gridColumn:'span 2'}}>
                      <label>{t('generate.media.urlLabel')}</label>
                      <FieldInput icon={<svg className={styles.urlIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 0 20M12 2a15.3 15.3 0 0 0 0 20"/></svg>} spellCheck={false} autoComplete="off" autoCorrect="off" autoCapitalize="off" disabled={(m.type||'image')==='image' && (previews.stacks?.media?.[idx]||[]).length>0} value={m.url||''} onChange={(e)=>updateArrayItem('media', idx, { url: e.target.value })} placeholder="https://..." />
                      <div className={styles.orDivider}><span>{t('common.orUpper')}</span></div>
                      { (m.type||'image') === 'image' ? (
                        <FileInput disabled={Boolean(m.url && !/^blob:/.test(m.url))} accept="image/*" label={t('generate.media.selectImageLabel')} hint={t('generate.media.imageHint')} onChange={(file)=>handleMediaFile(idx, file, 'image')} />
                      ) : (
                        <FileInput accept="video/*" label={t('generate.media.selectVideoLabel')} hint={t('generate.media.videoHint')} onChange={(file)=>handleMediaFile(idx, file, 'video')} />
                      ) }
                      {(m.type||'image') === 'image' && (
                        <div className={[styles.fileStack, (previews.stacks?.media?.[idx]||[]).length>3 ? styles.stacked : ''].join(' ')}>
                          {(previews.stacks?.media?.[idx]||[]).map((it, si) => (
                            <div key={si} className={[styles.stackItem, (previews.media?.[idx]||'')===it.url ? styles.selected : ''].join(' ')} onClick={()=>{ setPreviews(p=>({...p, media:{...(p.media||{}), [idx]: it.url}})); updateArrayItem('media', idx, { url: it.url }); }}>
                              {it?.url ? <img src={it.url} alt="" /> : null}
                              <button type="button" className={styles.closeSm} onClick={(e)=>{ e.stopPropagation(); setPreviews(p=>{ const list=[...((p.stacks?.media?.[idx])||[])]; const [removed]=list.splice(si,1); revoke(removed?.url); const nextSel = (p.media?.[idx]||'')===removed?.url ? (list[list.length-1]?.url||'') : (p.media?.[idx]||''); const nextStacks = { ...(p.stacks||{}), media:{ ...(p.stacks?.media||{}), [idx]: list } }; const nextMedia = { ...(p.media||{}), [idx]: nextSel }; updateArrayItem('media', idx, { url: nextSel }); return { ...p, stacks: nextStacks, media: nextMedia }; }); }}>×</button>
                            </div>
                          ))}
                        </div>
                      )}
                      <div className={styles.previewRow}>
                        { (m.type||'image') === 'image' ? (
                          previews.media?.[idx] ? (
                            <img className={styles.thumb} src={previews.media[idx]} alt={t('generate.media.previewAlt')} />
                          ) : (isImageUrl(m.url) && <img className={styles.thumb} src={m.url} alt={t('generate.media.previewAlt')} />)
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
                <button type="button" className={`btn ${styles.addBtn}`} onClick={()=>addArrayItem('media', { type:'image', url:'' })}>{t('generate.media.add')}</button>
              </div>
            </div>

            {/* Tema */}
            <div className={styles.formCard}>
              <div className={styles.sectionHeader}><h2>{t('generate.theme.title')}</h2></div>
              <div className={styles.grid2}>
                <div className={styles.field}>
                  <ColorSwatches label={t('generate.theme.primary')} value={data.theme.primary} onChange={(c)=>setField(['theme','primary'], c)} />
                </div>
                <div className={styles.field}>
                  <ColorSwatches label={t('generate.theme.secondary')} value={data.theme.secondary} onChange={(c)=>setField(['theme','secondary'], c)} />
                </div>
                <div className={styles.field}>
                  <ColorSwatches label={t('generate.theme.background')} value={data.theme.background} onChange={(c)=>setField(['theme','background'], c)} />
                </div>
                <div className={styles.field}>
                  <ColorSwatches label={t('generate.theme.text')} value={data.theme.text} onChange={(c)=>setField(['theme','text'], c)} />
                </div>
              </div>
                <div className={styles.quickPalettesWrap}>
                <div className={styles.quickTitle}>{t('generate.theme.quickPalettes')}</div>
                <div className={styles.quickGrid}>
                  {(() => {
                    const mode = document.documentElement.getAttribute('data-theme') || (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
                    const quick = mode === 'light' ? [
                      { name:'Azure', primary:'#2563eb', secondary:'#64748b', background:'#f8fafc', text:'#0f172a' },
                      { name:'Nord Light', primary:'#5e81ac', secondary:'#7b8dab', background:'#e6eef7', text:'#0b1f31' },
                      { name:'Blush', primary:'#ec4899', secondary:'#a78bfa', background:'#fff1f5', text:'#1f2937' },
                      { name:'Forest Light', primary:'#10b981', secondary:'#6b7280', background:'#f3faf7', text:'#0b1220' },
                      { name:'Sunset Glow', primary:'#fb7185', secondary:'#f59e0b', background:'#fff7ed', text:'#1f2937' },
                      { name:'Lavender', primary:'#8b5cf6', secondary:'#a78bfa', background:'#f5f3ff', text:'#1f1b2d' },
                      { name:'Citrus', primary:'#eab308', secondary:'#22c55e', background:'#fffbeb', text:'#1f2937' },
                      { name:'Sandstone', primary:'#8b5e34', secondary:'#d4a373', background:'#f5efe6', text:'#1f252e' },
                      { name:'Mint Frost', primary:'#14b8a6', secondary:'#60a5fa', background:'#f0fdfa', text:'#0b1220' },
                      { name:'Solar Light', primary:'#268bd2', secondary:'#2aa198', background:'#fdf6e3', text:'#073642' },
                    ] : [
                      { name:'Midnight', primary:'#4f46e5', secondary:'#94a3b8', background:'#0b1220', text:'#e5e7eb' },
                      { name:'Ocean', primary:'#22d3ee', secondary:'#7dd3fc', background:'#0a1216', text:'#e6faff' },
                      { name:'Emerald', primary:'#10b981', secondary:'#9ca3af', background:'#0a0f0f', text:'#e5f6ef' },
                      { name:'Rose Dark', primary:'#f43f5e', secondary:'#cbd5e1', background:'#0a0a0a', text:'#fafafa' },
                      { name:'Neon Purple', primary:'#a78bfa', secondary:'#22d3ee', background:'#0b0b1a', text:'#eaeaff' },
                      { name:'Dracula', primary:'#ff79c6', secondary:'#50fa7b', background:'#282a36', text:'#f8f8f2' },
                      { name:'Monochrome', primary:'#ffffff', secondary:'#94a3b8', background:'#0a0a0a', text:'#e5e7eb' },
                      { name:'Slate', primary:'#38bdf8', secondary:'#94a3b8', background:'#111827', text:'#e5e7eb' },
                      { name:'Amber Night', primary:'#f59e0b', secondary:'#fcd34d', background:'#0f0a00', text:'#fff7e6' },
                      { name:'Solar Dark', primary:'#268bd2', secondary:'#b58900', background:'#002b36', text:'#eee8d5' },
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
