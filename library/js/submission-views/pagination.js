( function() {
	'use strict';

	if ( 'object' !== typeof window.FUI ) {
		window.FUI = {};
	}

	FUI._submissionViews = FUI._submissionViews || {};
	FUI._submissionViews.pagination = function( context ) {

		/** Update pagination markup after Forminator supplies the current results. */
		function setPagination( options ) {
			if ( context.destroyed || ! options || 'object' !== typeof options ) {
				return false;
			}
			const {
				page,
				pageSize,
				totalPages,
				statusText
			} = options;
			if ( ! Number.isSafeInteger( page ) || ! Number.isSafeInteger( pageSize ) || ! Number.isSafeInteger( totalPages ) || 1 > pageSize || 0 > totalPages || 0 > page || ( 0 === totalPages ? 1 < page : 1 > page || page > totalPages ) || undefined !== statusText && 'string' !== typeof statusText ) {
				return false;
			}

			// Query current controls so replaced pagination markup works too.
			const size = context.view.querySelector( '[data-page-size]' );
			if ( size && ! Array.from( size.options ).some( option => option.value === String( pageSize ) ) ) {
				return false;
			}
			const empty = 0 === totalPages;
			const status = context.view.querySelector( '[data-page-status]' );
			if ( status ) {
				status.textContent = undefined === statusText ? empty ? '0 of 0' : page + ' of ' + totalPages : statusText;
			}
			if ( size ) {
				size.value = String( pageSize );
			}
			const disabled = {
				first: empty || 1 >= page,
				previous: empty || 1 >= page,
				next: empty || page >= totalPages,
				last: empty || page >= totalPages
			};
			context.view.querySelectorAll( '[data-page]' ).forEach( function( button ) {
				if ( Object.prototype.hasOwnProperty.call( disabled, button.dataset.page ) ) {
					context.setControlDisabled( button, disabled[button.dataset.page]);
				}
			});
			return true;
		}

		function requestPageSize( event, input ) {
			context.emit( 'page-size', {
				value: Number( input.value )
			});
		}

		function requestPage( event, button ) {
			if ( ! button.disabled ) {
				context.emit( 'page', {
					action: button.dataset.page
				});
			}
		}

		Object.assign( context, {
			setPagination,
			requestPageSize,
			requestPage
		});
	};
}() );
