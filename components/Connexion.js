import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from "../styles/Inscription.module.css";
import ForgotPassword from './ForgotPassowrd';
import { signIn } from "../reducers/user";
import { useSelector } from 'react-redux';


function Connexion({ showModal, handleClose }) {
  const Swal = require('sweetalert2') //pour donner du style aux messages d'Alert 
  const [name, setName] = useState("");
  //const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [forgotPasswordModalVisible, setForgotPasswordModalVisible] = useState(false);
  const email = useSelector(state=>state.user.value.email)
  const password = useSelector(state=>state.user.value.token)

  const toggleShowPassword = () => {// montre ou cache le mot de passe lors de la saisie 
    
    setShowPassword(!showPassword);
  };
  const handleForgotPasswordClick = () => {
    setForgotPasswordModalVisible(true);
    handleClose(); // ferme la  modal connexion

  };

  const handleForgotPasswordClose = () => {
    setForgotPasswordModalVisible(false);
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    handleClose();
  };

  if (!email) { // Si le mail ne correspond pas alors alert error 
    Swal.fire({
      title: 'Erreur!',
      text: "L'adresse mail n'est pas conforme",
      icon: 'error',
      timer: 50000,
      confirmButtonText: 'Valider'})
   
    return;
  }
  if (!password) { // Si le mail ne correspond pas alors alert error 
    Swal.fire({
      title: 'Erreur!',
      text: "Le mot de passe n'est pas conforme",
      icon: 'error',
      timer: 50000,
      confirmButtonText: 'Valider'})
   
    return;
  }






  return (
    <>
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Connexion
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit} className={styles.formula}>
          <input
            type="text"
            placeholder="Nom"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="texte"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="texte"
          />
          <div className={styles.passwordContainer}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="texte"
            />
            <i
              className={`bx ${showPassword ? "bx-hide" : "bx-show"} ${styles.eyeIcon}`}
              onClick={toggleShowPassword}
            ></i>
          </div>
          <span onClick={handleForgotPasswordClick} style={{ cursor: 'pointer' }}>Mot de Passe Oublié </span>


          <Button variant="primary" type="submit" className={styles.button}>
            Connexion
          </Button>
        </form>
      </Modal.Body>
    </Modal>
          <ForgotPassword showModal={forgotPasswordModalVisible} handleClose={handleForgotPasswordClose} />
</>
  );
}

export default Connexion;