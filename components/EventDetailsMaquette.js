import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import styles from "../styles/EventDetailsMaquette.module.css";
import "boxicons/css/boxicons.min.css";

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
function EventDetailsMaquette(props) {
  const Swal = require("sweetalert2"); //pour donner du style aux messages d'Alert

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [placeLatitude, setPlaceLatitude] = useState("");
  const [placeLongitude, setPlaceLongitude] = useState("");
  const [isClient, setIsClient] = useState(false);
  const [adresse, setAdresse] = useState("");

  useEffect(() => {
    // isClient est une variable pour leaflet (doit être à true)
    setIsClient(true);
    // AFFICHAGE DE L'ADRESSE
    setAdresse(props.address + " " + props.cp + " " + props.city);
  }, [props.address, props.cp]);

  // AFFICHAGE DE LA CARTE (ne marche pas pour le moment, j'ai mis une image par défaut)
  console.log('props.address', props.address)
  if (props.address && props.cp) {
    let q = props.address.split(" ").join("+");
    fetch(
      `https://api-adresse.data.gouv.fr/search/?q=${q}&postcode=${props.cp}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("data", data);
        // setPlaceLatitude(data.features[0].geometry.coordinates[1]);
        // setPlaceLongitude(data.features[0].geometry.coordinates[0]);
      });
  }

  // PARAMETRAGE DES IMAGES
  // boutton nextpic et previousPic
  const nextPic = () => {
    if (currentImageIndex < props.imagePreviews.length - 1) {
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

  // je tranforme le format des date pour que l'affiche de la date soit compréhensible et lisible

  let dateDebut = "";
  let dateDebutGoodFormat = "";
  let dateFin = "";
  let dateFinGoodFormat = "";

  if (props.startDate) {
    dateDebut = new Date(props.startDate);
    dateDebutGoodFormat = dateDebut.toLocaleString().split(" ")[0];
  }

  if (props.endDate) {
    dateFin = new Date(props.endDate);
    dateFinGoodFormat = dateFin.toLocaleString().split(" ")[0];
  }

  const defaultPic ="/Image-par-defaut-2.png"
  const defaultMap ="/Map-par-defaut.png"
  
  return (
    <div className={styles.container}>
      <div className={styles.firstPartofPage}>
        <div className={styles.picturesContainer}>
          <button className={styles.roundButton} onClick={previousPic}>
            <i className="bx bx-left-arrow-alt"></i>
          </button>
            {props.imagePreviews && props.imagePreviews.length > 0  ? (<img
            src={props.imagePreviews[currentImageIndex]}
            alt={props.eventName}
            className={styles.mainImage}
          />) : (<img
            src={defaultPic}
            alt={props.eventName}
            className={styles.mainImage}
          />)}
          
          <button className={styles.roundButton} onClick={nextPic}>
            <i className="bx bx-right-arrow-alt"></i>
          </button>
        </div>

        <div className={styles.eventContent}>
          <h2 className={styles.title}>{props.eventName}</h2>
          <p className={styles.description}>{props.description}</p>
        </div>
      </div>

      <div className={styles.secondPartofPage}>
        <div className={styles.mapContainer}>
          {placeLatitude && placeLongitude ? (
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
                <Popup>{props.eventName}</Popup>
              </Marker>
            </MapContainer>
          ) : (<img
            src={defaultMap}
            alt={props.eventName}
            width='500px'
            height='530px'
          />)}
        </div>

        <div className={styles.infoContainer}>
          <div className={styles.headerInfoContainer}>
            <h2>Infos pratiques</h2>
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
                <i className="bx bx-calendar-plus"></i>
              </button>
            </div>
          </div>
          <div className={styles.infosData}>
            <button className={styles.longInfoButton}>
              <i className="bx bx-calendar"></i>{" "}
              {props.startDate === props.endDate
                ? `Le ${dateDebutGoodFormat}`
                : `Du ${dateDebutGoodFormat} au ${dateFinGoodFormat}`}
            </button>
            <div className={styles.smallInfoButtonContainer}>
              <button className={styles.infoButton}>
                <i class="bx bx-time-five"></i> De {props.startTime} à{" "}
                {props.endTime}
              </button>
              <button className={styles.infoButton}>
                <i class="bx bx-euro"></i> Prix : {props.price}
              </button>
            </div>
            <button className={styles.longInfoButton}>
              {" "}
              <i class="bx bx-map"></i> {adresse}
            </button>
            <button className={styles.placeButton}>
              <i class="bx bx-building-house"></i> Page de l'établissement
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventDetailsMaquette;
