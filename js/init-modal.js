/*
 *   "Calendar 5318", v.0.1.3
 *   seabrus, https://github.com/seabrus
 *   
 */

$( document ).ready( function() {

    // Initiation of the calendar
	$('#buy-date').calendar5318();



    // Just for DEMO: 
    // Initiation of the Date field (it has id="buy-date") in a modal dialog window with the current Date
    $('#modal-add-dlg').on('show.bs.modal', function (event) {

        var now = new Date();
        now = addZero(now.getDate()) + '-'  + addZero(now.getMonth() + 1) + '-' + now.getFullYear();
        $('#buy-date').val( now );

        function addZero(i) { return (i < 10 ? '0' : '') + i; }     // Helper function to format the Date string: It adds zeros before number < 10
    });

});
