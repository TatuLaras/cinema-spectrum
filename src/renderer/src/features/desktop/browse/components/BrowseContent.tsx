import { MovieMetadata, TvMetadata } from 'src/shared';
import MediaCard from './MediaCard';
import { useEffect, useState } from 'react';
import DetailsPanel from '../../details_panel/components/DetailsPanel';
import FiltersBar from './FiltersBar';
import Loading from './Loading';
import { useAppSelector } from '@renderer/shared/hooks/redux_hooks';
import { BrowseItem } from '@renderer/shared/types/common_types';

type Props = {
    items: BrowseItem<MovieMetadata | TvMetadata>[];
    type: 'tv' | 'movie';
};

export default function BrowseContent({ items, type }: Props) {
    const status = useAppSelector((state) => state.media.status);

    const [inspectedItem, setInspectedItem] = useState<
        MovieMetadata | TvMetadata | null
    >(null);

    const [showDetailsPanel, setShowDetailsPanel] = useState<boolean>(false);
    const [itemsFiltered, setItemsFiltered] = useState<typeof items>(items);

    useEffect(() => setItemsFiltered(items), [items]);
    if (status !== 'ready') return <Loading />;

    return (
        <>
            <DetailsPanel
                item={inspectedItem}
                type={type}
                onClose={() => setShowDetailsPanel(false)}
                visible={showDetailsPanel}
            />
            <FiltersBar setItemsFiltered={setItemsFiltered} items={items} />
            <div className='browse-content'>
                {itemsFiltered.map((el: BrowseItem<any>, i: number) => (
                    <MediaCard
                        name={el.name}
                        posterPath={el.poster_path}
                        key={i}
                        onClick={() => {
                            setInspectedItem(el.actual_data);
                            setShowDetailsPanel(true);
                        }}
                    />
                ))}
            </div>
        </>
    );
}
