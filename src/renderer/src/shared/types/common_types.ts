import { MovieMetadata, TvFolderScanResult, TvMetadata } from 'src/shared';

export type AppMode = 'desktop' | 'tv';
export type View = 'movies' | 'tv' | 'unknown' | 'settings';
export type Status = 'loading' | 'ready';

// A common interface for both tv shows and movies to enable some code re-use
export interface BrowseItem<T> {
    poster_path: string;
    name: string;
    genres: string[];
    media_id: string;
    date: string;
    actual_data: T;
}

// Most common use case of this generic,
// left the option open to use it with other types of "actual_data"
export type CommonBrowseItem = BrowseItem<MovieMetadata | TvMetadata>;

export type PressedKey =
    | 'ArrowLeft'
    | 'ArrowRight'
    | 'ArrowUp'
    | 'ArrowDown'
    | 'Enter';

// TV interface category / group definition
export interface MediaGroupTemplate {
    name: string;
    criteria: (item: CommonBrowseItem) => boolean;
}

// Actual group of browse items that are created based on templates
// defined using the above interface MediaGroupTemplate
export interface MediaGroup {
    name: string;
    items: CommonBrowseItem[];
}


export interface UnknownItem {
    filename: string;
    type: 'movie' | 'tv';
    actual_handle: string | TvFolderScanResult;
    delete_id: number;
}