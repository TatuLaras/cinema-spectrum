import { MediaSet, MetadataCollection, UserConfig } from 'src/shared';
import store from '../../store';
import { setConfig } from '../slices/configSlice';
import { setBookmarked, setWatched } from '../slices/mediaSetsSlice';
import { setCollection, setState } from '../slices/mediaSlice';

export function refreshLibrary() {
    store.dispatch(setState('loading'));
    window.electron.ipcRenderer
        .invoke('get:mediaData')
        .then((val: MetadataCollection) => {
            store.dispatch(setCollection(val));
            store.dispatch(setState('ready'));
        });
}

export function getSavedDataFromMain() {
    window.electron.ipcRenderer.invoke('get:config').then((val: UserConfig) => {
        store.dispatch(setConfig(val));
    });
    window.electron.ipcRenderer
        .invoke('get:bookmarks')
        .then((val: MediaSet) => {
            store.dispatch(setBookmarked(val));
        });
    window.electron.ipcRenderer.invoke('get:watched').then((val: MediaSet) => {
        store.dispatch(setWatched(val));
    });
}

export function syncConfigToMain(config: UserConfig) {
    window.electron.ipcRenderer.invoke('set:config', config);
}

export function syncMediaSetToMain(
    bookmarks: MediaSet,
    type: 'bookmarks' | 'watched',
) {
    window.electron.ipcRenderer.invoke('set:' + type, bookmarks);
}

export function closeApp() {
    window.electron.ipcRenderer.send('window:close');
}

export function minimize() {
    window.electron.ipcRenderer.send('window:minimize');
}

export function maximize() {
    window.electron.ipcRenderer.send('window:maximize');
}

export function playFile(file_path: string) {
    window.electron.ipcRenderer.invoke('misc:play', file_path);
}
