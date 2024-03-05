import { defaultConfig, Bookmarks, UserConfig } from '../shared';
import { Loader } from './Loader';

export const configLoader = new Loader<UserConfig>('user_config.json', defaultConfig);
export const bookmarksLoader = new Loader<Bookmarks>('bookmarks.json', {});

export function saveAllLoaders(){
    configLoader.save();
    bookmarksLoader.save();
}