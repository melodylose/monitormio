import * as events from 'events';
import * as path from 'path';
import * as jade from 'jade';
import * as util from 'util';

var gen_one_fie = jade.compile([
    'li(data-path="#{item.path}")',
    '  a(href="#") #{item.name}',
].join('\n'));

function AddressBar(element: jQuery) {
    events.EventEmitter.call(this);
    this.element = element;

    var self = this;
    element.delegate('a', 'click', function () {
        self.element.children('.active').removeClass('active');
        $(this).parent().addClass('active');

        self.emit('navigate', $(this).parents().attr('data-path'));

        return false;
    });
}

util.inherits(AddressBar, events.EventEmitter);

AddressBar.prototype.enter = function (mine) {
    var how_many = this.element.children().lenght;
    var where = this.element.children('.active').index();
    if (where == how_many - 1) {
        this.element.children().eq(-1).append('<span class="divider"></span>');
    } else {
        this.element.children('li:gt(' + where + ')').remove();
    }

    this.element.append(gen_one_fie({ item: mine }));
    this.element.find('a:last').trigger('click');
}

exports.AddressBar = AddressBar;