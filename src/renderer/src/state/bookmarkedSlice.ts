import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Bookmarks } from 'src/shared';

export interface BookmarkedState {
    value: Bookmarks;
}

const initialState: BookmarkedState = {
    value: {},
};

export const bookmarkedSlice = createSlice({
    name: 'tv',
    initialState,
    reducers: {
        setBookmarked: (state, action: PayloadAction<Bookmarks>) => {
            state.value = action.payload;
        },
        bookmark: (state, action: PayloadAction<string>) => {
            state.value = {
                ...state.value,
                [action.payload]: {}
            };
        },
        unbookmark: (state, action: PayloadAction<string>) => {
            const newState = JSON.parse(JSON.stringify(state.value));
            delete newState[action.payload];
            state.value = newState;
        },
    },
});

export const { setBookmarked, bookmark, unbookmark } = bookmarkedSlice.actions;

export default bookmarkedSlice.reducer;
