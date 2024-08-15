import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: [],
};

export const eventSlice = createSlice({
    name: 'event',
    initialState,
    reducers: {
      displayEvent: (state, action) => {// pour afficher le résultat de la recherche
        state.value=action.payload // pour ecraser la derniere recherche
    },
  //removeAllEvent: (state) => {  // si on veut supprimer toutes les recherches.
   // state.value = [];}
}
  
  

});

  
  export const { displayEvent } = eventSlice.actions;
  export default eventSlice.reducer;