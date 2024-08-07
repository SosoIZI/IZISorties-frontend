import EventCard from "../components/EventCard";
import styles from "../styles/Home.module.css";
import "boxicons/css/boxicons.min.css";
import { useEffect, useState } from "react";

function Home() {
  const [currentPosition, setCurrentPosition] = useState(null);
  const [geoError, setGeoError] = useState(null);
  const [topEvent, setTopEvent] = useState([]);
  const [eventThisWeek, setEventThisWeek] = useState([]);

  useEffect(() => {

    // d'abord je charge les 5 events les + likés
    fetch("http://localhost:3000/events/top/liked")
      .then((response) => response.json())
      .then((data) => {
        setTopEvent(data.events);
      });
    
    // ensuite je vais afficher les 5 events de la semaine près de la localisation du l'utilisateur
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log(position)
          // 1- je récupère la géoloc de l'utilisateur
          const { latitude, longitude } = position.coords;
          setCurrentPosition(position.coords);
          // 2- je récupère la date du jour et la date du prochain dimanche pour avoir les events de la semaine.
          let today = new Date();
          let nextSunday = new Date(today);
          nextSunday.setDate(today.getDate() + (7 - today.getDay()));
          // 3- Je formate les dates pour les passer à la route
          const startDate = today.toISOString().split('T')[0];
          const endDate = nextSunday.toISOString().split('T')[0];
          // 3- je lance ma route
          fetch(
            `http://localhost:3000/events/${startDate}/${endDate}/${longitude}/${latitude}`
          )
            .then((response) => response.json())
            .then((data) => {
              setEventThisWeek(data.events);
            });
        },
        (error) => {
          if (error.code === error.PERMISSION_DENIED) {
            setGeoError(
              "Activez la géolocalisation pour obtenir des recommandations près de chez vous"
            );
          } else {
            setGeoError(error.message);
          }
        },
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      );
    } else {
      setGeoError("");
    }
  }, []);

  const topEventCards = topEvent.slice(0, 5).map((data, i) => {
    return <EventCard key={i} {...data} />;
  });

  // les sorties près de chez toi cette semaine.
  // si l'utilisateur a accepté d'être géoloc, alors afficher "les sorties de cette semaine, près de chez toi"
  // sinon, l'inviter à activer sa géoloc pour obtenir de meilleures reco.

  const thisWeekEventCards = eventThisWeek.slice(0, 5).map((data, i) => {
    return <EventCard key={i} {...data} />;
  });

  return (
    <div>
      <h2>Evènements les plus consultés :</h2>
      <div className={styles.mostConsultedContainer}>
        {topEventCards}
        <div>
          <button className={styles.roundButton}>
            <i className="bx bx-right-arrow-alt"></i>
          </button>
        </div>
      </div>
      {/* j'affiche les suggestions des events près de chez moi cette semaine, si j'ai bien récupéré la géoloc
      et si il y a des events près de chez moi cette semaine */}
      {geoError || thisWeekEventCards.length == 0 ? (
        <p>{geoError}</p>
      ) : currentPosition ? (
        <>
          <h2>Les sorties de cette semaine, près de chez toi :</h2>
          <div className={styles.mostConsultedContainer}>
            {thisWeekEventCards}
            <div>
              <button className={styles.roundButton}>
                <i className="bx bx-right-arrow-alt"></i>
              </button>
            </div>
          </div>
        </>
      ) : (
        <p>Obtention des coordonnées...</p>
      )}
    </div>
  );
}

export default Home;