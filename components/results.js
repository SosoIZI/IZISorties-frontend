import styles from '../styles/Results.module.css';
import "boxicons/css/boxicons.min.css"; 
import React, { useState } from 'react';
import { useSelector } from "react-redux";
import EventCard from "./EventCard";
import ResultView from "./ResultView";
import {useRouter} from "next/router";  // import de useRouter pour afficher une navigation en mode SPA 

function Results() {

    const results = useSelector((state) => state.events.value);

    // State to keep track of how many results to display
    const [numberToShow, setNumberToShow] = useState(15);

    // Sort the results as needed
    let sortedResults = [...results].sort((a, b) => new Date(b.startDate) - new Date(a.startDate));

    // Get the results to display based on the current state
    const visibleResults = sortedResults.slice(0, numberToShow);

    // Function to handle "Show More" button click
    const handleShowMore = () => {
        setNumberToShow(prev => prev + 15);
    };

    return (
        <div>
            
            < ResultView />

            <div className={styles.displayContainer}>

            {/* Afficher les résultats */}
            {visibleResults.map((data, i) => (
                <EventCard key={i} {...data} />
            ))}

            <div>

            {/* Afficher le bouton 'Voir plus'*/}
            {numberToShow < sortedResults.length && (
                <button onClick={handleShowMore}>Voir plus</button>
            )}
            
            </div>
        </div>
    </div>
  );
}

export default Results;



//     const [numberCards, setNumberCards] = useState(0)
//     const [visibleResult, setVisibleResult] = useState([])
    
//     // on créé une copie du tableau égal 'value' du reducer & on trie les objets par ordre de datedécroissant
//     const results = useSelector((state) => state.events.value);
//     let sortedResults = [...results].sort((a, b) => new Date(b.startDate) - new Date(a.startDate));

//     useEffect(() => {

//         sortedResults.slice(numberCards, numberCards+15).map((data, i) => {
//             setVisibleResult(data)
//             if (results.length <= 15)
//                 { return <EventCard key={i} {...sortedResults} />
//             } else if (results.length > 15)
//                 { return <EventCard key={i} {...data} />
//             } else { return <h1 key={i}>Aucun évènement ne correspond à votre recherche</h1>}
//           });

//     }, [])

//     let newResults = sortedResults.slice(numberCards, numberCards+15).map((newData, i) => {
//         setVisibleResult([...visibleResult, newData])
//         if (results.length <= 15)
//             { return <EventCard key={i} {...sortedResults} />
//         } else if (results.length > 15)
//             { return <EventCard key={i} {...visibleResult} />
//         } else { return <h1 key={i}>Aucun évènement ne correspond à votre recherche</h1>}
//       });   


//     const handleShowMore = () => {
//         setNumberCards(numberCards + 15)
//         newResults()
//     }

    
//     return (
//         <div>
//             < SearchBar />
//             <h1>Résultats de la recherche</h1>
//             <div className={styles.buttonContainer}>
//                 <button className={styles.button}>Vue liste<i class='bx bx-map-alt'></i></button>
//                 <button className={styles.button}>Vue map<i class='bx bx-list-ul'></i></button>
//                 <button className={styles.button}>Vue swipe</button>
//             </div>
//             <div className={styles.displayContainer}>
//                 { newResults}
//                 { numberCards < sortedResults.length &&  (<button onClick={() => handleShowMore()} className={styles.button}><i class='bx bx-chevron-down bx-sm'></i>Voir plus</button> )}
//             </div>
//         </div>
//     )
// }


// export default Results 