import { defaultConfig, MediaSet, UserConfig } from '../shared';
import { JsonLoader } from './Loader';

export const configLoader = new JsonLoader<UserConfig>(
    'user_config.json',
    defaultConfig,
);
export const bookmarksLoader = new JsonLoader<MediaSet>('bookmarks.json', {});
export const watchedLoader = new JsonLoader<MediaSet>('watched.json', {});

const loaders = [configLoader, bookmarksLoader, watchedLoader];

export function saveAllLoaders() {
    loaders.forEach((loader) => loader.save());
}
