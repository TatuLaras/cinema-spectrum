import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import store from './store';
import { Provider } from 'react-redux';

import './shared/styles/external_css/normalize.css';
import './shared/styles/external_css/Poppins.css';
import './shared/styles/main.scss';
import { enableMapSet } from 'immer';
import KeyboardInput from './shared/classes/KeyboardInput';
import { getSavedDataFromMain, refreshLibrary, syncConfigToMain, syncMediaSetToMain } from './shared/utils/ipc_actions';

enableMapSet();

getSavedDataFromMain();
refreshLibrary();

document.onkeydown = KeyboardInput.handler;

store.subscribe(() => {
    const state = store.getState();
    syncConfigToMain(state.config.value);
    syncMediaSetToMain(state.media_sets.bookmarked, 'bookmarks');
    syncMediaSetToMain(state.media_sets.watched, 'watched');
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
);
