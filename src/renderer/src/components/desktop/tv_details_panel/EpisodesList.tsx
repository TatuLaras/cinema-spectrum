import { SeasonDetails } from 'src/shared';

import '../../../styles/episodes_list.scss';
import { useEffect, useState } from 'react';
import EpisodeListItem from './EpisodeListItem';

type Props = { seasons: SeasonDetails[] };

export default function EpisodesList({ seasons }: Props) {
    const [selectedSeason, setSelectedSeason] = useState<SeasonDetails>(
        seasons[0],
    );

    useEffect(() => {
        setSelectedSeason(seasons[0]);
    }, [seasons]);

    return (
        <div className='episode-list'>
            <div className='tabs'>
                {seasons.map((season, i) => (
                    <div
                        key={i}
                        className={`tab ${season === selectedSeason ? 'selected' : ''}`}
                        onClick={() => setSelectedSeason(season)}
                    >
                        <div className='text'>{season.name}</div>
                    </div>
                ))}
            </div>
            <div className='episodes'>
                {selectedSeason.episodes.map((episode, i) => (
                    <EpisodeListItem episode={episode} key={i} />
                ))}
            </div>
        </div>
    );
}
