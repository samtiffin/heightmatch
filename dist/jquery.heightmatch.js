/*!
 * heightmatch - Super simple jQuery plugin that ensures elements have matching heights.
 * @version v0.3.0
 * @link https://github.com/samtiffin/heightmatch
 * @license ISC
 */
/**
# TODO
- height match groups
- refresh on element add/remove
- watch height of elements ??
- animation?
**/
(function( window, $ ) {
    'use strict';

    function Heightmatch( elements, options ) {
        this.$elements = $(elements);

        this.options = $.extend({}, Heightmatch.defaults, options);

        this.init();
    }

    Heightmatch.defaults = {
        bindResize: false
    };

    Heightmatch.prototype.init = function() {
        this._bindEvents();

        this.matchHeights();
    };

    Heightmatch.prototype.destroy = function() {
        this._unbindEvents();

        this.unmatchHeights();
    };

    Heightmatch.prototype.matchHeights = function() {
        this.$elements.height(this._maxHeight(this.$elements));
    };

    Heightmatch.prototype.unmatchHeights = function() {
        this.$elements.height('');
    };

    Heightmatch.prototype.refresh = function() {
        this.matchHeights.apply(this, arguments);
    };

    Heightmatch.prototype._maxHeight = function( $elements ) {
        return Math.max.apply(Math, $elements.map(function( i, element ) {  return $(element).height('').outerHeight(true); }));
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
        this.matchHeights.apply(this, Array.prototype.slice.call(arguments, 1));
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