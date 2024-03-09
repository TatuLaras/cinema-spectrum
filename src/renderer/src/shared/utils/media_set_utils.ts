import { MediaSet } from 'src/shared';
import { CommonBrowseItem } from '../types/common_types';

export const inMediaSet = (
    id: number | undefined,
    set: MediaSet,
    type: 'tv' | 'movie',
): boolean => {
    if (!id) return false;
    return set[mediaId(id, type)] ? true : false;
};

export const episodeInMediaSet = (
    tvShowId: number | undefined,
    set: MediaSet,
    episodeId: number | undefined,
): boolean => {
    if (!tvShowId || !episodeId) return false;
    return set[episodeMediaId(tvShowId, episodeId)] ? true : false;
};

export const browseItemInMediaSet = (
    item: CommonBrowseItem,
    set: MediaSet,
): boolean => {
    return set[item.media_id] ? true : false;
};

export const mediaId = (id: number, type: 'tv' | 'movie') => `${type}-${id}`;
export const episodeMediaId = (tvShowId: number, episodeId: number) =>
    `${mediaId(tvShowId, 'tv')}-ep${episodeId}`;
