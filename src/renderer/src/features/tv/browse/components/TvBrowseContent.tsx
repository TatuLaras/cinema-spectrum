import {
    useAppDispatch,
    useAppSelector,
} from '@renderer/shared/hooks/redux_hooks';
import { useGenres } from '@renderer/shared/hooks/useGenres';
import { useKeyboard } from '@renderer/shared/hooks/useKeyboard';
import { setSidePanelOpen } from '@renderer/shared/slices/tvUiSlice';
import {
    BrowseItem,
    MediaGroupTemplate,
    CommonBrowseItem,
} from '@renderer/shared/types/common_types';
import { makeGroupsFromTemplates } from '@renderer/shared/utils/browse_item_utils';
import { tmdbImg } from '@renderer/shared/utils/css_variable_utils';
import { browseItemInMediaSet } from '@renderer/shared/utils/media_set_utils';
import animateScrollTo from 'animated-scroll-to';
import { useState, useRef, useMemo, useEffect } from 'react';
import { MovieMetadata, TMDBTypes, TvMetadata } from 'src/shared';
import DetailsHero from './DetailsHero';
import TvMediaCard from './TvMediaCard';

import '../styles/tv_browse_content.scss';
import TvDetailsPanel from '../../details_panel/components/TvDetailsPanel';

type Props = {
    items: BrowseItem<MovieMetadata | TvMetadata>[];
};

// Indices of a single poster card
interface Indices {
    group: number;
    item: number;
    shouldOpenSidePanel: boolean;
}

export default function TvBrowseContent({ items }: Props) {
    const dispatch = useAppDispatch();
    const [detailsPanelOpen, setDetailsPanelOpen] = useState(false);
    const [detailsPanelItem, setDetailsPanelItem] = useState<
        MovieMetadata | TvMetadata | null
    >(null);
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
            name: 'Recently added',
            criteria: (item: CommonBrowseItem) =>
                Math.abs(new Date().valueOf() - item.date_scanned.valueOf()) >=
                1000 * 60 * 60 * 24 * 2, // 2 days
        },
        {
            name: 'Watch again',
            criteria: (item: CommonBrowseItem) =>
                browseItemInMediaSet(item, watched),
        },
        ...genreGroupTemplates,
    ];

    const groupedItems = useMemo(() => {
        return makeGroupsFromTemplates(groupTemplates, items);
    }, [items, watched, bookmarked]);

    useEffect(() => {
        setCurrent((old) => ({
            ...old,
            group: 0,
            item: 0,
        }));
    }, [groupedItems]);

    useEffect(() => {
        setDetailsPanelOpen(false);
    }, [view]);

    const currentItem =
        groupedItems[current.group]?.items[current.item]?.actual_data;

    useKeyboard('ArrowRight', right, [], [!sidePanelOpen, !detailsPanelOpen]);
    useKeyboard('ArrowLeft', left, [], [!sidePanelOpen, !detailsPanelOpen]);
    useKeyboard('ArrowDown', down, [], [!sidePanelOpen, !detailsPanelOpen]);
    useKeyboard('ArrowUp', up, [], [!sidePanelOpen, !detailsPanelOpen]);
    useKeyboard(
        'Enter',
        select,
        [sidePanelOpen, currentItem],
        [currentItem ? true : false, !detailsPanelOpen, !sidePanelOpen],
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

    function select() {
        setDetailsPanelOpen(true);
        setDetailsPanelItem(JSON.parse(JSON.stringify(currentItem)));
    }

    useEffect(() => {
        if (current.shouldOpenSidePanel) {
            dispatch(setSidePanelOpen(true));
            setCurrent((old) => ({ ...old, shouldOpenSidePanel: false }));
        }
    }, [current]);

    // Scrolls menu to a specific card
    function focusToCurrent(el: HTMLDivElement) {
        const rect = el.getBoundingClientRect();
        const group: HTMLDivElement = el.closest('.group')!;
        const groupRect = group?.getBoundingClientRect();
        const itemsEl = el.closest('.items');
        if (!rect || !groupRect || !itemsEl) return;

        const animationSpeed = 0;

        animateScrollTo(group?.offsetTop, {
            elementToScroll: contentRef.current!,
            speed: animationSpeed,
        });

        if (rect.left < 150)
            animateScrollTo([el.offsetLeft - 150, null], {
                elementToScroll: itemsEl,
                speed: animationSpeed,
            });
        else if (rect.right > window.innerWidth - 100)
            animateScrollTo([el.offsetLeft - itemsEl.clientWidth + 350, null], {
                elementToScroll: itemsEl,
                speed: animationSpeed,
            });
    }

    return (
        <>
            <div
                className="tv-browse-content"
                style={
                    currentItem?.backdrop_path
                        ? tmdbImg<TMDBTypes.BackdropImageSize>(
                              currentItem.backdrop_path,
                              'w300',
                          )
                        : {}
                }
            >
                <TvDetailsPanel
                    item={detailsPanelItem}
                    visible={detailsPanelOpen}
                    onClose={() => setDetailsPanelOpen(false)}
                />
                {currentItem && <DetailsHero item={currentItem} />}
                <div className="content" ref={contentRef}>
                    {groupedItems.map((group, group_i) => (
                        <div className="group" key={group_i}>
                            <div className="title">{group.name}</div>
                            <div className="items">
                                {group.items.map(
                                    (el: CommonBrowseItem, item_i: number) => (
                                        <TvMediaCard
                                            current={
                                                item_i === current.item &&
                                                group_i === current.group
                                            }
                                            posterPath={el.poster_path}
                                            key={item_i}
                                            onClick={() => {
                                                if (sidePanelOpen) return;
                                                if (
                                                    item_i === current.item &&
                                                    group_i === current.group
                                                )
                                                    select();

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
