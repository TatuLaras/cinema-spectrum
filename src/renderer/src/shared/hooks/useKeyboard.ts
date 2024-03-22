// Subscribes to keyboard events and fires a callback when applicable.

import { useEffect } from 'react';
import { PressedKey } from '../types/common_types';
import KeyboardInput from '../classes/KeyboardInput';

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
