import { MovieMetadata, TMDBTypes, TvMetadata } from 'src/shared';
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
                genres: movie.genres.map((x) => x.name),
                date: movie.release_date,
                actual_data: movie,
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
                media_id: mediaId(movie.id, 'movie'),
                genres: [],
                date: movie.release_date,
                actual_data: movie,
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
                media_id: mediaId(tvShow.id, 'tv'),
                genres: tvShow.genres.map((x) => x.name),
                date: tvShow.first_air_date,
                actual_data: tvShow,
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
                media_id: mediaId(tvShow.id, 'tv'),
                genres: [],
                date: tvShow.first_air_date,
                actual_data: tvShow,
            }) as BrowseItem<TMDBTypes.Tv>,
    );
