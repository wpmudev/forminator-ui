( function( $ ) {

	// Enable strict mode.
	'use strict';

	// Define global FUI object if it doesn't exist.
	if ( 'object' !== typeof window.FUI ) {
		window.FUI = {};
	}

	FUI.fuiOptions = function() {

		$( '.forminator-is_required' ).each( function() {

			var $field   = $( this ),
				$options = $field.find( '.forminator-radio, .forminator-checkbox, .forminator-multiselect .forminator-option' )
				;

			if ( $options.length && ! $options.hasClass( 'forminator-is_checked' ).length ) {
				$field.addClass( 'forminator-has_error' );
			} else {
				$field.removeClass( 'forminator-has_error' );
			}
		});

		$( 'body' ).on( 'click', '.forminator-radio input, .forminator-checkbox input, .forminator-multiselect .forminator-option input', function( e ) {

			var $option  = $( this ),
				$parent  = $option.parent(),
				$field   = $option.closest( '.forminator-field' ),
				$radios  = $field.find( '.forminator-radio' )
				;

			if ( 'radio' === $option.attr( 'type' ) ) {
				$radios.removeClass( 'forminator-is_checked' );
				$parent.addClass( 'forminator-is_checked' );

				if ( $field.hasClass( 'forminator-is_required' ) && $field.hasClass( 'forminator-has_error' ) ) {
					$field.removeClass( 'forminator-has_error' );
				}
			}

			if ( 'checkbox' === $option.attr( 'type' ) ) {

				if ( $parent.hasClass( 'forminator-is_checked' ) ) {
					$parent.removeClass( 'forminator-is_checked' );
				} else {
					$parent.addClass( 'forminator-is_checked' );
				}

				if ( $field.hasClass( 'forminator-is_required' ) ) {

					if ( $field.find( '.forminator-is_checked' ).length ) {
						$field.removeClass( 'forminator-has_error' );
					} else {
						$field.addClass( 'forminator-has_error' );
					}
				}
			}

			e.stopPropagation();

		});
	};

	$( 'body' ).ready( function() {
		FUI.fuiOptions();
	});

}( jQuery ) );