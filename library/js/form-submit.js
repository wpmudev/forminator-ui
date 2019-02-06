( function( $ ) {

	'use strict';

	// Define global FUI object if it doesn't exist.
	if ( 'object' !== typeof window.FUI ) {
		window.FUI = {};
	}

	FUI.formSubmit = function( el ) {

		const button = $( el );
		const form = button.closest( '.forminator-custom-form' );

		if ( ! button.is( '.forminator-button-submit' ) || ! form[0] || ! form.length ) {
			return;
		}

		function init() {

			button.addClass( 'forminator-button-onload' );

			setTimeout( function() {
				button.removeClass( 'forminator-button-onload' );
			}, 1000 );
		}

		init();

		return this;
	};

}( jQuery ) );
