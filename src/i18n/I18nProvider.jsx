import React, { createContext, useContext, useMemo, useState, useEffect } from 'react';

const dict = {
  pt: {
    nav: { pages: 'Páginas', help: 'Ajuda', settings: 'Definições', notifications: 'Notificações' },
    settings: {
      title: 'Definições',
      language: 'Idioma',
      theme: 'Tema',
      dark: 'Escuro',
      light: 'Claro',
      account: 'Conta',
      deleteTitle: 'Apagar conta',
      deleteDesc: 'Esta ação é permanente e não pode ser desfeita.',
      confirmPlaceholder: 'Escreva "cErTeZa" para confirmar',
      delete: 'Apagar conta',
      cancel: 'Cancelar',
      confirm: 'Confirmar',
      reauth: 'Sessão muito antiga. Faça login novamente para apagar a conta.',
      deleted: 'Conta apagada com sucesso.'
    }
  },
  en: {
    nav: { pages: 'Pages', help: 'Help', settings: 'Settings', notifications: 'Notifications' },
    settings: {
      title: 'Settings',
      language: 'Language',
      theme: 'Theme',
      dark: 'Dark',
      light: 'Light',
      account: 'Account',
      deleteTitle: 'Delete account',
      deleteDesc: 'This action is permanent and cannot be undone.',
      confirmPlaceholder: 'Type "cErTeZa" to confirm',
      delete: 'Delete account',
      cancel: 'Cancel',
      confirm: 'Confirm',
      reauth: 'Recent sign-in required. Please log in again to delete your account.',
      deleted: 'Account deleted successfully.'
    }
  }
};

const I18nContext = createContext({ t: (k)=>k, locale: 'pt', setLocale: ()=>{} });

export function I18nProvider({ children }) {
  const [locale, setLocale] = useState(() => {
    try { return localStorage.getItem('lang') || (navigator.language.startsWith('pt') ? 'pt' : 'en'); } catch { return 'pt'; }
  });

  useEffect(() => {
    try { localStorage.setItem('lang', locale); document.documentElement.setAttribute('lang', locale); } catch {}
  }, [locale]);

  const t = useMemo(() => {
    const table = dict[locale] || dict.pt;
    const fn = (key, params) => {
      const parts = String(key).split('.');
      let cur = table;
      for (const p of parts) { cur = cur?.[p]; if (cur == null) return key; }
      if (params && typeof cur === 'string') {
        return cur.replace(/\{(\w+)\}/g, (_, k) => params[k] ?? '');
      }
      return cur ?? key;
    };
    return fn;
  }, [locale]);

  const value = useMemo(() => ({ t, locale, setLocale }), [t, locale]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() { return useContext(I18nContext); }

