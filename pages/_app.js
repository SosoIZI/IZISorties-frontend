import "../styles/globals.css";
import Head from "next/head";
import user from "../reducers/user";
import { Provider } from "react-redux";
import { persistStore, persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import storage from "redux-persist/lib/storage";
import 'bootstrap/dist/css/bootstrap.min.css'

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import Header from "../components/Header";
import Footer from "../components/Footer";

const reducers = combineReducers({ user });
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
        <Head>
          <title></title>
        </Head>
        <Header />     {/* on importe composant hader et footer pour qu'ils apparaissent dans la structure de toutes les pages*/}
        <div style={{ minHeight: "100vh" }}>
          <Component {...pageProps} />
        </div>

        <Footer />
      </PersistGate>
    </Provider>
  );
}

export default App;
