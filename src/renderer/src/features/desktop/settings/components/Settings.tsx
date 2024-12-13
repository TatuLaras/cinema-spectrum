import {
    useAppSelector,
    useAppDispatch,
} from '@renderer/shared/hooks/redux_hooks';
import {
    setTmdbKey,
    setPlayerCommand,
    removeMovieFolder,
    removeTvFolder,
    addTvFolder,
    addMovieFolder,
} from '@renderer/shared/slices/configSlice';
import { ChangeEvent } from 'react';
import '../styles/settings.scss';
import { TrashSolid } from 'iconoir-react';

type Props = {};

export default function Settings({}: Props) {
    const config = useAppSelector((state) => state.config.value);
    const dispatch = useAppDispatch();

    function getFolder() {
        return window.electron.ipcRenderer.invoke('dialog:selectFolder');
    }

    return (
        <div id="settings">
            <h1>Settings</h1>

            <div className="input-item">
                <label htmlFor="tmdb-input">TMDB read access token</label>
                <input
                    type="text"
                    id="tmdb-input"
                    placeholder="TMDB read access token"
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        dispatch(setTmdbKey(e.target.value))
                    }
                    value={config.tmdb_key}
                />
            </div>

            <div className="input-item">
                <label htmlFor="video-player-input">Video player command</label>
                <input
                    type="text"
                    id="video-player-input"
                    placeholder="Video player command"
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        dispatch(setPlayerCommand(e.target.value))
                    }
                    value={config.player_command}
                />
                <p className="context">
                    A command to run your video player. For example: "mpv".
                </p>
            </div>

            <h2>TV show directories</h2>
            <div className="folder-list">
                {config.paths.tv.map((el) => (
                    <div
                        className="item"
                        key={el}
                        onClick={() => dispatch(removeTvFolder(el))}
                    >
                        {el}
                        <button className="delete">
                            <TrashSolid />
                        </button>
                    </div>
                ))}
            </div>

            <button
                onClick={() =>
                    getFolder().then((val) => dispatch(addTvFolder(val)))
                }
            >
                Add directory
            </button>

            <h2>Movie directories</h2>
            <div className="folder-list">
                {config.paths.movies.map((el) => (
                    <div
                        className="item"
                        key={el}
                        onClick={() => dispatch(removeMovieFolder(el))}
                    >
                        {el}
                        <button className="delete">
                            <TrashSolid />
                        </button>
                    </div>
                ))}
            </div>

            <button
                onClick={() =>
                    getFolder().then((val) => dispatch(addMovieFolder(val)))
                }
            >
                Add directory
            </button>
        </div>
    );
}
