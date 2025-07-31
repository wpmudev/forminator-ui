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
			id = label.toLowerCase().replace( /\s+/g, '-' );

		if ( data.id ) {
			id = data.id;
		}

		markup 	=	'<label for="' + id + '" class="forminator-checkbox">' +
						'<input type="checkbox" value="' + label + '" id="' + id + '" ' + ( selected ? 'checked' : '' ) + ' />' +
						'<span class="forminator-checkbox-box" aria-hidden="true"></span>' +
						'<span class="forminator-select-label">' + label + '</span>' +
					'</label>' ;

		return markup;
	};

	FUI.select2 = function() {

		$( '.forminator-custom-form' ).each( function( index ) {

			var $element = $( this ),
				$formid  = $element.data( 'form-id' ),
				$select  = $element.find( '.forminator-select2' ),
				$formindex = index
				;

			var $themes = [
				'bold',
				'flat',
				'default',
				'basic',
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
							$parent = $dialog.length ? $dialog : $select.closest( '.elementor-popup-modal' ),
							$dropdownClass = 'forminator-custom-form-' + $formid + ' forminator-dropdown--' + $theme;

						var id = $( this ).attr( 'id' );

						$( this ).attr( 'id', id + '-' + $formindex );

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
							$dropdownClass += ' forminator-dropdown--checkbox';
						} else {
							$hasCheckbox = false;
						}

						if ( $select.prop( 'multiple' ) ) {
							$dropdownClass += ' forminator-dropdown--multiple';
						}

						if ( ! $parent.length ) {
							$parent = $( document.body );
						}

						$select.FUIselect2({
							dir: $dir,
							language: $language,
							placeholder: $placeholder,
							dropdownCssClass: $dropdownClass,
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
