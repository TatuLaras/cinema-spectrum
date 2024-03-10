import { ArrowRight } from 'iconoir-react';

type Props = {
    children?: string;
    onClick: () => void;
};

export default function CollapsibleListItem({ children = '', onClick }: Props) {
    return (
        <div className='item' onClick={onClick}>
            <div className='text'>{children}</div>
            <div className='buttons'>
                <ArrowRight className='btn' />
            </div>
        </div>
    );
}
