import { setView } from '@renderer/state/viewSlice';
import { Tv, Movie, Settings } from 'iconoir-react';
import '../../styles/tv_side_panel.scss';
import { useAppDispatch, useAppSelector, useKeyboard } from '@renderer/hooks';
import { setSidePanelOpen } from '@renderer/state/tvUiSlice';
import { View } from '@renderer/common_types';

type Props = {};

export default function TvSidePanel({}: Props) {
    const view = useAppSelector((state) => state.view.value);
    const isOpen = useAppSelector((state) => state.tv_ui.side_panel_open);
    const dispatch = useAppDispatch();

    useKeyboard('ArrowRight', close, [], [isOpen]);
    useKeyboard('ArrowLeft', close, [], [isOpen]);
    useKeyboard('ArrowUp', up, [view], [isOpen]);
    useKeyboard('ArrowDown', down, [view], [isOpen]);

    function close() {
        dispatch(setSidePanelOpen(false));
    }

    const order: View[] = ['tv', 'movies', 'settings'];

    function up() {
        changeViewToNeighbour(-1);
    }
    
    function down() {
        changeViewToNeighbour(1);
    }

    function changeViewToNeighbour(offset: 1 | -1) {
        let desiredIndex = order.indexOf(view) + offset;
        desiredIndex = desiredIndex % order.length;
        if (order[desiredIndex]) dispatch(setView(order[desiredIndex]));
    }

    return (
        <aside id='tv-side-panel' className={`${isOpen ? 'open' : ''}`}>
            <div className='inner'>
                <div className='top'>
                    <div
                        className={`menu-item ${view === 'tv' ? 'selected' : ''}`}
                        onClick={() => dispatch(setView('tv'))}
                    >
                        <Tv className='icon' />
                        <div className='title'>TV Shows</div>
                    </div>
                    <div
                        className={`menu-item ${view === 'movies' ? 'selected' : ''}`}
                        onClick={() => dispatch(setView('movies'))}
                    >
                        <Movie className='icon' />
                        <div className='title'>Movies</div>
                    </div>
                </div>
                <div className='bottom'>
                    <div
                        className={`menu-item ${view === 'settings' ? 'selected' : ''}`}
                        onClick={() => dispatch(setView('settings'))}
                    >
                        <Settings className='icon' />
                        <div className='title'>Settings</div>
                    </div>
                </div>
            </div>
        </aside>
    );
}
