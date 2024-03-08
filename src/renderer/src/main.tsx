import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import store from './state/store';
import { Provider } from 'react-redux';
import {
    getSavedDataFromMain,
    refreshLibrary,
    syncConfigToMain,
    syncBookmarksToMain,
} from './ipcActions';

import './external_css/normalize.css';
import './external_css/Poppins.css';
import './styles/main.scss';
import { enableMapSet } from 'immer';
import KeyboardInput from './KeyboardInput';

enableMapSet();

getSavedDataFromMain();
refreshLibrary();

document.onkeydown = KeyboardInput.handler;

store.subscribe(() => {
    const state = store.getState();
    syncConfigToMain(state.config.value);
    syncBookmarksToMain(state.media_sets.value);
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
);
