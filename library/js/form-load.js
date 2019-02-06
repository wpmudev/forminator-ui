( function( $ ) {

	'use strict';

	// Define global FUI object if it doesn't exist.
	if ( 'object' !== typeof window.FUI ) {
		window.FUI = {};
	}

	FUI.formLoad = function( el ) {

		const form = $( el );
		const message = form.find( '.forminator-response-message' );

		if ( ! form.is( '.forminator-custom-form' ) ) {
			return;
		}

		function reset() {

			// Hide response message
			message.removeClass( 'forminator-show' );
			message.removeClass( 'forminator-accessible' );

			// Make sure response message
			// is not accessible by screen readers
			message.attr( 'aria-hidden', 'true' );

		}

		function formId() {

			const attrId = form.attr( 'data-id' );
			const dataId = form.data( 'id' );

			if ( attrId.length && '' !== attrId ) {
				form.addClass( 'forminator-form-' + dataId );
			}
		}

		function formDesign() {

			const attrDesign = form.attr( 'data-design' );
			const dataDesign = form.data( 'design' );

			if ( attrDesign && '' !== attrDesign ) {
				form.addClass( 'forminator-design--' + dataDesign );
			} else {
				form.addClass( 'forminator-design--none' );
			}
		}

		function formGrid() {

			const attrGrid = form.attr( 'data-grid' );
			const dataGrid = form.data( 'grid' );

			// Reset
			form.removeClass( 'forminator-custom' );
			form.removeClass( 'forminator-enclosed' );

			// Assign class
			if ( attrGrid && '' !== attrGrid ) {

				if ( 'open' !== attrGrid ) {
					form.addClass( 'forminator-' + dataGrid );
				}
			}
		}

		function init() {

			// Reset
			reset();

			// Form unique id
			formId();

			// Form design class
			formDesign();

			// Form grid class
			formGrid();
		}

		init();

		return this;
	};

}( jQuery ) );
