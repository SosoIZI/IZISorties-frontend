import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from "../styles/ForgotPassword.module.css";
import "boxicons/css/boxicons.min.css";




function ForgotPassword({ showModal, handleClose }) {
const Swal = require('sweetalert2')
const [signInMail, setSignInMail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // état crée pour confirmer le password

  const toggleShowPassword = () => {
    // Pour afficher où non le mot de passe
    setShowPassword(!showPassword);
  };


  const toggleShowConfirmPassword = () => {// montre ou cache le mot de passe lors de la saisie
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();// éviter le comportement par défaut de js au niveau du formulaire.
    handleClose();
    
    // Regex pour valider le mot de passe
    const passwordRegex = /^(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>/?])(?=.*[0-9])[A-Za-z0-9!@#$%^&*()_+[\]{};':"\\|,.<>/?]{8,}$/

    
    if (!passwordRegex.test(signInPassword)) {// Si le password ne correspond pas (test method) alors alert error 
      Swal.fire({
        title: 'Attention!',
        text: 'Le mot de passe doit contenir au moins 8 caractères, inclure au moins un chiffre (1-9) et un caractère spécial.',
        icon: 'warning',
        timer: 50000,
        confirmButtonText: 'Valider'})
     
      return;
    }

    if (signInPassword !== confirmPassword) { // si password n'est pas égal à confirm password alors error.
      Swal.fire({
        title: 'Erreur!',
        text: 'Les mots de passe ne correspondent pas ',
        icon: 'error',
        timer: 50000,
        confirmButtonText: 'Valider'})
      return;
    }}


  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Nouveau mot de passe
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit} className={styles.formula}>
        <div className={styles.passwordContainer}>
          <input
          
            placeholder="Adresse Mail"
               type="text"
            value={signInMail}
            onChange={(e) => setSignInMail(e.target.value)}
            className="texte"
          /> </div>





        <div className={styles.passwordContainer}>
          <input
          
            placeholder="Nouveau mot de passe"
            type={showPassword ? "text" : "password"}
            value={signInPassword}
            onChange={(e) => setSignInPassword(e.target.value)}
            className="texte"
          />
          <i
              className={`bx ${showPassword ? 'bx-hide' : 'bx-show'} ${styles.eyeIcon}`}
              onClick={toggleShowPassword}  // au clicl toggle l'icone.
            ></i>
        </div>
        <div className={styles.passwordContainer}>
            <input
              type={showConfirmPassword ? "text" : "password"}   // Si showConfirmPassword est true, alors type={showConfirmPassword ? "text" : "password"} se résout à type="text".
              value={confirmPassword}            // Si showConfirmPassword est false, l'expression se résout à type="password"
              onChange={(e) => setConfirmPassword(e.target.value)} // text va nous permettre de voir le password/// password va le cacher.
              placeholder="Confirmation du mot de passe"
            />

            <i
              className={`bx ${showConfirmPassword ? "bx-hide" : "bx-show"} ${styles.eyeIcon}`}
              onClick={toggleShowConfirmPassword}
            ></i>
          </div>

          <Button variant="primary" type="submit" className={styles.button}>
            Réinitialiser
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default ForgotPassword;