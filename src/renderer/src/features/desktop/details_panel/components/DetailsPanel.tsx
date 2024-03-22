import { MovieMetadata, TvMetadata } from 'src/shared';
import MovieDetailsPanel from './MovieDetailsPanel';
import TvShowDetailsPanel from './TvShowDetailsPanel';
import { isMovie } from '@renderer/shared/utils/misc_helpers';

type Props = {
    item: MovieMetadata | TvMetadata | null;
    onClose: () => void;
    visible: boolean;
};

export default function DetailsPanel({ item, onClose, visible }: Props) {
    if (!item) return null;

    if (isMovie(item))
        return (
            <MovieDetailsPanel
                movie={item as MovieMetadata | null}
                onClose={onClose}
                visible={visible}
            />
        );

    return (
        <TvShowDetailsPanel
            tvShow={item as TvMetadata | null}
            onClose={onClose}
            visible={visible}
        />
    );
}
