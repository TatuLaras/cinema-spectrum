import path from 'path';
import { TMDB } from './tmdb';
import { baseMetadataDir } from './data_folders';
import {
    Episode,
    FolderScanResult,
    MediaType,
    MetadataCollection,
    MovieMetadata,
    SeasonDetails,
    TMDBTypes,
    TvFolderScanResult,
    TvMetadata,
    getEmptyMetadataCollection,
} from '../shared';
import {
    FilenameEpisodeMap,
    parseMovieSearchParamsFromFilename,
} from './metadata_helpers';

const fs = require('fs');

export namespace Metadata {
    function getCacheEntry<T>(
        cacheIdentifier: string,
        prefix: MediaType,
    ): T | null {
        const cacheEntry = `${baseMetadataDir}/${prefix}.${cacheIdentifier}.json`;
        try {
            const fileContent = fs.readFileSync(cacheEntry);
            const data: T = JSON.parse(fileContent.toString());
            return data;
        } catch {
            return null;
        }
    }

    function cache<T>(
        cacheIdentifier: string,
        prefix: MediaType,
        data: T,
    ): void {
        const cacheFile = `${baseMetadataDir}/${prefix}.${cacheIdentifier}.json`;
        fs.writeFile(cacheFile, JSON.stringify(data), (err) => {
            if (err) console.log('Error with caching file ' + cacheFile);
        });
    }

    async function getMovieMetadata(
        movieFile: string,
    ): Promise<MovieMetadata | null> {
        const filename = path.basename(movieFile);

        // Try to get cached
        const data = getCacheEntry<MovieMetadata>(filename, 'movie');
        if (data) return data;

        // If null, get from tmdb
        const params = parseMovieSearchParamsFromFilename(filename);
        const result = await TMDB.searchMovie(params);
        if (!result || result.length == 0) return null;

        return getMovieMetadataById(movieFile, result[0].id);
    }

    async function getTvMetadata(
        tvResult: TvFolderScanResult,
    ): Promise<TvMetadata | null> {
        const folderName = path.basename(tvResult.folder);
        const filenameMap = new FilenameEpisodeMap(tvResult);

        // Try to get cached
        const data = getCacheEntry<TvMetadata>(folderName, 'tv');
        if (data) {
            // Link filenames (new episodes etc)
            for (let season of data.seasons)
                for (let episode of season.episodes) {
                    if (episode.file_path) continue;
                    episode.file_path =
                        filenameMap.get({
                            episode: episode.episode_number,
                            season: season.season_number,
                        }) ?? null;
                }
            return data;
        }

        // If null, get from tmdb
        const result = await TMDB.searchTvShow(folderName);
        if (!result || result.length == 0) return null;

        return getTvMetadataById(tvResult, result[0].id);
    }

    export async function getMovieMetadataById(
        movieFile: string,
        movieId: number,
    ) {
        const metadata = await TMDB.getMovie(movieId);
        if (!metadata) return null;

        // Attach file path
        const completeMetadata: MovieMetadata = {
            ...metadata,
            file_path: movieFile,
            date_scanned: new Date().toISOString(),
        };

        const filename = path.basename(movieFile);
        cache(filename, 'movie', completeMetadata);
        return completeMetadata;
    }

    export async function getTvMetadataById(
        tvResult: TvFolderScanResult,
        tvShowId: number,
    ): Promise<TvMetadata | null> {
        const folderName = path.basename(tvResult.folder);
        const filenameMap = new FilenameEpisodeMap(tvResult);

        const details: TMDBTypes.TvDetails | null =
            await TMDB.getTvShow(tvShowId);
        if (!details) return null;

        const metadataFull: TvMetadata = {
            ...details,
            seasons: [],
            date_scanned: new Date(),
        };
        for (let season of details.seasons) {
            // Get season details
            const seasonDetail: TMDBTypes.SeasonDetails | null =
                await TMDB.getTvShowSeasonDetails(
                    details.id,
                    season.season_number,
                );

            if (!seasonDetail) return null;

            const seasonFull: SeasonDetails = {
                ...seasonDetail,
                episodes: [],
            };

            // Attach filenames to episodes
            for (let episode of seasonDetail.episodes) {
                const episodeFull: Episode = {
                    ...episode,
                    file_path:
                        filenameMap.get({
                            episode: episode.episode_number,
                            season: season.season_number,
                        }) ?? null,
                };
                seasonFull.episodes.push(episodeFull);
            }

            metadataFull.seasons.push(seasonFull);
        }

        cache(folderName, 'tv', metadataFull);
        return metadataFull;
    }

    export async function getMetadata(
        folderScanResult: FolderScanResult,
    ): Promise<MetadataCollection> {
        const ret: MetadataCollection = getEmptyMetadataCollection();

        for (let movie_file of folderScanResult.movie_files) {
            const data = await getMovieMetadata(movie_file);
            if (data) ret.movies.push(data);
            else ret.unknown.movie_files.push(movie_file);
        }

        for (let tv_result of folderScanResult.tv) {
            const data = await getTvMetadata(tv_result);
            if (data) ret.tv.push(data);
            else ret.unknown.tv.push(tv_result);
        }

        return ret;
    }
}
