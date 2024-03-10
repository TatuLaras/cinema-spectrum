import { tmdbImg } from '@renderer/shared/utils/css_variable_utils';
import '../styles/media_card.scss';

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
            style={posterPath ? tmdbImg(posterPath) : {}}
            onClick={onClick}
        >
            <div className='extra-info'>
                <div className='name'>{name}</div>
            </div>
        </div>
    );
}
