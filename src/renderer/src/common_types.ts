import { MovieMetadata, TvMetadata } from 'src/shared';

export type TAppMode = 'desktop' | 'tv';
export type TView = 'movies' | 'tv' | 'settings';

export interface BrowseItem<T> {
    poster_path: string;
    name: string;
    genres: string[];
    media_id: string;
    actual_data: T;
}

export type CommonBrowseItem = BrowseItem<MovieMetadata | TvMetadata>;

export type PressedKey =
    | 'ArrowLeft'
    | 'ArrowRight'
    | 'ArrowUp'
    | 'ArrowDown'
    | 'Enter';

export interface MediaGroupTemplate {
    name: string;
    criteria: (item: CommonBrowseItem) => boolean;
}

export interface MediaGroup {
    name: string;
    items: CommonBrowseItem[];
}