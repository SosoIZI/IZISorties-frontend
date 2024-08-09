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
         }
         
      },
    });

  export const { searchEvents } = eventSlice.actions;
  export default eventSlice.reducer;