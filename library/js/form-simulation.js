( function( $ ) {

	'use strict';

	// Define global FUI object if it doesn't exist.
	if ( 'object' !== typeof window.FUI ) {
		window.FUI = {};
	}

	FUI.formSimulation = function( el ) {

		const submit = $( el );
		const form = submit.closest( 'form' );
		const response = form.find( '.forminator-response-message' );

		let message = '';

		if ( ! form.is( '.forminator-ui' ) && ! form.is( '.forminator-custom-form' ) ) {
			return;
		}

		function validateReset() {

			message = '';

			// Empty response
			response.html( message );

			// Hide response
			response.removeClass( 'forminator-show' );
			response.removeClass( 'forminator-accessible' );

			// Clear out response type
			response.removeClass( 'forminator-error' );
			response.removeClass( 'forminator-success' );

			// Hide response for screen readers
			response.attr( 'aria-hidden', 'true' );
			response.removeAttr( 'tabindex' );

			// Remove error class from fields
			form.find( '.forminator-field' ).removeClass( 'forminator-has_error' );

		}

		function validateError() {

			// Show response
			response.addClass( 'forminator-accessible' );

			// Show response for screen readers
			response.removeAttr( 'aria-hidden' );
			response.prop( 'tabindex', '-1' );

			// Focus message
			response.focus();

		}

		function validateSuccess() {

			message = '<p role="alert">Form was submitted successfully.</p>';

			// Print message
			response.html( message );

			// Show response
			response.addClass( 'forminator-success' );
			response.addClass( 'forminator-show' );

			// Show response for screen readers
			response.removeAttr( 'aria-hidden' );
			response.prop( 'tabindex', '-1' );

			// Focus message
			response.focus();

		}

		function validateInput() {

			const input = form.find( '.forminator-input' );

			input.each( function() {

				const current = $( this );
				const inputField = current.closest( '.forminator-field' );
				const inputLabel = inputField.find( '.forminator-label' );

				if ( inputField.hasClass( 'forminator-is_required' ) && '' === current.val() ) {

					inputField.addClass( 'forminator-has_error' );

					if ( inputLabel.length ) {
						message += '<li>' + inputLabel.text() + ' needs to be filled.</li>';
					} else {
						message += '<li>' + current.prop( 'id' ) + ' needs to be filled.</li>';
					}
				}
			});

			// Print message
			response.html( message );
		}

		function validateTextarea() {

			const textarea = form.find( '.forminator-textarea' );

			textarea.each( function() {

				const current = $( this );
				const textareaField = current.closest( '.forminator-field' );
				const textareaLabel = textareaField.find( '.forminator-label' );

				if ( textareaField.hasClass( 'forminator-is_required' ) && '' === current.val() ) {

					textareaField.addClass( 'forminator-has_error' );

					if ( textareaLabel.length ) {
						message += '<li>' + textareaLabel.text() + ' needs to be filled.</li>';
					} else {
						message += '<li>' + current.prop( 'id' ) + ' needs to be filled.</li>';
					}
				}
			});

			// Print message
			response.html( message );
		}

		function validateRadio() {

			const radioField = form.find( '.forminator-field-radio' );

			radioField.each( function() {

				const field = $( this );
				const label = field.find( '.forminator-label' );
				const radio = field.find( '.forminator-radio' );
				const options = radio.find( 'input' ).map( function() {
					return this.id;
				}).get();

				if ( field.hasClass( 'forminator-is_required' ) && 0 === radio.find( 'input:checked' ).length ) {

					field.addClass( 'forminator-has_error' );

					if ( label.length ) {
						message += '<li>' + label.text() + ' needs at least one option selected.</li>';
					} else {
						message += '<li>You must select at lease one of these options: ' + options.join( ',' ) + '</li>';
					}
				}
			});

			// Print message
			response.html( message );
		}

		function validateMultiSelect() {

			const multiselect = form.find( '.forminator-multiselect' );

			multiselect.each( function() {

				const current = $( this );
				const field = current.closest( '.forminator-field' );
				const label = field.find( '.forminator-label' );
				const options = current.find( '.forminator-option' );
				const optionsMap = options.find( 'input' ).map( function() {
					return this.id;
				}).get();

				if ( field.hasClass( 'forminator-is_required' ) && 0 === options.find( 'input:checked' ).length ) {

					field.addClass( 'forminator-has_error' );

					if ( label.length ) {
						message += '<li>' + label.text() + ' needs at least one option selected.</li>';
					} else {
						message += '<li>You must select at lease one of these options: ' + optionsMap.join( ',' ) + '</li>';
					}
				}
			});

			// Print message
			response.html( message );
		}

		function validation() {

			const input = form.find( '.forminator-input' );
			const inputField = input.closest( '.forminator-field' );
			const inputRequired = input.closest( '.forminator-field.forminator-is_required' );
			const inputFilled = inputRequired.find( '.forminator-input' ).filter( function() {
				return !! this.value;
			});

			const textarea = form.find( '.forminator-textarea' );
			const textareaField = textarea.closest( '.forminator-field' );
			const textareaRequired = textarea.closest( '.forminator-field.forminator-is_required' );
			const textareaFilled = textareaRequired.find( '.forminator-textarea' ).val();

			const radioField = form.find( '.forminator-field-radio' );
			const radioRequired = form.find( '.forminator-field-radio.forminator-is_required' );
			const radioSelected = radioRequired.find( 'input:checked' );

			const multiselect = form.find( '.forminator-multiselect' );
			const multiselectField = multiselect.closest( '.forminator-field' );
			const multiselectRequired = multiselect.closest( '.forminator-field.forminator-is_required' );
			const multiselectSelected = multiselectRequired.find( 'input:checked' );

			// Reset - Hide message
			validateReset();

			if (
				( inputField.hasClass( 'forminator-is_required' ) && inputFilled.length !== inputRequired.length ) ||
				( textareaField.hasClass( 'forminator-is_required' ) && '' === textareaFilled.length ) ||
				( radioField.hasClass( 'forminator-is_required' ) && 0 === radioSelected.length ) ||
				( multiselectField.hasClass( 'forminator-is_required' ) && 0 === multiselectSelected.length )
			) {

				validateInput();
				validateTextarea();
				validateRadio();
				validateMultiSelect();

				validateError();

			} else {

				validateSuccess();

			}
		}

		function init() {

			submit.on( 'click', function( e ) {

				validation();

				e.preventDefault();
				e.stopPropagation();

				return false;

			});
		}

		init();

		return this;
	};

}( jQuery ) );
