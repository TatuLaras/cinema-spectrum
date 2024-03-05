import { IconoirProvider } from 'iconoir-react';

import DesktopLayout from './components/desktop/DesktopLayout';
import { useAppSelector } from './hooks';
import TvLayout from './components/tv/TvLayout';

export default function App(): JSX.Element {
    const appMode = useAppSelector((state) => state.appMode.value);

    const content = {
        desktop: <DesktopLayout />,
        tv: <TvLayout />,
    }[appMode];

    return (
        <IconoirProvider
            iconProps={{
                strokeWidth: 1.5,
            }}
        >
            {content}
        </IconoirProvider>
    );
}
