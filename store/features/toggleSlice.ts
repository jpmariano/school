import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface toggle {
  open: boolean;
  id: string;
}

const initialState: toggle = {
  open: false,
  id: '',
};

export const ToggleSlice = createSlice({
  name: 'toggle',
  initialState,
  reducers: {
    setToggleModal: (
      state,
      action: PayloadAction<{ open: boolean; id: string }>
    ) => {
      return {
        ...state,
        open: action.payload.open,
        id: action.payload.id,
      };
    },
  },
});

export default ToggleSlice.reducer;
export const { setToggleModal } = ToggleSlice.actions;
