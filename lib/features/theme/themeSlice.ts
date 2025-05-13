import { createSlice } from "@reduxjs/toolkit";

export interface ThemeState {
    theme: "light" | "dark"
}

export const themeSlice = createSlice({
    name: "theme",
    initialState: {
        theme: "light"
    },
    reducers: {
        changeTheme: (state) => {
            state.theme = state.theme === "light" ? "dark" : "light"
        }
    }
})

export const {changeTheme} = themeSlice.actions
export default themeSlice.reducer