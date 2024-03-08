import { configureStore } from '@reduxjs/toolkit';
import appModeReducer from './appModeSlice';
import viewReducer from './viewSlice';
import configReducer from './configSlice';
import mediaReducer from './mediaSlice';
import mediaSetsReducer from './mediaSetsSlice';
import tvUiReducer from './tvUiSlice';

const store = configureStore({
    reducer: {
        appMode: appModeReducer,
        view: viewReducer,
        config: configReducer,
        media: mediaReducer,
        media_sets: mediaSetsReducer,
        tv_ui: tvUiReducer,
    },
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
