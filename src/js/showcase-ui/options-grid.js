( function( $ ) {

	// Custom Grid
	$( 'body' ).ready( function() {

		var $input = $( '#form-grid-custom-value' ),
			$gutterFull = $input.val(),
			$gutterHalf = parseInt( $gutterFull ) / 2
			;

		$( 'body' ).append(
			'<style type="text/css">' +
				'.forminator-custom-form.forminator-custom .forminator-row:not(:last-child) {' +
					'margin-bottom: ' + $gutterFull + 'px' +
				'}' +
				'.forminator-custom-form.forminator-custom .forminator-col:not(:last-child) {' +
					'margin-bottom: ' + $gutterFull + 'px' +
				'}' +
				'@media (min-width: 961px) {' +
					'.forminator-custom-form.forminator-custom:not(.forminator-size--small) .forminator-row {' +
						'margin-right: -' + $gutterHalf + 'px;' +
						'margin-left: -' + $gutterHalf + 'px' +
					'}' +
					'.forminator-custom-form.forminator-custom:not(.forminator-size--small) .forminator-col {' +
						'padding: 0 ' + $gutterHalf + 'px' +
					'}' +
					'.forminator-custom-form.forminator-custom:not(.forminator-size--small) .forminator-col:not(:last-child) {' +
						'margin-bottom: 0' +
					'}' +
				'}' +
			'</style>'
		);
	});

	// Get correct grid variation
	$( 'body' ).on( 'click', '.tab-content[data-tab="grid"] .options .options-menu .option', function( e ) {

		var $option = $( this ),
			$value  = $option.find( 'input' ).val(),
			$parent = $option.closest( '.tab-content[data-tab="grid"]' ),
			$form   = $parent.find( '.forminator-custom-form' )
			;

		if ( 'enclosed' === $value ) {
			$form.addClass( 'forminator-enclosed' );
		} else {
			$form.removeClass( 'forminator-enclosed' );
		}

		if ( 'custom' === $value ) {
			$form.addClass( 'forminator-custom' );
		} else {
			$form.removeClass( 'forminator-custom' );
		}

		e.preventDefault();
		e.stopPropagation();

	});

}( jQuery ) );
