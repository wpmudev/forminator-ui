( function( $ ) {

	$( 'body' ).ready( function() {

		const footerDiv = $( '.showcase-footer' );
		const footerTpl = 'templates/global-footer.html';

		// Load global footer
		footerDiv.load( footerTpl );

	});

}( jQuery ) );
