import styles from '../styles/Results.module.css';
import "boxicons/css/boxicons.min.css"; 
import React, { useState } from 'react';
import SearchBar from "./SearchBar";
import ResultView from "./ResultView";
import { Link } from 'react-router-dom';
import Image from "next/image";

function Swipe() {

    const token = useSelector((state) => state.user.value.token);
    let [isliked, setIsLiked] = useState(false);

  useEffect(() => {
    // je vais récupérer l'id du user, si cet id est compris dans le NbLike de cet event
    // alors isLiked est true
    fetch(`http://localhost:3000/users/infos/${token}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data.user[0]._id)
      if(props.nbLike) {
      for (const e of props.nbLike) {
        if (e==data.user[0]._id) {
          setIsLiked(true)
        }
      } }
    })
      }, [])

    // Quand je clique sur le boutton coeur, je dois rajouter un like à ce tweet dans ma BDD
   const addNewLike = () => {
    setIsLiked(!isliked);
   // Cette route ajoute un like si le token de l'user n'est pas présent dans le tableau nbLike dans la BDD
   // s'il est présent dans le tableau nbLike dans la BDD cette route retire 1 like 
   fetch(`http://localhost:3000/events/like/${token}/${props._id}`, {
     method: "PUT",
     headers: { "Content-Type": "application/json" },
   })
     .then((response) => response.json())
     .then((data) => {
       console.log(data);
     });
  };
    

    // const results = useSelector((state) => state.events.value);
    const results = [
        {
            eventName: 'EVENT MARSEILLE'
        },

        {
            eventName: 'Paris JO'
        },
    ]

    // State to keep track of how many results to display
    const [numberToShow, setNumberToShow] = useState(0);

    // Sort the results as needed
    let sortedResults = [...results].sort((a, b) => new Date(b.startDate) - new Date(a.startDate));

        // Function to handle "Show More" button click
        const handleSayYes = () => {
            setNumberToShow(prev => prev + 1);
            addNewLike()
            console.log('yes !')
        };
    
        const handleSayNo = () => {
            setNumberToShow(prev => prev + 1);
            console.log('no !')
        }

    // Get the results to display based on the current state

    const visibleResults = sortedResults.slice(numberToShow, numberToShow+1).map((data, i) => (

    <div key={i} className={styles.displayContainer}>

        <div className={styles.imgContainer}>
        {/* router.push(`/event/${id}`) */}
        <Link href={`/event?hash=${data._id}`}>
        <Image 
        src='/IZI_sorties_home.png'
        // src={data.pictures[0]}
        alt={data.eventName}
        width={235}
        height={300}
        className={styles.img}
        /></Link>
        </div>

        <div className={styles.swipeContainer}>
          <h1>{data.eventName}</h1>
          {/* <h1>EVENEMENT MARSEILLE</h1> */}
          {/* <p>{data.description}</p> */}
          <p>Bien que son site soit occupé dès les temps préhistoriques comme <br />
            en témoigne la grotte Cosquer, la ville est fondée en 600 <br />
            av. J.-C. par des colons grecs venus de Phocée. <br />
            Elle deviendra la principale cité grecque de <br />
            la Méditerranée occidentale <br />
            et principale porte de communication entre <br />
            les civilisations grecque et gauloise.</p>
        </div>

            <div className={styles.iconContainer}>
                <i onClick={handleSayNo} className='bx bxs-message-square-x bx-lg' style={{ color: '#f24822' }}></i>
                <i onClick={handleSayYes} className='bx bxs-message-square-check bx-lg' style={{ color: '#77C461'}}></i>
            </div>

    </div>
)
);
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


