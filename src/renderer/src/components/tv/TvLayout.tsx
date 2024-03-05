import Navbar from '../Navbar';
import TvSidePanel from './TvSidePanel';

import '../../styles/tv_layout.scss';
import { useAppSelector } from '@renderer/hooks';
import Settings from '../desktop/Settings';
import { moviesToBrowseItems, tvShowsToBrowseItems } from '@renderer/helpers';
import { useMemo } from 'react';
import TvBrowseContent from './TvBrowseContent';

export default function TvLayout() {
    const view = useAppSelector((state) => state.view.value);
    const tvShows = useAppSelector((state) => state.tv.value);
    const movies = useAppSelector((state) => state.movies.value);

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
                            type={view === 'tv' ? 'tv' : 'movie'}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
