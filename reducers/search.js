import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: {date: null, city: null, categories: []}
};

export const searchSlice = createSlice({
    name: 'search',
   
     initialState,
    reducers: {
      addCity: (state, action) => {
        state.value.city = action.payload;
      },
      addDate: (state, action) => {
        state.value.date = action.payload;
      },
      addCategories: (state, action) => {
        state.value.categories = state.value.categories.push(action.payload);
      },
      // removeCategories: (state, action) => {
      //   state.value.categories = state.value.categories.filter(e => e ==! action.payload);
      // },
    },
   });
   
   export const { addCity, addDate, addCategories, removeCategories } = searchSlice.actions;
   export default searchSlice.reducer;
   