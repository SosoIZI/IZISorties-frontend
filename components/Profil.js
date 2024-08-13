import { useRouter } from "next/router";
import styles from "../styles/Profile.module.css";
useRouter;

function Profil() {
  const router = useRouter();
  return (
    <div className={styles.container}>
      <img src="/Profil.png" alt="ProfilPage" width={400} height={400} />

      <div className={styles.buttonContainer}>
        <button onClick={() => router.push("/Home")} className={styles.button}>
          Retourner sur la page d'accueil
        </button>
      </div>
    </div>
  );
}

export default Profil;
