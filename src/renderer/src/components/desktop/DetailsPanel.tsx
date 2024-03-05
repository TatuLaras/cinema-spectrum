import { MovieMetadata, TvMetadata } from 'src/shared';
import TvDetailsPanel from './tv_details_panel/TvDetailsPanel';
import MovieDetailsPanel from './movie_details_panel/MovieDetailsPanel';

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
