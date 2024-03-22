import { SeasonDetails } from 'src/shared';
import { useEffect, useState } from 'react';
import EpisodeListItem from './EpisodeListItem';

import '../styles/episodes_list.scss';

type Props = { seasons: SeasonDetails[] };

export default function EpisodesList({ seasons }: Props) {
    const [selectedSeason, setSelectedSeason] = useState<number>(0);

    useEffect(() => {
        setSelectedSeason(0);
    }, [seasons]);

    if (seasons.length === 0) return null;

    return (
        <div className='episode-list'>
            <div className='tabs'>
                {seasons.map((season, i) => (
                    <div
                        key={i}
                        className={`tab ${i === selectedSeason ? 'selected' : ''}`}
                        onClick={() => setSelectedSeason(i)}
                    >
                        <div className='text'>{season.name}</div>
                    </div>
                ))}
            </div>
            <div className='episodes'>
                {seasons[selectedSeason] &&
                    seasons[selectedSeason].episodes.map((episode, i) => (
                        <EpisodeListItem episode={episode} key={i} />
                    ))}
            </div>
        </div>
    );
}
