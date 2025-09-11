# 🌐 Hub – ThePortfolioWebsite

Hub – ThePortfolioWebsite é um projeto de **rede social de portfólio**, onde cada utilizador poderá criar login e submeter:
- 📜 **Certificados**
- 🎓 **Diplomas**
- 🔗 **Links**
- 🎥 **Imagens e Vídeos**
- 💻 **Projetos**

Outros utilizadores poderão visualizar esses conteúdos, criando uma comunidade dinâmica e inspiradora para profissionais e estudantes.

---

## 🚀 Status do Projeto
✅ Projeto com **React (Vite + SWC)** e UI modular (CSS Modules).  
✅ Layouts e navegação padronizados.  
✅ Ambientes prontos para desenvolvimento e deploy.  
🔜 **Próximos passos**: Template Minimalist completo e integração real com backend.

## 🧩 Funcionalidades Principais

- Templates Gallery
  - Cards com pré‑visualização (Classic, Minimalist – em breve), likes, contagem de uso e ações Ver/Escolher.
  - Layout responsivo com respiro para a navbar.

- Generate Your Portfolio (gerador)
  - Formulário completo: perfil, tema, skills, projetos, certificados, diplomas, media e links.
  - Guarda rascunho (localStorage) e permite publicar para visualização read‑only.
  - Pré‑visualização ao vivo do template Classic com tokens de tema.
  - Upload local com preview (FileInput) e stacks para escolher/remoção.
  - Sticky actions (Guardar/Publicar). Back button e sidebar universais.

- The Portfolio (visualização read‑only)
  - Cabeçalho unificado (Voltar, título+badge, Partilhar, Notificações, Definições, Perfil).
  - Linha "Gostou do perfil? Deixe seu like" com persistência por email no localStorage.
  - Abas Preview | Comentários com painel lateral animado (fade/slide) e preview expandindo quando fechado.
  - Input de comentários fixo; scroll discreto; dropdowns fecham ao clicar fora/Escape.

- Navbar + Sidebar
  - Navbar superior responsiva (conta, notificações, partilha, tema).
  - Sidebar universal (SideNav) reutilizada nas páginas com itens padrão: Início, ChooseUrCharacter, GenerateUrPortfolio, ThePortfolio, Templates e Ajuda.
  - SidebarLayout centraliza comportamento (collapsed por padrão, blur no mobile e backdrop global).

- Choose Your Character
  - Exploração de perfis mock com filtros e cards.
  - Usa os mesmos padrões de layout/UX do restante do site.

- Componentes reutilizáveis
  - GlowButton, Icons, FileInput, ChipsInput, ColorSwatches, YearSelect, PdfThumb.

## 🔁 CI/CD – Build e Deploy no Firebase

- **Estrutura criada**: `/.github/workflows/firebase-deploy.yml`
- **Disparo**: em `push` para a branch `main`.
- **Passos do workflow**:
  - Checkout do repositório
  - Instalação de dependências (`npm install`)
  - Build do projeto (`npm run build`)
  - Deploy para Firebase Hosting usando `w9jds/firebase-action@v2.2.0`

### 🌍 Website em produção (Firebase Hosting)

- URL principal: https://hub-theportfoliowebsite.web.app/
- URL alternativa: https://hub-theportfoliowebsite.firebaseapp.com/

### ⚙️ Configuração necessária
- **Secret `FIREBASE_TOKEN`**: adicionar em Settings → Secrets and variables → Actions.
  - Gerar com `firebase login:ci` e colar o token.
- Se a tua branch principal não for `main`, altera em `on.push.branches` no arquivo do workflow.

### 🧭 Estado do repositório
- Branch principal: `main`
- Branches de trabalho frequentes: `Fixing`, `feature/Portfolio_Template`
- Layout e sidebar unificados via `SidebarLayout` e `SideNav`.

## 🎨 Tema e Acessibilidade
- Variáveis CSS de tema (dark/light) aplicadas a superfícies, bordas e sombras.
- Foco visível; botões com aria-label; dropdowns fecham com outside click/Escape.
- Scrollbar discreta global (Firefox e WebKit).

## 🔐 Variáveis de ambiente (.env) com Vite

- **Arquivo**: criar um `.env` na raiz do projeto.
- **Prefixo obrigatório**: todas as variáveis devem começar com `VITE_`.
- **Acesso no código**: use `import.meta.env.VITE_...` (ex.: `import.meta.env.VITE_FIREBASE_API_KEY`).
- **Não commitar**: o `.env` já está listado no `.gitignore` e não deve ser versionado.
- **Reinício do servidor**: após alterar o `.env`, reinicie o servidor de desenvolvimento para carregar os novos valores.

Exemplo de variáveis esperadas:
```
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
VITE_FIREBASE_MEASUREMENT_ID=...
```

## Rotas
- `/templates` – Galeria de templates
- `/templates/:slug` – Pré‑visualização do template (TemplateExample)
- `/generateurportfolio` – Gerador de portfólio
- `/theportfolio` – Visualização read‑only
- `/chooseurcharacter` – Exploração de perfis (mock)
