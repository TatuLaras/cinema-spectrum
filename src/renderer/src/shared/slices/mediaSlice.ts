import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
    MetadataCollection, emptyMetadataCollection
} from '../../../../shared';
import { Status } from '../types/common_types';

export interface MediaState {
    collection: MetadataCollection;
    status: Status;
}

const initialState: MediaState = {
    collection: emptyMetadataCollection,
    status: 'loading',
};

export const moviesSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {
        setCollection: (state, action: PayloadAction<MetadataCollection>) => {
            state.collection = action.payload;
        },
        setState: (state, action: PayloadAction<Status>) => {
            state.status = action.payload;
        },
    },
});

export const { setCollection, setState } = moviesSlice.actions;

export default moviesSlice.reducer;
