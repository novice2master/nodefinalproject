
(function() {
    var searchTerm, cardContainerID, card;
    $('#searchVal').on('change keyup', function() {
        $('.collapse').collapse('hide');
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

url = (window.location.href.split('/')[3]).split('_');
temp = [];
for (var i in url) {
    temp.push(url[i].charAt(0).toUpperCase() + url[i].slice(1))
}
temp = temp.join(' ');
if (temp !== 'Account') {
    $("#thread-titles").html(temp);
}else{
    $("#thread-titles").html('My Posts');
}
