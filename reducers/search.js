import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: {geoloc: null}
};

export const searchSlice = createSlice({
    name: 'search',
   
     initialState,
    reducers: {
    //   addLongitude: (state, action) => {
    //     state.value.long = action.payload.long;
    //   },
    //   addLatitude: (state, action) => {
    //     state.value.lat = action.payload.lat;
    //   },
    //   addStartDate: (state, action) => {
    //     state.value.startDate = action.payload.startDate;
    //   },
    //   addCategories: (state, action) => {
    //     state.value.categories = state.value.categories.push(action.payload.categories);
    //   },
      // removeCategories: (state, action) => {
      //   state.value.categories = state.value.categories.filter(e => e ==! action.payload);
      // },
    //   addEndDate: (state, action) => {
    //     state.value.endDate = action.payload;
    //   },
    addGeoloc: (state, action) => {
        state.value.geoloc = action.payload
    }


    },
   });
   
   export const {  } = searchSlice.actions;
   export default searchSlice.reducer;
   