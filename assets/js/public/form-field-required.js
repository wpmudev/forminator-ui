( function( $ ) {

	'use strict';

	// Define global SHOWCASE object if it doesn't exist.
	if ( 'object' !== typeof window.SHOWCASE ) {
		window.SHOWCASE = {};
	}

	SHOWCASE.requiredFormField = function( el ) {

		const element = $( el );
		const required = '<span class="forminator-required">*</span>';

		if ( ! element.is( '.forminator-col[data-required]' ) ) {
			return;
		}

		function requiredInput( col ) {

			const column = $( col );
			const input = column.find( '.forminator-input' );

			input.each( function() {

				const field = $( this ).closest( '.forminator-field' );
				const label = field.find( '.forminator-label' );
				const text = label.text();

				$( this ).prop( 'aria-required', 'true' );

				if ( label.length ) {
					label.html( text + ' ' + required );
				}

				field.addClass( 'forminator-is_required' );
			});

		}

		function requiredTextarea( col ) {

			const column = $( col );
			const textarea = column.find( '.forminator-textarea' );

			textarea.each( function() {

				const field = $( this ).closest( '.forminator-field' );
				const label = field.find( '.forminator-label' );
				const text = label.text();

				$( this ).prop( 'aria-required', 'true' );

				if ( label.length ) {
					label.html( text + ' ' + required );
				}

				field.addClass( 'forminator-is_required' );
			});

		}

		function requiredRadio( col ) {

			const column = $( col );
			const field = column.find( '.forminator-field' );
			const radio = column.find( '.forminator-radio' );
			const label = column.find( '.forminator-label' );
			const text = label.text();

			radio.each( function() {
				$( this ).find( 'input' ).prop( 'aria-required', 'true' );
			});

			if ( radio.length ) {

				field.addClass( 'forminator-is_required' );
				field.prop( 'aria-required', 'true' );

				if ( label.length ) {
					label.html( text + ' ' + required );
				}
			}
		}

		function requiredCheckbox( col ) {

			const column = $( col );
			const field = column.find( '.forminator-field' );
			const checkbox = column.find( '.forminator-checkbox' );
			const label = column.find( '.forminator-label' );
			const text = label.text();

			checkbox.each( function() {
				$( this ).find( 'input' ).prop( 'aria-required', 'true' );
			});

			if ( checkbox.length ) {

				field.addClass( 'forminator-is_required' );
				field.prop( 'aria-required', 'true' );

				if ( label.length ) {
					label.html( text + ' ' + required );
				}
			}
		}

		function requiredMultiSelect( col ) {

			const column = $( col );
			const field = column.find( '.forminator-field' );
			const mutliselect = column.find( '.forminator-multiselect' );
			const checkbox = column.find( '.forminator-option' );
			const label = column.find( '.forminator-label' );
			const text = label.text();

			if ( mutliselect.length ) {

				checkbox.each( function() {
					$( this ).find( 'input' ).prop( 'aria-required', 'true' );
				});

				field.addClass( 'forminator-is_required' );
				field.prop( 'aria-required', 'true' );

				if ( label.length ) {
					label.html( text + ' ' + required );
				}
			}
		}

		function init() {

			if ( true === element.data( 'required' ) ) {
				requiredInput( element );
				requiredTextarea( element );
				requiredRadio( element );
				requiredCheckbox( element );
				requiredMultiSelect( element );
			}
		}

		init();

		return this;

	};

}( jQuery ) );
