export function formatTime(minutes: number): string {
    return `${Math.floor(minutes / 60)}h ${minutes % 60}min`;
}

export function padZeros(value: number, length: number) {
    const numStr = value.toString();
    return '0'.repeat(Math.max(0, length - numStr.length)) + numStr;
}
