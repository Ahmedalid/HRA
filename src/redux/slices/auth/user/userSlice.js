import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { getCookies } from "../../../../utils/Cookies";
const { VITE_API_URL } = import.meta.env;
export const currentUser = createAsyncThunk("getCurrentUser", async () => {
  const res = await fetch(`${VITE_API_URL}/user`, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getCookies("token")}`,
    },
  });
  const data = await res.json();
  if (!data.status) {
    toast.error(data.message);
    return;
  }
  return data.data[0];
});

const userSlice = createSlice({
  name: "user",
  initialState: { user: null },
  extraReducers: (builder) => {
    builder.addCase(currentUser.fulfilled, (state, action) => {
      state.user = action.payload;
    });
  },
});
export default userSlice.reducer;
export const loggedInUser = (state) => state;
