( function( $ ) {

	'use strict';

	// Define global SHOWCASE object if it doesn't exist.
	if ( 'object' !== typeof window.SHOWCASE ) {
		window.SHOWCASE = {};
	}

	SHOWCASE.requiredSettings = function( el ) {

		const column = $( el );
		const required = '<span class="forminator-required">*</span>';

		if ( ! column.is( '.forminator-col' ) ) {
			return;
		}

		function requiredInput( col ) {

			const column = $( col );
			const input = column.find( '.forminator-input' );

			input.each( function() {

				const field = $( this ).closest( '.forminator-field' );
				const label = field.find( '.forminator-label' );
				const text = label.text();

				$( this ).attr( 'aria-required', 'true' );

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

				$( this ).attr( 'aria-required', 'true' );

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
				$( this ).find( 'input' ).attr( 'aria-required', 'true' );
			});

			if ( radio.length ) {

				field.addClass( 'forminator-is_required' );
				field.attr( 'aria-required', 'true' );

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
				$( this ).find( 'input' ).attr( 'aria-required', 'true' );
			});

			if ( checkbox.length ) {

				field.addClass( 'forminator-is_required' );
				field.attr( 'aria-required', 'true' );

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
					$( this ).find( 'input' ).attr( 'aria-required', 'true' );
				});

				field.addClass( 'forminator-is_required' );
				field.attr( 'aria-required', 'true' );

				if ( label.length ) {
					label.html( text + ' ' + required );
				}
			}
		}

		function init() {

			if ( true === column.data( 'required' ) ) {
				requiredInput( column );
				requiredTextarea( column );
				requiredRadio( column );
				requiredCheckbox( column );
				requiredMultiSelect( column );
			}
		}

		init();

		return this;

	};

	SHOWCASE.conditionSample = function( el ) {

		const column = $( el );
		const row = column.closest( '.forminator-row' );
		const form = column.closest( 'form' );
		const checkbox = form.find( '.forminator-checkbox input[value="one"]' );

		if ( true === column.data( 'conditional' ) ) {

			row.hide();
			row.attr( 'aria-hidden', 'true' );

			checkbox.on( 'click', function() {

				if ( $( this ).is( ':checked' ) ) {
					row.show();
					row.removeAttr( 'aria-hidden' );
				} else {
					row.hide();
					row.attr( 'aria-hidden' );
				}
			});
		}
	};

	$( 'body' ).ready( function() {

		// Check if page exists
		if ( -1 < window.location.href.indexOf( 'accessibility' ) ) {

			// Load form
			$( '.forminator-custom-form' ).each( function() {

				const formDiv = $( this );
				const formCol = formDiv.find( '.forminator-col' );

				FUI.formLoad( formDiv );

				// Load elements to sample form
				formCol.each( function() {

					const colDiv = $( this );
					const colField = colDiv.data( 'field' );

					if ( colDiv.attr( 'data-field' ) && '' !== colDiv.attr( 'data-field' ) ) {

						colDiv.load( 'templates/form-elements/field-' + colField + '.html', function() {

							const column = $( this );
							const columnUnwrapped = column.find( '> .forminator-col' );
							const input = column.find( '.forminator-input' );
							const radio = column.find( '.forminator-radio' );
							const checkbox = column.find( '.forminator-checkbox' );
							const multiselect = column.find( '.forminator-multiselect' );
							const textarea = column.find( '.forminator-textarea' );
							const select = column.find( '.forminator-select' );
							const select2 = column.find( '.forminator-select2' );
							const submit = column.find( '.forminator-button-submit' );

							// Required settings
							SHOWCASE.requiredSettings( column );

							// Hidden field
							if ( true === column.data( 'conditional' ) ) {
								columnUnwrapped.attr( 'data-conditional', 'true' );
							}

							// Hide column
							SHOWCASE.conditionSample( columnUnwrapped );

							// Remove duplicated element
							columnUnwrapped.unwrap();

							// Load input states
							FUI.inputStates( input );

							// Load textarea states
							FUI.textareaStates( textarea );

							// Load select function
							if ( select.length ) {

								select.each( function() {
									FUI.select( this );
								});
							}

							// Load select2 function
							if ( select2.length ) {
								FUI.select2();
							}

							// Load radio and checkbox function
							FUI.radioStates( radio );
							FUI.checkboxStates( checkbox );

							// Form simulation
							if ( submit.length ) {
								FUI.formSimulation( submit );
							}
						});
					}
				});
			});
		}
	});

}( jQuery ) );
