import React, { createContext, useContext, useState, useMemo } from 'react';
import layoutStyles from '../../../pages/ChooseUrCharacter/ChooseUrCharacter.module.css';
import SideNav from '../SideNav/SideNav';

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
 *           {/* ... resto do top bar ... */}
 *         </div>
 *         <main className={styles.content}>Conteúdo</main>
 *       </>
 *     )}
 *   </SidebarLayout>
 */
export default function SidebarLayout({ initialCollapsed = true, children }) {
  const [collapsed, setCollapsed] = useState(initialCollapsed);
  const [mobileOpen, setMobileOpen] = useState(false);

  const ctx = useMemo(() => ({ collapsed, setCollapsed, mobileOpen, setMobileOpen, styles: layoutStyles }), [collapsed, mobileOpen]);

  return (
    <SidebarLayoutContext.Provider value={ctx}>
      <div className={[layoutStyles.layoutWrapper, collapsed ? layoutStyles.layoutCollapsed : ''].join(' ')}>
        <SideNav collapsed={collapsed} setCollapsed={setCollapsed} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
        <main className={layoutStyles.content}>
          {typeof children === 'function' ? children(ctx) : children}
        </main>
      </div>
    </SidebarLayoutContext.Provider>
  );
}

