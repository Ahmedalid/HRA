import { createSlice } from "@reduxjs/toolkit";
import { getCookies } from "../../../utils/Cookies";
let langChanges;
const getLang = getCookies("lang");
if (!getLang) {
  langChanges = true;
} else if (getLang === "ar") {
  langChanges = true;
} else if (getLang === "en") {
  langChanges = false;
}

export const themeSlice = createSlice({
  name: "theme",
  initialState: {
    show: false,
    showIcon: false,
    rtl: langChanges,
    lang: langChanges ? "ar" : "en",
    switchTab: false,
  },
  reducers: {
    toggleSidebar: (state, action) => {
      state.show = action.payload;
    },
    toggleAccountIcon: (state, action) => {
      state.showIcon = action.payload;
    },
    setRtl: (state, action) => {
      state.rtl = action.payload;
    },
    setCurrentLanguage: (state, action) => {
      state.lang = action.payload;
    },
    setSwitchTab: (state, action) => {
      state.switchTab = action.payload;
    },
  },
});
export const {
  toggleSidebar,
  toggleAccountIcon,
  setRtl,
  setCurrentLanguage,
  setSwitchTab,
} = themeSlice.actions;
export const showSlider = (state) => state.theme.show;
export const showIcon = (state) => state.theme.showIcon;
export const rtl = (state) => state.theme.rtl;
export const lang = (state) => state.theme.lang;
export const switchTab = (state) => state.theme.switchTab;
export default themeSlice.reducer;
