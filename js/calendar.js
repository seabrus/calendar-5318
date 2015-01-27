/**
   CALENDAR 5318, v.0.1.0
   seabrus, https://github.com/seabrus
   MIT license
*/

// ==================================
//   CALENDAR events
// ==================================

$( document ).ready( function() {

	// Open a calendar by a click on the calendar image
	$('.calendar-img').on('click', function(event) {
		var calendarDiv = $(this).nextAll('.calendar');

		if ( calendarDiv.css('display') === 'none' ) {
			var now = new Date();
			calendarDiv.html( calcCalendar( now.getMonth(), now.getFullYear() ) );
			calendarDiv.data( 'current-month', now.getMonth() ); 
			calendarDiv.data( 'current-year', now.getFullYear() ); 
			calendarDiv.css( 'display', 'block' ); 
		}
		else {
			calendarDiv.html( '' );
			calendarDiv.removeData( 'current-month' ); 
			calendarDiv.removeData( 'current-year' ); 
			calendarDiv.css( 'display', 'none' ); 
		}

		event.stopPropagation();
	});

	// This allows avoiding the closing of the calendar when clicking within it
	$('.calendar').on('click', function(event) {
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

		var month = calendarDiv.data( 'current-month' ) || 0,
			   year   = calendarDiv.data( 'current-year' ) || 2015;

		if ( clickedButton.hasClass('lessen-month') ) {
			month -= 1;
			if ( month === -1 ) {
				month = 11; year -= 1;
			}
		}

		if ( clickedButton.hasClass('add-month') ) {
			month += 1;
			if ( month === 12 ) {
				month = 0; year += 1;
			}
		}

		if ( clickedButton.hasClass('lessen-year') )
			year -= 1;
		if ( clickedButton.hasClass('add-year') )
			year += 1;

		if ( year < 1 ) year = 1;
		if ( year > 4999 ) year = 4999;

		calendarDiv.data( 'current-month', month ); 
		calendarDiv.data( 'current-year', year ); 
		calendarDiv.html( calcCalendar(month, year) );
	});

	// Closing when clicking on the modal dialog (except the calendar itself - see above)
	$('#modal-add-dlg').on('click', function() {
		var calendarDiv;
		var calendarDivs = $('.calendar');   // There can be present more then one calendar <div> on a page

		for( var i=0, len=calendarDivs.length; i< len; i++ ) {
			calendarDiv = calendarDivs.eq(i);
			if ( calendarDiv.css('display') === 'block' ) {
				calendarDiv.html( '' );
				calendarDiv.removeData( 'current-month' ); 
				calendarDiv.removeData( 'current-year' ); 
				calendarDiv.css( 'display', 'none' ); 
			}
		}
	});


});   /*===========   end of   $( document ).ready   ===========*/


// ===============================================
// CALENDAR calculation and presentation
// ===============================================
//    Parameters:
//       mm 	- month to calculate the calendar for:   an integer, [0-11]
//       yyyy    - year:   an integer, [1-4999]
// ===============================================
function calcCalendar( mm, yyyy ) {
	var 	weekdays = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
	var 	monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	var 	monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

	var 	month = parseInt( mm ) , 
			year = parseInt( yyyy ) , 
			now = new Date();

	if ( isNaN(month)   ||   month < 0   ||   month > 11 )
		month = now.getMonth();
	if ( isNaN(year)   ||   year < 0   ||   year > 5000 )
		year = now.getFullYear();

	monthDays[1] = year % 4 ? 28 : 29;

	var html ='';
	html += '<div class="calendar-header">';
	html += '<div class="calendar-header-left"><span class="change-calendar lessen-month">&lt;</span>' + monthNames[month] + '<span class="change-calendar add-month">&gt;</span></div>&nbsp;';
	html += '<div class="calendar-header-right"><span class="change-calendar lessen-year">&lt;</span> ' + year + ' <span class="change-calendar add-year">&gt;</span></div>';
	html += '</div>';
	html += '<table class="calendar-table"><thead><tr>';

	for( var i=0; i<7; i++ )
		html += '<th>' + weekdays[i] + '</th>';

	html += '</tr></thead><tbody>';

	var firstDay = (new Date(year, month, 1)).getDay();   // The weekday of date "01/month/year"
	firstDay = (firstDay == 0) ? 6 : firstDay - 1;                  // Weekdays that start from Monday - to correlate with the 'weekdays' array

	var 	pickedDay = '', 	dayText = '',
			day = 1;

	while(day <= monthDays[month]) {
		html += '<tr>';

		for (var i=0; i<7; i++) {
			if ( i < firstDay   ||   day > monthDays[month] ) {
				pickedDay = '';
				dayText = ''; 
			}
			else {
				pickedDay = '' + addZero(day) + '-' + addZero(month + 1) + '-' + year;
				dayText = '' + day; 
				day++; 
			}
			html += '<td data-picked-day="' + pickedDay + '">' + dayText + '</td>';
		}
		firstDay = -1;

		html += '</tr>';
	}

	html += '</tbody></table>';

	return html;

	function addZero(i) { return (i < 10 ? '0' : '') + i; }   // A function to format the date string: it adds zeros before numbers < 10
}
