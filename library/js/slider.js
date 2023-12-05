( function( $ ) {

	// Enable strict mode
	'use strict';

	// Define global FUI object if it doesn't exist.
	if ( 'object' !== typeof window.FUI ) {
		window.FUI = {};
	}

	FUI.slider = function() {

		$( '.forminator-slider' ).each( function() {

			var $element = $( this );
			var isRange = $element.data( 'is-range' );
			var minRange = parseInt( $element.data( 'min' ) );
			var maxRange = parseInt( $element.data( 'max' ) );
			var value = parseInt( $element.data( 'value' ) );
			var valueMax = parseInt( $element.data( 'value-max' ) );
			var step = parseInt( $element.data( 'step' ) );

			$element.slider({
				range: isRange ? true : 'min',
				min: minRange,
				max: maxRange,
				...( step && { step: step }),
				...( isRange ? { values: [ value, valueMax ] } : { value: value })

				// slide: function( event, ui ) {
				// 	$( '#amount' ).text( '$' + ui.values[ 0 ] + ' - $' + ui.values[ 1 ]);
				// }
			});
		});
	};
}( jQuery ) );
