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
			var $slide = $( this ).find( '.forminator-slide' );
			var $input = $( this ).find( '.forminator-hidden-input' );

			// Check if it's a range slider
			var isRange = $slide.data( 'is-range' );

			// Parse integer values from data attributes with error handling
			var minRange = parseInt( $slide.data( 'min' ) ) || 0;
			var maxRange = parseInt( $slide.data( 'max' ) ) || 100;
			var value = parseInt( $slide.data( 'value' ) ) || minRange;
			var valueMax = parseInt( $slide.data( 'value-max' ) ) || maxRange;
			var step = parseInt( $slide.data( 'step' ) ) || 1;

			// Get slider value wrapper and template
			var sliderValueWrapper = $element.find( '.forminator-slider-amount' );
			var sliderValueTemplate = sliderValueWrapper.data( 'value-template' ) || '{slider-value}';

			// Get the label associated with this slider
			var $label = $( 'label[for="' + $input.attr( 'id' ) + '"]' );

			// Initialize the slider with the parsed values
			$slide.slider({
				range: isRange ? true : 'min',
				min: minRange,
				max: maxRange,
				step: step,
				...( isRange ? { values: [ value, valueMax ] } : { value: value }),
				create: function( event, ui ) {

					// Format the slider values using the template
					var formattedValue = valueTemplate( value );
					var formattedValueMax = isRange ? valueTemplate( valueMax ) : null;

					// Update the UI with the formatted values
					updateSliderValues( formattedValue, formattedValueMax, value, valueMax );
				},
				slide: function( event, ui ) {

					// Format the slider values using the template
					var value = isRange ? ui.values[0] : ui.value;
					var valueMax = isRange ? ui.values[1] : null;
					var formattedValue = valueTemplate( value );
					var formattedValueMax = isRange ? valueTemplate( valueMax ) : null;

					// Update the UI with the formatted values
					updateSliderValues( formattedValue, formattedValueMax, value, valueMax );
				}
			});

			// Add a click event listener to the label
			$label.on( 'click', function() {
				var handles = $slide.find( '.ui-slider-handle' );
				if ( isRange && 1 < handles.length ) {
					$( handles[0]).focus(); // Focus on the first handle for range sliders
				} else {
					handles.focus(); // Focus on the handle for single sliders
				}
			});

			// Function to format the slider value using the template
			function valueTemplate( sliderValue ) {
				return sliderValueTemplate.replace( '{slider-value}', '<span class="forminator-slider-value">' + $( '<div>' ).text( sliderValue ).html() + '</span>' );
			}

			// Function to update the UI with the formatted values
			function updateSliderValues( formattedValue, formattedValueMax, minValue, maxValue ) {
				if ( isRange ) {
					if ( minValue === maxValue ) {
						sliderValueWrapper.find( '.forminator-slider-value-min' ).html( formattedValue );
						sliderValueWrapper.find( '.forminator-slider-value-max' ).html( '' );
					} else {
						sliderValueWrapper.find( '.forminator-slider-value-min' ).html( formattedValue + ' - ' );
						sliderValueWrapper.find( '.forminator-slider-value-max' ).html( formattedValueMax );
					}
					sliderValueWrapper.find( '.forminator-slider-hidden-min' ).val( minValue );
					sliderValueWrapper.find( '.forminator-slider-hidden-max' ).val( maxValue );
				} else {
					sliderValueWrapper.find( '.forminator-slider-value-min' ).html( formattedValue );
					sliderValueWrapper.find( '.forminator-slider-hidden-min' ).val( minValue );
				}
			}
		});
	};
}( jQuery ) );
