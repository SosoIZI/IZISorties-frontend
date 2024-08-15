import EventCard from "../components/EventCard";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import styles from "../styles/Home.module.css";
import "boxicons/css/boxicons.min.css";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import ResultView from "./ResultView"
import Connexion from "./Connexion";

const Search = () => {
  const login = useSelector((state) => state.user.value.token);
  const event = useSelector((state) => state.event.value);
  let events = [];

  if (event) {
    //Si event is true alors map les events

    events = event.map((data, i) => {
      return <EventCard key={i} {...data} />; // prend la forme d'Eventcard pour le retourner dans events
    });
  }

  return (
    <>
      <div></div>

<div className={styles.netflixContainer}>
<ResultView />
  {events}
 
   
    </div>
    </>
  );
};

export default Search;
