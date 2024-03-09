import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { MovieMetadata, TvMetadata } from 'src/shared';
import { Status } from '../types/common_types';

export interface MediaState {
    movies: MovieMetadata[];
    tv: TvMetadata[];
    status: Status;
}

const initialState: MediaState = {
    movies: [],
    tv: [],
    status: 'loading',
};

export const moviesSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {
        setMovies: (state, action: PayloadAction<MovieMetadata[]>) => {
            state.movies = action.payload;
        },
        setTvShows: (state, action: PayloadAction<TvMetadata[]>) => {
            state.tv = action.payload;
        },
        setState: (state, action: PayloadAction<Status>) => {
            state.status = action.payload;
        },
    },
});

export const { setMovies, setTvShows, setState } = moviesSlice.actions;

export default moviesSlice.reducer;
