import { useSelector } from "react-redux";
import EventCard from "./EventCard";
import SearchBar from "./SearchBar";
import styles from '../styles/Results.module.css';
import "boxicons/css/boxicons.min.css"
    ; import { useEffect, useState } from "react";

function Results() {

    console.log("mkfsokod");

    const [numberCards, setNumberCards] = useState(15)
    const results = useSelector((state) => state.events.value);
    const [visibleResult, setVisibleResult] = useState([])
    
    
    // on créé une copie du tableau égal à la valeur du reducer & on trie les objets par ordre de datedécroissant
    let sortedResults = [...results].sort((a, b) => new Date(b.startDate) - new Date(a.startDate));


    const handleClick = () => {
        setNumberCards(numberCards + 15)
        displayResults()
    }

    const displayResults = () => {
        if (sortedResults.length > 15) {
            console.log("plus de 15");

            setVisibleResult(sortedResults.slice(0, numberCards))
        } else if (sortedResults.length <= 15) {
            setVisibleResult(sortedResults)
        } else {
            return <h1 key={i}>Aucun évènement ne correspond à votre recherche</h1>;
        }

    }

    useEffect(() => {
        if (sortedResults.length > 15) {
            console.log("plus de 15");
    
            setVisibleResult(sortedResults.slice(0, numberCards))
    
        } else if (results.length <= 15) {
            console.log("moins de 15");
            setVisibleResult(sortedResults)
            // return  <EventCard key={i} {...data}/>
        } else {
            console.log("sinon");
    
            return <h1 key={i}>Aucun évènement ne correspond à votre recherche</h1>;
        }
    } , [])


    const displayVisibleResult = visibleResult.map((data, i) => {
        return <div>
            <div>
                <EventCard key={i} {...data} />
            </div>
            <div>
            <button onClick={() => handleClick()}>Voir plus</button>
            </div>
        </div>
    });

    console.log(displayVisibleResult);
    

    return (

        <div>
            < SearchBar />
            <h1>Résultats de la recherche</h1>
            <div className={styles.buttonContainer}>
                <button className={styles.button}>Vue liste<i class='bx bx-map-alt'></i></button>
                <button className={styles.button}>Vue map<i class='bx bx-list-ul'></i></button>
                <button className={styles.button}>Vue swipe</button>
            </div>
            <div className={styles.displayContainer}>
                {displayVisibleResult}
            </div>
        </div>
    )
}




export default Results 