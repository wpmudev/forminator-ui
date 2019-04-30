( function( $ ) {

	$( 'body' ).ready( function() {

		const pages = [
			'forms',
			'polls',
			'quizzes'
		];

		const headerDiv = $( '.showcase-header' );
		const headerTpl = 'templates/global-header.html';

		// Load global header
		if ( ! headerDiv.hasClass( 'no-js' ) ) {

			headerDiv.load( headerTpl, function() {

				const header = $( this );
				const navChild = header.find( '.child-link' );
				const sideBtn = header.find( '#showcase-open-sidenav' );

				$.each( pages, function( index, page ) {

					if (  -1 < window.location.href.indexOf( page ) ) {

						// Top navigation
						header.find( '.page-nav-' + page ).addClass( 'current' );

						// Side navigation
						navChild.on( 'click', function( e ) {

							button = $( this );
							section = button.data( 'section' );
							parent = button.closest( 'ul' );
							content = $( '.showcase-content' );

							content.find( '.page-section' ).hide();
							content.find( '#page-' + page + '-section--' + section ).show();

							parent.find( 'li' ).removeClass( 'current' );
							button.parent().addClass( 'current' );

							e.preventDefault();
							e.stopPropagation();

						});
					}
				});

				sideBtn.on( 'click', function( e ) {

					const button = $( this );
					const sidenav = $( '.showcase-sidenav' );

					button.toggleClass( 'open' );
					sidenav.toggleClass( 'open' );

					e.stopPropagation();
					e.preventDefault();

				});
			});
		}
	});

}( jQuery ) );
