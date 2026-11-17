( function() {
	'use strict';

	if ( 'object' !== typeof window.FUI ) {
		window.FUI = {};
	}

	FUI._submissionViews = FUI._submissionViews || {};
	FUI._submissionViews.controls = function( context ) {

		// Controls request data actions; Forminator owns result rendering and exports.
		function requestDetail( event, trigger ) {
			if ( context.panel && context.panel.open ) {
				return;
			}
			const row = trigger.closest( 'tr' );
			const id = row ? row.dataset.id : trigger.dataset.detail;

			// A consumer can prevent opening while it loads the selected record.
			if ( context.emit( 'detail', {
				trigger,
				id
			}) ) {
				context.openPanel( trigger );
			}
		}

		function requestSearch( event, input ) {
			context.emit( 'search', {
				value: input.value
			});
		}

		/** Update pagination markup after Forminator supplies the current results. */

		function bindControlEvents() {
			context.delegate( 'click', '[data-detail]', context.requestDetail );
			context.delegate( 'click', '[data-delete]', context.requestDelete );
			context.listen( document, 'pointerdown', context.dismissColumnOptions );
			context.listen( document, 'focusin', context.dismissColumnOptions );
			context.listen( context.view, 'keydown', context.handleColumnOptionsKeydown );
			context.delegate( 'input', '[type="search"]', context.requestSearch );
			context.delegate( 'change', '[data-page-size]', context.requestPageSize );
			context.delegate( 'click', '[data-page]', context.requestPage );
			context.delegate( 'click', '[data-columns-toggle]', context.toggleColumnOptions );
			context.delegate( 'change', '[data-column]', context.changeColumnVisibility );
			context.delegate( 'click', '[data-download]', context.requestExport );
		}

		// Instance lifecycle.

		Object.assign( context, {
			requestDetail,
			requestSearch,
			bindControlEvents
		});
	};
}() );
