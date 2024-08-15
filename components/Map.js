import React, { useState, useEffect } from 'react';
import SearchBar from "./SearchBar";
import ResultView from "./ResultView";
import dynamic from "next/dynamic";
import { useSelector } from 'react-redux';
import { useRouter } from "next/router";
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

  const [isClient, setIsClient] = useState(false);
  const [positions, setPositions] = useState([]);
  // met à jour la délimitation de la vue de la map (zoom et coordonnées) en fonction de la position des markeurs
  const [bounds, setBounds] = useState([ // initialisation de la vue à la france
        [51.1241999, -5.3453745],  // Coin supérieur gauche (nord-ouest)
        [41.333739, 9.559321],     // Coin inférieur droit (sud-est)
      ]);


  useEffect(() => {
    setIsClient(true);

    const fetchPlaces = async () => {
      try {
        const promises = results.map(async (data) => {
          const response = await fetch(`http://localhost:3000/places/${data.place}`);
          const info = await response.json();
          return {
            latitude: info.place[0].latitude,
            longitude: info.place[0].longitude,
            eventName: data.eventName,
            description: data.description,
            picture: data.pictures,
            id: data._id
          };
        });

        const newPositions = await Promise.all(promises);
        setPositions(newPositions);

        if (newPositions.length > 0) {
          const latLngBounds = new L.LatLngBounds(
            newPositions.map((position) => [position.latitude, position.longitude])
          );
          setBounds(latLngBounds);
        }
      } catch (error) {
        console.error('Error fetching places:', error);
      }
    };

    fetchPlaces();
  }, [results]);

  // PARAMETRAGE DE LA MAP //

  // Charger Leaflet seulement côté client (sinon ca ne marche pas)
  if (!isClient) {
    return null;
  }

  // Importation de Leaflet
  const L = require("leaflet");

  // Importation des styles Leaflet
  require("leaflet/dist/leaflet.css");

  const customIcon = new L.Icon({
    iconUrl: "/pointeur_izi.png",
    iconSize: [70, 70],
    iconAnchor: [19, 38],
    popupAnchor: [0, -38],
  });

  const handleMarkerClick = (latitude, longitude) => {
    setBounds(new L.LatLngBounds([latitude, longitude], [latitude, longitude])); // à l'évènement du click à un endroit sur la map, le cadre qui délimite la vue se déplace en même temps
  };

  const visibleMarkers = positions.map((marker, i) => (
    <Marker
      key={i}
      position={[marker.latitude, marker.longitude]}
      icon={customIcon}
      eventHandlers={{
        click: () => handleMarkerClick(marker.latitude, marker.longitude),
      }}
    >
      <Popup className={styles.popUp}>
        <div className={styles.info}>
          <img 
          src={marker.picture} 
          alt={marker.eventName}
          width={100}
          height={150}
          className={styles.img}
        />
        <br />
        {marker.eventName}<br /><br />
        <div className={styles.description}>
          {marker.description.slice(0, 250)} </div>
        </div> <br />
        <i onClick={() => router.push(`/event?hash=${marker.id}`)} class='bx bxs-plus-circle bx-sm style=color:#00ff26' />
      </Popup>
    </Marker>
  ));

  return (
    <div>
      <SearchBar />
      <ResultView />

      <div className={styles.mapContainer}>
        <div className={styles.map}>
        <MapContainer 
          bounds={bounds}
          style={{ height: "400px", width: "460px", borderRadius: "8px" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {visibleMarkers}
        </MapContainer>
      </div>
    </div>
  </div>
  );
}

export default MapView;