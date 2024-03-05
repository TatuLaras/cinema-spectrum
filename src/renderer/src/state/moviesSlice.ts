import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { MovieMetadata } from 'src/shared';

export interface AppModeState {
    value: MovieMetadata[];
}

const initialState: AppModeState = {
    value: [],
};

export const moviesSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {
        setMovies: (state, action: PayloadAction<MovieMetadata[]>) => {
            state.value = action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { setMovies } = moviesSlice.actions;

export default moviesSlice.reducer;
