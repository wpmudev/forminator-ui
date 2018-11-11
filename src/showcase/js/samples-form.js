( function( $ ) {

	$( 'body' ).ready( function() {

		$( '.forminator-custom-form' ).each( function() {

			var $form       = $( this ),
				$isValid    = ( true === $form.data( 'sample' ) ),
				$isInput    = ( 'input' === $form.data( 'element' ) ),
				$isTextarea = ( 'textarea' === $form.data( 'element' ) ),
				$isSelect   = ( 'select' === $form.data( 'element' ) )
				;

			var $tplInput    = $( '#forminator-form-element-tpl--input' ).html(),
				$tplTextarea = $( '#forminator-form-element-tpl--textarea' ).html(),
				$tplSelect   = $( '#forminator-form-element-tpl--select' ).html()
				;

			// Get form design
			if ( typeof $form.data( 'design' ) !== undefined ) {
				$form.addClass( 'forminator-design--' + $form.data( 'design' ) );
			}

			// SAMPLE: Input field
			if ( $isValid && $isInput ) {
				$form.append( '<div class="forminator-row">' + $tplInput + '</div>' );

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
				$form.append( '<div class="forminator-row">' + $tplTextarea + '</div>' );

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

			// SAMPLE: Select field
			if ( $isValid && $isSelect ) {
				$form.append( '<div class="forminator-row">' + $tplSelect + '</div>' );
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

}( jQuery ) );
