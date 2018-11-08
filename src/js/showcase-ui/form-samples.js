( function( $ ) {

	$( 'body' ).ready( function() {

		$( '.forminator-custom-form' ).each( function() {

			var $form       = $( this ),
				$isValid    = ( true === $form.data( 'sample' ) ),
				$isInput    = ( 'input' === $form.data( 'element' ) ),
				$isTextarea = ( 'textarea' === $form.data( 'element' ) )
				;

			var $tplInput    = $( '#forminator-form-element-tpl--input' ).html(),
				$tplInputReq = $( '#forminator-form-element-tpl--input-req' ).html()
				;

			var $tplTextarea    = $( '#forminator-form-element-tpl--textarea' ).html(),
				$tplTextareaReq = $( '#forminator-form-element-tpl--textarea-req' ).html()
				;

			// Get form design
			if ( typeof $form.data( 'design' ) !== undefined ) {
				$form.addClass( 'forminator-design--' + $form.data( 'design' ) );
			}

			// SAMPLE: Input field
			if ( $isValid && $isInput ) {
				$form.append( $tplInput );
				$form.append( $tplInputReq );
			}

			// SAMPLE: Textarea field
			if ( $isValid && $isTextarea ) {
				$form.append( $tplTextarea );
				$form.append( $tplTextareaReq );
			}
		});

	});

}( jQuery ) );
