( function( $ ) {

	// Enable strict mode.
	'use strict';

	// Define global SUI object if it doesn't exist.
	if ( 'object' !== typeof window.FUI ) {
		window.FUI = {};
	}

	FUI.inputMaterial = function( el ) {

		const input = $( el );
		const field = input.closest( '.forminator-field' );
		const label = field.find( '.forminator-label' );
		const form  = input.closest( 'form' );

		if ( ! input.is( 'input' ) && ! form.is( '.forminator-custom-form' ) ) {
			return;
		}

		function init() {

			// Wrap Element
			if ( ! input.parent().hasClass( 'forminator-input--wrap' ) ) {
				input.wrap( '<div class="forminator-input--wrap"></div>' );
			}

			// Wrap Label
			if ( label.length ) {

				// Add floating class
				label.addClass( 'forminator-floating--input' );

				// Add icon class (if applies)
				if ( field.find( '.forminator-input-with-icon' ).length ) {
					label.addClass( 'forminator-has_icon' );
				}
			}
		}

		init();

		return this;
	};

}( jQuery ) );
