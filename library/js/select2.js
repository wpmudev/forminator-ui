( function( $ ) {

	// Enable strict mode
	'use strict';

	// Define global FUI object if it doesn't exist.
	if ( 'object' !== typeof window.FUI ) {
		window.FUI = {};
	}

	FUI.select2 = function() {

		$( '.forminator-custom-form' ).each( function() {

			var $element = $( this ),
				$formid  = $element.data( 'form-id' ),
				$select  = $element.find( '.forminator-select2' )
				;

			var $themes = [
				'bold',
				'flat',
				'default',
				'material'
			];

			$.each( $themes, function( index, $theme ) {

				var $dir,
					$language = 'en',
					$placeholder = null
					;

				if ( $element.hasClass( 'forminator-design--' + $theme ) && $select.length ) {

					if ( true === $select.data( 'rtl-support' ) ) {
						$dir = 'rtl';
					} else {
						$dir = 'ltr';
					}

					if ( '' !== $select.data( 'placeholder' ) ) {
						$placeholder = $select.data( 'placeholder' );
					} else {
						$placeholder = null;
					}

					if ( '' !== $select.data( 'language' ) ) {
						$language = $select.data( 'language' );
					} else {
						$language = 'en';
					}

					$select.FUIselect2({
						dir: $dir,
						language: $language,
						placeholder: $placeholder,
						dropdownCssClass: 'forminator-custom-form-' + $formid + ' forminator-dropdown--' + $theme
					});
				}
			});
		});
	};

	$( 'body' ).ready( function() {
		FUI.select2();
	});

}( jQuery ) );
