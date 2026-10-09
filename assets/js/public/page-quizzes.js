( function( $ ) {

	'use strict';

	// Define global SHOWCASE object if it doesn't exist.
	if ( 'object' !== typeof window.SHOWCASE ) {
		window.SHOWCASE = {};
	}

	SHOWCASE.quizCountAnsweredQuestions = function( form ) {

		const questions      = form.find( '.forminator-question' );
		const checkedAnswers = form.find( '.forminator-answer input[type="radio"]:checked' );
		const countQuestions = questions.length;
		const countAnswers   = checkedAnswers.length;

		let allQuestionsAnswered = false;

		if ( countQuestions === countAnswers ) {
			allQuestionsAnswered = true;
		}

		return allQuestionsAnswered;
	};

	SHOWCASE.quizShowResult = function( form ) {

		const result   = form.find( '.forminator-quiz--result' );
		const summary  = '<div role="alert" class="forminator-quiz--summary" style="display: none;" hidden></div>';
		const sshare   = '<div class="forminator-quiz--social"><p class="forminator-social--text">Share your results</p><ul class="forminator-social--icons"></ul></div>';
		const facebook = '<li class="forminator-social--icon"><a href="#"><i class="forminator-icon-social-facebook" aria-hidden="true"></i><span class="forminator-screen-reader-only">Share your results on Facebook</span></a></li>';
		const twitter  = '<li class="forminator-social--icon"><a href="#"><i class="forminator-icon-social-twitter" aria-hidden="true"></i><span class="forminator-screen-reader-only">Share your results on Twitter</span></a></li>';
		const linkedin = '<li class="forminator-social--icon"><a href="#"><i class="forminator-icon-social-linkedin" aria-hidden="true"></i><span class="forminator-screen-reader-only">Share your results on LinkedIn</span></a></li>';

		// Empty result container.
		result.empty();

		// Print summary.
		result.append( summary );
		result.find( '.forminator-quiz--summary' ).append( '<p role="alert">You got ' + form.find( '.forminator-is_correct' ).length + '/' + form.find( '.forminator-question' ).length + ' correct!</p>' );
		result.find( '.forminator-quiz--summary' ).show();
		result.find( '.forminator-quiz--summary' ).removeAttr( 'hidden' );

		// Print social share.
		result.append( sshare );
		result.find( '.forminator-social--icons' ).append( facebook + twitter + linkedin );

	};

	SHOWCASE.demoKnowledge = function( form ) {

		// Re-assign form.
		form = $( form );

		let answers, answer, question, result, submit, validate, icon;

		form.each( function() {

			form    = $( this );
			answers = form.find( '.forminator-answer input[type="radio"]' );
			submit  = form.find( '.forminator-button' );

			answers.each( function() {

				answer = $( this );

				answer.on( 'click', function() {

					$( this ).prop( 'checked', true );

					// Check if submit button exists.
					if ( 0 < submit.length ) {

						// Enable submit button if all questions has been answered.
						if ( true === SHOWCASE.quizCountAnsweredQuestions( form ) ) {
							submit.prop( 'disabled', false );
							submit.removeAttr( 'disabled' );
						} else {
							submit.prop( 'disabled', true );
						}
					}
				});
			});

			// Show results on submit click.
			if ( 0 < submit.length ) {

				submit.on( 'click', function( e ) {

					submit  = $( this );
					answers = form.find( '.forminator-answer input[type="radio"]' );

					submit.addClass( 'forminator-onload' );

					setTimeout( function() {

						answers.each( function() {

							answer   = $( this );
							icon     = 'cancel';
							validate = 'incorrect';
							question = answer.closest( '.forminator-question' );
							answers  = question.find( '.forminator-answer input' );
							result   = question.find( '.forminator-question--result' );

							let resultText = 'You selected a wrong answer.';

							if ( answer.val() === question.data( 'correct-answer' ) ) {
								icon       = 'check';
								validate   = 'correct';
								resultText = 'Right! You selected the correct answer.';
							}

							answers.prop( 'disabled', true );

							if ( answer.is( ':checked' ) ) {
								answer.parent().addClass( 'forminator-is_' + validate );
								answer.parent().find( '.forminator-answer--status' ).html(
									'<i class="forminator-icon-' + icon + '" aria-hidden="true"></i>'
								);
								result.text( resultText ).removeAttr( 'role' ).removeAttr( 'hidden' ).addClass( 'forminator-show' );
							}
						});

						SHOWCASE.quizShowResult( form );

					}, 1500 );

					e.preventDefault();

				});

			// Show results when choosing an answer.
			} else {

				answers.each( function() {

					answer = $( this );

					answer.on( 'click', function() {

						answer   = $( this );
						icon     = 'cancel';
						validate = 'incorrect';
						question = answer.closest( '.forminator-question' );
						answers  = question.find( '.forminator-answer input' );

						let resultText = 'You selected a wrong answer.';

						answer.prop( 'checked', true );
						answers.prop( 'disabled', true );

						if ( answer.val() === question.data( 'correct-answer' ) ) {
							icon       = 'check';
							validate   = 'correct';
							resultText = 'Right! You selected the correct answer.';
						}

						answer.parent().addClass( 'forminator-is_' + validate );
						answer.parent().find( '.forminator-answer--status' ).html(
							'<i class="forminator-icon-' + icon + '" aria-hidden="true"></i>'
						);
						result.text( resultText ).removeAttr( 'role' ).removeAttr( 'hidden' ).addClass( 'forminator-show' );

						if ( true === SHOWCASE.quizCountAnsweredQuestions( form ) ) {
							SHOWCASE.quizShowResult( form );
						}
					});
				}, 1000 );
			}
		});

	};

	SHOWCASE.demoNoWrong = function( form ) {

		// Re-assign form.
		form = $( form );

		let answers, answer, question, result, validate, icon;

		form.each( function() {

			form = $( this );
		});

	};

	SHOWCASE.demoQuiz = function() {

		let form = $( '.forminator-ui.forminator-quiz' );

		if ( 0 === form.length ) {
			return;
		}

		function init() {

			form.each( function() {

				form = $( this );

				if ( typeof undefined !== typeof form.data( 'quiz' ) && 'knowledge' === form.data( 'quiz' ) ) {
					SHOWCASE.demoKnowledge( this );
				}

				if ( typeof undefined !== typeof form.data( 'quiz' ) && 'nowrong' === form.data( 'quiz' ) ) {
					SHOWCASE.demoNoWrong( this );
				}

			});
		}

		init();

		return this;
	};

	$( 'body' ).ready( function() {

		if ( $( '#page-quizzes-showcase' ).length ) {
			SHOWCASE.demoQuiz();
		}
	});
}( jQuery ) );
