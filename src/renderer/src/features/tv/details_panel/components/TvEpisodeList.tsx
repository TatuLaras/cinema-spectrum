import { useState } from 'react';
import { SeasonDetails } from 'src/shared';

import '../styles/tv_episode_list.scss';

type Props = {
    seasons: SeasonDetails[];
    visible?: boolean;
};

export default function TvEpisodeList({ seasons, visible = true }: Props) {
    const [selectedSeason, setSelectedSeason] = useState<number>(0);
    return (
        <div className={`episode-list tv-episode-list ${visible ? 'visible' : ''}`}>
            <div className="tabs">
                {seasons.map((season, i) => (
                    <div
                        key={i}
                        className={`tab ${i === selectedSeason ? 'selected' : ''}`}
                        onClick={() => setSelectedSeason(i)}
                    >
                        <div className="text">{season.name}</div>
                    </div>
                ))}
            </div>
            <div className="episodes">
                {seasons[selectedSeason] &&
                    seasons[selectedSeason].episodes.map((episode, i) => (
                        <div key={i}>{episode.name}</div>
                    ))}
            </div>
        </div>
    );
    // <EpisodeListItem episode={episode} key={i} />
}
