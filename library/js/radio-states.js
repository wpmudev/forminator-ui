( function( $ ) {

	// Enable strict mode.
	'use strict';

	// Define global FUI object if it doesn't exist.
	if ( 'object' !== typeof window.FUI ) {
		window.FUI = {};
	}

	FUI.radioStates = function( el ) {

		const label = $( el );
		const input = label.find( 'input' );

		if ( ! label.is( 'label' ) || 'radio' !== input.prop( 'type' ) ) {
			return;
		}

		function init() {

			input.each( function() {

				$( this ).on( 'click', function() {

					const radioInput = $( this );
					const radioLabel = radioInput.parent();

					const radioOptions = radioField.find( '.forminator-radio' );

					// Remove checked attribute
					radioOptions.find( 'input' ).prop( 'checked', false );

					// Remove checked class
					radioOptions.removeClass( 'forminator-is_checked' );

					// Assign checked attribute
					radioInput.prop( 'checked', 'checked' );

					// Assign checked class
					radioLabel.addClass( 'forminator-is_checked' );
				});
			});
		}

		init();

		return this;
	};

}( jQuery ) );
