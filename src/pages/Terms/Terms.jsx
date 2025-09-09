import React from 'react';
import styles from './Terms.module.css';
import HubGlobe from '../../assets/HubGlobe.png';

export default function Terms() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <div className={styles.header}>
          <img className={styles.logo} src={HubGlobe} alt="HUB logo" />
          <h1 className={styles.title}>Termos e Condições</h1>
        </div>
        <div className={styles.content}>
          <p>
            Este é um documento fictício de Termos e Condições apenas para efeitos de navegação e layout.
            Substitua por conteúdo real quando estiver pronto.
          </p>
          <ul>
            <li>Uso apenas pessoal e não transferível.</li>
            <li>Respeite as políticas de privacidade e boa conduta.</li>
            <li>Ao criar uma conta, aceita estes termos.</li>
          </ul>
          <p>Última atualização: hoje.</p>
        </div>
      </div>
    </div>
  );
}
