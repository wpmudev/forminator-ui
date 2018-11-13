( function( $ ) {

	// Enable strict mode.
	'use strict';

	// Define global SUI object if it doesn't exist.
	if ( 'object' !== typeof window.FUI ) {
		window.FUI = {};
	}

	FUI.fuiInputs = function() {

		$( '.forminator-input, .forminator-textarea' ).each( function() {

			var $element = $( this ),
				$field = $element.closest( '.forminator-field' )
				;

			$element.mouseover( function( e ) {
				$field.addClass( 'forminator-is_hover' );
				e.stopPropagation();
			}).mouseout( function( e ) {
				$field.removeClass( 'forminator-is_hover' );
				e.stopPropagation();
			});

			$element.focus( function( e ) {
				$field.addClass( 'forminator-is_active' );
				e.stopPropagation();
			}).blur( function( e ) {
				$field.removeClass( 'forminator-is_active' );
				e.stopPropagation();
			});

			$element.change( function( e ) {

				if ( '' !== $element.val().trim() ) {
					$field.addClass( 'forminator-is_filled' );
				} else {
					$field.removeClass( 'forminator-is_filled' );
				}

				if ( '' !== $element.val().trim() && $field.hasClass( 'forminator-has_error' ) ) {
					$field.removeClass( 'forminator-has_error' );
				}

				e.stopPropagation();

			});
		});
	};

	$( 'body' ).ready( function() {
		FUI.fuiInputs();
	});

}( jQuery ) );
