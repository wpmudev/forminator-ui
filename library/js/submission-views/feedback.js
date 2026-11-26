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

		/** Clear the collection, including older one- or two-block markup. */
		function clearNotice() {
			if ( context.destroyed ) {
				return false;
			}
			const containers = context.view.querySelectorAll( '[data-view-notice], [data-view-error], [data-view-success]' );
			if ( ! containers.length ) {
				return false;
			}
			containers.forEach( function( container ) {
				container.hidden = true;
				container.textContent = '';
				container.classList.remove( 'forminator-submission-views__alert', 'forminator-submission-views__alert--success', 'forminator-submission-views__alert--neutral' );
				container.classList.add( 'forminator-submission-views__notices' );
				container.removeAttribute( 'role' );
				container.removeAttribute( 'aria-live' );
				container.removeAttribute( 'aria-atomic' );
			});
			return true;
		}

		/** Prepare safe content without changing any currently displayed notices. */
		function createNotice( value, type ) {
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
			const content = document.createDocumentFragment();
			if ( 'string' === typeof value ) {
				content.appendChild( FUI.utils.renderNoticeHtml( text, 'forminator-submission-views__alert-link' ) );
			} else {
				content.appendChild( document.createTextNode( text ) );
				if ( link ) {
					content.appendChild( document.createTextNode( ' ' ) );
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
						content.appendChild( anchor );
					} else {
						content.appendChild( document.createTextNode( link.label ) );
					}
				}
			}
			if ( ! content.textContent.trim() ) {
				return null;
			}
			const notice = document.createElement( 'div' );
			const error = 'error' === type;
			notice.className = 'forminator-submission-views__alert';
			notice.classList.toggle( 'forminator-submission-views__alert--success', 'success' === type );
			notice.classList.toggle( 'forminator-submission-views__alert--neutral', 'neutral' === type );
			notice.setAttribute( 'role', error ? 'alert' : 'status' );
			notice.setAttribute( 'aria-live', error ? 'assertive' : 'polite' );
			notice.setAttribute( 'aria-atomic', 'true' );
			notice.appendChild( content );
			return notice;
		}

		function renderNotices( items ) {
			if ( context.destroyed ) {
				return false;
			}
			const container = context.view.querySelector( '[data-view-notice]' ) || context.view.querySelector( '[data-view-error], [data-view-success]' );
			if ( ! container ) {
				return false;
			}
			const content = document.createDocumentFragment();
			for ( const item of items ) {
				const notice = createNotice( item.value, item.type );
				if ( false === notice ) {
					return false;
				}
				if ( notice ) {
					content.appendChild( notice );
				}
			}
			clearNotice();
			container.hidden = ! content.childNodes.length;
			container.appendChild( content );
			return true;
		}

		/** Replace the entire collection in the supplied order. */
		function setNotices( notices ) {
			if ( ! Array.isArray( notices ) ) {
				return false;
			}
			const items = [];
			for ( const notice of notices ) {
				if ( ! notice || 'object' !== typeof notice || Array.isArray( notice ) || 'string' !== typeof notice.message || ! [ 'error', 'success', 'neutral' ].includes( notice.type ) ) {
					return false;
				}
				items.push({
					type: notice.type,
					value: undefined === notice.link ? notice.message : { message: notice.message, link: notice.link }
				});
			}
			return renderNotices( items );
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
			clearNotice,
			setNotices,
			setLoading
		});
	};
}() );
