import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import EventCard from "../components/EventCard";
// https://www.npmjs.com/package/react-calendar
import styles from "../styles/Calendrier.module.css";
import "boxicons/css/boxicons.min.css";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

function Calendrier() {
  console.log("calendar");

  const token = useSelector((state) => state.user.value.token);
  const [eventsBookedList, setEventsBookedList] = useState([]);
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    // Je commence par récupérer les évènements likés
    fetch(`http://localhost:3000/events/bookinglist/user/${token}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("data.eventsBooked", data.eventsBooked);
        // c'est un tableau d'objet avec les events likés
        setEventsBookedList(data.eventsBooked);
      });
  }, []);

  let bookingStyle = { color: "#F2AF77" };
  console.log("hello");

  // PARAMETRAGE DU CALENDRIER
  const dateClick = (value) => {
    setDate(value);
    console.log("Date clicked:", value);

    bookedEventsSpecificDate = eventsBookedList.map((data, i) => {
      const eventsEndDate = new Date(data.endDate);
      const eventsStartDate = new Date(data.startDate);

      if (value <= eventsEndDate && value >= eventsStartDate) {
        return (
          <EventCard key={i} {...data} className={styles.blueBackground} />
        );
      }
    });
  };

  const bookedEventsSpecificDate = eventsBookedList.map((data, i) => {
    const eventsEndDate = new Date(data.endDate);
    const eventsStartDate = new Date(data.startDate);

    if (date <= eventsEndDate && date >= eventsStartDate) {
      return <EventCard key={i} {...data} />;
    }
  });

  const dateToday = new Date();
  // AFFICHAGE DES PROCHAINS EVENTS trié par ordre de date de début (la route le fait)
  const bookedEvents = eventsBookedList.slice(0, 5).map((data, i) => {
    const eventEndDate = new Date(data.endDate);
    // je n'affiche que les events que j'ai rajouté à mon agenda et dont la date de fin est aujourd'hui ou après
    if (eventEndDate >= dateToday) {
      return <EventCard key={i} {...data} />;
    }
  });

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
            tileClassName={({ date, view }) => {
              // Ajouter la classe 'highlight' à la date sélectionnée
              if (
                view === "month" &&
                date.getDate() === 10 &&
                date.getMonth() === 7 &&
                date.getFullYear() === 2016
              ) {
                return "highlight";
              }
            }}
          />
        </div>
        <div className={styles.bookedEventsSpecificDate}>
          {bookedEventsSpecificDate}
        </div>
      </div>
      <hr className={styles.hr} />
      <div className={styles.mySoonEventsContainer}>
        <h2>Mes prochaines sorties</h2>
        <div className={styles.eventsBookedContainer}>{bookedEvents}</div>
      </div>
    </div>
  );
}

export default Calendrier;
