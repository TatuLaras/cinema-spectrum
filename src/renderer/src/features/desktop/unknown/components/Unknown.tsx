import '../styles/unknown.scss';
import CollapsibleList from './CollapsibleList';

type Props = {};

export default function Unknown({}: Props) {
    return (
        <div id='unknown'>
            <CollapsibleList />
            <CollapsibleList />
        </div>
    );
}
