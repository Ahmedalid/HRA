import { createSlice } from "@reduxjs/toolkit";

const editItemSlice = createSlice({
  name: "editItem",
  initialState: {
    item: {},
    accountItem: {},
  },
  reducers: {
    setItem: (state, action) => {
      state.item = action.payload;
    },
    setAccountItem: (state, action) => {
      state.accountItem = action.payload;
    },
  },
});
export const { setItem, setAccountItem } = editItemSlice.actions;
export default editItemSlice.reducer;
export const currentEditItem = (state) => state.editItem.item;
export const currentAccountItem = (state) => state.editItem.accountItem;
