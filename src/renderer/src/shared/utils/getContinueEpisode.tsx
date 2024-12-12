import { MediaSet, Episode, TvMetadata } from 'src/shared';
import { inMediaSet, getEpisodeMediaId } from './media_set_utils';

export default function getContinueEpisode(
    tvShow: TvMetadata,
    watched: MediaSet,
): Episode | null {
    if (!tvShow?.seasons) return null;
    let continueEpisode: Episode | null = null;

    let previousWatched = true;

    for (const season of tvShow?.seasons) {
        for (const episode of season.episodes) {
            const thisWatched = inMediaSet(
                getEpisodeMediaId(episode.show_id, episode.id),
                watched,
            );
            if (
                ((previousWatched && !thisWatched) || !continueEpisode) &&
                episode.file_path
            ) {
                continueEpisode = episode;
            }

            previousWatched = thisWatched;
        }
    }

    return continueEpisode;
}
