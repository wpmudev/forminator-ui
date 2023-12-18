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
			var $slide = $element.find( '.forminator-slide' );
			var $input = $element.find( '.forminator-hidden-input' );
			var $disabled = $element.hasClass( 'forminator-disabled' );

			// Check if it's a range slider
			var $isRange = $slide.data( 'is-range' );

			// Parse integer values from data attributes with error handling
			var $minRange = parseInt( $slide.data( 'min' ) ) || 0;
			var $maxRange = parseInt( $slide.data( 'max' ) ) || 100;
			var $value = parseInt( $slide.data( 'value' ) ) || $minRange;
			var $valueMax = parseInt( $slide.data( 'value-max' ) ) || $maxRange;
			var $step = parseInt( $slide.data( 'step' ) ) || 1;

			// Get the label associated with this slider
			var $label = $( 'label[for="' + $input.attr( 'id' ) + '"]' );

			// Initialize the slider with the parsed values
			$slide.slider({
				range: $isRange ? true : 'min',
				min: $minRange,
				max: $maxRange,
				disabled: $disabled,
				step: $step,
				...( $isRange ? { values: [ $value, $valueMax ] } : { value: $value }),
				create: function( event, ui ) {

					// Format the slider values using the template
					var $formattedValue = valueTemplate( $element, $value );
					var $formattedValueMax = $isRange ? valueTemplate( $element, $valueMax ) : null;

					// Create the UI with the formatted values
					updateSliderValues( $element, ui, $formattedValue, $formattedValueMax, $value, $valueMax );
				},
				slide: function( event, ui ) {

					// Format the slider values using the template
					var $value = $isRange ? ui.values[0] : ui.value;
					var $valueMax = $isRange ? ui.values[1] : null;
					var $formattedValue = valueTemplate( $element, $value );
					var $formattedValueMax = $isRange ? valueTemplate( $element, $valueMax ) : null;

					// Update the UI with the formatted values
					updateSliderValues( $element, ui, $formattedValue, $formattedValueMax, $value, $valueMax );
				}
			});

			// Add a click event listener to the label
			$label.on( 'click', function() {
				var $handles = $slide.find( '.ui-slider-handle' );

				if ( $disabled ) {
					return;
				}

				if ( $isRange && 1 < $handles.length ) {
					$( $handles[0]).focus(); // Focus on the first handle for range sliders
				} else {
					$handles.focus(); // Focus on the handle for single sliders
				}
			});
		});

		// Function to format the slider value using the template
		function valueTemplate( $element, $sliderValue ) {
			var $sliderValueWrapper = $element.find( '.forminator-slider-amount' );
			var $sliderValueTemplate = $sliderValueWrapper.data( 'value-template' ) || '{slider-value}';
			return $sliderValueTemplate.replace( '{slider-value}', '<span class="forminator-slider-value">' + $( '<div>' ).text( $sliderValue ).html() + '</span>' );
		}

		// Function to update the UI with the formatted values
		function updateSliderValues( $element, ui, $formattedValue, $formattedValueMax, $minValue, $maxValue ) {
			var $sliderValueWrapper = $element.find( '.forminator-slider-amount' );
			var $slide = $element.find( '.forminator-slide' );
			var $isRange = $slide.data( 'is-range' );

			$sliderValueWrapper.find( '.forminator-slider-value-min' ).html( $formattedValue );

			if ( $isRange ) {
				if ( $minValue === $maxValue ) {
					$sliderValueWrapper.find( '.forminator-slider-separator' ).hide();
					$sliderValueWrapper.find( '.forminator-slider-value-max' ).html( '' );
				} else {
					$sliderValueWrapper.find( '.forminator-slider-separator' ).show();
					$sliderValueWrapper.find( '.forminator-slider-value-max' ).html( $formattedValueMax );
				}

				if ( ui.handle === $element.find( '.ui-slider-handle' )[0]) {
					$sliderValueWrapper.find( '.forminator-slider-hidden-min' ).val( $minValue ).change();
				} else if ( ui.handle === $element.find( '.ui-slider-handle' )[1]) {
					$sliderValueWrapper.find( '.forminator-slider-hidden-max' ).val( $maxValue ).change();
				}
			} else {
				$sliderValueWrapper.find( '.forminator-slider-hidden-min' ).val( $minValue ).change();
			}
		}

	};
}( jQuery ) );
