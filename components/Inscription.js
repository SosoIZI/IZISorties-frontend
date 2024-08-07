import Header from "./Header";
import Footer from "./Footer";
import styles from "../styles/Inscription.module.css";
import { useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "../reducers/user";
import React from "react";
import "boxicons/css/boxicons.min.css";
import {useRouter} from "next/router";

// pop-up Créer un compte

function SignIn(props) {
  const router = useRouter() // pour pouvoir utiliser le hook Router.
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();
const[SignName, setSignName] = useState("");
  const [SignEmail, setSignEmail] = useState("");
  const [SignPassword, setSignPassword] = useState("");

  const handleSignIn = () => {
    fetch("http://localhost:3000/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: SignEmail, password: SignInpassword }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          dispatch(signIn({ username: SignEmail, token: data.token }));
          setSignEmail("")
          setSignInusername("");
          setSignPassword("");
        }
      });
  };
 
  //   const handleButton = () => {
  //     return <Link href="/Home"/>
  //   }

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
              value={SignName}
              onChange={(e) => setSignName(e.target.value)}
              placeholder="Nom"
            />
            <input
              type="text"
              value={SignEmail}
              onChange={(e) => setSignEmail(e.target.value)}
              placeholder="E-mail"
            />
            <input
              type="password"
              value={SignPassword}
              onChange={(e) => setSignPassword(e.target.value)}
              placeholder="Mot de passe"
            />
            <input
              type="password"
              value={SignPassword}
              onChange={(e) => setSignPassword(e.target.value)}
              placeholder="Confirmation du mot de passe"
            />
       

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
        <span className={styles.sentence}
        onClick={() => router.push("/Connexion")}
        > J’ai déja un compte. Se connecter.
        </span>
      </div>

     
    </div>
  );
}

export default SignIn;
