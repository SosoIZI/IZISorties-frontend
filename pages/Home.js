import Home from "../components/Home";
import Head from "next/head";

function HomePage() {
  return (
    <>
      <Head>
        <title>
          IZI-sorties | Trouve en 2 clics les meilleures idées de sorties où que
          tu sois !
        </title>
        <meta
          name="description"
          content="Découvre IZI-sorties, la plateforme incontournable pour planifier tes sorties culturelles et loisirs partout en France. Trouve facilement les événements locaux adaptés à tes envies et préférences, connecte-toi avec une communauté passionnée, et trouve des activités enrichissantes près de chez toi. Simplifie ta recherche de sorties et ne manque plus aucun événement grâce à aux recommandations personnalisées. "
        />
      </Head>
      <Home />;
    </>
  );
}

export default HomePage;
