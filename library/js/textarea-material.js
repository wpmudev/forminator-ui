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
			if ( ! textarea.parent().hasClass( 'forminator-textarea--wrap' ) ) {
				textarea.wrap( '<div class="forminator-textarea--wrap"></div>' );
			}

			// Wrap Label
			if ( label.length ) {

				const labelHeight  = label.height();
				const labelPadding = 9;
				const labelMath    = labelHeight + labelPadding;

				// Add floating class
				label.addClass( 'forminator-floating--textarea' );

				// Align textarea
				field.css({
					'position': 'relative'
				});

				if ( ! field.hasClass( 'forminator-is_filled' ) || ! field.hasClass( 'forminator-is_active' ) ) {

					label.css({
						'padding-top': labelMath + 'px'
					});
				}

				textarea.css({
					'padding-top': labelMath + 'px'
				});
			}
		}

		init();

		return this;
	};

}( jQuery ) );
