import KeyboardInput from './KeyboardInput';

test('Subscribe and callback', () => {
    let testValue = 0;
    let expected = 0;

    KeyboardInput.subscribe('ArrowUp', () => testValue++);
    expected++;

    KeyboardInput.subscribe('ArrowUp', () => testValue++);
    expected++;

    KeyboardInput.subscribe('ArrowDown', () => testValue++);
    expected++;

    KeyboardInput.subscribe('ArrowDown', () => testValue++);
    expected++;

    KeyboardInput.subscribe('ArrowDown', () => testValue++);
    expected++;

    KeyboardInput.subscribe('ArrowDown', () => testValue++);
    expected++;

    KeyboardInput.subscribe('ArrowLeft', () => testValue++);
    expected++;

    KeyboardInput.subscribe('ArrowRight', () => testValue++);
    expected++;

    KeyboardInput.subscribe('ArrowRight', () => testValue++);
    expected++;

    KeyboardInput.subscribe('Enter', () => testValue++);
    KeyboardInput.subscribe('Enter', () => testValue++);
    KeyboardInput.subscribe('Enter', () => testValue++);
    KeyboardInput.subscribe('Enter', () => testValue++);

    KeyboardInput.handler({ key: 'ArrowUp' } as KeyboardEvent);
    KeyboardInput.handler({ key: 'ArrowDown' } as KeyboardEvent);
    KeyboardInput.handler({ key: 'ArrowLeft' } as KeyboardEvent);
    KeyboardInput.handler({ key: 'ArrowRight' } as KeyboardEvent);

    expect(testValue).toBe(expected);
});

test('Unsubscribe', () => {
    let testValue = 0;
    let expected = 0;

    KeyboardInput.subscribe('ArrowUp', () => testValue++);
    expected++;

    KeyboardInput.subscribe('ArrowUp', () => testValue++);
    expected++;

    KeyboardInput.subscribe('ArrowDown', () => testValue++);
    expected++;

    KeyboardInput.subscribe('ArrowDown', () => testValue++);
    expected++;

    const callback = () => {
        testValue++;
    };
    KeyboardInput.subscribe('ArrowDown', callback);
    KeyboardInput.unsubscribe('ArrowDown', callback);

    KeyboardInput.handler({ key: 'ArrowUp' } as KeyboardEvent);
    KeyboardInput.handler({ key: 'ArrowDown' } as KeyboardEvent);

    expect(testValue).toBe(expected);
});
