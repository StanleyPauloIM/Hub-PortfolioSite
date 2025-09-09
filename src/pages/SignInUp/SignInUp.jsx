// Página de autenticação (entrar/criar conta)
import React, { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import styles from './SignInUp.module.css';
import GoogleButton from './components/GoogleButton';
import LinkedInButton from './components/LinkedInButton';
import bgImage from '../../assets/Hub_Background2.jpg';
import HubGlobe from '../../assets/HubGlobe.png';

const SignInUp = () => {
  const [params] = useSearchParams();
  const initial = params.get('mode') === 'signup' ? 'signup' : 'signin';
  const [mode, setMode] = useState(initial);

  const isSignup = mode === 'signup';

  // Handlers (placeholders)
  const handleSignIn = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const data = Object.fromEntries(form.entries());
    console.log('Sign in submit', data);
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const data = Object.fromEntries(form.entries());
    console.log('Sign up submit', data);
  };

  const wrapperStyle = useMemo(() => ({
    backgroundImage: `url(${bgImage})`,
  }), []);

  return (
    <div className={styles.wrapper} style={wrapperStyle}>
      <div className={styles.shell}> 
        {/* Card principal (Sign in) */}
        <section className={`${styles.card} ${styles.view} ${isSignup ? styles.hidden : styles.visible}`} aria-labelledby="signin-title" aria-hidden={isSignup}>
          <header className={styles.header}>
            <img className={styles.logo} src={HubGlobe} alt="HUB logo" />
            <div>
              <h1 id="signin-title" className={styles.title}>Bem-vindo de volta!</h1>
              <p className={styles.subtitle}>Sentimos sua falta. Entre com seus dados.</p>
            </div>
          </header>

          <form className={styles.form} onSubmit={handleSignIn} autoComplete="on">
            <label className={styles.label} htmlFor="email">Email</label>
            <input id="email" name="email" type="email" required placeholder="Digite o seu email" className={styles.input} />

            <label className={styles.label} htmlFor="password">Password</label>
            <div className={styles.passwordRow}>
              <input id="password" name="password" type="password" required placeholder="Digite a sua password" className={styles.input} />
              {/* Ícone olho seria adicionado aqui se necessário */}
            </div>

            <div className={styles.rowBetween}>
              <label className={styles.checkboxLabel}>
                <input type="checkbox" name="remember" />
                <span>Lembrar-me</span>
              </label>
              <a href="#" className={styles.mutedLink}>Esqueceu a password?</a>
            </div>

            <button type="submit" className={`btn ${styles.primaryBtn}`}>Entrar</button>

            <div className={styles.orSeparator}><span>ou</span></div>

            <div className={styles.socialRow}>
              <GoogleButton className="btn btn--full" />
              <LinkedInButton className="btn btn--full" />
            </div>

            <p className={styles.switchText}>
              Não tem uma conta?{` `}
              <button type="button" className={styles.linkButton} onClick={() => setMode('signup')}>Sign up</button>
            </p>
          </form>
        </section>

        {/* Painel de signup */}
        <aside className={`${styles.signupPanel} ${styles.view} ${isSignup ? styles.visible : styles.hidden}`} aria-labelledby="signup-title" aria-hidden={!isSignup}>
          <header className={styles.panelHeader}>
            <div className={styles.header}>
              <img className={styles.logo} src={HubGlobe} alt="HUB logo" />
              <div>
                <h2 id="signup-title" className={styles.panelTitle}>Criar Conta</h2>
                <p className={styles.panelSubtitle}>Leva menos de um minuto.</p>
              </div>
            </div>
          </header>

          <form className={styles.panelForm} onSubmit={handleSignUp} autoComplete="on">
            <div className={styles.grid2}>
              <div>
                <label className={styles.label} htmlFor="firstName">Primeiro Nome</label>
                <input id="firstName" name="firstName" type="text" required placeholder="Ex.: Ana" className={styles.input} />
              </div>
              <div>
                <label className={styles.label} htmlFor="lastName">Último Nome</label>
                <input id="lastName" name="lastName" type="text" required placeholder="Ex.: Silva" className={styles.input} />
              </div>
            </div>

            <div className={styles.grid2}>
              <div>
                <label className={styles.label} htmlFor="dob">Data de nascimento</label>
                <input id="dob" name="dob" type="date" required className={`${styles.input} ${styles.inputDate}`} max={new Date().toISOString().split('T')[0]} min="1900-01-01" />
              </div>
              <div>
                <label className={styles.label} htmlFor="signupEmail">Email</label>
                <input id="signupEmail" name="email" type="email" required placeholder="email@exemplo.com" className={styles.input} />
              </div>
            </div>

            <label className={styles.label} htmlFor="signupPassword">Password</label>
            <input id="signupPassword" name="password" type="password" required placeholder="Crie uma password" className={styles.input} />

            <label className={styles.label} htmlFor="confirmPassword">Confirmar password</label>
            <input id="confirmPassword" name="confirmPassword" type="password" required placeholder="Repita a password" className={styles.input} />

            <label className={styles.checkboxLabel}>
              <input name="terms" type="checkbox" required />
              <span>Li e aceito os <Link to="/terms" className={styles.inlineLink}>Termos e Condições</Link></span>
            </label>

            <button type="submit" className={`btn ${styles.primaryBtn}`}>Criar conta</button>

            <div className={styles.socialRow}>
              <GoogleButton className="btn btn--full" />
              <LinkedInButton className="btn btn--full" />
            </div>

            <p className={styles.switchText}>
              Já tenho uma conta.{` `}
              <button type="button" className={styles.linkButton} onClick={() => setMode('signin')}>Sign in</button>
            </p>
          </form>
        </aside>
      </div>
    </div>
  );
};

export default SignInUp;
