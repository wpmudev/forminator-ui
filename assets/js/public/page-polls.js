( function( $ ) {

	'use strict';

	// Define global SHOWCASE object if it doesn't exist.
	if ( 'object' !== typeof window.SHOWCASE ) {
		window.SHOWCASE = {};
	}

	SHOWCASE.demoPoll = function() {

		let form = $( '.forminator-ui.forminator-polls' );

		form.each( function() {

			form = $( this );

			const btnBlue  = form.find( '.forminator-button' );
			const btnLink = form.find( '.forminator-link' );

			// Load radio and checkbox function
			FUI.radioStates( form.find( '.forminator-radio' ) );

			// Clean response
			function responseClean( poll ) {

				const field = form.find( '.forminator-field' );
				const response = poll.find( '.forminator-response-message' );

				// Remove message
				response.html( '' );

				// Hide error message
				field.removeClass( 'forminator-has_error' );

				// Hide error response
				response.removeClass( 'forminator-show' );
				response.removeClass( 'forminator-error' );
				response.removeClass( 'forminator-success' );

				// Hide response for screen readers
				response.removeAttr( 'tabindex' );
				response.attr( 'aria-hidden', 'true' );

			}

			// Successful response
			function responseSuccess( poll ) {

				const response = poll.find( '.forminator-response-message' );

				// Print message
				response.html( '<p>Your vote was submitted successfully.</p>' );

				// Show success message
				response.addClass( 'forminator-success' );
				response.addClass( 'forminator-show' );

				// Show response for screen readers
				response.removeAttr( 'aria-hidden' );
				response.attr( 'tabindex', '-1' );

				// Focus message
				response.focus();
			}

			// Error response
			function responseError( poll ) {

				const field = form.find( '.forminator-field' );
				const response = poll.find( '.forminator-response-message' );

				// Print message
				response.html( '<p>No option has been picked yet, please choose one before submitting the form.</p>' );

				// Add field error
				field.addClass( 'forminator-has_error' );

				// Show error message
				response.addClass( 'forminator-error' );
				response.addClass( 'forminator-show' );

				// Show response for screen readers
				response.removeAttr( 'aria-hidden' );
				response.attr( 'tabindex', '-1' );

				// Focus message
				response.focus();

			}

			// DEMO: Submit vote
			btnBlue.on( 'click', function( e ) {

				form = $( this ).closest( '.forminator-polls' );

				const button = $( this );
				const link = form.find( '.forminator-link' );
				const field = form.find( '.forminator-field' );

				if ( button.hasClass( 'forminator-button-submit' ) ) {

					if ( field.find( '.forminator-radio input:checked' ).length ) {

						// Clean response message
						responseClean( form );

						// Button loading animation
						button.addClass( 'forminator-onload' );

						// Disable "view results" link
						link.addClass( 'forminator-disabled' );

						setTimeout( function() {

							// Success message
							responseSuccess( form );

							// Remove checked option
							field.find( '.forminator-radio' ).removeClass( 'forminator-is_checked' );
							field.find( '.forminator-radio input' ).prop( 'checked', false );

							// Remove loading animation
							button.removeClass( 'forminator-onload' );

							// Enable "view results" link
							link.removeClass( 'forminator-disabled' );

						}, 1500 );

					} else {

						// Clean response message
						responseClean( form );

						// Button loading animation
						button.addClass( 'forminator-onload' );

						// Disable "view results" link
						link.addClass( 'forminator-disabled' );

						setTimeout( function() {

							// Error message
							responseError( form );

							// Remove loading animation
							button.removeClass( 'forminator-onload' );

							// Enable "view results" link
							link.removeClass( 'forminator-disabled' );

						}, 1500 );
					}
				}

				e.preventDefault();

			});

			// DEMO: View results
			btnLink.on( 'click', function( e ) {

				form = $( this ).closest( '.forminator-polls' );

				const button = form.find( '.forminator-button' );
				const field = form.find( '.forminator-field' );
				const chart = form.find( '.forminator-chart' );
				const link = form.find( '.forminator-link' );

				// Hide poll form
				field.hide();
				field.attr( 'aria-hidden', 'true' );

				// Show chart
				chart.addClass( 'forminator-show' );
				chart.removeAttr( 'aria-hidden' );
				chart.attr( 'tabindex', '-1' );

				// Focus chart
				chart.focus();

				// Replace "submit" with "back" button
				button.removeClass( 'forminator-button-submit' );
				button.addClass( 'forminator-button-back' );
				button.find( 'span' ).text( 'Back To Poll' );

				// Hide "view results" link
				link.hide();
				link.attr( 'aria-hidden', 'true' );

				e.preventDefault();

			});

			// DEMO: Back to Results
			btnBlue.on( 'click', function( e ) {

				form = $( this ).closest( '.forminator-polls' );

				const button = form.find( '.forminator-button' );
				const field = form.find( '.forminator-field' );
				const chart = form.find( '.forminator-chart' );
				const link = form.find( '.forminator-link' );

				if ( button.hasClass( 'forminator-button-back' ) ) {

					// Hide chart
					chart.removeClass( 'forminator-show' );
					chart.removeAttr( 'tabindex' );
					chart.attr( 'aria-hidden', 'true' );

					// Show poll form
					field.show();
					field.removeAttr( 'aria-hidden' );
					field.attr( 'tabindex', '-1' );

					// Focus poll form
					field.focus();

					// Replace "back" with "submit" button
					button.removeClass( 'forminator-button-back' );
					button.addClass( 'forminator-button-submit' );
					button.find( 'span' ).text( 'Submit' );

					// Show "view results" link
					link.show();
					link.removeAttr( 'aria-hidden' );

				}

				e.preventDefault();

			});
		});
	};

	$( 'body' ).ready( function() {

		// Check if page exists
		if ( $( '#page-polls-showcase' ).length ) {

			// Simulate poll submission
			SHOWCASE.demoPoll();

		}
	});
}( jQuery ) );
