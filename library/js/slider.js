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
			var $minRange = getSafeFloat( $slide.data( 'min' ), 0 );
			var $maxRange = getSafeFloat( $slide.data( 'max' ), 100 );
			var $value = getSafeFloat( $slide.data( 'value' ), $minRange );
			var $valueMax = getSafeFloat( $slide.data( 'value-max' ), $maxRange );
			var $step = getSafeFloat( $slide.data( 'step' ), 1 );
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
					var $sliderHandles = $( this ).find( '.ui-slider-handle' );

					// add data-attribute to check intialization.
					$slide.data( 'init', true );

					$sliderValueWrapper.find( '.forminator-slider-hidden-min' ).val( $value ).change();

					if ( $isRange ) {
						$sliderValueWrapper.find( '.forminator-slider-hidden-max' ).val( $valueMax ).change();
					}

					// Generate slider labels.
					generateSliderLabels( $sliderLimit, $minRange, $maxRange, $step );

					// Add custom labels if available.
					customSliderLabels( $sliderLimit, $slide );

					// Create the UI with the formatted values.
					updateSliderValues( $element, $formattedValue, $formattedValueMax, $value, $valueMax );

					// Update the slider handle attributes.
					$sliderHandles.each( function( index ) {
						const isFirst = 0 === index;
						const currentValue = isFirst ? $value : $valueMax;

						$( this ).attr({
							role: 'slider',
							'aria-valuemin': $minRange,
							'aria-valuemax': $maxRange,
							'aria-valuenow': currentValue,
							'aria-valuetext': currentValue
						});
					});
				},
				slide: function( event, ui ) {

					// Format the slider values using the template
					var $value = $isRange ? ui.values[0] : ui.value;
					var $valueMax = $isRange ? ui.values[1] : null;
					var $formattedValue = valueTemplate( $element, $value );
					var $formattedValueMax = $isRange ? valueTemplate( $element, $valueMax ) : null;
					var $sliderHandles = $( this ).find( '.ui-slider-handle' );

					// Update the UI with the formatted values
					updateSliderValues( $element, $formattedValue, $formattedValueMax, $value, $valueMax );

					// Update the slider handle attributes.
					if ( $isRange ) {
						$sliderHandles.eq( 0 ).attr({
							'aria-valuenow': ui.values[0],
							'aria-valuetext': ui.values[0]
						});
						$sliderHandles.eq( 1 ).attr({
							'aria-valuenow': ui.values[1],
							'aria-valuetext': ui.values[1]
						});
					} else {
						$sliderHandles.eq( 0 ).attr({
							'aria-valuenow': ui.value,
							'aria-valuetext': ui.value
						});
					}
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

				let totalSteps = Math.floor( ( $maxRange - $minRange ) / $step );
				let currentStep = Math.floor( ( $i - $minRange ) / $step );
				let percent = ( currentStep / totalSteps ) * 100;
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

				label.css( 'transform', 'translateX(-50%)' );

				$sliderLimit.append( label );
			}
		}

		// Function for custom slider labels
		function customSliderLabels( $sliderLimit, $slide ) {
			const minLabel = sanitize( $slide.data( 'min-label' ) || '' );
			const maxLabel = sanitize( $slide.data( 'max-label' ) || '' );

			// Safe: text() escapes potentially dangerous characters.
			const $minLabelSpan = $( '<span class="forminator-slider-label-min"></span>' ).text( minLabel );
			const $maxLabelSpan = $( '<span class="forminator-slider-label-max"></span>' ).text( maxLabel );

			const $labelWrapper = $( '<div class="forminator-slider-labels"></div>' )
				.append( $minLabelSpan )
				.append( $maxLabelSpan );

			if ( $sliderLimit.length && $sliderLimit.prev( '.forminator-slide' ).length ) {
				$sliderLimit.after( $labelWrapper );
			} else if ( $sliderLimit.length && $sliderLimit.next( '.forminator-slide' ).length ) {
				$sliderLimit.before( $labelWrapper );
			}
		}

		// Function to format the slider value using the template
		function valueTemplate( $element, $sliderValue ) {
			var $sliderValueWrapper = $element.find( '.forminator-slider-amount' );
			var $sliderValueTemplate = sanitize( $sliderValueWrapper.data( 'value-template' ) || '{slider-value}' );
			return $sliderValueTemplate.replace( '{slider-value}', '<span class="forminator-slider-value">' + sanitize( String( $sliderValue ) ) + '</span>' );
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

		// function to get int value safely from data attr.
		function getSafeFloat( value, defaultValue ) {
			var parsedValue = parseFloat( value, 10 );
			return isNaN( parsedValue ) ? defaultValue : parsedValue;
		}

		// function to sanitize the data values.
		function sanitize( template ) {
			if ( 'string' !== typeof template ) {
				return '';
			}

			// Sanitize values.
			return template
				.replace( /&/g, '&amp;' )
				.replace( /</g, '&lt;' )
				.replace( />/g, '&gt;' )
				.replace( /"/g, '&quot;' )
				.replace( /'/g, '&#039;' );
		}

	};
}( jQuery ) );
