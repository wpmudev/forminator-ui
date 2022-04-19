( function( $ ) {

	$( 'body' ).ready( function() {

		const pages = [ 'forms', 'polls', 'quizzes' ];

		$.each( pages, function( index, page ) {

			// Load section: "Samples"
			$( '#page-' + page + '-section--samples' ).load( 'templates/page-' + page + '/section-samples.html', function() {

				const section = $( this );
				const accordion = section.find( '.sui-accordion' );
				const form = accordion.find( '.forminator-custom-form' );

				// SUI Accordion
				accordion.each( function() {
					SUI.suiAccordion( this );
				});

				// Load Form Elements
				if ( 0 !== form.length ) {

					form.each( function() {

						const formDiv = $( this );
						const formDesign = formDiv.data( 'design' );
						const formCol = formDiv.find( '.forminator-col' );

						// Assign theme/design to form
						formDiv.addClass( 'forminator-design--' + formDesign );

						// Load element
						formCol.each( function() {

							const column = $( this );
							const field = column.data( 'field' );

							if ( column.data( 'field' ) && '' !== column.data( 'field' ) ) {

								column.load( 'templates/form-elements/field-' + field + '.html', function() {

									const parent = $( this ).closest( '.forminator-custom-form' );
									const field = $( this ).find( '> .forminator-field' );
									const input = $( this ).find( '.forminator-input' );
									const radio = $( this ).find( '.forminator-radio' );
									const checkbox = $( this ).find( '.forminator-checkbox' );
									const multiselect = $( this ).find( '.forminator-multiselect' );
									const textarea = $( this ).find( '.forminator-textarea' );
									const select = $( this ).find( '.forminator-select' );
									const select2 = $( this ).find( '.forminator-select2' );

									// Remove duplicated element
									field.unwrap();

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
									FUI.multiSelectStates( multiselect );

									// Assign unique ID to checkbox
									if ( 'checkbox' === $( this ).data( 'field' ) ) {

										checkbox.each( function( index ) {
											const getFormId = parent.prop( 'id' );
											const elementId = index + 1;
											const uniqueId = getFormId + '-' + elementId;
											$( this ).prop( 'for', uniqueId );
											$( this ).find( 'input' ).prop( 'id', uniqueId );
										});
									}

									// Assign unique ID to radio
									if ( 'radio' === $( this ).data( 'field' ) ) {

										radio.each( function( index ) {
											const getFormId = parent.prop( 'id' );
											const elementId = index + 1;
											const uniqueId = getFormId + '-' + elementId;
											$( this ).prop( 'for', uniqueId );
											$( this ).find( 'input' ).prop( 'id', uniqueId );
										});
									}
								});
							}
						});
					});
				}
			});
		});

	});

}( jQuery ) );
