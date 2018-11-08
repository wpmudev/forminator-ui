( function( $ ) {

	$( 'body' ).on( 'click', '.tab-menu button', function( e ) {

		var $button  = $( this ),
			$parent  = $button.closest( '.tabs' ),
			$buttons = $parent.find( '.tabs-menu > .tab-menu button' ),
			$content = $parent.find( '.tabs-content > .tab-content' ),
			$current = $parent.find( '.tabs-content > .tab-content[data-tab="' + $button.data( 'tab' ) + '"]' )
			;

		$buttons.removeClass( 'active' );
		$button.addClass( 'active' );

		$content.removeClass( 'active' );
		$current.addClass( 'active' );

		e.preventDefault();
		e.stopPropagation();

	});

}( jQuery ) );
