/*!
 * heightmatch - Super simple jQuery plugin that ensures elements have matching heights.
 * @version v0.4.0
 * @link https://github.com/samtiffin/heightmatch
 * @license ISC
 */
/**
# TODO
- refresh on element add/remove
- watch height of elements ??
- animation?
**/
(function( window, $ ) {
    'use strict';

    function Heightmatch( elements, options ) {
        this.$elements = $(elements);

        this.options = $.extend({}, Heightmatch.defaults, options);

        this.groups = {};

        this.init();
    }

    Heightmatch.defaults = {
        bindResize: false,
        matchGroups: null
    };

    Heightmatch.prototype.init = function() {
        this._bindEvents();

        this.groups = this._groupElements();

        this.matchHeights(this.options.matchGroups);
    };

    Heightmatch.prototype.destroy = function() {
        this._unbindEvents();

        this.unmatchHeights();
    };


    Heightmatch.prototype.matchHeights = function( groups ) {
        var self = this;

        // D:
        groups = $.map(arguments.length > 1 ? arguments : ($.isArray(groups) ? groups: (typeof groups === 'string' ? [ groups ] : [])), function( val ) {
            return '_' + val;
        });

        if (this.groups) {
            $.each($.map(this.groups, function( value, key) {
                if (groups.length) {
                    return $.inArray(key, groups) === -1 ? null : value;
                }
                else {
                    return value;
                }
            }), function( key, $elements ) {
                $elements.height(self._maxHeight($elements));
            });
        }
    };

    Heightmatch.prototype.unmatchHeights = function() {
        this.$elements.height('');
    };

    Heightmatch.prototype.refresh = function() {
        var groups = arguments.length ? arguments : this.options.matchGroups;

        this.matchHeights.apply(this, groups);
    };

    Heightmatch.prototype._maxHeight = function( $elements ) {
        return Math.max.apply(Math, $elements.map(function( i, element ) {  return $(element).height('').outerHeight(true); }));
    };

    Heightmatch.prototype._groupElements = function() {
        var self = this,
            groups = {}, elementGroups = {};

        this.$elements.each(function() {
            var $element = $(this),
                group = $element.data('heightmatchGroup'),
                key  = group ? '_' + group : 'all';

            if (groups[key]) {
                groups[key].push($element[0]);
            }
            else {
                groups[key] = [ $element[0] ];
            }
        });

        $.each(groups, function( key, $elements ) {
            elementGroups[key]  = $([]).pushStack($elements);
        });

        return elementGroups;
    };

    Heightmatch.prototype._bindEvents = function() {
        if (this.options.bindResize) {
            $(window).on('resize.heightmatch', $.proxy(this._resizeHandler, this));
        }

        this.$elements.on('refresh.heightmatch', $.proxy(this._resizeHandler, this));
    };

    Heightmatch.prototype._unbindEvents = function() {
        if (this.options.bindResize) {
            $(window).off('.heightmatch');
        }

        this.$elements.off('.heightmatch');
    };

    Heightmatch.prototype._resizeHandler = function() {
        var groups = arguments.length > 1 ? Array.prototype.slice.call(arguments, 1) : this.options.matchGroups;

        this.matchHeights.apply(this, groups);
    };

    $.fn.heightmatch = function( options ) {
        var name = 'heightmatch',
            instance = this.data(name);

        if (!instance) {
            this.data(name, new Heightmatch(this, options));
        }
        else if (instance && typeof options === 'string' && instance[options] && typeof instance[options] === 'function') {
            instance[options].apply(instance, Array.prototype.slice.call(arguments, 1));
        }

        return this;
    };

})( window, jQuery );