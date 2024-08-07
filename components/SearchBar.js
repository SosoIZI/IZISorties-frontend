
import React from 'react';
import { useEffect, useState } from 'react';
import { Button, Select, RangePicker, DatePicker } from 'antd';
import Multiselect from 'multiselect-react-dropdown';
import { useDispatch, useSelector } from 'react-redux';
import styles from '../styles/Home.module.css';
import { addLongitude, addLatitude, addStartDate, addEndDate, addCategories } from '../reducers/search';


function searchBar() {

// hooks d'états pour mettre à jour le choix des filtres de recherche 

  // const [eventPlace, setEventPlace] = useState([]);
  // const [searchPlace, setSearchPlace] = useState('');
  const [long, setLong] = useState('');
  const [lat, setLat] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [categories, setCategories] = useState([]);


  const { RangePicker } = DatePicker;
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

const checkboxName = [{id: 1, name:'Cinema'}, {id: 2, name:'Musique'}] // noms des catégories à cocher

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

// on sélectionne une date via le calendrier
const selectDate = (e) => {
    for(let i=0; i<e.length; i++) {
      setStartDate(e[0].$d)
      setEndDate(e[1].$d)
    }
    console.log('selected date', startDate, endDate)
}

// on sélectionne une ou plusieurs catégories via la checkbox
const selectCategories = (e) => {
  setCategories(e)
  console.log('selected category') 
}
  
// quand on décoche une case, la catégorie est supprimée de son état
const removeCategory = (e) => {
  setCategories(categories.filter((category) => category ==! e));
  console.log('removed category')
}

// au clic sur le bouton 'rerchercher', on envoie les valeurs dans le reducer
const handleClick = () => {
  console.log('salut')
  dispatch(addLatitude(lat));
  dispatch(addLongitude(long))
  dispatch(addStartDate(startDate));
  dispatch(addEndDate(endDate));
  dispatch(addCategories(categories));
}


    return (
      <div>

    <Select  
         showSearch
         onSelect={selectPlace}
         placeholder="Lieu"
         optionFilterProp="children"
         filterOption={(input, option) => (option?.label ?? '').includes(input)}
         filterSort={(optionA, optionB) =>
           (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
         }
         options={[
          //  {
          //    value: `${eventCities}`,
          //    label: `${eventCities}`,
          //  },
          {
            value: 'Rennes',
            label: 'Rennes',
          },
           
         ]}
   />
  
        <RangePicker onChange={selectDate} />

        <Multiselect 
            // customCloseIcon={<></>}
            showCheckbox
            options={checkboxName} 
            // selectedValues={this.state.selectedValue} // Preselected value to persist in dropdown
            onSelect={selectCategories} 
            onRemove={removeCategory} 
            displayValue="name"
        /> 

        <Button onClick={() => handleClick()}>Rechercher</Button>

</div>
  
    );
  };


export default searchBar;



