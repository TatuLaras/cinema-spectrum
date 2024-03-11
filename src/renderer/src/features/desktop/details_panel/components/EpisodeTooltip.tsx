import { Episode, TMDBTypes } from 'src/shared';
import { tmdbImg } from '@renderer/shared/utils/css_variable_utils';
import { getEpisodeMediaId } from '@renderer/shared/utils/media_set_utils';
import '../styles/episode_tooltip.scss';
import PlayButton from '@renderer/shared/components/PlayButton';
import SetWatchedButton from '@renderer/shared/components/SetWatchedButton';

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
    const mediaId = getEpisodeMediaId(episode.show_id, episode.id);

    return (
        <div
            className={`episode-tooltip ${visible ? 'visible' : ''}`}
            style={
                episode.still_path
                    ? tmdbImg<TMDBTypes.StillImageSize>(
                          episode.still_path,
                          'w185',
                      )
                    : {}
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
                    <SetWatchedButton mediaId={mediaId} />
                    <PlayButton
                        mediaId={mediaId}
                        fileToPlay={episode.file_path}
                    >
                        Play
                    </PlayButton>
                </div>
            </div>
        </div>
    );
}
