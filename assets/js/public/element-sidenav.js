( function( $ ) {

	// Load navigation
	$( 'body' ).ready( function() {

		var $navigation = $( '.navigation-main' );

		var $button = '<button class="navigation-button">' +
			'<i aria-hidden="true"></i>' +
			'<i aria-hidden="true"></i>' +
			'<i aria-hidden="true"></i>' +
			'<span>Menu</span>' +
		'</button';

		var $title = '<span class="navigation-title">Forminator UI</span>';

		var $sidenav = '<ul class="navigation-side">' +
			'<li><a href="/">Home</a></li>' +
			'<li><a href="form-ui.html">Forms UI</a></li>' +
		'</ul>';

		$navigation.append( $button );
		$navigation.append( $title );
		$navigation.append( $sidenav );

	});

	// Open close navigation
	$( 'body' ).on( 'click', '.navigation-button', function() {

		var showcase = $( this ).closest( '.showcase' );

		if ( showcase.hasClass( 'is-open' ) ) {
			showcase.removeClass( 'is-open' );
		} else {
			showcase.addClass( 'is-open' );
		}
	});

}( jQuery ) );
