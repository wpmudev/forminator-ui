( function() {
	'use strict';

	if ( 'object' !== typeof window.FUI ) {
		window.FUI = {};
	}

	FUI.utils = FUI.utils || {};

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

	FUI.utils.getSafeUrl = getSafeUrl;
}() );
