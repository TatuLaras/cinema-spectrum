import { MediaSet } from 'src/shared';
import { CommonBrowseItem } from '../types/common_types';

export const inMediaSet = (
    id: number | undefined,
    set: MediaSet,
    type: 'tv' | 'movie',
): boolean => {
    if (!id) return false;
    return set[getMediaId(id, type)] ? true : false;
};

export const mediaIdinMediaSet = (
    mediaId: string | undefined,
    set: MediaSet,
): boolean => {
    if (!mediaId) return false;
    return set[mediaId] ? true : false;
};

export const episodeInMediaSet = (
    tvShowId: number | undefined,
    set: MediaSet,
    episodeId: number | undefined,
): boolean => {
    if (!tvShowId || !episodeId) return false;
    return set[getEpisodeMediaId(tvShowId, episodeId)] ? true : false;
};

export const browseItemInMediaSet = (
    item: CommonBrowseItem,
    set: MediaSet,
): boolean => {
    return set[item.media_id] ? true : false;
};

export const getMediaId = (id: number | undefined, type: 'tv' | 'movie') => {
    if (!id) return '';
    return `${type}-${id}`;
};
export const getEpisodeMediaId = (tvShowId: number, episodeId: number) =>
    `${getMediaId(tvShowId, 'tv')}-ep${episodeId}`;
