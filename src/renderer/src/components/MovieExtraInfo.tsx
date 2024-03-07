import { countryAliases } from '@renderer/data';
import { MovieMetadata } from 'src/shared';

type Props = { movie: MovieMetadata | null };

export default function MovieExtraInfo({ movie }: Props) {
    if(!movie) return null;
    return (
        <ul className='extra-info-row'>
            <li>{movie?.runtime} min</li>
            <li>{movie?.release_date}</li>
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
