( function( $ ) {
	'use strict';

	if ( 'object' !== typeof window.FUI ) {
		window.FUI = {};
	}

	const instances = new WeakMap();

	/**
	 * Initialize one view. Repeated calls return its existing controller.
	 * Forminator supplies data through the events emitted by this module.
	 */
	FUI.submissionViews = function( element ) {
		const context = {};

		context.view = $( element )[0];
		if ( ! context.view || ! context.view.matches( '.forminator-ui.forminator-submission-views' ) ) {
			return;
		}
		if ( instances.has( context.view ) ) {
			return instances.get( context.view );
		}

		// Cache this instance's elements before binding any behavior.
		context.selector = '.forminator-submission-views__';
		context.table = context.view.querySelector( 'table' );
		context.scroll = context.view.querySelector( context.selector + 'scroll' );
		context.panel = context.view.querySelector( context.selector + 'panel' );
		context.deleteDialog = context.view.querySelector( '[data-delete-dialog]' );
		context.sidebarDelete = context.panel ? context.panel.querySelector( '[data-delete]' ) : null;
		context.panelBody = context.view.querySelector( context.selector + 'panel-body' );
		context.columnOptions = context.view.querySelector( '[data-columns]' );
		context.columnsButton = context.view.querySelector( '[data-columns-toggle]' );
		context.originalColumnStyle = context.columnOptions ? context.columnOptions.getAttribute( 'style' ) : null;
		if ( ! context.table || ! context.table.tHead || ! context.table.tHead.rows.length || ! context.scroll ) {
			return;
		}

		// Per-instance state and original markup needed by destroy().
		context.listeners = [];
		context.boundHandles = new WeakSet();
		context.handleAttributes = new Map();
		context.originalColumnDisabled = new Map();
		context.widths = new Map();
		context.originalColgroup = context.table.querySelector( 'colgroup' );
		context.colgroup = context.originalColgroup || document.createElement( 'colgroup' );
		context.originalColumns = Array.from( context.colgroup.childNodes );
		context.originalTableStyle = context.table.getAttribute( 'style' );
		context.originalScrollStyle = context.scroll.getAttribute( 'style' );
		context.reducedMotion = window.matchMedia( '(prefers-reduced-motion: reduce)' );
		context.headers = [];
		context.minColumnWidth = 200;
		context.maxColumnWidth = 1200;
		context.deleteConfirmed = false;
		context.pointerStartedOutside = false;
		context.destroyed = false;
		context.loading = false;
		context.loadingClass = 'forminator-submission-views--loading';
		context.initiallyLoading = context.view.classList.contains( context.loadingClass );
		context.originalBusy = context.view.getAttribute( 'aria-busy' );
		context.loadingRegions = new Map();
		context.loadingControls = new Map();
		context.loader = context.view.querySelector( context.selector + 'loader' );
		context.originalLoaderHidden = context.loader ? context.loader.hidden : true;

		// Each feature attaches its methods to this instance’s shared context.
		Object.values( FUI._submissionViews ).forEach( function( register ) {
			register( context );
		});
		Object.assign( context, {
			refresh,
			destroy,
			updateLayout,
			refreshDirection,
			observeLayout,
			init
		});

		// Instance lifecycle.
		function refresh() {
			if ( context.destroyed || ! context.table.tHead || ! context.table.tHead.rows.length ) {
				return;
			}
			if ( context.loading ) {
				context.syncLoadingRegions();
			}
			context.minColumnWidth = context.readWidth( 'column-min-width', 200 );
			context.maxColumnWidth = Math.max( 1200, context.minColumnWidth );
			context.headers = Array.from( context.table.tHead.rows[0].cells );
			context.headers.forEach( function( header ) {
				const savedWidth = context.widths.get( header ) || context.minColumnWidth;
				context.widths.set( header, Math.max( context.minColumnWidth, savedWidth ) );
			});
			context.updateColumnOptions();

			// New AJAX rows inherit visibility from the current data headers.
			context.headers.forEach( function( header, index ) {
				if ( context.isDataColumn( header ) ) {
					context.setColumnVisible( index, context.isVisibleColumn( header ) );
				}
			});
			context.bindResizeHandles();
			context.applyColumnWidths();
		}

		function destroy() {
			if ( context.destroyed ) {
				return;
			}
			context.setLoading( false );
			if ( context.loader ) {
				context.loader.hidden = context.originalLoaderHidden;
			}
			context.view.classList.toggle( context.loadingClass, context.initiallyLoading );
			context.destroyed = true;
			clearTimeout( context.deleteCloseTimer );
			context.pendingDelete = null;
			if ( context.deleteDialog && context.deleteDialog.open ) {
				context.deleteDialog.close();
			}
			context.setColumnOptionsOpen( false, false );
			if ( context.columnOptions ) {
				delete context.columnOptions.dataset.placement;
				if ( null === context.originalColumnStyle ) {
					context.columnOptions.removeAttribute( 'style' );
				} else {
					context.columnOptions.setAttribute( 'style', context.originalColumnStyle );
				}
			}
			clearTimeout( context.closeTimer );
			if ( context.observer ) {
				context.observer.disconnect();
			}
			context.directionObserver.disconnect();
			context.listeners.forEach( remove => remove() );
			context.originalColumnDisabled.forEach( function( disabled, input ) {
				input.disabled = disabled;
			});
			context.handleAttributes.forEach( ( attributes, handle ) => {
				attributes.forEach( ([ name, value ]) => {
					if ( null === value ) {
						handle.removeAttribute( name );
					} else {
						handle.setAttribute( name, value );
					}
				});
			});
			if ( context.panel && context.panel.open ) {
				context.panel.close();
				if ( context.opener && context.opener.isConnected ) {
					context.opener.focus();
				}
			}
			if ( context.panel ) {
				delete context.panel.dataset.state;
			}
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
			context.view.removeAttribute( 'data-column-resizing' );
			instances.delete( context.view );
		}

		function updateLayout() {
			if ( ! context.destroyed ) {
				context.applyColumnWidths();
			}
		}

		function refreshDirection() {
			if ( ! context.destroyed ) {
				context.refresh();
			}
		}

		function observeLayout() {
			context.listen( context.scroll, 'scroll', context.updateScrollState, {
				passive: true
			});
			if ( 'function' === typeof window.ResizeObserver ) {
				context.observer = new window.ResizeObserver( context.updateLayout );
				context.observer.observe( context.scroll );
			} else {
				context.listen( window, 'resize', context.updateLayout );
			}
			context.directionObserver = new window.MutationObserver( context.refreshDirection );

			// Direction can come from this root, a wrapper or the page itself.
			for ( let ancestor = context.view; ancestor; ancestor = ancestor.parentElement ) {
				context.directionObserver.observe( ancestor, {
					attributes: true,
					attributeFilter: [ 'dir' ]
				});
			}
		}

		function init() {
			[ 'click', 'input', 'change', 'keydown', 'pointerdown' ].forEach( function( type ) {
				context.listen( context.view, type, function( event ) {
					if ( context.loading && event.target.closest( context.selector + 'toolbar, ' + context.selector + 'frame, ' + context.selector + 'footer' ) ) {
						event.preventDefault();
						event.stopImmediatePropagation();
					}
				}, true );
			});
			if ( ! context.originalColgroup ) {
				context.table.insertBefore( context.colgroup, context.table.tHead );
			}
			context.bindPanelEvents();
			context.bindDeleteDialogEvents();
			context.bindControlEvents();
			context.refresh();
			context.observeLayout();
			if ( context.initiallyLoading ) {
				context.setLoading( true );
			}
		}

		// Preserve the public controller API; feature modules are internal.
		context.api = {
			refresh: context.refresh,
			destroy: context.destroy,
			setLoading: context.setLoading,
			setPagination: context.setPagination,
			setError: context.setError,
			open: context.openPanel,
			close: context.closePanel,
			setSubmission: context.setSubmission,
			getCsv: context.getCsv,
			downloadCsv: context.downloadCsv
		};
		instances.set( context.view, context.api );
		context.init();
		return context.api;
	};
}( jQuery ) );
