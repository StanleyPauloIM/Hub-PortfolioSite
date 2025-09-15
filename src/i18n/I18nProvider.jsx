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
      openMenu: 'Abrir menu',
      profile: 'Perfil',
      profileOf: 'Perfil de {name}',
      orUpper: 'OU',
      viewAll: 'Ver todas',
      remove: 'Remover',
      createPortfolio: 'Criar Portfólio',
      gender: { male: 'Masculino', female: 'Feminino', other: 'Outro / Prefiro não dizer' },
      experience: { junior: 'Júnior', mid: 'Pleno', senior: 'Sénior', any: 'Qualquer', fivePlus: '5+ anos' }
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
      signupTitle: 'Criar Conta', signupSubtitle: 'Leva menos de um minuto.', firstName: 'Primeiro Nome', lastName: 'Último Nome', signOut: 'Sair'
    },
    choose: {
      title: 'Escolha o seu personagem',
      introTitle: 'Bem‑vindo!',
      introSub: 'Encontre pessoas e portfólios publicados. Use a pesquisa e os filtros para refinar os resultados.',
      search: { label: 'Pesquisa', placeholder: 'Palavra‑chave (ex.: React, UX, Lisboa, @utilizador)', cta: 'Pesquisar' },
      filters: {
        area: 'Área',
        areaAll: 'Todas',
        city: 'Cidade',
        cityAll: 'Todas',
        cityNames: { lisboa: 'Lisboa', porto: 'Porto', maputo: 'Maputo', luanda: 'Luanda', remote: 'Remoto' },
        exp: 'Experiência',
        expAny: 'Qualquer',
        gender: 'Género',
        genderAll: 'Todos',
        more: 'Mais filtros'
      },
      results: { title: 'Perfis encontrados', empty: 'Sem resultados. Tenta ajustar os filtros.' },
      notif: { sampleTitle: 'Novo portfólio publicado', sampleMeta: 'por {user} • há {time}' },
      card: { viewPortfolio: 'Ver Portfólio' }
    },
    generate: {
      title: 'Gerar o seu Portfólio', tip: 'Dica', tipMeta: 'podes alterar as cores no painel de Tema',
      template: {
        title: 'Template',
        associateHint: 'Associe ao Classic Portfolio',
        viewGallery: 'Ver galeria',
        classicTitle: 'Classic Portfolio',
        classicDesc: 'Layout versátil e elegante',
        minimalistTitle: 'Minimalist (em breve)',
        minimalistDesc: 'Foco total no conteúdo',
        comingSoon: 'Brevemente'
      },
      profile: {
        title: 'Perfil',
        name: { label: 'Nome', placeholder: 'Ex.: Ana Silva' },
        titleField: { label: 'Título', placeholder: 'Ex.: Frontend Engineer' },
        location: { label: 'Localização', placeholder: 'País' },
        gender: { label: 'Gênero', placeholder: 'Selecione' },
        experience: { label: 'Experiência', placeholder: 'Selecione' },
        avatarUrl: { label: 'Avatar URL', placeholder: 'https://...' },
        selectImage: 'Selecionar imagem',
        imageLocalHint: 'Imagem até 3MB. Apenas pré‑visualização local.',
        avatarPreviewAlt: 'Avatar preview'
      },
      about: { title: 'Sobre', summaryLabel: 'Resumo', summaryPlaceholder: 'Breve apresentação' },
      contact: {
        title: 'Contato & Sociais',
        email: 'Email',
        phone: 'Telefone',
        phonePlaceholder: 'Número',
        website: 'Website',
        github: 'GitHub',
        linkedin: 'LinkedIn',
        twitter: 'Twitter/X',
        instagram: 'Instagram'
      },
      skills: {
        title: 'Skills',
        hint: 'Adiciona como no LinkedIn (Enter para confirmar)',
        placeholder: 'Ex.: React, UX, TypeScript',
        helper: 'Evita duplicados; máximo 50 skills.'
      },
      projects: {
        title: 'Projetos',
        itemTitle: 'Projeto #{n}',
        titleLabel: 'Título',
        linkLabel: 'Link',
        imageUrlLabel: 'Imagem URL',
        selectImageLabel: 'Selecionar imagem',
        imageHint: 'Imagem até 3MB',
        videoUrlLabel: 'Vídeo URL',
        descriptionLabel: 'Descrição',
        add: '+ Adicionar projeto',
        previewAlt: 'Preview'
      },
      languages: {
        title: 'Línguas',
        languageLabel: 'Língua',
        fluencyLabel: 'Fluência',
        selectPlaceholder: 'Selecione',
        examplePlaceholder: 'Ex.: Português',
        add: '+ Adicionar língua'
      },
      certificates: {
        title: 'Certificados',
        itemTitle: 'Certificado #{n}',
        nameLabel: 'Nome',
        issuerLabel: 'Entidade',
        issuerPlaceholder: 'Ex.: UEM, Coursera',
        yearLabel: 'Ano',
        linkLabel: 'Link',
        fileLabel: 'Ficheiro (PDF/Imagem)',
        attachFileLabel: 'Anexar ficheiro',
        fileHint: 'PDF até 10MB ou imagem até 3MB',
        add: '+ Adicionar certificado',
        certAlt: 'Certificado'
      },
      diplomas: {
        title: 'Diplomas',
        itemTitle: 'Diploma #{n}',
        schoolLabel: 'Instituição',
        degreeLabel: 'Grau',
        degreePlaceholder: 'Selecione o grau',
        yearLabel: 'Ano',
        linkLabel: 'Link',
        fileLabel: 'Ficheiro (PDF/Imagem)',
        attachFileLabel: 'Anexar ficheiro',
        fileHint: 'PDF até 10MB ou imagem até 3MB',
        add: '+ Adicionar diploma',
        diplomaAlt: 'Diploma'
      },
      links: {
        title: 'Links',
        itemTitle: 'Link #{n}',
        labelLabel: 'Rótulo',
        urlLabel: 'URL',
        add: '+ Adicionar link'
      },
      media: {
        title: 'Galeria',
        itemTitle: 'Item #{n}',
        typeLabel: 'Tipo',
        typeImage: 'Imagem',
        typeVideo: 'Vídeo',
        urlLabel: 'URL',
        selectImageLabel: 'Selecionar imagem',
        imageHint: 'Imagem até 3MB',
        selectVideoLabel: 'Selecionar vídeo',
        videoHint: 'Vídeo até 20MB',
        add: '+ Adicionar mídia',
        previewAlt: 'Preview'
      },
      theme: { title: 'Tema (cores por quadradinhos)', primary: 'Primária', secondary: 'Secundária', background: 'Fundo', text: 'Texto', quickPalettes: 'Paletas rápidas' },
      msg: {
        draftSaved: 'Rascunho guardado.',
        published: 'Publicado!',
        invalidFile: 'Anexa uma imagem ou PDF.',
        imageOnly: 'Escolhe uma imagem.',
        videoOnly: 'Escolhe um vídeo.',
        pdfTooLarge: 'PDF muito grande (máx. 10MB).',
        imageTooLarge: 'Imagem muito grande (máx. 3MB).',
        videoTooLarge: 'Vídeo muito grande (máx. 20MB).'
      }
    },
    portfolio: {
      title: 'O Portfólio', readOnly: 'somente leitura',
      notif: { title: 'Publicação', meta: 'Esta é a versão não editável' },
      empty: 'Nenhum portfólio publicado ainda.',
      createNow: 'Criar agora',
      like: { promptPrefix: 'Gostou do perfil?', promptCta: 'Deixe seu like' },
      stats: { likes: 'Gostos', views: 'Visualizações' },
      share: { whatsapp: 'WhatsApp', facebook: 'Facebook', twitter: 'X (Twitter)', twitterText: 'Meu portfólio no HUB' },
      comments: { placeholder: 'Escreve um comentário…', publish: 'Publicar', guest: 'Convidado' },
      section: {
        about: 'Sobre', skills: 'Skills', projects: 'Projetos', certificates: 'Certificados', diplomas: 'Diplomas',
        languages: 'Línguas', links: 'Links', gallery: 'Galeria', contact: 'Contato'
      },
      cta: { visit: 'Visitar', video: 'Vídeo', view: 'Ver', more: 'Ver mais…', less: 'Ocultar' },
      fallback: { name: 'Seu Nome', role: 'Profissão', project: 'Projeto', certificate: 'Certificado', diploma: 'Diploma' },
      alt: { avatar: 'Avatar', certificate: 'Certificado', diploma: 'Diploma', media: 'Mídia', project: 'Projeto' }
    },
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
      openMenu: 'Open menu',
      profile: 'Profile',
      profileOf: 'Profile of {name}',
      orUpper: 'OR',
      viewAll: 'View all',
      remove: 'Remove',
      createPortfolio: 'Create Portfolio',
      gender: { male: 'Male', female: 'Female', other: 'Prefer not to say' },
      experience: { junior: 'Junior', mid: 'Mid', senior: 'Senior', any: 'Any', fivePlus: '5+ years' }
    },
    landing: {
      hero: { badge: 'New • Portfolio Builder', title1: 'Build your', title2: 'portfolio in style', subtitle: 'The perfect space to showcase your work. Create, customize, and share your professional portfolio with modern design and advanced tools.', chip1: 'Modern templates', chip2: 'Realtime editing', chip3: 'Instant sharing', ctaPrimary: 'Get Started', ctaSecondary: 'See Examples', trustText: 'Used by creatives and students' },
      features: { title: 'A PLACE FOR', col1: 'Beauty', col2: 'Connect', col3: 'Universe', step1Title: 'Choose your character', step1Text: 'Set your initial visual identity to customize the experience.', step1Cta: 'Start', step2Title: 'Generate your portfolio', step2Text: 'Pick styles, add content and see live preview.', step2Cta: 'Generate', step3Title: 'Share with the world', step3Text: 'Publish and send the link to clients, companies and friends — simple and fast.', step3Cta: 'See example', developedBy: 'Developed by' },
    },
    footer: { about: 'About', menu: 'Menu', services: 'Services', contact: 'Contact', home: 'Home', signIn: 'Sign in', aboutId: 'About', contactId: 'Contact', subscribeTitle: 'Subscribe to updates', subscribeDesc: 'Get occasional emails about new features, improvements and helpful content. No spam. You can unsubscribe anytime.', subscribeButton: 'Subscribe', subscribeHint: 'By subscribing you agree to receive occasional emails about site news.', thanks: 'Thanks for visiting Hub – The Portfolio Website!', privacy: 'Privacy Policy', history: 'Our History', whatWeDo: 'What We Do', call: 'Call :', email: 'Email:', visits: 'Visits:' },
    auth: { signinTitle: 'Welcome back!', signinSubtitle: 'We missed you. Sign in with your details.', email: 'Email', password: 'Password', remember: 'Remember me', forgot: 'Forgot password?', enter: 'Sign in', or: 'or', google: 'Continue with Google', signupPrompt: "Don't have an account?", signupBtn: 'Sign up', signupTitle: 'Create Account', signupSubtitle: 'Takes less than a minute.', firstName: 'First Name', lastName: 'Last Name', signOut: 'Sign out' },
    choose: {
      title: 'Choose Your Character',
      introTitle: 'Welcome!',
      introSub: 'Find people and published portfolios. Use search and filters to refine results.',
      search: { label: 'Search', placeholder: 'Keyword (e.g.: React, UX, Lisbon, @user)', cta: 'Search' },
      filters: {
        area: 'Area',
        areaAll: 'All',
        city: 'City',
        cityAll: 'All',
        cityNames: { lisboa: 'Lisbon', porto: 'Porto', maputo: 'Maputo', luanda: 'Luanda', remote: 'Remote' },
        exp: 'Experience',
        expAny: 'Any',
        gender: 'Gender',
        genderAll: 'All',
        more: 'More filters'
      },
      results: { title: 'Found Characters', empty: 'No results. Try adjusting the filters.' },
      notif: { sampleTitle: 'New portfolio published', sampleMeta: 'by {user} • {time} ago' },
      card: { viewPortfolio: 'View Portfolio' }
    },
    generate: {
      title: 'Generate Your Portfolio', tip: 'Tip', tipMeta: 'you can change colors in the Theme panel',
      template: {
        title: 'Template',
        associateHint: 'Associate to the Classic Portfolio',
        viewGallery: 'View gallery',
        classicTitle: 'Classic Portfolio',
        classicDesc: 'Versatile and elegant layout',
        minimalistTitle: 'Minimalist (coming soon)',
        minimalistDesc: 'Full focus on content',
        comingSoon: 'Coming soon'
      },
      profile: {
        title: 'Profile',
        name: { label: 'Name', placeholder: 'e.g., Ana Silva' },
        titleField: { label: 'Title', placeholder: 'e.g., Frontend Engineer' },
        location: { label: 'Location', placeholder: 'Country' },
        gender: { label: 'Gender', placeholder: 'Select' },
        experience: { label: 'Experience', placeholder: 'Select' },
        avatarUrl: { label: 'Avatar URL', placeholder: 'https://...' },
        selectImage: 'Select image',
        imageLocalHint: 'Image up to 3MB. Local preview only.',
        avatarPreviewAlt: 'Avatar preview'
      },
      about: { title: 'About', summaryLabel: 'Summary', summaryPlaceholder: 'Short introduction' },
      contact: {
        title: 'Contact & Socials',
        email: 'Email',
        phone: 'Phone',
        phonePlaceholder: 'Number',
        website: 'Website',
        github: 'GitHub',
        linkedin: 'LinkedIn',
        twitter: 'Twitter/X',
        instagram: 'Instagram'
      },
      skills: {
        title: 'Skills',
        hint: 'Add like on LinkedIn (Enter to confirm)',
        placeholder: 'e.g., React, UX, TypeScript',
        helper: 'Avoid duplicates; maximum 50 skills.'
      },
      projects: {
        title: 'Projects',
        itemTitle: 'Project #{n}',
        titleLabel: 'Title',
        linkLabel: 'Link',
        imageUrlLabel: 'Image URL',
        selectImageLabel: 'Select image',
        imageHint: 'Image up to 3MB',
        videoUrlLabel: 'Video URL',
        descriptionLabel: 'Description',
        add: '+ Add project',
        previewAlt: 'Preview'
      },
      languages: {
        title: 'Languages',
        languageLabel: 'Language',
        fluencyLabel: 'Fluency',
        selectPlaceholder: 'Select',
        examplePlaceholder: 'e.g., Portuguese',
        add: '+ Add language'
      },
      certificates: {
        title: 'Certificates',
        itemTitle: 'Certificate #{n}',
        nameLabel: 'Name',
        issuerLabel: 'Issuer',
        issuerPlaceholder: 'e.g., UEM, Coursera',
        yearLabel: 'Year',
        linkLabel: 'Link',
        fileLabel: 'File (PDF/Image)',
        attachFileLabel: 'Attach file',
        fileHint: 'PDF up to 10MB or image up to 3MB',
        add: '+ Add certificate',
        certAlt: 'Certificate'
      },
      diplomas: {
        title: 'Diplomas',
        itemTitle: 'Diploma #{n}',
        schoolLabel: 'Institution',
        degreeLabel: 'Degree',
        degreePlaceholder: 'Select degree',
        yearLabel: 'Year',
        linkLabel: 'Link',
        fileLabel: 'File (PDF/Image)',
        attachFileLabel: 'Attach file',
        fileHint: 'PDF up to 10MB or image up to 3MB',
        add: '+ Add diploma',
        diplomaAlt: 'Diploma'
      },
      links: {
        title: 'Links',
        itemTitle: 'Link #{n}',
        labelLabel: 'Label',
        urlLabel: 'URL',
        add: '+ Add link'
      },
      media: {
        title: 'Gallery',
        itemTitle: 'Item #{n}',
        typeLabel: 'Type',
        typeImage: 'Image',
        typeVideo: 'Video',
        urlLabel: 'URL',
        selectImageLabel: 'Select image',
        imageHint: 'Image up to 3MB',
        selectVideoLabel: 'Select video',
        videoHint: 'Video up to 20MB',
        add: '+ Add media',
        previewAlt: 'Preview'
      },
      theme: { title: 'Theme (color swatches)', primary: 'Primary', secondary: 'Secondary', background: 'Background', text: 'Text', quickPalettes: 'Quick palettes' },
      msg: {
        draftSaved: 'Draft saved.',
        published: 'Published!',
        invalidFile: 'Attach an image or PDF.',
        imageOnly: 'Choose an image.',
        videoOnly: 'Choose a video.',
        pdfTooLarge: 'PDF too large (max 10MB).',
        imageTooLarge: 'Image too large (max 3MB).',
        videoTooLarge: 'Video too large (max 20MB).'
      }
    },
    portfolio: {
      title: 'The Portfolio', readOnly: 'read‑only',
      notif: { title: 'Notice', meta: 'This is the read‑only version' },
      empty: 'No portfolio published yet.',
      createNow: 'Create now',
      like: { promptPrefix: 'Enjoy this profile?', promptCta: 'Leave a like' },
      stats: { likes: 'Likes', views: 'Views' },
      share: { whatsapp: 'WhatsApp', facebook: 'Facebook', twitter: 'X (Twitter)', twitterText: 'My portfolio on HUB' },
      comments: { placeholder: 'Write a comment…', publish: 'Publish', guest: 'Guest' },
      section: {
        about: 'About', skills: 'Skills', projects: 'Projects', certificates: 'Certificates', diplomas: 'Diplomas',
        languages: 'Languages', links: 'Links', gallery: 'Gallery', contact: 'Contact'
      },
      cta: { visit: 'Visit', video: 'Video', view: 'View', more: 'Show more…', less: 'Hide' },
      fallback: { name: 'Your Name', role: 'Your Role / Title', project: 'Project', certificate: 'Certificate', diploma: 'Diploma' },
      alt: { avatar: 'Avatar', certificate: 'Certificate', diploma: 'Diploma', media: 'Media', project: 'Project' }
    },
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

