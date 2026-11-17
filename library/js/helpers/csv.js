( function() {
	'use strict';

	if ( 'object' !== typeof window.FUI ) {
		window.FUI = {};
	}

	FUI.utils = FUI.utils || {};
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

	FUI.utils.quoteCsvValue = quoteCsvValue;
}() );
