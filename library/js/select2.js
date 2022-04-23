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
					$placeholder = 'Search',
					$hasSearch = -1
					;

				if ( $element.hasClass( 'forminator-design--' + $theme ) && $select.length ) {

					$select.each( function() {

						var $select = $( this ),
							$parent = $select.closest( '.sui-dialog-content' );

						if ( true === $select.data( 'rtl-support' ) ) {
							$dir = 'rtl';
						} else {
							$dir = 'ltr';
						}

						if ( '' !== $select.data( 'placeholder' ) ) {
							$placeholder = $select.data( 'placeholder' );
						} else {
							$placeholder = 'Search';
						}

						if ( '' !== $select.data( 'language' ) ) {
							$language = $select.data( 'language' );
						} else {
							$language = 'en';
						}

						if ( true === $select.data( 'search' ) ) {
							$hasSearch = 0;
						}

						if ( ! $parent.length ) {
							$parent = $( document.body );
						}

						$select.FUIselect2({
							dir: $dir,
							language: $language,
							placeholder: $placeholder,
							dropdownCssClass: 'forminator-custom-form-' + $formid + ' forminator-dropdown--' + $theme,
							minimumResultsForSearch: $hasSearch,
							dropdownParent: $parent
						}).on( 'select2:opening', function() {
							$select.data( 'select2' ).$dropdown.find( ':input.select2-search__field' ).prop( 'placeholder', $placeholder );
							if ( $select.closest( '.hustle-popup' ).length || $select.closest( '.hustle-slidein' ) ) {
								$( document.body ).addClass( 'forminator-hustle-dropdown-fix' );
							}
						}).on( 'select2:closing', function() {
							$( document.body ).removeClass( 'forminator-hustle-dropdown-fix' );
						});
					});
				}
			});
		});
	};
}( jQuery ) );
