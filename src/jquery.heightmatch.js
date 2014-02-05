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

    var maxHeight = function( $elements ) {
        return Math.max.apply(Math, $elements.map(function( i, element ) {  return $(element).height('').outerHeight(true); }));
    },

    bindEvents = function() {
        if (this.options.bindResize) {
            $(window).on('resize.heightmatch', $.proxy(resizeHandler, this));
        }
    },

    unbindEvents = function() {
        if (this.options.bindResize) {
            $(window).off('.heightmatch');
        }
    },

    resizeHandler = function() {
        this.matchHeights();
    };

    Heightmatch.prototype.init = function() {
        bindEvents.call(this);

        this.matchHeights();
    };

    Heightmatch.prototype.matchHeights = function() {
        this.$elements.height(maxHeight(this.$elements));
    };

    Heightmatch.prototype.unmatchHeights = function() {
        this.$elements.height('');
    };

    Heightmatch.prototype.destroy = function() {
        unbindEvents.call(this);

        this.unmatchHeights();
    };

    $.fn.heightmatch = function( options ) {
        var name = 'heightmatch';

        if (!this.data(name)) {
            this.data(name, new Heightmatch(this, options));
        }

        return this;
    };

})( window, jQuery );