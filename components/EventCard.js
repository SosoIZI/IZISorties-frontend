import styles from "../styles/EventCard.module.css";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

function EventCard() {
  // /!\ l'élement ci-dessous est à retirer lors de l'intégration de ce component aux autres
  // penser à rajouter "props" dans les paramètres du component
  const [props, setProps] = useState({
    pic: "",
    title: "",
    description: "",
  });

  useEffect(() => {
    console.log("data");
    fetch("http://localhost:3000/events/66b0daaa34e20caf50a7ae4a")
      .then((response) => response.json())
      .then((data) => {
        //console.log("data", data);
        setProps({
          pic: data.events.pictures[0],
          title: data.events.eventName,
          description: data.events.description,
        });
        //console.log("eventData", eventData);
      });
  }, []);

  // /!\  jusqu'ici

  let [like, setLike] = useState(false);
  let heartStyle = { color: "white" };
  if (like === true) {
    heartStyle = { color: "red" };
  }

  return (
    <div className={styles.cardContainer}>
      <div className={styles.heartButton} onClick={() => setLike(!like)}>
        <FontAwesomeIcon icon={faHeart} style={heartStyle} />
      </div>
      <div className={styles.cardAllContent}>
        {props.pic ? (
          <Image
            src={props.pic}
            alt={props.title}
            width={250}
            height={280}
            className={styles.pic}
          />
        ) : (
          <div></div>
        )}
        <Link href="/event">
          <div className={styles.cardContent}>
            <p className={styles.title}>{props.title}</p>
            <p className={styles.description}>{props.description}</p>
            <button className={styles.knowMoreButton}>En savoir plus</button>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default EventCard;
