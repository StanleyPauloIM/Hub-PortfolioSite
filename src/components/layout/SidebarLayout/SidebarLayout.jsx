import React, { createContext, useContext, useState, useMemo } from 'react';
import layoutStyles from '../../../pages/ChooseUrCharacter/ChooseUrCharacter.module.css';
import SideNav from '../SideNav/SideNav';
import { useAuth } from '../../../auth/AuthProvider';
import stylesBanner from './VerifyBanner.module.css';

const SidebarLayoutContext = createContext({
  collapsed: true,
  setCollapsed: () => {},
  mobileOpen: false,
  setMobileOpen: () => {},
  styles: {},
});

export function useSidebarLayout() {
  return useContext(SidebarLayoutContext);
}

/**
 * Universal page layout with the HUB side navigation.
 * - Sidebar is collapsed by default
 * - Reuses the existing ChooseUrCharacter.module.css layout grid and tokens
 *
 * Usage:
 *   <SidebarLayout>
 *     {({ styles, setMobileOpen }) => (
 *       <>
 *         <div className={styles.topBar}>
 *           <button className={styles.mobileMenuBtn} onClick={() => setMobileOpen(true)} aria-label="Abrir menu">
 *             <span className={styles.hamburger} />
 *           </button>
 *           ... resto do top bar ...
 *         </div>
 *         <main className={styles.content}>Conteúdo</main>
 *       </>
 *     )
 *   </SidebarLayout>
 */
export default function SidebarLayout({ initialCollapsed = true, children }) {
  // Read auth to show email verification banner
  const { user, resendVerification } = useAuth();
  const needsVerification = !!user && !user.emailVerified && user.providerData?.some(p => (p.providerId||'').includes('password'));
  const onResend = async () => { try { const r = await resendVerification(); if (!r.ok) alert(r.error||'Falha ao enviar email.'); else alert('Email de verificação enviado.'); } catch {} };
  const [collapsed, setCollapsed] = useState(initialCollapsed);
  const [mobileOpen, setMobileOpen] = useState(false);

  const ctx = useMemo(() => ({ collapsed, setCollapsed, mobileOpen, setMobileOpen, styles: layoutStyles }), [collapsed, mobileOpen]);

  return (
    <SidebarLayoutContext.Provider value={ctx}>
      <div className={[layoutStyles.layoutWrapper, collapsed ? layoutStyles.layoutCollapsed : ''].join(' ')}>
        <SideNav collapsed={collapsed} setCollapsed={setCollapsed} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
        <main className={layoutStyles.content} style={{minWidth:'0', position:'relative'}}>
          {needsVerification && (
            <div className={stylesBanner.banner} role="status" aria-live="polite">
              <span>Seu e‑mail ainda não está verificado.</span>
              <button type="button" className={stylesBanner.link} onClick={onResend}>Reenviar verificação</button>
            </div>
          )}

          {/* Notificações (top 5) */}
          <NotificationsDropdown />

          {typeof children === 'function' ? children(ctx) : children}
        </main>
        {mobileOpen && <div className={layoutStyles.backdrop} onClick={() => setMobileOpen(false)} />}
      </div>
    </SidebarLayoutContext.Provider>
  );
}

