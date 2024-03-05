import { app } from 'electron';
const fs = require('fs');

export const baseMetadataDir = app.getPath('userData') + '/metadata';
export const baseUserDataDir = app.getPath('userData') + '/user_data';

export function initDataFolders() {
    if (!fs.existsSync(baseMetadataDir)) fs.mkdirSync(baseMetadataDir);
    if (!fs.existsSync(baseUserDataDir)) fs.mkdirSync(baseUserDataDir);
}
