import { IconoirProvider } from 'iconoir-react';
import DesktopLayout from './shared/components/DesktopLayout';
import TvLayout from './shared/components/TvLayout';
import { useAppSelector } from './shared/hooks/redux_hooks';


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
