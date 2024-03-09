import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AppMode } from '@renderer/common_types';

export interface AppModeState {
    value: AppMode;
}

const initialState: AppModeState = {
    value: 'desktop',
};

export const appModeSlice = createSlice({
    name: 'appMode',
    initialState,
    reducers: {
        setAppMode: (state, action: PayloadAction<AppMode>) => {
            state.value = action.payload;
        },
        toggleAppMode: (state) => {
            state.value = state.value === 'tv' ? 'desktop' : 'tv';
        },
    },
});

export const { setAppMode, toggleAppMode } = appModeSlice.actions;

export default appModeSlice.reducer;
