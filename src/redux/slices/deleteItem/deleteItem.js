import { createSlice } from "@reduxjs/toolkit";

const deleteItemSlice = createSlice({
  name: "deleteItem",
  initialState: {
    item: {},
  },
  reducers: {
    setDeletedItem: (state, action) => {
      state.item = action.payload;
    },
  },
});
export const { setDeletedItem } = deleteItemSlice.actions;
export default deleteItemSlice.reducer;
export const currentItem = (state) => state.deletedItem.item;
