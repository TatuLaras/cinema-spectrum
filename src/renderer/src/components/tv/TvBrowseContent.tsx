import { BrowseItem } from '@renderer/common_types';
import { MovieMetadata, TvMetadata } from 'src/shared';
import { useRef, useState } from 'react';

import '../../styles/tv_browse_content.scss';
import TvMediaCard from './TvMediaCard';
import { useKeyboard } from '@renderer/hooks';
import DetailsHero from './DetailsHero';
import { tmdbImg } from '@renderer/helpers';

type Props = {
    items: BrowseItem<MovieMetadata | TvMetadata>[];
    type: 'tv' | 'movie';
};

export default function TvBrowseContent({ items, type }: Props) {
    const [current, setCurrent] = useState(0);
    const itemsRef = useRef<HTMLDivElement | null>(null);

    const currentItem = items[current]?.actual_data;

    useKeyboard('ArrowRight', () =>
        setCurrent((old) => (old + 1) % items.length),
    );
    useKeyboard('ArrowLeft', () =>
        setCurrent((old) => {
            const newVal = old - 1;
            if (newVal < 0) return items.length - 1;
            return newVal;
        }),
    );

    function focusToCurrent(el: HTMLDivElement) {
        const rect = el.getBoundingClientRect();
        if (rect.right >= window.innerWidth - 100)
            el.scrollIntoView({
                inline: 'end',
                block: 'start',
                behavior: 'smooth',
            });
        if (rect.left < 150)
            el.scrollIntoView({
                inline: 'start',
                block: 'start',
                behavior: 'smooth',
            });
    }

    return (
        <>
            <div
                className='tv-browse-content'
                style={
                    currentItem?.backdrop_path
                        ? tmdbImg(currentItem.backdrop_path, 'w300')
                        : {}
                }
            >
                <DetailsHero item={currentItem} type={type} />
                <div className='content'>
                    <div className='group'>
                        <div className='title'>All movies</div>
                        <div className='items' ref={itemsRef}>
                            {items.map((el: BrowseItem<any>, i: number) => (
                                <TvMediaCard
                                    current={i === current}
                                    name={el.name}
                                    posterPath={el.poster_path}
                                    key={i}
                                    onClick={() => {
                                        setCurrent(i);
                                    }}
                                    focusToCurrent={focusToCurrent}
                                />
                            ))}
                        </div>
                    </div>
                    <div className='group'>
                        <div className='title'>Crime</div>
                        <div className='items' ref={itemsRef}>
                            {items.map((el: BrowseItem<any>, i: number) => (
                                <TvMediaCard
                                    current={i === current}
                                    name={el.name}
                                    posterPath={el.poster_path}
                                    key={i}
                                    onClick={() => {
                                        setCurrent(i);
                                    }}
                                    focusToCurrent={focusToCurrent}
                                />
                            ))}
                        </div>
                    </div>
                    D
                </div>
            </div>
        </>
    );
}
