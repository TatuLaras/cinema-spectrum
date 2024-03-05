import { tmdbImg } from '@renderer/helpers';
import { Episode } from 'src/shared';
import EpisodeTooltip from './EpisodeTooltip';
import { useEffect, useState } from 'react';
import { playFile } from '@renderer/ipcActions';

type Props = { episode: Episode };

export default function EpisodeListItem({ episode }: Props) {
    const [tooltipVisible, setTooltipVisible] = useState<boolean>(false);
    const [shouldTooltipBeVisible, setShouldTooltipBeVisible] =
        useState<boolean>(false);

    const tooltipDelay = 600;

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
                onClick={() =>
                    episode?.file_path && playFile(episode.file_path)
                }
            >
                <div
                    className='still'
                    style={
                        episode.still_path
                            ? tmdbImg(episode.still_path, 'w185')
                            : {}
                    }
                ></div>
                <div className='info'>
                    <div className='title'>
                        <span className='number'>{episode.episode_number}</span>
                        {episode.name}
                    </div>
                </div>
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
