import { configureStore } from "@reduxjs/toolkit";
import themeSlice from "./slices/theme/themeSlice";
import { apiSlice } from "./apiSlice";
import editItemsSlice from "./slices/editItems/editItemsSlice";
import deleteItemSlice from "./slices/deleteItem/deleteItem";
import userSlice from "./slices/auth/user/userSlice";
import showDetailsSlice from "./slices/showDetails/showDetailsSlice";
export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    theme: themeSlice,
    user: userSlice,
    editItem: editItemsSlice,
    showDetails: showDetailsSlice,
    deletedItem: deleteItemSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});
