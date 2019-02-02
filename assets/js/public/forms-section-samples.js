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

							if ( column.attr( 'data-field' ) && '' !== column.attr( 'data-field' ) ) {

								column.load( 'templates/form-elements/field-' + field + '.html', function() {

									const parent = $( this ).closest( '.forminator-custom-form' );
									const field = $( this ).find( '> .forminator-field' );
									const select = $( this ).find( '.forminator-select' );
									const select2 = $( this ).find( '.forminator-select2' );
									const radio = $( this ).find( '.forminator-radio' );
									const checkbox = $( this ).find( '.forminator-checkbox' );

									// Remove duplicated element
									field.unwrap();

									// Inputs
									FUI.inputs();

									// Select
									if ( select.length ) {

										select.each( function() {
											FUI.select( this );
										});
									}

									// Select2
									if ( select2.length ) {
										FUI.select2();
									}

									// Options
									FUI.fuiOptions();

									// Assign unique ID to checkbox
									if ( 'checkbox' === $( this ).data( 'field' ) ) {

										checkbox.each( function( index ) {
											const getFormId = parent.attr( 'id' );
											const elementId = index + 1;
											const uniqueId = getFormId + '-' + elementId;
											$( this ).attr( 'for', uniqueId );
											$( this ).find( 'input' ).attr( 'id', uniqueId );
										});
									}

									// Assign unique ID to radio
									if ( 'radio' === $( this ).data( 'field' ) ) {

										radio.each( function( index ) {
											const getFormId = parent.attr( 'id' );
											const elementId = index + 1;
											const uniqueId = getFormId + '-' + elementId;
											$( this ).attr( 'for', uniqueId );
											$( this ).find( 'input' ).attr( 'id', uniqueId );
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
