$( document ).ready( function() {

	// Initiation of the modal dialog window
	$('#modal-add-dlg').on('show.bs.modal', function (event) {

		$('[href="#new-record-tab"]').css("display", "list-item"); 
		$('[href="#new-record-tab"]').tab("show");

		var now = new Date();
		now = addZero(now.getDate()) + '-'  + addZero(now.getMonth() + 1) + '-' + now.getFullYear();
		$('#buy-date').val( now );

		function addZero(i) { return (i < 10 ? '0' : '') + i; }     // Helper function to format the Date string: It adds zeros before number < 10
	});

});
