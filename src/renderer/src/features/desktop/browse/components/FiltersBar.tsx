import { useEffect, useMemo, useState } from 'react';
import { useAppSelector } from '@renderer/shared/hooks/redux_hooks';
import { useGenres } from '@renderer/shared/hooks/useGenres';
import {
    BrowseItemSortFunction,
    CommonBrowseItem,
} from '@renderer/shared/types/common_types';
import { browseItemInMediaSet } from '@renderer/shared/utils/media_set_utils';

import '../styles/filters_bar.scss';
import SearchBar from '@renderer/shared/components/SearchBar';
import SortMenu from './SortMenu';
import GenreFilterMenu from './GenreFilterMenu';

type Props = {
    setItemsFiltered: React.Dispatch<React.SetStateAction<CommonBrowseItem[]>>;
    items: CommonBrowseItem[];
};

export default function FiltersBar({ setItemsFiltered, items }: Props) {
    const bookmarked = useAppSelector((state) => state.media_sets.bookmarked);
    const watched = useAppSelector((state) => state.media_sets.watched);

    const [selectedFilters, setSelectedFilters] = useState<Set<string>>(
        new Set(),
    );
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [sortingFunction, setSortingFunction] =
        useState<BrowseItemSortFunction | null>(null);
    const availableGenres = useGenres(items);

    const genreFilterFunctions = useMemo(() => {
        const ret = {};
        for (const genre of availableGenres) {
            ret[genre] = (item: CommonBrowseItem) =>
                item.genres.includes(genre);
        }
        return ret;
    }, [availableGenres]);

    const filters = useMemo(() => {
        setSelectedFilters(new Set());
        return ['Bookmarked', 'Watched'];
    }, [availableGenres]);

    function filterBySearch(
        itemsToFilter: CommonBrowseItem[],
    ): CommonBrowseItem[] {
        return itemsToFilter.filter((item) =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase()),
        );
    }

    function filterBySelectedFilters(
        itemsToFilter: CommonBrowseItem[],
    ): CommonBrowseItem[] {
        let filteredItems = itemsToFilter;

        for (let filter of selectedFilters) {
            filteredItems = filteredItems.filter(
                {
                    Bookmarked: (item: CommonBrowseItem) =>
                        browseItemInMediaSet(item, bookmarked),
                    Watched: (item: CommonBrowseItem) =>
                        browseItemInMediaSet(item, watched),
                    ...genreFilterFunctions,
                }[filter] ?? ((_) => true),
            );
        }

        return filteredItems;
    }

    useEffect(() => {
        if (!selectedFilters) {
            setItemsFiltered(items);
            return;
        }

        let moviesFiltered = items;

        moviesFiltered = filterBySearch(moviesFiltered);
        moviesFiltered = filterBySelectedFilters(moviesFiltered);

        if (sortingFunction) moviesFiltered.sort(sortingFunction);

        setItemsFiltered(moviesFiltered);
    }, [selectedFilters, bookmarked, watched, searchQuery, sortingFunction]);

    function applyFilter(filter: string) {
        if (selectedFilters.has(filter))
            setSelectedFilters((old) => {
                const copy = new Set(old);
                copy.delete(filter);
                return copy;
            });
        else
            setSelectedFilters((old) => {
                const copy = new Set(old);
                copy.add(filter);
                return copy;
            });
    }


    return (
        <>
            <SearchBar searchQuery={searchQuery} onChange={setSearchQuery} />
            <div className='filters-bar'>
                <div className='filters'>
                    {filters.map((filter, i) => (
                        <div
                            key={i}
                            className={`filter ${selectedFilters?.has(filter) ? 'selected' : ''}`}
                            onClick={() => applyFilter(filter)}
                        >
                            {filter}
                        </div>
                    ))}
                    <GenreFilterMenu genres={availableGenres} onGenreSelected={(g) => applyFilter(g!)}/>
                </div>

                <SortMenu
                    onSelectSortingFunction={(func) =>
                        setSortingFunction(() => {
                            return func;
                        })
                    }
                    onResetSortingFunction={() => setSortingFunction(null)}
                />
            </div>
        </>
    );
}
