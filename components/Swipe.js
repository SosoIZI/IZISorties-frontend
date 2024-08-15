import styles from "../styles/Swipe.module.css";
import "boxicons/css/boxicons.min.css";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import SearchBar from "./SearchBar";
import ResultView from "./ResultView";
import { Link } from "react-router-dom";
import Image from "next/image";
import { useRouter } from "next/router";

function Swipe() {
  const token = useSelector((state) => state.user.value.token);
  const results = useSelector((state) => state.event.value);
  const router = useRouter();
  let [idUser, setIdUser] = useState("");

  useEffect(() => {
    if (token) {
      // je vais récupérer l'id du user, si cet id est compris dans le NbLike de cet event
      // alors isLiked est true
      fetch(`http://localhost:3000/users/infos/${token}`)
        .then((response) => response.json())
        .then((data) => {
          setIdUser(data.user[0]._id);
        });
    }
  }, [token]);

  // Mise à jour du nombre d'évènements à afficher
  const [numberToShow, setNumberToShow] = useState(0);

  // Affichage des résultats un par un, de la date la plus proche à la date la plus lointaine au click sur les icones
  let sortedResults = [...results].sort(
    (a, b) => new Date(b.startDate) - new Date(a.startDate)
  );

  // Quand je clique sur le boutton swipe à droite, je rajoute un like à ce tweet dans ma BDD (ou je ne fais rien s'il est déjà liké)
  const swipeRight = (idevent) => {
    if (token) {
      // Cette route ajoute un like si le token de l'user n'est pas présent dans le tableau nbLike dans la BDD
      // s'il est présent dans le tableau nbLike dans la BDD cette route ne fait rien
      fetch(
        `http://localhost:3000/events/swipe/droite/droite/${token}/${idevent}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        });
    }
  };

  const swipeLeft = (idevent) => {
    if (token) {
      // Cette route ajoute un like si le token de l'user n'est pas présent dans le tableau nbLike dans la BDD
      // s'il est présent dans le tableau nbLike dans la BDD cette route ne fait rien
      fetch(`http://localhost:3000/events/swipe/gauche/gauche/${token}/${idevent}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        });
    }
  };

  // Si je swipe à droite, je rajoute un like s'il n'y en avait pas avant et je passe à l'event suivant
  const handleSayYes = (idEvent) => {
    setNumberToShow((prev) => prev + 1);
    swipeRight(idEvent);
  };

  // Si je swipe à gauche, je retire un like s'il y en avait un avant et je passe à l'event suivant
  const handleSayNo = (idEvent) => {
    setNumberToShow((prev) => prev + 1);
    swipeLeft(idEvent);
    console.log("no !");
  };

//   let dateDebut = new Date(eventData.startDate);
//   let dateDebutGoodFormat = dateDebut.toLocaleString().split(" ")[0];
//   let dateFin = new Date(eventData.endDate);
//   let dateFinGoodFormat = dateFin.toLocaleString().split(" ")[0];

  // Affichage des résultats avec la possibilité de cliquer sur l'image pour voir la page de l'évènement
  // ainsi que navigation sur les différentes views
  const visibleResults = sortedResults
    .slice(numberToShow, numberToShow + 1)
    .map((data, i) => (
      <div key={i} className={styles.totalContainer}>
        <div className={styles.displayContainer}>
        <div className={styles.imgContainer}>
          <Link>
            <Image
              src={data.pictures[0]}
              alt={data.eventName}
              width={300}
              height={350}
              className={styles.img}
              onClick={() => router.push(`/event/${data._id}`)}
            />
          </Link>
        </div>
        <div className={styles.contentContainer}>
        <h2>{data.eventName}</h2>
          <div className={styles.longInfoButton}>
              <i className="bx bx-calendar" style={{ marginRight: "10px"}}></i>{" "}
              {data.startDate === data.endDate
                ? `Le ${new Date(data.startDate).toLocaleString().split(" ")[0]}`
                : `Du ${new Date(data.startDate).toLocaleString().split(" ")[0]} au ${new Date(data.endDate).toLocaleString().split(" ")[0]}`}
            </div>
          <p className={styles.description}>{data.description}</p>
        </div>
        </div>
        <div className={styles.iconContainer}>
          <i
            onClick={() => handleSayNo(data._id)}
            className="bx bxs-message-square-x custom-icon"
            style={{ color: "#f24822" , fontSize: "100px", cursor: "pointer"}}
          ></i>
          <i
            onClick={() => handleSayYes(data._id)}
            className="bx bxs-message-square-check custom-icon"
            style={{ color: "#77C461" , fontSize: "100px", cursor: "pointer"}}
          ></i>
        </div>
        {data.nbLike.find((ev) => ev == idUser) && (
          <p>Vous avez déjà liké cet évènement</p>
        )}
      </div>
    ));
  return (
    <div>
      <SearchBar />
      <ResultView />
      {visibleResults}
      {numberToShow > sortedResults.length && (
        <h1>
          {" "}
          Vous avez consultés tous les évènements correspondant à votre
          recherche. Vous pouvez retrouver vos évènement likés dans votre liste
          de favoris{" "}
        </h1>
      )}
    </div>
  );
}

export default Swipe;