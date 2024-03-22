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
import {
    getEpisodeMediaId,
    getMediaId,
    inMediaSet,
} from '@renderer/shared/utils/media_set_utils';
import {
    CheckCircle,
    CheckCircleSolid,
    List,
    PlaySolid,
    Star,
    StarSolid,
} from 'iconoir-react';
import { useEffect, useMemo, useState } from 'react';
import { MediaType, MovieMetadata, TvMetadata } from 'src/shared';

import '../styles/tv_menu.scss';
import { isMovie } from '@renderer/shared/utils/misc_helpers';
import getContinueEpisode from '@renderer/shared/utils/getContinueEpisode';
import { padZeros } from '@renderer/shared/utils/string_helpers';

type Props = {
    visible?: boolean;
    item: MovieMetadata | TvMetadata;
    onEpisodeListOpened: () => void;
};

interface MenuItem {
    icon: JSX.Element;
    text: string;
    onSelected: () => void;
}

export default function Menu({
    visible = true,
    item,
    onEpisodeListOpened,
}: Props) {
    const dispatch = useAppDispatch();

    const view = useAppSelector((state) => state.view.value);
    const bookmarked = useAppSelector((state) => state.media_sets.bookmarked);
    const watched = useAppSelector((state) => state.media_sets.watched);

    const type: MediaType = isMovie(item) ? 'movie' : 'tv';

    const mediaId = getMediaId(item.id, type);

    const thisBookmarked = inMediaSet(mediaId, bookmarked);
    const thisWatched = inMediaSet(mediaId, watched);

    // Latest unwatched episode
    const continueEpisode = useMemo(() => {
        if (type === 'movie') return null;
        const tvShow = item as TvMetadata;
        return getContinueEpisode(tvShow!, watched);
    }, [item, watched]);

    const [selected, setSelected] = useState<number>(0);

    // Select menu items depending on if the inspected item is movie or tv show
    const menuItems: MenuItem[] = useMemo(() => {
        if (type === 'tv') {
            return [
                {
                    icon: <PlaySolid />,
                    text: `Play S${padZeros(
                        continueEpisode?.season_number,
                        2,
                    )}E${padZeros(continueEpisode?.episode_number, 2)}`,
                    onSelected: () => {
                        if (!continueEpisode?.file_path!) return;

                        playFile(continueEpisode?.file_path!);
                        dispatch(
                            watch(
                                getEpisodeMediaId(
                                    continueEpisode.show_id,
                                    continueEpisode.id,
                                ),
                            ),
                        );
                    },
                },
                {
                    icon: <List />,
                    text: 'View Episodes',
                    onSelected: onEpisodeListOpened,
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
    }, [view, item, thisBookmarked, thisWatched, watched]);

    // Keyboard inputs

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
        <div className="tv-menu">
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
                    <div className="text">{menuItem.text}</div>
                </div>
            ))}
        </div>
    );
}
