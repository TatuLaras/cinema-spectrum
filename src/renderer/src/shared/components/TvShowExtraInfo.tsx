import { TvMetadata } from 'src/shared';
import countryAliases from '../content/countryAliases';

type Props = { tvShow: TvMetadata | null };

export default function TvShowExtraInfo({ tvShow }: Props) {
    if (!tvShow) return null;
    return (
        <ul className='extra-info-row'>
            <li>{tvShow?.first_air_date}</li>
            <li>
                {tvShow?.genres
                    ?.slice(0, 3)
                    .map((genre) => genre.name)
                    .join(', ')}
            </li>
            {tvShow?.production_countries &&
                tvShow.production_countries.length > 0 && (
                    <li>
                        {tvShow?.production_countries
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
