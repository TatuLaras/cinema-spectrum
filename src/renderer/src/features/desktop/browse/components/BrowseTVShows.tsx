import { useMemo } from 'react';
import BrowseContent from './BrowseContent';
import { useAppSelector } from '@renderer/shared/hooks/redux_hooks';
import { tvShowsToBrowseItems } from '@renderer/shared/utils/metadata_to_browse_item';

type Props = {};

export default function BrowseTVShows({}: Props) {
    const tvShows = useAppSelector((state) => state.media.collection.tv);

    const browseItems = useMemo(() => tvShowsToBrowseItems(tvShows), [tvShows]);

    return (
        <>
            <BrowseContent items={browseItems} type='tv' />
        </>
    );
}
