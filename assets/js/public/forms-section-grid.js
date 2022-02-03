( function( $ ) {

	$( 'body' ).ready( function() {

		const pages = [
			'forms',
			'quizzes'
		];

		const gridPrefix = '.forminator-custom-form.forminator-custom';
		const gridPrefixLg = gridPrefix + ':not(.forminator-size--small)';
		const gridBreakpoint = '@media (min-width: 961px)';

		function gridCss( full, half ) {

			const gridCss = '<style id="showcase-custom-grid-css" type="text/css">' +
				gridPrefix + ' .forminator-row:not(:last-child) {' +
					'margin-bottom: ' + half + 'px;' +
				'}' +
				gridPrefix + ' .forminator-col:not(:last-child) {' +
					'margin-bottom: ' + half + 'px;' +
				'}' +
				gridBreakpoint + ' {' +
					gridPrefixLg + ' .forminator-row {' +
						'margin-right: -' + full + 'px;' +
						'margin-left: -' + full + 'px;' +
					'}' +
					gridPrefixLg + ' .forminator-col {' +
						'padding: 0 ' + full + 'px;' +
					'}' +
					gridPrefixLg + ' .forminator-col:not(:last-child) {' +
						'margin-bottom: 0;' +
					'}' +
				'}' +
			'</style>';

			return gridCss;
		}

		$.each( pages, function( index, page ) {

			// Load section: "Grid"
			$( '#page-' + page + '-section--grid' ).load( 'templates/page-' + page + '/section-grid.html', function() {

				const section = $( this );
				const option = section.find( '.sui-tabs-menu .sui-tab-item' );

				// Get correct grid variation
				option.on( 'click', function( e ) {

					const label = $( this );
					const input = label.find( 'input' );
					const value = input.val();
					const options = label.parent().find( '.sui-tab-item' );
					const content = label.closest( '.sui-side-tabs' ).find( '.sui-tabs-content' );
					const grid = content.find( '#showcase-custom-grid' );
					const form = content.find( '.forminator-custom-form' );
					const stylesheet = content.find( '#showcase-custom-grid-css' );

					// Reset menu
					options.removeClass( 'active' );
					options.find( 'input' ).prop( 'checked', false );

					// Apply active class to menu item
					label.addClass( 'active' );
					input.prop( 'checked', 'checked' );

					// Reset form
					form.removeClass( 'forminator-custom' );
					form.removeClass( 'forminator-enclosed' );

					// Apply correct grid class to form
					if ( 'open' !== value ) {
						form.addClass( 'forminator-' + value );
					}

					// Reset custom grid
					grid.hide();
					grid.find( 'input' ).val( '20' );
					grid.find( 'input' ).prop( 'disabled', true );
					stylesheet.remove();

					// Apply custom grid styles
					if ( 'custom' === value ) {

						const gridInput = $( '#showcase-custom-grid-value' );

						// Show input to modify custom grid value
						grid.show();
						grid.find( 'input' ).prop( 'disabled', false );

						// Load custom grid styles
						$( gridCss( 20, 10 ) ).insertAfter( form );

						// Get custom grid new styles
						gridInput.on( 'change', function() {

							const gutterFull = $( this ).val();
							const gutterHalf = parseInt( gutterFull ) / 2;

							console.log( gutterFull );

							content.find( '#showcase-custom-grid-css' ).replaceWith( gridCss( gutterFull, gutterHalf ) );

						});
					}

					e.preventDefault();
					e.stopPropagation();

				});
			});
		});

	});

}( jQuery ) );
