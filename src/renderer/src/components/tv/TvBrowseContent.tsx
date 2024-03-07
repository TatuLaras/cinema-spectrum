import {
    BrowseItem,
    CommonBrowseItem,
    MediaGroupTemplate,
} from '@renderer/common_types';
import { MovieMetadata, TvMetadata } from 'src/shared';
import { useEffect, useMemo, useRef, useState } from 'react';

import '../../styles/tv_browse_content.scss';
import TvMediaCard from './TvMediaCard';
import {
    useAppDispatch,
    useAppSelector,
    useGenres,
    useKeyboard,
} from '@renderer/hooks';
import DetailsHero from './DetailsHero';
import {
    browseItemIsBookmarked,
    makeGroupsFromTemplates,
    tmdbImg,
} from '@renderer/helpers';
import animateScrollTo from 'animated-scroll-to';
import { setSidePanelOpen } from '@renderer/state/tvUiSlice';

type Props = {
    items: BrowseItem<MovieMetadata | TvMetadata>[];
};

interface Indices {
    group: number;
    item: number;
    shouldOpenSidePanel: boolean;
}

export default function TvBrowseContent({ items }: Props) {
    const dispatch = useAppDispatch();
    const sidePanelOpen = useAppSelector(
        (state) => state.tv_ui.side_panel_open,
    );
    const [current, setCurrent] = useState<Indices>({
        group: 0,
        item: 0,
        shouldOpenSidePanel: false,
    });

    const contentRef = useRef<HTMLDivElement | null>(null);
    const bookmarked = useAppSelector((state) => state.bookmarked.value);

    const availableGenres = useGenres(items);

    const genreTemplates: MediaGroupTemplate[] = availableGenres.map(
        (genre) => ({
            name: genre,
            criteria: (item: CommonBrowseItem) => item.genres.includes(genre),
        }),
    );

    const groupTemplates: MediaGroupTemplate[] = [
        {
            name: 'All movies',
            criteria: (_) => true,
        },
        {
            name: 'Bookmarked',
            criteria: (item: CommonBrowseItem) =>
                browseItemIsBookmarked(item, bookmarked),
        },
        ...genreTemplates,
    ];

    const groupedItems = useMemo(
        () => makeGroupsFromTemplates(groupTemplates, items),
        [items, groupTemplates],
    );

    useKeyboard('ArrowRight', right, [sidePanelOpen]);
    useKeyboard('ArrowLeft', left, [sidePanelOpen]);
    useKeyboard('ArrowDown', down, [sidePanelOpen]);
    useKeyboard('ArrowUp', up, [sidePanelOpen]);

    function up() {
        if (sidePanelOpen) return;
        setCurrent((old) => {
            let newVal = old.group - 1;
            if (newVal < 0) newVal = groupedItems.length - 1;
            return {
                ...old,
                group: newVal,
                item: 0,
            };
        });
    }

    function down() {
        if (sidePanelOpen) return;
        setCurrent((old) => ({
            ...old,
            group: (old.group + 1) % groupedItems.length,
            item: 0,
        }));
    }

    function left() {
        if (sidePanelOpen) return;
        setCurrent((old) => {
            const newVal = old.item - 1;
            return {
                ...old,
                item: Math.max(0, newVal),
                shouldOpenSidePanel: newVal < 0,
            };
        });
    }

    function right() {
        if (sidePanelOpen) return;
        setCurrent((old) => ({
            ...old,
            item: (old.item + 1) % groupedItems[old.group].items.length,
        }));
    }

    useEffect(() => {
        if (current.shouldOpenSidePanel) {
            dispatch(setSidePanelOpen(true));
            setCurrent((old) => ({ ...old, shouldOpenSidePanel: false }));
        }
    }, [current]);

    const currentItem =
        groupedItems[current.group].items[current.item]?.actual_data;

    function focusToCurrent(el: HTMLDivElement) {
        const rect = el.getBoundingClientRect();
        const group: HTMLDivElement = el.closest('.group')!;
        const groupRect = group?.getBoundingClientRect();
        const itemsEl = el.closest('.items');
        if (!rect || !groupRect || !itemsEl) return;

        // contentRef.current?.scrollTo({
        //     top: group?.offsetTop,
        //     behavior: 'smooth',

        // });

        animateScrollTo(group?.offsetTop, {
            elementToScroll: contentRef.current!,
            speed: 250,
        });

        if (rect.left < 150)
            animateScrollTo([el.offsetLeft - 150, null], {
                elementToScroll: itemsEl,
                speed: 250,
            });
        else if (rect.right > window.innerWidth - 100)
            animateScrollTo([el.offsetLeft - itemsEl.clientWidth + 350, null], {
                elementToScroll: itemsEl,
                speed: 250,
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
                {currentItem && <DetailsHero item={currentItem} />}
                <div className='content' ref={contentRef}>
                    {groupedItems.map((group, group_i) => (
                        <div className='group'>
                            <div className='title'>{group.name}</div>
                            <div className='items'>
                                {group.items.map(
                                    (el: CommonBrowseItem, item_i: number) => (
                                        <TvMediaCard
                                            current={
                                                item_i === current.item &&
                                                group_i === current.group
                                            }
                                            name={el.name}
                                            posterPath={el.poster_path}
                                            key={item_i}
                                            onClick={() => {
                                                setCurrent((old) => ({
                                                    ...old,
                                                    item: item_i,
                                                    group: group_i,
                                                }));
                                            }}
                                            focusToCurrent={focusToCurrent}
                                        />
                                    ),
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
