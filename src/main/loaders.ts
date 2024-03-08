import { defaultConfig, MediaSet, UserConfig } from '../shared';
import { Loader } from './Loader';

export const configLoader = new Loader<UserConfig>('user_config.json', defaultConfig);
export const bookmarksLoader = new Loader<MediaSet>('bookmarks.json', {});
export const watchedLoader = new Loader<MediaSet>('watched.json', {});

export function saveAllLoaders(){
    configLoader.save();
    bookmarksLoader.save();
    watchedLoader.save();
}