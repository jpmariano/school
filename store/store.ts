import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { ToggleSlice } from "@/store/features/toggleSlice";
import {HtmlCssJsCodeEditorSlice} from "@/store/features/htmlCssJsCodeEditorSlice";

export const store = configureStore({
  reducer: {
    toggle: ToggleSlice.reducer,
    htmlcssjsstate: HtmlCssJsCodeEditorSlice.reducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
