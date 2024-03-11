import { CheckCircle, CheckCircleSolid } from 'iconoir-react';
import { useAppSelector, useAppDispatch } from '../hooks/redux_hooks';
import { unwatch, watch } from '../slices/mediaSetsSlice';
import { mediaIdinMediaSet } from '../utils/media_set_utils';

type Props = {
    mediaId: string | undefined;
};

export default function SetWatchedButton({ mediaId }: Props) {
    const watched = useAppSelector((state) => state.media_sets.watched);
    const dispatch = useAppDispatch();

    const isWatched: boolean = mediaIdinMediaSet(mediaId, watched);

    function toggleWatched() {
        if (!mediaId) return;
        isWatched ? dispatch(unwatch(mediaId)) : dispatch(watch(mediaId));
    }

    return (
        <button
            className='set-watched secondary click-bop'
            onClick={toggleWatched}
        >
            <div className='icon'>
                {isWatched ? <CheckCircleSolid /> : <CheckCircle />}
            </div>
            <div className='text'>
                {isWatched ? 'Set Not Watched' : 'Set Watched'}
            </div>
        </button>
    );
}
