( function( $ ) {

	// Enable strict mode.
	'use strict';

	// Define global SUI object if it doesn't exist.
	if ( 'object' !== typeof window.FUI ) {
		window.FUI = {};
	}

	FUI.textareaStates = function( el ) {

		const textarea = $( el );

		if ( ! textarea.is( 'textarea' ) ) {
			return;
		}

		function hover( element ) {

			const getTextarea = $( element );
			const getField = getTextarea.closest( '.forminator-field' );

			getTextarea.mouseover( function( e ) {
				getField.addClass( 'forminator-is_hover' );
				e.stopPropagation();
			}).mouseout( function( e ) {
				getField.removeClass( 'forminator-is_hover' );
				e.stopPropagation();
			});
		}

		function focused( element ) {

			const getTextarea = $( element );
			const getField = getTextarea.closest( '.forminator-field' );

			getTextarea.focus( function( e ) {
				getField.addClass( 'forminator-is_active' );
				e.stopPropagation();
			}).blur( function( e ) {
				getField.removeClass( 'forminator-is_active' );
				e.stopPropagation();
			});
		}

		function filled( element ) {

			const getTextarea = $( element );
			const getField = getTextarea.closest( '.forminator-field' );

			// On textarea load
			getTextarea.on( 'load', function() {

				if ( '' !== getTextarea.val().trim() ) {
					getField.addClass( 'forminator-is_filled' );
				}
			});

			// On textarea changes
			getTextarea.on( 'change', function() {

				if ( '' !== getTextarea.val().trim() ) {
					getField.addClass( 'forminator-is_filled' );
				} else {
					getField.removeClass( 'forminator-is_filled' );
				}
			});
		}

		function init() {

			textarea.each( function() {

				hover( this );
				focused( this );
				filled( this );

			});
		}

		init();

		return this;
	};

}( jQuery ) );
