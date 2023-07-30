import { StepperSlice } from "@/store/features/stepperSlice";
import { QuestionSlice } from "@/store/features/questionaireSlices";
import { FormNavigationSlice } from "@/store/features/formNavigationSlice";
import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { FormErrorSlice } from "@/store/features/formErrorSlice";
import { AddressSlice } from "@/store/features/addressSlice";
import { AddressErrorSlice } from "@/store/features/addressErrorSlice";
import { DestinationValidSlice } from "@/store/features/destinationValidSlice";
import { QuoteReviewSlice } from "@/store/features/quoteReviewSlice";
import { ToggleSlice } from "@/store/features/toggleSlice";
import { jkTabsSubtitleSlice } from "@/store/features/jkTabsSubtitleSlice";
import { DisableZipStateSlice } from "@/store/features/disableZipState";
import {HtmlCssJsCodeEditorSlice} from "@/store/features/htmlCssJsCodeEditorSlice";

export const store = configureStore({
  reducer: {
    stepper: StepperSlice.reducer,
    questionaire: QuestionSlice.reducer,
    formerror: FormErrorSlice.reducer,
    formnavigation: FormNavigationSlice.reducer,
    Address: AddressSlice.reducer,
    addresserror: AddressErrorSlice.reducer,
    desitinationvalid: DestinationValidSlice.reducer,
    quotereview: QuoteReviewSlice.reducer,
    toggle: ToggleSlice.reducer,
    tabsubtitle: jkTabsSubtitleSlice.reducer,
    disabledzipstate: DisableZipStateSlice.reducer,
    htmlcssjsstate: HtmlCssJsCodeEditorSlice.reducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
