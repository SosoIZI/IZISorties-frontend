

import React, { useState, useEffect } from "react";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

import styles from "../styles/Home.module.css";
import { useDispatch } from "react-redux";
import { signIn } from "../reducers/user";
import { useRouter } from "next/router";


function Google(props) {
  
  const [user, setUser] = useState([]);
  const [profile, setProfile] = useState([]);
  const dispatch = useDispatch();
  const router = useRouter();

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log("Login Failed:", error),
  });

  let googleDiv = "";
  if (name != "") {
    googleDiv = <p>{mail}</p>;
  } else {
    googleDiv = (
      <div>
        <h2></h2>
        <div className={styles.divider}></div>

        <button className={styles.buttonbis} onClick={() => login()}>
          <i className="bx bxl-google-plus"></i>Connexion avec Google{" "}
        </button>
      </div>
    );
  }

  useEffect(() => {
    if (user) {
      user == [] ? console.log(user) : console.log("Empty user");
      axios  // = fetch    Axios will automatically transforms the server's response data, while with Fetch, you need to call the response. json method to parse the data into a JavaScript object.
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,// bearer authentification spécifique pour les token
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          // setProfile(res.data);
          console.log("res assigned : ", res);
          console.log("res.data assigned : ", res.data);

          if (!res.data.verified_email) {
            return;
          }

          fetch("http://localhost:3000/users/google-auth", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: res.data.email,
              name: res.data.name,
              // googleToken: token,
            }),
          })
            .then((response) => response.json())
            .then((data) => {
             // console.log("dataaa googlllle : ", data);
              if (data.result) {
             //   console.log("Connexion réussie:", data);
                dispatch(
                  signIn({   // on rajoute l'utilisatur dans la base de données si pas déja existant 
                    username: res.data.name,
                    email: res.data.email,
                    token: data.token,
                  })
                );
              props.handleClose() // on passe une props handleclose pour pouvoir l'intégrer au composant Google dans connexion
                router.push("/Home");
                
               
              } else {
                console.log("Échec de la connexion:", data);
                // Traiter l'échec de la connexion
              }
            })
            .catch((error) => {
              console.error("Erreur lors de la connexion:", error);
            });
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  const logOut = () => {
    googleLogout();
    setProfile([]);
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1></h1>
        {googleDiv}
      </div>
    </div>
  );
}
export default Google;
