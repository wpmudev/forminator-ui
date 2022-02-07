( function( $ ) {

	'use strict';

	// Define global SHOWCASE object if it doesn't exist.
	if ( 'object' !== typeof window.SHOWCASE ) {
		window.SHOWCASE = {};
	}

	SHOWCASE.conditionSample = function( el ) {

		const column = $( el );
		const row = column.closest( '.forminator-row' );
		const form = column.closest( 'form' );
		const checkbox = form.find( '.forminator-checkbox input[value="one"]' );

		if ( true === column.data( 'conditional' ) ) {

			row.hide();
			row.prop( 'aria-hidden', 'true' );

			checkbox.on( 'click', function() {

				if ( $( this ).is( ':checked' ) ) {
					row.show();
					row.removeAttr( 'aria-hidden' );
				} else {
					row.hide();
					row.prop( 'aria-hidden' );
				}
			});
		}
	};

	SHOWCASE.paginationFooter = function( el ) {

		const form = $( el ).closest( 'form' );
		const footer = $( el );
		const content = form.find( '.forminator-pagination-content' );
		const btnBack = footer.find( '.forminator-button-back' );
		const btnNext = footer.find( '.forminator-button-next' );

		if ( ! footer.is( '.forminator-pagination-footer' ) || ! form.is( '.forminator-custom-form' ) ) {
			return;
		}

		function nextPage( element ) {

			const button = $( element );

			button.on( 'click', function( e ) {

				const currPage = content.find( '> li.forminator-current' );
				const nextPage = currPage.next();

				nextPage.addClass( 'forminator-current' );
				currPage.removeClass( 'forminator-current' );

				btnBack.removeAttr( 'disabled' );
				btnBack.removeAttr( 'aria-hidden' );

				if ( content.find( '> li' ).length === nextPage.data( 'step' ) ) {
					$( this ).prop( 'disabled', true );
					$( this ).prop( 'aria-hidden', true );
				}

				e.preventDefault();
				e.stopPropagation();

			});
		}

		function backPage( element ) {

			const button = $( element );

			button.on( 'click', function( e ) {

				const currPage = content.find( '> li.forminator-current' );
				const prevPage = currPage.prev();

				prevPage.addClass( 'forminator-current' );
				currPage.removeClass( 'forminator-current' );

				btnNext.removeAttr( 'disabled' );
				btnNext.removeAttr( 'aria-hidden' );

				if ( 1 === prevPage.data( 'step' ) ) {
					$( this ).prop( 'disabled', true );
					$( this ).prop( 'aria-hidden', true );
				}

				e.preventDefault();
				e.stopPropagation();

			});
		}

		function init() {
			nextPage( btnNext );
			backPage( btnBack );
		}

		init();

		return this;
	};

	$( 'body' ).ready( function() {

		// Check if page exists
		if ( -1 < window.location.href.indexOf( 'accessibility' ) ) {

			// Load form
			$( '.forminator-custom-form' ).each( function() {

				const formDiv = $( this );
				const formCol = formDiv.find( '.forminator-col' );
				const pagFooter = formDiv.find( '.forminator-pagination-footer' );

				FUI.formLoad( formDiv );

				// Load elements to sample form
				formCol.each( function() {

					const colDiv = $( this );
					const colField = colDiv.data( 'field' );

					if ( colDiv.prop( 'data-field' ) && '' !== colDiv.prop( 'data-field' ) ) {

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
							SHOWCASE.requiredFormField( column );

							// Hidden field
							if ( true === column.data( 'conditional' ) ) {
								columnUnwrapped.prop( 'data-conditional', 'true' );
							}

							// Hide column
							SHOWCASE.conditionSample( columnUnwrapped );

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

							// Load "Material" design wrappers
							if ( 'material' === column.closest( '.forminator-custom-form' ).prop( 'data-design' ) ) {

								if ( input.length ) {

									input.each( function() {
										FUI.inputMaterial( this );
									});
								}

								if ( textarea.length ) {

									textarea.each( function() {
										FUI.textareaMaterial( this );
									});
								}
							}

							// Form simulation
							if ( submit.length ) {
								FUI.formSimulation( submit );
							}
						});
					}
				});

				if ( pagFooter.length ) {
					SHOWCASE.paginationFooter( pagFooter );
				}
			});
		}
	});

}( jQuery ) );
