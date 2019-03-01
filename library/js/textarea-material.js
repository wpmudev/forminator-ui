( function( $ ) {

	// Enable strict mode.
	'use strict';

	// Define global SUI object if it doesn't exist.
	if ( 'object' !== typeof window.FUI ) {
		window.FUI = {};
	}

	FUI.textareaMaterial = function( el ) {

		const textarea = $( el );
		const field = textarea.closest( '.forminator-field' );
		const label = field.find( '.forminator-label' );
		const form  = textarea.closest( 'form' );

		if ( ! textarea.is( 'textarea' ) && ! form.is( '.forminator-custom-form' ) ) {
			return;
		}

		if ( textarea.parent().hasClass( 'forminator-textarea--wrap' ) ) {
			return;
		}

		function init() {

			// Wrap Element
			if ( ! textarea.parent().hasClass( 'forminator-input--wrap' ) ) {
				textarea.wrap( '<div class="forminator-textarea--wrap"></div>' );
			}

			// Wrap Label
			if ( label.length ) {
				label.addClass( 'forminator-floating--textarea' );
			}
		}

		init();

		return this;
	};

}( jQuery ) );
