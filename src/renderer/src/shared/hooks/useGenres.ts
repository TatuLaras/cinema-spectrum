import { useMemo } from 'react';
import { CommonBrowseItem } from '../types/common_types';
import { getSortedGenreList } from '../utils/browse_item_utils';

export function useGenres(items: CommonBrowseItem[]) {
    return useMemo(() => getSortedGenreList(items), [items]);
}
