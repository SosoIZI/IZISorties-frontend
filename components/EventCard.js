import styles from "../styles/EventCard.module.css";
import {useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Router, useRouter } from "next/router";

function EventCard(props) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.value.token);
  let [isliked, setIsLiked] = useState(false);
  const router = useRouter();


  useEffect(() => {
// je vais récupérer l'id du user, si cet id est compris dans le NbLike de cet event
// alors isLiked est true
fetch(`http://localhost:3000/users/infos/${token}`)
.then((response) => response.json())
.then((data) => {
  console.log(data.user[0]._id)
  if(props.nbLike) {
  for (const e of props.nbLike) {
    if (e==data.user[0]._id) {
      setIsLiked(true)
    }
  } }
})
  }, [])


  let heartStyle = { color: "white" };
  if (isliked === true) {
    heartStyle = { color: "red" };
  } else {
    heartStyle = { color: "white" };
  }

  // // Quand je clique sur le boutton coeur, je dois rajouter un like à ce tweet dans ma BDD
   const addNewLike = () => {
     setIsLiked(!isliked);
    // Cette route ajoute un like si le token de l'user n'est pas présent dans le tableau nbLike dans la BDD
    // s'il est présent dans le tableau nbLike dans la BDD cette route retire 1 like 
    fetch(`http://localhost:3000/events/like/${token}/${props._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
   };


const handleClick = () => {  // fonction pour activer la modal connexion au clic 
  //console.log("CLICK", props.isConnected);
  if (!props.isConnected) {  // props.IsConnected à false= lance la modal sinon lance la route pour rajouter l'event 
    props.handleShow();
  } else {
    router.push(`/event?hash=${props._id}`)
    addNewLike(); 
  }
}
    // Redirige vers la page de détails de l'événement (ou autre action)
    // Exemple: router.push(`/event/${id}`);

    // // Quand je clique sur le boutton coeur, je dois rajouter un like à ce tweet dans ma BDD

    //   // Cette route ajoute un like si le token de l'user n'est pas présent dans le tableau nbLike dans la BDD
    //   // s'il est présent dans le tableau nbLike dans la BDD cette route retire 1 like

    //   fetch(`http://localhost:3000/events/like/:token/${props._id}`, {
    //     method: "PUT",
    //     headers: { "Content-Type": "application/json" },
    //   })
    //     .then((response) => response.json())
    //     .then((data) => {
    //       console.log(data);
    //     });
 

  return (
    <div className={styles.cardContainer}>
      <div className={styles.heartButton} onClick={() => handleClick()}>
        <FontAwesomeIcon icon={faHeart} style={heartStyle} />
      </div>
      <div className={styles.cardAllContent}>
        {props.pictures ? (
          <Image
            src={props.pictures[0]}
            alt={props.eventName}
            width={250}
            height={280}
            className={styles.pic}
          />
        ) : (
          <div></div>
        )}
        {props._id ? (
          <div className={styles.cardContent} onClick={handleClick}>
            <p className={styles.title}>{props.eventName}</p>
            <p className={styles.description}>{props.description}</p>
            <button name='En savoir plus' className={styles.knowMoreButton}>En savoir plus</button>
          </div>
        ) : (<div className={styles.cardContent}>
            <p className={styles.title}>{props.eventName}</p>
            <p className={styles.description}>{props.description}</p>
            <button name='En savoir plus' className={styles.knowMoreButton}>En savoir plus</button>
          </div>)}
      </div>
    </div>
  );
}

export default EventCard;