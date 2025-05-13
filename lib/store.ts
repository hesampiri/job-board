import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "@/lib/features/theme/themeSlice";
export const makeStore = () => {
  return configureStore({
    reducer: {
      theme: themeReducer,
    },
  });
};

export type Appstore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<Appstore["getState"]>;
export type AppDispatch = Appstore["dispatch"];
