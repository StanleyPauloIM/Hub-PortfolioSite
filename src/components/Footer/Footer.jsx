import React, { useState, useEffect } from "react";
import styles from "./Footer.module.css";
import HubLogo from "../../assets/HUBlogo_t512.png";
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
      {/* Top Bar */}
      <div className={styles.topBar}>
        <h3>Subscreva-te</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.
        </p>
        <form className={styles.subscribeForm}>
          <input type="email" placeholder="Digite seu email" />
          <button type="submit">📩</button>
        </form>
      </div>

      {/* Main Content */}
      <div className={styles.footerContent}>
        {/* Brand */}
        <div className={styles.brandSection}>
          <img src={HubLogo} alt="Hub Logo" className={styles.hubLogo} />
          <h4>HUB - The Portfolio Website</h4>
          <p>Construindo portfólios extraordinários</p>
          <div className={styles.socialIcons}>
            <a href="#" className={styles.socialIcon}>
              <img src={GitHubLogo} alt="GitHub" />
            </a>
            <a href="#" className={styles.socialIcon}>
              <img src={LinkedInLogo} alt="LinkedIn" />
            </a>
            <a href="#" className={styles.socialIcon}>
              <img src={XLogo} alt="X" />
            </a>
            <a href="#" className={styles.socialIcon}>
              <img src={InstagramLogo} alt="Instagram" />
            </a>
          </div>
        </div>

        {/* About */}
        <div className={styles.linkGroup}>
          <h4>About</h4>
          <ul>
            <li><a href="/" className={styles.footerLink}>Planning</a></li>
            <li><a href="/" className={styles.footerLink}>Research</a></li>
            <li><a href="/" className={styles.footerLink}>Consulting</a></li>
            <li><a href="/" className={styles.footerLink}>Analysis</a></li>
          </ul>
        </div>

        {/* Menu */}
        <div className={styles.linkGroup}>
          <h4>Menu</h4>
          <ul>
            <li><a href="/" className={styles.footerLink}>Home</a></li>
            <li><a href="/signin" className={styles.footerLink}>Entrar</a></li>
            <li><a href="#about" className={styles.footerLink}>Sobre</a></li>
            <li><a href="#contact" className={styles.footerLink}>Contato</a></li>
          </ul>
        </div>

        {/* Services */}
        <div className={styles.linkGroup}>
          <h4>Services</h4>
          <ul>
            <li>Logo</li>
            <li>Web Design</li>
            <li>Branding</li>
            <li>Marketing</li>
          </ul>
        </div>

        {/* Contact + Map */}
        <div className={styles.contactSection}>
          <h4>Contact</h4>
          <p><strong>Call:</strong> +0258 85 264 2255</p>
          <p><strong>Email:</strong> stanleypauloim@gmail.com</p>
          <p><strong>Visits:</strong> {visitorCount.toLocaleString()}</p>

          {/* Mapa fixo de Maputo */}
          <div className={styles.mapContainer}>
            <iframe
              title="Maputo Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d187344.26394987917!2d32.46951605!3d-25.96621315!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1ee68fcddc2d5b1d%3A0x47d18b6a3a1ef8a7!2sMaputo%2C%20Mo%C3%A7ambique!5e0!3m2!1spt-PT!2s!4v1694250000000!5m2!1spt-PT!2s"
              width="100%"
              height="200"
              style={{ border: 0, borderRadius: "12px" }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className={styles.bottomBar}>
        <span>© {currentYear} Hub - Todos os direitos reservados</span>
        <span>Feito com ❤️ e React</span>
      </div>
    </footer>
  );
}
