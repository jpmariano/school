import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type HTMLCSSJS = {
    id: number;
    html: string;
    css: string;
    js: string;
  };

  export interface htmlCssJsState {
    scripts: HTMLCSSJS[];
  }
  
  const initialState: htmlCssJsState = {
   scripts: []
  };

  export const HtmlCssJsCodeEditorSlice = createSlice({
    name: 'htmlcssjsstate',
    initialState,
    reducers: {
      addHtmlCssJs: (state, action: PayloadAction<{ id: number, html: string, css: string, js: string }>) => {
          return { 
              ...state, 
              scripts: [ ...state.scripts, action.payload] 
             }
      },
      updateHtmlCssJs: (state, action: PayloadAction<{ id: number, html: string, css: string, js: string }>) => {
  
        const newScripts = [...state.scripts];
        newScripts[action.payload.id] = action.payload;
          return { 
            ...state, 
            scripts: newScripts
          }
      },
    },
  });
  
  export default HtmlCssJsCodeEditorSlice.reducer;
  export const { addHtmlCssJs,  updateHtmlCssJs} = HtmlCssJsCodeEditorSlice.actions;