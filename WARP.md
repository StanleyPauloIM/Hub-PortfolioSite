# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

**Hub – ThePortfolioWebsite** is a portfolio social network platform where users can create accounts and showcase:
- 📜 Certificates
- 🎓 Diplomas  
- 🔗 Links
- 🎥 Images and Videos
- 💻 Projects

The platform creates a dynamic community for professionals and students to view and discover each other's work.

## Tech Stack

- **Frontend**: React 19 with Vite (using SWC for fast compilation)
- **Routing**: React Router DOM v6
- **Backend Services**: Firebase (Auth, Firestore, Storage, Analytics, Hosting)
- **Styling**: CSS Modules
- **Build Tool**: Vite
- **Linting**: ESLint v9 with React plugins
- **Hosting**: Firebase Hosting with automated CI/CD

## Common Development Commands

### Development Server
```powershell
npm run dev
```
Starts the Vite development server with hot reload

### Build for Production
```powershell
npm run build
```
Creates optimized production build in `dist/` directory

### Linting
```powershell
npm run lint
```
Runs ESLint to check code quality and consistency

### Preview Production Build
```powershell
npm run preview
```
Serves the production build locally for testing

### Firebase Commands
```powershell
# Login to Firebase (generates FIREBASE_TOKEN for CI/CD)
firebase login:ci

# Deploy to Firebase Hosting
firebase deploy --only hosting

# Serve Firebase locally (after build)
firebase serve --only hosting
```

## Architecture Overview

### Directory Structure
- `src/pages/` - Main application pages organized by feature
- `src/components/` - Reusable UI components (Button, Loader, Modal, Navbar, Footer)
- `src/routes/` - React Router configuration
- `src/firebase/` - Firebase configuration and initialization
- `src/assets/` - Static assets (images, videos, logos)

### Page Structure
The application follows a clear page-based architecture:

1. **LandingPage** (`/`) - Homepage with HeroSection and FeaturesSection
2. **SignInUp** (`/signin`) - Authentication via Google/LinkedIn
3. **ChooseUrCharacter** (`/chooseurcharacter`) - User discovery/search
4. **ThePortfolio** (`/theportfolio`) - Minimalist portfolio display
5. **GenerateUrPortfolio** (`/generateurportfolio`) - Portfolio creation form

### Firebase Integration
- **Configuration**: Environment variables prefixed with `VITE_` (stored in `.env`)
- **Services**: Authentication, Firestore database, Storage for media, Analytics tracking
- **Security**: Configuration values loaded from environment variables at build time

### CSS Architecture
- CSS Modules pattern for component-scoped styling
- Each component/page has its own `.module.css` file
- Consistent naming convention following the component structure

### State Management
Currently using React's built-in state management. The architecture is prepared for:
- Firebase Auth state management
- User profile data from Firestore
- Media upload handling via Firebase Storage

## Environment Variables

Create a `.env` file in the project root with Firebase configuration:

```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_bucket.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

**Important**: Restart the dev server after changing environment variables.

## CI/CD Pipeline

Automated deployment configured via GitHub Actions (`.github/workflows/firebase-deploy.yml`):
- **Trigger**: Push to `main` branch
- **Process**: Install dependencies → Build → Deploy to Firebase Hosting
- **Requirements**: `FIREBASE_TOKEN` secret configured in GitHub repository settings
- **Deployment URLs**:
  - Primary: https://hub-theportfoliowebsite.web.app/
  - Alternative: https://hub-theportfoliowebsite.firebaseapp.com/

## Development Workflow

### Adding New Pages
1. Create page directory in `src/pages/PageName/`
2. Add `PageName.jsx` and `PageName.module.css`
3. Export component from `PageName.jsx`
4. Add route to `src/routes/AppRoutes.jsx`
5. Update navigation in `src/components/Navbar/Navbar.jsx` if needed

### Adding Components
1. Create component in `src/components/ComponentName/` or `src/components/`
2. Follow CSS Modules pattern for styling
3. Export component for reuse across pages

### Firebase Integration Patterns
- Import Firebase services from `src/firebase/firebase.js`
- Use environment variables for configuration
- Implement error handling for Firebase operations
- Follow Firebase v9+ modular SDK patterns

## Code Style Guidelines

- **ESLint Configuration**: Uses recommended React and JavaScript rules
- **Unused Variables**: Error level, but allows capitalized constants (varsIgnorePattern: '^[A-Z_]')
- **File Extensions**: `.jsx` for React components, `.js` for utilities
- **Import Style**: ES6 modules with explicit imports
- **CSS**: CSS Modules with camelCase class names

## Project Status

✅ **Completed:**
- React project setup with Vite + SWC
- Firebase integration and configuration
- Basic routing structure and page scaffolds
- CI/CD pipeline for automated deployment
- Google Analytics integration setup

🔜 **Next Steps:**
- Firebase Auth implementation (Google/LinkedIn)
- Firestore collections and security rules
- Storage setup for media uploads
- User profile management
- Portfolio creation and display functionality
