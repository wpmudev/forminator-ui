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

				if ( $element.hasClass( 'forminator-design--' + $theme ) && $select.length ) {

					$select.FUIselect2({
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
