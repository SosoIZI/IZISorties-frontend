import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from "../styles/Inscription.module.css";
import ForgotPassword from './ForgotPassowrd';

function Connexion({ showModal, handleClose }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [forgotPasswordModalVisible, setForgotPasswordModalVisible] = useState(false);

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