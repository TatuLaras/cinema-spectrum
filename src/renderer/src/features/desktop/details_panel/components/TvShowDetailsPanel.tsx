import { Episode, TMDBTypes, TvMetadata } from 'src/shared';
import { useEffect, useMemo, useRef } from 'react';
import Rating from './Rating';
import EpisodesList from './EpisodesList';
import TvShowExtraInfo from '@renderer/shared/components/TvShowExtraInfo';
import { tmdbImg } from '@renderer/shared/utils/css_variable_utils';

import '../styles/details_panel.scss';
import PlayButton from '@renderer/shared/components/PlayButton';
import BookmarkButton from '@renderer/shared/components/BookmarkButton';
import {
    getEpisodeMediaId,
    getMediaId,
    inMediaSet,
} from '@renderer/shared/utils/media_set_utils';
import { useAppSelector } from '@renderer/shared/hooks/redux_hooks';
import { padZeros } from '@renderer/shared/utils/string_helpers';
import getContinueEpisode from '@renderer/shared/utils/getContinueEpisode';

type Props = {
    tvShow: TvMetadata | null;
    visible?: boolean;
    onClose: () => void;
};

export default function TvShowDetailsPanel({
    tvShow,
    visible = true,
    onClose = () => {},
}: Props) {
    const rightRef = useRef<HTMLDivElement | null>(null);
    const mediaId = getMediaId(tvShow?.id, 'tv');
    const watched = useAppSelector((state) => state.media_sets.watched);

    // Filter seasons by which of them have an episode as a file
    const filteredSeasons = useMemo(() => {
        if (!tvShow?.seasons) return [];

        return tvShow.seasons.filter((season) => {
            for (const episode of season.episodes)
                if (episode.file_path) return true;
            return false;
        });
    }, [tvShow]);

    // Get the latest unwatched episode (continue episode)
    const continueEpisode = useMemo(
        () => getContinueEpisode(tvShow!, watched),
        [tvShow, watched],
    );

    useEffect(() => {
        if (visible) rightRef.current?.scrollTo({ top: 0 });
    }, [visible]);

    return (
        <div
            className={`details-panel tv ${visible ? 'visible' : ''}`}
            onClick={onClose}
        >
            <div
                className="bg"
                style={
                    tvShow?.backdrop_path
                        ? tmdbImg<TMDBTypes.BackdropImageSize>(
                              tvShow.backdrop_path,
                              'w300',
                          )
                        : {}
                }
            >
                <div
                    className="inner"
                    onClick={(e) => {
                        e.stopPropagation();
                    }}
                    style={
                        tvShow?.poster_path
                            ? tmdbImg<TMDBTypes.PosterImageSize>(
                                  tvShow.poster_path,
                                  'w342',
                              )
                            : {}
                    }
                >
                    <div className="poster"></div>
                    <div className="left">
                        <div className="reserved"></div>
                        <div className="buttons">
                            {continueEpisode && (
                                <PlayButton
                                    mediaId={getEpisodeMediaId(
                                        continueEpisode?.show_id,
                                        continueEpisode?.id,
                                    )}
                                    fileToPlay={continueEpisode?.file_path}
                                >
                                    {`Play S${padZeros(
                                        continueEpisode?.season_number,
                                        2,
                                    )}E${padZeros(
                                        continueEpisode?.episode_number,
                                        2,
                                    )}`}
                                </PlayButton>
                            )}
                            <BookmarkButton mediaId={mediaId} />
                        </div>
                    </div>
                    <div className="right" ref={rightRef}>
                        <div className="top-portion">
                            <div className="left">
                                <div className="title">{tvShow?.name}</div>
                                <TvShowExtraInfo tvShow={tvShow} />
                            </div>
                            <Rating voteAverage={tvShow?.vote_average} />
                        </div>
                        <div className="tagline">{tvShow?.tagline}</div>
                        <div className="overview">{tvShow?.overview}</div>
                        <div className="created-by">
                            {tvShow?.created_by &&
                                tvShow.created_by.length > 0 &&
                                'Created by: ' +
                                    tvShow.created_by
                                        .map((item) => item.name)
                                        .join(', ')}
                        </div>

                        <EpisodesList seasons={filteredSeasons} />
                    </div>
                </div>
            </div>
        </div>
    );
}
