// global.$ = $;
import * as $ from 'jquery'
import { remote } from 'electron';
import { Menu, BrowserWindow, MenuItem, shell } from 'electron';
import * as folder_view from 'folder_view';

let aboutWindow = null;
let App = {
    folder: folder_view.Folder
};

$(document).ready(function () {
    let folder = new folder_view.Folder($('#files'));

    folder.open(process.cwd());

    App.folder = folder;
});