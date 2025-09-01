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
✅ Projeto iniciado com **React (Vite + SWC)**.  
✅ Ambiente pronto para desenvolvimento.  
🔜 **Próximos passos**: Estrutura de pastas, integração com Firebase (Auth, Firestore).

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
- Branch principal detectada: `main`.
- `main` atualizada via fast-forward a partir de `origin/main`.
- Merge da branch `cursor/configurar-workflow-de-deploy-para-firebase-3b2a` em `main`: sem diferenças; push ao `origin` já estava atualizado.

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




