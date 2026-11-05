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
		const view = $( element )[0];

		if ( ! view || ! view.matches( '.forminator-ui.forminator-submission-views' ) ) {
			return;
		}
		if ( instances.has( view ) ) {
			return instances.get( view );
		}

		// Cache this instance's elements before binding any behavior.
		const selector = '.forminator-submission-views__';
		const table = view.querySelector( 'table' );
		const scroll = view.querySelector( selector + 'scroll' );
		const panel = view.querySelector( 'dialog' );
		const panelBody = view.querySelector( selector + 'panel-body' );
		const columnOptions = view.querySelector( '[data-columns]' );
		const downloadButton = view.querySelector( '[data-download]' );
		const downloadSelect = view.querySelector( '[data-download-select]' );

		if ( ! table || ! table.tHead || ! table.tHead.rows.length || ! scroll ) {
			return;
		}

		// Per-instance state and original markup needed by destroy().
		const listeners = [];
		const boundHandles = new WeakSet();
		const handleAttributes = new Map();
		const widths = new Map();
		const originalColgroup = table.querySelector( 'colgroup' );
		const colgroup = originalColgroup || document.createElement( 'colgroup' );
		const originalColumns = Array.from( colgroup.childNodes );
		const originalTableStyle = table.getAttribute( 'style' );
		const reducedMotion = window.matchMedia( '(prefers-reduced-motion: reduce)' );
		let headers = [];
		let minColumnWidth = 200;
		let maxColumnWidth = 1200;
		let resizing;
		let opener;
		let closeTimer;
		let observer;
		let directionObserver;
		let pointerStartedOutside = false;
		let destroyed = false;

		// Shared event helpers. Every registered listener is removed on destroy.
		function listen( target, type, handler, options ) {
			target.addEventListener( type, handler, options );
			listeners.push( () => target.removeEventListener( type, handler, options ) );
		}

		function delegate( type, targetSelector, handler ) {
			listen( view, type, ( event ) => {
				const target = event.target.closest( targetSelector );
				if ( target && target.closest( '.forminator-submission-views' ) === view ) {
					handler( event, target );
				}
			});
		}

		function emit( name, detail ) {
			return view.dispatchEvent(
				new CustomEvent( 'forminator:submission-views:' + name, { bubbles: true, cancelable: true, detail })
			);
		}

		// Table layout and overflow.
		function readWidth( name, fallback ) {
			const value = getComputedStyle( view ).getPropertyValue( '--forminator-submission-views-' + name );
			return parseFloat( value ) || fallback;
		}

		function isVisibleColumn( header ) {
			return ! header.hidden;
		}

		function isDataColumn( header ) {
			return header.hasAttribute( 'data-resizable' );
		}

		function detailWidth() {
			return readWidth( 'detail-column-width', 120 );
		}

		function updateScrollState() {

			// Match each header's computed divider, including host-theme inheritance.
			table.querySelectorAll( 'th[data-resizable]' ).forEach( ( header ) => {
				const handle = header.querySelector( selector + 'resize-handle' );
				if ( handle ) {
					handle.style.setProperty(
						'--forminator-submission-views-resize-divider-width',
						getComputedStyle( header ).borderBottomWidth
					);
				}
			});
			const remaining = scroll.scrollWidth - scroll.clientWidth;
			scroll.toggleAttribute( 'data-scrollable', 1 < remaining );

			// RTL scrollLeft is negative; the distance from the inline start is absolute.
			scroll.toggleAttribute( 'data-content-behind', 1 < remaining - Math.abs( scroll.scrollLeft ) );
		}

		function applyColumnWidths() {
			const visibleHeaders = headers.filter( isVisibleColumn );
			const dataColumns = visibleHeaders.filter( isDataColumn );
			const actionWidth = detailWidth();
			let totalWidth = 0;
			visibleHeaders.forEach( function( header ) {
				totalWidth += isDataColumn( header ) ? widths.get( header ) : actionWidth;
			});

			// Distribute spare space among data columns, keeping the action column fixed.
			const spareWidth = Math.max( 0, scroll.clientWidth - totalWidth );
			const extraPerColumn = spareWidth / ( dataColumns.length || 1 );
			const columns = visibleHeaders.map( function( header ) {
				const column = document.createElement( 'col' );
				let width = actionWidth;
				if ( isDataColumn( header ) ) {
					width = widths.get( header ) + extraPerColumn;
				}
				column.style.width = width + 'px';
				const handle = header.querySelector( selector + 'resize-handle' );
				if ( handle ) {
					handle.setAttribute( 'aria-valuenow', String( Math.round( width ) ) );
				}
				return column;
			});
			colgroup.replaceChildren( ...columns );
			table.style.setProperty( '--forminator-submission-views-data-column-count', dataColumns.length );
			table.style.tableLayout = 'fixed';
			table.style.width = Math.max( scroll.clientWidth, totalWidth ) + 'px';
			updateScrollState();
		}

		function captureColumnWidths() {
			headers
				.filter( ( header ) => ! header.hidden )
				.forEach( ( header ) => widths.set( header, header.getBoundingClientRect().width ) );
		}

		function resizeColumn( header, width ) {
			widths.set( header, Math.max( minColumnWidth, Math.min( maxColumnWidth, width ) ) );
			applyColumnWidths();
		}

		// Pointer and keyboard column resizing.
		function bindResizeHandles() {
			headers.forEach( function( header ) {
				const handle = header.querySelector( selector + 'resize-handle' );
				if ( ! handle ) {
					return;
				}
				if ( ! boundHandles.has( handle ) ) {
					rememberHandleAttributes( handle );
					boundHandles.add( handle );
					listen( handle, 'pointerdown', startResizing );
					listen( handle, 'pointermove', moveResizeHandle );
					listen( handle, 'pointerup', stopResizing );
					listen( handle, 'pointercancel', stopResizing );
					listen( handle, 'lostpointercapture', stopResizing );
					listen( handle, 'keydown', resizeWithKeyboard );
				}
				handle.setAttribute( 'aria-valuemin', String( minColumnWidth ) );
				handle.setAttribute( 'aria-valuemax', String( maxColumnWidth ) );
			});
		}

		function rememberHandleAttributes( handle ) {
			const names = [ 'style', 'aria-valuemin', 'aria-valuemax', 'aria-valuenow' ];
			const attributes = names.map( function( name ) {
				return [ name, handle.getAttribute( name ) ];
			});
			handleAttributes.set( handle, attributes );
		}

		function getResizeDirection() {
			return 'rtl' === getComputedStyle( table ).direction ? -1 : 1;
		}

		function startResizing( event ) {
			if ( 0 !== event.button || resizing ) {
				return;
			}
			event.preventDefault();
			captureColumnWidths();
			const header = event.currentTarget.closest( 'th' );
			resizing = {
				header,
				x: event.clientX,
				width: widths.get( header ),
				direction: getResizeDirection()
			};
			view.setAttribute( 'data-column-resizing', '' );
			event.currentTarget.setPointerCapture( event.pointerId );
		}

		function moveResizeHandle( event ) {
			if ( ! resizing || resizing.header !== event.currentTarget.closest( 'th' ) ) {
				return;
			}
			const distance = ( event.clientX - resizing.x ) * resizing.direction;
			resizeColumn( resizing.header, resizing.width + distance );
		}

		function stopResizing() {
			resizing = null;
			view.removeAttribute( 'data-column-resizing' );
		}

		function resizeWithKeyboard( event ) {
			if ( ! [ 'ArrowLeft', 'ArrowRight', 'Home', 'End' ].includes( event.key ) ) {
				return;
			}
			event.preventDefault();
			captureColumnWidths();
			const header = event.currentTarget.closest( 'th' );
			const step = event.shiftKey ? 50 : 10;
			let width = widths.get( header );
			if ( 'Home' === event.key ) {
				width = minColumnWidth;
			} else if ( 'End' === event.key ) {
				width = maxColumnWidth;
			} else {
				const direction = 'ArrowRight' === event.key ? 1 : -1;
				width += direction * getResizeDirection() * step;
			}
			resizeColumn( header, width );
		}

		// Sidebar opening, animated dismissal and focus restoration.
		function openPanel( trigger ) {
			if ( ! panel || panel.open || destroyed ) {
				return;
			}
			opener = trigger || document.activeElement;
			panel.dataset.state = 'closed';
			panel.showModal();

			// Establish the offscreen position before starting the CSS transition.
			panel.getBoundingClientRect();
			panel.dataset.state = 'open';
			if ( panelBody ) {
				panelBody.scrollTop = 0;
			}
		}

		function finishClose() {
			if ( 'closing' !== panel.dataset.state ) {
				return;
			}
			clearTimeout( closeTimer );
			panel.close();
		}

		function closePanel() {
			if ( ! panel || ! panel.open || 'closing' === panel.dataset.state ) {
				return;
			}
			panel.dataset.state = 'closing';
			if ( reducedMotion.matches ) {
				finishClose();
				return;
			}

			// A fallback also handles zero-duration overrides or interrupted transitions.
			const durations = getComputedStyle( panel )
				.transitionDuration.split( ',' )
				.map( ( value ) => parseFloat( value ) * ( value.trim().endsWith( 'ms' ) ? 1 : 1000 ) );
			closeTimer = setTimeout( finishClose, Math.max( ...durations ) + 50 );
		}

		function isOutsidePanel( event ) {
			const bounds = panel.getBoundingClientRect();
			return (
				event.clientX < bounds.left ||
				event.clientX > bounds.right ||
				event.clientY < bounds.top ||
				event.clientY > bounds.bottom
			);
		}

		function rememberOutsidePointer( event ) {
			pointerStartedOutside = event.target === panel && isOutsidePanel( event );
		}

		function resetOutsidePointer() {
			pointerStartedOutside = false;
		}

		function dismissOutsideClick( event ) {
			if ( pointerStartedOutside && event.target === panel && isOutsidePanel( event ) ) {
				closePanel();
			}
			resetOutsidePointer();
		}

		function cancelPanel( event ) {
			event.preventDefault();
			closePanel();
		}

		function finishPanelTransition( event ) {
			if ( event.target === panel && 'transform' === event.propertyName ) {
				finishClose();
			}
		}

		function handlePanelClosed() {
			clearTimeout( closeTimer );
			delete panel.dataset.state;
			emit( 'close', {});
			if ( opener && opener.isConnected ) {
				opener.focus();
			}
		}

		function bindPanelEvents() {
			if ( ! panel ) {
				return;
			}
			listen( panel, 'pointerdown', rememberOutsidePointer );
			listen( panel, 'pointercancel', resetOutsidePointer );
			listen( panel, 'click', dismissOutsideClick );
			listen( panel, 'cancel', cancelPanel );
			listen( panel, 'transitionend', finishPanelTransition );
			listen( panel, 'close', handlePanelClosed );
			delegate( 'click', '[data-close]', closePanel );
		}

		// Controls request data actions; Forminator owns result rendering and exports.
		function requestDetail( event, trigger ) {
			if ( panel && panel.open ) {
				return;
			}
			const row = trigger.closest( 'tr' );
			const id = row ? row.dataset.id : trigger.dataset.detail;

			// A consumer can prevent opening while it loads the selected record.
			if ( emit( 'detail', { trigger, id }) ) {
				openPanel( trigger );
			}
		}

		function requestSearch( event, input ) {
			emit( 'search', { value: input.value });
		}

		function requestPageSize( event, input ) {
			emit( 'page-size', { value: Number( input.value ) });
		}

		function requestPage( event, button ) {
			if ( ! button.disabled ) {
				emit( 'page', { action: button.dataset.page });
			}
		}

		function toggleColumnOptions( event, button ) {
			if ( ! columnOptions ) {
				return;
			}
			columnOptions.hidden = ! columnOptions.hidden;
			button.setAttribute( 'aria-expanded', String( ! columnOptions.hidden ) );
		}

		function changeColumnVisibility( event, input ) {
			const index = Number( input.dataset.column );
			if ( ! Number.isInteger( index ) || 0 > index || index >= headers.length - 1 ) {
				return;
			}
			Array.from( table.rows ).forEach( function( row ) {
				if ( row.cells[index]) {
					row.cells[index].hidden = ! input.checked;
				}
			});
			applyColumnWidths();
			emit( 'columns', { index, visible: input.checked });
		}

		function showDownloadFormats() {
			if ( ! downloadSelect ) {
				return;
			}
			if ( 'function' === typeof downloadSelect.showPicker ) {
				try {
					downloadSelect.showPicker();
					return;
				} catch ( error ) {

					// Some browsers expose showPicker but do not allow it in this context.
				}
			}
			downloadSelect.focus();
			downloadSelect.click();
		}

		function requestExport( event, select ) {
			const format = select.value;
			select.value = '';
			if ( downloadButton ) {
				downloadButton.focus();
			}
			if ( format ) {
				emit( 'export', { format });
			}
		}

		function bindControlEvents() {
			delegate( 'click', '[data-detail]', requestDetail );
			delegate( 'input', '[type="search"]', requestSearch );
			delegate( 'change', '[data-page-size]', requestPageSize );
			delegate( 'click', '[data-page]', requestPage );
			delegate( 'click', '[data-columns-toggle]', toggleColumnOptions );
			delegate( 'change', '[data-column]', changeColumnVisibility );
			delegate( 'click', '[data-download]', showDownloadFormats );
			delegate( 'change', '[data-download-select]', requestExport );
		}

		// Instance lifecycle.
		function refresh() {
			if ( destroyed || ! table.tHead || ! table.tHead.rows.length ) {
				return;
			}
			minColumnWidth = readWidth( 'column-min-width', 200 );
			maxColumnWidth = Math.max( 1200, minColumnWidth );
			headers = Array.from( table.tHead.rows[0].cells );
			headers.forEach( function( header ) {
				const savedWidth = widths.get( header ) || minColumnWidth;
				widths.set( header, Math.max( minColumnWidth, savedWidth ) );
			});
			bindResizeHandles();
			applyColumnWidths();
		}

		function destroy() {
			if ( destroyed ) {
				return;
			}
			destroyed = true;
			clearTimeout( closeTimer );
			if ( observer ) {
				observer.disconnect();
			}
			directionObserver.disconnect();
			listeners.forEach( ( remove ) => remove() );
			handleAttributes.forEach( ( attributes, handle ) => {
				attributes.forEach( ([ name, value ]) => {
					if ( null === value ) {
						handle.removeAttribute( name );
					} else {
						handle.setAttribute( name, value );
					}
				});
			});
			if ( panel && panel.open ) {
				panel.close();
				if ( opener && opener.isConnected ) {
					opener.focus();
				}
			}
			if ( panel ) {
				delete panel.dataset.state;
			}
			if ( originalColgroup ) {
				colgroup.replaceChildren( ...originalColumns );
			} else {
				colgroup.remove();
			}
			if ( null === originalTableStyle ) {
				table.removeAttribute( 'style' );
			} else {
				table.setAttribute( 'style', originalTableStyle );
			}
			scroll.removeAttribute( 'data-scrollable' );
			scroll.removeAttribute( 'data-content-behind' );
			view.removeAttribute( 'data-column-resizing' );
			instances.delete( view );
		}

		function updateLayout() {
			if ( ! destroyed ) {
				applyColumnWidths();
			}
		}

		function refreshDirection() {
			if ( ! destroyed ) {
				refresh();
			}
		}

		function observeLayout() {
			listen( scroll, 'scroll', updateScrollState, { passive: true });
			if ( 'function' === typeof window.ResizeObserver ) {
				observer = new window.ResizeObserver( updateLayout );
				observer.observe( scroll );
			} else {
				listen( window, 'resize', updateLayout );
			}
			directionObserver = new window.MutationObserver( refreshDirection );

			// Direction can come from this root, a wrapper or the page itself.
			for ( let ancestor = view; ancestor; ancestor = ancestor.parentElement ) {
				directionObserver.observe( ancestor, { attributes: true, attributeFilter: [ 'dir' ] });
			}
		}

		function init() {
			if ( ! originalColgroup ) {
				table.insertBefore( colgroup, table.tHead );
			}
			bindPanelEvents();
			bindControlEvents();
			refresh();
			observeLayout();
		}

		const api = { refresh, destroy, open: openPanel, close: closePanel };
		instances.set( view, api );
		init();
		return api;
	};
}( jQuery ) );
