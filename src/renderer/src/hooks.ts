import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './state/store';
import { CommonBrowseItem, PressedKey } from './common_types';
import { useEffect, useMemo } from 'react';
import KeyboardInput from './KeyboardInput';
import { getSortedGenreList } from './helpers';

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

export function useGenres(items: CommonBrowseItem[]) {
    return useMemo(() => getSortedGenreList(items), [items]);
}
