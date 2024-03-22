import { app, shell, BrowserWindow, ipcMain, dialog } from 'electron';
import { join } from 'path';
import { electronApp, optimizer, is } from '@electron-toolkit/utils';
import { MediaSet, TvFolderScanResult, UserConfig } from '../shared';
import scanFolders from './folder_scan';
import { initDataFolders } from './data_folders';
import { Metadata } from './metadata';
import {
    configLoader,
    bookmarksLoader,
    saveAllLoaders,
    watchedLoader,
} from './loaders';
import { TMDB } from './tmdb';

const { exec } = require('node:child_process');

initDataFolders();

let mainWindow: BrowserWindow | null = null;
function createWindow(): void {
    // import icon from '../../resources/icon.png?asset';
    mainWindow = new BrowserWindow({
        width: 900,
        minWidth: 1000,
        height: 670,
        minHeight: 850,
        frame: false,
        // ...(process.platform === 'linux' ? { icon } : {}),
        webPreferences: {
            preload: join(__dirname, '../preload/index.js'),
            sandbox: false,
        },
    });

    mainWindow.on('ready-to-show', () => {
        mainWindow!.show();
    });

    mainWindow.webContents.setWindowOpenHandler((details) => {
        shell.openExternal(details.url);
        return { action: 'deny' };
    });

    // HMR for renderer base on electron-vite cli.
    // Load the remote URL for development or the local html file for production.
    if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
        mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL']);
    } else {
        mainWindow.loadFile(join(__dirname, '../renderer/index.html'));
    }
}

app.whenReady().then(() => {
    electronApp.setAppUserModelId('com.electron');

    app.on('browser-window-created', (_, window) => {
        optimizer.watchWindowShortcuts(window);
    });

    createWindow();

    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on('window-all-closed', () => {
    closeApp();
});

function closeApp() {
    saveAllLoaders();
    app.quit();
}

ipcMain.on('window:close', () => {
    closeApp();
});

ipcMain.on('window:minimize', () => {
    mainWindow?.minimize();
});

ipcMain.on('window:maximize', () => {
    mainWindow?.isMaximized()
        ? mainWindow?.unmaximize()
        : mainWindow?.maximize();
});

ipcMain.handle('dialog:selectFolder', async () => {
    const result = await dialog.showOpenDialog({
        properties: ['openDirectory'],
    });
    return result.filePaths[0];
});

ipcMain.handle('get:config', () => configLoader.get());

ipcMain.handle('set:config', async (_, config: UserConfig) =>
    configLoader.set(config),
);

ipcMain.handle('get:bookmarks', () => bookmarksLoader.get());

ipcMain.handle('set:bookmarks', async (_, bookmarks: MediaSet) => {
    bookmarksLoader.set(bookmarks);
});

ipcMain.handle('get:watched', () => watchedLoader.get());

ipcMain.handle('set:watched', async (_, watched: MediaSet) => {
    watchedLoader.set(watched);
});

ipcMain.handle('get:mediaData', async () => {
    const scan = scanFolders();
    return await Metadata.getMetadata(scan);
});

ipcMain.handle('misc:play', async (_, filePath: string) => {
    exec(`${configLoader.get().player_command} "${filePath}"`);
});

ipcMain.handle('misc:searchMovie', async (_, query: string) => {
    const result = await TMDB.searchMovie({ query: query });
    return result;
});

ipcMain.handle('misc:searchTv', async (_, query: string) => {
    const result = await TMDB.searchTvShow(query);
    return result;
});

ipcMain.handle(
    'misc:attachMovieId',
    async (_, movieId: number, filePath: string) =>
        Metadata.getMovieMetadataById(filePath, movieId),
);

ipcMain.handle(
    'misc:attachTvId',
    async (_, tvShowId: number, scanResult: TvFolderScanResult) =>
        Metadata.getTvMetadataById(scanResult, tvShowId),
);
