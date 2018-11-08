( function( $ ) {

	$( 'body' ).on( 'click', '.navigation-button', function() {

		var showcase = $( this ).closest( '.showcase' );

		if ( showcase.hasClass( 'is-open' ) ) {
			showcase.removeClass( 'is-open' );
		} else {
			showcase.addClass( 'is-open' );
		}
	});

}( jQuery ) );
