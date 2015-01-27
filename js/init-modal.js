$( document ).ready( function() {

	// Initiation of the calendar
    var calendar = new Calendar();

// =======================
//     Calendar events
// =======================
	// Open a calendar by a click on the calendar icon
	$('.calendar-img').on('click', function(event) {
		var calendarDiv = $(this).nextAll('.calendar');
		calendar.show( calendarDiv );
		event.stopPropagation();
	});
	
	// Date picking out
	$('.calendar').on('click', 'td', function(event) {
		var inputElt = $(this).parents('.calendar').prevAll('input');
		inputElt.val( $(this).attr('data-picked-day') );
	});
	
	// Recalculation after a month or year is changed
	$('.calendar').on('click', '.change-calendar', function(event) {
		var clickedButton = $(this);
		var calendarDiv = clickedButton.parents('.calendar');
		calendar.changeMonthYear( clickedButton, calendarDiv );
	});

	// Closing when clicking on the modal dialog (except the calendar itself - see below)
	$('#modal-add-dlg').on('click', function() {
		calendar.closeCalendar();
	});

	// This allows avoiding the closing of the calendar when clicking within it
	$('.calendar').on('click', function(event) {
		event.stopPropagation();
	});



/* ******************************************************************** */
    // Initiation of the modal dialog window
    $('#modal-add-dlg').on('show.bs.modal', function (event) {

        var now = new Date();
        now = addZero(now.getDate()) + '-'  + addZero(now.getMonth() + 1) + '-' + now.getFullYear();
        $('#buy-date').val( now );

        function addZero(i) { return (i < 10 ? '0' : '') + i; }     // Helper function to format the Date string: It adds zeros before number < 10
    });
   

});
