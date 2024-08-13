import React from 'react';
import SearchBar from "./SearchBar";
import ResultView from "./ResultView";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

function MapView() {

  const results = useSelector((state) => state.events.value);

  // Etat pour mettre à jour le nombre de cartes d'évènements à afficher
  const [numberToShow, setNumberToShow] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isClient, setIsClient] = useState(false);

  // isClient est une variable pour leaflet (doit être à true)
  setIsClient(true);

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

  // Trier les résultats en fonction de la date (de la plus proche à la plus lointaine)
  let sortedResults = [...results].sort((a, b) => new Date(b.startDate) - new Date(a.startDate));

  // maper sur les résultats pour les afficher sous forme de markers sur la map 
  const visibleResults = sortedResults.slice(numberToShow, numberToShow+1).map((data, i) => (

  // Afficher la map

<MapContainer 
  center={[data.place.longitude, data.place.latitude]}
  zoom={13}
  style={{ height: "400px", width: "460px", borderRadius: "8px" }}>

  <TileLayer
    url="https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png"
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  />
    <Marker 
    key={i} 
    position={[data.latitude, data.longitude]}>
    icon={customIcon}
      <Popup>
        <div>
        <Image 
        src='/IZI_sorties_home.png'
        // src={data.pictures[0]}
        alt={data.eventName}
        width={235}
        height={300}
        className={styles.img}
        onClick={() => router.push(`/event/${data._id}`)}
        />
        </div>
        <div>
        {data.eventName}<br />{data.description}
        </div>
      </Popup>
    </Marker>
</MapContainer>

  ))


return (

<div>

    <SearchBar />
    <ResultView />
    {visibleResults}
   
</div>

  )
}

export default MapView