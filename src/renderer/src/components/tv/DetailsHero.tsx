import { MovieMetadata, TvMetadata } from 'src/shared';

type Props = {
    type: 'tv' | 'movie';
    item: MovieMetadata | TvMetadata | null;
};

export default function DetailsHero({ type, item }: Props) {
    if (type === 'movie') {
        item = item as MovieMetadata;
        return (
            <div
                className='hero'
            >
                <div className='inner'>
                    <div className='title'>{item.title}</div>
                    <div className='overview'>{item.overview}</div>
                </div>
            </div>
        );
    }

    return null;
}
