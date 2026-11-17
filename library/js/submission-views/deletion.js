( function() {
	'use strict';

	if ( 'object' !== typeof window.FUI ) {
		window.FUI = {};
	}

	FUI._submissionViews = FUI._submissionViews || {};
	FUI._submissionViews.deletion = function( context ) {
		function updateSidebarDelete() {
			if ( context.sidebarDelete ) {
				context.sidebarDelete.disabled = undefined === context.activeSubmissionId || null === context.activeSubmissionId;
			}
		}

		function requestDelete( event, trigger ) {
			if ( ! context.deleteDialog || context.deleteDialog.open || context.pendingDelete ) {
				return;
			}
			const row = trigger.closest( 'tr' );
			const fromSidebar = context.panel && context.panel.contains( trigger );
			const id = row ? row.dataset.id : context.activeSubmissionId;
			if ( undefined === id || null === id || ! row && ! fromSidebar ) {
				return;
			}
			context.pendingDelete = {
				id,
				trigger,
				source: fromSidebar ? 'sidebar' : 'table'
			};
			context.deleteConfirmed = false;
			context.setColumnOptionsOpen( false, false );
			context.deleteDialog.dataset.state = 'closed';
			context.deleteDialog.showModal();

			// Establish the entry frame before transitioning the dialog and backdrop.
			context.deleteDialog.getBoundingClientRect();
			getComputedStyle( context.deleteDialog, '::backdrop' ).opacity;
			context.deleteDialog.dataset.state = 'open';
			const cancel = context.deleteDialog.querySelector( '[data-delete-cancel]' );
			if ( cancel ) {
				cancel.focus();
			}
		}

		function finishDeleteDialogClose() {
			if ( context.deleteDialog && 'closing' === context.deleteDialog.dataset.state ) {
				clearTimeout( context.deleteCloseTimer );
				context.deleteDialog.close();
			}
		}

		function closeDeleteDialog() {
			if ( ! context.deleteDialog || ! context.deleteDialog.open || 'closing' === context.deleteDialog.dataset.state ) {
				return;
			}
			context.deleteDialog.dataset.state = 'closing';
			const durations = getComputedStyle( context.deleteDialog ).transitionDuration.split( ',' ).map( function( value ) {
				const duration = parseFloat( value ) || 0;
				return duration * ( value.trim().endsWith( 'ms' ) ? 1 : 1000 );
			});
			const duration = Math.max( 0, ...durations );
			if ( ! duration ) {
				context.finishDeleteDialogClose();
				return;
			}
			context.deleteCloseTimer = setTimeout( context.finishDeleteDialogClose, duration + 50 );
		}

		function finishDeleteTransition( event ) {
			if ( event.target === context.deleteDialog && 'opacity' === event.propertyName ) {
				context.finishDeleteDialogClose();
			}
		}

		function cancelDelete( event ) {
			if ( event ) {
				event.preventDefault();
			}
			context.closeDeleteDialog();
		}

		function confirmDelete() {
			if ( ! context.deleteDialog || ! context.deleteDialog.open || ! context.pendingDelete || context.deleteConfirmed ) {
				return;
			}
			context.deleteConfirmed = true;
			const request = context.pendingDelete;
			context.closeDeleteDialog();
			if ( 'sidebar' === request.source ) {
				context.closePanel();
			}

			// No record is removed by FUI. Forminator handles the confirmed request.
			context.emit( 'delete', request );
		}

		function handleDeleteDialogClosed() {
			clearTimeout( context.deleteCloseTimer );
			delete context.deleteDialog.dataset.state;
			const trigger = context.pendingDelete && context.pendingDelete.trigger;
			if ( ! context.deleteConfirmed && trigger && trigger.isConnected ) {
				trigger.focus();
			} else if ( ! context.panel || ! context.panel.open ) {
				context.focusAvailableControl();
			}
			context.pendingDelete = null;
		}

		function focusAvailableControl() {
			const action = context.view.querySelector( 'tbody tr:not([hidden]) td:not([hidden]) [data-detail]' );
			const search = context.view.querySelector( '[type="search"]' );
			const target = action || search;
			if ( target ) {
				target.focus();
			}
		}

		function bindDeleteDialogEvents() {
			if ( ! context.deleteDialog ) {
				return;
			}
			context.listen( context.deleteDialog, 'cancel', context.cancelDelete );
			context.listen( context.deleteDialog, 'close', context.handleDeleteDialogClosed );
			context.listen( context.deleteDialog, 'transitionend', context.finishDeleteTransition );
			context.delegate( 'click', '[data-delete-cancel]', context.cancelDelete );
			context.delegate( 'click', '[data-delete-confirm]', context.confirmDelete );
		}

		Object.assign( context, {
			updateSidebarDelete,
			requestDelete,
			finishDeleteDialogClose,
			closeDeleteDialog,
			finishDeleteTransition,
			cancelDelete,
			confirmDelete,
			handleDeleteDialogClosed,
			focusAvailableControl,
			bindDeleteDialogEvents
		});
	};
}() );
