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
			var $sliderLimit = $element.find( '.forminator-slider-limit' );

			// Check if it's a range slider
			var $isRange = $slide.data( 'is-range' );

			// Parse integer values from data attributes with error handling
			var $minRange = parseFloat( $slide.data( 'min' ) ) || 0;
			var $maxRange = parseFloat( $slide.data( 'max' ) ) || 100;
			var $value = parseFloat( $slide.data( 'value' ) ) || $minRange;
			var $valueMax = parseFloat( $slide.data( 'value-max' ) ) || $maxRange;
			var $step = parseFloat( $slide.data( 'step' ) ) || 1;
			var $sliderValueWrapper = $element.find( '.forminator-slider-amount' );

			// Get the label associated with this slider
			var $label = $( 'label[for="' + $input.attr( 'id' ) + '"]' );

			// Check if slider is already intialised.
			if ( true === $slide.data( 'init' ) ) {
				return;
			}

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

					// add data-attribute to check intialization.
					$slide.data( 'init', true );

					$sliderValueWrapper.find( '.forminator-slider-hidden-min' ).val( $value ).change();

					if ( $isRange ) {
						$sliderValueWrapper.find( '.forminator-slider-hidden-max' ).val( $valueMax ).change();
					}

					// Generate slider labels.
					generateSliderLabels( $sliderLimit, $minRange, $maxRange, $step );

					// Create the UI with the formatted values.
					updateSliderValues( $element, $formattedValue, $formattedValueMax, $value, $valueMax );
				},
				slide: function( event, ui ) {

					// Format the slider values using the template
					var $value = $isRange ? ui.values[0] : ui.value;
					var $valueMax = $isRange ? ui.values[1] : null;
					var $formattedValue = valueTemplate( $element, $value );
					var $formattedValueMax = $isRange ? valueTemplate( $element, $valueMax ) : null;

					// Update the UI with the formatted values
					updateSliderValues( $element, $formattedValue, $formattedValueMax, $value, $valueMax );
				},
				stop: function( event, ui ) {

					// Format the slider values using the template
					var $value = $isRange ? ui.values[0] : ui.value;
					var $valueMax = $isRange ? ui.values[1] : null;

					if ( ui.handle === $element.find( '.ui-slider-handle' )[0]) {
						$sliderValueWrapper.find( '.forminator-slider-hidden-min' ).val( $value ).change();
					} else if ( ui.handle === $element.find( '.ui-slider-handle' )[1]) {
						$sliderValueWrapper.find( '.forminator-slider-hidden-max' ).val( $valueMax ).change();
					} else {
						$sliderValueWrapper.find( '.forminator-slider-hidden-min' ).val( $value ).change();
					}
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

		// Function to generate slider labels
		function generateSliderLabels( $sliderLimit, $minRange, $maxRange, $step ) {
			if ( ! $sliderLimit.length ) {
				return;
			}

			let showAllLabels = 'all' === $sliderLimit.data( 'step-type' );

			$sliderLimit.empty(); // Clear existing labels
			$sliderLimit.css({
				position: 'relative',
				height: '22px'
			});
			for ( let $i = $minRange; $i <= $maxRange; $i += $step ) {

				// If not showing all labels, only show first and last
				if ( ! showAllLabels && $i !== $minRange && $i !== $maxRange ) {
					continue;
				}

				let percent = ( ( $i - $minRange ) / ( $maxRange - $minRange ) ) * 100;
				let className = 'forminator-slider-limit-between'; // Default class

				// Assign specific classes for first and last labels
				if ( $i === $minRange ) {
					className = 'forminator-slider-limit-min';
				} else if ( $i === $maxRange ) {
					className = 'forminator-slider-limit-max';
				}

				let label = $( '<span class="' + className + '">' + $i + '</span>' ).css({
					left: percent + '%',
					position: 'absolute'
				});

				// Remove transform for the first and last label
				if ( $i !== $minRange && $i !== $maxRange ) {
					label.css( 'transform', 'translateX(-50%)' );
				} else if ( $i === $maxRange ) {
					label.css( 'transform', 'translateX(-80%)' );
				}

				$sliderLimit.append( label );
			}
		}

		// Function to format the slider value using the template
		function valueTemplate( $element, $sliderValue ) {
			var $sliderValueWrapper = $element.find( '.forminator-slider-amount' );
			var $sliderValueTemplate = $sliderValueWrapper.data( 'value-template' ) || '{slider-value}';
			return $sliderValueTemplate.replace( '{slider-value}', '<span class="forminator-slider-value">' + $( '<div>' ).text( $sliderValue ).html() + '</span>' );
		}

		// Function to update the UI with the formatted values
		function updateSliderValues( $element, $formattedValue, $formattedValueMax, $value, $valueMax ) {
			var $sliderValueWrapper = $element.find( '.forminator-slider-amount' );
			var $slide = $element.find( '.forminator-slide' );
			var $isRange = $slide.data( 'is-range' );

			$sliderValueWrapper.find( '.forminator-slider-value-min' ).html( $formattedValue );

			if ( $isRange ) {
				if ( $value === $valueMax ) {
					$sliderValueWrapper.find( '.forminator-slider-separator' ).hide();
					$sliderValueWrapper.find( '.forminator-slider-value-max' ).html( '' );
				} else {
					$sliderValueWrapper.find( '.forminator-slider-separator' ).show();
					$sliderValueWrapper.find( '.forminator-slider-value-max' ).html( $formattedValueMax );
				}
			}
		}

	};
}( jQuery ) );
