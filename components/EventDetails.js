import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import styles from "../styles/EventDetails.module.css";
import "boxicons/css/boxicons.min.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import ShareButton from "./ShareButton";

// Importation des composants Leaflet
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), {
  ssr: false,
});

// Lancement du composant
function EventDetails() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.value.token);

  const Swal = require("sweetalert2"); //pour donner du style aux messages d'Alert

  const [eventData, setEventData] = useState({});
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [placeLatitude, setPlaceLatitude] = useState("");
  const [placeLongitude, setPlaceLongitude] = useState("");
  const [isClient, setIsClient] = useState(false);
  const [adresse, setAdresse] = useState("");
  const [isliked, setIsLiked] = useState(false);
  const [isBooked, setIsBooked] = useState(false);

  useEffect(() => {
    // isClient est une variable pour leaflet (doit être à true)
    setIsClient(true);
    // je récupère l'id de l'event qui est dans l'url de la page pour aller chercher ses infos
    const url = new URL(window.location.href);
    const eventId = url.searchParams.get("hash");

    fetch(`https://izi-sorties-backend.vercel.app/events/${eventId}`)
      .then((response) => response.json())
      .then((data) => {
        setEventData(data.events);
        console.log("data.events :  ", data.events);

        // Je récupère aussi les infos du lieu de l'event
        fetch(`https://izi-sorties-backend.vercel.app/places/${data.events.place}`)
          .then((response) => response.json())
          .then((place) => {
            console.log("place.place", place.place[0].address);
            setAdresse(
              place.place[0].address +
                " " +
                place.place[0].cp +
                " " +
                place.place[0].city
            );
            setPlaceLatitude(place.place[0].latitude);
            setPlaceLongitude(place.place[0].longitude);
            // je vais récupérer l'id du user, si cet id est compris dans le NbLike de cet event
            // alors isLiked est true
            fetch(`https://izi-sorties-backend.vercel.app/users/infos/${token}`)
              .then((response) => response.json())
              .then((dataUser) => {
                console.log("data info : ", dataUser.user[0]._id);
                console.log("eventData : ", eventData);

                if (data.events.nbLike) {
                  for (const e of data.events.nbLike) {
                    if (e == dataUser.user[0]._id) {
                      setIsLiked(true);
                    }
                  }
                }
                if (data.events.nbBooking) {
                  for (const e of data.events.nbBooking) {
                    if (e == dataUser.user[0]._id) {
                      setIsBooked(true);
                    }
                  }
                }
              });
          });
      });
  }, []);

  // PARAMETRAGE DES IMAGES
  // boutton nextpic et previousPic
  const nextPic = () => {
    if (currentImageIndex < eventData.pictures.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  const previousPic = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  // PARAMETRAGE DE LA MAP
  // Charger Leaflet seulement côté client (sinon ca ne marche pas)
  if (!isClient) {
    return null;
  }

  // Importation de Leaflet
  const L = require("leaflet");

  // Importation des styles Leaflet
  require("leaflet/dist/leaflet.css");

  // Création de l'icône personnalisée IZI
  const customIcon = new L.Icon({
    iconUrl: "/pointeur_izi.png",
    iconSize: [70, 70],
    iconAnchor: [19, 38], // Point d'ancrage de l'icône (base du marqueur)
    popupAnchor: [0, -38], // Point d'ancrage du popup par rapport à l'icône
  });

  // Pour le bon affichage des données :
  console.log("eventData", eventData);
  // je tranforme le format des date pour que l'affiche de la date soit compréhensible et lisible
  let dateDebut = new Date(eventData.startDate);
  let dateDebutGoodFormat = dateDebut.toLocaleString().split(" ")[0];
  let dateFin = new Date(eventData.endDate);
  let dateFinGoodFormat = dateFin.toLocaleString().split(" ")[0];

  // PARAMETRAGE DES LIKES ET DES BOOKINGS :
  let heartStyle = { color: "black" };
  if (isliked === true) {
    heartStyle = { color: "red" };
  } else {
    heartStyle = { color: "black" };
  }

  let bookingStyle = { color: "black" };
  if (isBooked === true) {
    bookingStyle = { color: "#F2AF77" };
  } else {
    bookingStyle = { color: "black" };
  }

  // Je récupère l'id de l'event qui se trouve dans l'URL
  let url = new URL(window.location.href);
  const hash = url.searchParams.get("hash");

  // GESTION DES EVENTS LIKES :
  // Ajoute un like si l'utilisateur clique sur le coeur, le retire si l'user avait déjà liké
  const addNewLike = () => {
    setIsLiked(!isliked);
    fetch(`https://izi-sorties-backend.vercel.app/events/like/${token}/${hash}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  };

  // GESTION DES EVENTS RAJOUTES A L'AGENDA :
  // je vais récupérer l'id du user, si cet id est compris dans le NbLike de cet event
  // alors isLiked est true
  const addAgenda = () => {
    setIsBooked(!isBooked);
    fetch(`https://izi-sorties-backend.vercel.app/events/booking/${token}/${hash}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  };

  // GESTION DU BOUTON "SHARE"
  console.log("url", url);
  const title = "Patager cet évènement";

  return eventData.pictures ? (
    <div className={styles.container}>
      <div className={styles.firstPartofPage}>
        <div className={styles.picturesContainer}>
          <button className={styles.roundButton} onClick={previousPic}>
            <i className="bx bx-left-arrow-alt"></i>
          </button>
          <img
            src={eventData.pictures[currentImageIndex]}
            alt={eventData.eventName}
            className={styles.mainImage}
          />
          <button className={styles.roundButton} onClick={nextPic}>
            <i className="bx bx-right-arrow-alt"></i>
          </button>
        </div>

        <div className={styles.eventContent}>
          <h2 className={styles.title}>{eventData.eventName}</h2>
          <p className={styles.description}>{eventData.description}</p>
        </div>
      </div>

      <div className={styles.secondPartofPage}>
        <div className={styles.mapContainer}>
          {placeLatitude && placeLongitude && (
            <MapContainer
              center={[placeLatitude, placeLongitude]}
              zoom={13}
              style={{ height: "400px", width: "460px", borderRadius: "8px" }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker
                position={[placeLatitude, placeLongitude]}
                icon={customIcon}
              >
                <Popup>{eventData.eventName}</Popup>
              </Marker>
            </MapContainer>
          )}
        </div>

        <div className={styles.infoContainer}>
          <div className={styles.headerInfoContainer}>
            <h2>Infos pratiques</h2>
            <div className={styles.iconsContainer}>
              <button
              name='icone pour copier le lien de la page'
                className={styles.iconButton}
                onClick={() => {
                  const pageUrl = window.location.href; // Récupère l'URL actuelle de la page
                  navigator.clipboard
                    .writeText(pageUrl) // Copie l'URL dans le presse-papiers
                    .then(() => {
                      Swal.fire("Le lien vers cette page a été copié");
                    });
                }}
              >
                <i className="bx bx-link"></i>
              </button>
              <ShareButton url={url} title={title} />
              <button
              name='liker ou déliker l evenement'
                className={styles.iconButton}
                onClick={() => addNewLike()}
              >
                <i className="bx bx-heart" style={heartStyle}></i>
              </button>
              <button name='ajouter cet évènement à mon agenda'
              className={styles.iconButton} onClick={() => addAgenda()}>
                <i className="bx bx-calendar-plus" style={bookingStyle}></i>
              </button>
            </div>
          </div>
          <div className={styles.infosData}>
            <div className={styles.longInfoButton}>
              <i className="bx bx-calendar"></i>{" "}
              {eventData.startDate === eventData.endDate
                ? `Le ${dateDebutGoodFormat}`
                : `Du ${dateDebutGoodFormat} au ${dateFinGoodFormat}`}
            </div>
            <div className={styles.smallInfoButtonContainer}>
              <div className={styles.infoButton}>
                <i class="bx bx-time-five"></i> De {eventData.startTime} à{" "}
                {eventData.endTime}
              </div>
              <div className={styles.infoButton}>
                <i class="bx bx-euro"></i> Prix : {eventData.price}
              </div>
            </div>
            <div className={styles.longInfoButton}>
              <i class="bx bx-map"></i> {adresse}
            </div>
            <button name='Accéder à la page de létablissement' className={styles.placeButton}>
              <i class="bx bx-building-house"></i> Page de l'établissement
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div></div>
  );
}

export default EventDetails;
