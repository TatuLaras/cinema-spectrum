import { useEffect, useRef } from 'react';
import { tmdbImg } from '@renderer/shared/utils/css_variable_utils';

import '../styles/media_card_tv.scss';

type Props = {
    posterPath?: string | null;
    onClick: () => void;
    current?: boolean;
    focusToCurrent?: (el: HTMLDivElement) => void;
};

export default function TvMediaCard({
    posterPath = null,
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
