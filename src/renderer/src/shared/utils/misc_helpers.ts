import { MovieMetadata, TvMetadata } from 'src/shared';

export const isMovie = (item: MovieMetadata | TvMetadata | null) => {
    if (!item) return false;
    return item['title'] ? true : false;
};
