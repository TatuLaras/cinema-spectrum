import { MovieMetadata, TvMetadata } from 'src/shared';

import '../styles/details_hero.scss';
import Details from './Details';

type Props = {
    item: MovieMetadata | TvMetadata | null;
};

export default function DetailsHero({ item }: Props) {
    return (
        <div className='details-hero'>
            <div className='inner'>{item && <Details item={item} />}</div>
        </div>
    );
}
