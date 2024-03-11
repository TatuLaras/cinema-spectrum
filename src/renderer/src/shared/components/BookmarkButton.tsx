import { StarSolid, Star } from 'iconoir-react';
import { useAppSelector, useAppDispatch } from '../hooks/redux_hooks';
import { unbookmark, bookmark } from '../slices/mediaSetsSlice';
import {
    mediaIdinMediaSet
} from '../utils/media_set_utils';

type Props = {
    mediaId: string | undefined;
};

export default function BookmarkButton({ mediaId }: Props) {
    const bookmarks = useAppSelector((state) => state.media_sets.bookmarked);
    const dispatch = useAppDispatch();
    const thisBookmarked: boolean = mediaIdinMediaSet(mediaId, bookmarks);

    function toggleBookmark() {
        if (!mediaId) return;
        thisBookmarked
            ? dispatch(unbookmark(mediaId))
            : dispatch(bookmark(mediaId));
    }

    return (
        <button
            className='favorite secondary click-bop'
            onClick={toggleBookmark}
        >
            <div className='icon'>
                {thisBookmarked ? <StarSolid /> : <Star />}
            </div>
            <div className='text'>
                {thisBookmarked ? 'Unbookmark' : 'Bookmark'}
            </div>
        </button>
    );
}
