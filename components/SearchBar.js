import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { displayEvent } from "../reducers/event";
import { Button, Select, DatePicker, ConfigProvider } from "antd";
import "boxicons/css/boxicons.min.css";
import styles from "../styles/SearchBar.module.css";
import "antd/dist/reset.css";
import frFR from "antd/locale/fr_FR"; // Importer la localisation française
import { useRouter } from "next/router"; // import de useRouter pour afficher une navigation en mode SPA
import fetch from "node-fetch";
import dayjs from "dayjs";
import { addGeoloc } from "../reducers/search";

function searchBar() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [categories, setCategories] = useState([]);
  const [displayCategories, setDisplayCategories] = useState([]);
  const [geoError, setGeoError] = useState(null);
  const [eventCity, setEventCity] = useState([]);
  const [city, setCity] = useState(null);
  const [locationPlaceholder, setLocationPlaceholder] = useState("Lieu");

  const dispatch = useDispatch();
  const signIn = useSelector((state) => state.user.valuetoken);
  const router = useRouter();

  // à l'affichage du composant, je récupère les villes des events dans la bdd
  // à l'affichage du composant, je récupère les catégories dans la bdd

  useEffect(() => {

    fetch('https://izi-sorties-backend.vercel.app/places')
    .then(response => response.json())
    .then(data => {
      const array = []
      for (let objects of data.places ) {
        setEventCity(objects.city) 
        if(array.includes(objects.city)) {
        } else {
          array.push(objects.city)
      }}

        console.log(array)
        setEventCity(array)
     });

     fetch("https://izi-sorties-backend.vercel.app/categories")
     .then((response) => response.json())
     .then((data) => {
       const array = [];
       // console.log(data)
       for (let objects of data.categories) {
         console.log("data.categories", data.categories);
         for (const sub of objects.subcategories) array.push(sub);
       }
       setDisplayCategories(array);
     });
 }, []);

  // variable pour afficher les villes dans le sélecteur
  let eventCities = eventCity.map((data, i) => {
    if (data ==! null) {
       return {...data};
    }


  })

  //// Filtrer la recherche et mettre à jour les états ////
  // on sélectionne une ville via le menu déroulant
  const selectCity = (e) => {
    setCity(e);
    console.log(e);
  };

  // on récupère la géoloc de l'utilisateur, et sur la base des coordonnées on récupère la ville où se trouve l'utilisateur
  const selectGeoloc = () => {
    console.log("selectGeoloc called");

    if ("geolocation" in navigator) {
      console.log("Geolocation is available");

      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log("Position acquired:", position.coords.longitude);
          const longitude = position.coords.longitude;
          const latitude = position.coords.latitude;

          dispatch(addGeoloc(true));

          fetch(
            `https://api-adresse.data.gouv.fr/reverse/?lon=${longitude}&lat=${latitude}`
          )
            .then((response) => response.json())
            .then((data) => {
              if (data && data.features && data.features.length > 0) {
                setCity(data.features[0].properties.city);
                setLocationPlaceholder(data.features[0].properties.city); // MAJ du placeholder avec la ville obtenue
                console.log(
                  "Selected place:",
                  data.features[0].properties.city
                );
              } else {
                console.log("No place found for the given coordinates.");
              }
            });
        },
        (error) => {
          console.log("Geolocation error:", error);
          if (error.code === error.PERMISSION_DENIED) {
            setGeoError("Activez la géolocalisation");
          } else {
            setGeoError(error.message);
          }
        },
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      );
    } else {
      setGeoError("La géolocalisation n'est pas supportée par ce navigateur.");
    }
  };

  // on sélectionne une date de début et une date de fin via le calendrier
  const selectStartDate = (e) => {
    e = dayjs(e).format("YYYY-MM-DD");
    setStartDate(e);
    console.log(e);
  };

  const selectEndDate = (e) => {
    e = dayjs(e).format("YYYY-MM-DD");
    setEndDate(e);
    console.log(e);
  };

  const selectCategories = (e) => {
    setCategories(e);
  };

  // fonction pour chercher les évènements correspondant aux filtres sélectionnés par le user
  // le résultat est envoyé dans le reducer events pour les récupérer sur les pages de résultats
  const findResults = (query) => {
    const url = `https://izi-sorties-backend.vercel.app/events/${startDate}/${endDate}/${city}${
      query ? query : ""
    }`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        // Envoyer les résultats dans le store Redux
        dispatch(displayEvent(data.events));
      });
  };

  // fonction pour renvoyer sur la page des résultats
  const handleClick = () => {
    let query = "";
    // Construire la chaîne de requête en fonction des catégories sélectionnées
    if (categories.length > 0) {
      query = "?categorie=" + categories.join("&categorie=");
    }
    // Effectuer la recherche en utilisant les filtres de dates et de ville
    findResults(query);
    // Rediriger vers la page de résultats
    router.push("/Results");
  };

  // const visibleCategories = displayCategories.map((category, i) => (
  //   <Option key={i}  value={category} label={category}></Option> )

  const visibleCities = eventCity.map((city, i) => (
    <Option key={i} value={city}></Option>
  ));

  return (
    <ConfigProvider locale={frFR}>
      <div className={styles.container}>
        <div className={styles.filterContainer}>
          <Select
            className={styles.searchBar}
            showSearch
            onSelect={selectCity}
            style={{ width: 200 }}
            suffixIcon={<i class="bx bxs-map bx-sm style=color:#00ff26"></i>}
            placeholder={<span style={{ color: city ? "#2E4656" : "#aaa" }}>{locationPlaceholder}</span>}
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.label ?? "").includes(input)
            }
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? "")
                .toLowerCase()
                .localeCompare((optionB?.label ?? "").toLowerCase())
            }
            dropdownRender={(menu) => (
              <div>
                {menu}
                <div
                  style={{
                    display: "flex",
                    flexWrap: "nowrap",
                    padding: 8,
                  }}
                >
                  <Button
                    type="primary"
                    style={{ flex: "none", padding: "12", width: "100%", backgroundColor: "#2E4656" }}
                    onClick={selectGeoloc}
                  >
                    Autour de moi
                    <i class="bx bx-target-lock bx-sm bx-sm" style={{color:"#fffff", backgroundColor: "#2E4656"}}></i>
                  </Button>
                </div>
              </div>
            )}
          >
            {visibleCities}
          </Select>

          <DatePicker
            className={styles.searchBar}
            suffixIcon={
              <i class="bx bxs-calendar bx-sm style=color:#00ff26"></i>
            }
            format="DD-MM-YYYY"
            placeholder="Date de début"
            onChange={selectStartDate}
            style={{ width: 200 }}
          />
          <DatePicker
            className={styles.searchBar}
            suffixIcon={
              <i class="bx bxs-calendar bx-sm style=color:#00ff26"></i>
            }
            format="DD-MM-YYYY"
            placeholder="Date de fin"
            onChange={selectEndDate}
            style={{ width: 200 }}
          />

          <Select
            className={styles.searchBar}
            mode="multiple"
            allowClear
            style={{ width: "200px" }}
            suffixIcon={<i class="bx bxs-balloon bx-sm style=color:#00ff26" />}
            placeholder="Catégories"
            onChange={selectCategories}
            optionLabelProp="label"
          >
            <Option value="music" label="Musique"></Option>
            <Option value="cinema" label="Cinema"></Option>
            {displayCategories.map((category, i) => (
              <Option key={i} value={category} label={category}>
                {category}
              </Option>
            ))}
          </Select>

          <div className={styles.buttonContainer}>
            <Button className={styles.button} onClick={() => handleClick()}>
              Rechercher
            </Button>
          </div>
        </div>
      </div>
    </ConfigProvider>
  );
}

export default searchBar;
