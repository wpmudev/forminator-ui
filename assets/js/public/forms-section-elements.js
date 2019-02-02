( function( $ ) {

	$( 'body' ).ready( function() {

		const pages = [
			'forms',
			'polls',
			'quizzes'
		];

		$.each( pages, function( index, page ) {

			// Load section: "Elements"
			$( '#page-' + page + '-section--elements' ).load( 'templates/page-' + page + '/section-elements.html', function() {

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
						const formField = formDiv.data( 'field' );

						// Assign theme/design to form
						formDiv.addClass( 'forminator-design--' + formDesign );

						// Load element
						formDiv.find( '.forminator-row' ).load( 'templates/form-elements/field-' + formField + '.html', function() {

							select = $( this ).find( '.forminator-select' );

							// Inputs
							FUI.inputs();

							// Select
							if ( select.length ) {

								select.each( function() {
									FUI.select( this );
								});
							}

							// Select2
							FUI.select2();

							// Options
							FUI.fuiOptions();

						});
					});
				}
			});
		});

	});

}( jQuery ) );