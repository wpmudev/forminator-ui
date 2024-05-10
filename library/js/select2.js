( function( $ ) {

	// Enable strict mode
	'use strict';

	// Define global FUI object if it doesn't exist.
	if ( 'object' !== typeof window.FUI ) {
		window.FUI = {};
	}

	FUI.select = {};

	FUI.select.escapeJS = ( string ) => {

        // Create a temporary <div> element using jQuery and set the HTML content.
        var div = $( '<div>' ).html( string );

        // Get the text content of the <div> element and remove script tags
        var text = div.text().replace( /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '' );

        // Return the escaped text
        return text;
    };

	FUI.select.formatCheckbox = ( data, container ) => {
		const label = FUI.select.escapeJS( data.text );
		const selected = data.selected;
		let markup,
			id = label;

		if ( data.id ) {
			id = label;
		}

		markup 	=	'<label for="' + id + '" class="forminator-checkbox">' +
						'<input type="checkbox" value="' + label + '" id="' + id + '" ' + ( selected ? 'checked' : '' ) + ' />' +						'<span class="forminator-checkbox-box" aria-hidden="true"></span>' +
						'<span>' + label + '</span>' +
					'</label>' ;

		return markup;
	};

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
					$placeholder = 'Select',
					$hasSearch = -1,
					$hasCheckbox = false
					;

				if ( $element.hasClass( 'forminator-design--' + $theme ) && $select.length ) {

					$select.each( function() {

						var $select = $( this ),
							$dialog = $select.closest( '.sui-dialog-content' ),
							$parent = $dialog.length ? $dialog : $select.closest( '.elementor-popup-modal' );

						if ( true === $select.data( 'rtl-support' ) ) {
							$dir = 'rtl';
						} else {
							$dir = 'ltr';
						}

						if ( $select.data( 'placeholder' ) ) {
							$placeholder = $select.data( 'placeholder' );
						} else {
							$placeholder = 'Select';
						}

						if ( $select.data( 'language' ) ) {
							$language = $select.data( 'language' );
						} else {
							$language = 'en';
						}

						if ( true === $select.data( 'search' ) ) {
							$hasSearch = 0;
						} else {
							$hasSearch = -1;
						}

						if ( true === $select.data( 'checkbox' ) ) {
							$hasCheckbox = true;
						} else {
							$hasCheckbox = false;
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
							dropdownParent: $parent,
							...( $hasCheckbox && {
								closeOnSelect: false,
								templateResult: FUI.select.formatCheckbox,
								escapeMarkup: function( markup ) {
									return markup;
								}
							})
						}).on( 'select2:opening', function() {
							if ( $select.data( 'search-placeholder' ) ) {
								$select.data( 'select2' ).$dropdown.find( ':input.select2-search__field' ).prop( 'placeholder', $select.data( 'search-placeholder' ) );
							} else {
								$select.data( 'select2' ).$dropdown.find( ':input.select2-search__field' ).prop( 'placeholder', $select.data( 'placeholder' ) ? $select.data( 'placeholder' ) : 'Search' );
							}

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
