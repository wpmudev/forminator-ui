( function() {
	'use strict';

	if ( 'object' !== typeof window.FUI ) {
		window.FUI = {};
	}

	FUI._submissionViews = FUI._submissionViews || {};
	FUI._submissionViews.feedback = function( context ) {

		// Keep the intended state separate from the temporary loading disabled state.
		function setControlDisabled( control, disabled ) {
			if ( context.loading ) {
				context.loadingControls.set( control, disabled );
				control.disabled = true;
			} else {
				control.disabled = disabled;
			}
		}

		function syncLoadingRegions() {

			// Release detached AJAX content instead of retaining disabled old controls.
			context.loadingRegions.forEach( function( inert, region ) {
				if ( ! context.view.contains( region ) ) {
					if ( null === inert ) {
						region.removeAttribute( 'inert' );
					} else {
						region.setAttribute( 'inert', inert );
					}
					context.loadingRegions.delete( region );
				}
			});
			context.loadingControls.forEach( function( disabled, control ) {
				if ( ! context.view.contains( control ) ) {
					control.disabled = disabled;
					context.loadingControls.delete( control );
				}
			});
			context.view.querySelectorAll( context.selector + 'toolbar, ' + context.selector + 'frame, ' + context.selector + 'footer' ).forEach( function( region ) {
				if ( ! context.loadingRegions.has( region ) ) {
					context.loadingRegions.set( region, region.getAttribute( 'inert' ) );
				}
				region.setAttribute( 'inert', '' );
				region.querySelectorAll( 'button, input, select, textarea, fieldset' ).forEach( function( control ) {
					if ( ! context.loadingControls.has( control ) ) {
						context.loadingControls.set( control, control.disabled );
					}
					control.disabled = true;
				});
			});
		}

		/** Render either notice through the same validation and sanitization path. */
		function setNotice( value, selector ) {
			if ( context.destroyed ) {
				return false;
			}
			const details = value && 'object' === typeof value && ! Array.isArray( value ) ? value : {
				message: value
			};
			if ( null !== details.message && 'string' !== typeof details.message ) {
				return false;
			}
			const text = null === details.message ? '' : details.message.trim();
			const link = details.link;
			if ( undefined !== link && ( ! text || ! link || 'object' !== typeof link || Array.isArray( link ) || 'string' !== typeof link.url || 'string' !== typeof link.label || ! link.label.trim() || undefined !== link.newTab && 'boolean' !== typeof link.newTab ) ) {
				return false;
			}
			const alert = context.view.querySelector( selector );
			if ( ! alert ) {
				return false;
			}
			if ( 'string' === typeof value ) {
				const content = FUI.utils.renderNoticeHtml( text, 'forminator-submission-views__alert-link' );
				alert.hidden = ! content.textContent.trim();
				alert.replaceChildren( content );
				return true;
			}
			alert.hidden = ! text;
			alert.textContent = text;
			if ( link ) {
				alert.appendChild( document.createTextNode( ' ' ) );
				const href = FUI.utils.getSafeUrl( link.url );
				if ( href ) {
					const anchor = document.createElement( 'a' );
					anchor.className = 'forminator-submission-views__alert-link';
					anchor.href = href;
					anchor.textContent = link.label;
					if ( true === link.newTab ) {
						anchor.target = '_blank';
						anchor.rel = 'noopener noreferrer';
					}
					alert.appendChild( anchor );
				} else {
					alert.appendChild( document.createTextNode( link.label ) );
				}
			}
			return true;
		}

		function setError( value ) {
			return setNotice( value, '[data-view-error]' );
		}

		function setSuccess( value ) {
			return setNotice( value, '[data-view-success]' );
		}

		/** Temporarily disable table controls while the integration updates data. */

		/** Temporarily disable table controls while the integration updates data. */
		function setLoading( value ) {
			if ( context.destroyed || 'boolean' !== typeof value || value && ! context.loader ) {
				return false;
			}
			if ( context.loading === value ) {
				return true;
			}
			context.loading = value;
			context.view.classList.toggle( context.loadingClass, context.loading );
			if ( context.loading ) {
				context.setColumnOptionsOpen( false, false );
				context.stopResizing();
				context.loadingFocus = document.activeElement;
				context.view.setAttribute( 'aria-busy', 'true' );
				context.loader.hidden = false;
				if ( context.loadingFocus && context.loadingFocus.closest( context.selector + 'toolbar, ' + context.selector + 'frame, ' + context.selector + 'footer' ) ) {
					context.loader.focus({
						preventScroll: true
					});
				}
				context.syncLoadingRegions();
			} else {
				context.loadingRegions.forEach( function( inert, region ) {
					if ( null === inert ) {
						region.removeAttribute( 'inert' );
					} else {
						region.setAttribute( 'inert', inert );
					}
				});
				context.loadingRegions.clear();
				context.loadingControls.forEach( function( disabled, control ) {
					control.disabled = disabled;
				});
				context.loadingControls.clear();
				if ( null === context.originalBusy ) {
					context.view.removeAttribute( 'aria-busy' );
				} else {
					context.view.setAttribute( 'aria-busy', context.originalBusy );
				}
				if ( document.activeElement === context.loader && context.loadingFocus && context.loadingFocus.isConnected ) {
					context.loadingFocus.focus({
						preventScroll: true
					});
				}
				context.loader.hidden = true;
				context.loadingFocus = null;
			}
			return true;
		}

		// Shared event helpers. Every registered listener is removed on destroy.

		Object.assign( context, {
			setControlDisabled,
			syncLoadingRegions,
			setError,
			setSuccess,
			setLoading
		});
	};
}() );
