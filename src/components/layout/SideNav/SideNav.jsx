import React from 'react';
import { NavLink } from 'react-router-dom';
import layoutStyles from '../../../pages/ChooseUrCharacter/ChooseUrCharacter.module.css';
import HubGlobe from '../../../assets/HubGlobe.png';
import { useAuth } from '../../../auth/AuthProvider';

// Inline icons (to avoid cross-deps). Keep consistent with pages.
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
  templates: (props) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="3" y="3" width="7" height="7" rx="1"/>
      <rect x="14" y="3" width="7" height="7" rx="1"/>
      <rect x="3" y="14" width="7" height="7" rx="1"/>
      <rect x="14" y="14" width="7" height="7" rx="1"/>
    </svg>
  ),
};

function NavSection({ title, children }){
  return (
    <div className={layoutStyles.section}>
      <div className={layoutStyles.sectionTitle}>{title}</div>
      <ul className={layoutStyles.sectionList}>{children}</ul>
    </div>
  );
}

function PageLink({ to, icon, label, exact, collapsed }){
  return (
    <li>
      <NavLink to={to} end={exact} className={layoutStyles.itemLink} title={collapsed ? label : undefined}>
        <span className={layoutStyles.itemIcon}>{icon}</span>
        {!collapsed && <span className={layoutStyles.itemLabel}>{label}</span>}
      </NavLink>
    </li>
  );
}

function ButtonItem({ onClick, icon, label, collapsed }){
  return (
    <li>
      <button type="button" onClick={onClick} className={layoutStyles.itemLink} title={collapsed ? label : undefined}>
        <span className={layoutStyles.itemIcon}>{icon}</span>
        {!collapsed && <span className={layoutStyles.itemLabel}>{label}</span>}
      </button>
    </li>
  );
}

export default function SideNav({ collapsed, setCollapsed, mobileOpen, setMobileOpen }){
  const { signOut } = useAuth();
  const pages = [
    { label:'Início', path:'/', icon:<Icon.home />, exact:true },
    { label:'ChooseUrCharacter', path:'/chooseurcharacter', icon:<Icon.search /> },
    { label:'GenerateUrPortfolio', path:'/generateurportfolio', icon:<Icon.wand /> },
    { label:'ThePortfolio', path:'/theportfolio', icon:<Icon.portfolio /> },
    { label:'Templates', path:'/templates', icon:<Icon.templates /> },
  ];

  return (
    <aside className={[layoutStyles.sidebar, layoutStyles.mobilePanel, collapsed ? layoutStyles.collapsed : '', mobileOpen ? layoutStyles.mobileOpen : ''].join(' ')}>
      <div className={layoutStyles.sidebarHeader}>
        <div className={layoutStyles.brandRow}>
          <img className={layoutStyles.brandLogo} src={HubGlobe} alt="HUB logo" />
          {/* Em mobile, mostrar apenas ícone/logo; esconder texto quando mobileOpen */}
          {!collapsed && <div className={layoutStyles.brandText}>HUB</div>}
        </div>
        <button className={layoutStyles.collapseBtn} onClick={() => setCollapsed(v => !v)} aria-label="Alternar barra">
          <Icon.arrow />
        </button>
        <button className={layoutStyles.mobileClose} onClick={() => setMobileOpen(false)} aria-label="Fechar menu">×</button>
      </div>

      <nav>
        <NavSection title="Páginas">
          {pages.map(p => (
            <PageLink key={p.path} to={p.path} icon={p.icon} label={p.label} exact={p.exact} collapsed={collapsed} />
          ))}
        </NavSection>

        <NavSection title="Conta">
          <ButtonItem onClick={() => alert('Notificações')} icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8a6 6 0 10-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>} label="Notificações" collapsed={collapsed} />
          <ButtonItem onClick={() => alert('Definições')} icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 8.6 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 8.6a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 8.6 4.6a1.65 1.65 0 0 0 1-.33V4a2 2 0 1 1 4 0v.09c.36.14.69.34 1 .59.3.25.55.56.74.9.18.34.29.73.33 1.12.04.39 0 .78-.12 1.16"/></svg>} label="Definições" collapsed={collapsed} />
          <ButtonItem onClick={async () => { try { await signOut(); } catch {} window.location.assign('/signin'); }} icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>} label="Sair" collapsed={collapsed} />
        </NavSection>

        <NavSection title="Ajuda">
          <ButtonItem onClick={() => alert('Ajuda e Suporte')} icon={<Icon.info />} label="Ajuda e Suporte" collapsed={collapsed} />
        </NavSection>
      </nav>
    </aside>
  );
}

