/**
   "Calendar 5318", v.0.1.2
   seabrus, https://github.com/seabrus
   MIT license
*/

// Calendar constructor
function Calendar() { };
	
// ===============================================
// Main function: Calendar calculation and presentation
// ==========================================================
//    Parameters:
//       mm 	- month to calculate the calendar for:   an integer, [0-11]
//       yyyy    - year:   an integer, [1-4999]
// ==========================================================
Calendar.prototype.calcCalendar = function( mm, yyyy ) {

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


// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//     CALENDAR events
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// ========================
// Show / hide the calendar
// =============================================================
//    Parameters:
//       cDiv 		- jQuery object that specifies the calendar DIV -- like $('.calendar')
// =============================================================
Calendar.prototype.show = function( cDiv ) {

	if ( cDiv.css('display') === 'none' ) {
		var now = new Date();
		cDiv.html( this.calcCalendar( now.getMonth(), now.getFullYear() ) );
		cDiv.data( 'current-month', now.getMonth() ); 
		cDiv.data( 'current-year', now.getFullYear() ); 
		cDiv.css( 'display', 'block' ); 
	}
	else {
		cDiv.html( '' );
		cDiv.removeData( 'current-month' ); 
		cDiv.removeData( 'current-year' ); 
		cDiv.css( 'display', 'none' ); 
	}
}	

// ========================
// Change a month or year
// =============================================================================
//    Parameters:
//       button 	- jQuery object that corresponds to the button clicked to change a month or year
//       cDiv 		- jQuery object that specifies the calendar DIV -- like $('.calendar')
// =============================================================================
Calendar.prototype.changeMonthYear = function ( button, cDiv ) {
	var month = cDiv.data( 'current-month' ) || 0,
		   year   = cDiv.data( 'current-year' ) || 2015;

	if ( button.hasClass('lessen-month') ) {
		month -= 1;
		if ( month === -1 ) {
			month = 11; year -= 1;
		}
	}

	if ( button.hasClass('add-month') ) {
		month += 1;
		if ( month === 12 ) {
			month = 0; year += 1;
		}
	}

	if ( button.hasClass('lessen-year') )
		year -= 1;
	if ( button.hasClass('add-year') )
		year += 1;

	if ( year < 1 ) year = 1;
	if ( year > 4999 ) year = 4999;

	cDiv.data( 'current-month', month ); 
	cDiv.data( 'current-year', year ); 
	cDiv.html( this.calcCalendar(month, year) );	
}	

// ========================
// Close all opened calendars
// =============================================================================
Calendar.prototype.closeCalendar = function () {
	var cDiv;
	var cDivs = $('.calendar');   // There can be present more then one calendar <div> on a page

	for( var i=0, len=cDivs.length; i< len; i++ ) {
		cDiv = cDivs.eq(i);
		if ( cDiv.css('display') === 'block' ) {
			cDiv.html( '' );
			cDiv.removeData( 'current-month' ); 
			cDiv.removeData( 'current-year' ); 
			cDiv.css( 'display', 'none' ); 
		}
	}
}
