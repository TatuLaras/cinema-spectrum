import { tmdbImg } from '@renderer/helpers';
import '../../styles/media_card.scss';
import '../../styles/media_card_tv.scss';
import { useEffect, useRef } from 'react';


type Props = {
    name: string;
    posterPath?: string | null;
    watched?: boolean;
    onClick: () => void;
    current?: boolean;
    focusToCurrent?: (el:HTMLDivElement) => void;
};

export default function TvMediaCard({
    name,
    posterPath = null,
    watched = false,
    onClick = () => {},
    current = false,
    focusToCurrent = (_) => {},
}: Props) {

    const cardRef = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        if (!current) return;
        focusToCurrent(cardRef.current!);
    }, [current]);

    return (
        <div
            ref={cardRef}
            className={`media-card-tv ${current ? 'current' : ''}`}
            style={posterPath ? tmdbImg(posterPath) : {}}
            onClick={onClick}
        >
            <div className='selected-outline'></div>
        </div>
    );
}
