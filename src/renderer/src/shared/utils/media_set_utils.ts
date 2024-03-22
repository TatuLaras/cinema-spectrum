import { MediaSet, MediaType } from 'src/shared';
import { CommonBrowseItem } from '../types/common_types';

export const inMediaSet = (
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

export const getMediaId = (id: number | undefined, type: MediaType) => {
    if (!id) return '';
    return `${type}-${id}`;
};
export const getEpisodeMediaId = (tvShowId: number, episodeId: number) =>
    `${getMediaId(tvShowId, 'tv')}-ep${episodeId}`;
