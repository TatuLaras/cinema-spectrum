export const imgSrc = (val: string) =>
    ({ '--img-src': `url('${val}')` }) as React.CSSProperties;

export const animDelay = (valMs: number) =>
    ({ '--anim-delay': `${valMs / 1000}s` }) as React.CSSProperties;

export const tmdbImg = (path: string, size: string = 'w342') =>
    imgSrc(`https://image.tmdb.org/t/p/${size}${path}`);
