
import { useState } from "react";
import styles from "../styles/Contact.module.css";


function Contact() {
  const Swal = require('sweetalert2') //pour donner du style aux messages d'Alert 
  const [prenom, setPrenom] = useState('');
  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [objet, setObjet] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
   // console.log('Form Data:', { prenom, nom, email, objet, message });

    setPrenom('');
    setNom('');
    setEmail('');
    setObjet('');
    setMessage('');
    Swal.fire({
     
      icon: "success",
      title: "Message bien envoyé",
      showConfirmButton: false,
      timer: 5000
    });

  };

  return (
    
       <div className={styles.contactContainer}>
      <h2>Contactez-nous</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Prénom:</label>
          <input
            type="text"
            value={prenom}
            onChange={(e) => setPrenom(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Nom:</label>
          <input
            type="text"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Adresse Mail:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Objet:</label>
          <input
            type="text"
            value={objet}
            onChange={(e) => setObjet(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Message:</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </div>

        <div>
          <input type="submit" value="Envoyer" />
        </div>
      </form>
    </div>
  );
}

export default Contact;