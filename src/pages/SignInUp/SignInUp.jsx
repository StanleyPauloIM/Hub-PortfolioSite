import styles from './SignInUp.module.css';
import GoogleButton from './components/GoogleButton';

export default function SignInUp() {
  return (
    <div className={styles.container}>
      <h2>Entrar / Criar Conta</h2>
      <GoogleButton />
    </div>
  );
}
