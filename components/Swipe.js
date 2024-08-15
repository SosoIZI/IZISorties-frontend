import styles from '../styles/Results.module.css';
import "boxicons/css/boxicons.min.css"; 
import React, { useState, useEffect } from 'react';
import  { useSelector } from 'react-redux';
import SearchBar from "./SearchBar";
import ResultView from "./ResultView";
import { Link } from 'react-router-dom';
import Image from "next/image";
import { useRouter } from 'next/router';

function Swipe() {

    const token = useSelector((state) => state.user.value.token);
    let [isliked, setIsLiked] = useState(false);
    const results = useSelector((state) => state.event.value);
    const router = useRouter()

 

useEffect(() => {

// je récupère les id des event dans reducer pour aller chercher leurs infos
let eventId = results.map((data) => data._id)

fetch(`http://localhost:3000/events/${eventId}`)
  .then((response) => response.json())
  .then((data) => {
    setEventData(data.events)

        // je vais récupérer l'id du user, si cet id est compris dans le NbLike de cet event
        // alors isLiked est true
        fetch(`http://localhost:3000/users/infos/${token}`)
          .then((response) => response.json())
          .then((dataUser) => {
            if (data.events.nbLike) {
              for (const e of data.events.nbLike) {
                if (e == dataUser.user[0]._id) {
                  setIsLiked(true);
                }
              }
            }
          });
      });
}, []);

  // Quand je clique sur le boutton vert, je dois rajouter un like à cet évènement dans la bdd

   const addNewLike = () => {
     setIsLiked(!isliked);
    // Cette route ajoute un like si le token de l'user n'est pas présent dans le tableau nbLike dans la BDD
    // s'il est présent dans le tableau nbLike dans la BDD cette route retire 1 like 
    fetch(`http://localhost:3000/events/like/${token}/${eventId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data)
        })
      }
    

  // //  if (isliked === true) {
  // //    heartStyle = { color: "white" };

     
 // Mise à jour du nombre d'évènements à afficher 
 const [numberToShow, setNumberToShow] = useState(0);

    // Affichage des résultats un par un, de la date la plus proche à la date la plus lointaine au click sur les icones
    let sortedResults = [...results].sort((a, b) => new Date(b.startDate) - new Date(a.startDate));

        // Function to handle "Show More" button click
        const handleSayYes = () => {
            setNumberToShow(prev => prev + 1);
            addNewLike()
            console.log('yes !')
    
            }
    
        const handleSayNo = () => {
            setNumberToShow(prev => prev + 1);
            console.log('no !')
        }


    // Affichage des résultats avec la posisibilité de cliquer sur l'image pour voir la page de l'évènement
    // ainsi que navigation sur les différentes views

    const visibleResults = sortedResults.slice(numberToShow, numberToShow+1).map((data, i) => (

    <div key={i} className={styles.displayContainer}>
        <div className={styles.imgContainer}>
        <Link>
            <Image 
            src={data.pictures[0]}
            alt={data.eventName}
            width={235}
            height={300}
            className={styles.img}
            onClick={() => router.push(`/event/${eventId}`)}
        /></Link>
        </div>

        <div className={styles.swipeContainer}>
          <h1>{data.eventName}</h1>
          <p>{data.description}</p>
        </div>

            <div className={styles.iconContainer}>
                <i onClick={handleSayNo} className='bx bxs-x-circle bx-lg' style={{ color: '#f24822' }}></i>
                <i onClick={handleSayYes} className='bx bxs-heart-circle bx-lg' style={{ color: '#77C461'}}></i>
            </div>

    </div>
)
)
    return (
        <div>
            <SearchBar/>
            <ResultView/>

            {visibleResults}
            
             { numberToShow > sortedResults.length && <h1> Vous avez consultés tous 
              les évènements correspondant à votre recherche. Vous pouvez retrouver vos évènement likés dans votre liste de favoris </h1>}
              
        </div>
  );
}



export default Swipe;


