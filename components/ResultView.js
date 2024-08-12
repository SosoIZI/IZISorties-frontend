import styles from '../styles/Results.module.css';
import "boxicons/css/boxicons.min.css"; 
import React, { useState } from 'react';
import SearchBar from "./SearchBar";
import { useLocation, Link } from 'react-router-dom';
import {useRouter} from "next/router";  // import de useRouter pour afficher une navigation en mode SPA 


function View() {

    const location = useLocation();
    const router = useRouter()

    return(
       <div className={styles.topContainer}>
                <h1>Résultats de la recherche</h1>

            {/* Si  */}  
            <div className={styles.buttonContainer}>
                <Link to="/Results">
                <button className={location.pathname === '/Results' ? 'active' : ''}
                handleClick={() => router.push('/Results')}>
                
                    Vue Liste
                </button>
                </Link>
                <Link to="/Map">
                <button className={location.pathname === '/Map' ? 'active' : ''}
                handleClick={() => router.push('/Map')}>
                
                    Vue Carte
                </button>
                </Link>
                <Link to="/Swipe">
                <button className={location.pathname === '/Swipe' ? 'active' : ''}
                handleClick={() => router.push('/Swipe')}>
                
                    Vue Swipe
                </button>
                </Link>
            </div>
        </div>
    )
}

export default View