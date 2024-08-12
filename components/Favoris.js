import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import EventCard from "../components/EventCard";
import styles from "../styles/Favoris.module.css";

function Favoris() {
  const token = useSelector((state) => state.user.value.token);
  const [eventsLikedList, setEventsLikedList] = useState([]);

  useEffect(() => {
    // Je commence par récupérer les évènements likés
    fetch(`http://localhost:3000/events/likelist/user/${token}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("data.eventsLiked", data.eventsLiked);
        // c'est un tableau d'objet avec les events likés
        setEventsLikedList(data.eventsLiked);
      });
  }, []);

  console.log("hello");

  //(à trier par date)
  const favoriteEvents = eventsLikedList.map((data, i) => {
    return <EventCard key={i} {...data} />;
  });

  let heartStyle = { color: "red" };

  return (
    <div className={styles.favoritesPageContainer}>
        <div>
          <h1>
            Mes sorties sauvegardées{" "}
            <FontAwesomeIcon icon={faHeart} style={heartStyle} />{" "}
          </h1>{" "}
          <div className={styles.eventsLikedContainer}>
            {favoriteEvents}
            </div>
        </div>
    </div>
  );
}

export default Favoris;