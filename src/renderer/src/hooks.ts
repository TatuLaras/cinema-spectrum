import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './state/store';
import { PressedKey } from './common_types';
import { useEffect } from 'react';
import KeyboardInput from './KeyboardInput';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export function useKeyboard(
    key: PressedKey,
    callback: () => void,
    dependencies: any[] = [],
) {
    useEffect(() => {
        KeyboardInput.subscribe(key, callback);
        return () => KeyboardInput.unsubscribe(key, callback);
    }, dependencies);
}
