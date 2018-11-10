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

			// Apply changes for Material UI
			if ( ( typeof $form.data( 'design' ) !== undefined ) && ( 'material' === $form.data( 'design' ) ) ) {

				if ( $form.find( '.forminator-input' ).length ) {
					$form.find( '.forminator-label' ).addClass( 'forminator-floating--input' );
					$form.find( '.forminator-input' ).wrap( '<div class="forminator-input--wrap" />' );
				}

				if ( $form.find( '.forminator-textarea' ).length ) {
					$form.find( '.forminator-label' ).addClass( 'forminator-floating--textarea' );
					$form.find( '.forminator-textarea' ).wrap( '<div class="forminator-textarea--wrap" />' );
				}
			}
		});

	});

}( jQuery ) );
