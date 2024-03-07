import { Bookmarks, MovieMetadata, TvMetadata } from 'src/shared';
import {
    BrowseItem,
    CommonBrowseItem,
    MediaGroup,
    MediaGroupTemplate,
} from './common_types';
import { countryAliases } from './data';

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
        (tvShow) =>
            ({
                name: tvShow.name,
                poster_path: tvShow.poster_path,
                media_id: bookmarkId(tvShow.id, 'tv'),
                actual_data: tvShow,
                genres: tvShow.genres.map((x) => x.name),
            }) as BrowseItem<TvMetadata>,
    );

export function makeGroupsFromTemplates(
    templates: MediaGroupTemplate[],
    items: CommonBrowseItem[],
): MediaGroup[] {
    let result: MediaGroup[] = [];
    for (let template of templates) {
        result.push({
            name: template.name,
            items: items.filter(template.criteria),
        });
    }

    return result;
}

export function getSortedGenreList(items: CommonBrowseItem[]): string[] {
    // Save unique genres into an object, count occurrences as well
    const genres: { [genre: string]: number } = {};
    for (const item of items)
        for (const genre of item.genres) {
            if (!genres[genre]) genres[genre] = 0;
            genres[genre] += 1;
        }

    // Sort by occurrences
    const sortedEntries = Object.entries(genres).sort((a, b) => b[1] - a[1]);

    // Return genre name list
    return sortedEntries.map((x) => x[0]);
}
