import { Search } from 'iconoir-react';
import '../styles/search_bar.scss';

type Props = {
    searchQuery: string;
    onChange: (newSearchQuery: string) => void;
};

export default function SearchBar({ searchQuery, onChange }: Props) {
    return (
        <div className='search-bar'>
            <div
                className={`search-field ${searchQuery.length > 0 ? 'active' : ''}`}
            >
                <input
                    type='text'
                    placeholder='Search'
                    value={searchQuery}
                    onChange={(e) => onChange(e.target.value)}
                />
                <Search className='icon' />
            </div>
        </div>
    );
}
