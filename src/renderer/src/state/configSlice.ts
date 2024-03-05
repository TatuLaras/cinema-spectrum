import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { UserConfig, defaultConfig } from '../../../shared';
import { withValueAppended, withValueRemoved } from './stateHelpers';

export interface AppModeState {
    value: UserConfig;
}

const initialState: AppModeState = {
    value: defaultConfig,
};

function withPathsMoviesSetTo(config: UserConfig, newValue: string[]) {
    return {
        ...config,
        paths: {
            ...config.paths,
            movies: newValue,
        },
    };
}

function withPathsTvSetTo(config: UserConfig, newValue: string[]) {
    return {
        ...config,
        paths: {
            ...config.paths,
            tv: newValue,
        },
    };
}

function withTmdbKeySetTo(config: UserConfig, newValue: string) {
    return {
        ...config,
        tmdb_key: newValue,
    };
}

function withPlayerCommandSetTo(config: UserConfig, newValue: string) {
    return {
        ...config,
        player_command: newValue,
    };
}

export const configSlice = createSlice({
    name: 'config',
    initialState,
    reducers: {
        setConfig: (state, action: PayloadAction<UserConfig>) => {
            state.value = action.payload;
        },
        addMovieFolder: (state, action: PayloadAction<string>) => {
            state.value = withPathsMoviesSetTo(
                state.value,
                withValueAppended(state.value.paths.movies, action.payload),
            );
        },
        removeMovieFolder: (state, action: PayloadAction<string>) => {
            state.value = withPathsMoviesSetTo(
                state.value,
                withValueRemoved(state.value.paths.movies, action.payload),
            );
        },
        addTvFolder: (state, action: PayloadAction<string>) => {
            state.value = withPathsTvSetTo(
                state.value,
                withValueAppended(state.value.paths.tv, action.payload),
            );
        },
        removeTvFolder: (state, action: PayloadAction<string>) => {
            state.value = withPathsTvSetTo(
                state.value,
                withValueRemoved(state.value.paths.tv, action.payload),
            );
        },
        setTmdbKey: (state, action: PayloadAction<string>) => {
            state.value = withTmdbKeySetTo(state.value, action.payload);
        },
        setPlayerCommand: (state, action: PayloadAction<string>) => {
            state.value = withPlayerCommandSetTo(state.value, action.payload);
        },
    },
});

// Action creators are generated for each case reducer function
export const {
    setConfig,
    addMovieFolder,
    addTvFolder,
    removeMovieFolder,
    removeTvFolder,
    setTmdbKey,
    setPlayerCommand,
} = configSlice.actions;

export default configSlice.reducer;
