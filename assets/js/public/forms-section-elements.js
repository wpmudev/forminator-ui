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
				SUI.suiAccordion( this );

				// Initialize highlight js for demo code blocks.
				$( '.demo-code-block .sui-code-snippet' ).each( function( i, block ) {
					hljs.highlightBlock( block );
				});

				// Load Form Elements
				if ( 0 !== form.length ) {

					form.each( function() {

						const column = $( this ).find( '.forminator-col' );

						// Assign unique id
						$( this ).addClass( 'forminator-custom-form-' + $( this ).data( 'id' ) );

						// Assign theme/design to form
						$( this ).addClass( 'forminator-design--' + $( this ).data( 'design' ) );

						// Load element
						column.load( 'templates/form-elements/field-' + column.data( 'field' ) + '.html', function() {

							const input = $( this ).find( '.forminator-input' );
							const radio = $( this ).find( '.forminator-radio' );
							const checkbox = $( this ).find( '.forminator-checkbox' );
							const multiselect = $( this ).find( '.forminator-multiselect' );
							const textarea = $( this ).find( '.forminator-textarea' );
							const select = $( this ).find( '.forminator-select' );
							const select2 = $( this ).find( '.forminator-select2' );
							const slider = $( this ).find( '.forminator-slider' );
							const rating = $( this ).find( '.forminator-rating' );

							// Unique id
							SHOWCASE.uniqueFormField( this );

							// Required settings
							SHOWCASE.requiredFormField( this );

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

							// Load select function
							if ( slider.length ) {
								FUI.slider();
							}

							// Load select2 function
							if ( select2.length ) {
								FUI.select2();
							}

							// Load rating field.
							if ( rating.length ) {
								FUI.rating();
							}

							// Load radio and checkbox function
							FUI.radioStates( radio );
							FUI.checkboxStates( checkbox );
							FUI.multiSelectStates( multiselect );
						});
					});
				}
			});
		});

	});

}( jQuery ) );
