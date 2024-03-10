import { useAppSelector } from '@renderer/shared/hooks/redux_hooks';
import '../styles/unknown.scss';
import CollapsibleList from './CollapsibleList';

type Props = {};

export default function Unknown({}: Props) {
    const unknownItems = useAppSelector((state) => state.media.collection.unknown);
    console.log(unknownItems);
    
    function baseName(file_path: string) {
        const parts = file_path.split('/');
        return parts[parts.length - 1];
    }

    return (
        <div id='unknown'>
            <div className='left'>
                <CollapsibleList items={unknownItems.movie_files.map(baseName)} title='Movies' />
                <CollapsibleList items={unknownItems.tv.map(baseName)} title='TV Shows'/>
            </div>
            <div className="right">
                ad
            </div>
        </div>
    );
}
