( function( $ ) {

	$( 'body' ).ready( function() {

		// Check if page exists
		if (
			-1 < window.location.href.indexOf( 'form' ) ||
			-1 < window.location.href.indexOf( 'accessibility' )
		) {

			// Load form
			$( '.forminator-custom-form' ).each( function() {

				const formDiv = $( this );
				const formCol = formDiv.find( '.forminator-col' );

				// Form design class
				formDiv.addClass( 'forminator-design--' + formDiv.data( 'design' ) );

				// Load elements to sample form
				formCol.each( function() {

					const colDiv = $( this );
					const colField = colDiv.data( 'field' );

					if ( colDiv.attr( 'data-field' ) && '' !== colDiv.attr( 'data-field' ) ) {

						colDiv.load( 'templates/form-elements/field-' + colField + '.html', function() {

							const column = $( this );
							const select = column.find( '.forminator-select' );
							const select2 = column.find( '.forminator-select2' );

							// Remove duplicated element
							column.find( '> .forminator-col' ).unwrap();

							// Load inputs function
							FUI.inputs();

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
							FUI.fuiOptions();
						});
					}
				});
			});
		}
	});

}( jQuery ) );
