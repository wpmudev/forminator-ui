( function( $ ) {

	$( 'body' ).ready( function() {

		$( '.forminator-custom-form' ).each( function() {

			var $form       = $( this ),
				$isValid    = ( true === $form.data( 'sample' ) ),
				$isInput    = ( 'input' === $form.data( 'element' ) || 'input-with-icon' === $form.data( 'element' ) ),
				$isTextarea = ( 'textarea' === $form.data( 'element' ) )
				;

			var $isElement = [
				'input',
				'input-with-icon',
				'textarea',
				'select',
				'select2',
				'radio',
				'checkbox',
				'multiselect',
				'fileupload',
				'submit'
			];

			// Get form design
			if ( typeof $form.data( 'design' ) !== undefined ) {
				$form.addClass( 'forminator-design--' + $form.data( 'design' ) );
			}

			// Get template
			$.each( $isElement, function( index, $element ) {

				var $template = $( '#forminator-form-element-tpl--' + $element ).html();

				if ( $isValid && ( $element === $form.data( 'element' ) ) ) {
					$form.append( '<div class="forminator-row">' + $template + '</div>' );
				}
			});

			// SAMPLE: Input field
			if ( $isValid && $isInput ) {

				// Validation (on focus)
				$form.find( '.forminator-input' ).blur( function( e ) {

					if ( '' === $( this ).val().trim() ) {
						$( this ).closest( '.forminator-field' ).addClass( 'forminator-has_error' );
					}

					e.stopPropagation();

				});

				// Validation (on change)
				$form.find( '.forminator-input' ).change( function( e ) {

					if ( '' === $( this ).val().trim() ) {
						$( this ).closest( '.forminator-field' ).addClass( 'forminator-has_error' );
					}

					e.stopPropagation();

				});
			}

			// SAMPLE: Textarea field
			if ( $isValid && $isTextarea ) {

				// Validation (on focus)
				$form.find( '.forminator-textarea' ).blur( function( e ) {

					if ( '' === $( this ).val().trim() ) {
						$( this ).closest( '.forminator-field' ).addClass( 'forminator-has_error' );
					}

					e.stopPropagation();

				});

				// Validation (on change)
				$form.find( '.forminator-textarea' ).change( function( e ) {

					if ( '' === $( this ).val().trim() ) {
						$( this ).closest( '.forminator-field' ).addClass( 'forminator-has_error' );
					}

					e.stopPropagation();

				});
			}
		});

	});

	$( 'body' ).on( 'click', '.design-samples .options-menu .option', function( e ) {

		var $option  = $( this ),
			$value   = $option.find( 'input' ).val(),
			$parent  = $option.closest( '.options' ),
			$form    = $parent.find( '.forminator-custom-form' ),
			$element = $form.data( 'element' )
			;

		var $designs = [
			'default',
			'flat',
			'bold',
			'material'
		];

		var $elements = [
			'input',
			'textarea'
		];

		// Reset
		$.each( $designs, function( index, $design ) {
			$form.removeClass( 'forminator-design--' + $design );
		});

		$form.addClass( 'forminator-design--' + $value );

		// MATERIAL UI: Mount
		if ( 'material' === $value ) {

			$.each( $elements, function( index, $field ) {

				var $wrapper = 'forminator-' + $field + '--wrap',
					$label   = 'forminator-floating--' + $field
					;

				if ( $field === $element && ! $form.find( '.' + $wrapper ).length ) {
					$form.find( '.forminator-label' ).addClass( $label );
					$form.find( '.forminator-' + $field ).wrap( '<div class="' + $wrapper + '" />' );
				}
			});

			if ( 'input-with-icon' === $element && ! $form.find( '.forminator-input--wrap' ).length ) {
				$form.find( '.forminator-label' ).addClass( 'forminator-floating--input forminator-has_icon' );
				$form.find( '.forminator-input' ).wrap( '<div class="forminator-input--wrap" />' );
			}
		}

		// MATERIAL UI: Unmount
		if ( 'material' !== $value ) {

			$.each( $elements, function( index, $field ) {

				var $object  = $form.find( '.forminator-' + $field ),
					$wrapper = 'forminator-' + $field + '--wrap',
					$label   = 'forminator-floating--' + $field
					;

				if ( $field === $element && $object.parent().hasClass( $wrapper ) ) {
					$form.find( '.forminator-label' ).removeClass( $label );
					$object.unwrap();
				}
			});
		}
	});

	$( 'body' ).ready( function() {

		var $calClass;

		var $themes = [
			'bold',
			'flat',
			'default',
			'material'
		];

		$.each( $themes, function( index, $theme ) {

			if ( $( '.forminator-date' ).closest( '.forminator-custom-form' ).hasClass( 'forminator-design--' + $theme ) ) {
				$calClass = 'forminator-calendar--' + $theme;
			}
		});

		if ( $( '.forminator-input' ).hasClass( 'forminator-date' ) ) {

			$( '.forminator-date' ).datepicker({
				beforeShow: function( input, inst ) {
					( inst.dpDiv ).addClass( $calClass );
				},
				changeMonth: true,
				changeYear: true
			});

			// Validation (on focus)
			$( '.forminator-date' ).blur( function( e ) {

				if ( '' === $( this ).val().trim() ) {
					$( this ).closest( '.forminator-field' ).addClass( 'forminator-has_error' );
				}

				e.stopPropagation();

			});

			// Validation (on change)
			$( '.forminator-date' ).change( function( e ) {

				if ( '' === $( this ).val().trim() ) {
					$( this ).closest( '.forminator-field' ).addClass( 'forminator-has_error' );
				}

				e.stopPropagation();

			});
		}
	});

}( jQuery ) );
