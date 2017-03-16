// global.$ = $;
import * as $ from 'jquery'
import { remote } from 'electron';
import { Menu, BrowserWindow, MenuItem, shell } from 'electron';
import * as folder_view from 'folder_view';
import * as abar from 'address_bar';
import * as mime from 'mime';

let aboutWindow = null;
let App = {
    folder: folder_view.Folder,
    addressbar: abar.AddressBar
};

$(document).ready(function () {
    var folder = new folder_view.Folder($('#files'));
    var addressbar = new abar.AddressBar($('#addressbar'));

    folder.open(process.cwd());

    App.folder = folder;
    App.addressbar = addressbar;

    folder.on('navigate', function (dir: string, mime: mime) {
        if (mime.type == 'folder') {
            addressbar.enter(mime);
        } else {
            shell.openItem(mime.path)
        }
    });

    addressbar.on('navigate', function (dir: string) {
        folder.open(dir);
    });
});