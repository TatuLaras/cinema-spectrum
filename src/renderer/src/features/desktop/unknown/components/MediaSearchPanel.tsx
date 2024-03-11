import SearchBar from '@renderer/shared/components/SearchBar';
import '../styles/media_search_panel.scss';
import { useEffect, useState } from 'react';
import { TMDBTypes } from 'src/shared';
import { searchMovie, searchTv } from '@renderer/shared/utils/ipc_actions';
import {
    movieSearchResultsToBrowseItems,
    tvSearchResultsToBrowseItems,
} from '@renderer/shared/utils/metadata_to_browse_item';
import { BrowseItem, UnknownItem } from '@renderer/shared/types/common_types';

type Props = {
    selected: UnknownItem | null;
    onSelected: (id: number, item: UnknownItem) => void;
};

export default function MediaSearchPanel({ selected, onSelected }: Props) {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [results, setResults] = useState<
        BrowseItem<TMDBTypes.Movie | TMDBTypes.Tv>[]
    >([]);

    useEffect(() => {
        if (searchQuery.length === 0) {
            setResults([]);
            return;
        }
        if (selected?.type === 'movie')
            searchMovie(searchQuery).then((results) => {
                if (results)
                    setResults(movieSearchResultsToBrowseItems(results));
            });
        else if (selected?.type === 'tv')
            searchTv(searchQuery).then((results) => {
                if (results) setResults(tvSearchResultsToBrowseItems(results));
            });
    }, [searchQuery]);

    useEffect(() => {
        setSearchQuery('');
        setResults([]);
    }, [selected]);

    if (!selected) return null;

    return (
        <div id='media-search-panel'>
            <div className='filename'>{selected.filename}</div>
            <SearchBar searchQuery={searchQuery} onChange={setSearchQuery} />
            <div className='results'>
                {results.slice(0, 5).map((result, i) => (
                    <div
                        className='result'
                        key={i}
                        onClick={() =>
                            onSelected(result.actual_data.id, selected)
                        }
                    >
                        <div className='name'>{result.name}</div>
                        <div className='year'>
                            {new Date(result.date).getFullYear().toString()}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
