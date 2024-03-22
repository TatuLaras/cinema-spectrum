import MovieExtraInfo from '@renderer/shared/components/MovieExtraInfo';
import TvShowExtraInfo from '@renderer/shared/components/TvShowExtraInfo';
import { MovieMetadata, TvMetadata } from 'src/shared';

import '../styles/details.scss';
import { isMovie } from '../utils/misc_helpers';

type Props = { item: MovieMetadata | TvMetadata };

export default function Details({ item }: Props) {
    if (isMovie(item)) {
        item = item as MovieMetadata;
        return (
            <div className='details'>
                <div className='title'>{item.title}</div>
                <MovieExtraInfo movie={item} />
                {item.tagline && <div className='tagline'>{item.tagline}</div>}
                <div className='overview'>{item.overview}</div>
            </div>
        );
    }

    item = item as TvMetadata;
    return (
        <div className='details'>
            <div className='title'>{item.name}</div>
            <TvShowExtraInfo tvShow={item} />
            {item.tagline && <div className='tagline'>{item.tagline}</div>}
            <div className='overview'>{item.overview}</div>
        </div>
    );
}
