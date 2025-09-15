import React, { createContext, useContext, useMemo, useState, useEffect } from 'react';

const dict = {
  pt: {
    nav: {
      pages: 'Páginas',
      help: 'Ajuda',
      settings: 'Definições',
      notifications: 'Notificações',
      about: 'Sobre‑nós',
      join: 'Juntar‑se',
      home: 'Início',
      aboutWho: 'Quem somos',
      aboutMission: 'Missão',
      aboutContact: 'Contato',
    },
    common: {
      back: 'Voltar',
      close: 'Fechar',
      share: 'Partilhar',
      copyLink: 'Copiar link',
      instagram: 'Instagram',
      comments: 'Comentários',
      preview: 'Preview',
      readOnly: 'somente leitura',
      like: 'Gostei',
    },
    landing: {
      hero: {
        badge: 'Novo • Construtor de Portfólios',
        title1: 'Constrói o teu',
        title2: 'portfólio com estilo',
        subtitle: 'O espaço perfeito para mostrares o teu trabalho. Cria, personaliza e partilha o teu portfólio profissional com ferramentas avançadas e design moderno.',
        chip1: 'Templates modernos', chip2: 'Edição em tempo real', chip3: 'Partilha instantânea',
        ctaPrimary: 'Começar Agora', ctaSecondary: 'Ver Exemplos',
        trustText: 'Usado por criativos e estudantes',
      },
      features: {
        title: 'A PLACE FOR',
        col1: 'Beleza', col2: 'Conexão', col3: 'Universo',
        step1Title: 'Escolhe o teu personagem', step1Text: 'Define a tua identidade visual inicial para personalizar a experiência.', step1Cta: 'Começar',
        step2Title: 'Gera o teu portfólio', step2Text: 'Escolhe estilos, adiciona conteúdo e vê a pré‑visualização em tempo real.', step2Cta: 'Gerar',
        step3Title: 'Partilha com o mundo', step3Text: 'Publica e envia o link para clientes, empresas e amigos — simples e rápido.', step3Cta: 'Ver exemplo',
        developedBy: 'Desenvolvido por',
      },
    },
    footer: {
      about: 'Sobre', menu: 'Menu', services: 'Serviços', contact: 'Contato',
      home: 'Home', signIn: 'Entrar', aboutId: 'Sobre', contactId: 'Contato',
      subscribeTitle: 'Subscreve-te às novidades', subscribeDesc: 'Recebe por email as principais atualizações do HUB — novos recursos, melhorias e conteúdos úteis. Sem spam. Podes cancelar quando quiseres.', subscribeButton: 'Subscrever', subscribeHint: 'Ao subscrever, concordas em receber emails ocasionais sobre novidades do site.',
      thanks: 'Obrigado por visitar o Hub – The Portfolio Website!', privacy: 'Política de Privacidade', history: 'Nossa História', whatWeDo: 'O que fazemos', call: 'Chamada :', email: 'Email:', visits: 'Visitas:',
    },
    auth: {
      signinTitle: 'Bem‑vindo de volta!', signinSubtitle: 'Sentimos sua falta. Entre com seus dados.',
      email: 'Email', password: 'Password', remember: 'Lembrar‑me', forgot: 'Esqueceu a password?',
      enter: 'Entrar', or: 'ou', google: 'Continuar com Google',
      signupPrompt: 'Não tem uma conta?', signupBtn: 'Criar conta',
      signupTitle: 'Criar Conta', signupSubtitle: 'Leva menos de um minuto.', firstName: 'Primeiro Nome', lastName: 'Último Nome',
    },
    choose: { title: 'Escolha o seu personagem' },
    generate: { title: 'Gerar o seu Portfólio', tip: 'Dica', tipMeta: 'podes alterar as cores no painel de Tema' },
    portfolio: { title: 'O Portfólio', readOnly: 'somente leitura' },
    terms: { title: 'Termos e Condições', p1: 'Este é um documento fictício de Termos e Condições apenas para efeitos de navegação e layout.', li1: 'Uso apenas pessoal e não transferível.', li2: 'Respeite as políticas de privacidade e boa conduta.', li3: 'Ao criar uma conta, aceita estes termos.', updated: 'Última atualização: hoje.' },
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
    nav: {
      pages: 'Pages', help: 'Help', settings: 'Settings', notifications: 'Notifications', about: 'About', join: 'Join', home: 'Home', aboutWho: 'Who we are', aboutMission: 'Mission', aboutContact: 'Contact',
    },
    common: {
      back: 'Back', close: 'Close', share: 'Share', copyLink: 'Copy link', instagram: 'Instagram', comments: 'Comments', preview: 'Preview', readOnly: 'read‑only', like: 'Like',
    },
    landing: {
      hero: { badge: 'New • Portfolio Builder', title1: 'Build your', title2: 'portfolio in style', subtitle: 'The perfect space to showcase your work. Create, customize, and share your professional portfolio with modern design and advanced tools.', chip1: 'Modern templates', chip2: 'Realtime editing', chip3: 'Instant sharing', ctaPrimary: 'Get Started', ctaSecondary: 'See Examples', trustText: 'Used by creatives and students' },
      features: { title: 'A PLACE FOR', col1: 'Beauty', col2: 'Connect', col3: 'Universe', step1Title: 'Choose your character', step1Text: 'Set your initial visual identity to customize the experience.', step1Cta: 'Start', step2Title: 'Generate your portfolio', step2Text: 'Pick styles, add content and see live preview.', step2Cta: 'Generate', step3Title: 'Share with the world', step3Text: 'Publish and send the link to clients, companies and friends — simple and fast.', step3Cta: 'See example', developedBy: 'Developed by' },
    },
    footer: { about: 'About', menu: 'Menu', services: 'Services', contact: 'Contact', home: 'Home', signIn: 'Sign in', aboutId: 'About', contactId: 'Contact', subscribeTitle: 'Subscribe to updates', subscribeDesc: 'Get occasional emails about new features, improvements and helpful content. No spam. You can unsubscribe anytime.', subscribeButton: 'Subscribe', subscribeHint: 'By subscribing you agree to receive occasional emails about site news.', thanks: 'Thanks for visiting Hub – The Portfolio Website!', privacy: 'Privacy Policy', history: 'Our History', whatWeDo: 'What We Do', call: 'Call :', email: 'Email:', visits: 'Visits:' },
    auth: { signinTitle: 'Welcome back!', signinSubtitle: 'We missed you. Sign in with your details.', email: 'Email', password: 'Password', remember: 'Remember me', forgot: 'Forgot password?', enter: 'Sign in', or: 'or', google: 'Continue with Google', signupPrompt: "Don't have an account?", signupBtn: 'Sign up', signupTitle: 'Create Account', signupSubtitle: 'Takes less than a minute.', firstName: 'First Name', lastName: 'Last Name' },
    choose: { title: 'Choose Your Character' },
    generate: { title: 'Generate Your Portfolio', tip: 'Tip', tipMeta: 'you can change colors in the Theme panel' },
    portfolio: { title: 'The Portfolio', readOnly: 'read‑only' },
    terms: { title: 'Terms and Conditions', p1: 'This is a placeholder Terms & Conditions document for layout demonstration only.', li1: 'Personal, non-transferable use only.', li2: 'Respect privacy policies and good conduct.', li3: 'By creating an account, you agree to these terms.', updated: 'Last update: today.' },
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

