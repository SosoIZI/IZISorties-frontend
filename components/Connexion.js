import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from "../styles/Inscription.module.css";
import ForgotPassword from './ForgotPassowrd';
import { signIn, } from "../reducers/user";
import { useSelector,useDispatch } from 'react-redux';
import { useRouter } from 'next/router';



function Connexion({ showModal, handleClose }) {
  const Swal = require('sweetalert2') //pour donner du style aux messages d'Alert 
  const [SignInUsername, setSignInUsername] = useState("");
  const [SignInEmail, setSignInEmail] = useState("");
  const [SignInPassword, setSignInPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [forgotPasswordModalVisible, setForgotPasswordModalVisible] = useState(false);
 const dispatch=useDispatch()
 const router=useRouter()


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

    if (!SignInUsername && !SignInEmail) {
      Swal.fire({
        title: 'Attention!',
        text: "Veuillez renseigner soit votre nom d'utilisateur, soit votre email.",
        icon: 'warning',
        timer: 50000,
        confirmButtonText: 'Valider'})
     
      return;
    }


  

  fetch('http://localhost:3000/users/signin', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: SignInEmail, password: SignInPassword }),

  }).then(response => response.json())
    .then(data => {
      console.log(data);
      if (data.result) {
        dispatch(signIn({ username: SignInUsername,email:setSignInUsername, token: data.token }));
        setSignInUsername('');
        setSignInPassword('');
        setSignInEmail('')
        router.push("/Home")  // si il ya une réponse, ds le then __> faire le dispatch, réinitialiser le reste et rediriger vers la page home
      } else {

        Swal.fire({ // si, pas de réponse de la route: ->> message d'erreur
                title: 'Attention!',
                text: 'Mail ou Pseudo incorrects ',
                icon: 'warning',
                timer: 50000,
                confirmButtonText: 'Valider'})
              return;}
      
        
    });
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
            placeholder= "Email "
            value={SignInEmail}
            onChange={(e) => setSignInEmail(e.target.value)}
            className="texte"
          />
         
          <div className={styles.passwordContainer}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Mot de passe"
              value={SignInPassword}
              onChange={(e) => setSignInPassword(e.target.value)}
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
  )};


export default Connexion;