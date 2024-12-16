import Button from './Button';
import '../styles/no_tmdb.scss';
import { useAppDispatch, useAppSelector } from '../hooks/redux_hooks';
import { ChangeEvent } from 'react';
import { setTmdbKey } from '../slices/configSlice';

interface Props {
    show?: boolean;
    onConfirm: () => void;
}

export default function NoTMDBKeyModal({ show = true, onConfirm }: Props) {
    const dispatch = useAppDispatch();
    const config = useAppSelector((state) => state.config.value);

    return (
        <div id="no-tmdb" className={show ? 'show' : ''}>
            <div className="inner">
                <div className="title">TMDB read access token needed</div>
                <div className="text">
                    This app uses TMDB (The Movie Database) to fetch movie and
                    TV show metadata. To have access to it, a read access token
                    needs to be provided. After logging into your TMDB account,
                    go{' '}
                    <a
                        href="https://www.themoviedb.org/settings/api"
                        target="_blank"
                    >
                        here
                    </a>{' '}
                    to get your read access token.
                </div>
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
                <div className="buttons">
                    <Button text="Confirm" onClick={onConfirm} />
                </div>
            </div>
        </div>
    );
}
