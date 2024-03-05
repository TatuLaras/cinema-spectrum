import { Tv, Movie, Settings } from 'iconoir-react';
import '../../styles/desktop_side_panel.scss';
import { useAppDispatch, useAppSelector } from '@renderer/hooks';
import { setView } from '@renderer/state/viewSlice';

type Props = {};

export default function SidePanel({}: Props) {
    const view = useAppSelector((state) => state.view.value);
    const dispatch = useAppDispatch();

    return (
        <aside id='desktop-side-panel'>
            <div className='top'>
                <h1>MENU</h1>
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
        </aside>
    );
}
