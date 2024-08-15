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

  
  const [isClient, setIsClient] = useState(false);
  const [positions, setPositions] = useState([]);
  const [center, setCenter] = useState([46, 2])


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

        // Définir le centre de la carte sur la première position, si disponible
        if (newPositions.length > 0) {
          setCenter([newPositions[0].latitude, newPositions[0].longitude]);
        }
      } catch (error) {
        console.error('Error fetching places:', error);
      }
    };

    fetchPlaces();
  }, [results]);


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

  const handleMarkerClick = (latitude, longitude) => {
    setCenter([latitude, longitude]);
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
      <Popup>
        {marker.eventName}<br />
        {marker.description}
        <img 
          src={marker.picture} 
          alt={marker.eventName}
          width={100}
          height={150}
        />
        <i 
          onClick={() => router.push(`/event?hash=${marker.id}`)} 
          className={`${styles.link} bx bx-plus bx_xs`} 
        />
      </Popup>
    </Marker>
  ));



return (

<div>
    <SearchBar />
    <ResultView />

<div className={styles.mapContainer}>

<MapContainer 
  
  center={center}
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