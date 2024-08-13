import React from "react";
import styles from "../styles/Home.module.css";
import { useGoogleLogin } from '@react-oauth/google';
import { useState } from "react";
import { jwtDecode } from "jwt-decode";

function Google() {
  const [mail, setMail] = useState("");
  const [name, setName] = useState("");

  const handleLoginSuccess = (credentialResponse) => {
    console.log(credentialResponse);

    const token = credentialResponse.credential;
    const decoded = jwtDecode(token);
    console.log(decoded);
    setMail(decoded.email);
    setName(decoded.name);
  };

  const handleLoginFailure = () => {
    console.log("Login Failed");
  };

  const login = useGoogleLogin({
    onSuccess: tokenResponse => handleLoginSuccess(tokenResponse),
  });

  let googleDiv = "";
  if (name != "") {
     googleDiv = <p>{mail}</p>;
  } else {
    googleDiv = (
      
      <div>
        <h2></h2>
        <div className={styles.divider}></div>

<button className={styles.buttonbis}
onClick={() => login()}> 
      <i className="bx bxl-google-plus"></i>Connexion avec Google{" "}
      </button>
      </div>
    );
  }

  return (

    <div className={styles.container}>
      <div className={styles.content}>
        <h1> {name}</h1>
        {googleDiv}
      </div>
    </div>
  );
}

export default Google;
