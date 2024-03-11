import {
    useAppDispatch,
    useAppSelector,
} from '@renderer/shared/hooks/redux_hooks';
import { useKeyboard } from '@renderer/shared/hooks/useKeyboard';
import {
    toggleBookmark,
    toggleWatched,
    watch,
} from '@renderer/shared/slices/mediaSetsSlice';
import { playFile } from '@renderer/shared/utils/ipc_actions';
import { getMediaId, inMediaSet } from '@renderer/shared/utils/media_set_utils';
import {
    CheckCircle,
    CheckCircleSolid,
    List,
    PlaySolid,
    Star,
    StarSolid,
} from 'iconoir-react';
import { useEffect, useMemo, useState } from 'react';
import { MovieMetadata, TvMetadata } from 'src/shared';

import '../styles/tv_menu.scss';

type Props = {
    visible?: boolean;
    item: MovieMetadata | TvMetadata;
};

interface MenuItem {
    icon: JSX.Element;
    text: string;
    onSelected: () => void;
}

export default function Menu({ visible = true, item }: Props) {
    const dispatch = useAppDispatch();

    const view = useAppSelector((state) => state.view.value);
    const bookmarked = useAppSelector((state) => state.media_sets.bookmarked);
    const watched = useAppSelector((state) => state.media_sets.watched);

    item = view === 'tv' ? (item as TvMetadata) : (item as MovieMetadata);
    const type = view === 'tv' ? 'tv' : 'movie';

    const mediaId = getMediaId(item.id, type);

    const thisBookmarked = inMediaSet(mediaId, bookmarked);
    const thisWatched = inMediaSet(mediaId, watched);

    const [selected, setSelected] = useState<number>(0);

    // Select menu items depending on if the inspected item is movie or tv show
    const menuItems: MenuItem[] = useMemo(() => {
        if (type === 'tv') {
            // const tv = item as TvMetadata;
            return [
                {
                    icon: <PlaySolid />,
                    text: 'Play Season 1 Episode 1',
                    onSelected: () => alert('play'),
                },
                {
                    icon: <List />,
                    text: 'View Episodes',
                    onSelected: () => alert('episodes'),
                },
                {
                    icon: thisBookmarked ? <StarSolid /> : <Star />,
                    text: thisBookmarked ? 'Unbookmark' : 'Bookmark',
                    onSelected: () => dispatch(toggleBookmark(mediaId)),
                },
            ];
        }

        const movie = item as MovieMetadata;
        return [
            {
                icon: <PlaySolid />,
                text: 'Play Movie',
                onSelected: () => {
                    if (!movie.file_path) return;
                    playFile(movie.file_path);
                    dispatch(watch(mediaId));
                },
            },
            {
                icon: thisBookmarked ? <StarSolid /> : <Star />,
                text: thisBookmarked ? 'Unbookmark' : 'Bookmark',
                onSelected: () => dispatch(toggleBookmark(mediaId)),
            },
            {
                icon: thisWatched ? <CheckCircleSolid /> : <CheckCircle />,
                text: thisWatched ? 'Set Not Watched' : 'Set Watched',
                onSelected: () => dispatch(toggleWatched(mediaId)),
            },
        ];
    }, [view, item, thisBookmarked, thisWatched]);

    useKeyboard(
        'ArrowDown',
        () => setSelected((old) => (old + 1) % menuItems.length),
        [menuItems],
        [visible],
    );
    useKeyboard(
        'ArrowUp',
        () =>
            setSelected((old) => {
                const newVal = old - 1;
                if (newVal < 0) return menuItems.length - 1;
                return newVal;
            }),
        [menuItems],
        [visible],
    );
    useKeyboard(
        'Enter',
        () => menuItems[selected].onSelected(),
        [menuItems, selected],
        [visible, menuItems[selected] ? true : false],
    );

    useEffect(() => {
        setSelected(0);
    }, [view, item]);

    return (
        <div className='tv-menu'>
            {menuItems.map((menuItem, i) => (
                <div
                    className={`menu-item ${i === selected ? 'selected' : ''}`}
                    onClick={() => {
                        if (selected === i && menuItems[i])
                            menuItems[i].onSelected();
                        setSelected(i);
                    }}
                    key={i}
                >
                    {menuItem.icon}
                    <div className='text'>{menuItem.text}</div>
                </div>
            ))}
        </div>
    );
}
