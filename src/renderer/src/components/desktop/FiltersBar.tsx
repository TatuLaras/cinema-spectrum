import { NavArrowDown, Search, SortDown } from 'iconoir-react';
import { useEffect, useMemo, useState } from 'react';
import { useAppSelector, useGenres } from '@renderer/hooks';
import { browseItemIsBookmarked } from '@renderer/helpers';
import '../../styles/filters_bar.scss';
import '../../styles/search_bar.scss';
import { CommonBrowseItem } from '@renderer/common_types';

type Props = {
    setItemsFiltered: React.Dispatch<React.SetStateAction<CommonBrowseItem[]>>;
    items: CommonBrowseItem[];
};

export default function FiltersBar({ setItemsFiltered, items }: Props) {
    const bookmarked = useAppSelector((state) => state.bookmarked.value);
    const [selectedFilters, setSelectedFilters] = useState<Set<string>>(
        new Set(),
    );
    const [searchQuery, setSearchQuery] = useState<string>('');

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
        const baseFilters: string[] = ['Bookmarked', 'Watched'];
        return [...baseFilters, ...availableGenres.slice(0, 5)];
    }, [availableGenres]);

    function filterBySearch(
        itemsToFilter: CommonBrowseItem[],
    ): CommonBrowseItem[] {
        return itemsToFilter.filter((item) =>
            item.name.toLowerCase().startsWith(searchQuery.toLowerCase()),
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
                        browseItemIsBookmarked(item, bookmarked),
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

        setItemsFiltered(moviesFiltered);
    }, [selectedFilters, bookmarked, searchQuery]);

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
            <div className='search-bar'>
                <div
                    className={`search-field ${searchQuery.length > 0 ? 'active' : ''}`}
                >
                    <input
                        type='text'
                        placeholder='Search'
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Search className='icon' />
                </div>
            </div>
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
                    <div className='filter more'>
                        More <NavArrowDown className='icon' />{' '}
                    </div>
                </div>
                <div className='sorting'>
                    <SortDown />
                </div>
            </div>
        </>
    );
}
