export function formatTime(minutes: number): string {
    return `${Math.floor(minutes / 60)}h ${minutes % 60}min`;
}

export function padZeros(value: number | undefined, length: number) {
    if (!value) return '';

    const numStr = value.toString();
    return '0'.repeat(Math.max(0, length - numStr.length)) + numStr;
}
