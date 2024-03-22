import { Search } from 'iconoir-react';
import { useKeyboard } from '@renderer/shared/hooks/useKeyboard';

import '../styles/search_bar.scss';
import { useRef } from 'react';

type Props = {
    searchQuery: string;
    onChange: (newSearchQuery: string) => void;
};

export default function SearchBar({ searchQuery, onChange }: Props) {
    const inputRef = useRef<HTMLInputElement | null>(null);

    useKeyboard(
        'f',
        () => {
            inputRef.current?.focus();
        },
        [],
        [],
        true,
    );

    return (
        <div className="search-bar">
            <div
                className={`search-field ${searchQuery.length > 0 ? 'active' : ''}`}
            >
                <input
                    type="text"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={(e) => onChange(e.target.value)}
                    ref={inputRef}
                />
                <Search className="icon" />
            </div>
        </div>
    );
}
