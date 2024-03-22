import { NavArrowDown } from 'iconoir-react';
import { CSSProperties, useState } from 'react';
import CollapsibleListItem from './CollapsibleListItem';

import '../styles/collapsible_list.scss';
import { UnknownItem } from '@renderer/shared/types/common_types';

type Props = {
    items: UnknownItem[] | undefined;
    title: string;
    onSelected: (item: UnknownItem) => void;
};

export default function CollapsibleList({ items, title, onSelected }: Props) {
    const [isOpen, setIsOpen] = useState(false);

    if (!items) return null;
    return (
        <div className={`collapsible-list ${isOpen ? 'open' : ''}`}>
            <div
                className='top'
                onClick={() => items.length > 0 && setIsOpen((old) => !old)}
            >
                <div className='title'>{title}</div>
                {items.length > 0 && <NavArrowDown className='icon' />}
            </div>
            <div className='list-container'>
                {items.length == 0 && (
                    <div className='no-items'>(No items)</div>
                )}
                <div
                    className='list'
                    style={{ '--item-count': items.length } as CSSProperties}
                >
                    {items.map((item, i) => (
                        <CollapsibleListItem
                            key={i}
                            onClick={() => onSelected(item)}
                        >
                            {item.filename}
                        </CollapsibleListItem>
                    ))}
                </div>
            </div>
        </div>
    );
}
