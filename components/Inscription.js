import Header from "./Header";
import Footer from "./Footer";
import styles from "../styles/Inscription.module.css";
import { useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "../reducers/user";
import React from "react";
import "boxicons/css/boxicons.min.css";

// pop-up Créer un compte

function SignIn(props) {
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();

  const [SignEmail, setSignEmail] = useState("");
  const [SignInpassword, setSignInpassword] = useState("");

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
          setSignInusername("");
          setSignInpassword("");
        }
      });
  };

  const handleClick = () => {
    props.toggle();
  };

  //   const handleButton = () => {
  //     return <Link href="/Home"/>
  //   }

  return (
    <div>
      <Header />
      <div className={styles.container}>
        <span className={styles.cross}>
          <button onClick={handleClick}>
            <i className="bx bx-x"></i>
          </button>
        </span>
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
              value={SignEmail}
              onChange={(e) => setSignInusername(e.target.value)}
              placeholder="E-mail"
            />
            <input
              type="password"
              value={SignInpassword}
              onChange={(e) => setSignInpassword(e.target.value)}
              placeholder="Mot de passe"
            />
            <input
              type="password"
              value={SignInpassword}
              onChange={(e) => setSignInpassword(e.target.value)}
              placeholder="Confirmation du mot de passe"
            />
          </div>

          <button
            className={styles.button}
            type="submit"
            onClick={() => handleSignIn()}
          >
            Inscription
          </button>
        </form>
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
      </div>

      <Footer />
    </div>
  );
}

export default SignIn;
