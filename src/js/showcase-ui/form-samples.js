( function( $ ) {

	$( 'body' ).ready( function() {

		$( '.forminator-custom-form' ).each( function() {

			var $form = $( this ),
				$isValid = ( true === $form.data( 'sample' ) ),
				$isInput = ( 'input' === $form.data( 'element' ) )
				;

			var $sampleInput   = $( '.forminator-custom-form[data-element="input"]' ),
				$simpleInput   = '<div class="forminator-row">' +
					'<div class="forminator-col">' +
						'<div class="forminator-field">' +
							'<label class="forminator-label">Field label</label>' +
							'<input placeholder="Placeholder"' +
								'size="1"' +
								'class="forminator-input" />' +
							'<span class="forminator-description">Description for input field.</span>' +
						'</div>' +
					'</div>' +
				'</div>',
				$requiredInput = '<div class="forminator-row">' +
					'<div class="forminator-col">' +
						'<div class="forminator-field">' +
							'<label class="forminator-label">Required field <span class="forminator-required">*</span></label>' +
							'<input placeholder="Placeholder"' +
								'size="1"' +
								'class="forminator-input" />' +
							'<span className="forminator-error-message">This field is required.</span>' +
							'<span class="forminator-description">Description for input field.</span>' +
						'</div>' +
					'</div>' +
				'</div>'
				;

			// SAMPLE: Input field
			if ( $isValid && $isInput ) {
				$sampleInput.append( $simpleInput );
				$sampleInput.append( $requiredInput );
			}
		});

	});

}( jQuery ) );
