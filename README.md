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

- Página pública por slug
  - Layout idêntico ao ThePortfolio (top bar unificada, partilha, notificações, tema)
  - Comentários e likes em tempo real
  - SEO dinâmico (title/description/og/twitter/canonical)
  - Botão eliminar com ícone e texto responsivo (apenas para o dono)

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

## 🔁 CI/CD – Deploy no Firebase

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

Após alterar o código:
1) `npm run build`
2) `firebase deploy --only hosting`

Para atualizar apenas regras:
- `firebase deploy --only firestore:rules,storage:rules`

### ⚙️ Configuração necessária
- Firebase CLI instalado: `npm i -g firebase-tools`
- Login no Firebase: `firebase login`
- Selecionar projeto (ou usar alias): `firebase use hub-theportfoliowebsite`

### 🚀 Comandos de deploy
- Regras: `firebase deploy --only firestore:rules,storage:rules`
- Build SPA: `npm run build`
- Hosting: `firebase deploy --only hosting`

### 🔐 Regras atualmente aplicadas (resumo)
- Portfólios públicos: leitura aberta
- Dono pode criar/editar/excluir
- Likes: terceiros autenticados podem ±1 (com updatedAt = server time)
- Views: visitantes anónimos podem +1 (com updatedAt = server time)
- Comentários: criar autenticado; apagar autor ou dono; leitura pública
- Storage: leitura pública só quando metadata.public == "true" em portfolio-assets

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
- `/` – Landing
- `/templates` – Galeria de templates
- `/templates/:slug` – Pré‑visualização do template (TemplateExample)
- `/generateurportfolio` – Gerador de portfólio (protegida)
- `/theportfolio` – Visualização do próprio portfólio (protegida)
- `/chooseurcharacter` – Exploração de perfis (protegida)
- `/p/:slug` – Portfólio público por slug

## 📌 Futuras implementações (sem garantia)

- Submissão de templates pela comunidade
  - MVP (HTML + CSS, sem JavaScript)
    - Contrato de dados do portfólio com placeholders em HTML (ex.: {{profile.name}}, {{projects[0].title}}).
    - Pacote do template (ZIP): manifest.json (nome, autor, versão, licença), index.html, styles.css e assets/.
    - Renderização segura: sanitização (DOMPurify) + iframe com sandbox e CSP restrita.
    - UI: card "Adicionar seu template" na galeria; validação do pacote; upload e registo (screenshot, autor, tags, licença).
  - Avançado (opcional, para o futuro): template como plugin React/ESM carregado dinamicamente.
    - Bundle (esbuild/SWC), isolamento via iframe/CSP/Trusted Types e revisão manual.
  - Híbrido: HTML+CSS aberto a todos; plugins JS só para parceiros aprovados.

- Próximos passos sugeridos quando for implementar
  1. Definir o PortfolioSchema (contrato de dados).
  2. Criar um template exemplo e guia de criação.
  3. Implementar o renderer HTML+CSS em iframe sandbox.
  4. Página de upload com validação e armazenamento do registo.
  5. Galeria com screenshot automático e gestão de estados (pendente/aprovado).
