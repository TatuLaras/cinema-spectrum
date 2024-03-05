import { setView } from '@renderer/state/viewSlice';
import { Tv, Movie, Settings } from 'iconoir-react';
import '../../styles/tv_side_panel.scss';
import { useAppDispatch, useAppSelector } from '@renderer/hooks';
import { useState } from 'react';

type Props = {};

export default function TvSidePanel({}: Props) {
    const view = useAppSelector((state) => state.view.value);
    const dispatch = useAppDispatch();
    const [open, setOpen] = useState(false);
    return (
        <aside id='tv-side-panel' className={`${open ? 'open' : ''}`}>
            <div className='inner' onClick={() => setOpen((old) => !old)}>
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
