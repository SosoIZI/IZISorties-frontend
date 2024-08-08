import { useSelector } from "react-redux";
import React from 'react';
import EventCard from "./EventCard";
import SearchBar from "./SearchBar";
import {useRouter} from "next/router"  // import de useRouter pour afficher une navigation en mode SPA 

function Results() {

    const token = true;    // dans un premier temps: soit le token est false= userNotConnected, soit true=USerConnected =autre header
    const router = useRouter() // pour pouvoir utiliser le hook Router.

    const search = useSelector((state) => state.search.value);

    const findResults = () => {
        fetch(`/${state.search.startDate}/${state.search.endDate}/${state.search.long}/${state.search.lat}`)
        .then(response => response.json())
        .then(data => {
            const results = data.map.slice((data, i) => {
                if (!results) {
                    return  <h1>Aucun évènement ne correspond à votre recherche</h1> 
                } else if (results && token) {
                <EventCard key={i} {...data} />;
                   }
            })
    })
    }

    return (


        <div> 
             < SearchBar />
             {findResults}
             
        </div>
  )
}
        

export default Results 