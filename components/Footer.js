import styles from '../styles/Footer.module.css';
import Link from 'next/link';


function Footer() {
  return ( // on englobe l'image avec la balise <a> pour qu'elle devienne l'enfant de link et effectue la bonne action 
    <footer className={styles.footer}>
        <div className={styles.logocontainer}>
        <div >
        <Link href="/Home">
          <a>
            <img className={styles.logo} src="logo.png" alt="Logo" />
          </a>
        </Link>
      </div>
       </div>


      <div className={styles.linkContainer}>@ 2024 IZI Tous droits réservés </div> 
             <div className={styles.linkContainer}>
               <Link className={styles.link}href="/MentionsLegales">
          <a>Mentions Légales</a>
        </Link> </div>   


        <div className={styles.linkContainer}>
            <Link className={styles.link} href="/Politique">
            <a>Politique de confidentialité</a>
            </Link> 
          
              </div>  
               
              <div className={styles.linkContainer}>
            <Link className={styles.link}href="/Contact">
            <a>Contact</a>
            </Link> 
            </div>
            <div>
        <Link href="http://instagram.com">
          <a>
            <img className={styles.reseaux} src="Insta.png" alt="Instagram" />
          </a>
        </Link>
      </div>
      <div>
        <Link href="http://facebook.com">
          <a>
            <img className={styles.fbk} src="Facebook.png" alt="Facebook" />
          </a>
        </Link>
      </div>
      <div>
        <Link href="http://tiktok.com">
          <a>
            <img className={styles.reseaux} src="TikTok.png" alt="Tiktok" />
          </a>
        </Link>
      </div>
    </footer>
  );
}

export default Footer;