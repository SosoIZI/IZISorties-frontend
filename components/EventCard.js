import styles from "../styles/EventCard.module.css";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

function EventCard(props) {
 
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
        <Link href="/event">
          <div className={styles.cardContent}>
            <p className={styles.title}>{props.eventName}</p>
            <p className={styles.description}>{props.description}</p>
            <button className={styles.knowMoreButton}>En savoir plus</button>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default EventCard;