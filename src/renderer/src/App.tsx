import { IconoirProvider } from 'iconoir-react';
import DesktopLayout from './shared/components/DesktopLayout';

export default function App(): JSX.Element {
    return (
        <IconoirProvider
            iconProps={{
                strokeWidth: 1.5,
            }}
        >
            <DesktopLayout />
        </IconoirProvider>
    );
}
