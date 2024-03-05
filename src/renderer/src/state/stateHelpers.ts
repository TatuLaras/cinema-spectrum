export function withIndexRemoved(array: any[], index: number): any[] {
    if (index < 0 || index >= array.length) return array;

    return [...array.slice(0, index), ...array.slice(index + 1)];
}

export function withValueRemoved(array: any[], value: any): any[] {
    return withIndexRemoved(array, array.indexOf(value));
}

export function withValueAppended(array: any[], value: any) {
    return [...array, value];
}