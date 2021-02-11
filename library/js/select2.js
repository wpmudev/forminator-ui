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
				'material',
				'none'
			];

			$.each( $themes, function( index, $theme ) {

				var $dir,
					$language = 'en',
					$placeholder = null,
					$hasSearch = -1
					;

				if ( $element.hasClass( 'forminator-design--' + $theme ) && $select.length ) {

					$select.each( function() {

						var $select = $( this );

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

						if ( 'true' === $select.attr( 'data-search' ) ) {
							$hasSearch = 0;
						}

						$select.FUIselect2({
							dir: $dir,
							language: $language,
							placeholder: $placeholder,
							dropdownCssClass: 'forminator-custom-form-' + $formid + ' forminator-dropdown--' + $theme,
							minimumResultsForSearch: $hasSearch
						}).on( 'select2:opening', function() {
							$select.data( 'select2' ).$dropdown.find( ':input.select2-search__field' ).attr( 'placeholder', $placeholder );
						});
					});
				}
			});
		});
	};
}( jQuery ) );
