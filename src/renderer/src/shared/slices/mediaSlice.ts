import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
    MetadataCollection,
    MovieMetadata,
    TvFolderScanResult,
    TvMetadata,
    getEmptyMetadataCollection,
} from '../../../../shared';
import { Status } from '../types/common_types';
import { withValueAppended, withValueRemoved } from '../utils/state_helpers';

export interface MediaState {
    collection: MetadataCollection;
    status: Status;
    shouldShowTMDBKeyModal: boolean;
}

const initialState: MediaState = {
    collection: getEmptyMetadataCollection(),
    status: 'loading',
    shouldShowTMDBKeyModal: false,
};

function withUnknownMoviesSetTo(
    target: MetadataCollection,
    value: string[],
): MetadataCollection {
    return {
        ...target,
        unknown: {
            ...target.unknown,
            movie_files: value,
        },
    };
}

function withUnknownTvSetTo(
    target: MetadataCollection,
    value: TvFolderScanResult[],
): MetadataCollection {
    return {
        ...target,
        unknown: {
            ...target.unknown,
            tv: value,
        },
    };
}

export const moviesSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {
        setCollection: (state, action: PayloadAction<MetadataCollection>) => {
            state.collection = action.payload;
        },
        addMovie: (state, action: PayloadAction<MovieMetadata>) => {
            state.collection.movies = withValueAppended(
                state.collection.movies,
                action.payload,
            );
        },
        addTvShow: (state, action: PayloadAction<TvMetadata>) => {
            state.collection.tv = withValueAppended(
                state.collection.tv,
                action.payload,
            );
        },
        setState: (state, action: PayloadAction<Status>) => {
            state.status = action.payload;
        },
        setShouldShowTMDBKeyModal: (state, action: PayloadAction<boolean>) => {
            state.shouldShowTMDBKeyModal = action.payload;
        },
        deleteUnknownMovie: (state, action: PayloadAction<string>) => {
            state.collection = withUnknownMoviesSetTo(
                state.collection,
                withValueRemoved(
                    state.collection.unknown.movie_files,
                    action.payload,
                ),
            );
        },
        deleteUnknownTvShow: (
            state,
            action: PayloadAction<TvFolderScanResult>,
        ) => {
            state.collection = withUnknownTvSetTo(
                state.collection,
                state.collection.unknown.tv.filter(
                    (val) => val.folder !== action.payload.folder,
                ),
            );
        },
    },
});

export const {
    setCollection,
    setState,
    deleteUnknownMovie,
    deleteUnknownTvShow,
    addMovie,
    addTvShow,
    setShouldShowTMDBKeyModal,
} = moviesSlice.actions;

export default moviesSlice.reducer;
