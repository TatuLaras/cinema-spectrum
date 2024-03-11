import { MovieMetadata } from 'src/shared';
import countryAliases from '../content/countryAliases';
import formatTime from '../utils/formatTime';

type Props = { movie: MovieMetadata | null };

export default function MovieExtraInfo({ movie }: Props) {
    if(!movie) return null;
    return (
        <ul className='extra-info-row'>
            <li>{new Date(movie?.release_date).getFullYear()}</li>
            <li>{formatTime(movie?.runtime)}</li>
            <li>
                {movie?.genres
                    // ?.slice(0, 3)
                    .map((genre) => genre.name)
                    .join(', ')}
            </li>
            {movie?.production_countries &&
                movie.production_countries.length > 0 && (
                    <li>
                        {movie?.production_countries
                            ?.slice(0, 2)
                            .map(
                                (country) =>
                                    countryAliases[country.name] ??
                                    country.name,
                            )
                            .join(', ')}
                    </li>
                )}
        </ul>
    );
}
