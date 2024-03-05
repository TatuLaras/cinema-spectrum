import SidePanel from './SidePanel';

import '../../styles/desktop_layout.scss';
import { useAppSelector } from '@renderer/hooks';
import Settings from './Settings';
import Navbar from '../Navbar';
import BrowseMovies from './BrowseMovies';
import BrowseTVShows from './BrowseTVShows';

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
                        }[view]
                    }
                </section>
            </div>
        </div>
    );
}
