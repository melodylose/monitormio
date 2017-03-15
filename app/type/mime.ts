import * as fs from 'fs';
import * as path from 'path';

let map = {
    'compressed': ['zip', 'rar', 'gz', '7z'],
};

let cached = {};

exports.stat = function (filepath: string) {
    let result = {
        name: path.basename(filepath),
        path: filepath,
        type: ''
    };

    try {
        let stat = fs.statSync(filepath);
        if (stat.isDirectory()) {
            result.type = 'folder';
        } else {
            let ext = path.extname(filepath).substr(1);
            result.type = cached[ext];
            if (!result.type) {
                for (var key in map) {
                    // if () {
                        
                    // }
                }

                if (!result.type) {
                    result.type = 'blank';
                }
            }
        }
    } catch (e) {
        window.alert(e);
    }

    return result;
}