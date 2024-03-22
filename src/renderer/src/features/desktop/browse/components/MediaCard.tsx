import { tmdbImg } from '@renderer/shared/utils/css_variable_utils';
import '../styles/media_card.scss';
import { TMDBTypes } from 'src/shared';

type Props = {
    name: string;
    posterPath?: string | null;
    onClick: () => void;
};

export default function MediaCard({
    name,
    posterPath = null,
    onClick = () => {},
}: Props) {
    return (
        <div
            className='media-card'
            style={posterPath ? tmdbImg<TMDBTypes.PosterImageSize>(posterPath, 'w342') : {}}
            onClick={onClick}
        >
            <div className='extra-info'>
                <div className='name'>{name}</div>
            </div>
        </div>
    );
}
