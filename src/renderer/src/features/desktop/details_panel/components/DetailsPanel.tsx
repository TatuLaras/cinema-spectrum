import { MovieMetadata, TvMetadata } from 'src/shared';
import MovieDetailsPanel from './MovieDetailsPanel';
import TvDetailsPanel from './TvDetailsPanel';

type Props = {
    type: 'tv' | 'movie';
    item: MovieMetadata | TvMetadata | null;
    onClose: () => void;
    visible: boolean;
};

export default function DetailsPanel({ type, item, onClose, visible }: Props) {
    if (type === 'tv')
        return (
            <TvDetailsPanel
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
