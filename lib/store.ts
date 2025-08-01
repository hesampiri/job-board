import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "@/lib/features/theme/themeSlice";
import modalReducer from "@/lib/features/modalSlice";
export const makeStore = () => {
  return configureStore({
    reducer: {
      theme: themeReducer,
      modal: modalReducer,
    },
  });
};

export type Appstore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<Appstore["getState"]>;
export type AppDispatch = Appstore["dispatch"];
