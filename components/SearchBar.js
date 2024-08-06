
import React from 'react';
import { useEffect, useState } from 'react';
import { AutoComplete, Button, Select, Checkbox } from 'antd';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Multiselect from 'multiselect-react-dropdown';
import { useDispatch, useSelector } from 'react-redux';
import styles from '../styles/Home.module.css';
import { addSearch } from '../reducers/search';

function searchBar() {
  // hooks d'états pour mettre à jour le choix des filtres de recherche 

  const [place, setPlace] = useState('');
  const [categories, setCategories] = useState([]);
  const [options, setOptions] = useState([]);
  const [date, setDate] = useState(Date);

  const dispatch = useDispatch();
  const event = useSelector((state) => state.search.value)

useEffect(() => {
  fetch('/') 
    .then(response => response.json())
    .then(data => {
      console.log(data)
  });
})
    
  // fonctions pour filtrer la recherche et mettre à jour les états

const checkboxName = [{id: 1, name:'Restaurant'}]

const onSelect = (data) => {
  setCategories(data)
  console.log('selected category', data)
}

const onSelected = (selectedItem) => {
  console.log('selected place', selectedItem)
  setPlace(selectedItem)
}

const onRemove = (removedItem) => {
  console.log('removed', removedItem)
  setCategories(categories.filter((e) => e ==! removedItem))
}

const onChangeDate = (date) => {
  setDate(date)
  console.log('selected', date)
}

  // au clic sur le bouton 'rerchercher', méthode filter pour récupérer les évènements correspondants aux filtres de recherche
  // empêcher les recherches avec choix d'au moins un filtre null

// const handleClick = () => {
//   console.log('salut')
//   dispatch(addSearch())
  
// }


    return (
      <div className={styles.container}>

<Select
         showSearch
         style={{
           width: 200,
         }}
         onSelect={onSelected}
         placeholder="Lieu"
         optionFilterProp="children"
         filterOption={(input, option) => (option?.label ?? '').includes(input)}
         filterSort={(optionA, optionB) =>
           (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
         }
         options={[
           {
             value: '1',
             label: 'Not Identified',
           },
           {
             value: '2',
             label: 'Marseille',
           },
           
         ]}
   />
        <input type='date' onChange={onChangeDate} />  

        <Multiselect
            showCheckbox
            options={checkboxName} 
            // selectedValues={this.state.selectedValue} // Preselected value to persist in dropdown
            onSelect={onSelect} 
            onRemove={onRemove} 
            displayValue="name"
        /> 

        <Button onClick={() => handleClick()}>Rechercher</Button>

</div>
  
    );
  };


  // méthode map pour afficher les cartes des évènements trouvés 

  // const results = data.map ((data, i) => {
  //     retun <Card key={i} />
  // })


// }

export default searchBar;



