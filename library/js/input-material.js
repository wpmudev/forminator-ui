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

		if (
			! input.is( 'input' ) &&
			(
				( ! form.is( '.forminator-poll' ) ) ||
				( ! form.is( '.forminator-ui' ) && ! form.is( '.forminator-custom-form' ) )
			)
		) {
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

				// If input has description adjancent to label then calculate it';s height and set --forminator-floating-label-translate css variable
				const description = field.find( '.forminator-label + .forminator-description' );
				if ( description.length ) {
					const descriptionHeight = description.outerHeight();
					const labelHeight = label.outerHeight();
					const translateY = descriptionHeight + labelHeight + 8; // 8px margin
					label.css( '--forminator-floating-label-translate', translateY + 'px' );
				}

				// Add icon class (if applies)
				if ( field.find( '.forminator-input-with-icon' ).length ) {
					label.addClass( 'forminator-has_icon' );
				}

				// Add phone class (if applies)
				if ( field.find( '.forminator-input-with-phone' ).length ) {

					label.addClass( 'forminator-has_phone' );

					if ( field.find( '.intl-tel-input' ).hasClass( 'allow-dropdown' ) ) {
						label.addClass( 'allow-dropdown' );
					}
				}
			}
		}

		init();

		return this;
	};

}( jQuery ) );
