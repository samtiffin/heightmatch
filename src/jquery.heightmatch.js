(function( $ ) {
    'use strict';

    function Heightmatch( element, options ) {
        this.$element = $(element);

        this.options = $.extend({}, Heightmatch.defaults, options);

        this.init();
    }

    Heightmatch.defaults = {};

    Heightmatch.prototype.init = function() {};

    $.fn.heightmatch = function( options ) {
        var name = 'heightmatch';

        return this.each(function() {
            if (!$.data(this, name)) {
                $.data(this, name, new Heightmatch(this, options));
            }
        });
    };

})( jQuery );