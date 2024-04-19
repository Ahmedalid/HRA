import { createSlice } from "@reduxjs/toolkit";

const showDetailsSlice = createSlice({
  name: "showDetails",
  initialState: {
    item: {},
  },
  reducers: {
    setCurrentShowDetails: (state, action) => {
      state.item = action.payload;
    },
  },
});
export const { setCurrentShowDetails } = showDetailsSlice.actions;
export default showDetailsSlice.reducer;
export const currentShowDetails = (state) => state.showDetails.item;
