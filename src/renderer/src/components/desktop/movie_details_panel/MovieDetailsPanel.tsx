import { MovieMetadata } from 'src/shared';

import '../../../styles/details_panel.scss';
import { bookmarkId, isBookmarked, tmdbImg } from '@renderer/helpers';
import { PlaySolid, Star, StarSolid } from 'iconoir-react';
import { playFile } from '@renderer/ipcActions';
import Rating from '../Rating';
import { useAppDispatch, useAppSelector } from '@renderer/hooks';
import { bookmark, unbookmark } from '@renderer/state/bookmarkedSlice';

type Props = {
    movie: MovieMetadata | null;
    visible?: boolean;
    onClose: () => void;
};

const countryAliases = {
    'United States of America': 'USA',
    'United Kingdom': 'UK',
};

export default function MovieDetailsPanel({
    movie,
    visible = true,
    onClose = () => {},
}: Props) {
    const bookmarks = useAppSelector((state) => state.bookmarked.value);
    const dispatch = useAppDispatch();

    const thisBookmarked: boolean = isBookmarked(movie?.id, bookmarks, 'movie');

    function toggleBookmark() {
        if (!movie) return;

        thisBookmarked
            ? dispatch(unbookmark(bookmarkId(movie.id, 'movie')))
            : dispatch(bookmark(bookmarkId(movie.id, 'movie')));
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
                            <button
                                className='play'
                                onClick={() =>
                                    movie?.file_path &&
                                    playFile(movie.file_path)
                                }
                            >
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
                                    {thisBookmarked ? <StarSolid /> : <Star />}
                                </div>
                                <div className='text'>
                                    {thisBookmarked ? 'Unbookmark' : 'Bookmark'}
                                </div>
                            </button>
                        </div>
                    </div>
                    <div className='right'>
                        <div className='first'>
                            <div className='top-portion'>
                                <div className='left'>
                                    <div className='title'>{movie?.title}</div>
                                    <ul className='extra-info'>
                                        <li>{movie?.runtime} min</li>
                                        <li>{movie?.release_date}</li>
                                        <li>
                                            {movie?.genres
                                                // ?.slice(0, 3)
                                                .map((genre) => genre.name)
                                                .join(', ')}
                                        </li>
                                        {movie?.production_countries &&
                                            movie.production_countries.length >
                                                0 && (
                                                <li>
                                                    {movie?.production_countries
                                                        ?.slice(0, 2)
                                                        .map(
                                                            (country) =>
                                                                countryAliases[
                                                                    country.name
                                                                ] ??
                                                                country.name,
                                                        )
                                                        .join(', ')}
                                                </li>
                                            )}
                                    </ul>
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
