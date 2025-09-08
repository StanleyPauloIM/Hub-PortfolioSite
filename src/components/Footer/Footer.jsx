import React, { useState, useEffect } from "react";
import styles from "./Footer.module.css";
import HubGlobe from "../../assets/HubGlobe.png";
import GitHubLogo from "../../assets/images/GitHub-Logo.png";
import LinkedInLogo from "../../assets/images/LinkedIn-Logo.png";
import XLogo from "../../assets/images/X-Logo.png";
import InstagramLogo from "../../assets/images/Instagram-Logo.png";

export default function Footer() {
  const [visitorCount, setVisitorCount] = useState(0);
  const [currentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    const interval = setInterval(() => {
      setVisitorCount((prev) => prev + Math.floor(Math.random() * 3) + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Subscribe Section - Top */}
        <div className={styles.topSection}>
          <div className={styles.subscribeCard}>
            <div className={styles.subscribeArea}>
              <h3 className={styles.subscribeTitle}>Subscreve-te às novidades</h3>
              <p className={styles.subscribeDescription}>
                Recebe por email as principais atualizações do HUB — novos recursos, melhorias e conteúdos úteis.
                Sem spam. Podes cancelar quando quiseres.
              </p>
            </div>
            <form className={styles.subscribeForm} onSubmit={(e) => e.preventDefault()}>
              <div className={styles.inputGroup}>
                <input
                  type="email"
                  placeholder="O teu email"
                  aria-label="Email para receber novidades"
                  className={styles.emailInput}
                />
                <button type="submit" className={styles.subscribeButton}>Subscrever</button>
              </div>
              <small className={styles.subscribeHint}>
                Ao subscrever, concordas em receber emails ocasionais sobre novidades do site.
              </small>
            </form>
          </div>
        </div>

        {/* Main Content - Middle */}
        <div className={styles.mainContent}>
          {/* Brand Section - Left */}
          <div className={styles.brandSection}>
            <div className={styles.brandHeader}>
              <img src={HubGlobe} alt="Hub Globe" className={styles.brandIcon} />
              <h2 className={styles.brandName}>HUB</h2>
            </div>
            <p className={styles.brandSlogan}>The Portfolio Website</p>
            <div className={styles.brandDivider} />
            <p className={styles.brandDescription}>
              Construindo portfólios extraordinários para profissionais e estudantes.
            </p>
            <div className={styles.socialIcons}>
              <a href="#" className={styles.socialIcon} aria-label="GitHub">
                <img src="https://cdn.simpleicons.org/github/ffffff" alt="GitHub" />
              </a>
              <a href="#" className={styles.socialIcon} aria-label="LinkedIn">
                <img src="https://cdn.simpleicons.org/linkedin/ffffff" alt="LinkedIn" />
              </a>
              <a href="#" className={styles.socialIcon} aria-label="X (Twitter)">
                <img src="https://cdn.simpleicons.org/x/ffffff" alt="X" />
              </a>
              <a href="#" className={styles.socialIcon} aria-label="Instagram">
                <img src="https://cdn.simpleicons.org/instagram/ffffff" alt="Instagram" />
              </a>
            </div>
          </div>

          {/* Links Sections - Center */}
          <div className={styles.linksGrid}>
            {/* About */}
            <div className={styles.linkGroup}>
              <h4>About</h4>
              <ul>
                <li>• Planning</li>
                <li>• Research</li>
                <li>• Consulting</li>
                <li>• Analysis</li>
              </ul>
            </div>

            {/* Menu */}
            <div className={styles.linkGroup}>
              <h4>Menu</h4>
              <ul>
                <li>• <a href="/" className={styles.footerLink}>Home</a></li>
                <li>• <a href="/signin" className={styles.footerLink}>Entrar</a></li>
                <li>• <a href="#about" className={styles.footerLink}>Sobre</a></li>
                <li>• <a href="#contact" className={styles.footerLink}>Contato</a></li>
              </ul>
            </div>

            {/* Services */}
            <div className={styles.linkGroup}>
              <h4>Services</h4>
              <ul>
                <li>• Logo</li>
                <li>• Web Design</li>
                <li>• Branding</li>
                <li>• Marketing</li>
              </ul>
            </div>
          </div>

          {/* Contact + Map - Right */}
          <div className={styles.contactSection}>
            <h4>Contact</h4>
            <ul className={styles.contactList}>
              <li className={styles.contactRow}>
                <span className={styles.contactLabel}>Call :</span>
                <span className={styles.contactValue}>+0258 85 264 2255</span>
              </li>
              <li className={styles.contactRow}>
                <span className={styles.contactLabel}>Email:</span>
                <span className={styles.contactValue}>stanleypauloim@gmail.com</span>
              </li>
              <li className={styles.contactRow}>
                <span className={styles.contactLabel}>Visits:</span>
                <span className={styles.visitsBadge}>{visitorCount.toLocaleString()}</span>
              </li>
            </ul>
          </div>

          {/* Map - Rightmost Column */}
          <div className={styles.mapOnly}>
            <div className={styles.mapContainer}>
              <iframe
                title="Maputo Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d187344.26394987917!2d32.46951605!3d-25.96621315!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1ee68fcddc2d5b1d%3A0x47d18b6a3a1ef8a7!2sMaputo%2C%20Mo%C3%A7ambique!5e0!3m2!1spt-PT!2s!4v1694250000000!5m2!1spt-PT!2s"
                width="100%"
                height="210"
                style={{ border: 0, borderRadius: "12px" }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>

        {/* Thank You Message - Center */}
        <div className={styles.thankYouSection}>
          <p>Obrigado por visitar o Hub – The Portfolio Website!</p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className={styles.bottomBar}>
        <div className={styles.bottomContent}>
          <div className={styles.bottomLinks}>
            <a href="#">Privacy Policy</a>
            <span>|</span>
            <a href="#">Our History</a>
            <span>|</span>
            <a href="#">What We Do</a>
          </div>
          <div className={styles.copyright}>
            © {currentYear} Hub - Todos os direitos reservados. Feito com ❤️ e React.
          </div>
        </div>
      </div>
    </footer>
  );
}
