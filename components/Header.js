import styles from "../styles/Header.module.css";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import "boxicons/css/boxicons.min.css"; // import de boxicons pour intégrer les icones directement
import { useRouter } from "next/router"; // import de useRouter pour afficher une navigation en mode SPA
import { Button } from "react-bootstrap";
import Connexion from "./Connexion";
import { useDispatch, useSelector } from "react-redux";
import { Popover, Menu } from "antd";
import { logout } from "../reducers/user";
import Swal from "sweetalert2";
import { displayEvent } from "../reducers/event";

function Header() {
  const event = useSelector((state) => state.event.value);
  const dispatch = useDispatch();

  const router = useRouter(); // pour pouvoir utiliser le hook Router( navigation entre les pages)
  const token = useSelector((state) => state.user.value.token); // le reducer va chercher la valeur du token pour dire si user connected ou non

  const [searchInput, setSearchInput] = useState(""); // état pour renseigner l'input
  const [searchResults, setSearchResults] = useState([]); // est utilisé pour stocker les résultats de la recherche.

  const [userCreate, setUserCreate] = useState(true);
  const [modalVisible, setModalVisible] = useState(false); // import de la modal pour l'utiliser au clic sur le bouton connexion du header
  const handleShow = () => setModalVisible(true);
  const handleClose = () => setModalVisible(false);
  
  const handleChange = (e) => {
    //handleChange envoie une requête au serveur chaque fois que la valeur de la barre de recherche change et met à jour searchResults avec les données retournées.
    // e.target.value= valeur de l'input

    if (!token) {
      // si pas connecté on lance la modal et on réinitialise l'input pour que rien ne s'affiche

      router.push("/Inscription");
      setSearchInput("");

      return;
    }
    setSearchInput(e.target.value);

   
  };
    //fetch de la route search, utiliser le reducer et displayEvent pour afficher l'EventCard

  const handleKeyDown = (e) => {
    if(e.key === "Enter"){// le fetch se déclenche lorsqu'on appuye sur la touche enter 
      fetch(`https://izi-sorties-backend.vercel.app/events/search/${searchInput}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.events && data.events.length > 0) {
            console.log(e);
            if (e.key === "Enter") {
              setSearchResults(data.events); // Mettre à jour l'état avec les résultats de la recherche

              //console.log(searchResults);
              dispatch(displayEvent(data.events)); // On utilise dispatch pour utiliser displayEvent dans la searchBar une fois que le fetch est fait)
              router.push("/Search");
            }
          } else {
            Swal.fire({
              title: "Aucun évenement trouvé",
              text: "Veuillez modifier votre recherche",
              icon: "warning",
              confirmButtonText: "OK",
              confirmButtonColor: "rgb(46, 70, 86)",
            });

            setSearchResults([]); // Réinitialiser les résultats si la barre de recherche est vide
          }
        })
    }
  }

  const handleReset = () => {
    // Pour réinitialiser le setter vide = Quand on appuye sur la croix, réinitialise la barre de recherche.
    setSearchInput("");
    //dispatch(removeAllEvent())
    //router.push("/Home")
  };

  const handleDelete = async () => {
    // Async await pour attendre la validation de l'user avant de supprimer ou pas le profil

    const proceed = await Swal.fire({
      title: "Êtes-vous sûr ?",
      text: "Vous ne pourrez pas revenir en arrière !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui, supprimer !",
      cancelButtonText: "Annuler",
      timer: 50000,
    });

    console.log(proceed);
    if (proceed.isConfirmed) {
      // proceed.isConfirmed car lié à swal.)
      //  on appelle la route delete avec le param token ( pas besoin de req.body on veut tt supprimer)
      fetch(`https://izi-sorties-backend.vercel.app/users/delete/${token}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          {
            if (data.result) {
              // Si data alors supprime le compte, logout le user et renvoie sur home
              dispatch(logout());
              router.push("/Home");
            }
          }
        });
    }
  };

  const popoverContent = (
    <Menu>
      <Menu.Item
        key="1"
        className={styles.popoverItem}
        onClick={() => router.push("/Home")}
      >
        Profil
      </Menu.Item>
      <Menu.Item
        key="3"
        className={styles.popoverItem}
        onClick={() => {
          dispatch(logout()); // Exécute la déconnexion
          router.push("/Home"); // Redirige vers la page d'accueil
        }}
      >
        Déconnexion
      </Menu.Item>
      <Menu.Item
        key="4"
        className={styles.popoverItem}
        onClick={() => {
          handleDelete();
        }}
      >
        Supprimer son compte
      </Menu.Item>
    </Menu>
  );

  return (
    <header className={styles.header}>
      <div className={styles.logoAndSearchContainer}>
        <Link href="/Home">
          <a>
            <img className={styles.logo} src="logo.png" alt="Logo" />
          </a>
        </Link>

        <input
          className={styles.searchbar}
          type="text"
          placeholder="Rechercher une sortie"
          onChange={handleChange}
          onKeyDown={handleKeyDown} 
          value={searchInput}
        />
        {!searchInput ? (
          <i
            className="bx bx-search-alt-2 bx-rotate-90"
            style={{ color: "rgba(0,0,0,0.38)" }}
          ></i>
        ) : (
          <i className="bx bx-x" onClick={handleReset}></i>
        )}
      </div>

      {token ? (
        <div className={styles.iconContainer}>
          <div
            className={styles.iconItem}
            onClick={() => router.push("/CreateEvent")}
          >
            <span className={styles.icon}>
              <i
                className="bx bxs-comment-add"
                style={{ color: "#f2af77" }}
              ></i>
            </span>
            <span className={styles.nameicon}>Créer un évènement</span>
          </div>

          <div
            className={styles.iconItem}
            onClick={() => router.push("/Calendrier")}
          >
            <span className={styles.icon}>
              <i
                className="bx bxs-calendar-star"
                style={{ color: "#f2af77" }}
              ></i>
            </span>
            <span className={styles.nameicon}>Calendrier</span>
          </div>

          <div
            className={styles.iconItem}
            onClick={() => router.push("/Favoris")}
          >
            <span className={styles.icon}>
              <i
                className="bx bxs-heart-circle"
                style={{ color: "#f2af77" }}
              ></i>
            </span>
            <span className={styles.nameicon}>Favoris</span>
          </div>

          <div className={styles.iconItem}>
            <Popover
              className={styles.popoverContent}
              title=""
              content={popoverContent}
            >
              <span className={styles.icon}>
                <i
                  className="bx bxs-user-circle"
                  style={{ color: "#f2af77" }}
                ></i>
              </span>
              <span className={styles.nameicon}>Profil</span>
            </Popover>
          </div>
        </div>
      ) : (
        <div className={styles.logoAndSearchContainer}>
          <div className={styles.buttonContainer}>
            <Button
              variant="primary"
              className={styles.button}
              onClick={handleShow}
            >
              Connexion
            </Button>
            <Connexion showModal={modalVisible} handleClose={handleClose} />
          </div>

          <div className={styles.buttonContainer}>
            <button
              onClick={() => router.push("/Inscription")}
              className={styles.button}
            >
              Inscription
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
