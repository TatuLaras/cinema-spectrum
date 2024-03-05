import path from 'path';
import { listRecursively, listTopLevelFolders } from './fsHelpers';
import { configLoader } from './loaders';

export interface TvFolderScanResult {
    folder: string;
    files: string[];
}

export interface FolderScanResult {
    movie_files: string[];
    tv: TvFolderScanResult[];
}

function isVideoFile(filePath: string): boolean {
    const videoFileExtensions = [
        '.mkv',
        '.mp4',
        '.avi',
        '.mov',
        '.m4v',
        '.m4p',
        '.flv',
        '.m4v',
        '.f4v',
        '.f4p',
        '.f4a',
        '.f4b',
        '.webm',
        '.vob',
        '.ogv',
        '.ogg',
        '.mts',
        '.m2ts',
        '.ts',
        '.qt',
        '.wmv',
        '.rm',
        '.rmvb',
        '.viv',
        '.asf',
        '.amv',
        '.mpg',
        '.mpeg',
        '.mp2',
        '.mpv',
        '.mpe',
        '.m2v',
    ];

    return videoFileExtensions.includes(path.extname(filePath));
}

function scanMovies(folder_path: string): string[] {
    if (!folder_path) return [];

    return listRecursively(folder_path).filter((x) => isVideoFile(x));
}

function scanTv(folder_path: string): TvFolderScanResult[] {
    if (!folder_path) return [];

    const result: TvFolderScanResult[] = [];
    listTopLevelFolders(folder_path).forEach((folder) =>
        result.push({
            folder: folder,
            files: listRecursively(folder).filter((x) => isVideoFile(x)),
        }),
    );

    return result;
}

export default function scanFolders(): FolderScanResult {
    const config = configLoader.get();
    const ret: FolderScanResult = {
        movie_files: [],
        tv: [],
    };

    config.paths.movies.forEach(
        (folder_path: string) =>
            (ret.movie_files = [
                ...ret.movie_files,
                ...scanMovies(folder_path),
            ]),
    );
    config.paths.tv.forEach(
        (folder_path: string) => (ret.tv = [...ret.tv, ...scanTv(folder_path)]),
    );

    return ret;
}
