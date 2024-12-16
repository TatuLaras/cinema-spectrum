import SidePanel from './SidePanel';
import Settings from '@renderer/features/desktop/settings/components/Settings';
import { useAppDispatch, useAppSelector } from '../hooks/redux_hooks';
import Navbar from './Navbar';
import Unknown from '@renderer/features/desktop/unknown/components/Unknown';

import '../styles/desktop_layout.scss';
import BrowseContent from '@renderer/features/desktop/browse/components/BrowseContent';
import {
    moviesToBrowseItems,
    tvShowsToBrowseItems,
} from '../utils/metadata_to_browse_item';
import NoTMDBKeyModal from './NoTMDBKeyModal';
import { useEffect, useState } from 'react';
import { setShouldShowTMDBKeyModal } from '../slices/mediaSlice';

type Props = {};

export default function DesktopLayout({}: Props) {
    const dispatch = useAppDispatch();
    const view = useAppSelector((state) => state.view.value);
    const collection = useAppSelector((state) => state.media.collection);
    const shouldShowTMDBKeyModal = useAppSelector(
        (state) => state.media.shouldShowTMDBKeyModal,
    );

    const [showTMDBKeyModal, setShowTMDBKeyModal] = useState(false);

    useEffect(() => {
        if (!shouldShowTMDBKeyModal) return;
        setShowTMDBKeyModal(true);
        dispatch(setShouldShowTMDBKeyModal(false));
    }, [shouldShowTMDBKeyModal]);

    return (
        <div id="desktop-layout">
            <Navbar />
            <div id="app-content">
                <NoTMDBKeyModal
                    show={showTMDBKeyModal}
                    onConfirm={() => setShowTMDBKeyModal(false)}
                />
                <SidePanel />

                <section id="main-content">
                    {
                        {
                            settings: <Settings />,
                            movies: (
                                <BrowseContent
                                    items={moviesToBrowseItems(
                                        collection.movies,
                                    )}
                                    type="movie"
                                />
                            ),
                            tv: (
                                <BrowseContent
                                    items={tvShowsToBrowseItems(collection.tv)}
                                    type="tv"
                                />
                            ),
                            unknown: <Unknown />,
                        }[view]
                    }
                </section>
            </div>
        </div>
    );
}
