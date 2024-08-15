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

    // je vais récupérer l'id du user, si cet id est compris dans le NbLike de cet event
    // alors isLiked est true 

useEffect(() => {
   
    fetch(`http://localhost:3000/users/infos/${token}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
      console.log(data.user[0]._id)
      // if(results.nbLike) {
      // for (let e of results.nbLike) {
      //   if (e == data.user[0]._id) {
      //     setIsLiked(true)
      //   }
      // } }
  })
}, [])

  // Quand je clique sur le boutton vert, je dois rajouter un like à cet évènement dans la bdd

  //  const addNewLike = () => {
  //    setIsLiked(!isliked);
  //   // Cette route ajoute un like si le token de l'user n'est pas présent dans le tableau nbLike dans la BDD
  //   // s'il est présent dans le tableau nbLike dans la BDD cette route retire 1 like 
  //   fetch(`http://localhost:3000/events/like/${token}/${props._id}`, {
  //     method: "PUT",
  //     headers: { "Content-Type": "application/json" },
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log(data);
  //       console.log(data.user[0]._id)
  //     });
  //  };

  // //  let heartStyle = { color: "white" };
  // //  if (isliked === true) {
  // //    heartStyle = { color: "red" };
  // //  } else {
  // //    heartStyle = { color: "white" };
  // //  }

  //         if(isliked) {
  //           return;
  //         } else {

  //             let eventId = [...results].map((data, i) => data._id)
  //             console.log(eventId)
  //           // Cette route ajoute un like si le token de l'user n'est pas présent dans le tableau nbLike dans la BDD
  //           // s'il est présent dans le tableau nbLike dans la BDD cette route retire 1 like 
  //           fetch(`http://localhost:3000/events/like/${token}/${eventId}`, {
  //             method: "PUT",
  //             headers: { "Content-Type": "application/json" },
  //           })
  //             .then((response) => response.json())
  //             .then((data) => {
  //               console.log(data)
  //             })
  //           }


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
            onClick={() => router.push(`/event/${data._id}`)}
        /></Link>
        </div>

        <div className={styles.swipeContainer}>
          <h1>{data.eventName}</h1>
          <p>{data.description}</p>
        </div>

            <div className={styles.iconContainer}>
                <i onClick={handleSayNo} className='bx bxs-message-square-x bx-lg' style={{ color: '#f24822' }}></i>
                <i onClick={handleSayYes} className='bx bxs-message-square-check bx-lg' style={{ color: '#77C461'}}></i>
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


