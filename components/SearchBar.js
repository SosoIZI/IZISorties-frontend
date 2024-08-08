
import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addLongitude, addLatitude, addStartDate, addEndDate, addCategories } from '../reducers/search';
import { Button, Select, DatePicker, ConfigProvider  } from 'antd';
import "boxicons/css/boxicons.min.css";
import styles from '../styles/SearchBar.module.css';
import 'antd/dist/reset.css'
import frFR from 'antd/locale/fr_FR';// Importer la localisation française
import {useRouter} from "next/router"  // import de useRouter pour afficher une navigation en mode SPA 


function searchBar() {

  // hooks d'états pour mettre à jour le choix des filtres de recherche 

  // const [eventPlace, setEventPlace] = useState([]);
  // const [searchPlace, setSearchPlace] = useState('');
  const [long, setLong] = useState(null);
  const [lat, setLat] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [categories, setCategories] = useState([]) 
  const [geoError, setGeoError] = useState(null);
  const [onSelect, setOnselect] = useState(false)

  const dispatch = useDispatch();
  const search = useSelector((state) => state.search.value)

  // à l'affichage du composant, je récupère les villes des events dans la bdd.

  // useEffect(() => {
  //   fetch('/cities')
  //   .then(response => response.json())
  //   .then(data => {
  //     setEventCity(data.city)
  //    });
  // }, []);


  // variable pour afficher les villes dans le sélecteur
  // let eventCities = eventCity.map((data, i) => {
  //   if (data ==! null) {
  //      eventCities =  data[i];
  //   }
  // })


  // fonctions pour filtrer la recherche et mettre à jour les états

  const checkboxName = [{ id: 1, name: 'Cinema' }, { id: 2, name: 'Musique' }] // noms des catégories à cocher
  const router = useRouter()

  // on sélectionne une ville via le menu déroulant, et on récupère long/lat depuis une API 

  const selectPlace = (e) => {
    console.log(e)
    fetch(`https://api-adresse.data.gouv.fr/search/?q=${e}`)
      .then(response => response.json())
      .then(data => {
        let cityData = data.features[0];
        setLong(cityData.geometry.coordinates[0])
        setLat(cityData.geometry.coordinates[1])
      })

    console.log('selected place', long, lat)
  }

  //on récupère la géoloc de l'utilisateur

  const selectGeoloc = () => {
    console.log("selectGeoloc called");

    if ("geolocation" in navigator) {
      console.log("Geolocation is available");

      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log("Position acquired:", position.coords.longitude);
          setLong(position.coords.longitude);
          setLat(position.coords.latitude);
        },
        (error) => {
          console.log("Geolocation error:", error);
          if (error.code === error.PERMISSION_DENIED) {
            setGeoError(
              "Activez la géolocalisation pour obtenir des recommandations près de chez vous"
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
    setStartDate(e)
  }

  const selectEndDate = (e) => {
    setEndDate
  }

  // on sélectionne une ou plusieurs catégories via la checkbox
  //quand on décoche une case, la catégorie est supprimée de son état

  
  const selectCategories = (e) => {
    setCategories(e)
    console.log(categories);
}

const findResults = () => {
  fetch(`events/${startDate}/${endDate}/${long}/${lat}`)
  .then(response => response.json())
  .then(data => {
      // const results = data.map.slice((data, i) => {
      //     if (!results) {
      //         return  <h1>Aucun évènement ne correspond à votre recherche</h1> 
      //     } else if (results && token) {
      //     <EventCard key={i} {...data} />;
      //        }
      // })
      console.log(data)
})
}

  

  // // quand on décoche une case, la catégorie est supprimée de son état
  // const removeCategory = (e) => {
  //   setCategories(categories.filter((category) => category == !e));
  //   console.log('removed category')
  // }

  // au clic sur le bouton 'rerchercher', on envoie les valeurs dans le reducer
  const handleClick = () => {
    console.log('salut')
    // dispatch(addLatitude(lat));
    // dispatch(addLongitude(long))
    // dispatch(addStartDate(startDate));
    // dispatch(addEndDate(endDate));
    // dispatch(addCategories(categories));
    findResults()
    // router.push('/Results')
  }


  return (

  <ConfigProvider locale={frFR}>
    <div className={styles.filterContainer}>
      <div>

        <Select
          className={styles.searchBar}
          showSearch
          onSelect={selectPlace}
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
          format="YYYY-MM-DD"
          placeholder="Date de début"
          onChange={selectStartDate}

        />
        <DatePicker className={styles.searchBar}
          suffixIcon={<i class='bx bxs-calendar bx-sm style=color:#00ff26'></i>}
          format="YYYY-MM-DD"
          placeholder="Date de fin"
          onChange={selectEndDate}
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
          <Option value="Musique" label="Musique"></Option>
          <Option value="Cinéma" label="Cinéma"></Option>
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



