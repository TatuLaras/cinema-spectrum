import { PressedKey } from '../types/common_types';
import { withValueRemoved } from '../utils/stateHelpers';

export default class KeyboardInput {
    static subscribers: Map<PressedKey, (() => void)[]> = new Map();

    static subscribe(key: PressedKey, callback: () => void) {
        if (!KeyboardInput.subscribers.has(key))
            KeyboardInput.subscribers.set(key, []);
        KeyboardInput.subscribers.set(key, [
            ...KeyboardInput.subscribers.get(key)!,
            callback,
        ]);
    }

    static unsubscribe(key: PressedKey, callback: () => void) {
        if (!KeyboardInput.subscribers.has(key)) return;
        KeyboardInput.subscribers.set(
            key,
            withValueRemoved(KeyboardInput.subscribers.get(key)!, callback),
        );
    }

    static handler(e) {
        let keySubscribers = KeyboardInput.subscribers.get(e.key);
        if (!keySubscribers) return;

        keySubscribers?.forEach((subscriberCallback) => subscriberCallback());
    }
}
