( function( $ ) {

	// Enable strict mode.
	'use strict';

	// Define global SUI object if it doesn't exist.
	if ( 'object' !== typeof window.FUI ) {
		window.FUI = {};
	}

	FUI.inputStates = function( el ) {

		const input = $( el );

		if ( ! input.is( 'input' ) ) {
			return;
		}

		function hover( element ) {

			const getInput = $( element );
			const getField = getInput.closest( '.forminator-field' );

			getInput.mouseover( function( e ) {
				getField.addClass( 'forminator-is_hover' );
				e.stopPropagation();
			}).mouseout( function( e ) {
				getField.removeClass( 'forminator-is_hover' );
				e.stopPropagation();
			});
		}

		function focused( element ) {

			const getInput = $( element );
			const getField = getInput.closest( '.forminator-field' );

			getInput.focus( function( e ) {
				getField.addClass( 'forminator-is_active' );
				e.stopPropagation();
			}).blur( function( e ) {
				getField.removeClass( 'forminator-is_active' );
				e.stopPropagation();
			});
		}

		function filled( element ) {

			const getInput = $( element );
			const getField = getInput.closest( '.forminator-field' );

			// On input load
			if ( '' !== getInput.val().trim() ) {
				getField.addClass( 'forminator-is_filled' );
			}

			// On input changes
			getInput.on( 'change', function() {

				if ( '' !== getInput.val().trim() ) {
					getField.addClass( 'forminator-is_filled' );
				} else {
					getField.removeClass( 'forminator-is_filled' );
				}
			});
		}

		function init() {

			input.each( function() {

				hover( this );
				focused( this );
				filled( this );

			});
		}

		init();

		return this;
	};

}( jQuery ) );
