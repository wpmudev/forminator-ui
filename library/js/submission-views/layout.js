( function() {
	'use strict';

	if ( 'object' !== typeof window.FUI ) {
		window.FUI = {};
	}

	FUI._submissionViews = FUI._submissionViews || {};
	FUI._submissionViews.layout = function( context ) {

		// Table layout and overflow.
		function readWidth( name, fallback ) {
			const value = getComputedStyle( context.view ).getPropertyValue( '--forminator-submission-views-' + name );
			const number = parseFloat( value );
			return Number.isFinite( number ) ? number : fallback;
		}

		function isVisibleColumn( header ) {
			return ! header.hidden;
		}

		function isDataColumn( header ) {
			return header.hasAttribute( 'data-resizable' );
		}

		function detailWidth() {
			return context.readWidth( 'detail-column-width', 180 );
		}

		function updateScrollState() {
			const remaining = context.scroll.scrollWidth - context.scroll.clientWidth;
			context.scroll.toggleAttribute( 'data-scrollable', 1 < remaining );

			// RTL scrollLeft is negative; the distance from the inline start is absolute.
			const contentBehind = Math.max( 0, remaining - Math.abs( context.scroll.scrollLeft ) );
			context.scroll.toggleAttribute( 'data-content-behind', 1 < contentBehind );
			context.updateStickyActionWidth( contentBehind );
		}

		function updateStickyActionWidth( contentBehind ) {
			const button = context.table.querySelector( 'tbody tr:not([hidden]) td:not([hidden]) [data-detail]' );
			let offset = 0;
			if ( button && 1 < contentBehind ) {
				const cell = button.closest( 'td' );
				const styles = getComputedStyle( cell );
				const cellBounds = cell.getBoundingClientRect();
				const buttonBounds = button.getBoundingClientRect();
				const rtl = 'rtl' === styles.direction;
				const startSpace = rtl ? cellBounds.right - buttonBounds.right : buttonBounds.left - cellBounds.left;
				const endSpace = parseFloat( styles.paddingInlineEnd ) || 0;
				const stickyWidth = startSpace + buttonBounds.width + endSpace;

				// Let the rest of the action column enter naturally over the final scroll pixels.
				offset = Math.min( contentBehind, Math.max( 0, cellBounds.width - stickyWidth ) );
			}
			context.scroll.style.setProperty( '--forminator-submission-views-sticky-action-offset', offset + 'px' );
		}

		function applyColumnWidths() {
			const visibleHeaders = context.headers.filter( context.isVisibleColumn );
			const dataColumns = visibleHeaders.filter( context.isDataColumn );
			const actionWidth = context.detailWidth();
			let totalWidth = 0;
			visibleHeaders.forEach( function( header ) {
				totalWidth += context.isDataColumn( header ) ? context.widths.get( header ) : actionWidth;
			});

			// Distribute spare space among data columns, keeping the action column fixed.
			const spareWidth = Math.max( 0, context.scroll.clientWidth - totalWidth );
			const extraPerColumn = spareWidth / ( dataColumns.length || 1 );
			const columns = visibleHeaders.map( function( header ) {
				const column = document.createElement( 'col' );
				let width = actionWidth;
				if ( context.isDataColumn( header ) ) {
					width = context.widths.get( header ) + extraPerColumn;
				}
				column.style.width = width + 'px';
				const handle = header.querySelector( context.selector + 'resize-handle' );
				if ( handle ) {
					handle.setAttribute( 'aria-valuenow', String( Math.round( width ) ) );
				}
				return column;
			});
			context.colgroup.replaceChildren( ...columns );
			context.table.style.setProperty( '--forminator-submission-views-data-column-count', dataColumns.length );
			context.table.style.setProperty( '--forminator-submission-views-action-column-width', visibleHeaders.some( header => ! context.isDataColumn( header ) ) ? actionWidth + 'px' : '0px' );
			context.table.style.tableLayout = 'fixed';
			context.table.style.width = Math.max( context.scroll.clientWidth, totalWidth ) + 'px';
			context.updateScrollState();
		}

		function captureColumnWidths() {
			context.headers.filter( header => ! header.hidden ).forEach( header => context.widths.set( header, header.getBoundingClientRect().width ) );
		}

		function resizeColumn( header, width ) {
			context.widths.set( header, Math.max( context.minColumnWidth, Math.min( context.maxColumnWidth, width ) ) );
			context.applyColumnWidths();
		}

		// Pointer and keyboard column resizing.

		Object.assign( context, {
			readWidth,
			isVisibleColumn,
			isDataColumn,
			detailWidth,
			updateScrollState,
			updateStickyActionWidth,
			applyColumnWidths,
			captureColumnWidths,
			resizeColumn
		});
	};
}() );
