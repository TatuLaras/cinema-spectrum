import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { View } from '../types/common_types';

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

export const { setView } = viewSlice.actions;

export default viewSlice.reducer;
