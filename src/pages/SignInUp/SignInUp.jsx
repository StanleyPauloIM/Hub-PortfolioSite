// Página de autenticação (entrar/criar conta)
import React from 'react';
import styles from './SignInUp.module.css';
import GoogleButton from './components/GoogleButton';

const SignInUp = () => {
  return (
    <div className={styles.container}>
      <h2>Entrar / Criar Conta</h2>
      <GoogleButton />
    </div>
  );
};

export default SignInUp;
