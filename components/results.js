import styles from '../styles/Results.module.css';
import React, { useState } from 'react';
import { useSelector } from "react-redux";
import EventCard from "./EventCard";
import SearchBar from './SearchBar'
import ResultView from "./ResultView";

function Results() {

    const results = useSelector((state) => state.event.value);
    
    // l'état défini le nombre de cartes à afficher
    const [numberToShow, setNumberToShow] = useState(15);

    // la variable trie les résultats en fonction de la date 
    let sortedResults = [...results].sort((a, b) => new Date(b.startDate) - new Date(a.startDate));

    // la variable définie le nombre de résultats à afficher
    const visibleResults = sortedResults.slice(0, numberToShow);

    // la fonction permet d'afficher les résultats suivants
    const handleShowMore = () => {
        setNumberToShow(prev => prev + 15);
    };


    return (
        <div>
            <SearchBar />

                {results.length === 0 ? 

                    <div>
                    <h1>Aucun évènement ne correspond à votre recherche</h1>
                    </div>   :
                
                        <div>
                        <ResultView />

                        <div className={styles.displayContainer}>

                        {/* Afficher les résultats */}
                        {visibleResults.map((data, i) => (
                            <EventCard key={i} {...data} />
                        ))} 
                        
                        </div>

                        <div>

                        {/* Afficher le bouton 'Voir plus'*/}
                        {numberToShow < sortedResults.length && (

                            <div className={styles.btnContainer}>
                                <button  className={styles.button}>
                                    <i 
                                        onClick={handleShowMore} 
                                        class='bx bx-chevron-down bx-xs' 
                                        className={styles.icon}>
                                    </i>
                                        Afficher plus de résultats
                                </button>
                           </div>
                    )}
                </div>
            </div>
        }
    </div>
  );
}

export default Results;


