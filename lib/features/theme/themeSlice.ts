import { createSlice } from "@reduxjs/toolkit";

export interface ThemeState {
  theme: "light" | "dark";
}
const initialTheme = "light";

const themeSlice = createSlice({
  name: "theme",
  initialState: {
    theme: initialTheme,
  },
  reducers: {
    changeTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";
      if (typeof window !== "undefined") {
        localStorage.setItem("theme", state.theme);
      }
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
      if (typeof window !== "undefined") {
        localStorage.setItem("theme", action.payload);
      }
    },
  },
});

export const { changeTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;
