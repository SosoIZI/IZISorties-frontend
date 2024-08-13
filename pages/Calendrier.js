import Calendrier from "../components/Calendrier";
import Head from "next/head";

function CalendrierPage() {
  return (
    <>
      <Head>
        <title>IZI-sorties | Accède à ton agenda de sorties !</title>
      </Head>
      <Calendrier />;
    </>
  );
}

export default CalendrierPage;
