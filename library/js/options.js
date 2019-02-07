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

		if ( ! label.is( 'label' ) || 'checkbox' !== input.attr( 'type' ) ) {
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

	FUI.radioStates = function( el ) {

		const label = $( el );
		const input = label.find( 'input' );

		if ( ! label.is( 'label' ) || 'radio' !== input.attr( 'type' ) ) {
			return;
		}

		function init() {

			input.each( function() {

				$( this ).on( 'click', function() {

					const radioInput = $( this );
					const radioLabel = radioInput.parent();

					const radioField = radioLabel.closest( '.forminator-field' );
					const radioOptions = radioField.find( '.forminator-radio' );

					// Remove checked attribute
					radioOptions.find( 'input' ).removeAttr( 'checked' );

					// Remove checked class
					radioOptions.removeClass( 'forminator-is_checked' );

					// Assign checked attribute
					radioInput.attr( 'checked', 'checked' );

					// Assign checked class
					radioLabel.addClass( 'forminator-is_checked' );
				});
			});
		}

		init();

		return this;
	};

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
