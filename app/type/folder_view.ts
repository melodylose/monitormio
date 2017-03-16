import * as events from 'events';
import * as fs from 'fs';
import * as path from 'path';
import * as jade from 'jade';
import * as util from 'util';
import * as mime from 'mime';

// Template
let gen_files_view = jade.compile([
    '- each file in files',
    '  .file(data-path="#{file.path}")',
    '    .icon',
    '      img(src="icons/#{file.type}.png")',
    '    .name #{file.name}',
].join('\n'));

function Folder(jquery_element: JQuery) {
    events.EventEmitter.call(this);
    
    this.element = jquery_element;

    var self = this;

    // click on blank
    this.element.parent().on('click', function () {
        self.element.children('.focus').removeClass('focus');
    });

    // click on file
    this.element.delegate('.file', 'click', function (e) {
        self.element.children('.focus').removeClass('focus');
        $(this).addClass('focus');
        e.stopPropagation();
    });

    // double click on file
    this.element.delegate('.file', 'dblclick', function () {
        let file_path = $(this).attr('data-path');
        self.emit('navigate', file_path, mime.stat(file_path));
    })
}

util.inherits(Folder, events.EventEmitter);

Folder.prototype.open = function (dir) {
    let self = this;
    fs.readdir(dir, function (error, files) {
        if (error) {
            console.log(error);
            window.alert(error);
        }

        for (let i = 0; i < files.length; i++) {
            files[i] = mime.stat(path.join(dir, files[i]));
        }

        self.element.html(gen_files_view({ files: files }));
    });
}

exports.Folder = Folder;