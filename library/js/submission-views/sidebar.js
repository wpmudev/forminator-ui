( function() {
	'use strict';

	if ( 'object' !== typeof window.FUI ) {
		window.FUI = {};
	}

	FUI._submissionViews = FUI._submissionViews || {};
	FUI._submissionViews.sidebar = function( context ) {

		/** Replace dialog fields without opening it or changing the table. */
		function setSubmission( submission ) {
			if ( context.destroyed || ! context.panelBody || ! submission || ! Array.isArray( submission.fields ) ) {
				return false;
			}

			// Validate the whole record before replacing either its title or fields.
			const title = context.panel.querySelector( '[data-submission-title]' );
			if ( ! title || 'string' !== typeof submission.title || ! submission.title.trim() ) {
				return false;
			}
			const emptyValue = undefined === submission.emptyValue ? '—' : String( submission.emptyValue );
			const fields = context.renderFields( submission.fields, emptyValue, false );
			title.textContent = submission.title.trim();
			context.activeSubmissionId = submission.id;
			context.updateSidebarDelete();
			context.panelBody.replaceChildren( fields );
			context.panelBody.scrollTop = 0;
			return true;
		}

		// Sidebar opening, animated dismissal and focus restoration.

		// Sidebar opening, animated dismissal and focus restoration.
		function openPanel( trigger ) {
			if ( ! context.panel || context.panel.open || context.destroyed ) {
				return;
			}
			context.opener = trigger || document.activeElement;
			const row = trigger && trigger.closest( 'tr' );
			if ( row ) {
				context.activeSubmissionId = row.dataset.id;
			}
			context.updateSidebarDelete();
			context.panel.dataset.state = 'closed';
			context.panel.showModal();

			// Establish the offscreen position before starting the CSS transition.
			context.panel.getBoundingClientRect();
			context.panel.dataset.state = 'open';
			if ( context.panelBody ) {
				context.panelBody.scrollTop = 0;
			}
		}

		function finishClose() {
			if ( 'closing' !== context.panel.dataset.state ) {
				return;
			}
			clearTimeout( context.closeTimer );
			context.panel.close();
		}

		function closePanel() {
			if ( ! context.panel || ! context.panel.open || 'closing' === context.panel.dataset.state ) {
				return;
			}
			context.panel.dataset.state = 'closing';
			if ( context.reducedMotion.matches ) {
				context.finishClose();
				return;
			}

			// A fallback also handles zero-duration overrides or interrupted transitions.
			const durations = getComputedStyle( context.panel ).transitionDuration.split( ',' ).map( value => parseFloat( value ) * ( value.trim().endsWith( 'ms' ) ? 1 : 1000 ) );
			context.closeTimer = setTimeout( context.finishClose, Math.max( ...durations ) + 50 );
		}

		function isOutsidePanel( event ) {
			const bounds = context.panel.getBoundingClientRect();
			return event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom;
		}

		function rememberOutsidePointer( event ) {
			context.pointerStartedOutside = event.target === context.panel && context.isOutsidePanel( event );
		}

		function resetOutsidePointer() {
			context.pointerStartedOutside = false;
		}

		function dismissOutsideClick( event ) {
			if ( context.pointerStartedOutside && event.target === context.panel && context.isOutsidePanel( event ) ) {
				context.closePanel();
			}
			context.resetOutsidePointer();
		}

		function cancelPanel( event ) {
			event.preventDefault();
			context.closePanel();
		}

		function finishPanelTransition( event ) {
			if ( event.target === context.panel && 'transform' === event.propertyName ) {
				context.finishClose();
			}
		}

		function handlePanelClosed() {
			clearTimeout( context.closeTimer );
			delete context.panel.dataset.state;
			context.emit( 'close', {});
			if ( context.opener && context.opener.isConnected ) {
				context.opener.focus();
			} else {
				context.focusAvailableControl();
			}
		}

		function bindPanelEvents() {
			if ( ! context.panel ) {
				return;
			}
			context.listen( context.panel, 'pointerdown', context.rememberOutsidePointer );
			context.listen( context.panel, 'pointercancel', context.resetOutsidePointer );
			context.listen( context.panel, 'click', context.dismissOutsideClick );
			context.listen( context.panel, 'cancel', context.cancelPanel );
			context.listen( context.panel, 'transitionend', context.finishPanelTransition );
			context.listen( context.panel, 'close', context.handlePanelClosed );
			context.delegate( 'click', '[data-close]', context.closePanel );
		}

		// Controls request data actions; Forminator owns result rendering and exports.

		Object.assign( context, {
			setSubmission,
			openPanel,
			finishClose,
			closePanel,
			isOutsidePanel,
			rememberOutsidePointer,
			resetOutsidePointer,
			dismissOutsideClick,
			cancelPanel,
			finishPanelTransition,
			handlePanelClosed,
			bindPanelEvents
		});
	};
}() );
