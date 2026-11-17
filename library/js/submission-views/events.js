( function() {
	'use strict';

	if ( 'object' !== typeof window.FUI ) {
		window.FUI = {};
	}

	FUI._submissionViews = FUI._submissionViews || {};
	FUI._submissionViews.events = function( context ) {

		// Shared event helpers. Every registered listener is removed on destroy.
		function listen( target, type, handler, options ) {
			target.addEventListener( type, handler, options );
			context.listeners.push( () => target.removeEventListener( type, handler, options ) );
		}

		function delegate( type, targetSelector, handler ) {
			context.listen( context.view, type, event => {
				const target = event.target.closest( targetSelector );
				if ( target && target.closest( '.forminator-submission-views' ) === context.view ) {
					handler( event, target );
				}
			});
		}

		function emit( name, detail ) {
			return context.view.dispatchEvent( new CustomEvent( 'forminator:submission-views:' + name, {
				bubbles: true,
				cancelable: true,
				detail
			}) );
		}

		// Table layout and overflow.

		Object.assign( context, {
			listen,
			delegate,
			emit
		});
	};
}() );
