
import styles from "../styles/Inscription.module.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signUp } from "../reducers/user";
import React from "react";
import "boxicons/css/boxicons.min.css";
import { useRouter } from "next/router";
import {  Button } from 'react-bootstrap';
import Connexion from "./Connexion";

function Inscription() {
  const Swal = require('sweetalert2') //pour donner du style aux messages d'Alert 
  const router = useRouter(); // pour pouvoir utiliser le hook Router( navigation entre les pages)
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();
  const [SignInUsername, setSignInUsername] = useState("");
  const [SignInEmail, setSignInEmail] = useState("");
  const [SignInPassword, setSignInPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // état crée pour confirmer le password

  const [modalVisible, setModalVisible] = useState(false);
  const handleShow = () => setModalVisible(true);
  const handleClose = () => setModalVisible(false);
  const toggleShowPassword = () => {
    // Pour afficher où non le mot de passe
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    // Pour afficher ou non la confirmation de  mot de passe
    setShowConfirmPassword(!showConfirmPassword);
  };


  const handleSubmit = (e) => {
    e.preventDefault();// éviter le comportement par défaut de js au niveau du formulaire.
   
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // regex pour valider le mail 
      
    // Regex pour valider le mot de passe
    const passwordRegex = /^(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>/?])(?=.*[0-9])[A-Za-z0-9!@#$%^&*()_+[\]{};':"\\|,.<>/?]{8,}$/

    if ( SignInUsername==="" ||SignInEmail===""||SignInPassword ==="") {  // si un des champs est vide--> alert
      Swal.fire({
        title: 'Attention!',
        text: 'Tous les champs de saisie ne sont pas remplis ',
        icon: 'warning',
        timer: 50000,
        confirmButtonText: 'Valider'})
      return;
    }

    if (!emailRegex.test(SignInEmail)) { // Si le mail ne correspond pas (test method) alors alert error 
      Swal.fire({
        title: 'Erreur!',
        text: "L'adresse mail n'est pas conforme",
        icon: 'error',
        timer: 50000,
        confirmButtonText: 'Valider'})
     
      return;
    }
    
    if (!passwordRegex.test(SignInPassword)) {// Si le password ne correspond pas (test method) alors alert error 
      Swal.fire({
        title: 'Attention!',
        text: 'Le mot de passe doit contenir au moins 8 caractères, inclure au moins un chiffre (1-9) et un caractère spécial.',
        icon: 'warning',
        timer: 50000,
        confirmButtonText: 'Valider'})
     
      return;
    }

    if (SignInPassword !== ConfirmPassword) { // si password n'est pas égal à confirm password alors error.
      Swal.fire({
        title: 'Erreur!',
        text: 'Les mots de passe ne correspondent pas ',
        icon: 'error',
        timer: 50000,
        confirmButtonText: 'Valider'})
      return;
    }



    fetch('http://localhost:3000/users/signup', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: SignInUsername,
        email: SignInEmail,
        password: SignInPassword,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          dispatch(
            signUp({
              username: SignInUsername,
              email: SignInEmail,
              token: data.token,
            })
          );
          setSignInUsername("");
          setSignInEmail("");
          setSignInPassword("");
          setConfirmPassword("");
          router.push("/Home")   // à la fin du fetch si il est true, on lui fait reinitialiser tous les setters et on le redirige vers HOME
        }
      });
  };
  return (
    <div>
    <div className={styles.container}>
      <div className={styles.top}>
        <span className={styles.texte}>
          <h1>Inscription </h1>
          <h3>Inscris-toi en 3 clics !</h3>
        </span>
      </div>

      <form>
        <div className={styles.formula}>
          <input
            type="text"
            value={SignInUsername}
            onChange={(e) => setSignInUsername(e.target.value)}
            placeholder="Nom"
          />
          <input
            type="text"
            value={SignInEmail}
            onChange={(e) => setSignInEmail(e.target.value)}
            placeholder="E-mail"
          />
          <div className={styles.passwordContainer}>
            <input
              type={showPassword ? "text" : "password"}
              value={SignInPassword}
              onChange={(e) => setSignInPassword(e.target.value)}
              placeholder="Mot de passe"
            />
            <i
              className={`bx ${showPassword ? 'bx-hide' : 'bx-show'} ${styles.eyeIcon}`}
              onClick={toggleShowPassword}  // au clicl toggle l'icone.
            ></i>
          </div>
          <div className={styles.passwordContainer}>
            <input
              type={showConfirmPassword ? "text" : "password"}   // Si showConfirmPassword est true, alors type={showConfirmPassword ? "text" : "password"} se résout à type="text".
              value={ConfirmPassword}            // Si showConfirmPassword est false, l'expression se résout à type="password"
              onChange={(e) => setConfirmPassword(e.target.value)} // text va nous permettre de voir le password/// password va le cacher.
              placeholder="Confirmation du mot de passe"
            />
            <i
              className={`bx ${showConfirmPassword ? 'bx-hide' : 'bx-show'} ${styles.eyeIcon}`} // l'icone change en fonction du click user)
              onClick={toggleShowConfirmPassword}
            ></i>
          </div>

          <button
            className={styles.button}
            type="submit"
            onClick= {handleSubmit}
          >
            Inscription
          </button>
        </div>
      </form>
      <span className={styles.stroke}></span>
    </div>
    <div className={styles.connectionWay}>
      <span>
        <button
          className={styles.buttonbis}
          type="submit"
          onClick={() => handleSignIn()}
        >
          <i className="bx bxl-google-plus"></i>Connexion avec Google{" "}
        </button>
      </span>
      <span>
        <button
          className={styles.buttonbis}
          type="button"
          onClick={() => handleSignIn()}
        >
          <i className="bx bxl-facebook-circle"></i> Connexion avec Facebook{" "}
        </button>
      </span>
      <span>
        <button
          className={styles.buttonbis}
          type="button"
          onClick={() => handleSignIn()}
        >
          <i className="bx bxl-apple"></i> Connexion avec Apple{" "}
        </button>
      </span>
      <span
        className={styles.sentence}
        onClick={handleShow}
      >
        J’ai déja un compte.    Se connecter.
      </span>
     
     <Connexion showModal={modalVisible} handleClose={handleClose} /> {/* utilisation de la modal pourpouvoir accèder à,la page de connexion directement sur le lien     */ }
              

    </div>
  </div>
);
}

export default Inscription;
