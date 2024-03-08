import { BrowseItem } from '@renderer/common_types';
import { MovieMetadata, TvMetadata } from 'src/shared';
import MediaCard from './MediaCard';
import { useEffect, useState } from 'react';
import DetailsPanel from './DetailsPanel';
import FiltersBar from './FiltersBar';
import { useAppSelector } from '@renderer/hooks';
import Loading from './loading/Loading';

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
