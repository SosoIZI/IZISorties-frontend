import { useRouter } from 'next/router';
import styles from '../styles/ResultsView.module.css';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import "boxicons/css/boxicons.min.css"

function View() {
    const router = useRouter();
    const [activeButton, setActiveButton] = useState('results'); //État pour suivre le bouton actuellement actif. Initialisé à 'Results' pour que le bouton "Vue Liste" soit actif par défaut.

    useEffect(() => { //se déclenche chaque fois que router.pathname change
       
        const path = router.pathname.toLowerCase();//router.pathname est une propriété du hook useRouter  qui  donne le chemin actuel de l'URL (par exemple, /map ou /swipe).
        if (path.includes('map')) {//.includes() est une méthode de chaîne de caractères qui vérifie si une sous-chaîne spécifique est présente dans la chaîne.
            setActiveButton('map');// si path contient map alors true=== activebutonn map
        } else if (path.includes('swipe')) {
            setActiveButton('swipe');//met à jour la valeur de ActiveButton
        } else {
            setActiveButton('results'); // Le bouton "results" se réinitialise pour être le button par défaut
        }
    }, [router.pathname]);

    const handleButtonClick = (view) => {// view parametre d'appel de la fonction)
        setActiveButton(view.toLowerCase());//toLowerCase() assure que toutes les comparaisons et les mises à jour d'état sont cohérentes, indépendamment des variations de casse dans les URL.
        router.push(`/${view}`, undefined, { shallow: true });//au clic, enclenche le button et déclenche la route associée
        //Le paramètre { shallow: true } permet de changer l'URL sans ajouter une nouvelle entrée dans l'historique du navigateur, ce qui est plus fluide pour les mises à jour d'état en réponse aux changements de chemin.
    };

    return (
        <div className={styles.topContainer}>
            <h1>Résultats de la recherche</h1>
            <div className={styles.buttonContainer}>
                <button
                    className={`${styles.button} ${activeButton === 'results' ? styles.active : styles.inactive}`}
                    onClick={() => handleButtonClick('Results')}
            
                >
                    Vue Liste
                    <span className={styles.icon}>
                    <i class='bx bx-list-ul '></i> </span>
                </button>

                <button
                    className={`${styles.button} ${activeButton === 'map' ? styles.active : styles.inactive}`}
                    onClick={() => handleButtonClick('Map')}
                >
                    Vue Carte
                    <span className={styles.icon}>
                     <i class='bx bx-map-alt '></i>
                     </span>
                </button>

                <button
                    className={`${styles.button} ${activeButton === 'swipe' ? styles.active : styles.inactive}`}
                    onClick={() => handleButtonClick('Swipe')}
                >
                    
                    Vue Swipe
                    <span className={styles.icon}>
                    <i class='bx bxs-hand-right'></i>
                 </span>
                </button>
            
            </div>
        </div>
    );
}

export default View;