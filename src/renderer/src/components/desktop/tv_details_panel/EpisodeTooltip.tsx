import { Episode } from 'src/shared';
import '../../../styles/episode_tooltip.scss';
import { tmdbImg } from '@renderer/helpers';
import { CheckCircle, CheckCircleSolid, PlaySolid } from 'iconoir-react';
import { useState } from 'react';
import { playFile } from '@renderer/ipcActions';

type Props = {
    visible: boolean;
    episode: Episode;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
};

export default function EpisodeTooltip({
    visible,
    episode,
    onMouseEnter,
    onMouseLeave,
}: Props) {
    const [watched, setWatched] = useState<boolean>(false);
    return (
        <div
            className={`episode-tooltip ${visible ? 'visible' : ''}`}
            style={
                episode.still_path ? tmdbImg(episode.still_path, 'w185') : {}
            }
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            <div className='content'>
                <div className='top'>
                    <div className='number'>{episode.episode_number}</div>
                    <div className='title'>{episode.name}</div>
                </div>
                <div className='overview'>{episode.overview}</div>
                <div className='buttons'>
                    <button
                        className='set-watched secondary click-bop'
                        onClick={() => setWatched((old) => !old)}
                    >
                        <div className='icon'>
                            {watched ? <CheckCircleSolid /> : <CheckCircle />}
                        </div>
                        <div className='text'>
                            {watched ? 'Set Unwatched' : 'Set Watched'}
                        </div>
                    </button>
                    <button className='play' onClick={() => playFile(episode.file_path!)}>
                        <div className='icon'>
                            <PlaySolid />
                        </div>
                        <div className='text'>Play</div>
                    </button>
                </div>
            </div>
        </div>
    );
}
