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

		if (
			! textarea.is( 'textarea' ) &&
			( ! form.is( '.forminator-ui' ) && ! form.is( '.forminator-custom-form' ) )
		) {
			return;
		}

		if ( textarea.hasClass( 'wp-editor-area' ) ) {
			return;
		}

		function init() {

			// Wrap Element
			if ( ! textarea.parent().hasClass( 'forminator-textarea--wrap' ) ) {
				textarea.wrap( '<div class="forminator-textarea--wrap"></div>' );
			}

			// Wrap Label
			if ( label.length ) {

				// Add floating class
				label.addClass( 'forminator-floating--textarea' );

				// If input has description adjancent to label then calculate it';s height and set --forminator-floating-label-translate css variable
				const description = field.find( '.forminator-label + .forminator-description' );
				if ( description.length ) {
					const descriptionHeight = description.outerHeight();
					const translateY = descriptionHeight;
					label.css( '--forminator-floating-label-translate', translateY + 'px' );
				}

				// Align textarea
				field.css({
					'position': 'relative'
				});

				if ( textarea.val() ) {

					field.addClass( 'forminator-is_filled' );
				}
			}
		}

		init();

		return this;
	};

}( jQuery ) );
