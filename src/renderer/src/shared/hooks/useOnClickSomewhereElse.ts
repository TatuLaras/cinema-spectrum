import { useEffect } from 'react';

export default function useOnClickSomewhereElse(
    element: HTMLElement | null,
    callback: () => void,
) {
    useEffect(() => {
        const handler = (e: any) => {
            if (element && !element.contains(e.target)) callback();
        };

        document.addEventListener('click', handler);

        return () => {
            document.removeEventListener('click', handler);
        };
    }, []);
}
