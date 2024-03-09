import { NavArrowDown } from 'iconoir-react';
import { CSSProperties, useState } from 'react';
import CollapsibleListItem from './CollapsibleListItem';

import '../styles/collapsible_list.scss';

type Props = {};

export default function CollapsibleList({}: Props) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={`collapsible-list ${isOpen ? 'open' : ''}`}>
            <div className='top' onClick={() => setIsOpen((old) => !old)}>
                <div className='title'>Movies</div>
                <NavArrowDown className='icon' />
            </div>
            <div className='list-container'>
                <div
                    className='list'
                    style={{ '--item-count': 5 } as CSSProperties}
                >
                    <CollapsibleListItem />
                    <CollapsibleListItem />
                    <CollapsibleListItem />
                    <CollapsibleListItem />
                    <CollapsibleListItem />
                </div>
            </div>
        </div>
    );
}
