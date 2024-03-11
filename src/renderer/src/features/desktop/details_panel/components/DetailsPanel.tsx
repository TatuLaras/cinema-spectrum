import { MovieMetadata, TvMetadata } from 'src/shared';
import MovieDetailsPanel from './MovieDetailsPanel';
import TvShowDetailsPanel from './TvShowDetailsPanel';

type Props = {
    type: 'tv' | 'movie';
    item: MovieMetadata | TvMetadata | null;
    onClose: () => void;
    visible: boolean;
};

export default function DetailsPanel({ type, item, onClose, visible }: Props) {
    if (type === 'tv')
        return (
            <TvShowDetailsPanel
                tvShow={item as TvMetadata | null}
                onClose={onClose}
                visible={visible}
            />
        );

    return (
        <MovieDetailsPanel
            movie={item as MovieMetadata | null}
            onClose={onClose}
            visible={visible}
        />
    );
}
