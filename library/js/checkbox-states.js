( function( $ ) {

	// Enable strict mode.
	'use strict';

	// Define global FUI object if it doesn't exist.
	if ( 'object' !== typeof window.FUI ) {
		window.FUI = {};
	}

	FUI.checkboxStates = function( el ) {

		const label = $( el );
		const input = label.find( 'input' );

		if ( ! label.is( 'label' ) || 'checkbox' !== input.prop( 'type' ) ) {
			return;
		}

		function init() {

			input.each( function() {

				$( this ).on( 'click', function() {

					const checkInput = $( this );
					const checkLabel = checkInput.parent();

					if ( checkLabel.is( '.forminator-is_checked' ) ) {
						checkLabel.removeClass( 'forminator-is_checked' );
					} else {
						checkLabel.addClass( 'forminator-is_checked' );
					}
				});
			});
		}

		init();

		return this;
	};

}( jQuery ) );
