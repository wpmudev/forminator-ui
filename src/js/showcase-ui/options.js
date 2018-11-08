( function( $ ) {

	$( 'body' ).on( 'click', '.options-menu .option', function( e ) {

		var $option  = $( this ),
			$parent  = $option.closest( '.options' ),
			$options = $parent.find( '.options-menu .option' ),
			$content = $parent.find( '.options-content .option' ),
			$current = $parent.find( '.options-content .option[data-option="' + $option.find( 'input' ).val() + '"]' )
			;

		$options.removeClass( 'active' );
		$option.addClass( 'active' );

		$content.removeClass( 'active' );
		$current.addClass( 'active' );

		e.preventDefault();
		e.stopPropagation();

	});

}( jQuery ) );
