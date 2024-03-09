import { MovieMetadata, TvMetadata } from 'src/shared';
import { BrowseItem } from '../types/common_types';
import { mediaId } from './media_set_utils';

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
