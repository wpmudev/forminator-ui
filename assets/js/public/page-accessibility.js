( function( $ ) {

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
							const input = column.find( '.forminator-input' );
							const radio = column.find( '.forminator-radio' );
							const checkbox = column.find( '.forminator-checkbox' );
							const textarea = column.find( '.forminator-textarea' );
							const select = column.find( '.forminator-select' );
							const select2 = column.find( '.forminator-select2' );
							const submit = column.find( '.forminator-button-submit' );

							// Remove duplicated element
							column.find( '> .forminator-col' ).unwrap();

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
