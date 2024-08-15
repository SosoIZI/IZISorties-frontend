import { useRouter } from 'next/router';
import styles from '../styles/Results.module.css';
import { useState, useEffect } from 'react';


function View() {
    const router = useRouter();
    const [activeButton, setActiveButton] = useState('results'); // "results" est le bouton par défaut

    useEffect(() => {
        const path = router.pathname.toLowerCase();
        if (path.includes('Map')) {
            setActiveButton('Map');
        } else if (path.includes('Swipe')) {
            setActiveButton('Swipe');
        } else {
            setActiveButton('Results'); // Le bouton "results" est actif par défaut
        }
    }, [router.pathname]);

    const handleButtonClick = (view) => {
        setActiveButton(view); // Met à jour l'état du bouton actif
        router.push(`/${view}`); // Redirection vers la vue
    };

    return (
        <div className={styles.topContainer}>
            <h1>Résultats de la recherche</h1>
            <div className={styles.buttonContainer}>
                <button
                    className={`${styles.button} ${activeButton === 'Results' ? styles.active : styles.inactive}`}
                    onClick={() => handleButtonClick('Results')}
                >
                    Vue Liste
                </button>

                <button
                    className={`${styles.button} ${activeButton === 'Map' ? styles.active : styles.inactive}`}
                    onClick={() => handleButtonClick('Map')}
                >
                    Vue Carte
                </button>

                <button
                    className={`${styles.button} ${activeButton === 'Swipe' ? styles.active : styles.inactive}`}
                    onClick={() => handleButtonClick('Swipe')}
                >
                    Vue Swipe
                </button>
            </div>
        </div>
    );
}

export default View;