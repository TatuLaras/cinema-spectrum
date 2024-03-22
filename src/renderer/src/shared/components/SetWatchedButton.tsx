import { CheckCircle, CheckCircleSolid } from 'iconoir-react';
import { useAppSelector, useAppDispatch } from '../hooks/redux_hooks';
import { toggleWatched } from '../slices/mediaSetsSlice';
import { inMediaSet } from '../utils/media_set_utils';

type Props = {
    mediaId: string | undefined;
};

export default function SetWatchedButton({ mediaId }: Props) {
    const watched = useAppSelector((state) => state.media_sets.watched);
    const dispatch = useAppDispatch();

    const isWatched: boolean = inMediaSet(mediaId, watched);

    return (
        <button
            className='set-watched secondary click-bop'
            onClick={() => mediaId && dispatch(toggleWatched(mediaId))}
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
