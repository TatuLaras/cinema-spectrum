import { useMemo } from 'react';
import BrowseContent from './BrowseContent';
import { useAppSelector } from '@renderer/shared/hooks/redux_hooks';
import { moviesToBrowseItems } from '@renderer/shared/utils/metadata_to_browse_item';

export default function BrowseMovies() {
    const movies = useAppSelector((state) => state.media.collection.movies);
    const browseItems = useMemo(() => moviesToBrowseItems(movies), [movies]);

    return  (
        <BrowseContent items={browseItems} type='movie' />
    );
}
