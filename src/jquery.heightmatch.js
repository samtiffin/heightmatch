/**
# TODO
- height match groups
- refresh on element add/remove
- watch height of elements
- trigger to refresh
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

    Heightmatch.prototype._maxHeight = function( $elements ) {
        return Math.max.apply(Math, $elements.map(function( i, element ) {  return $(element).height('').outerHeight(true); }));
    };

    Heightmatch.prototype._bindEvents = function() {
        if (this.options.bindResize) {
            $(window).on('resize.heightmatch', $.proxy(this._resizeHandler, this));
        }
    };

    Heightmatch.prototype._unbindEvents = function() {
        if (this.options.bindResize) {
            $(window).off('.heightmatch');
        }
    };

    Heightmatch.prototype._resizeHandler = function() {
        this.matchHeights();
    };

    $.fn.heightmatch = function( options ) {
        var name = 'heightmatch';

        if (!this.data(name)) {
            this.data(name, new Heightmatch(this, options));
        }

        return this;
    };

})( window, jQuery );