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

			// Parse integer values from data attributes with error handling
			var minRange = parseInt( $element.data( 'min' ) );
			var maxRange = parseInt( $element.data( 'max' ) );
			var value = parseInt( $element.data( 'value' ) );
			var valueMax = parseInt( $element.data( 'value-max' ) );
			var step = parseInt( $element.data( 'step' ) );

			// Check for valid integer values obtained from data attributes
			// If any value is not a number, use default values or handle errors appropriately
			minRange = isNaN( minRange ) ? 0 : minRange;
			maxRange = isNaN( maxRange ) ? 100 : maxRange;
			value = isNaN( value ) ? minRange : value;
			valueMax = isNaN( valueMax ) ? maxRange : valueMax;
			step = isNaN( step ) ? 1 : step;

			$element.slider({
				range: isRange ? true : 'min',
				min: minRange,
				max: maxRange,
				step: step,
				...( isRange ? { values: [ value, valueMax ] } : { value: value })

				// Add comments to clarify the purpose of the commented-out section
				// slide: function( event, ui ) {
				//     $( '#amount' ).text( '$' + ui.values[ 0 ] + ' - $' + ui.values[ 1 ]);
				// }
			});
		});

	};
}( jQuery ) );
