import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: []
};

export const eventSlice = createSlice({
    name: 'event',
    initialState,
    reducers: {
      displayEvent: (state, action) => {
        state.value=action.payload // pour ecraser la derniere recherche
    },
  //removeAllEvent: (state) => {
   // state.value = [];}
}
  
  
  
    

});

  
  export const {displayEvent } = eventSlice.actions;
  export default eventSlice.reducer;