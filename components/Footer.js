import styles from '../styles/Footer.module.css';
import Link from 'next/link';

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.logocontainer}>
        <Link href="/Home">
          <img className={styles.logo} src="logo.png" alt="Logo" />
        </Link>
      </div>

      <div className={styles.centerContainer}>
      <div className={styles.topLine}>Oublie le “où qu'on va ?” La réponse c’est IZI</div>
      <div className={styles.bottomLine}>
        <div>@ 2024 IZI Tous droits réservés</div>
       
        <Link  href="/MentionsLegales">Mentions Légales</Link>
        <Link  href="/Politique">Politique de confidentialité</Link>
        <Link  href="/CGV">CGV</Link>
        <Link  href="/Contact">Contact</Link>
      
      </div>
      </div>
      <div className={styles.socialContainer}>
        <a href="http://instagram.com" target="_blank">
          <img className={styles.reseaux} src="Insta.png" alt="Instagram" />
        </a>
        <a href="http://facebook.com" target="_blank" >
          <img className={styles.fbk} src="Facebook.png" alt="Facebook" />
        </a>
        <a href="http://tiktok.com" target="_blank" >
          <img className={styles.reseaux} src="TikTok.png" alt="TikTok" />
        </a>
      </div>
    </footer>
  );
}

export default Footer;