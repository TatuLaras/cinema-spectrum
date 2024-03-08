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
    browseItemInMediaSet,
    makeGroupsFromTemplates,
    mediaId,
    tmdbImg,
} from '@renderer/helpers';
import animateScrollTo from 'animated-scroll-to';
import { setSidePanelOpen } from '@renderer/state/tvUiSlice';
import { playFile } from '@renderer/ipcActions';
import { watch } from '@renderer/state/mediaSetsSlice';

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
    const view = useAppSelector((state) => state.view.value);
    const [current, setCurrent] = useState<Indices>({
        group: 0,
        item: 0,
        shouldOpenSidePanel: false,
    });

    const contentRef = useRef<HTMLDivElement | null>(null);
    const bookmarked = useAppSelector((state) => state.media_sets.bookmarked);
    const watched = useAppSelector((state) => state.media_sets.watched);

    const availableGenres = useGenres(items);

    const genreGroupTemplates: MediaGroupTemplate[] = availableGenres.map(
        (genre) => ({
            name: genre,
            criteria: (item: CommonBrowseItem) => item.genres.includes(genre),
        }),
    );

    const groupTemplates: MediaGroupTemplate[] = [
        {
            name: 'All items',
            criteria: (_) => true,
        },
        {
            name: 'Bookmarked',
            criteria: (item: CommonBrowseItem) =>
                browseItemInMediaSet(item, bookmarked),
        },
        {
            name: 'Not seen yet',
            criteria: (item: CommonBrowseItem) =>
                !browseItemInMediaSet(item, watched),
        },
        {
            name: 'Watch again',
            criteria: (item: CommonBrowseItem) =>
                browseItemInMediaSet(item, watched),
        },
        ...genreGroupTemplates,
    ];

    const groupedItems = useMemo(() => {
        console.log('regroup');
        return makeGroupsFromTemplates(groupTemplates, items);
    }, [items, watched, bookmarked]);

    const currentItem =
        groupedItems[current.group].items[current.item]?.actual_data;

    useKeyboard('ArrowRight', right, [], [!sidePanelOpen]);
    useKeyboard('ArrowLeft', left, [], [!sidePanelOpen]);
    useKeyboard('ArrowDown', down, [], [!sidePanelOpen]);
    useKeyboard('ArrowUp', up, [], [!sidePanelOpen]);
    useKeyboard(
        'Enter',
        play,
        [sidePanelOpen, currentItem],
        [currentItem ? true : false, view != 'tv'],
    );

    function up() {
        setCurrent((old) => ({
            ...old,
            group: Math.max(0, old.group - 1),
            item: 0,
        }));
    }

    function down() {
        setCurrent((old) => ({
            ...old,
            group: (old.group + 1) % groupedItems.length,
            item: 0,
        }));
    }

    function left() {
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
        setCurrent((old) => ({
            ...old,
            item: (old.item + 1) % groupedItems[old.group].items.length,
        }));
    }

    function play() {
        const movie = currentItem as MovieMetadata;
        dispatch(watch(mediaId(movie.id, 'movie')));
        if (movie?.file_path) playFile(movie.file_path);
    }

    useEffect(() => {
        if (current.shouldOpenSidePanel) {
            dispatch(setSidePanelOpen(true));
            setCurrent((old) => ({ ...old, shouldOpenSidePanel: false }));
        }
    }, [current]);

    function focusToCurrent(el: HTMLDivElement) {
        const rect = el.getBoundingClientRect();
        const group: HTMLDivElement = el.closest('.group')!;
        const groupRect = group?.getBoundingClientRect();
        const itemsEl = el.closest('.items');
        if (!rect || !groupRect || !itemsEl) return;

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
