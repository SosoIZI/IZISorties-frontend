import styles from "../styles/Header.module.css";
import React, { useState } from "react";
import Link from "next/link";
import "boxicons/css/boxicons.min.css"; // import de boxicons pour intégrer les icones directement 
import {useRouter} from "next/router"  // import de useRouter pour afficher une navigation en mode SPA 
import {  Button } from 'react-bootstrap';
import Connexion from "./Connexion";
import { useDispatch, useSelector } from "react-redux";
import { Popover} from 'antd';
import { logout } from "../reducers/user";
function Header() {

const dispatch= useDispatch()
const router = useRouter(); // pour pouvoir utiliser le hook Router( navigation entre les pages)

  const [modalVisible, setModalVisible] = useState(false);// import de la modal pour l'utiliser au clic sur le bouton connexion du header
  const handleShow = () => setModalVisible(true);
  const handleClose = () => setModalVisible(false);


  const popoverProfil = (
    <p onClick={() => {
      dispatch(logout());  // Exécute la déconnexion
      router.push("/Home"); // Redirige vers la page d'accueil
    }} className={styles.popover}>
      
      Déconnexion
    </p>
  );







  const token = useSelector(state=>state.user.value.token) // le reducer va chercher la valeur du token pour dire si user connected ou non


  const [searchInput, setSearchInput] = useState("");// état pour renseigner l'input

  const handleChange = (e) => {     // e.target.value= valeur de l'input
    setSearchInput(e.target.value)};
  
    const handleReset = () => {  // Pour réinitialiser le setter vide= Quand on appuye sur la croix, réinitialise la barre de recherche.
      setSearchInput('')}
    

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
      <div className={styles.iconItem} onClick={() => router.push("/CreateEvent")}>
        <span className={styles.icon}>
          <i className="bx bxs-comment-add" style={{ color: "#f2af77" }}></i>
        </span>
        <span className={styles.nameicon}>Créer un évènement</span>
      </div>
    
      <div className={styles.iconItem}onClick={() => router.push("/Calendrier")}>
        <span  className={styles.icon}>
          <i className="bx bxs-calendar-star" style={{ color: "#f2af77" }}></i>
        </span>
        <span className={styles.nameicon}>Calendrier</span>
      </div>
    
      <div className={styles.iconItem} onClick={() => router.push("/Favoris")}>
        <span  className={styles.icon}>
          <i className="bx bxs-heart-circle" style={{ color: "#f2af77" }}></i>
        </span>
        <span className={styles.nameicon}>Favoris</span>
      </div>
    
      <div className={styles.iconItem} onClick={() => router.push("/Profil")}>
        

        <Popover className={styles.popoverContent} title="" content={popoverProfil} > 
        <span className={styles.icon}>
          <i className="bx bxs-user-circle" style={{ color: "#f2af77" }}></i>
          
        </span>
          <span className={styles.nameicon}>
            Profil
            </span>
    
        </Popover>
      </div>
    </div>
      ) : (// si token is false:=userNot Connected affiche ce header   //    
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
  {!searchInput?(<i // si searchInput est vide afficher la loupe //   
    className='bx bx-search-alt-2 bx-rotate-90' 
    style={{ color: 'rgba(0,0,0,0.38)' }}
  ></i>)
:(
   // si searchInput est renseigné afficher la croix qui au clic,réinitialise la barre de setter //  
<i className='bx bx-x' onClick={handleReset}></i>


)}
</div>
            <div className={styles.logoAndSearchContainer}>
              <div className={styles.buttonContainer}>
              <Button variant="primary"  className={styles.button}onClick={handleShow}>  {/*au clic ouvrre/ferme la modal   */}
        Connexion
      </Button>

      <Connexion showModal={modalVisible} handleClose={handleClose} />
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
