import { useAppDispatch, useAppSelector } from '@renderer/hooks';
import {
    addTvFolder,
    addMovieFolder,
    removeMovieFolder,
    removeTvFolder,
    setTmdbKey,
    setPlayerCommand,
} from '@renderer/state/configSlice';
import { ChangeEvent } from 'react';

import '../../styles/settings.scss';

type Props = {};

export default function Settings({}: Props) {
    const config = useAppSelector((state) => state.config.value);
    const dispatch = useAppDispatch();

    function getFolder() {
        return window.electron.ipcRenderer.invoke('dialog:selectFolder');
    }

    return (
        <div id='settings'>
            <h1>Settings</h1>
            <br></br>
            <input
                type='text'
                placeholder='TMDB key'
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    dispatch(setTmdbKey(e.target.value))
                }
                value={config.tmdb_key}
            />
            <input
                type='text'
                placeholder='Video player CLI command'
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    dispatch(setPlayerCommand(e.target.value))
                }
                value={config.player_command}
            />
            <h2>Movies</h2>
            {config.paths.movies.map((el, i) => (
                <p key={i} onClick={() => dispatch(removeMovieFolder(el))}>
                    {el}
                </p>
            ))}
            <h2>TV</h2>
            {config.paths.tv.map((el, i) => (
                <p key={i} onClick={() => dispatch(removeTvFolder(el))}>
                    {el}
                </p>
            ))}
            <button
                onClick={() =>
                    getFolder().then((val) => dispatch(addTvFolder(val)))
                }
            >
                Add TV Folder
            </button>
            <button
                onClick={() =>
                    getFolder().then((val) => dispatch(addMovieFolder(val)))
                }
            >
                Add Movie Folder
            </button>
            <div className='color color-1'></div>
            <div className='color color-2'></div>
            <div className='color color-3'></div>
            <div className='color color-4'></div>
            <div className='color color-5'></div>
        </div>
    );
}
