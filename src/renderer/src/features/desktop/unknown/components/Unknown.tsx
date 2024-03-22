import {
    useAppDispatch,
    useAppSelector,
} from '@renderer/shared/hooks/redux_hooks';
import '../styles/unknown.scss';
import CollapsibleList from './CollapsibleList';
import MediaSearchPanel from './MediaSearchPanel';
import { useState } from 'react';
import { UnknownItem } from '@renderer/shared/types/common_types';
import { attachMovieId, attachTvId } from '@renderer/shared/utils/ipc_actions';
import { TvFolderScanResult } from 'src/shared';
import {
    addMovie,
    addTvShow,
    deleteUnknownMovie,
    deleteUnknownTvShow,
} from '@renderer/shared/slices/mediaSlice';

type Props = {};

export default function Unknown({}: Props) {
    const [selected, setSelected] = useState<UnknownItem | null>(null);
    const dispatch = useAppDispatch();
    const unknownItems = useAppSelector(
        (state) => state.media.collection.unknown,
    );

    function baseName(file_path: string) {
        const parts = file_path.split('/');
        return parts[parts.length - 1];
    }

    function bindItem(id: number, item: UnknownItem) {
        if (item.type === 'movie') {
            const handle = item.actual_handle as string;
            attachMovieId(id, handle).then((movie) =>
                dispatch(addMovie(movie)),
            );
            dispatch(deleteUnknownMovie(handle));
        } else {
            const handle = item.actual_handle as TvFolderScanResult;
            attachTvId(id, handle).then((tvShow) =>
                dispatch(addTvShow(tvShow)),
            );
            dispatch(deleteUnknownTvShow(handle));
        }
        setSelected(null);
    }

    return (
        <div id='unknown'>
            <div className='left'>
                <CollapsibleList
                    items={unknownItems.movie_files.map((file, i) => ({
                        filename: baseName(file),
                        delete_id: i,
                        actual_handle: file,
                        type: 'movie',
                    }))}
                    title='Movies'
                    onSelected={setSelected}
                />
                <CollapsibleList
                    items={unknownItems.tv.map((tvResult, i) => ({
                        filename: baseName(tvResult.folder),
                        delete_id: i,
                        actual_handle: tvResult,
                        type: 'tv',
                    }))}
                    title='TV Shows'
                    onSelected={setSelected}
                />
            </div>
            <div className='right'>
                <MediaSearchPanel selected={selected} onSelected={bindItem} />
            </div>
        </div>
    );
}
