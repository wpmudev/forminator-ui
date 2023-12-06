( function( $ ) {

	// Enable strict mode
	'use strict';

	// Define global FUI object if it doesn't exist.
	if ( 'object' !== typeof window.FUI ) {
		window.FUI = {};
	}

	FUI.slider = function() {

		$( '.forminator-slider' ).each( function() {

			// Cache the current slider element
			var $element = $( this );

			// Check if it's a range slider
			var isRange = $element.data( 'is-range' );

			// Parse integer values from data attributes with error handling
			var minRange = parseInt( $element.data( 'min' ) ) || 0;
			var maxRange = parseInt( $element.data( 'max' ) ) || 100;
			var value = parseInt( $element.data( 'value' ) ) || minRange;
			var valueMax = parseInt( $element.data( 'value-max' ) ) || maxRange;
			var step = parseInt( $element.data( 'step' ) ) || 1;

			// Get slider value wrapper and template
			var sliderValueWrapper = $element.next( '.forminator-slider-amount' );
			var sliderValueTemplate = sliderValueWrapper.data( 'value-template' ) || '{slider-value}';

			// Initialize the slider with the parsed values
			$element.slider({
				range: isRange ? true : 'min',
				min: minRange,
				max: maxRange,
				step: step,
				...( isRange ? { values: [ value, valueMax ] } : { value: value }),

				slide: function( event, ui ) {

					// Format the slider values using the template
					var formattedValue = isRange ? valueTemplate( ui.values[0]) : valueTemplate( ui.value );
					var formattedValueMax = isRange ? valueTemplate( ui.values[1]) : null;

					// Update the UI with the formatted values
					updateSliderValues( formattedValue, formattedValueMax );
				}
			});

			// Function to format the slider value using the template
			function valueTemplate( sliderValue ) {
				return sliderValueTemplate.replace( '{slider-value}', sliderValue );
			}

			// Function to update the UI with the formatted values
			function updateSliderValues( minValue, maxValue ) {
				if ( isRange ) {
					sliderValueWrapper.find( '.forminator-slider-value-min' ).text( minValue );
					sliderValueWrapper.find( '.forminator-slider-value-max' ).text( maxValue );
				} else {
					sliderValueWrapper.text( minValue );
				}
			}
		});


	};
}( jQuery ) );
