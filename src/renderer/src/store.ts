import { configureStore } from '@reduxjs/toolkit';
import appModeReducer from './shared/slices/appModeSlice';
import viewReducer from './shared/slices/viewSlice';
import configReducer from './shared/slices/configSlice';
import mediaReducer from './shared/slices/mediaSlice';
import mediaSetsReducer from './shared/slices/mediaSetsSlice';
import tvUiReducer from './shared/slices/tvUiSlice';

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
