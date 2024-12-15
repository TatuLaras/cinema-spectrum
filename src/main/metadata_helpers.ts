import path from 'path';
import { SeasonEpisode, TvFolderScanResult } from '../shared';
import { TMDB } from './tmdb';

export function parseMovieSearchParamsFromFilename(
    filename: string,
): TMDB.SearchParams {
    const segments = filename.split(/[(). ]/);
    let lastYearIndex = -1;
    segments.forEach((seg, i) => {
        const year = parseInt(seg);
        if (year > 1888 && year < 2150) lastYearIndex = i;
    });

    if (lastYearIndex == -1)
        return {
            query: segments.slice(0, segments.length - 1).join(' '),
            year: null,
        };

    const title = segments
        .slice(0, lastYearIndex)
        .join(' ')
        .replace(/\[([^\]^\[]*)\]/, '')
        .trim();
    const year = parseInt(segments[lastYearIndex]);

    return {
        query: title,
        year: year,
    };
}

export function parseSeasonEpisodeFromFilename(
    filename: string,
): SeasonEpisode {
    const episodePattern = /E[0-9]*/g;
    const seasonPattern = /S[0-9]*/g;

    let episode = 0;
    let season = 1;

    const episodeMatches = filename.match(episodePattern);
    if (episodeMatches && episodeMatches.length > 0)
        for (let match of episodeMatches) {
            const num_str = match.replace('E', '');
            if (num_str.length > 0) episode = parseInt(num_str);
        }

    const seasonMatches = filename.match(seasonPattern);
    if (seasonMatches && seasonMatches.length > 0)
        for (let match of seasonMatches) {
            const num_str2 = match.replace('S', '');
            if (num_str2.length > 0) season = parseInt(num_str2);
        }

    return { episode: episode, season: season } as const;
}

export class FilenameEpisodeMap {
    private readonly mapping: Map<string, string>;

    constructor(tvResult: TvFolderScanResult) {
        this.mapping = new Map<string, string>();
        tvResult.files.forEach((filePath) => {
            const filename = path.basename(filePath);
            const seasonEpisode = parseSeasonEpisodeFromFilename(filename);
            this.mapping.set(this.makeKey(seasonEpisode), filePath);
        });
    }

    /*  Ensure that the interface members are in same order.
        For example {"season": 1, "episode": 2} should be the same key as
        {"episode": 2, "season": 1} 
    */
    private makeKey(seasonEpisode: SeasonEpisode): string {
        return JSON.stringify({
            episode: seasonEpisode.episode,
            season: seasonEpisode.season,
        });
    }

    get(seasonEpisode: SeasonEpisode): string | undefined {
        return this.mapping.get(this.makeKey(seasonEpisode));
    }
}
