import { MediaType, MovieMetadata, TvMetadata } from 'src/shared';
import MediaCard from './MediaCard';
import { useEffect, useState } from 'react';
import DetailsPanel from '../../details_panel/components/DetailsPanel';
import FiltersBar from './FiltersBar';
import Loading from './Loading';
import { useAppSelector } from '@renderer/shared/hooks/redux_hooks';
import { BrowseItem } from '@renderer/shared/types/common_types';

type Props = {
    items: BrowseItem<MovieMetadata | TvMetadata>[];
    type: MediaType;
};

// Component for browsing the library through a grid of posters
export default function BrowseContent({ items }: Props) {
    const status = useAppSelector((state) => state.media.status);
    const view = useAppSelector((state) => state.view.value);

    const [inspectedItem, setInspectedItem] = useState<
        MovieMetadata | TvMetadata | null
    >(null);
    const [showDetailsPanel, setShowDetailsPanel] = useState<boolean>(false);
    const [itemsFiltered, setItemsFiltered] = useState<typeof items>(items);

    useEffect(() => setItemsFiltered(items), [items]);
    useEffect(() => setShowDetailsPanel(false), [view]);

    if (status !== 'ready') return <Loading />;

    return (
        <>
            <DetailsPanel
                item={inspectedItem}
                onClose={() => setShowDetailsPanel(false)}
                visible={showDetailsPanel}
            />
            <FiltersBar setItemsFiltered={setItemsFiltered} items={items} />
            <div className="browse-content">
                {itemsFiltered.map((el: BrowseItem<any>, i: number) => (
                    <MediaCard
                        name={el.name}
                        posterPath={el.poster_path}
                        key={i}
                        onClick={() => {
                            setInspectedItem(el.actual_data);
                            setTimeout(() => setShowDetailsPanel(true), 10);
                        }}
                    />
                ))}
            </div>
        </>
    );
}
