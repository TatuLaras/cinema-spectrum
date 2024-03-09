import TvSidePanel from './TvSidePanel';

import '../styles/tv_layout.scss';
import { useMemo } from 'react';
import TvBrowseContent from '@renderer/features/tv/browse/components/TvBrowseContent';
import { Settings } from 'iconoir-react';
import { useAppSelector } from '../hooks/redux_hooks';
import { tvShowsToBrowseItems, moviesToBrowseItems } from '../utils/metadata_to_browse_item';
import Navbar from './Navbar';

export default function TvLayout() {
    const view = useAppSelector((state) => state.view.value);
    const tvShows = useAppSelector((state) => state.media.tv);
    const movies = useAppSelector((state) => state.media.movies);

    const browseItems = useMemo(() => {
        return {
            tv: tvShowsToBrowseItems(tvShows),
            movies: moviesToBrowseItems(movies),
        }[view];
    }, [view, tvShows, movies]);

    return (
        <div id='tv-layout'>
            <Navbar />
            <div id='app-content'>
                <TvSidePanel />
                <div id='main-content'>
                    {view === 'settings' ? (
                        <Settings />
                    ) : (
                        <TvBrowseContent
                            items={browseItems}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
