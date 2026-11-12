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
		const panel = view.querySelector( selector + 'panel' );
		const deleteDialog = view.querySelector( '[data-delete-dialog]' );
		const sidebarDelete = panel ? panel.querySelector( '[data-delete]' ) : null;
		const panelBody = view.querySelector( selector + 'panel-body' );
		const columnOptions = view.querySelector( '[data-columns]' );
		const columnsButton = view.querySelector( '[data-columns-toggle]' );
		const originalColumnStyle = columnOptions ? columnOptions.getAttribute( 'style' ) : null;

		if ( ! table || ! table.tHead || ! table.tHead.rows.length || ! scroll ) {
			return;
		}

		// Per-instance state and original markup needed by destroy().
		const listeners = [];
		const boundHandles = new WeakSet();
		const handleAttributes = new Map();
		const originalColumnDisabled = new Map();
		const widths = new Map();
		const originalColgroup = table.querySelector( 'colgroup' );
		const colgroup = originalColgroup || document.createElement( 'colgroup' );
		const originalColumns = Array.from( colgroup.childNodes );
		const originalTableStyle = table.getAttribute( 'style' );
		const originalScrollStyle = scroll.getAttribute( 'style' );
		const reducedMotion = window.matchMedia( '(prefers-reduced-motion: reduce)' );
		let headers = [];
		let minColumnWidth = 200;
		let maxColumnWidth = 1200;
		let resizing;
		let opener;
		let activeSubmissionId;
		let pendingDelete;
		let deleteConfirmed = false;
		let deleteCloseTimer;
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
			return readWidth( 'detail-column-width', 180 );
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
			const contentBehind = Math.max( 0, remaining - Math.abs( scroll.scrollLeft ) );
			scroll.toggleAttribute( 'data-content-behind', 1 < contentBehind );
			updateStickyActionWidth( contentBehind );
		}

		function updateStickyActionWidth( contentBehind ) {
			const button = table.querySelector( 'tbody tr:not([hidden]) td:not([hidden]) [data-detail]' );
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
			scroll.style.setProperty( '--forminator-submission-views-sticky-action-offset', offset + 'px' );
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
			table.style.setProperty( '--forminator-submission-views-action-column-width', visibleHeaders.some( header => ! isDataColumn( header ) ) ? actionWidth + 'px' : '0px' );
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

		// Submission content is supplied by Forminator, independently of table columns.
		function createText( value, emptyValue ) {
			const text = document.createElement( 'bdi' );
			text.dir = 'auto';
			text.textContent = null === value || undefined === value || '' === value ? emptyValue : String( value );
			return text;
		}

		function renderValue( container, value, emptyValue ) {
			if ( Array.isArray( value ) ) {
				const list = document.createElement( 'ul' );
				value.forEach( function( item ) {
					const entry = document.createElement( 'li' );
					entry.appendChild( createText( item, emptyValue ) );
					list.appendChild( entry );
				});
				if ( value.length ) {
					container.appendChild( list );
					return;
				}
				value = null;
			}
			container.appendChild( createText( value, emptyValue ) );
		}

		// Parse URLs before assigning href; never accept executable or embedded-data schemes.
		function getSafeUrl( value ) {
			if ( 'string' !== typeof value || ! value.trim() || /[\u0000-\u001f\u007f]/.test( value ) ) {
				return null;
			}
			try {
				const url = new window.URL( value.trim(), document.baseURI );
				if ( ! [ 'https:', 'http:' ].includes( url.protocol ) || url.username || url.password ) {
					return null;
				}
				return url.href;
			} catch ( error ) {
				return null;
			}
		}

		function renderLink( container, value, field, emptyValue ) {
			const details = value && 'object' === typeof value ? value : { url: value };
			const href = getSafeUrl( details.url );
			const label = details.label || details.name || details.url;
			if ( ! href ) {
				container.appendChild( createText( label, emptyValue ) );
				return;
			}
			const link = document.createElement( 'a' );
			link.href = href;
			link.appendChild( createText( label, emptyValue ) );
			if ( true === field.newTab ) {
				link.target = '_blank';
				link.rel = 'noopener noreferrer';
			}
			if ([ 'file', 'upload' ].includes( field.type ) ) {
				link.setAttribute( 'download', '' );
			}
			container.appendChild( link );
		}

		function renderLinkField( container, field, emptyValue ) {
			if ( ! Array.isArray( field.value ) ) {
				renderLink( container, field.value, field, emptyValue );
				return;
			}
			if ( ! field.value.length ) {
				container.appendChild( createText( null, emptyValue ) );
				return;
			}
			const list = document.createElement( 'ul' );
			field.value.forEach( function( value ) {
				const item = document.createElement( 'li' );
				renderLink( item, value, field, emptyValue );
				list.appendChild( item );
			});
			container.appendChild( list );
		}

		function renderRepeater( entries, emptyValue ) {
			const group = document.createElement( 'dl' );
			group.className = 'forminator-submission-views__group';
			entries.forEach( function( entry ) {
				if ( ! entry || ! Array.isArray( entry.fields ) ) {
					return;
				}

				// Unlabelled entries show child fields directly, like Address.
				if ( ! entry.label ) {
					const fields = renderFields( entry.fields, emptyValue, true );
					group.append( ...Array.from( fields.children ) );
					return;
				}
				const row = document.createElement( 'div' );
				const label = document.createElement( 'dt' );
				const content = document.createElement( 'dd' );

				// Keep a named entry group only when Forminator supplies its label.
				label.appendChild( createText( entry.label, emptyValue ) );
				content.appendChild( renderFields( entry.fields, emptyValue, true ) );
				row.append( label, content );
				group.appendChild( row );
			});
			return group;
		}

		function renderFields( fields, emptyValue, nested ) {
			const list = document.createElement( 'dl' );
			list.className = nested ? 'forminator-submission-views__group' : 'forminator-submission-views__fields';
			fields.forEach( function( field ) {
				if ( ! field || 'object' !== typeof field ) {
					return;
				}
				const row = document.createElement( 'div' );
				const label = document.createElement( 'dt' );
				const content = document.createElement( 'dd' );
				if ( ! nested ) {
					row.className = 'forminator-submission-views__field';
				}
				if ( undefined !== field.id ) {
					row.dataset.fieldId = String( field.id );
				}
				label.appendChild( createText( field.label, emptyValue ) );
				if ( 'repeater' === field.type && Array.isArray( field.entries ) && field.entries.length ) {
					content.appendChild( renderRepeater( field.entries, emptyValue ) );
				} else if ( Array.isArray( field.fields ) ) {
					content.appendChild( renderFields( field.fields, emptyValue, true ) );
				} else if ([ 'link', 'url', 'file', 'upload' ].includes( field.type ) ) {
					renderLinkField( content, field, emptyValue );
				} else {
					renderValue( content, field.value, emptyValue );
				}
				row.append( label, content );
				list.appendChild( row );
			});
			return list;
		}

		/** Replace dialog fields without opening it or changing the table. */
		function setSubmission( submission ) {
			if ( destroyed || ! panelBody || ! submission || ! Array.isArray( submission.fields ) ) {
				return false;
			}

			// Validate the whole record before replacing either its title or fields.
			const title = panel.querySelector( '[data-submission-title]' );
			if ( ! title || 'string' !== typeof submission.title || ! submission.title.trim() ) {
				return false;
			}
			const emptyValue = undefined === submission.emptyValue ? '—' : String( submission.emptyValue );
			const fields = renderFields( submission.fields, emptyValue, false );
			title.textContent = submission.title.trim();
			activeSubmissionId = submission.id;
			updateSidebarDelete();
			panelBody.replaceChildren( fields );
			panelBody.scrollTop = 0;
			return true;
		}

		// Sidebar opening, animated dismissal and focus restoration.
		function openPanel( trigger ) {
			if ( ! panel || panel.open || destroyed ) {
				return;
			}
			opener = trigger || document.activeElement;
			const row = trigger && trigger.closest( 'tr' );
			if ( row ) {
				activeSubmissionId = row.dataset.id;
			}
			updateSidebarDelete();
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
			} else {
				focusAvailableControl();
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

		function setColumnOptionsOpen( open, restoreFocus ) {
			if ( ! columnOptions || ! columnsButton ) {
				return;
			}
			columnOptions.hidden = ! open;
			columnsButton.setAttribute( 'aria-expanded', String( open ) );
			if ( open ) {
				positionColumnOptions();
				const checkbox = columnOptions.querySelector( 'input:not(:disabled)' );
				if ( checkbox ) {
					checkbox.focus({ preventScroll: true });
				}
			} else if ( restoreFocus ) {
				columnsButton.focus();
			}
		}

		function positionColumnOptions() {
			const anchor = columnsButton.getBoundingClientRect();
			const below = window.innerHeight - anchor.bottom - 16;
			const above = anchor.top - 16;
			const placeAbove = 200 > below && above > below;
			columnOptions.dataset.placement = placeAbove ? 'top' : 'bottom';
			columnOptions.style.maxHeight = Math.max( 80, Math.min( readWidth( 'columns-max-height', 360 ), placeAbove ? above : below ) ) + 'px';
			columnOptions.style.transform = '';
			const bounds = columnOptions.getBoundingClientRect();
			const offset = Math.max( 8 - bounds.left, Math.min( 0, document.documentElement.clientWidth - 8 - bounds.right ) );
			columnOptions.style.transform = 'translateX(' + offset + 'px)';
		}

		function toggleColumnOptions() {
			if ( columnOptions ) {
				setColumnOptionsOpen( columnOptions.hidden, false );
			}
		}

		function dismissColumnOptions( event ) {
			if ( ! columnOptions || ! columnsButton || columnOptions.hidden ) {
				return;
			}
			if ( ! columnOptions.contains( event.target ) && ! columnsButton.contains( event.target ) ) {
				setColumnOptionsOpen( false, false );
			}
		}

		function handleColumnOptionsKeydown( event ) {
			if ( 'Escape' === event.key && columnOptions && ! columnOptions.hidden ) {
				event.preventDefault();
				setColumnOptionsOpen( false, true );
			}
		}

		function updateSidebarDelete() {
			if ( sidebarDelete ) {
				sidebarDelete.disabled = undefined === activeSubmissionId || null === activeSubmissionId;
			}
		}

		function requestDelete( event, trigger ) {
			if ( ! deleteDialog || deleteDialog.open || pendingDelete ) {
				return;
			}
			const row = trigger.closest( 'tr' );
			const fromSidebar = panel && panel.contains( trigger );
			const id = row ? row.dataset.id : activeSubmissionId;
			if ( undefined === id || null === id || ( ! row && ! fromSidebar ) ) {
				return;
			}
			pendingDelete = { id, trigger, source: fromSidebar ? 'sidebar' : 'table' };
			deleteConfirmed = false;
			setColumnOptionsOpen( false, false );
			deleteDialog.dataset.state = 'closed';
			deleteDialog.showModal();

			// Establish the entry frame before transitioning the dialog and backdrop.
			deleteDialog.getBoundingClientRect();
			getComputedStyle( deleteDialog, '::backdrop' ).opacity;
			deleteDialog.dataset.state = 'open';
			const cancel = deleteDialog.querySelector( '[data-delete-cancel]' );
			if ( cancel ) {
				cancel.focus();
			}
		}

		function finishDeleteDialogClose() {
			if ( deleteDialog && 'closing' === deleteDialog.dataset.state ) {
				clearTimeout( deleteCloseTimer );
				deleteDialog.close();
			}
		}

		function closeDeleteDialog() {
			if ( ! deleteDialog || ! deleteDialog.open || 'closing' === deleteDialog.dataset.state ) {
				return;
			}
			deleteDialog.dataset.state = 'closing';
			const durations = getComputedStyle( deleteDialog ).transitionDuration.split( ',' ).map( function( value ) {
				const duration = parseFloat( value ) || 0;
				return duration * ( value.trim().endsWith( 'ms' ) ? 1 : 1000 );
			});
			const duration = Math.max( 0, ...durations );
			if ( ! duration ) {
				finishDeleteDialogClose();
				return;
			}
			deleteCloseTimer = setTimeout( finishDeleteDialogClose, duration + 50 );
		}

		function finishDeleteTransition( event ) {
			if ( event.target === deleteDialog && 'opacity' === event.propertyName ) {
				finishDeleteDialogClose();
			}
		}

		function cancelDelete( event ) {
			if ( event ) {
				event.preventDefault();
			}
			closeDeleteDialog();
		}

		function confirmDelete() {
			if ( ! deleteDialog || ! deleteDialog.open || ! pendingDelete || deleteConfirmed ) {
				return;
			}
			deleteConfirmed = true;
			const request = pendingDelete;
			closeDeleteDialog();
			if ( 'sidebar' === request.source ) {
				closePanel();
			}

			// No record is removed by FUI. Forminator handles the confirmed request.
			emit( 'delete', request );
		}

		function handleDeleteDialogClosed() {
			clearTimeout( deleteCloseTimer );
			delete deleteDialog.dataset.state;
			const trigger = pendingDelete && pendingDelete.trigger;
			if ( ! deleteConfirmed && trigger && trigger.isConnected ) {
				trigger.focus();
			} else if ( ! panel || ! panel.open ) {
				focusAvailableControl();
			}
			pendingDelete = null;
		}

		function focusAvailableControl() {
			const action = view.querySelector( 'tbody tr:not([hidden]) td:not([hidden]) [data-detail]' );
			const search = view.querySelector( '[type="search"]' );
			const target = action || search;
			if ( target ) {
				target.focus();
			}
		}

		function bindDeleteDialogEvents() {
			if ( ! deleteDialog ) {
				return;
			}
			listen( deleteDialog, 'cancel', cancelDelete );
			listen( deleteDialog, 'close', handleDeleteDialogClosed );
			listen( deleteDialog, 'transitionend', finishDeleteTransition );
			delegate( 'click', '[data-delete-cancel]', cancelDelete );
			delegate( 'click', '[data-delete-confirm]', confirmDelete );
		}

		function setColumnVisible( index, visible ) {
			Array.from( table.rows ).forEach( function( row ) {
				if ( row.cells[index]) {
					row.cells[index].hidden = ! visible;
				}
			});
		}

		function updateColumnOptions() {
			const dataColumns = headers.filter( isDataColumn );
			let visibleColumns = dataColumns.filter( isVisibleColumn );
			if ( ! visibleColumns.length && dataColumns.length ) {
				setColumnVisible( headers.indexOf( dataColumns[0]), true );
				visibleColumns = [ dataColumns[0] ];
			}
			if ( ! columnOptions ) {
				return;
			}
			columnOptions.querySelectorAll( '[data-column]' ).forEach( function( input ) {
				const header = headers[Number( input.dataset.column )];
				if ( ! header || ! isDataColumn( header ) ) {
					return;
				}
				if ( ! originalColumnDisabled.has( input ) ) {
					originalColumnDisabled.set( input, input.disabled );
				}
				input.checked = ! header.hidden;
				input.disabled = originalColumnDisabled.get( input ) || ( input.checked && 1 === visibleColumns.length );
			});
		}

		function changeColumnVisibility( event, input ) {
			const index = Number( input.dataset.column );
			if ( ! Number.isInteger( index ) || ! headers[index] || ! isDataColumn( headers[index]) ) {
				return;
			}
			const visibleColumns = headers.filter( isDataColumn ).filter( isVisibleColumn );
			if ( ! input.checked && ! headers[index].hidden && 1 === visibleColumns.length ) {
				updateColumnOptions();
				return;
			}
			setColumnVisible( index, input.checked );
			updateColumnOptions();
			applyColumnWidths();
			emit( 'columns', { index, visible: input.checked });
		}

		// Export data is explicit and independent of the table's displayed values.
		function getCsv( options ) {
			if ( destroyed || ! options || ! Array.isArray( options.fields ) || ! Array.isArray( options.rows ) ) {
				return false;
			}
			const mode = options.mode || 'all';
			if ( ! [ 'all', 'visible' ].includes( mode ) ) {
				return false;
			}
			const ids = new Set();
			for ( const field of options.fields ) {
				if ( ! field || 'string' !== typeof field.id || ! field.id || ids.has( field.id ) ) {
					return false;
				}
				ids.add( field.id );
			}
			let fields = options.fields;
			if ( 'visible' === mode ) {
				let visibleIds = options.visibleFieldIds;
				if ( undefined === visibleIds ) {
					visibleIds = headers.filter( isDataColumn ).filter( isVisibleColumn ).map( header => header.dataset.fieldId );
				}
				if ( ! Array.isArray( visibleIds ) ) {
					return false;
				}
				fields = fields.filter( field => visibleIds.includes( field.id ) );
			}
			if ( ! fields.length ) {
				return false;
			}
			try {
				const lines = [ fields.map( field => quoteCsvValue( undefined === field.label ? field.id : field.label ) ).join( ',' ) ];
				for ( const row of options.rows ) {
					if ( ! row || 'object' !== typeof row || Array.isArray( row ) ) {
						return false;
					}
					lines.push( fields.map( function( field ) {
						const value = Object.prototype.hasOwnProperty.call( row, field.id ) ? row[field.id] : null;
						return quoteCsvValue( value );
					}).join( ',' ) );
				}
				return lines.join( '\r\n' ) + '\r\n';
			} catch ( error ) {

				// Cyclic or otherwise unserializable field data must not produce a partial file.
				return false;
			}
		}

		function quoteCsvValue( value ) {
			let text = '';
			if ( null !== value && undefined !== value ) {
				text = 'object' === typeof value ? JSON.stringify( value ) : String( value );
			}

			// Quote CSV syntax and neutralize spreadsheet formulas, including leading whitespace.
			if ( /^[\s\u0000-\u001f]*[=+@-]|^[\t\r\n]/.test( text ) && 'number' !== typeof value ) {
				text = '\'' + text;
			}
			return '"' + text.replace( /"/g, '""' ) + '"';
		}

		function downloadCsv( options ) {
			const csv = getCsv( options );
			if ( false === csv ) {
				return false;
			}
			let filename = 'string' === typeof options.filename ? options.filename.trim() : 'submissions.csv';
			filename = filename.replace( /[\\/:*?"<>|\u0000-\u001f]/g, '-' ) || 'submissions.csv';
			if ( ! /\.csv$/i.test( filename ) ) {
				filename += '.csv';
			}
			const content = false === options.bom ? csv : '\uFEFF' + csv;
			const url = URL.createObjectURL( new Blob([ content ], { type: 'text/csv;charset=utf-8;' }) );
			const link = document.createElement( 'a' );
			link.href = url;
			link.download = filename;
			link.hidden = true;
			document.body.appendChild( link );
			try {
				link.click();
			} finally {
				link.remove();
				setTimeout( () => URL.revokeObjectURL( url ), 1000 );
			}
			return true;
		}

		function requestExport() {
			emit( 'export', { format: 'csv' });
		}

		function bindControlEvents() {
			delegate( 'click', '[data-detail]', requestDetail );
			delegate( 'click', '[data-delete]', requestDelete );
			listen( document, 'pointerdown', dismissColumnOptions );
			listen( document, 'focusin', dismissColumnOptions );
			listen( view, 'keydown', handleColumnOptionsKeydown );
			delegate( 'input', '[type="search"]', requestSearch );
			delegate( 'change', '[data-page-size]', requestPageSize );
			delegate( 'click', '[data-page]', requestPage );
			delegate( 'click', '[data-columns-toggle]', toggleColumnOptions );
			delegate( 'change', '[data-column]', changeColumnVisibility );
			delegate( 'click', '[data-download]', requestExport );
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
			updateColumnOptions();
			bindResizeHandles();
			applyColumnWidths();
		}

		function destroy() {
			if ( destroyed ) {
				return;
			}
			destroyed = true;
			clearTimeout( deleteCloseTimer );
			pendingDelete = null;
			if ( deleteDialog && deleteDialog.open ) {
				deleteDialog.close();
			}
			setColumnOptionsOpen( false, false );
			if ( columnOptions ) {
				delete columnOptions.dataset.placement;
				if ( null === originalColumnStyle ) {
					columnOptions.removeAttribute( 'style' );
				} else {
					columnOptions.setAttribute( 'style', originalColumnStyle );
				}
			}
			clearTimeout( closeTimer );
			if ( observer ) {
				observer.disconnect();
			}
			directionObserver.disconnect();
			listeners.forEach( ( remove ) => remove() );
			originalColumnDisabled.forEach( function( disabled, input ) {
				input.disabled = disabled;
			});
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
			if ( null === originalScrollStyle ) {
				scroll.removeAttribute( 'style' );
			} else {
				scroll.setAttribute( 'style', originalScrollStyle );
			}
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
			bindDeleteDialogEvents();
			bindControlEvents();
			refresh();
			observeLayout();
		}

		const api = { refresh, destroy, open: openPanel, close: closePanel, setSubmission, getCsv, downloadCsv };
		instances.set( view, api );
		init();
		return api;
	};
}( jQuery ) );
