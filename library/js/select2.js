( function( $ ) {

	// Enable strict mode
	'use strict';

	// Define global FUI object if it doesn't exist.
	if ( 'object' !== typeof window.FUI ) {
		window.FUI = {};
	}

	FUI.select = {};

	FUI.select.formatCheckbox = ( data, container ) => {
		const label = data.text;
		const selected = data.selected;
		const id = ( data.id || label.toLowerCase().replace( /\s+/g, '-' ) );

		const wrapper = document.createElement( 'label' );
		wrapper.setAttribute( 'for', id );
		wrapper.className = 'forminator-checkbox';

		const input = document.createElement( 'input' );
		input.type = 'checkbox';
		input.value = label;
		input.id = id;
		if ( selected ) {
			input.checked = true;
		}

		const box = document.createElement( 'span' );
		box.className = 'forminator-checkbox-box';
		box.setAttribute( 'aria-hidden', 'true' );

		const text = document.createElement( 'span' );
		text.className = 'forminator-select-label';
		text.textContent = label;

		wrapper.appendChild( input );
		wrapper.appendChild( box );
		wrapper.appendChild( text );

		return wrapper;
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

						if ( true === $select.data( 'rtl-support' ) || 'rtl' === $select.closest( 'html' ).attr( 'dir' ) ) {
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
