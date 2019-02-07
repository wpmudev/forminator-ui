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

		if ( ! form.is( '.forminator-custom-form' ) ) {
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
			response.attr( 'tabindex', '-1' );

			// Focus message
			response.focus();

		}

		function validateSuccess() {

			message = '<p>Form was submitted successfully.</p>';

			// Print message
			response.html( message );

			// Show response
			response.addClass( 'forminator-success' );
			response.addClass( 'forminator-show' );

			// Show response for screen readers
			response.removeAttr( 'aria-hidden' );
			response.attr( 'tabindex', '-1' );

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
						message += '<li>' + current.attr( 'id' ) + ' needs to be filled.</li>';
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
						message += '<li>' + current.attr( 'id' ) + ' needs to be filled.</li>';
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

			// Reset - Hide message
			validateReset();

			if (
				inputField.hasClass( 'forminator-is_required' ) && inputFilled.length !== inputRequired.length ||
				textareaField.hasClass( 'forminator-is_required' ) && '' === textareaFilled.length
			) {

				validateInput();
				validateTextarea();

				validateError();

			} else {

				validateSuccess();

			}
		}

		function init() {

			submit.click( function( e ) {

				validation();

				e.preventDefault();
				e.stopPropagation();

				return false;

			});
		}

		init();

		return this;
	};

	/*
	FUI.formSimulation = function( el ) {

		const form = $( el );
		const response = form.find( '.forminator-response-message' );
		const submit = form.find( '.forminator-button-submit' );

		if ( ! form.is( '.forminator-custom-form' ) ) {
			return;
		}

		function error() {

			let message = '';

			const input = form.find( '.forminator-input' );
			const textarea = form.find( '.forminator-textarea' );
			const radio = form.find( '.forminator-field-radio' );
			const checkbox = form.find( '.forminator-field-checkbox' );
			const multiselect = form.find( '.forminator-multiselect' );

			message += '<p>There was an error sending your message. These fields need some attention:</p>';
			message += '<ul role="list">';

			input.each( function() {

				const current = $( this );
				const inputField = current.closest( '.forminator-field' );
				const inputLabel = inputField.find( '.forminator-label' );

				if ( inputField.hasClass( 'forminator-is_required' ) && '' === current.val() ) {

					if ( inputLabel.length ) {
						message += '<li>' + inputLabel.text() + ' is a required field and needs to be filled.</li>';
					} else {
						message += '<li>' + current.attr( 'id' ) + ' is a required field and needs to be filled.</li>';
					}
				}
			});

			textarea.each( function() {

				const current = $( this );
				const textareaField = current.closest( '.forminator-field' );
				const textareaLabel = textareaField.find( '.forminator-label' );

				if ( textareaField.hasClass( 'forminator-is_required' ) && '' === current.val() ) {

					if ( textareaLabel.length ) {
						message += '<li>' + textareaLabel.text() + ' needs to be filled out.</li>';
					} else {
						message += '<li>' + current.attr( 'id' ) + ' needs to be filled out.</li>';
					}
				}
			});

			radio.each( function() {

				const current = $( this );
				const radiosLabel = current.find( '.forminator-label' );
				const radios = current.find( '.forminator-radio input' ).map( function() {
					return this.id;
				}).get();

				if ( current.hasClass( 'forminator-is_required' ) && 0 === current.find( 'input:checked' ).length ) {

					if ( radiosLabel.length ) {
						message += '<li>' + radiosLabel.text() + ' needs an option to be selected.</li>';
					} else {
						message += '<li>You must select one of these options: ' + radios.join( ',' ) + '</li>';
					}
				}
			});

			checkbox.each( function() {

				const current = $( this );
				const checkboxLabel = current.find( '.forminator-label' );
				const checks = current.find( '.forminator-checkbox input' ).map( function() {
					return this.id;
				}).get();

				if ( current.hasClass( 'forminator-is_required' ) && 0 === current.find( 'input:checked' ).length ) {

					if ( checkboxLabel.length ) {
						message += '<li>' + checkboxLabel.text() + ' needs at least one option selected.</li>';
					} else {
						message += '<li>You must select at lease one of these options: ' + checks.join( ',' ) + '</li>';
					}
				}
			});

			multiselect.each( function() {

				const current = $( this );
				const selectField = current.closest( '.forminator-field' );
				const selectLabel = selectField.find( '.forminator-label' );
				const options = current.find( '.forminator-option input' ).map( function() {
					return this.id;
				}).get();

				if ( selectField.hasClass( 'forminator-is_required' ) && 0 === current.find( 'input:checked' ).length ) {

					if ( selectLabel.length ) {
						message += '<li>' + selectLabel.text() + ' needs at least one option selected.</li>';
					} else {
						message += '<li>You must select at lease one of these options: ' + options.join( ',' ) + '</li>';
					}
				}
			});

			message += '</ul>';

			// Print error message
			response.html( message );

			// Visually hide message
			response.removeClass( 'forminator-show' );

			// Show message for screen readers only
			response.addClass( 'forminator-accessible' );
			response.removeAttr( 'aria-hidden' );
			response.attr( 'aria-live', 'assertive' );
			response.attr( 'tabindex', '-1' );

			// Focus message
			response.focus();

		}

		function success() {

			const message = '<p>The form was submitted successfully.</p>';

			// Print success message
			response.html( message );

			// Show message
			response.addClass( 'forminator-show' );
			response.removeAttr( 'aria-hidden' );
			response.attr( 'aria-live', 'assertive' );
			response.attr( 'tabindex', '-1' );

			// Focus message
			response.focus();

			// Disable form
			form.prop( 'disabled', true );

			setTimeout( function() {

				// Enable form
				form.prop( 'disabled', false );

				// Hide message
				response.removeClass( 'forminator-show' );
				response.attr( 'aria-hidden', 'true' );
				response.removeAttr( 'aria-live' );
				response.removeAttr( 'tabindex' );

				// Clear success message
				response.empty();

				// Focus form
				form.focus();

			}, 1000 );
		}

		function validate() {

			const input = form.find( '.forminator-is_required .forminator-input' );
			const textarea = form.find( '.forminator-is_required .forminator-textarea' );
			const radio = form.find( '.forminator-is_required .forminator-radio' );
			const checkbox = form.find( '.forminator-is_required .forminator-checkbox' );
			const multiselect = form.find( '.forminator-is_required .forminator-multiselect .forminator-option' );

			if (
				'' !== input.val() &&
				'' !== textarea.val() &&
				0 !== radio.find( 'input:checked' ).length &&
				0 !== checkbox.find( 'input:checked' ).length &&
				0 !== multiselect.find( 'input:checked' ).length
			) {
				success();
			} else {
				error();
			}
		}

		// Main function
		function init() {

			submit.on( 'click', function( e ) {

				FUI.formSubmit( submit );

				validate();

				e.stopPropagation();
				e.preventDefault();

				return false;

			});
		}

		init();

		return this;
	};
	*/

}( jQuery ) );
