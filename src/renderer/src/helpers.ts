import { MediaSet, MovieMetadata, TvMetadata } from 'src/shared';
import {
    BrowseItem,
    CommonBrowseItem,
    MediaGroup,
    MediaGroupTemplate,
} from './common_types';

export const imgSrc = (val: string) =>
    ({ '--img-src': `url('${val}')` }) as React.CSSProperties;

export const tmdbImg = (path: string, size: string = 'w342') =>
    imgSrc(`https://image.tmdb.org/t/p/${size}${path}`);

export const inMediaSet = (
    id: number | undefined,
    set: MediaSet,
    type: 'tv' | 'movie',
): boolean => {
    if (!id) return false;
    return set[mediaId(id, type)] ? true : false;
};

export const episodeInMediaSet = (
    tvShowId: number | undefined,
    set: MediaSet,
    episodeId: number | undefined,
): boolean => {
    if (!tvShowId || !episodeId) return false;
    return set[episodeMediaId(tvShowId, episodeId)] ? true : false;
};

export const browseItemInMediaSet = (
    item: CommonBrowseItem,
    set: MediaSet,
): boolean => {
    return set[item.media_id] ? true : false;
};

export const mediaId = (id: number, type: 'tv' | 'movie') => `${type}-${id}`;
export const episodeMediaId = (tvShowId: number, episodeId: number) =>
    `${mediaId(tvShowId, 'tv')}-ep${episodeId}`;

export const moviesToBrowseItems = (
    movies: MovieMetadata[],
): BrowseItem<MovieMetadata>[] =>
    movies.map(
        (movie) =>
            ({
                name: movie.title,
                poster_path: movie.poster_path,
                media_id: mediaId(movie.id, 'movie'),
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
                media_id: mediaId(tvShow.id, 'tv'),
                actual_data: tvShow,
                genres: tvShow.genres.map((x) => x.name),
            }) as BrowseItem<TvMetadata>,
    );

// Filters Browse Items into categories / groups based on templates
export function makeGroupsFromTemplates(
    templates: MediaGroupTemplate[],
    items: CommonBrowseItem[],
): MediaGroup[] {
    let groups: MediaGroup[] = [];
    for (let template of templates) {
        const group = {
            name: template.name,
            items: items.filter(template.criteria),
        };
        if (group.items.length == 0) continue;
        groups.push(group);
    }

    return groups;
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
