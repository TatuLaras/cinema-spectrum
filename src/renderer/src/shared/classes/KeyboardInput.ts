import { PressedKey } from '../types/common_types';
import { withValueRemoved } from '../utils/state_helpers';

export default class KeyboardInput {
    static subscribers: Map<PressedKey, ((e: KeyboardEvent) => void)[]> =
        new Map();

    static subscribe(key: PressedKey, callback: (e: KeyboardEvent) => void) {
        if (!KeyboardInput.subscribers.has(key))
            KeyboardInput.subscribers.set(key, []);
        KeyboardInput.subscribers.set(key, [
            ...KeyboardInput.subscribers.get(key)!,
            callback,
        ]);
    }

    static unsubscribe(key: PressedKey, callback: (e: KeyboardEvent) => void) {
        if (!KeyboardInput.subscribers.has(key)) return;
        KeyboardInput.subscribers.set(
            key,
            withValueRemoved(KeyboardInput.subscribers.get(key)!, callback),
        );
    }

    static handler(e: KeyboardEvent) {
        let keySubscribers = KeyboardInput.subscribers.get(e.key as PressedKey);
        if (!keySubscribers) return;

        keySubscribers?.forEach((subscriberCallback) => subscriberCallback(e));
    }
}
