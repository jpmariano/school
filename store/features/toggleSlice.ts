import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type toggle = {
  open: boolean;
  id: number;
}

export interface toggleArr {
  toggleArr: toggle [];
}

const initialState: toggleArr = {
  toggleArr: []
};

export const ToggleSlice = createSlice({
  name: 'toggle',
  initialState,
  reducers: {
    setToggle: (
      state,
      action: PayloadAction<{ open: boolean, id: number }>
    ) => {
      
      const newToggleArr = [...state.toggleArr];
      newToggleArr[action.payload.id] = action.payload;
      return {
        ...state,
        toggleArr: newToggleArr
      };
    },
  },
});

export default ToggleSlice.reducer;
export const { setToggle } = ToggleSlice.actions;
