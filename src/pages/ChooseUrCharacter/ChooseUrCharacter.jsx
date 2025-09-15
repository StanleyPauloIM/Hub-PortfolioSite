// Página para escolher o personagem do utilizador
import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import styles from './ChooseUrCharacter.module.css';
import useOnClickOutside, { useOnEscape } from '../../hooks/useOnClickOutside';
import accountIcon from '../../assets/images/account_ex.jpg';
import HubGlobe from '../../assets/HubGlobe.png';
import GlowButton from '../../components/ui/GlowButton/GlowButton';
import SidebarLayout from '../../components/layout/SidebarLayout/SidebarLayout';
import { useAuth } from '../../auth/AuthProvider';
import exStyles from '../TemplateExample/TemplateExample.module.css';
import { Icon as UIIcon } from '../../components/ui/Icons/Icons';
import { JOB_TITLES } from '../../data/jobTitles';

// Ícones inline (SVG) – leves e consistentes com o tema
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
  person: (props) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
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
  heart: (props) => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z"/>
    </svg>
  ),
  eye: (props) => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  ),
  sliders: (props) => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/>
      <line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/>
      <line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/>
      <line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/>
      <line x1="17" y1="16" x2="23" y2="16"/>
    </svg>
  ),
  info: (props) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>
    </svg>
  ),
  arrow: (props) => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <polyline points="15 18 9 12 15 6" />
    </svg>
  ),
};

// BACKEND: exemplo de dados de perfis; substituir por dados vindos da API
const mockProfiles = [
  // Exemplo com mais de 3 skills para demonstrar a rotação e o +N
  { id: '1', name: 'Ana Silva', title: 'Product Designer', city: 'Lisboa', area: 'design', exp: 'senior', gender: 'female', avatar: accountIcon, tags: ['SQL', 'Python', 'PowerBI', 'React', 'TensorFlow'], likes: 1540, views: 23890 },
  { id: '2', name: 'João Santos', title: 'Frontend Engineer', city: 'Porto', area: 'frontend', exp: 'mid', gender: 'male', avatar: accountIcon, tags: ['React', 'Vite', 'TypeScript'], likes: 870, views: 125000 },
  { id: '3', name: 'Marta Lima', title: 'Data Analyst', city: 'Luanda', area: 'data', exp: 'junior', gender: 'female', avatar: accountIcon, tags: ['SQL', 'PowerBI', 'Python'], likes: 112, views: 4820 },
];

// Formata contagens para 'K' quando >= 1000 (arredonda para inteiro)
// e garante exibição compacta em uma linha (ex.: 12K)
const formatCount = (n) => {
  const value = Math.max(0, Number(n) || 0);
  if (value < 1000) return String(value);
  const k = Math.round(value / 1000);
  return `${k}\u00A0K`; // NBSP entre número e K evita quebra feia
};

const STORAGE_PUBLISHED = 'hub_portfolio_published';

const readPublishedAsProfile = () => {
  try {
    const raw = localStorage.getItem(STORAGE_PUBLISHED);
    if (!raw) return null;
    const d = JSON.parse(raw);
    const name = d?.profile?.name?.trim();
    if (!name) return null;
    const skills = Array.isArray(d?.skills) ? d.skills : [];
    return {
      id: 'published-local',
      name,
      title: d?.profile?.title || 'Creator',
      city: d?.profile?.location || 'Remoto',
      area: 'portfolio',
      exp: 'mid',
      gender: 'other',
      avatar: d?.profile?.avatarUrl || accountIcon,
      tags: skills.slice(0, 3),
      likes: Number(d?.stats?.likes) || 0,
      views: Number(d?.stats?.views) || 0,
    };
  } catch { return null; }
};

// Rotating tags: show up to 3, and a +N pill if there are more.
// The words rotate every few seconds with a smooth fade.
function useTagRotator(allTags, intervalMs = 2600) {
  const [tick, setTick] = React.useState(0);
  React.useEffect(() => {
    if (!allTags || allTags.length <= 3) return; // no need to rotate
    const id = setInterval(() => setTick(t => t + 1), intervalMs);
    return () => clearInterval(id);
  }, [allTags, intervalMs]);
  const base = Array.isArray(allTags) ? allTags : [];
  if (base.length <= 3) return base;
  const offset = tick % base.length;
  // pick 3 distinct tags sliding through the list
  const chosen = [];
  for (let i = 0; i < 3; i++) {
    chosen.push(base[(offset + i) % base.length]);
  }
  return [...chosen, '__MORE__'];
}

