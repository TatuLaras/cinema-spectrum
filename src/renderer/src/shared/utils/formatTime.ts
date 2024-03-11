export default function formatTime(minutes:number): string {
    return `${Math.floor(minutes / 60)}h ${minutes % 60}min`;
}