import { Check, NavArrowDown } from 'iconoir-react';
import { useRef, useState } from 'react';

import '../styles/genre_menu.scss';
import useOnClickSomewhereElse from '@renderer/shared/hooks/useOnClickSomewhereElse';

type Props = {
    genres: string[];
    onGenreSelected: (genre: string) => void;
};

export default function GenreFilterMenu({ genres, onGenreSelected }: Props) {
    const [selectedGenres, setSelectedGenres] = useState<Set<string>>(
        new Set(),
    );
    const [menuOpen, setMenuOpen] = useState(false);

    const genreMenuRef = useRef<HTMLDivElement | null>(null);

    useOnClickSomewhereElse(genreMenuRef.current, () => setMenuOpen(false));

    function applyGenre(genre: string) {
        onGenreSelected(genre);
        if (selectedGenres.has(genre))
            setSelectedGenres((old) => {
                const copy = new Set(old);
                copy.delete(genre);
                return copy;
            });
        else
            setSelectedGenres((old) => {
                const copy = new Set(old);
                copy.add(genre);
                return copy;
            });
    }

    return (
        <div
            className={`genre-menu ${menuOpen ? 'open' : ''}`}
            ref={genreMenuRef}
        >
            <div
                className={`filter more ${selectedGenres.size > 0 ? 'selected' : ''}`}
                onClick={() => setMenuOpen((old) => !old)}
            >
                Genres <NavArrowDown className="icon" />{' '}
            </div>
            <div className="pop-up">
                {genres.map((genre, i) => (
                    <div
                        className={`genre-item ${selectedGenres?.has(genre) ? 'selected' : ''}`}
                        key={i}
                        onClick={() => applyGenre(genre)}
                    >
                        <div className="icon">
                            <Check
                                className={`check ${selectedGenres?.has(genre) ? 'show' : ''}`}
                            />
                        </div>
                        <div className="title">{genre}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}
