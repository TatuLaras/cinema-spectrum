import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface TvUiState {
    side_panel_open: boolean;
}

const initialState: TvUiState = {
    side_panel_open: false,
};

export const tvUiSlice = createSlice({
    name: 'tvUiState',
    initialState,
    reducers: {
        setSidePanelOpen: (state, action: PayloadAction<boolean>) => {
            state.side_panel_open = action.payload;
        },
        toggleSidePanelOpen: (state) => {
            state.side_panel_open = !state.side_panel_open;
        },
    },
});

export const { setSidePanelOpen, toggleSidePanelOpen } = tvUiSlice.actions;

export default tvUiSlice.reducer;
