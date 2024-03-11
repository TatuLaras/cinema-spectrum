import { Tv, Movie, Settings } from 'iconoir-react';
import { useAppSelector, useAppDispatch } from '../hooks/redux_hooks';
import { useKeyboard } from '../hooks/useKeyboard';
import { setSidePanelOpen } from '../slices/tvUiSlice';
import { setView } from '../slices/viewSlice';
import { View } from '../types/common_types';
import '../styles/tv_side_panel.scss';

type Props = {};

export default function TvSidePanel({}: Props) {
    const view = useAppSelector((state) => state.view.value);
    const isOpen = useAppSelector((state) => state.tv_ui.side_panel_open);
    const dispatch = useAppDispatch();

    useKeyboard('ArrowRight', close, [], [isOpen]);
    useKeyboard('ArrowLeft', close, [], [isOpen]);
    useKeyboard('Escape', close, [], [isOpen]);
    useKeyboard('Backspace', close, [], [isOpen]);
    useKeyboard('ArrowUp', up, [view], [isOpen]);
    useKeyboard('ArrowDown', down, [view], [isOpen]);

    function close() {
        dispatch(setSidePanelOpen(false));
    }

    function open() {
        dispatch(setSidePanelOpen(true));
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

    function selectMenuItem(e: React.MouseEvent, view: View) {
        dispatch(setView(view));
        e.stopPropagation();
    }

    return (
        <aside
            id='tv-side-panel'
            className={`${isOpen ? 'open' : ''}`}
            onClick={close}
        >
            <div
                className='inner'
                onClick={(e) => {
                    open();
                    e.stopPropagation();
                }}
            >
                <div className='top'>
                    <div
                        className={`menu-item ${view === 'tv' ? 'selected' : ''}`}
                        onClick={(e) => selectMenuItem(e, 'tv')}
                    >
                        <Tv className='icon' />
                        <div className='title'>TV Shows</div>
                    </div>
                    <div
                        className={`menu-item ${view === 'movies' ? 'selected' : ''}`}
                        onClick={(e) => selectMenuItem(e, 'movies')}
                    >
                        <Movie className='icon' />
                        <div className='title'>Movies</div>
                    </div>
                </div>
                <div className='bottom'>
                    <div
                        className={`menu-item ${view === 'settings' ? 'selected' : ''}`}
                        onClick={(e) => selectMenuItem(e, 'settings')}
                    >
                        <Settings className='icon' />
                        <div className='title'>Settings</div>
                    </div>
                </div>
            </div>
        </aside>
    );
}
