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

  // Password visibility states
  const [showSignInPwd, setShowSignInPwd] = useState(false);
  const [showSignUpPwd, setShowSignUpPwd] = useState(false);
  const [showSignUpConfirm, setShowSignUpConfirm] = useState(false);

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
            <div className={styles.inputWrap}>
              <svg className={styles.inputIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16v16H4z" fill="none"/><path d="M22 6l-10 7L2 6"/></svg>
              <input id="email" name="email" type="email" required placeholder="Digite o seu email" className={styles.input} />
            </div>

            <label className={styles.label} htmlFor="password">Password</label>
<div className={`${styles.inputWrap} ${styles.inputWithAction}`}>
              <svg className={styles.inputIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="10" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              <input id="password" name="password" type={showSignInPwd ? 'text' : 'password'} required placeholder="Digite a sua password" className={styles.input} />
              <button type="button" className={styles.eyeBtn} aria-label={showSignInPwd ? 'Ocultar password' : 'Mostrar password'} aria-pressed={showSignInPwd} onClick={() => setShowSignInPwd(v => !v)}>
                {showSignInPwd ? (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-7 0-11-8-11-8a21.77 21.77 0 0 1 5.06-6.94"/><path d="M1 1l22 22"/><path d="M9.88 9.88A3 3 0 0 0 12 15a3 3 0 0 0 2.12-.88"/></svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                )}
              </button>
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
                <div className={styles.inputWrap}>
                  <svg className={styles.inputIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                  <input id="firstName" name="firstName" type="text" required placeholder="Ex.: Ana" className={styles.input} />
                </div>
              </div>
              <div>
                <label className={styles.label} htmlFor="lastName">Último Nome</label>
                <div className={styles.inputWrap}>
                  <svg className={styles.inputIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                  <input id="lastName" name="lastName" type="text" required placeholder="Ex.: Silva" className={styles.input} />
                </div>
              </div>
            </div>

            <div className={styles.grid2}>
              <div>
                <label className={styles.label} htmlFor="dob">Data de nascimento</label>
                <input id="dob" name="dob" type="date" required className={`${styles.input} ${styles.inputDate}`} max={new Date().toISOString().split('T')[0]} min="1900-01-01" />
              </div>
              <div>
                <label className={styles.label} htmlFor="signupEmail">Email</label>
                <div className={styles.inputWrap}>
                  <svg className={styles.inputIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16v16H4z" fill="none"/><path d="M22 6l-10 7L2 6"/></svg>
                  <input id="signupEmail" name="email" type="email" required placeholder="email@exemplo.com" className={styles.input} />
                </div>
              </div>
            </div>

            <label className={styles.label} htmlFor="signupPassword">Password</label>
<div className={`${styles.inputWrap} ${styles.inputWithAction}`}>
              <svg className={styles.inputIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="10" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              <input id="signupPassword" name="password" type={showSignUpPwd ? 'text' : 'password'} required placeholder="Crie uma password" className={styles.input} />
              <button type="button" className={styles.eyeBtn} aria-label={showSignUpPwd ? 'Ocultar password' : 'Mostrar password'} aria-pressed={showSignUpPwd} onClick={() => setShowSignUpPwd(v => !v)}>
                {showSignUpPwd ? (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-7 0-11-8-11-8a21.77 21.77 0 0 1 5.06-6.94"/><path d="M1 1l22 22"/><path d="M9.88 9.88A3 3 0 0 0 12 15a3 3 0 0 0 2.12-.88"/></svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                )}
              </button>
            </div>

            <label className={styles.label} htmlFor="confirmPassword">Confirmar password</label>
<div className={`${styles.inputWrap} ${styles.inputWithAction}`}>
              <svg className={styles.inputIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="10" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              <input id="confirmPassword" name="confirmPassword" type={showSignUpConfirm ? 'text' : 'password'} required placeholder="Repita a password" className={styles.input} />
              <button type="button" className={styles.eyeBtn} aria-label={showSignUpConfirm ? 'Ocultar password' : 'Mostrar password'} aria-pressed={showSignUpConfirm} onClick={() => setShowSignUpConfirm(v => !v)}>
                {showSignUpConfirm ? (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-7 0-11-8-11-8a21.77 21.77 0 0 1 5.06-6.94"/><path d="M1 1l22 22"/><path d="M9.88 9.88A3 3 0 0 0 12 15a3 3 0 0 0 2.12-.88"/></svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                )}
              </button>
            </div>

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
