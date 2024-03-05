import { useAppSelector } from '@renderer/hooks';
import { tvShowsToBrowseItems } from '@renderer/helpers';
import { useMemo } from 'react';
import BrowseContent from './BrowseContent';

type Props = {};

export default function BrowseTVShows({}: Props) {
    const tvShows = useAppSelector((state) => state.tv.value);
    
    const browseItems = useMemo(() => tvShowsToBrowseItems(tvShows), [tvShows]);

    return (
        <>
            <BrowseContent items={browseItems} type='tv' />
        </>
    );
}
