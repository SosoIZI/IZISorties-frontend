import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: [date = null, city = null, categories = []],
};

export const eventSlice = createSlice({
    name: 'search',
   
     initialState,
    reducers: {
        addSearch: (state, action) => {
        state.value.date.push(action.payload);
        state.value.city.push(action.payload);
        state.value.categories.push(action.payload)
      },
    },
   });
   
   export const { addSearch } = eventSlice.actions;
   export default eventSlice.reducer;
   