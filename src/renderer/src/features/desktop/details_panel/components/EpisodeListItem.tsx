import { Episode, TMDBTypes } from 'src/shared';
import EpisodeTooltip from './EpisodeTooltip';
import { useEffect, useState } from 'react';
import { tmdbImg } from '@renderer/shared/utils/css_variable_utils';
import { playFile } from '@renderer/shared/utils/ipc_actions';
import {
    getEpisodeMediaId,
    inMediaSet,
} from '@renderer/shared/utils/media_set_utils';
import {
    useAppDispatch,
    useAppSelector,
} from '@renderer/shared/hooks/redux_hooks';
import { Check } from 'iconoir-react';
import { watch } from '@renderer/shared/slices/mediaSetsSlice';

type Props = { episode: Episode };

export default function EpisodeListItem({ episode }: Props) {
    const dispatch = useAppDispatch();
    const watched = useAppSelector((state) => state.media_sets.watched);
    const [tooltipVisible, setTooltipVisible] = useState<boolean>(false);
    const [shouldTooltipBeVisible, setShouldTooltipBeVisible] =
        useState<boolean>(false);

    const tooltipDelay = 600;

    const mediaId = getEpisodeMediaId(episode.show_id, episode.id);
    const thisWatched = inMediaSet(mediaId, watched);

    // Delay for showing the tooltip on each hover state
    useEffect(() => {
        let timeout = setTimeout(() => {
            setTooltipVisible(shouldTooltipBeVisible);
        }, tooltipDelay);

        return () => {
            clearTimeout(timeout);
        };
    }, [shouldTooltipBeVisible]);

    if (!episode.file_path) return null;

    return (
        <>
            <div
                className='episode'
                onMouseEnter={() => setShouldTooltipBeVisible(true)}
                onMouseLeave={() => setShouldTooltipBeVisible(false)}
                onClick={() => {
                    if (episode?.file_path) playFile(episode.file_path);
                    dispatch(
                        watch(getEpisodeMediaId(episode.show_id, episode.id)),
                    );
                }}
            >
                <div
                    className='still'
                    style={
                        episode.still_path
                            ? tmdbImg<TMDBTypes.StillImageSize>(
                                  episode.still_path,
                                  'w185',
                              )
                            : {}
                    }
                ></div>
                <div className='info'>
                    <div className='title'>
                        <span className='number'>{episode.episode_number}</span>
                        {episode.name}
                    </div>
                </div>
                {thisWatched && <Check />}
            </div>
            <EpisodeTooltip
                visible={tooltipVisible}
                episode={episode}
                onMouseEnter={() => setShouldTooltipBeVisible(true)}
                onMouseLeave={() => setShouldTooltipBeVisible(false)}
            />
        </>
    );
}
