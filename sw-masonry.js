/**
 * Left-to-Right masonry blocks
 * 
 * @author Denis Alexandrov <stm.switcher@gmail.com>
 * @date 2015-06-01 12:54:49
 * @license http://opensource.org/licenses/gpl-license.php GNU Public License
 */


function masonry () {
    $('.sw-masonry').each(function(){
        
        /**
         * Parent block
         * @type @call;$
         */
        var masonry = $(this);

        /**
         * Parent block width
         * @type Number
         */
        var mwidth = masonry.width();
        
        var cols = masonry.children('.col');
        if (cols.length > 0) {
            cols.each(function(){
                $(this).remove();
            });
        }

        /**
         * Items array
         * @type @exp;masonry@call;children
         */
        var items = masonry.children('.item');
        
        items.each(function(){
            $(this).hide();
        });

        /**
         * Single item width
         * @type Number
         */
        var width = items.eq(0).width();
        
        /**
         * Margin for column
         * @type Number
         */
        var margin = 10;

        /**
         * Items total
         * @type @exp;items@pro;length
         */
        var items_total = items.length;

        /**
         * Items per line, eg.
         * Amount of columns
         * @type Number
         */
        var items_per_line = Math.floor(mwidth / (width + (margin*2)) );

        /**
         * Items in column
         * @type Number
         */
        var items_in_col = Math.round(items_total / items_per_line);

        if (items_in_col < 1) {
            items_in_col = 1;
        }

        /** For each column in amount of columns */
        for (var column = 1; column <= items_per_line; column++)
        {
            /** Creating a column */
            var col = $('<div>').addClass('col col-' + column).css({'margin-right': margin + 'px', 'margin-left': margin + 'px'});

            /** If amount of items is less then should be in a column, filling a column with all the rest */
            //if (items_in_col > items_total)
            //        items_in_col = items_total;
            /** In general, decreasing total items on items in this column */
            //else
                items_total -= items_in_col;

            /** For items 0 to amount that should be in a column */
            for (var i = 0; i < items_in_col; i++)
            {
                /** Index for item needed */
                if (items_total === 1) {
                    var index = 0;
                } else {
                    var index = column - 1 + i * items_per_line;
                }

                col.append(items.eq(index).clone().show());
                items.eq(index).hide();
            }

            /** Appending a column in a parent block */
            masonry.append(col);
        }

        /** If some items left */
        if (items_total > 0) {
            
            /** Redeclare items array */
            var items = masonry.children('.item');
            
            /** Fill each column with an item */
            for (var column = 1; column <= items_total; column++ ) {
                masonry.find('.col-' + column).append(items.eq(column-1));
            }
        }

    });
}