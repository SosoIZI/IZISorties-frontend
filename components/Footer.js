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
       
      <div>@ 2024 IZI Tous droits réservés </div> 
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

            <div>
      <a href="http://instagram.com" target="_blank">
        <img className={styles.reseaux} src="Insta.png" alt="Instagram" />
      </a>
    </div>

      </div>
      <div>
      <a href="http://facebook.com" target="_blank">
        <img className={styles.fbk} src="Facebook.png" alt="Facebook" />
      </a>
      </div>
      <div>
      <a href="http://tiktok.com" target="_blank">
        <img className={styles.reseaux} src="TikTok.png" alt="TikTok" />
      </a>
      </div>
    </footer>
  );
}

export default Footer;