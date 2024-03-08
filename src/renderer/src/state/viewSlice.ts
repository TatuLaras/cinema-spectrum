import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { View } from '@renderer/common_types';

export interface AppModeState {
    value: View;
}

const initialState: AppModeState = {
    value: 'tv',
};

export const viewSlice = createSlice({
    name: 'view',
    initialState,
    reducers: {
        setView: (state, action: PayloadAction<View>) => {
            state.value = action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { setView } = viewSlice.actions;

export default viewSlice.reducer;
