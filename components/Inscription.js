import Header from "./Header";
import Footer from "./Footer";
import styles from "../styles/Inscription.module.css";
import { useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "../reducers/user";
import React from "react";
import "boxicons/css/boxicons.min.css";
import { useRouter } from "next/router";

// pop-up Créer un compte

function SignIn() {
  const Swal = require('sweetalert2')
  const router = useRouter(); // pour pouvoir utiliser le hook Router.
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();
  const [SignInUsername, setSignInUsername] = useState("");
  const [SignInEmail, setSignInEmail] = useState("");
  const [SignInPassword, setSignInPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // état crée pour afficher ou non le password

  const toggleShowPassword = () => {
    // Pour afficher ou non le mot de passe
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    // Pour afficher ou non la confirmation de  mot de passe
    setShowConfirmPassword(!showConfirmPassword);
  };


  // Fonction pour avoir une confirmation de password. Si pas ok alors alert error
  const handleSignIn = () => {
    if (SignInPassword !== ConfirmPassword) {
      Swal.fire({
        title: 'Erreur!',
        text: 'Les mots de passe ne correspondent pas ',
        icon: 'error',
        timer: 5000,
        confirmButtonText: 'Valider'
      })
      return;
    }
    

    fetch('http://localhost:3000/users/signup'), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: SignInUsername,
        email: SignInEmail,
        password: SignInPassword,
        password:ConfirmPassword
      }),
    }
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
                type={showConfirmPassword ? "text" : "password"}   // Si showConfirmPassword est true, l'expression type={showConfirmPassword ? "text" : "password"} se résout à type="text".
                value={ConfirmPassword}            // Si showConfirmPassword est false, l'expression se résout à type="password"
                onChange={(e) => setConfirmPassword(e.target.value)} // text va nous permettre de voir le password/// password va le cacher.
                placeholder="Confirmation du mot de passe"
              />
              <i
                className={`bx ${showConfirmPassword ? 'bx-hide' : 'bx-show'} ${styles.eyeIcon}`}
                onClick={toggleShowConfirmPassword}
              ></i>
            </div>

            <button
              className={styles.button}
              type="submit"
              onClick={() => handleSignIn()}
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
            type="submit"
            onClick={() => handleSignIn()}
          >
            <i className="bx bxl-facebook-circle"></i> Connexion avec Facebook{" "}
          </button>
        </span>
        <span>
          <button
            className={styles.buttonbis}
            type="submit"
            onClick={() => handleSignIn()}
          >
            <i className="bx bxl-apple"></i> Connexion avec Apple{" "}
          </button>
        </span>
        <span
          className={styles.sentence}
          onClick={() => router.push("/Connexion")}
        >
          {" "}
          J’ai déja un compte. Se connecter.
        </span>
      </div>
    </div>
  );
}

export default SignIn;
