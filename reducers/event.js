import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: [],
};

export const eventSlice = createSlice({
    name: 'events',
    initialState,
    reducers: {
         searchEvents: (state, action) => {
            state.value = action.payload
         },
         addCoords: (state, action) => {
          state.value.place = {longitude: action.payload.longitude, latitude: action.payload.latitude}
         }
         
      },
    });

  export const { searchEvents } = eventSlice.actions;
  export default eventSlice.reducer;