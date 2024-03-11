import { MovieMetadata } from 'src/shared';

import '../styles/tv_details_panel.scss';
import Details from './Details';

type Props = {
    item: MovieMetadata;
};

export default function TvMovieDetailsPanel({ item }: Props) {
    return (
        <div className='tv-details-panel movie'>
            <div className='inner'>
                <Details item={item} />
            </div>
        </div>
    );
}
