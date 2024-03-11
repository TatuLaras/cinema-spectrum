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

type Props = {
    item: MovieMetadata | TvMetadata | null;
    visible?: boolean;
};

export default function TvDetailsPanel({ item, visible = true }: Props) {
    const sidePanelOpen = useAppSelector(
        (state) => state.tv_ui.side_panel_open,
    );
    const dispatch = useAppDispatch();

    useKeyboard(
        'ArrowLeft',
        () => dispatch(setSidePanelOpen(true)),
        [],
        [visible, !sidePanelOpen],
    );

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
                <div className='inner'>
                    <Details item={item} />
                    <Menu visible={visible} item={item} />
                </div>
            )}
        </div>
    );
}
