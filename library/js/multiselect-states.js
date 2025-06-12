( function( $ ) {

	// Enable strict mode.
	'use strict';

	// Define global FUI object if it doesn't exist.
	if ( 'object' !== typeof window.FUI ) {
		window.FUI = {};
	}

	FUI.multiSelectStates = function( el ) {

		const container = $( el );
		const option = container.find( '.forminator-option' );
		const input = option.find( 'input' );

		if ( ! container.is( '.forminator-multiselect' ) || 0 === option.length ) {
			return;
		}

		function init() {

			input.each( function() {

				$( this ).on( 'click', function() {

					const checkInput = $( this );
					const checkLabel = checkInput.parent();
					const checkField = checkLabel.closest( '.forminator-field' );

					if ( checkLabel.is( '.forminator-is_checked' ) ) {
						checkLabel.removeClass( 'forminator-is_checked' );
					} else {
						checkLabel.addClass( 'forminator-is_checked' );
					}

					// check if value is custom_option then show the custom option input
					if ( 'custom_option' === checkInput.val() && checkInput.is( ':checked' ) ) {
						checkField.find( '.forminator-custom-input' ).show();
					} else if ( 'custom_option' === checkInput.val() && ! checkInput.is( ':checked' ) ) {
						checkField.find( '.forminator-custom-input' ).hide();
					}
				});
			});
		}

		init();

		return this;
	};

}( jQuery ) );
