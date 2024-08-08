import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: {startDate: null, endDate: null, longitude: null, latitude: null, categories: []}
};

export const searchSlice = createSlice({
    name: 'search',
   
     initialState,
    reducers: {
      addLongitude: (state, action) => {
        state.value.long = action.payload.long;
      },
      addLatitude: (state, action) => {
        state.value.lat = action.payload.lat;
      },
      addStartDate: (state, action) => {
        state.value.startDate = action.payload.startDate;
      },
      addCategories: (state, action) => {
        state.value.categories = state.value.categories.push(action.payload.categories);
      },
      // removeCategories: (state, action) => {
      //   state.value.categories = state.value.categories.filter(e => e ==! action.payload);
      // },
      addEndDate: (state, action) => {
        state.value.endDate = action.payload;
      },


    },
   });
   
   export const { addLongitude, addLatitude, addStartDate, addCategories, removeCategories, addEndDate } = searchSlice.actions;
   export default searchSlice.reducer;
   