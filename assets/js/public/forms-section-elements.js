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

				// SUI Code Snippet
				SUI.suiCodeSnippet();

				// Initialize highlight js for demo code blocks.
				$( '.demo-code-block .sui-code-snippet' ).each( function( i, block ) {
					hljs.highlightBlock( block );
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

							const input = $( this ).find( '.forminator-input' );
							const radio = $( this ).find( '.forminator-radio' );
							const checkbox = $( this ).find( '.forminator-checkbox' );
							const multiselect = $( this ).find( '.forminator-multiselect' );
							const textarea = $( this ).find( '.forminator-textarea' );
							const select = $( this ).find( '.forminator-select' );
							const select2 = $( this ).find( '.forminator-select2' );

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

						});
					});
				}
			});
		});

	});

}( jQuery ) );
