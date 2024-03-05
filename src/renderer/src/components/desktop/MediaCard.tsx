import { tmdbImg } from '@renderer/helpers';
import '../../styles/media_card.scss';
import '../../styles/media_card_tv.scss';

type Props = {
    name: string;
    posterPath?: string | null;
    watched?: boolean;
    onClick: () => void;
};

export default function MediaCard({
    name,
    posterPath = null,
    watched = false,
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
