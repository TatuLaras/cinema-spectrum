import { animDelay } from '@renderer/shared/utils/css_variable_utils';

import '../styles/fake_media_card.scss';

type Props = {
    animationDelay: number; // ms
};

export default function FakeMediaCard({ animationDelay }: Props) {
    return (
        <div
            className='media-card placeholder'
            style={animDelay(animationDelay)}
        ></div>
    );
}
