import {
    MediaGroupTemplate,
    CommonBrowseItem,
    MediaGroup,
} from '../types/common_types';

// Filters Browse Items into categories / groups based on templates
export function makeGroupsFromTemplates(
    templates: MediaGroupTemplate[],
    items: CommonBrowseItem[],
): MediaGroup[] {
    let groups: MediaGroup[] = [];
    for (let template of templates) {
        const group = {
            name: template.name,
            items: items.filter(template.criteria),
        };
        if (group.items.length == 0) continue;
        groups.push(group);
    }

    return groups;
}

export function getSortedGenreList(items: CommonBrowseItem[]): string[] {
    // Save unique genres into an object, count occurrences as well
    const genres: { [genre: string]: number } = {};
    for (const item of items)
        for (const genre of item.genres) {
            if (!genres[genre]) genres[genre] = 0;
            genres[genre] += 1;
        }

    // Sort by occurrences
    const sortedEntries = Object.entries(genres).sort((a, b) => b[1] - a[1]);

    // Return genre name list
    return sortedEntries.map((x) => x[0]);
}
