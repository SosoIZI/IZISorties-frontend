import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from "../styles/ForgotPassword.module.css";
import Swal from 'sweetalert2';

function ForgotPassword({ showModal, handleClose }) {
  const [signInMail, setSignInMail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault(); // Éviter le comportement par défaut du formulaire.

    fetch('http://localhost:3000/users/forgot-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: signInMail }), // Envoyer l'email pour réinitialiser le mot de passe.
    })
    .then(response => response.json())
    .then(data => {
      console.log(data)
      if (data.result) {
        Swal.fire({
          title: 'Succès!',
          text: 'Un email a été envoyé pour réinitialiser votre mot de passe.',
          icon: 'success',
          confirmButtonText: 'OK'
        });
        handleClose(); // Fermer la modal après l'envoi de l'email.
      } else {
        Swal.fire({
          title: 'Erreur!',
          text: 'Erreur: ' + data.error,
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    })
    .catch(error => {
      Swal.fire({
        title: 'Erreur!',
        text: 'Erreur lors de l\'envoi de la demande.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    });
  };

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Réinitialiser votre mot de passe</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit} className={styles.formula}>
          <div className={styles.passwordContainer}>
            <input
              placeholder="Adresse Mail"
              type="email"
              value={signInMail}
              onChange={(e) => setSignInMail(e.target.value)}
              className="texte"
              required
            />
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