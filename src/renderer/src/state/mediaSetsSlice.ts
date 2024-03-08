import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { MediaSet } from 'src/shared';
import { withObjectKeyAdded, withObjectKeyRemoved } from './stateHelpers';

export interface MediaSetsSliceState {
    bookmarked: MediaSet;
    watched: MediaSet;
}

const initialState: MediaSetsSliceState = {
    bookmarked: {},
    watched: {},
};

export const mediaSetsSlice = createSlice({
    name: 'mediaSets',
    initialState,
    reducers: {
        setBookmarked: (state, action: PayloadAction<MediaSet>) => {
            state.bookmarked = action.payload;
        },
        bookmark: (state, action: PayloadAction<string>) => {
            state.bookmarked = withObjectKeyAdded(
                state.bookmarked,
                action.payload,
            );
        },
        unbookmark: (state, action: PayloadAction<string>) => {
            state.bookmarked = withObjectKeyRemoved(
                state.bookmarked,
                action.payload,
            );
        },
        setWatched: (state, action: PayloadAction<MediaSet>) => {
            state.watched = action.payload;
        },
        watch: (state, action: PayloadAction<string>) => {
            state.watched = withObjectKeyAdded(state.watched, action.payload);
        },
        unwatch: (state, action: PayloadAction<string>) => {
            state.watched = withObjectKeyRemoved(state.watched, action.payload);
        },
    },
});

export const {
    setBookmarked,
    bookmark,
    unbookmark,
    setWatched,
    watch,
    unwatch,
} = mediaSetsSlice.actions;

export default mediaSetsSlice.reducer;
