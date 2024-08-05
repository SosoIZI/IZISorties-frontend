import styles from "../styles/Header.module.css";
import React, { useState } from "react";
import Link from "next/link";
import "boxicons/css/boxicons.min.css"; // import de boxicons pour intégrer les icones directement 
import {useRouter} from "next/router"  // import de useRouter pour afficher une navigation en mode SPA 

function Header() {
  const token = false;    // dans un premier temps: soit le token est false= userNotConnected, soit true=USerConnected =autre header
  const router = useRouter() // pour pouvoir utiliser le hook Router.


 
  const [searchInput, setSearchInput] = useState("");

  const handleChange = (e) => {
    setSearchInput(e.target.value)};
  

  return (// Utilisation de Link et de la balise <a> pour qu'au clic sur l'image on puisse se rediriger vers home //
    <header className={styles.header}>
      <div className={styles.logoAndSearchContainer}>
        <Link href="/Home">                                 
          <a>
            <img className={styles.logo} src="logo.png" alt="Logo" />
          </a>
        </Link>
      </div>

      {token ? (                             // si token is true:=userconnected affiche ce header   //     
      <div className={styles.iconContainer}>
      <div className={styles.iconItem}>
        <span onClick={() => router.push("/CreateEvent")} className={styles.icon}>
          <i className="bx bxs-comment-add" style={{ color: "#f2af77" }}></i>
        </span>
        <span className={styles.nameicon}>Créer un évènement</span>
      </div>
    
      <div className={styles.iconItem}>
        <span onClick={() => router.push("/Calendrier")} className={styles.icon}>
          <i className="bx bxs-calendar-star" style={{ color: "#f2af77" }}></i>
        </span>
        <span className={styles.nameicon}>Calendrier</span>
      </div>
    
      <div className={styles.iconItem}>
        <span onClick={() => router.push("/Favoris")} className={styles.icon}>
          <i className="bx bxs-heart-circle" style={{ color: "#f2af77" }}></i>
        </span>
        <span className={styles.nameicon}>Favoris</span>
      </div>
    
      <div className={styles.iconItem}>
        <span onClick={() => router.push("/Profil")} className={styles.icon}>
          <i className="bx bxs-user-circle" style={{ color: "#f2af77" }}></i>
        </span>
        <span className={styles.nameicon}>Profil</span>
      </div>
    </div>
      ) : (
        <>
          <div className={styles.header}>

          <div className={styles.logoAndSearchContainer}>
  <input           
    className={styles.searchbar}
    type="text"
    placeholder="Rechercher une sortie"
    onChange={handleChange}
    value={searchInput}
  />
  {!searchInput?(<i 
    className='bx bx-search-alt-2 bx-rotate-90' 
    style={{ color: 'rgba(0,0,0,0.38)' }}
  ></i>)
:(
<i className='bx bx-x'></i>)}
</div>

            <div className={styles.logoAndSearchContainer}>
              <div className={styles.buttonContainer}>
                <button
                  onClick={() => router.push("/Connexion") }
                  className={styles.button}
                >
                  Connexion
                </button>
              </div>

              <div className={styles.buttonContainer}>
                <button
                  onClick={() => router.push("/Inscription") }
                  className={styles.button}
                >
                  Inscription
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  );
}

export default Header;
