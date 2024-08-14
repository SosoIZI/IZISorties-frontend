import "../styles/globals.css";
import Head from "next/head";
import user from "../reducers/user";
import event from "../reducers/event";
import { Provider } from "react-redux";
import { persistStore, persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import storage from "redux-persist/lib/storage";
<<<<<<< HEAD
import 'bootstrap/dist/css/bootstrap.min.css'
import { GoogleOAuthProvider } from '@react-oauth/google';

=======
import "bootstrap/dist/css/bootstrap.min.css";
>>>>>>> c9ab8f0a9c0c18ae6333b6719a718ea35c288c7b

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import Header from "../components/Header";
import Footer from "../components/Footer";

const reducers = combineReducers({ user,event });
const persistConfig = { key: "applicationName", storage };

const store = configureStore({
  reducer: persistReducer(persistConfig, reducers),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

const persistor = persistStore(store);

function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
      <GoogleOAuthProvider clientId="903216192231-20kptc7s73ds7qtdlvmt0qsg64hfnijv.apps.googleusercontent.com">
        <Head>
          <meta
            name="description"
            content="Découvre IZI-sorties, la plateforme incontournable pour planifier tes sorties culturelles et loisirs partout en France. Trouve facilement les événements locaux adaptés à tes envies et préférences, connecte-toi avec une communauté passionnée, et trouve des activités enrichissantes près de chez toi. Simplifie ta recherche de sorties et ne manque plus aucun événement grâce à aux recommandations personnalisées. "
          />
          <title>IZI-sorties | Trouve en 2 clics les meilleures idées de sorties où que tu sois !</title>
        </Head>
        <Header />{" "}
        {/* on importe composant hader et footer pour qu'ils apparaissent dans la structure de toutes les pages*/}
        <div style={{ minHeight: "100vh" }}>
          <Component {...pageProps} />
        </div>
<<<<<<< HEAD
          </GoogleOAuthProvider>

=======
>>>>>>> c9ab8f0a9c0c18ae6333b6719a718ea35c288c7b
        <Footer />
      </PersistGate>
    </Provider>
  );
}

export default App;
