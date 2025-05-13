import { useDispatch, useSelector , useStore } from "react-redux";
import { AppDispatch, RootState , Appstore } from "./store";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector = () => useSelector<RootState>((state) => state);
export const useAppStore = () => useStore<Appstore>();


