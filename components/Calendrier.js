import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import EventCard from "../components/EventCard";
// https://www.npmjs.com/package/react-calendar (pour le calendrier)
import styles from "../styles/Calendrier.module.css";
import "boxicons/css/boxicons.min.css";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "boxicons/css/boxicons.min.css";
//https://swiperjs.com/react (pour faire défiler les images)
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";

function Calendrier() {
  const token = useSelector((state) => state.user.value.token);
  const [eventsBookedList, setEventsBookedList] = useState([]);
  const [date, setDate] = useState(new Date());
  const [bookedEventsSpecificDate, setBookedEventsSpecificDate] = useState([]);

  useEffect(() => {
    // Je commence par récupérer les évènements bookés
    fetch(`https://izi-sorties-backend.vercel.app/events/bookinglist/booking/user/${token}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("data.eventsBooked", data.eventsBooked);
        // c'est un tableau d'objet avec les events bookés
        setEventsBookedList(data.eventsBooked);
      });
  }, []);

  // Quand eventsBookedList est à jour (dans le 1er useEffect),
  // alors je lance dateClick sur la date du jour pour que les events du jour soient affichés au lancement de la page
  useEffect(() => {
    if (eventsBookedList.length > 0) {
      dateClick(new Date());
    }
  }, [eventsBookedList]);

  // CALENDRIER
  // isSameDay compare deux dates pour vérifier si elles représentent le même jour (année, mois, jour)
  const isSameDay = (d1, d2) =>
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();

  // eventOccursOnDate vérifie si un événement se produit à une date donnée
  const eventOccursOnDate = (event, date) => {
    const eventStartDate = new Date(event.startDate);
    const eventEndDate = new Date(event.endDate);
    return (
      isSameDay(date, eventStartDate) ||
      isSameDay(date, eventEndDate) ||
      (date > eventStartDate && date < eventEndDate)
    );
  };

  // tileContent détermine ce qui doit être affiché dans une cellule du calendrier
  const tileContent = ({ date, view }) => {
    // Si la vue actuelle du calendrier est mensuelle
    // et si l'événement se produit à la date de cette cellule
    if (
      view === "month" &&
      eventsBookedList.some((event) => eventOccursOnDate(event, date))
    ) {
      // alors j'affiche un point sous la date
      return <div className={styles.dot}></div>;
    }
    return null;
  };

  // Au click, je mets à jour la liste des évènements bookedEventsSpecificDate à afficher
  const dateClick = (value) => {
    // au click sur une date, je mets à jour mon état date
    setDate(value);
    // je filtre sur les évènements qui se produisent à cette date
    const filteredEvents = eventsBookedList
      .filter((data) => {
        const eventsEndDate = new Date(data.endDate);
        const eventsStartDate = new Date(data.startDate);
        return (
          value.toDateString() === eventsStartDate.toDateString() ||
          value.toDateString() === eventsEndDate.toDateString() ||
          (value > eventsStartDate && value < eventsEndDate)
        );
      })
      .map((data, i) => (
        <SwiperSlide key={i}>
          <EventCard key={i} {...data} className={styles.blueBackground} />
        </SwiperSlide>
      ));
    // Je mets à jour mon état bookedEventsSpecificDate avec la liste des events correspondant à la date cliquée
    setBookedEventsSpecificDate(filteredEvents);
  };

  // AFFICHAGE DES PROCHAINS EVENTS
  // triés par ordre de date de début (la route le fait)
  const dateToday = new Date();
  const bookedEvents = eventsBookedList.map((data, i) => {
    const eventEndDate = new Date(data.endDate);
    // je n'affiche que les events que j'ai rajouté à mon agenda et dont la date de fin est aujourd'hui ou après
    if (eventEndDate >= dateToday) {
      if (eventsBookedList.length > 5) {
        // s'il y a + de 5 events à venir, j'affiche le résultat en swiper sinon j'affiche les card sans swiper
        return (
          <SwiperSlide key={i}>
            <EventCard key={i} {...data} />
            <br></br>
          </SwiperSlide>
        );
      } else {
        return <EventCard key={i} {...data} />;
      }
    }
    return null;
  });

  let bookingStyle = { color: "#F2AF77" };

  return (
    <div className={styles.CalendrierPageContainer}>
      <div>
        <h1>
          Mon agenda de sorties{" "}
          <i className="bx bx-calendar-plus" style={bookingStyle}></i>
        </h1>
      </div>
      <div className={styles.calendarAndResultContainer}>
        <div className={styles.calendarContainer}>
          <Calendar
            onChange={dateClick}
            value={date}
            tileContent={tileContent}
          />
        </div>
        <div className={styles.bookedEventsSpecificDate}>
          {bookedEventsSpecificDate.length > 0 ? (
            <Swiper
              style={{
                paddingBottom: "30px",
                "--swiper-pagination-color": "#2F4858",
              }}
              pagination={{ clickable: true }}
              modules={[Navigation, Pagination]}
              spaceBetween={10}
              slidesPerView={3}
              navigation={{
                nextEl: ".customnext1",
                prevEl: ".customprev1",
              }}
            >
              {bookedEventsSpecificDate}
            </Swiper>
          ) : (
            <h3>Vous n'avez pas d'évènement planifié à cette date.</h3>
          )}
          <div className={`${styles.customnext1} customnext1`}>
            <i className="bx bx-right-arrow-alt"></i>
          </div>
          <div className={`${styles.customprev1} customprev1`}>
            <i className="bx bx-left-arrow-alt"></i>
          </div>
        </div>
      </div>
      <hr className={styles.hr} />
      <div className={styles.mySoonEventsContainer}>
        <h2>Mes prochaines sorties</h2>
        {eventsBookedList.length > 5 ? (
          <div className={styles.eventsBookedContainer}>
            <Swiper
              style={{
                paddingBottom: "30px",
                "--swiper-pagination-color": "#2F4858",
              }}
              pagination={{ clickable: true }}
              modules={[Navigation, Pagination]}
              spaceBetween={1}
              slidesPerView={5}
              navigation={{
                nextEl: ".customnext2",
                prevEl: ".customprev2",
              }}
            >
              {bookedEvents}
            </Swiper>
            <div className={`${styles.customnext2} customnext2`}>
              <i className="bx bx-right-arrow-alt"></i>
            </div>
            <div className={`${styles.customprev2} customprev2`}>
              <i className="bx bx-left-arrow-alt"></i>
            </div>
          </div>
        ) : (
          <div className={styles.eventsBookedContainer}>{bookedEvents}</div>
        )}
      </div>
    </div>
  );
}

export default Calendrier;
