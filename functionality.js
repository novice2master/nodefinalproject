
(function() {
    var searchTerm, cardContainerID, card;
    $('#searchVal').on('change keyup', function() {
        searchTerm = $(this).val();
        $('.accordion > .card').each(function() {
            cardContainerID = '#' + $(this).attr('id');

            // Makes search to be case insesitive
            $.extend($.expr[':'], {
                'contains': function(elem, i, match, array) {
                    return (elem.textContent || elem.innerText || '').toLowerCase()
                        .indexOf((match[3] || "").toLowerCase()) >= 0;
                }
            });

            // END Makes search to be case insesitive

            // Show and Hide Triggers
            $(cardContainerID + ' .card-header' + ':not(:contains(' + searchTerm + '))').hide(); //Hide the rows that done contain the search query.
            $(cardContainerID + ' .card-header' + ':contains(' + searchTerm + ')').show(); //Show the rows that do!

        });
    });
}());