import styles from '../styles/Results.module.css';
import "boxicons/css/boxicons.min.css"; 
import React, { useState } from 'react';
import { useSelector } from "react-redux";
import SearchBar from "./SearchBar";
import ResultView from "./ResultView";
import { useLocation, Link } from 'react-router-dom';
import Image from "next/image";
import { useRouter } from 'next/router';


function Swipe() {


    const results = useSelector((state) => state.events.value);

    // State to keep track of how many results to display
    const [numberToShow, setNumberToShow] = useState(0);

    // Sort the results as needed
    let sortedResults = [...results].sort((a, b) => new Date(b.startDate) - new Date(a.startDate));

        // Function to handle "Show More" button click
        const handleSayYes = () => {
            setNumberToShow(prev => prev + 1);
    
        };
    
        const handleSayNo = () => {
            setNumberToShow(prev => prev + 1);
        }

    // Get the results to display based on the current state
    const visibleResults = sortedResults.slice(numberToShow, numberToShow+1).map((data, i) => (
        <div key={i} className={styles.displayContainer}>
        <div className={styles.imgContainer}>
        <Link href={`/event?hash=${data._id}`}>
        <Image 
        src='/IZI_sorties_home.png'
        // src={data.pictures[0]}
        alt={data.eventName}
        width={235}
        height={300}
        className={styles.img}
        /></Link>
        <div className={styles.swipeContainer}>
          {/* <h1>{data.eventName}</h1> */}
          <h1>EVENEMENT MARSEILLE</h1>
          {/* <p>{data.description}</p> */}
          <p>Bien que son site soit occupé dès les temps préhistoriques comme <br />
            en témoigne la grotte Cosquer, la ville est fondée en 600 <br />
            av. J.-C. par des colons grecs venus de Phocée. <br />
            Elle deviendra la principale cité grecque de <br />
            la Méditerranée occidentale <br />
            et principale porte de communication entre <br />
            les civilisations grecque et gauloise.</p>
            <div className={styles.iconContainer}>
                <i onClick={handleSayNo} class='bx bxs-message-square-x bx-lg' style={{ color: '#f24822' }}></i>
                <i onClick={handleSayYes} class='bx bxs-message-square-check bx-lg' style={{ color: '#77C461'}}></i>
            </div>
        </div>
    </div>
</div>
    )
    );


    return (
        <div>
            < SearchBar />
            < ResultView />
           {visibleResults}
            
        </div>
  );
}



export default Swipe;


