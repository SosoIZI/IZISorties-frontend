import CGV from "../components/CGV";
import Head from "next/head";

function CGVpage() {
  return (
    <>
      <Head>
        <meta
          name="description"
          content="Retrouvez les CGV du site IZI-sorties.fr"
        />
        <title>
          IZI-sorties | CGV
        </title>
      </Head>
      <CGV />;
    </>
  );
}

export default CGVpage;
