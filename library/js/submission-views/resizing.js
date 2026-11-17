( function() {
	'use strict';

	if ( 'object' !== typeof window.FUI ) {
		window.FUI = {};
	}

	FUI._submissionViews = FUI._submissionViews || {};
	FUI._submissionViews.resizing = function( context ) {

		// Pointer and keyboard column resizing.
		function bindResizeHandles() {
			context.headers.forEach( function( header ) {
				const handle = header.querySelector( context.selector + 'resize-handle' );
				if ( ! handle ) {
					return;
				}
				if ( ! context.boundHandles.has( handle ) ) {
					context.rememberHandleAttributes( handle );
					context.boundHandles.add( handle );
					context.listenTable( handle, 'pointerdown', context.startResizing );
					context.listenTable( handle, 'pointermove', context.moveResizeHandle );
					context.listenTable( handle, 'pointerup', context.stopResizing );
					context.listenTable( handle, 'pointercancel', context.stopResizing );
					context.listenTable( handle, 'lostpointercapture', context.stopResizing );
					context.listenTable( handle, 'keydown', context.resizeWithKeyboard );
				}
				handle.setAttribute( 'aria-valuemin', String( context.minColumnWidth ) );
				handle.setAttribute( 'aria-valuemax', String( context.maxColumnWidth ) );
			});
		}

		function rememberHandleAttributes( handle ) {
			const names = [ 'style', 'aria-valuemin', 'aria-valuemax', 'aria-valuenow' ];
			const attributes = names.map( function( name ) {
				return [ name, handle.getAttribute( name ) ];
			});
			context.handleAttributes.set( handle, attributes );
		}

		function getResizeDirection() {
			return 'rtl' === getComputedStyle( context.table ).direction ? -1 : 1;
		}

		function startResizing( event ) {
			if ( 0 !== event.button || context.resizing ) {
				return;
			}
			event.preventDefault();
			context.captureColumnWidths();
			const header = event.currentTarget.closest( 'th' );
			context.resizing = {
				header,
				x: event.clientX,
				width: context.widths.get( header ),
				direction: context.getResizeDirection()
			};
			context.view.setAttribute( 'data-column-resizing', '' );
			event.currentTarget.setPointerCapture( event.pointerId );
		}

		function moveResizeHandle( event ) {
			if ( ! context.resizing || context.resizing.header !== event.currentTarget.closest( 'th' ) ) {
				return;
			}
			const distance = ( event.clientX - context.resizing.x ) * context.resizing.direction;
			context.resizeColumn( context.resizing.header, context.resizing.width + distance );
		}

		function stopResizing() {
			context.resizing = null;
			context.view.removeAttribute( 'data-column-resizing' );
		}

		function resizeWithKeyboard( event ) {
			if ( ! [ 'ArrowLeft', 'ArrowRight', 'Home', 'End' ].includes( event.key ) ) {
				return;
			}
			event.preventDefault();
			context.captureColumnWidths();
			const header = event.currentTarget.closest( 'th' );
			const step = event.shiftKey ? 50 : 10;
			let width = context.widths.get( header );
			if ( 'Home' === event.key ) {
				width = context.minColumnWidth;
			} else if ( 'End' === event.key ) {
				width = context.maxColumnWidth;
			} else {
				const direction = 'ArrowRight' === event.key ? 1 : -1;
				width += direction * context.getResizeDirection() * step;
			}
			context.resizeColumn( header, width );
		}

		// Submission content is supplied by Forminator, independently of table columns.

		Object.assign( context, {
			bindResizeHandles,
			rememberHandleAttributes,
			getResizeDirection,
			startResizing,
			moveResizeHandle,
			stopResizing,
			resizeWithKeyboard
		});
	};
}() );
