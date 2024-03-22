import { StarSolid, Star } from 'iconoir-react';
import { useAppSelector, useAppDispatch } from '../hooks/redux_hooks';
import { toggleBookmark } from '../slices/mediaSetsSlice';
import { inMediaSet } from '../utils/media_set_utils';

type Props = {
    mediaId: string | undefined;
};

export default function BookmarkButton({ mediaId }: Props) {
    const bookmarks = useAppSelector((state) => state.media_sets.bookmarked);
    const dispatch = useAppDispatch();
    const thisBookmarked: boolean = inMediaSet(mediaId, bookmarks);

    return (
        <button
            className='favorite secondary click-bop'
            onClick={() => mediaId && dispatch(toggleBookmark(mediaId))}
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
