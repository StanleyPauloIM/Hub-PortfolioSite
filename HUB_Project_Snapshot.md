### Objetivo primário
Resumir e registrar todas as regras e ações realizadas até agora no projeto Hub – ThePortfolioWebsite.

---

### Regras definidas
- **Diretório base do projeto**:
  - Original: `C:\Users\YDK_Nley56\WebstormProjects\Hub`
  - Atual: `C:\Users\YDK_Nley56\Desktop\To do's\WebProjects\hub-theportfoliowebsite`
- **Repositório GitHub**:
  - Username: `StanleyPauloIM`
  - URL: `https://github.com/StanleyPauloIM/Hub-PortfolioSite.git`
  - Política: Não usar dados remotos existentes sem autorização
- **Nome do site**: `Hub – ThePortfolioWebsite`
- **Estilo de resposta / workflow**:
  - Iniciar com objetivo primário
  - Passo a passo, conciso, vinculado ao código/contexto atual
  - Não assumir nada sem confirmação
  - Sempre perguntar antes de avançar
  - Tom de voz: Jarvis (Iron Man)
  - Código compatível com WebStorm 2025.1, Windows 10, React e Firebase
- **Páginas registradas**:
  - Hub – LandingPage: Página inicial explicativa simples
  - Hub – SignIn/Up: Login via Google e LinkedIn
  - Hub – ChooseUrCharacter: Pesquisa de usuários
  - Hub – ThePortfolio: Página minimalista de portfólio próprio
  - Hub – GenerateUrPortfolio: Formulário para textos, imagens, vídeos, certificados, etc.
  - Hub – Navbar: Navegação entre páginas
- **Banco de dados**: Firestore (principal) + Firebase Storage (mídias)
- **Google Analytics**: Ativo, aguardando integração em código

---

### O que já foi feito
- Criação do projeto React (React + SWC) no WebStorm
- Configuração do Git local e sincronização com GitHub (forçando substituição do remoto antigo)
- Ajuste de estrutura de pastas após mover projeto para outro diretório
- Teste inicial em `src/App.jsx` com renderização simples
- Configuração do Firebase no projeto + criação de `firebase.js` com inicialização e exportação de `db`
- Ativação do Google Analytics no Firebase console
- Configuração do Firebase Hosting
  - Primeiro erro por falta de build, corrigido com `npm run build`
- Registro das páginas e funcionalidades futuras
- Definição da stack: React + Firebase (Auth, Firestore, Storage, Analytics, Hosting)

---

### Próximos passos sugeridos
- Gerar diagrama visual do fluxo (páginas, rotas, integrações Firebase e Analytics)
- Definir roteamento (React Router) e scaffolding básico das páginas citadas
- Configurar Firebase Auth (Google e LinkedIn) e proteção de rotas
- Estruturar coleções do Firestore e regras de segurança
- Setup de Storage para upload de mídias (com validações)
- Telemetria inicial (GA4) com eventos básicos por página

---

Última atualização: <!-- UPDATED_AT -->