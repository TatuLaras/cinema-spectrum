import { Bookmarks, MovieMetadata, TvMetadata } from 'src/shared';
import { BrowseItem, CommonBrowseItem } from './common_types';

export const imgSrc = (val: string) =>
    ({ '--img-src': `url('${val}')` }) as React.CSSProperties;

export const tmdbImg = (path: string, size: string = 'w342') =>
    imgSrc(`https://image.tmdb.org/t/p/${size}${path}`);

export const isBookmarked = (
    id: number | undefined,
    bookmarks: Bookmarks,
    type: 'tv' | 'movie',
): boolean => {
    if (!id) return false;
    return bookmarks[bookmarkId(id, type)] ? true : false;
};

export const browseItemIsBookmarked = (
    item: CommonBrowseItem,
    bookmarks: Bookmarks,
): boolean => {
    return bookmarks[item.media_id] ? true : false;
};

export const bookmarkId = (id: number, type: 'tv' | 'movie') => `${type}-${id}`;

export const moviesToBrowseItems = (
    movies: MovieMetadata[],
): BrowseItem<MovieMetadata>[] =>
    movies.map(
        (movie) =>
            ({
                name: movie.title,
                poster_path: movie.poster_path,
                media_id: bookmarkId(movie.id, 'movie'),
                actual_data: movie,
                genres: movie.genres.map((x) => x.name),
            }) as BrowseItem<MovieMetadata>,
    );

export const tvShowsToBrowseItems = (
    tvShows: TvMetadata[],
): BrowseItem<TvMetadata>[] =>
    tvShows.map(
        (movie) =>
            ({
                name: movie.name,
                poster_path: movie.poster_path,
                media_id: bookmarkId(movie.id, 'tv'),
                actual_data: movie,
                genres: movie.genres.map((x) => x.name),
            }) as BrowseItem<TvMetadata>,
    );
