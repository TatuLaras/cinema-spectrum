import { MovieMetadata, TvMetadata } from 'src/shared';

export const isMovie = (item: MovieMetadata | TvMetadata) =>
    item['title'] ? true : false;
