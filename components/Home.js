import EventCard from "../components/EventCard";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import styles from "../styles/Home.module.css";
import "boxicons/css/boxicons.min.css";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import Connexion from "./Connexion";
import { useSelector } from "react-redux";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

function Home() {
  //const [currentPosition, setCurrentPosition] = useState(null);
  const [geoError, setGeoError] = useState(null);
  const [topEvent, setTopEvent] = useState([]);
  const [eventThisWeek, setEventThisWeek] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const router = useRouter();

  const event = useSelector((state) => state.event.value);
  let events = [];
  if (event) { //Si event is true alors map les events 
    
    events = event.map((data, i) => {
      return <EventCard key={i} {...data} />;// prend la forme d'Eventcard pour le retourner dans events 
    });
  }

  const handleClose = () => setModalVisible(false);
  const login = useSelector((state) => state.user.value.token); // pour utiliser la modal dans event

  const handleShow = () => {
    login ? setModalVisible(false) : setModalVisible(true);
  };

  console.log("modal visible : ", modalVisible);
  
  useEffect(() => {
    // d'abord je charge les 5 events les + likés
    fetch("http://localhost:3000/events/top/liked")
      .then((response) => response.json())
      .then((data) => {
        setTopEvent(data.events);
      });

    // ensuite je vais afficher les 5 events de la semaine près de la localisation du l'utilisateur
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // 1- je récupère la géoloc de l'utilisateur
          const { latitude, longitude } = position.coords;
          //setCurrentPosition(position.coords);
          // 2- je récupère la date du jour et la date du prochain dimanche pour avoir les events de la semaine.
          let today = new Date();
          let nextSunday = new Date(today);
          nextSunday.setDate(today.getDate() + (7 - today.getDay()));
          // 3- Je formate les dates pour les passer à la route
          const startDate = today.toISOString().split("T")[0];
          const endDate = nextSunday.toISOString().split("T")[0];
          // 3- je lance ma route
          fetch(
            `http://localhost:3000/events/${startDate}/${endDate}/${longitude}/${latitude}`
          )
            .then((response) => response.json())
            .then((data) => {
              setEventThisWeek(data.events);
            });
        },
        (error) => {
          if (error.code === error.PERMISSION_DENIED) {
            Swal.fire({
              title: "Géolocalisation désactivée",
              text: "Activez la géolocalisation pour obtenir des recommandations près de chez vous.",
              icon: "warning",
              confirmButtonText: "OK",
              confirmButtonColor: "rgb(46, 70, 86)",
            });
          } else {
            Swal.fire({
              title: "Erreur de géolocalisation",
              text: "Une erreur est survenue lors de la tentative de géolocalisation.",
              icon: "error",
              confirmButtonText: "OK",
              confirmButtonColor: "rgb(46, 70, 86)",
            });
          }
        },
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      );
    } else {
      Swal.fire({
        title: "Géolocalisation non disponible",
        text: "Votre navigateur ne prend pas en charge la géolocalisation.",
        icon: "error",
        confirmButtonText: "OK",
        confirmButtonColor: "rgb(46, 70, 86)",
      });
    }
  }, []);
  let topEventCards = " ";
  let isConnected = login;
  if (!isConnected) {
    topEventCards = topEvent.slice(0, 5).map((data, i) => {
      return (
        <SwiperSlide>
          <EventCard key={i} {...data} handleShow={handleShow} />
          {/* // props à passer pour utiliser la modal  */}
        </SwiperSlide>
      );
    });
  } else {
    topEventCards = topEvent.map((data, i) => {
      return (
        <SwiperSlide>
          <EventCard
            key={i}
            {...data} // if login est rempli=isconnected =pas modale
            handleShow={handleShow}
          />
          {/* // props à passer pour utiliser la modal  */}
        </SwiperSlide>
      );
    });
  }

  // les sorties près de chez toi cette semaine.
  // si l'utilisateur a accepté d'être géoloc, alors afficher "les sorties de cette semaine, près de chez toi"
  // sinon, l'inviter à activer sa géoloc pour obtenir de meilleures reco.

  console.log("eventThisWeek : ", eventThisWeek);
  const thisWeekEventCards = eventThisWeek ? (
    eventThisWeek.slice(0, 5).map((data, i) => {
      return (
        <EventCard
          key={i}
          {...data}
          isConnected={login != null}
          handleShow={handleShow}
        />
      );
    })
  ) : (
    <p>   </p>
  );
  return (
    <div className={styles.netflixContainer}>
      {events}
      <h2>Evènements les plus consultés en France:</h2>
      <div className={styles.mostConsultedContainer}>
        <Swiper
          modules={[Navigation]}
          spaceBetween={50}
          slidesPerView={5}
          navigation
        >
          {topEventCards}
        </Swiper>

        {!login && (
          <div>
            <button className={styles.roundButton} onClick={handleShow}>
              <i className="bx bx-right-arrow-alt"></i>
            </button>
          </div>
        )}

        <Connexion
          showModal={modalVisible}
          handleClose={handleClose}
          isConnected={login != null}
        />
      </div>
      {/* Au clic sur le bouton fait apparaitre la modal de connection si pas connecte, sinon fait disparaitre le bouton */}
  

       
      {/* j'affiche les suggestions des events près de chez moi cette semaine, si j'ai bien récupéré la géoloc
      et si il y a des events près de chez moi cette semaine */}
      {geoError || thisWeekEventCards.length == 0 ? (
        <p>{geoError}</p>
      ) : (
        <>
        

          <h2>Les sorties de cette semaine, près de chez toi :</h2>
          <div className={styles.mostConsultedContainer}>
            {thisWeekEventCards}
            <div>
              <button name='defilement des évènements vers la droite' className={styles.roundButton}>
                <i className="bx bx-right-arrow-alt"></i>
              </button>
            </div>
          </div>
        </>
      )}
      <div className={styles.marketingContainer}>
        <Image
          src="/IZI_sorties_home.png"
          alt="Logo"
          width={600}
          height={476}
          className={styles.pic}
        />
        <div className={styles.argumentationContainer}>
          <h2>IZI te facilite la vie !</h2>
          <p>
            Votre compagnon idéal pour toutes vos sorties culturelles et de
            loisirs en France <br></br>
            Vous êtes à la recherche de nouvelles activités passionnantes et de
            sorties captivantes ? <br></br>
            IZI est là pour vous ! <br></br>
            Notre plateforme centralise les meilleures idées de sorties
            culturelles et de loisirs, vous offrant des recommandations
            personnalisées selon vos préférences et votre localisation.{" "}
            <br></br>
            Fini les heures passées à chercher quoi faire ce week-end !{" "}
            <br></br>
            Avec IZI, trouvez rapidement et simplement des événements qui
            correspondent à vos envies.
          </p>

          <button
            onClick={() => router.push("/Inscription")}
            className={styles.inscriptionButton}
            name='inscription'
          >
            Je m'inscris !
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
