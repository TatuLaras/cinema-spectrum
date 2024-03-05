import { Bookmarks, MetadataCollection, UserConfig } from 'src/shared';
import { setMovies } from './state/moviesSlice';
import store from './state/store';
import { setTvShows } from './state/tvSlice';
import { setConfig } from './state/configSlice';
import { setBookmarked } from './state/bookmarkedSlice';

export function refreshLibrary() {
    window.electron.ipcRenderer
        .invoke('get:mediaData')
        .then((val: MetadataCollection) => {
            store.dispatch(setMovies(val.movies));
            store.dispatch(setTvShows(val.tv));
        });
}

export function getSavedDataFromMain() {
    window.electron.ipcRenderer.invoke('get:config').then((val: UserConfig) => {
        store.dispatch(setConfig(val));
    });
    window.electron.ipcRenderer.invoke('get:bookmarks').then((val: Bookmarks) => {
        store.dispatch(setBookmarked(val));
    });
}

export function syncConfigToMain(config: UserConfig) {
    window.electron.ipcRenderer.invoke('set:config', config);
}

export function syncBookmarksToMain(bookmarks: Bookmarks) {
    window.electron.ipcRenderer.invoke('set:bookmarks', bookmarks);
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
