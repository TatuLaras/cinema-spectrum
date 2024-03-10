import { ArrowRight, Hashtag, Search } from 'iconoir-react';

type Props = {
    children?: string;
};

export default function CollapsibleListItem({ children = '' }: Props) {
    return (
        <div className='item'>
            <div className='text'>{children}</div>
            <div className='buttons'>
                <ArrowRight className='btn' />
            </div>
        </div>
    );
}
