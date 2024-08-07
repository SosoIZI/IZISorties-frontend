import { useEffect, useState } from "react";
import styles from "../styles/EventDetails.module.css";
import "boxicons/css/boxicons.min.css";

function EventDetails() {
  let [eventData, setEventData] = useState({});

  useEffect(() => {
    // sur la page EventDetails, je ne veux que l'event qui a été cliqué
    // son id est dans l'url de cette page, je vais le récupérer

    // 1- je récupère l'id de l'event dans l'URL
    let url = new URL(window.location.href);
    let eventId = url.searchParams.get("hash");

    console.log("lid dans lurl est", eventId);

    // 2- je fetch pour récupérer les données de mon event
    fetch(`http://localhost:3000/events/${eventId}`)
      .then((response) => response.json())
      .then((data) => {
        //console.log('data' ,data)
        setEventData(data.events);
      });
  }, []);

  return (
    <div className={styles.container}>
      {/* je ne mets qu'une seule image pour le moment mais il faudra charger autant d'image que nécéssaire */}
      <div className={styles.header}>
        <img
          src={eventData.pictures}
          alt={eventData.eventName}
          className={styles.mainImage}
        />
      
      <div classeName={styles.eventContent}>
        <h1 className={styles.title}>{eventData.eventName}</h1>
        <p className={styles.description}>{eventData.description}</p>
      </div>
      </div>
      <h2>Infos pratiques</h2>
      <div className={styles.secondPartofPage}>
        <div className={styles.mapContainer}>
          {/* mettre la map et pas l'image*/}
          <img
            src={eventData.pictures}
            alt={eventData.eventName}
            className={styles.mainImage}
          />
        </div>

        <div className={styles.infoContainer}>
          <div className={styles.iconsContainer}>
            <button className={styles.iconButton}>
              <i className="bx bx-link"></i>
            </button>
            <button className={styles.iconButton}>
              <i className="bx bx-share"></i>
            </button>
            <button className={styles.iconButton}>
              <i className="bx bx-heart"></i>
            </button>
            <button className={styles.iconButton}>
              <i className="bx bx-calendar"></i>
            </button>
          </div>

          <button className={styles.infoButton}>Date</button>
          <button className={styles.infoButton}>Horaires</button>
          <button className={styles.infoButton}>Prix</button>
          <button className={styles.infoButton}>Type d'event</button>
          <button className={styles.infoButton}>Adresse</button>
          <button className={styles.infoButton}>Page de l'établissement</button>
        </div>
      </div>
    </div>
  );
}

export default EventDetails;
