import { TvMetadata } from 'src/shared';
import { useEffect, useRef } from 'react';
import Rating from './Rating';
import EpisodesList from './EpisodesList';
import TvShowExtraInfo from '@renderer/shared/components/TvShowExtraInfo';
import { tmdbImg } from '@renderer/shared/utils/css_variable_utils';

import '../styles/details_panel.scss';
import PlayButton from '@renderer/shared/components/PlayButton';
import BookmarkButton from '@renderer/shared/components/BookmarkButton';
import { getMediaId } from '@renderer/shared/utils/media_set_utils';

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
    
    useEffect(() => {
        if (visible) rightRef.current?.scrollTo({ top: 0 });
    }, [visible]);

    return (
        <div
            className={`details-panel tv ${visible ? 'visible' : ''}`}
            onClick={onClose}
        >
            <div
                className='bg'
                style={
                    tvShow?.backdrop_path
                        ? tmdbImg(tvShow.backdrop_path, 'w300')
                        : {}
                }
            >
                <div
                    className='inner'
                    onClick={(e) => {
                        e.stopPropagation();
                    }}
                    style={
                        tvShow?.poster_path ? tmdbImg(tvShow.poster_path) : {}
                    }
                >
                    <div className='poster'></div>
                    <div className='left'>
                        <div className='reserved'></div>
                        <div className='buttons'>
                            <PlayButton mediaId={mediaId} fileToPlay={null}>
                                Continue
                            </PlayButton>
                            <BookmarkButton mediaId={mediaId} />
                        </div>
                    </div>
                    <div className='right' ref={rightRef}>
                        <div className='top-portion'>
                            <div className='left'>
                                <div className='title'>{tvShow?.name}</div>
                                <TvShowExtraInfo tvShow={tvShow} />
                            </div>
                            <Rating voteAverage={tvShow?.vote_average} />
                        </div>
                        <div className='overview'>{tvShow?.overview}</div>
                        <div className='created-by'>
                            {tvShow?.created_by &&
                                tvShow.created_by.length > 0 &&
                                'Created by: ' +
                                    tvShow.created_by
                                        .map((item) => item.name)
                                        .join(', ')}
                        </div>
                        {tvShow?.seasons && (
                            <EpisodesList
                                seasons={tvShow?.seasons.filter((season) => {
                                    for (let episode of season.episodes) {
                                        if (episode.file_path) return true;
                                    }
                                    return false;
                                })}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
