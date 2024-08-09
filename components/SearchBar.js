
import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchEvents } from '../reducers/event';
import { Button, Select, DatePicker, ConfigProvider  } from 'antd';
import "boxicons/css/boxicons.min.css";
import styles from '../styles/SearchBar.module.css';
import 'antd/dist/reset.css';
import frFR from 'antd/locale/fr_FR';// Importer la localisation française
import {useRouter} from "next/router";  // import de useRouter pour afficher une navigation en mode SPA 
import fetch from 'node-fetch';
import dayjs from 'dayjs';
import { addGeoloc } from '../reducers/search';


function searchBar() {

  // hooks d'états pour mettre à jour le choix des filtres de recherche 

  const [long, setLong] = useState(null);
  const [lat, setLat] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [categories, setCategories] = useState([]) 
  const [geoError, setGeoError] = useState(null);

  const [city, setCity] = useState(null);

  const dispatch = useDispatch();
  const signIn = useSelector((state) => state.user.valuetoken)
  const router = useRouter()


  // fonctions pour filtrer la recherche et mettre à jour les états

  const checkboxName = [{ id: 1, name: 'Cinema' }, { id: 2, name: 'Musique' }] // noms des catégories à cocher

  // on sélectionne une ville via le menu déroulant

  const selectCity = (e) => {
    fetch(`https://api-adresse.data.gouv.fr/search/?q=${e}`)
      .then(response => response.json())
      .then(data => {
       setCity(data.features[0].properties.city)
      //  console.log(data.features[0].properties.city)
    
      })
    console.log('selected city', city)
    }

  //on récupère la géoloc de l'utilisateur, et sur la base des coordonnées on récupère la ville où se trouve l'utilisateur

  const selectGeoloc = () => {
    console.log("selectGeoloc called");
  
    if ("geolocation" in navigator) {
      console.log("Geolocation is available");
  
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log("Position acquired:", position.coords.longitude);
          alert('Position acquired')
  
          const longitude = position.coords.longitude;
          const latitude = position.coords.latitude;
          
          setLong(longitude);
          setLat(latitude);
          // setGeoloc(true)
          dispatch(addGeoloc(true))

  
          fetch(`https://api-adresse.data.gouv.fr/reverse/?lon=${longitude}&lat=${latitude}`)
            .then((response) => response.json())
            .then((data) => {
              if (data && data.features && data.features.length > 0) {
                setCity(data.features[0].properties.city);
                console.log('Selected place:', data.features[0].properties.city);
              } else {
                console.log("No place found for the given coordinates.");
              }
            })
        },
        (error) => {
          console.log("Geolocation error:", error);
          if (error.code === error.PERMISSION_DENIED) {
            setGeoError(
              "Activez la géolocalisation"
            );
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
    e = dayjs(e).format('YYYY-MM-DD')
    setStartDate(e)
    console.log(e)
  }

  const selectEndDate = (e) => {
    e = dayjs(e).format('YYYY-MM-DD')
    setEndDate(e)
    console.log(e)
    }

  // on sélectionne une ou plusieurs catégories via la checkbox
  
  const selectCategories = (e) => {
    // e = e.join(', ')
    setCategories(e)
    console.log(categories);
}


//fonction pour chercher les évènements correspondant aux filtres sélectionnés par le user
// le résultat est envoyé dans le reducer events pour les récupérer sur les pages de résultats

const findResults = (query) => {
  fetch(`http://localhost:3000/events/${startDate}/${endDate}/${city}${query}`)
  .then(response => response.json())
  .then(data => {
    console.log("data : ", data.events);

    
    dispatch(searchEvents(data.events))
    
})
}

const handleClick = () => {
  let query = ""
  if(categories.length > 0){
     query = '?categorie=' + categories.join('&categorie=')
  }
  findResults(query)
  // if(!signIn) {
  //   router.push("/Inscription")
  // } else 
  {
    router.push('/Results')
  }
}




  return (

  <ConfigProvider locale={frFR}>
    <div className={styles.filterContainer}>
      <div>

        <Select
          className={styles.searchBar}
          showSearch
          onSelect={selectCity}
          style={{ width: 200 }}
          suffixIcon={<i class='bx bxs-map bx-sm style=color:#00ff26'></i>}
          placeholder="Lieu"
          optionFilterProp="children"
          filterOption={(input, option) => (option?.label ?? '').includes(input)}
          filterSort={(optionA, optionB) =>
            (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
          }
          dropdownRender={menu => (
            <div>
              {menu}
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'nowrap',
                  padding: 8,
                  
                }}
              >
                <Button
                  type="primary"
                  style={{ flex: 'none', padding: '12', width: '100%'}}
                  onClick={selectGeoloc}
                >Autour de moi
                  <i class='bx bx-target-lock bx-sm bx-sm style=color:#00ff26'></i>
                </Button>
              </div>
            </div>
          )}
        >
              <Option value='Rennes'>Paris</Option>
              <Option value="Rennes">Rennes</Option>
        </Select>
      </div>

      
      <div>
        <DatePicker className={styles.searchBar}
          suffixIcon={<i class='bx bxs-calendar bx-sm style=color:#00ff26'></i>}
          format="DD-MM-YYYY"
          placeholder="Date de début"
          onChange={selectStartDate}
          style={{ width: 200 }}

        />
        <DatePicker className={styles.searchBar}
          suffixIcon={<i class='bx bxs-calendar bx-sm style=color:#00ff26'></i>}
          format="DD-MM-YYYY"
          placeholder="Date de fin"
          onChange={selectEndDate}
          style={{ width: 200 }}
        />
      </div>

      <div >
        <Select
          className={styles.searchBar}
          mode="multiple"
          allowClear
          style={{
            width: '200px',
          }}
          suffixIcon={<i class='bx bxs-balloon bx-sm style=color:#00ff26'/>}
          placeholder="Catégories"
          onChange={selectCategories}
          optionLabelProp="label"
        >
          <Option value="music" label="Musique"></Option>
          <Option value="cinema" label="Cinéma"></Option>
        </Select>

      </div>

      

      <div className={styles.buttonContainer}>
        <Button className={styles.button} onClick={() => handleClick()}>Rechercher</Button>
      </div>
    </div>
  </ConfigProvider>
  )
}


export default searchBar;



