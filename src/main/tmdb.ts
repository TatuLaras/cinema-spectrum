import { TMDBTypes } from '../shared';
import { configLoader } from './loaders';

export namespace TMDB {
    export interface SearchParams {
        query: string;
        year?: number | null;
    }

    export interface TMDBResponse<T> {
        page: number;
        results: T[];
        total_pages: number;
        total_results: number;
    }

    export const tmdbBaseUrl = 'https://api.themoviedb.org/3';

    async function get<T>(path: string): Promise<T | null> {
        const result: Response | null = await fetch(tmdbBaseUrl + path, {
            headers: {
                Authorization: 'Bearer ' + configLoader.get().tmdb_key,
                accept: 'application/json',
            },
        }).catch((err) => {
            console.log(err);
            return null;
        });

        if (!result) return null;

        if (result.status == 401) throw Error('unautheticated');

        if (result.status != 200) {
            console.log(result.status);
            console.log(await result.text());
            return null;
        }

        const json = await result.json();
        return json as T;
    }

    export async function searchMovie(
        params: SearchParams,
    ): Promise<TMDBTypes.Movie[] | null> {
        const endPoint = '/search/movie';
        const urlParams = new URLSearchParams(params as any).toString();

        const fullPath = endPoint + '?' + urlParams;

        return (
            (await get<TMDBResponse<TMDBTypes.Movie>>(fullPath))?.results ??
            null
        );
    }

    export async function searchTvShow(
        query: string,
    ): Promise<TMDBTypes.Tv[] | null> {
        const endPoint = '/search/tv';
        const urlParams = new URLSearchParams({ query: query }).toString();
        const fullPath = endPoint + '?' + urlParams;

        return (
            (await get<TMDBResponse<TMDBTypes.Tv>>(fullPath))?.results ?? null
        );
    }

    export async function getMovie(
        id: number,
    ): Promise<TMDBTypes.MovieDetails | null> {
        const fullPath = '/movie/' + id + '?append_to_response=credits';
        return await get<TMDBTypes.MovieDetails>(fullPath);
    }

    export async function getTvShow(
        id: number,
    ): Promise<TMDBTypes.TvDetails | null> {
        const fullPath = '/tv/' + id;
        return await get<TMDBTypes.TvDetails>(fullPath);
    }

    export async function getTvShowSeasonDetails(
        seriesId: number,
        seasonNumber: number,
    ): Promise<TMDBTypes.SeasonDetails | null> {
        const fullPath = `/tv/${seriesId}/season/${seasonNumber}`;
        return await get<TMDBTypes.SeasonDetails>(fullPath);
    }
}
