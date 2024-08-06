
import React from 'react';
import { useEffect, useState } from 'react';
import { AutoComplete, Button, Select, Checkbox } from 'antd';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Multiselect from 'multiselect-react-dropdown';
import { useDispatch, useSelector } from 'react-redux';
import styles from '../styles/Home.module.css';
import { addCity, addDate, addCategories, removeCategories } from '../reducers/search';

function searchBar(props) {

  // hooks d'états pour mettre à jour le choix des filtres de recherche 

  const [categories, setCategories] = useState([]);
  const [date, setDate] = useState(new Date());
  const [city, setCity] = useState('')

  const dispatch = useDispatch();
  const search = useSelector((state) => state.search.value)

    // fonctions pour filtrer la recherche et mettre à jour les états

const checkboxName = [{id: 1, name:'Restaurant'}]

//on sélectionne une ville via le menu déroulant
const selectCity = () => {
  console.log('selected city')
  setCity(e)
}

// on sélectionne une date via le calendrier
const selectDate = (e) => {
  setDate(e.target.value)
  console.log('selected date')
}

// on sélectionne une ou plusieurs catégories via la checkbox
const selectCategories = (e) => {
  setCategories(categories.push(e))
  console.log('selected category') 
}
  
// quand on décoche une case, la catégorie est supprimée de l'état
const removeCategory = (e) => {
  setCategories(categories.filter((category) => category ==! e));
  console.log('removed category')
}

  // au clic sur le bouton 'rerchercher', méthode filter pour récupérer les évènements correspondants aux filtres de recherche
  // empêcher les recherches avec choix d'au moins un filtre null

const handleClick = () => {
  console.log('salut')
  dispatch(addCity(city));
  dispatch(addDate(date));
  dispatch(addCategories(categories));
}

// / méthode map pour afficher les cartes des évènements trouvés 

  // const results = data.map ((data, i) => {
  //     retun <Card key={i} />
  // })


// }

    return (
      <div>

    <Select  
         showSearch
         onSelect={selectCity}
         placeholder="Lieu"
         optionFilterProp="children"
         filterOption={(input, option) => (option?.label ?? '').includes(input)}
         filterSort={(optionA, optionB) =>
           (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
         }
         options={[
           {
             value: 'null',
             label: 'Not Identified',
           },
           {
             value: 'marseille',
             label: 'Marseille',
           },
           
         ]}
   />
   {/* <FontAwesome name={location} color={}/> */}
        <input type='date' onChange={selectDate} value={date} />  

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



