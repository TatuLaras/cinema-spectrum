import { MovieMetadata, TMDBTypes, TvMetadata } from 'src/shared';
import { BrowseItem } from '../types/common_types';
import { getMediaId } from './media_set_utils';

export const moviesToBrowseItems = (
    movies: MovieMetadata[],
): BrowseItem<MovieMetadata>[] =>
    movies.map(
        (movie) =>
            ({
                name: movie.title,
                poster_path: movie.poster_path,
                media_id: getMediaId(movie.id, 'movie'),
                genres: movie.genres.map((x) => x.name),
                date: movie.release_date,
                actual_data: movie,
                date_scanned: new Date(movie.date_scanned),
            }) as BrowseItem<MovieMetadata>,
    );

export const movieSearchResultsToBrowseItems = (
    movies: TMDBTypes.Movie[],
): BrowseItem<TMDBTypes.Movie>[] =>
    movies.map(
        (movie) =>
            ({
                name: movie.title,
                poster_path: movie.poster_path,
                media_id: getMediaId(movie.id, 'movie'),
                genres: [],
                date: movie.release_date,
                actual_data: movie,
                date_scanned: new Date(),
            }) as BrowseItem<TMDBTypes.Movie>,
    );

export const tvShowsToBrowseItems = (
    tvShows: TvMetadata[],
): BrowseItem<TvMetadata>[] =>
    tvShows.map(
        (tvShow) =>
            ({
                name: tvShow.name,
                poster_path: tvShow.poster_path,
                media_id: getMediaId(tvShow.id, 'tv'),
                genres: tvShow.genres.map((x) => x.name),
                date: tvShow.first_air_date,
                actual_data: tvShow,
                date_scanned: new Date(tvShow.date_scanned),
            }) as BrowseItem<TvMetadata>,
    );

export const tvSearchResultsToBrowseItems = (
    tvShows: TMDBTypes.Tv[],
): BrowseItem<TMDBTypes.Tv>[] =>
    tvShows.map(
        (tvShow) =>
            ({
                name: tvShow.name,
                poster_path: tvShow.poster_path,
                media_id: getMediaId(tvShow.id, 'tv'),
                genres: [],
                date: tvShow.first_air_date,
                actual_data: tvShow,
                date_scanned: new Date(),
            }) as BrowseItem<TMDBTypes.Tv>,
    );
