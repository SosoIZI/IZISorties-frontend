import { useSelector } from "react-redux";
import React from 'react';
import EventCard from "./EventCard";
import SearchBar from "./SearchBar";

function Results() {

    const results = useSelector((state) => state.events.value); 
    
    console.log("results : " , results)

            // const displayResults = results.map((data, i) => {
            //     if (!data) {
            //         return  <h1>Aucun évènement ne correspond à votre recherche</h1> 
            //     } else {
            //     <EventCard key={i} {...data} />;}
            // })

    return (


        <div> 
            < SearchBar /> 
            <h1>Résultats de la recherche</h1>
            {/* {displayResults}  */}
        </div>
  )
}
        

export default Results 