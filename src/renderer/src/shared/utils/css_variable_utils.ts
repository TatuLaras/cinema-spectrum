export const imgSrc = (val: string) =>
    ({ '--img-src': `url('${val}')` }) as React.CSSProperties;

export const animDelay = (valMs: number) =>
    ({ '--anim-delay': `${valMs / 1000}s` }) as React.CSSProperties;

export function tmdbImg<T>(path: string, size: T | 'original' = 'original') {
    return imgSrc(`https://image.tmdb.org/t/p/${size}${path}`);
}
