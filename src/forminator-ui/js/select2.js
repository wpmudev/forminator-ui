( function( $ ) {

	// Enable strict mode
	'use strict';

	// Define global FUI object if it doesn't exist.
	if ( 'object' !== typeof window.FUI ) {
		window.FUI = {};
	}

	FUI.fuiSelect2 = function() {

		$( '.forminator-custom-form' ).each( function() {

			var $element = $( this ),
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
					$language = 'en'
					;

				if ( $element.hasClass( 'forminator-design--' + $theme ) && $select.length ) {

					if ( true === $select.data( 'rtl-support' ) ) {
						$dir = 'rtl';
					} else {
						$dir = 'ltr';
					}

					if ( '' !== $select.data( 'language' ) ) {
						$language = $select.data( 'language' );
					} else {
						$language = 'en';
					}

					$select.FUIselect2({
						dir: $dir,
						language: $language,
						dropdownCssClass: 'forminator-dropdown--' + $theme
					});
				}
			});
		});
	};

	$( 'body' ).ready( function() {
		FUI.fuiSelect2();
	});

}( jQuery ) );
