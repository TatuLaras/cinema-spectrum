import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TAppMode } from '@renderer/common_types';

export interface AppModeState {
    value: TAppMode;
}

const initialState: AppModeState = {
    value: 'desktop',
};

export const appModeSlice = createSlice({
    name: 'appMode',
    initialState,
    reducers: {
        setAppMode: (state, action: PayloadAction<TAppMode>) => {
            state.value = action.payload;
        },
        toggleAppMode: (state) => {
            state.value = state.value === 'tv' ? 'desktop' : 'tv';
        },
    },
});

export const { setAppMode, toggleAppMode } = appModeSlice.actions;

export default appModeSlice.reducer;
