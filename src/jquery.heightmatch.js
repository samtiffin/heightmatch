/**
# TODO
- optional bind to resize
- height match groups
- refresh on element add/remove
- watch height of elements
- trigger to refresh
- destroy
**/
(function( $ ) {
    'use strict';

    function Heightmatch( elements, options ) {
        this.$elements = $(elements);

        this.options = $.extend({}, Heightmatch.defaults, options);

        this.init();
    }

    Heightmatch.defaults = {};

    var maxHeight = function( $elements ) {
        return Math.max.apply(Math, $elements.map(function( i, element ) {  return $(element).outerHeight(true); }));
    };

    Heightmatch.prototype.init = function() {
        this.$elements.height(maxHeight(this.$elements));
    };

    Heightmatch.prototype.destroy = function() {};

    $.fn.heightmatch = function( options ) {
        var name = 'heightmatch';

        if (!$.data(this, name)) {
            $.data(this, name, new Heightmatch(this, options));
        }

        return this;
    };

})( jQuery );