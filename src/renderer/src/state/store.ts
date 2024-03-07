import { configureStore } from '@reduxjs/toolkit';
import appModeReducer from './appModeSlice';
import viewReducer from './viewSlice';
import configReducer from './configSlice';
import moviesReducer from './moviesSlice';
import tvReducer from './tvSlice';
import bookmarkedReducer from './bookmarkedSlice';
import tvUiReducer from './tvUiSlice';

const store = configureStore({
    reducer: {
        appMode: appModeReducer,
        view: viewReducer,
        config: configReducer,
        movies: moviesReducer,
        tv: tvReducer,
        bookmarked: bookmarkedReducer,
        tv_ui: tvUiReducer,
    },
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
