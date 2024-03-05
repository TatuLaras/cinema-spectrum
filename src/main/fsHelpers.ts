const fs = require('fs');

export function listRecursively(dir: string) {
    var results: string[] = [];
    var list = fs.readdirSync(dir);
    list.forEach((file: string) => {
        file = dir + '/' + file;
        var stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            /* Recurse into a subdirectory */
            results = results.concat(listRecursively(file));
        } else {
            /* Is a file */
            results.push(file);
        }
    });
    return results;
}

export function listTopLevelFolders(dir: string) {
    var list = fs.readdirSync(dir);

    const topLevelFolders: string[] = [];
    list.forEach((file: string) => {
        file = dir + '/' + file;
        var stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            topLevelFolders.push(file);
        }
    });
    return topLevelFolders;
}
