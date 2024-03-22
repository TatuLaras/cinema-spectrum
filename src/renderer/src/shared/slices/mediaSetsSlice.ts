import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { MediaSet } from 'src/shared';
import {
    withObjectKeyAdded,
    withObjectKeyRemoved,
} from '../utils/state_helpers';
import { inMediaSet } from '../utils/media_set_utils';

export interface MediaSetsSliceState {
    bookmarked: MediaSet;
    watched: MediaSet;
}

const initialState: MediaSetsSliceState = {
    bookmarked: {},
    watched: {},
};

function toggle(mediaId: string, mediaSet: MediaSet) {
    if (inMediaSet(mediaId, mediaSet))
        return withObjectKeyRemoved(mediaSet, mediaId);
    return withObjectKeyAdded(mediaSet, mediaId);
}

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
        toggleBookmark: (state, action: PayloadAction<string>) => {
            state.bookmarked = toggle(action.payload, state.bookmarked);
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
        toggleWatched: (state, action: PayloadAction<string>) => {
            state.watched = toggle(action.payload, state.watched);
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
    toggleWatched,
    toggleBookmark,
} = mediaSetsSlice.actions;

export default mediaSetsSlice.reducer;
