import { MovieMetadata, TvMetadata } from 'src/shared';

export type AppMode = 'desktop' | 'tv';
export type View = 'movies' | 'tv' | 'settings';
export type State = 'loading' | 'ready';

// A common interface for both tv shows and movies to enable some code re-use
export interface BrowseItem<T> {
    poster_path: string;
    name: string;
    genres: string[];
    media_id: string;
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
