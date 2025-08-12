import styles from './LandingPage.module.css';
import HeroSection from './components/HeroSection';

export default function LandingPage() {
  return (
    <main className={styles.container}>
      <HeroSection />
    </main>
  );
}
