import {
    MediaSet,
    MetadataCollection,
    MovieMetadata,
    TvFolderScanResult,
    TvMetadata,
    UserConfig,
} from 'src/shared';
import store from '../../store';
import { setConfig } from '../slices/configSlice';
import { setBookmarked, setWatched } from '../slices/mediaSetsSlice';
import {
    setCollection,
    setShouldShowTMDBKeyModal,
    setState,
} from '../slices/mediaSlice';

export function refreshLibrary() {
    store.dispatch(setState('loading'));
    window.electron.ipcRenderer
        .invoke('get:mediaData')
        .then((val: MetadataCollection) => {
            store.dispatch(setCollection(val));
            store.dispatch(setState('ready'));
        })
        .catch((err) => {
            store.dispatch(setState('ready'));

            if (err.toString().endsWith('unautheticated')) {
                store.dispatch(setShouldShowTMDBKeyModal(true));
                return;
            }

            console.log(err);
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

export function searchMovie(query: string) {
    return window.electron.ipcRenderer.invoke('misc:searchMovie', query);
}

export function searchTv(query: string) {
    return window.electron.ipcRenderer.invoke('misc:searchTv', query);
}

export function attachMovieId(
    movieId: number,
    filePath: string,
): Promise<MovieMetadata> {
    return window.electron.ipcRenderer.invoke(
        'misc:attachMovieId',
        movieId,
        filePath,
    );
}

export function attachTvId(
    tvShowId: number,
    scanResult: TvFolderScanResult,
): Promise<TvMetadata> {
    return window.electron.ipcRenderer.invoke(
        'misc:attachTvId',
        tvShowId,
        scanResult,
    );
}
