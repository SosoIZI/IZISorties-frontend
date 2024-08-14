import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../styles/Inscription.module.css";
import ForgotPassword from "./ForgotPassword";
import { signIn } from "../reducers/user";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import Google from "./Google.js"; // import du composant Google pour l'afficher dans le formulaire connexion

function Connexion({ isConnected = true, showModal, handleClose }) { 
  // 3 props
  const Swal = require("sweetalert2"); //pour donner du style aux messages d'Alert
  const [SignInUsername, setSignInUsername] = useState("");
  const [SignInEmail, setSignInEmail] = useState("");
  const [SignInPassword, setSignInPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [forgotPasswordModalVisible, setForgotPasswordModalVisible] =
    useState(false);

  const dispatch = useDispatch();
  const router = useRouter();


  const toggleShowPassword = () => {
    // montre ou cache le mot de passe lors de la saisie.
    setShowPassword(!showPassword); //L'expression !showPassword est utilisée pour inverser la valeur actuelle de showPassword.
    //Si le mot de passe est actuellement visible (showPassword est true), la fonction le masquera en réglant showPassword à false.
    //Si le mot de passe est actuellement masqué (showPassword est false), la fonction l'affichera en clair en réglant showPassword à true.
  };
  const handleForgotPasswordClick = () => {
    // Ouvre la modale de réinitialisation du mot de passe et ferme la modale de connexion.
    console.log("salut");

    setForgotPasswordModalVisible(true);
    // handleClose(); // ferme la  modal connexion
  };

  const handleForgotPasswordClose = () => {
    // Ferme la modale de réinitialisation du mot de passe.

    setForgotPasswordModalVisible(false);
  };

  const handleSubmit = (e) => {
    //Fonction principale pour gérer la soumission du formulaire de connexion
    e.preventDefault();
    handleClose();

    if (!SignInUsername && !SignInEmail) {
      //Vérifie si au moins un des champs SignInUsername ou SignInEmail est rempli.
      Swal.fire({
        title: "Attention!",
        text: "Veuillez renseigner soit votre nom d'utilisateur, soit votre email.",
        icon: "warning",
        timer: 50000,
        confirmButtonText: "Valider",
      });

      return;
    }

    fetch("http://localhost:3000/users/signin", {
      //Fait une requête POST au backend pour vérifier les informations de connexion.

      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: SignInEmail, password: SignInPassword }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.result) {
          //Si la connexion est réussie (data.result est true), l'utilisateur est connecté, et ses informations sont enregistrées dans Redux (dispatch(signIn)).
          dispatch(
            signIn({
              username: SignInUsername,
              email: setSignInUsername,
              token: data.token,
            })
          );
          setSignInUsername("");
          setSignInPassword("");
          setSignInEmail("");
          router.push("/Home"); // si il ya une réponse, ds le then __> faire le dispatch, réinitialiser le reste et rediriger vers la page home
        } else {
          Swal.fire({
            // si, pas de réponse de la route: ->> message d'erreur
            title: "Attention!",
            text: "Mail ou Pseudo incorrects ",
            icon: "warning",
            timer: 50000,
            confirmButtonText: "Valider",
          });
          return;
        }
      });
  };

  //console.log("isConnected : ", isConnected);
  return (
    <>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Connexion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className={styles.formula}>
            <input
              type="text"
              placeholder="Email "
              value={SignInEmail}
              onChange={(e) => setSignInEmail(e.target.value)}
              className="texte"
            />

            <div className={styles.passwordContainer}>
              <input
                type={showPassword ? "text" : "password"} //Si showPassword est true : Alors, le type de l'input sera défini à "text". Cela signifie que le contenu de l'input sera visible en clair, comme du texte ordinaire.
                placeholder="Mot de passe"
                value={SignInPassword}
                onChange={(e) => setSignInPassword(e.target.value)}
                className="texte"
              />

              <i
                className={`bx ${showPassword ? "bx-hide" : "bx-show"} ${
                  styles.eyeIcon
                }`}
                onClick={toggleShowPassword}
              ></i>

              <div className={styles.passwordContainer}>
              </div>
            </div>

                <Google 
                
                handleClose={handleClose}/> 
             
                
            {isConnected && (
              <span /*Si isConnected est vrai, un lien pour réinitialiser le mot de passe est affiché.*/
                onClick={handleForgotPasswordClick}
                style={{ cursor: "pointer" }}
              >
                Mot de Passe Oublié{" "}
              </span>
            )}

            <ForgotPassword
              showModal={forgotPasswordModalVisible}
              handleClose={handleForgotPasswordClose}
            />

            <Button
              variant="primary"
              type="submit"
              className={styles.button}
              onClick={handleSubmit}
            >
              Connexion
            </Button>

            {!isConnected && ( //Si isConnected est faux (l'utilisateur n'est pas connecté), un lien pour rediriger vers la page d'inscription est affiché.
              <>
                <a onClick={() => router.push("/Inscription")}>
                  Vous n'avez pas de compte? Inscrivez-vous!
                </a>
              </>
            )}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Connexion;
