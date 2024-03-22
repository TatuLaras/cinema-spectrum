import { TvFolderScanResult } from './folder_scan';
import {
    FilenameEpisodeMap,
    parseMovieSearchParamsFromFilename,
    parseSeasonEpisodeFromFilename,
} from './metadata_helpers';

test('Season Episode: Basic functionality', () => {
    expect(parseSeasonEpisodeFromFilename('S05E01')).toStrictEqual({
        episode: 1,
        season: 5,
    });
});

test('Season Episode: Complicated name', () => {
    expect(
        parseSeasonEpisodeFromFilename(
            "Don't.Hug.Me.I'm.Scared.S04E06.1080p.ALL4.WEB-DL.AAC.2.0.H.264-CIWE.mkv",
        ),
    ).toStrictEqual({
        episode: 6,
        season: 4,
    });
});

test('Season Episode: Missing season', () => {
    expect(
        parseSeasonEpisodeFromFilename(
            "Don't.Hug.Me.I'm.Scared E10 .2.0.H.264-CIWE.mkv",
        ),
    ).toStrictEqual({
        episode: 10,
        season: 1,
    });
});

test('Season Episode: Missing episode', () => {
    expect(
        parseSeasonEpisodeFromFilename(
            "Don't.Hug.Me.I'm.Scared S11 .2.0.H.264-CIWE.mkv",
        ),
    ).toStrictEqual({
        episode: 0,
        season: 11,
    });
});

test('Season Episode: Long number', () => {
    expect(
        parseSeasonEpisodeFromFilename(
            'Legend of the Galactic Heroes E1234.mkv',
        ),
    ).toStrictEqual({
        episode: 1234,
        season: 1,
    });
});

test('Season Episode: Long season number', () => {
    expect(
        parseSeasonEpisodeFromFilename(
            'Legend of the Galactic Heroes S12345E1234.mkv',
        ),
    ).toStrictEqual({
        episode: 1234,
        season: 12345,
    });
});

test('Search Params: Basic', () => {
    expect(
        parseMovieSearchParamsFromFilename(
            'All.About.Lily.Chou-Chou.2001.JAPANESE.1080p.BluRay.H264.AAC-VXT.mp4',
        ),
    ).toStrictEqual({
        query: 'All About Lily Chou-Chou',
        year: 2001,
    });
});

test('Search Params: Uploader tag and year in parentheses', () => {
    expect(
        parseMovieSearchParamsFromFilename(
            '[bonkai77] Evangelion 1.11 You Are (Not) Alone (2007) [1080p] [DUAL-AUDIO 5.1] [HEVC] [x265] [10bit]',
        ),
    ).toStrictEqual({
        query: 'Evangelion 1 11 You Are  Not  Alone',
        year: 2007,
    });
});

test('Map to filenames: Basic', () => {
    const template = (str) =>
        `/run/media/tatu/Holvi/Merirosvoilu/TV/Don't Hug Me I'm Scared` +
        `/Don't.Hug.Me.I'm.Scared.${str}.1080p.ALL4.WEB-DL.AAC.2.0.H.264-CIWE.mkv`;

    const input: TvFolderScanResult = {
        folder: '/foo/bar',
        files: [
            template(`S01E01`),
            template(`S01E02`),
            template(`S01E03`),
            template(`S02E01`),
            template(`S02E02`),
            template(`S02E03`),
        ],
    };

    const mapping = new FilenameEpisodeMap(input);

    expect(mapping.get({ season: 1, episode: 1 })).toBe(template(`S01E01`));
    expect(mapping.get({ season: 1, episode: 2 })).toBe(template(`S01E02`));
    expect(mapping.get({ season: 1, episode: 3 })).toBe(template(`S01E03`));
    expect(mapping.get({ season: 2, episode: 1 })).toBe(template(`S02E01`));
    expect(mapping.get({ season: 2, episode: 2 })).toBe(template(`S02E02`));
    expect(mapping.get({ season: 2, episode: 3 })).toBe(template(`S02E03`));
});

test('Map to filenames: Basic 2', () => {
    const input: TvFolderScanResult = {
        folder: '/run/media/tatu/Holvi/Merirosvoilu/TV/1 Litre of Tears',
        files: [
            '/run/media/tatu/Holvi/Merirosvoilu/TV/1 Litre of Tears/1 Litre Of Tears E01 720p HEVC.x265-FCS.mkv',
            '/run/media/tatu/Holvi/Merirosvoilu/TV/1 Litre of Tears/1 Litre Of Tears E02 720p HEVC.x265-FCS.mkv',
            '/run/media/tatu/Holvi/Merirosvoilu/TV/1 Litre of Tears/1 Litre Of Tears E03 720p HEVC.x265-FCS.mkv',
            '/run/media/tatu/Holvi/Merirosvoilu/TV/1 Litre of Tears/1 Litre Of Tears E04 720p HEVC.x265-FCS.mkv',
            '/run/media/tatu/Holvi/Merirosvoilu/TV/1 Litre of Tears/1 Litre Of Tears E05 720p HEVC.x265-FCS.mkv',
            '/run/media/tatu/Holvi/Merirosvoilu/TV/1 Litre of Tears/1 Litre Of Tears E06 720p HEVC.x265-FCS.mkv',
            '/run/media/tatu/Holvi/Merirosvoilu/TV/1 Litre of Tears/1 Litre Of Tears E07 720p HEVC.x265-FCS.mkv',
            '/run/media/tatu/Holvi/Merirosvoilu/TV/1 Litre of Tears/1 Litre Of Tears E08 720p HEVC.x265-FCS.mkv',
            '/run/media/tatu/Holvi/Merirosvoilu/TV/1 Litre of Tears/1 Litre Of Tears E09 720p HEVC.x265-FCS.mkv',
            '/run/media/tatu/Holvi/Merirosvoilu/TV/1 Litre of Tears/1 Litre Of Tears E10 720p HEVC.x265-FCS.mkv',
            '/run/media/tatu/Holvi/Merirosvoilu/TV/1 Litre of Tears/1 Litre Of Tears E11 End 720p HEVC.x265-FCS.mkv',
            '/run/media/tatu/Holvi/Merirosvoilu/TV/1 Litre of Tears/1 Litre of Tears Special [2007.04.05] (1280x720 DivX651).avi',
        ],
    };

    const mapping = new FilenameEpisodeMap(input);

    expect(mapping.get({ season: 1, episode: 5 })).toBe(
        '/run/media/tatu/Holvi/Merirosvoilu/TV/1 Litre of Tears/1 Litre Of Tears E05 720p HEVC.x265-FCS.mkv',
    );
});

test('Bug reproduction Ozark', () => {
    const testFiles = [
        '/run/media/tatu/Holvi/Merirosvoilu/TV/Ozark/Ozark (2017) - S02E01 - Reparations (1080p NF WEB-DL x265 Silence).mkv',
        '/run/media/tatu/Holvi/Merirosvoilu/TV/Ozark/Ozark (2017) - S02E02 - The Precious Blood of Jesus (1080p NF WEB-DL x265 Silence).mkv',
    ];

    const input: TvFolderScanResult = {
        folder: '/run/media/tatu/Holvi/Merirosvoilu/TV/Ozark',
        files: testFiles,
    };

    const mapping = new FilenameEpisodeMap(input);
    expect(mapping.get({ season: 2, episode: 1 })).toBe(testFiles[0]);
    expect(mapping.get({ season: 2, episode: 2 })).toBe(testFiles[1]);
});
