import { useAppSelector } from '@renderer/hooks';
import { useMemo } from 'react';
import BrowseContent from './BrowseContent';
import { moviesToBrowseItems } from '@renderer/helpers';

export default function BrowseMovies() {
    const movies = useAppSelector((state) => state.media.movies);
    const browseItems = useMemo(() => moviesToBrowseItems(movies), [movies]);

    return  (
        <BrowseContent items={browseItems} type='movie' />
    );
}
