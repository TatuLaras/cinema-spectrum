import { MovieMetadata, TMDBTypes } from 'src/shared';
import MovieExtraInfo from '@renderer/shared/components/MovieExtraInfo';
import { tmdbImg } from '@renderer/shared/utils/css_variable_utils';
import { getMediaId } from '@renderer/shared/utils/media_set_utils';
import Rating from './Rating';

import '../styles/details_panel.scss';
import PlayButton from '@renderer/shared/components/PlayButton';
import BookmarkButton from '@renderer/shared/components/BookmarkButton';
import SetWatchedButton from '@renderer/shared/components/SetWatchedButton';

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
    const mediaId = getMediaId(movie?.id, 'movie');

    return (
        <div
            className={`details-panel ${visible ? 'visible' : ''}`}
            onClick={onClose}
        >
            <div
                className="bg"
                style={
                    movie?.backdrop_path
                        ? tmdbImg<TMDBTypes.BackdropImageSize>(
                              movie.backdrop_path ?? '',
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
                        movie?.poster_path
                            ? tmdbImg<TMDBTypes.PosterImageSize>(
                                  movie.poster_path,
                                  'w342',
                              )
                            : {}
                    }
                >
                    <div className="poster"></div>
                    <div className="left">
                        <div className="reserved"></div>
                        <div className="buttons">
                            <PlayButton
                                mediaId={mediaId}
                                fileToPlay={movie?.file_path}
                            >
                                Play Movie
                            </PlayButton>
                            <BookmarkButton mediaId={mediaId} />
                            <SetWatchedButton mediaId={mediaId} />
                        </div>
                    </div>
                    <div className="right">
                        <div className="first">
                            <div className="top-portion">
                                <div className="left">
                                    <div className="title">{movie?.title}</div>
                                    <MovieExtraInfo movie={movie} />
                                </div>
                                <Rating voteAverage={movie?.vote_average} />
                            </div>
                            <div className="tagline">{movie?.tagline}</div>
                            <div className="overview">{movie?.overview}</div>
                            <div className="created-by">
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
