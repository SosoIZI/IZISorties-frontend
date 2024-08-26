import styles from '../styles/ResetPassword.module.css';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';

function ResetPassword() {
  const router = useRouter();
  const { token } = router.query; // Obtenir le token à partir des paramètres d'URL
  //La ligne const { token } = router.query; extraitle  token de cet objet
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [signInPassword, setSignInPassword] = useState("");

  const toggleShowPassword = () => setShowPassword(!showPassword);
  const toggleShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (signInPassword !== confirmPassword) {
      Swal.fire({
        title: 'Erreur!',
        text: 'Les mots de passe ne correspondent pas.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      return;
    }
// Si signInPassword=confirmPassword alors fetch la route resetPassword


    fetch(`https://izi-sorties-backend.vercel.app/users/reset-password/${token}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: signInPassword }),
    })
    .then(response => response.json())
    .then(data => {
      if (data.result) {
        Swal.fire({
          title: 'Succès!',
          text: 'Votre mot de passe a été réinitialisé avec succès.',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then(() => router.push('/Home')); // Rediriger vers la page de connexion
      } else {
        Swal.fire({
          title: 'Erreur!',
          text: 'Erreur: ' + data.error,
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    });
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.texte}>Réinitialiser le mot de passe</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.passwordContainer}>
          <input
            placeholder="Nouveau mot de passe"
            type={showPassword ? "text" : "password"}
            value={signInPassword}
            onChange={(e) => setSignInPassword(e.target.value)}
            className={styles.inputStyle}  // Appliquer le style
          />
          <i
            className={`bx ${showPassword ? "bx-hide" : "bx-show"} ${styles.eyeIcon}`}
            onClick={toggleShowPassword}
          ></i>
        </div>
        <div className={styles.passwordContainer}>
          <input
            placeholder="Confirmez le mot de passe"
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={styles.inputStyle}  // Appliquer le style
          />
          <i
            className={`bx ${showConfirmPassword ? "bx-hide" : "bx-show"} ${styles.eyeIcon}`}
            onClick={toggleShowConfirmPassword}
          ></i>
        </div>
        <button type="submit" className={styles.button}>Réinitialiser le mot de passe</button>
      </form>
    </div>
  );
}

export default ResetPassword;