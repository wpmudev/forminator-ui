( function() {
	'use strict';

	FUI._submissionViews.tableLifecycle = function( context ) {
		function listenTable( target, type, handler, options ) {
			context.tableListeners.push( context.listen( target, type, handler, options ) );
		}

		function captureTable() {
			context.tableDetached = false;
			context.originalColgroup = context.table.querySelector( 'colgroup' );
			context.colgroup = context.originalColgroup || document.createElement( 'colgroup' );
			context.originalColumns = Array.from( context.colgroup.childNodes );
			context.originalTableStyle = context.table.getAttribute( 'style' );
			context.originalScrollStyle = context.scroll.getAttribute( 'style' );
			if ( ! context.originalColgroup ) {
				context.table.insertBefore( context.colgroup, context.table.tHead );
			}
		}

		function releaseTable() {
			context.tableDetached = true;
			context.stopResizing();
			const removed = new Set( context.tableListeners );
			context.tableListeners.forEach( remove => remove() );
			context.listeners = context.listeners.filter( remove => ! removed.has( remove ) );
			context.tableListeners = [];
			if ( context.observer ) {
				context.observer.disconnect();
				context.observer = null;
			}
			context.handleAttributes.forEach( function( attributes, handle ) {
				attributes.forEach( function([ name, value ]) {
					if ( null === value ) {
						handle.removeAttribute( name );
					} else {
						handle.setAttribute( name, value );
					}
				});
			});
			context.handleAttributes.clear();
			context.boundHandles = new WeakSet();
			if ( context.originalColgroup ) {
				context.colgroup.replaceChildren( ...context.originalColumns );
			} else {
				context.colgroup.remove();
			}
			if ( null === context.originalTableStyle ) {
				context.table.removeAttribute( 'style' );
			} else {
				context.table.setAttribute( 'style', context.originalTableStyle );
			}
			context.scroll.removeAttribute( 'data-scrollable' );
			context.scroll.removeAttribute( 'data-content-behind' );
			if ( null === context.originalScrollStyle ) {
				context.scroll.removeAttribute( 'style' );
			} else {
				context.scroll.setAttribute( 'style', context.originalScrollStyle );
			}
		}

		function observeTable() {
			context.listenTable( context.scroll, 'scroll', context.updateScrollState, { passive: true });
			if ( 'function' === typeof window.ResizeObserver ) {
				context.observer = new window.ResizeObserver( context.updateLayout );
				context.observer.observe( context.scroll );
			} else {
				context.listenTable( window, 'resize', context.updateLayout );
			}
		}

		function reconnectTable() {
			const table = context.view.querySelector( 'table' );
			const scroll = context.view.querySelector( context.selector + 'scroll' );
			if ( ! table || ! table.tHead || ! table.tHead.rows.length || ! scroll || ! scroll.contains( table ) ) {
				if ( ! context.tableDetached && ! context.view.contains( context.table ) ) {
					context.releaseTable();
				}
				return false;
			}
			if ( table === context.table && scroll === context.scroll && ! context.tableDetached ) {
				return true;
			}

			// Only stable, unique field IDs can carry preferences across a new schema.
			const preferences = new Map();
			const duplicates = new Set();
			context.headers.filter( context.isDataColumn ).forEach( function( header ) {
				const id = header.dataset.fieldId;
				if ( id ) {
					if ( preferences.has( id ) ) {
						duplicates.add( id );
					}
					preferences.set( id, { hidden: header.hidden, width: context.widths.get( header ) });
				}
			});
			context.releaseTable();
			context.table = table;
			context.scroll = scroll;
			context.widths.clear();
			context.captureTable();
			const headers = Array.from( table.tHead.rows[0].cells );
			headers.filter( context.isDataColumn ).forEach( function( header ) {
				const id = header.dataset.fieldId;
				const matches = headers.filter( item => context.isDataColumn( item ) && item.dataset.fieldId === id );
				if ( id && preferences.has( id ) && ! duplicates.has( id ) && 1 === matches.length ) {
					const preference = preferences.get( id );
					header.hidden = preference.hidden;
					if ( undefined !== preference.width ) {
						context.widths.set( header, preference.width );
					}
				}
			});
			context.observeTable();
			return true;
		}

		Object.assign( context, { listenTable, captureTable, releaseTable, observeTable, reconnectTable });
	};
}() );