function renderRotatingTags(tags) {
  const t = useTagRotator(tags);
  if (Array.isArray(t)) return t;
  return Array.isArray(tags) ? tags.slice(0, 3) : [];
}

export default function ChooseUrCharacter() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const Layout = SidebarLayout;
  const [notifOpen, setNotifOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);

  const setTheme = (t) => {
    try { document.documentElement.setAttribute('data-theme', t); localStorage.setItem('theme', t); } catch {}
  };
  // BACKEND: estado dos perfis – substituir por dados de resposta do servidor
  const [allProfiles, setAllProfiles] = useState(() => {
    const pub = readPublishedAsProfile();
    return pub ? [...mockProfiles, pub] : [...mockProfiles];
  });

  // Dataset partilhado para experiência
  const EXPERIENCE_OPTIONS = [
    { value: 'junior', label: 'Júnior' },
    { value: 'mid', label: 'Pleno' },
    { value: 'senior', label: 'Sénior' },
    { value: '5+', label: '5+ anos' },
  ];
  const [profiles, setProfiles] = useState(() => allProfiles);

  // Atualiza quando houver publicação/atualização no localStorage
  React.useEffect(() => {
    const refresh = () => {
      const pub = readPublishedAsProfile();
      const base = pub ? [...mockProfiles, pub] : [...mockProfiles];
      setAllProfiles(base);
      setProfiles(base);
    };
    window.addEventListener('storage', refresh);
    refresh();
    return () => window.removeEventListener('storage', refresh);
  }, []);

  const NavSection = ({ title, children }) => (
    <div className={styles.section}>
      <div className={styles.sectionTitle}>{title}</div>
      <ul className={styles.sectionList}>{children}</ul>
    </div>
  );

  const PageLink = ({ to, icon, label, exact }) => (
    <li>
      <NavLink
        to={to}
        end={exact}
        className={({ isActive }) => [styles.itemLink, isActive ? styles.active : ''].join(' ')}
        title={collapsed ? label : undefined}
      >
        <span className={styles.itemIcon}>{icon}</span>
        {!collapsed && <span className={styles.itemLabel}>{label}</span>}
      </NavLink>
    </li>
  );

  const ButtonItem = ({ onClick, icon, label }) => (
    <li>
      <button type="button" onClick={onClick} className={styles.itemLink} title={collapsed ? label : undefined}>
        <span className={styles.itemIcon}>{icon}</span>
        {!collapsed && <span className={styles.itemLabel}>{label}</span>}
      </button>
    </li>
  );

  // Outside click/Escape refs
  const notifRef = React.useRef(null);
  const accountRef = React.useRef(null);
  useOnClickOutside(notifRef, () => setNotifOpen(false), { enabled: notifOpen });
  useOnClickOutside(accountRef, () => setAccountOpen(false), { enabled: accountOpen });
  useOnEscape(() => { setNotifOpen(false); setAccountOpen(false); }, notifOpen || accountOpen);

  return (
    <Layout>
      {({ styles, mobileOpen, setMobileOpen }) => (
        <>
          {/* Conteúdo principal */}
          <main className={styles.content}>
        <div className={styles.topBar}>
          <button className={styles.mobileMenuBtn} onClick={() => setMobileOpen(true)} aria-label="Abrir menu">
            <span className={styles.hamburger} />
          </button>
          <div className={styles.pageTitleRow}>
            <button type="button" className={exStyles.backBtn} onClick={() => navigate(-1)} aria-label="Voltar">
              <span className={exStyles.backIcon}><UIIcon.arrowRight/></span>
              Voltar
            </button>
            <h1 className={styles.title}>Choose Your Character</h1>
            <div className={styles.badge}>beta</div>
          </div>
          <div className={styles.topActions}>
            {/* BACKEND: abrir dropdown com notificações reais do utilizador */}
            <div className={styles.bellWrap} ref={notifRef}>
              <button type="button" className={styles.iconBtn} onClick={() => setNotifOpen(v => !v)} aria-haspopup="menu" aria-expanded={notifOpen} aria-label="Notificações">
                <Icon.bell />
              </button>
              <span className={styles.bellDot} />
              {notifOpen && (
                <div className={styles.notifDropdown} role="menu">
                  {/* BACKEND: mapear lista de notificações; exemplo abaixo */}
                  <div className={styles.notifItem} role="menuitem">
                    <div className={styles.notifTitle}>Novo portfólio publicado</div>
                    <div className={styles.notifMeta}>por @ana.silva • há 2h</div>
                  </div>
                  <div className={styles.notifFooter}>Ver todas</div>
                </div>
              )}
            </div>
            <button type="button" className={styles.iconBtn} onClick={() => setMobileOpen(false) || navigate('/settings')} aria-label="Definições"><Icon.settings /></button>
            <div className={styles.accountWrap} ref={accountRef}>
              <div className={styles.avatar} onClick={() => setAccountOpen(v => !v)} role="button" aria-label="Conta"><img src={user?.photoURL || accountIcon} alt={user?.displayName ? `Perfil de ${user.displayName}` : 'Perfil'} /></div>
              {accountOpen && (
                <div className={styles.accountMenu} role="menu">
                  <NavLink to="/theportfolio" className={styles.accountLink} role="menuitem">
                    <img className={styles.menuIcon} src="https://img.icons8.com/ios-glyphs/24/user.png" alt="" />
                    Perfil
                  </NavLink>
                  <NavLink to="/generateurportfolio" className={styles.accountLink} role="menuitem">
                    <img className={styles.menuIcon} src="https://img.icons8.com/ios-glyphs/24/resume.png" alt="" />
                    Criar Portfólio
                  </NavLink>
                  <hr className={styles.accountDivider} />
                  <button className={`btn btn--small btn--full ${styles.themeBtn}`} onClick={() => setTheme('dark')}>Tema: Escuro</button>
                  <button className={`btn btn--small btn--full ${styles.themeBtn}`} onClick={() => setTheme('light')}>Tema: Claro</button>
                  <hr className={styles.accountDivider} />
                  <button className={styles.accountLink} onClick={async () => { try { await signOut(); } catch {} window.location.assign('/signin'); }} role="menuitem">
                    <img className={styles.menuIcon} src="https://img.icons8.com/ios-glyphs/24/exit.png" alt="" />
                    Sair
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Cartão de introdução + filtros, inspirado no anexo */}
        <section className={styles.introCard}>
          <div className={styles.introText}>
            <h2 className={styles.introTitle}>Bem‑vindo!</h2>
            <p className={styles.introSub}>Encontre pessoas e portfólios publicados. Use a pesquisa e os filtros para refinar os resultados.</p>
          </div>

          {/* Barra de pesquisa + filtros */}
          {/* BACKEND: no submit, chamar a API com os parâmetros; aqui filtramos os mocks */}
          <form className={styles.filtersForm} onSubmit={(e)=>{
            e.preventDefault();
            const form = new FormData(e.currentTarget);
            const q = String(form.get('q') || '').toLowerCase();
            const area = form.get('area');
            const city = form.get('city');
            const exp = form.get('exp');
            const gender = form.get('gender');
            const filtered = allProfiles.filter(p => {
              const matchQ = !q || [p.name, p.title, p.city, p.tags.join(' ')].join(' ').toLowerCase().includes(q);
              // Agora "Área" usa o dataset JOB_TITLES; comparamos com o título do perfil
              const matchArea = area === 'all' || String(p.title||'').toLowerCase() === String(area||'').toLowerCase();
              const matchCity = city === 'all' || p.city.toLowerCase() === String(city).toLowerCase();
              const matchExp = exp === 'all' || p.exp === exp;
              const matchGender = gender === 'all' || p.gender === gender;
              return matchQ && matchArea && matchCity && matchExp && matchGender;
            });
            setProfiles(filtered);
          }}>
            {/* Linha 1: barra de pesquisa */}
            <div className={styles.searchBar}>
              <label className={styles.srOnly} htmlFor="q">Pesquisa</label>
              <div className={styles.searchBox}>
                <Icon.search />
                <input id="q" name="q" className={styles.searchInput} placeholder="Palavra‑chave (ex.: React, UX, Lisboa, @utilizador)" />
                <GlowButton variant="icon" className={`${styles.searchBtn} ${styles.searchBtnInline}`} type="submit" aria-label="Pesquisar">
                  <Icon.search />
                </GlowButton>
              </div>
            </div>

            {/* Linha 2: filtros */}
            <div className={styles.filtersGrid}>
              {/* Área */}
              <div className={styles.field}>
                <label className={styles.fieldLabel} htmlFor="area">Área</label>
                <div className={styles.selectWrap}>
                  <select id="area" name="area" className={styles.select} defaultValue="all">
                    <option value="all">Todas</option>
                    {JOB_TITLES.map((t, i) => (
                      <option key={t + i} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
              </div>
              {/* Cidade */}
              <div className={styles.field}>
                <label className={styles.fieldLabel} htmlFor="city">Cidade</label>
                <div className={styles.selectWrap}>
                  <select id="city" name="city" className={styles.select} defaultValue="all">
                    <option value="all">Todas</option>
                    <option value="lisboa">Lisboa</option>
                    <option value="porto">Porto</option>
                    <option value="maputo">Maputo</option>
                    <option value="luanda">Luanda</option>
                    <option value="remote">Remoto</option>
                  </select>
                </div>
              </div>
              {/* Experiência */}
              <div className={styles.field}>
                <label className={styles.fieldLabel} htmlFor="exp">Experiência</label>
                <div className={styles.selectWrap}>
                  <select id="exp" name="exp" className={styles.select} defaultValue="all">
                    <option value="all">Qualquer</option>
                    {EXPERIENCE_OPTIONS.map(o => (
                      <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                  </select>
                </div>
              </div>
              {/* Género (opcional) */}
              <div className={styles.field}>
                <label className={styles.fieldLabel} htmlFor="gender">Género</label>
                <div className={styles.selectWrap}>
                  <select id="gender" name="gender" className={styles.select} defaultValue="all">
                    <option value="all">Todos</option>
                    <option value="female">Feminino</option>
                    <option value="male">Masculino</option>
                    <option value="other">Outro / Prefiro não dizer</option>
                  </select>
                </div>
              </div>

              {/* Mais filtros (placeholder) */}
              <div className={`${styles.field} ${styles.actionsCol}`}>
                {/* BACKEND: abrir painel lateral com filtros avançados */}
                <button type="button" className={styles.iconSquareBtn} aria-label="Mais filtros" title="Mais filtros">
                  <Icon.sliders />
                </button>
              </div>
            </div>
          </form>
        </section>

        {/* Resultados: cards de perfis */}
        {/* Cabeçalho da lista de resultados */}
        <div className={styles.resultsHeader}>
          <h3 className={styles.resultsTitle}>Found Characters</h3>
          <span className={styles.resultsCount}>{profiles.length}</span>
        </div>

        {profiles.length === 0 ? (
          <section className={styles.resultsEmpty}>
            <Icon.person />
            <p>Sem resultados. Tenta ajustar os filtros.</p>
          </section>
        ) : (
          <section className={styles.resultsGrid}>
            {profiles.map((p) => (
              <article key={p.id} className={styles.card}>
                <header className={styles.cardHeader}>
                  <img className={styles.cardAvatar} src={p.avatar} alt="avatar" />
                  <div className={styles.cardHeadText}>
                    <div className={styles.cardName}>{p.name}</div>
                    <div className={styles.cardMeta}>{p.title} • {p.city}</div>
                  </div>
                </header>
                <div className={styles.cardTags}>
                  {renderRotatingTags(p.tags).map((tag, i) => (
                    tag === '__MORE__'
                      ? <span key={`more-${p.id}`} className={styles.morePill}>+{Math.max(0, (p.tags?.length||0)-3)}</span>
                      : <span key={`${tag}-${i}`} className={`${styles.tag} ${styles.tagAnim}`}>#{tag}</span>
                  ))}
                </div>
                <footer className={styles.cardFooter}>
                  <div className={styles.cardStats}>
                    <span className={styles.stat}><Icon.heart />{formatCount(p.likes)}</span>
                    <span className={styles.stat}><Icon.eye />{formatCount(p.views)}</span>
                  </div>
                  {/* BACKEND: ligar ao portfólio do utilizador */}
                  <a className={`btn ${styles.viewBtn}`} href={`/theportfolio?user=${encodeURIComponent(p.name)}`}>Ver Portfólio</a>
                </footer>
              </article>
            ))}
          </section>
        )}
      </main>

        </>
      )}
    </Layout>
  );
}
