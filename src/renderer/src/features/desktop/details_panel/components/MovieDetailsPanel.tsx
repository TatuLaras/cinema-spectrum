import { MovieMetadata } from 'src/shared';
import MovieExtraInfo from '@renderer/shared/components/MovieExtraInfo';
import { useAppSelector, useAppDispatch } from '@renderer/shared/hooks/redux_hooks';
import { unbookmark, bookmark, unwatch, watch } from '@renderer/shared/slices/mediaSetsSlice';
import { tmdbImg } from '@renderer/shared/utils/css_variable_utils';
import { playFile } from '@renderer/shared/utils/ipc_actions';
import { inMediaSet, mediaId } from '@renderer/shared/utils/media_set_utils';
import { PlaySolid, StarSolid, Star, CheckCircleSolid, CheckCircle } from 'iconoir-react';
import Rating from './Rating';

import '../styles/details_panel.scss';

type Props = {
    movie: MovieMetadata | null;
    visible?: boolean;
    onClose: () => void;
};

export default function MovieDetailsPanel({
    movie,
    visible = true,
    onClose = () => {},
}: Props) {
    const bookmarked = useAppSelector((state) => state.media_sets.bookmarked);
    const watched = useAppSelector((state) => state.media_sets.watched);
    const dispatch = useAppDispatch();

    const isBookmarked: boolean = inMediaSet(movie?.id, bookmarked, 'movie');
    const isWatched: boolean = inMediaSet(movie?.id, watched, 'movie');

    function toggleBookmark() {
        if (!movie) return;

        isBookmarked
            ? dispatch(unbookmark(mediaId(movie.id, 'movie')))
            : dispatch(bookmark(mediaId(movie.id, 'movie')));
    }

    function toggleWatched() {
        if (!movie) return;

        const id = mediaId(movie.id, 'movie');
        isWatched ? dispatch(unwatch(id)) : dispatch(watch(id));
    }

    function play() {
        if (!movie) return;

        dispatch(watch(mediaId(movie.id, 'movie')));

        if (movie?.file_path) playFile(movie.file_path);
    }

    return (
        <div
            className={`details-panel ${visible ? 'visible' : ''}`}
            onClick={onClose}
        >
            <div
                className='bg'
                style={
                    movie?.backdrop_path
                        ? tmdbImg(movie.backdrop_path ?? '', 'w300')
                        : {}
                }
            >
                <div
                    className='inner'
                    onClick={(e) => {
                        e.stopPropagation();
                    }}
                    style={movie?.poster_path ? tmdbImg(movie.poster_path) : {}}
                >
                    <div className='poster'></div>
                    <div className='left'>
                        <div className='reserved'></div>
                        <div className='buttons'>
                            <button className='play' onClick={play}>
                                <div className='icon'>
                                    <PlaySolid />
                                </div>
                                <div className='text'>Play Movie</div>
                            </button>
                            <button
                                className='favorite secondary click-bop'
                                onClick={() => toggleBookmark()}
                            >
                                <div className='icon'>
                                    {isBookmarked ? <StarSolid /> : <Star />}
                                </div>
                                <div className='text'>
                                    {isBookmarked ? 'Unbookmark' : 'Bookmark'}
                                </div>
                            </button>
                            <button
                                className='set-watched secondary click-bop'
                                onClick={toggleWatched}
                            >
                                <div className='icon'>
                                    {isWatched ? (
                                        <CheckCircleSolid />
                                    ) : (
                                        <CheckCircle />
                                    )}
                                </div>
                                <div className='text'>
                                    {isWatched
                                        ? 'Set Not Watched'
                                        : 'Set Watched'}
                                </div>
                            </button>
                        </div>
                    </div>
                    <div className='right'>
                        <div className='first'>
                            <div className='top-portion'>
                                <div className='left'>
                                    <div className='title'>{movie?.title}</div>
                                    <MovieExtraInfo movie={movie} />
                                </div>
                                <Rating voteAverage={movie?.vote_average} />
                            </div>
                            <div className='overview'>{movie?.overview}</div>
                            <div className='created-by'>
                                {movie?.credits?.crew &&
                                    movie.credits.crew
                                        .filter(
                                            (x) =>
                                                x.job === 'Director' ||
                                                x.job === 'Writer',
                                        )
                                        .sort((a, _) =>
                                            a.job === 'Director' ? -1 : 1,
                                        )
                                        .slice(0, 3)
                                        .map((crew_item, i) => (
                                            <p key={i}>
                                                {crew_item.job}:{' '}
                                                {crew_item.name}
                                            </p>
                                        ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
