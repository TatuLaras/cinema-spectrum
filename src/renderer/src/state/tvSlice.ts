import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TvMetadata } from 'src/shared';

export interface AppModeState {
    value: TvMetadata[];
}


const initialState: AppModeState = {
    value: [],
};

export const tvSlice = createSlice({
    name: 'tv',
    initialState,
    reducers: {
        setTvShows: (state, action: PayloadAction<TvMetadata[]>) => {
            state.value = action.payload;
        },
    },
});

export const { setTvShows } = tvSlice.actions;

export default tvSlice.reducer;
