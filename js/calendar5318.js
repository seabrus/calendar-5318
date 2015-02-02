/*
   "Calendar 5318", v.0.1.3
   seabrus, https://github.com/seabrus
   MIT license
*/

(function($) {
    
    $.fn.calendar5318 = function() {

    // =======================================================================
    //     Calendar wrapper preparation
    // =======================================================================
        // Build a calendar wrapper DIV's
        this.each( function() {
            var $element = $(this);
            $element.wrap( '<div class="calendar-box"></div>' );
            $element.wrap( '<div class="calendar-img-box"></div>' );
            $element.parent('.calendar-img-box').append( '<img src="img/calendar.png" alt="Calendar icon" title="Click to open the calendar" class="calendar-img">' );
            $element.parents('.calendar-box').append( '<div class="calendar"></div>' );

	        // Recalculate width of the calculator container
	        var inputBox = $element.get(0).getBoundingClientRect();
	        var inputWidth = Math.round( inputBox.right - inputBox.left );
	        var inputHeight = Math.round( inputBox.bottom - inputBox.top );
	        if ( inputWidth != 0   &&   inputHeight != 0 ) {
	            $element.parent('.calendar-img-box').css( { 'width': inputWidth + 'px' } );
//	            $element.css( { 'width': (inputWidth - 32) + 'px' } );
	        }
//	        else if {
//	            var compStyle = window.getComputedStyle( this.get(0), null );
//	        }

        });


        // Initiation of the calendar
        var calendar = new Calendar();

    // =======================================================================
    //     Calendar events
    // =======================================================================
        // Open a calendar by a click on the calendar icon with the class="calendar-img"
        $('.calendar-img').on('click', function(event) {
            // Calculate the top calendar position on a basis of the INPUT height
            var inputBox = $(this).prevAll('input').get(0).getBoundingClientRect();
            var inputHeight = Math.round( inputBox.bottom - inputBox.top );
            $('.calendar').css( { 'top': (inputHeight + 1) + 'px' } );
//          $('.calendar').css( { 'top': ($(this).prevAll('input').height() + 1) + 'px' } );

            var calendarDiv = $(this).parents('.calendar-box').children('.calendar');
            calendar.show( calendarDiv );
            event.stopPropagation();
        });
        
        // Date picking out from the calendar DIV with the class="calendar"
        $('.calendar').on('click', 'td', function(event) {
            var tdPicked = $(this);
            var inputElt = tdPicked.parents('.calendar').prevAll('.calendar-img-box').children('input');
            inputElt.val( calendar.pickDate( tdPicked ) );
            calendar.closeCalendar();
        });
        
        // Recalculation after the month or year is changed. Controls that allow such changes have the class="change-calendar" 
        $('.calendar').on('click', '.change-calendar', function(event) {
            var clickedButton = $(this);
            var calendarDiv = clickedButton.parents('.calendar');
            calendar.changeMonthYear( clickedButton, calendarDiv );
        });
    
        // Closing when clicking on body except the calendar itself - see below
        $( window ).on('click', function() {
            calendar.closeCalendar();
        });
    
        // This allows avoiding the closing of the calendar when clicking within it
        $('.calendar').on('click', function(event) {
            event.stopPropagation();
        });
    // =======================================================================
    //     END of the calendar events
    // =======================================================================



        // Calendar constructor
        function Calendar() { };
            
        // ===============================================
        // Main method: Calendar calculation and presentation 
        //     Vanilla JavaScript (no jQuery)
        // ==========================================================
        //     Parameters:
        //       mm     -- month:   an integer, [0-11]
        //       yyyy   -- year:   an integer, [1-4999]
        // ==========================================================
        Calendar.prototype.calcCalendar = function( mm, yyyy ) {
        
            var weekdays = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
            var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            var monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        
            var month = parseInt( mm ) , 
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
        
            var     pickedDay = '',     dayText = '',
                    day = 1;
        
            while(day <= monthDays[month]) {
                html += '<tr>';
        
                for (var i=0; i<7; i++) {
                    if ( i < firstDay   ||   day > monthDays[month] ) {
                        pickedDay = '';
                        dayText = ''; 
                    }
                    else {
                        pickedDay = '' + addZero(day) + '-' + addZero(month + 1) + '-' + year;     // Format of Date: now it is set to   DD-MM-YYYY
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
    //     Functions to handle CALENDAR events   ( jQuery is used ) 
    // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
        
        // ========================
        // Show / hide the calendar
        // =============================================================
        //    Parameters:
        //       cDiv   -- a jQuery object that specifies the calendar DIV -- like $('.calendar')
        // =============================================================
        Calendar.prototype.show = function( cDiv ) {
        
            if ( cDiv.css('display') === 'none' ) {
                var now = new Date();
                cDiv.html( this.calcCalendar( now.getMonth(), now.getFullYear() ) );
                cDiv.data( 'current-month', now.getMonth() );     // Save the month and year to know them if the user will want to change them
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
        //       button   -- a jQuery object that corresponds to the button clicked to change a month or year
        //       cDiv     -- a jQuery object that specifies the calendar DIV -- like $('.calendar')
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
        // Pick the date
        // =============================================================================
        //    Parameters:
        //       tdPicked     -- a jQuery object that specifies the picked (clicked) <td> in the calendar table
        // =============================================================================
        Calendar.prototype.pickDate = function ( tdPicked ) {
                return tdPicked.attr('data-picked-day');
        }

        // ========================
        // Close all opened calendars
        // =============================================================================
        Calendar.prototype.closeCalendar = function () {
            var cDiv;
            var cDivs = $('.calendar');     // There can be present more then one calendar <div> on a page
        
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


    };

})(jQuery);
