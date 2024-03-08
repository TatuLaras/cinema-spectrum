import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './state/store';
import { CommonBrowseItem, PressedKey } from './common_types';
import { useEffect, useMemo } from 'react';
import KeyboardInput from './KeyboardInput';
import { getSortedGenreList } from './helpers';

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Subscribes to keyboard events and fires a callback when applicable.
// All values in the "conditions" array need to be true for the callback to run.
export function useKeyboard(
    key: PressedKey,
    callback: () => void,
    dependencies: any[] = [],
    conditions: boolean[] = [],
) {
    useEffect(() => {
        // Wrap the callback to guard against the conditions array
        const callbackWrapper = () => {
            let shouldCall = true;
            for (const cond of conditions) shouldCall = shouldCall && cond;
            if (shouldCall) callback();
        };

        // Subscribe
        KeyboardInput.subscribe(key, callbackWrapper);
        return () => KeyboardInput.unsubscribe(key, callbackWrapper);
    }, [...dependencies, ...conditions]);
}

export function useGenres(items: CommonBrowseItem[]) {
    return useMemo(() => getSortedGenreList(items), [items]);
}
