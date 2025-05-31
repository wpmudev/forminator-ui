( function( $ ) {

    // Enable strict mode
    'use strict';

	// Flag to track if events are already bound
    var eventsBound = false;

    // Define global FUI object if it doesn't exist.
    if ( 'object' !== typeof window.FUI ) {
        window.FUI = {};
    }

    FUI.rating = function( rating ) {
        function init() {
			var $rating = rating;
			$rating.each( function() {
				var $element = $( this ),
					i;

				// Get the id
				var id = $element.attr( 'id' );

				// Get the number of options, excluding the first placeholder option
				var $options = $element.find( 'option' ).not( ':disabled' );
				var numOptions = $options.length;

				// Get the icon type from the data-type attribute
				var iconType = $element.attr( 'data-type' ) || 'star';

				// Get the icon type from the data-type attribute
				var iconSize = $element.attr( 'data-size' ) || 'md';

				// Calculate the selected value.
				var selectedValue = Number( $element.find( 'option:selected' ).val() ) || 0;

				// Create the wrapper element
				var $wrapper = $( '<div class="forminator-rating-wrapper"></div>' );

				// Create the rating items container
				var $ratingItemsContainer = $( '<span></span>' )
					.attr( 'data-id', id )
					.attr( 'data-selected-value', selectedValue )
					.addClass( 'forminator-rating-items' )
					.addClass( 'forminator-rating-' + iconSize.replace( /[^a-z0-9_-]/gi, '' ) );

				// Intialized
				var isInitialized = $element.attr( 'data-init' ) || 'false';

				if ( 'true' === isInitialized ) {
					$element.next( '.forminator-rating-wrapper' ).remove();
				}

				// Add the rating items to the container based on the number of options
				for ( i = 0; i < numOptions; i++ ) {
					let optionValue = Number( $options.eq( i ).val() );
					let itemClass = optionValue <= selectedValue ? 'forminator-rating-item forminator-rating-selected' : 'forminator-rating-item';
					$ratingItemsContainer.append(
						'<span class="' + itemClass + '" data-value="' + optionValue + '">' +
							'<i class="forminator-icon-' + iconType + '" aria-hidden="true"></i>' +
						'</span>'
					);
				}

				// Add selected-value and total-value in select.
				$element.attr( 'data-selected-value', selectedValue );
				$element.attr( 'data-total-value', numOptions );

				// Append the rating items container to the wrapper
				$wrapper.append( $ratingItemsContainer );

				// Check if data-suffix is true
				if ( 'true' === $element.attr( 'data-suffix' ) ) {

					// Add the suffix span
					$ratingItemsContainer.append(
						'<span class="forminator-rating-suffix">(' + selectedValue + '/' + numOptions + ')</span>'
					);
				}

				// Insert the wrapper after the select element
				$element.after( $wrapper );

				$element.attr( 'data-init', 'true' );

				// Add change event inside the rating field initialization
                $element.on( 'change', function() {
                    var value = Number( $( this ).val() ) || 0;
                    var $container = $( '[data-id="' + id + '"]' );
                    var $suffix = $container.find( '.forminator-rating-suffix' );

                    $container.attr( 'data-selected-value', value );
                    $( this ).attr( 'data-selected-value', value );
                    $container.children().removeClass( 'forminator-rating-selected' );
                    $container.children().each( function() {
                        if ( $( this ).data( 'value' ) <= value ) {
                            $( this ).addClass( 'forminator-rating-selected' );
                        }
                    });

                    if ( $suffix.length ) {
                        $suffix.text( '(' + value + '/' + $container.children().not( '.forminator-rating-suffix' ).length + ')' );
                    }
                });
			});
        }

        // Init rating
        init();

		// Call rating field events if they are not already bound
		if ( ! eventsBound ) {
			FUI.rating.events();
			eventsBound = true; // Set the flag to indicate that events are bound
		}
    };

	FUI.rating.events = function( ) {
		$( document ).on( 'mouseenter', '.forminator-rating-item', function() {
			var $item = $( this );
			$item.siblings().removeClass( 'forminator-rating-selected' );
			$item.prevAll().addBack().addClass( 'forminator-rating-hover' );
		});

        $( document ).on( 'mouseleave', '.forminator-rating-item', function() {
			var $item = $( this );
			var $container = $item.closest( '.forminator-rating-items' );
			var id = $container.data( 'id' );
			var $select = $( '#' + id );
			var selectedValue = Number( $select.find( 'option:selected' ).val() );

			$item.prevAll().addBack().removeClass( 'forminator-rating-hover' );

			$item.siblings().addBack().each( function() {
				if ( $( this ).data( 'value' ) <= selectedValue ) {
					$( this ).addClass( 'forminator-rating-selected' );
				} else {
					$( this ).removeClass( 'forminator-rating-selected' );
				}
			});
		});

        $( document ).on( 'click', '.forminator-rating-item', function() {
			var $item = $( this ),
				value = Number( $item.data( 'value' ) ),
				$container = $item.closest( '.forminator-rating-items' ),
				id = $container.data( 'id' ),
				$select = $( '#' + id ),
				$suffix = $container.find( '.forminator-rating-suffix' );

			$select.val( value ).trigger( 'change' );
			$container.attr( 'data-selected-value', value );
			$select.attr( 'data-selected-value', value );
			$item.siblings().removeClass( 'forminator-rating-selected' );
			$item.prevAll().addBack().addClass( 'forminator-rating-selected' );

			if ( $suffix.length ) {
				$suffix.text( '(' + value + '/' + $container.children().not( '.forminator-rating-suffix' ).length + ')' );
			}
		});

        $( document ).on( 'focus', '.forminator-rating', function() {
			var $select = $( this ),
				$wrapper = $select.next( '.forminator-rating-wrapper' );

			$wrapper.addClass( 'forminator-rating-focused' );
		});

		$( document ).on( 'blur', '.forminator-rating', function() {
			var $select = $( this ),
				$wrapper = $select.next( '.forminator-rating-wrapper' );

			$wrapper.removeClass( 'forminator-rating-focused' );
		});

		$( document ).on( 'keydown', '.forminator-rating', function( e ) {
			var $select = $( this ),
				$options = $select.find( 'option' ),
				currentIndex = $options.index( $select.find( 'option:selected' ) );

			if ( 'ArrowUp' === e.key || 'ArrowRight' === e.key || 'ArrowDown' === e.key || 'ArrowLeft' === e.key ) {
				e.preventDefault();
			}

			if ( ( 'ArrowUp' === e.key || 'ArrowRight' === e.key ) && currentIndex < $options.length - 1 ) {
				$options.eq( currentIndex + 1 ).prop( 'selected', true ).trigger( 'change' );
			} else if ( ( 'ArrowDown' === e.key || 'ArrowLeft' === e.key ) && 0 < currentIndex ) {
				$options.eq( currentIndex - 1 ).prop( 'selected', true ).trigger( 'change' );
			}
		});

	};

}( jQuery ) );
