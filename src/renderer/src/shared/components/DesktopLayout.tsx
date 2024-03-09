import SidePanel from './SidePanel';
import BrowseMovies from '@renderer/features/desktop/browse/components/BrowseMovies';
import BrowseTVShows from '@renderer/features/desktop/browse/components/BrowseTVShows';
import Settings from '@renderer/features/desktop/settings/components/Settings';
import { useAppSelector } from '../hooks/redux_hooks';
import Navbar from './Navbar';
import Unknown from '@renderer/features/desktop/unknown/components/Unknown';

import '../styles/desktop_layout.scss';

type Props = {};

export default function DesktopLayout({}: Props) {
    const view = useAppSelector((state) => state.view.value);

    return (
        <div id='desktop-layout'>
            <Navbar />
            <div id='app-content'>
                <SidePanel />

                <section id='main-content'>
                    {
                        {
                            settings: <Settings />,
                            movies: <BrowseMovies />,
                            tv: <BrowseTVShows />,
                            unknown: <Unknown />,
                        }[view]
                    }
                </section>
            </div>
        </div>
    );
}
