import React, {useState, useEffect } from 'react';
import SearchBar from "./SearchBar";
import ResultView from "./ResultView";
import { useSelector } from 'react-redux';
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import styles from '../styles/Results.module.css';
import 'leaflet/dist/leaflet.css';
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

function MapView() {

const token = useSelector((state) => state.user.value.token);
const results = useSelector((state) => state.event.value);
const router = useRouter();
  
// Etat pour mettre à jour le nombre de cartes d'évènements à afficher
const [isClient, setIsClient] = useState(false);
const [latitude, setLatitude] = useState([])
const [longitude, setLongitude] = useState([])
// const [markers, setMarkers] = useState([]);
// const [mapBounds, setMapBounds] = useState(null);
// const [bounds, setBounds] = useState(outerBounds)

useEffect(() => {

  setIsClient(true);

  const fetchPlaces = () => {
    let array1 = []
    let array2 = []
    results.map((data) => {
      fetch(`http://localhost:3000/places/${data.place}`)
      .then(response => response.json())
      .then(info => {
        array1.push(info.place[0].latitude)
        array2.push(info.place[0].longitude)
          setLatitude(array1)
          setLongitude(array2)
  })
})
}
fetchPlaces();
}, [results]);


//// PARAMETRAGE DE LA MAP ////

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
})

// création des markers qui correspondent aux résultats de recherche()
const visibleMarkers = results.map((marker, i) => {
  
  return <Marker 
  key={i}
  position={[latitude, longitude]}
  icon={customIcon}
  >
    <Popup>
      {marker.eventName}<br />{marker.description}
      < img 
      src={marker.pictures}
      alt={marker.eventName}
      width={100}
      height={150} 
      />
       <i onClick={() => router.push(`/event?hash=${marker._id}`)} className={styles.link} class='bx bx-plus bx_xs' />
    </Popup>
  </Marker> 

})

return (

<div>
    <SearchBar />
    <ResultView />

<div className={styles.mapContainer}>

<MapContainer 
  center={[latitude, longitude]}
  zoom={13}
  style={{ height: "400px", width: "460px", borderRadius: "8px" }}>
  
  <TileLayer
    url="https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png"
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  />
  
  {visibleMarkers}
  
</MapContainer>

</div>
</div>

  )
}

export default MapView