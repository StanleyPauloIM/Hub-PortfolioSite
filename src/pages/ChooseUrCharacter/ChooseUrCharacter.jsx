// Página para escolher o personagem do utilizador
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './ChooseUrCharacter.module.css';
import accountIcon from '../../assets/images/account_ex.jpg';
import HubGlobe from '../../assets/HubGlobe.png';
import GlowButton from '../../components/ui/GlowButton/GlowButton';

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
  { id: '1', name: 'Ana Silva', title: 'Product Designer', city: 'Lisboa', area: 'design', exp: 'senior', gender: 'female', avatar: accountIcon, tags: ['Figma', 'UX', 'UI'] },
  { id: '2', name: 'João Santos', title: 'Frontend Engineer', city: 'Porto', area: 'frontend', exp: 'mid', gender: 'male', avatar: accountIcon, tags: ['React', 'Vite', 'TypeScript'] },
  { id: '3', name: 'Marta Lima', title: 'Data Analyst', city: 'Luanda', area: 'data', exp: 'junior', gender: 'female', avatar: accountIcon, tags: ['SQL', 'PowerBI', 'Python'] },
];

export default function ChooseUrCharacter() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  // BACKEND: estado dos perfis – substituir por dados de resposta do servidor
  const [profiles, setProfiles] = useState(mockProfiles);

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

  return (
    <div className={[styles.layoutWrapper, collapsed ? styles.layoutCollapsed : ''].join(' ')}>
      {/* Sidebar */}
      <aside className={[styles.sidebar, collapsed ? styles.collapsed : '', mobileOpen ? styles.mobileOpen : ''].join(' ')}>
        <div className={styles.sidebarHeader}>
          <div className={styles.brandRow}>
            <img className={styles.brandLogo} src={HubGlobe} alt="HUB logo" />
            {!collapsed && <div className={styles.brandText}>HUB</div>}
          </div>
          <button className={styles.collapseBtn} onClick={() => setCollapsed(v => !v)} aria-label="Alternar barra">
            <Icon.arrow />
          </button>
          <button className={styles.mobileClose} onClick={() => setMobileOpen(false)} aria-label="Fechar menu">×</button>
        </div>

        <nav>
          <NavSection title="Páginas">
            <PageLink to="/" icon={<Icon.home />} label="Início" exact />
            <PageLink to="/chooseurcharacter" icon={<Icon.search />} label="ChooseUrCharacter" />
            <PageLink to="/generateurportfolio" icon={<Icon.wand />} label="GenerateUrPortfolio" />
            <PageLink to="/theportfolio" icon={<Icon.portfolio />} label="ThePortfolio" />
          </NavSection>

          <NavSection title="Conta">
            <ButtonItem onClick={() => alert('Notificações')} icon={<Icon.bell />} label="Notificações" />
            <ButtonItem onClick={() => alert('Definições')} icon={<Icon.settings />} label="Definições" />
          </NavSection>

          <NavSection title="Ajuda">
            <ButtonItem onClick={() => alert('Ajuda e Suporte')} icon={<Icon.info />} label="Ajuda e Suporte" />
          </NavSection>
        </nav>
      </aside>

      {/* Conteúdo principal */}
      <main className={styles.content}>
        <div className={styles.topBar}>
          <button className={styles.mobileMenuBtn} onClick={() => setMobileOpen(true)} aria-label="Abrir menu">
            <span className={styles.hamburger} />
          </button>
          <div className={styles.pageTitleRow}>
            <h1 className={styles.title}>Choose Your Character</h1>
            <div className={styles.badge}>beta</div>
          </div>
          <div className={styles.topActions}>
            {/* BACKEND: abrir dropdown com notificações reais do utilizador */}
            <div className={styles.bellWrap}>
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
            <button type="button" className={styles.iconBtn} aria-label="Definições"><Icon.settings /></button>
            <div className={styles.avatar}><img src={accountIcon} alt="Perfil" /></div>
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
            const filtered = mockProfiles.filter(p => {
              const matchQ = !q || [p.name, p.title, p.city, p.tags.join(' ')].join(' ').toLowerCase().includes(q);
              const matchArea = area === 'all' || p.area === area;
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
                <GlowButton className={`${styles.searchBtn} ${styles.searchBtnInline}`} type="submit" aria-label="Pesquisar">
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
                    <option value="design">Design</option>
                    <option value="frontend">Frontend</option>
                    <option value="backend">Backend</option>
                    <option value="data">Data</option>
                    <option value="marketing">Marketing</option>
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
                    <option value="junior">Júnior</option>
                    <option value="mid">Pleno</option>
                    <option value="senior">Sénior</option>
                    <option value=">5">5+ anos</option>
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
                  {p.tags.map(tag => (<span key={tag} className={styles.tag}>#{tag}</span>))}
                </div>
                <footer className={styles.cardFooter}>
                  {/* BACKEND: ligar ao portfólio do utilizador */}
                  <a className={`btn ${styles.viewBtn}`} href={`/theportfolio?user=${encodeURIComponent(p.name)}`}>Ver Portfólio</a>
                </footer>
              </article>
            ))}
          </section>
        )}
      </main>

      {/* backdrop para mobile */}
      {mobileOpen && <div className={styles.backdrop} onClick={() => setMobileOpen(false)} />}
    </div>
  );
}
