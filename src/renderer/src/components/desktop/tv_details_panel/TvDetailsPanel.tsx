import { TvMetadata } from 'src/shared';

import '../../../styles/details_panel.scss';
import { mediaId, inMediaSet, tmdbImg } from '@renderer/helpers';
import { PlaySolid, Star, StarSolid } from 'iconoir-react';
import { useEffect, useRef } from 'react';
import Rating from '../Rating';
import EpisodesList from './EpisodesList';
import { unbookmark, bookmark } from '@renderer/state/mediaSetsSlice';
import { useAppDispatch, useAppSelector } from '@renderer/hooks';
import TvShowExtraInfo from '@renderer/components/TvShowExtraInfo';

type Props = {
    tvShow: TvMetadata | null;
    visible?: boolean;
    onClose: () => void;
};

export default function TvDetailsPanel({
    tvShow,
    visible = true,
    onClose = () => {},
}: Props) {
    const bookmarks = useAppSelector((state) => state.media_sets.bookmarked);
    const dispatch = useAppDispatch();
    const rightRef = useRef<HTMLDivElement | null>(null);

    const thisBookmarked: boolean = inMediaSet(tvShow?.id, bookmarks, 'tv');

    function toggleBookmark() {
        if (!tvShow) return;

        thisBookmarked
            ? dispatch(unbookmark(mediaId(tvShow.id, 'tv')))
            : dispatch(bookmark(mediaId(tvShow.id, 'tv')));
    }

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
                            <button className='play' onClick={() => {}}>
                                <div className='icon'>
                                    <PlaySolid />
                                </div>
                                <div className='text'>Continue</div>
                            </button>
                            <button
                                className='favorite secondary click-bop'
                                onClick={toggleBookmark}
                            >
                                <div className='icon'>
                                    {thisBookmarked ? <StarSolid /> : <Star />}
                                </div>
                                <div className='text'>
                                    {thisBookmarked ? 'Unbookmark' : 'Bookmark'}
                                </div>
                            </button>
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
