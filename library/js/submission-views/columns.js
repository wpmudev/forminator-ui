( function() {
	'use strict';

	if ( 'object' !== typeof window.FUI ) {
		window.FUI = {};
	}

	FUI._submissionViews = FUI._submissionViews || {};
	FUI._submissionViews.columns = function( context ) {
		function reconnectColumnOptions() {
			const options = context.view.querySelector( '[data-columns]' );
			const button = context.view.querySelector( '[data-columns-toggle]' );
			if ( options !== context.columnOptions || button !== context.columnsButton ) {
				context.setColumnOptionsOpen( false, false );
				if ( context.columnOptions ) {
					delete context.columnOptions.dataset.placement;
					if ( null === context.originalColumnStyle ) {
						context.columnOptions.removeAttribute( 'style' );
					} else {
						context.columnOptions.setAttribute( 'style', context.originalColumnStyle );
					}
				}
				context.columnOptions = options;
				context.columnsButton = button;
				context.originalColumnStyle = options ? options.getAttribute( 'style' ) : null;
				context.setColumnOptionsOpen( false, false );
			}
			context.originalColumnDisabled.forEach( function( disabled, input ) {
				if ( ! options || ! options.contains( input ) ) {
					input.disabled = disabled;
					context.originalColumnDisabled.delete( input );
				}
			});
		}

		function setColumnOptionsOpen( open, restoreFocus ) {
			if ( ! context.columnOptions || ! context.columnsButton ) {
				return;
			}
			context.columnOptions.hidden = ! open;
			context.columnsButton.setAttribute( 'aria-expanded', String( open ) );
			if ( open ) {
				context.positionColumnOptions();
				const checkbox = context.columnOptions.querySelector( 'input:not(:disabled)' );
				if ( checkbox ) {
					checkbox.focus({
						preventScroll: true
					});
				}
			} else if ( restoreFocus ) {
				context.columnsButton.focus();
			}
		}

		function positionColumnOptions() {
			const anchor = context.columnsButton.getBoundingClientRect();
			const gap = Math.max( 0, context.readWidth( 'columns-offset', 8 ) );
			const gutter = Math.max( 0, context.readWidth( 'columns-viewport-gutter', 16 ) );
			const below = window.innerHeight - anchor.bottom - gap - gutter;
			const above = anchor.top - gap - gutter;
			const placeAbove = 200 > below && above > below;
			context.columnOptions.dataset.placement = placeAbove ? 'top' : 'bottom';
			context.columnOptions.style.maxHeight = Math.max( 0, Math.min( context.readWidth( 'columns-max-height', 360 ), placeAbove ? above : below ) ) + 'px';
			context.columnOptions.style.transform = '';
			const bounds = context.columnOptions.getBoundingClientRect();
			const offset = Math.max( gutter - bounds.left, Math.min( 0, document.documentElement.clientWidth - gutter - bounds.right ) );
			context.columnOptions.style.transform = 'translateX(' + offset + 'px)';
		}

		function toggleColumnOptions() {
			if ( context.columnOptions ) {
				context.setColumnOptionsOpen( context.columnOptions.hidden, false );
			}
		}

		function dismissColumnOptions( event ) {
			if ( ! context.columnOptions || ! context.columnsButton || context.columnOptions.hidden ) {
				return;
			}
			if ( ! context.columnOptions.contains( event.target ) && ! context.columnsButton.contains( event.target ) ) {
				context.setColumnOptionsOpen( false, false );
			}
		}

		function handleColumnOptionsKeydown( event ) {
			if ( 'Escape' === event.key && context.columnOptions && ! context.columnOptions.hidden ) {
				event.preventDefault();
				context.setColumnOptionsOpen( false, true );
			}
		}

		function setColumnVisible( index, visible ) {
			Array.from( context.table.rows ).forEach( function( row ) {
				if ( row.cells[index]) {
					row.cells[index].hidden = ! visible;
				}
			});
		}

		function updateColumnOptions() {
			const dataColumns = context.headers.filter( context.isDataColumn );
			let visibleColumns = dataColumns.filter( context.isVisibleColumn );
			if ( ! visibleColumns.length && dataColumns.length ) {
				context.setColumnVisible( context.headers.indexOf( dataColumns[0]), true );
				visibleColumns = [ dataColumns[0] ];
			}
			if ( ! context.columnOptions ) {
				return;
			}
			context.columnOptions.querySelectorAll( '[data-column]' ).forEach( function( input ) {
				const header = context.headers[Number( input.dataset.column )];
				if ( ! header || ! context.isDataColumn( header ) ) {
					return;
				}
				if ( ! context.originalColumnDisabled.has( input ) ) {
					context.originalColumnDisabled.set( input, context.loadingControls.has( input ) ? context.loadingControls.get( input ) : input.disabled );
				}
				input.checked = ! header.hidden;
				context.setControlDisabled( input, context.originalColumnDisabled.get( input ) || input.checked && 1 === visibleColumns.length );
			});
		}

		function changeColumnVisibility( event, input ) {
			const index = Number( input.dataset.column );
			if ( ! Number.isInteger( index ) || ! context.headers[index] || ! context.isDataColumn( context.headers[index]) ) {
				return;
			}
			const visibleColumns = context.headers.filter( context.isDataColumn ).filter( context.isVisibleColumn );
			if ( ! input.checked && ! context.headers[index].hidden && 1 === visibleColumns.length ) {
				context.updateColumnOptions();
				return;
			}
			context.setColumnVisible( index, input.checked );
			context.updateColumnOptions();
			context.applyColumnWidths();
			context.emit( 'columns', {
				index,
				visible: input.checked
			});
		}

		// Export data is explicit and independent of the table's displayed values.

		Object.assign( context, {
			reconnectColumnOptions,
			setColumnOptionsOpen,
			positionColumnOptions,
			toggleColumnOptions,
			dismissColumnOptions,
			handleColumnOptionsKeydown,
			setColumnVisible,
			updateColumnOptions,
			changeColumnVisibility
		});
	};
}() );
