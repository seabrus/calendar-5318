/*
 *   "Calendar 5318", v.0.1.2
 *   seabrus, https://github.com/seabrus
 * 
 *   Initiation of the calendar 
 *   and work with it 
 *   in a jQuery-based program
 *   
 */

$( document ).ready( function() {
alert("READY");
	// Initiation of the calendar
    var calendar = new Calendar();

// =======================================================================
//     Calendar events
// =======================================================================
	// Open a calendar by a click on the calendar icon with the class="calendar-img"
	$('.calendar-img').on('click', function(event) {
		var calendarDiv = $(this).nextAll('.calendar');
		calendar.show( calendarDiv );
		event.stopPropagation();
	});
	
	// Date picking out from the calendar DIV with the class="calendar"
	$('.calendar').on('click', 'td', function(event) {
		var tdPicked = $(this);
		var inputElt = tdPicked.parents('.calendar').prevAll('input');
		inputElt.val( calendar.pickDate( tdPicked ) );
	});
	
	// Recalculation after the month or year is changed. Controls that allow such changes have the class="change-calendar" 
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
// =======================================================================
//     END of the calendar events
// =======================================================================


/* **************************************************************************************************************************** */
    // Initiation of the Date field (it has id="buy-date") in a modal dialog window with the current Date
    $('#modal-add-dlg').on('show.bs.modal', function (event) {

        var now = new Date();
        now = addZero(now.getDate()) + '-'  + addZero(now.getMonth() + 1) + '-' + now.getFullYear();
        $('#buy-date').val( now );

        function addZero(i) { return (i < 10 ? '0' : '') + i; }     // Helper function to format the Date string: It adds zeros before number < 10
    });
   

});
