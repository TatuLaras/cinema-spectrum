import { PlaySolid } from 'iconoir-react';
import { watch } from '../slices/mediaSetsSlice';
import { playFile } from '../utils/ipc_actions';
import { useAppDispatch, useAppSelector } from '../hooks/redux_hooks';

type Props = {
    children: string | JSX.Element | undefined;
    mediaId: string;
    fileToPlay: string | undefined | null;
};

export default function PlayButton({ children, mediaId, fileToPlay }: Props) {
    const dispatch = useAppDispatch();
    const appMode = useAppSelector((state) => state.appMode.value);

    function play() {
        dispatch(watch(mediaId));
        if (fileToPlay) playFile(fileToPlay);
    }
    
    return (
        <button
            className={`play ${appMode === 'tv' ? 'tv-mode' : ''}`}
            onClick={play}
        >
            <div className='icon'>
                <PlaySolid />
            </div>
            <div className='text'>{children}</div>
        </button>
    );
}
