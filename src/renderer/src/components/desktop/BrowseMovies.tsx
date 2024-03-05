import { useAppSelector } from '@renderer/hooks';
import { useMemo } from 'react';
import BrowseContent from './BrowseContent';
import { moviesToBrowseItems } from '@renderer/helpers';

export default function BrowseMovies() {
    const movies = useAppSelector((state) => state.movies.value);

    const browseItems = useMemo(() => moviesToBrowseItems(movies), [movies]);

    return (
        <>
            <BrowseContent items={browseItems} type='movie' />
        </>
    );
}
