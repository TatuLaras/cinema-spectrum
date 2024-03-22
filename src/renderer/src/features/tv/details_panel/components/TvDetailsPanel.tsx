import { MovieMetadata, TMDBTypes, TvMetadata } from 'src/shared';

import '../styles/tv_details_panel.scss';
import Details from '../../../../shared/components/Details';
import Menu from './Menu';
import {
    useAppDispatch,
    useAppSelector,
} from '@renderer/shared/hooks/redux_hooks';
import { useKeyboard } from '@renderer/shared/hooks/useKeyboard';
import { setSidePanelOpen } from '@renderer/shared/slices/tvUiSlice';
import { tmdbImg } from '@renderer/shared/utils/css_variable_utils';
import { useState } from 'react';
import TvEpisodeList from './TvEpisodeList';

type Props = {
    item: MovieMetadata | TvMetadata | null;
    visible?: boolean;
    onClose: () => void;
};

export default function TvDetailsPanel({
    item,
    visible = true,
    onClose,
}: Props) {
    const sidePanelOpen = useAppSelector(
        (state) => state.tv_ui.side_panel_open,
    );
    const dispatch = useAppDispatch();

    const [showEpisodes, setShowEpisodes] = useState<boolean>(false);
    useKeyboard(
        'ArrowLeft',
        () => dispatch(setSidePanelOpen(true)),
        [],
        [visible, !sidePanelOpen],
    );

    useKeyboard('Escape', close, [showEpisodes], [visible]);

    useKeyboard('Backspace', close, [showEpisodes], [visible]);

    function close() {
        if (showEpisodes) setShowEpisodes(false);
        else onClose();
    }

    let content = <></>;

    if (item) {
        if (showEpisodes) {
            const seasons = (item as TvMetadata).seasons;
            content = <TvEpisodeList seasons={seasons} />;
        } else
            content = (
                <Menu
                    visible={visible}
                    item={item}
                    onEpisodeListOpened={() => setShowEpisodes(true)}
                />
            );
    }

    return (
        <div
            className={`tv-details-panel movie ${visible ? 'visible' : ''}`}
            style={
                item?.backdrop_path
                    ? tmdbImg<TMDBTypes.BackdropImageSize>(
                          item.backdrop_path,
                          'original',
                      )
                    : {}
            }
        >
            {item && (
                <div className="inner">
                    <Details item={item} />
                    {content}
                </div>
            )}
        </div>
    );
}
