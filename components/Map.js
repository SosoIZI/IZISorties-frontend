import React, {useState, useEffect } from 'react';
import SearchBar from "./SearchBar";
import ResultView from "./ResultView";
import 'leaflet/dist/leaflet.css';
import { useSelector } from 'react-redux';
import dynamic from "next/dynamic";
import styles from '../styles/Results.module.css';


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

  // Etat pour mettre à jour le nombre de cartes d'évènements à afficher
const [numberToShow, setNumberToShow] = useState(0);
const [isClient, setIsClient] = useState(false);
const [markers, setMarkers] = useState([])
const [view, setView] = useState([])
const token = useSelector((state) => state.user.value.token);
const results = useSelector((state) => state.events.value);

useEffect(() => {

  // isClient est une variable pour leaflet (doit être à true)
    setIsClient(true);

  // // je récupère l'id de "place" des évènements(résultats de la recherche) dans "events" + description/nom/photo pour les pop-up
  // // je récupère la longitude/latitude dans "places"

    const fetchPlaces = async () => {
      const markersData = await Promise.all(results.map(async (data) => {

        const id = data._id;
        const description = data.description;
        const eventName = data.eventName;
        const pictures = data.pictures;
        const longitude = ''
        const latitude = ''

        const response = await fetch(`http://localhost:3000/places/${data.place}`);
        const info = await response.json();


        for(let place of info.place) {

        latitude = place.latitude;
        longitude = place.longitude

        // console.log(latitude, longitude)

       }

        return {
          id: id,
          description: description,
          eventName: eventName,
          latitude:  latitude,
          longitude: longitude,
          pictures: pictures,
        };
    
      }));

      setMarkers(markersData);
      // console.log(markersData, markers)

    };

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


// création du marker 
// const customMarker = new L.Marker([48.1119800, -1.6742900], {icon: customIcon});

// je défini la position à rappeler dans la structure jsx de la Map
let position = []

// création des markers qui correspondent aux résultats de recherche()
console.log(markers)

const visibleMarkers = markers.map((marker, i) => {

  console.log(marker)

  position = [marker.latitude, marker.longitude]
  
  return <Marker 
  key={i}
  position={position}
  icon={customIcon}
  >
    <Popup>
      <div>
      {marker.eventName}<br />{marker.description}
      {/* < img 
      src={marker.pictures}
      alt={marker.eventName}
      width={235}
      height={300} */}
      {/* // onClick={() => router.push(`/event/${data._id}`)} */} 
      {/* /> */}
      </div>
    </Popup>
  </Marker> 

})


return (

<div>
    <SearchBar />
    <ResultView />

<div className={styles.mapContainer}>
<MapContainer 
center={position}
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