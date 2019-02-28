( function( $ ) {

	FUI.select = function( el ) {

		var $select = $( el ),
			$wrap,
			$handle,
			$list,
			$value,
			$items
			;

		// Add the DOM elements to style the select list
		function setupElement() {

			var $handler = '<div class="forminator-dropdown-handle">' +
				'<i class="forminator-icon-chevron-down"></i>' +
			'</div>';

			$select.wrap( '<div class="forminator-select-container">' );
			$select.addClass( 'forminator-screen-reader-only' );

			if ( ! $select.is( 'select' ) ) {
				return;
			}

			$wrap   = $select.parent();
			$list   = $( '<div class="forminator-select-list" aria-hidden="true"></div>' ).appendTo( $wrap );
			$value  = $( '<div class="forminator-value"></div>' ).appendTo( $list );
			$handle = $( $handler ).appendTo( $list );
			$items  = $( '<ul class="forminator-dropdown-list"></ul>' ).appendTo( $list );

		}

		// When changing selection using JS, you need to trigger a 'fui:change' event
		// E.g. $( 'select' ).val( '4' ).trigger( 'fui:change' )
		function handleSelectionChange() {

			$select.on( 'fui:change', function() {

				// We need to re-populateList to handle dynamic select options added via JS/ajax
				populateList();

				$items.find( 'li' ).not( '.optgroup-label' ).on( 'click', function onItemClick( ev ) {

					var $option = $( ev.target );

					selectItem( $option, false );
					handleValue();

				});
			});
		}

		// Add all the options to the new DOM elements
		function populateList() {

			var $children = $select.children();

			$items.empty();

			$children.each( function() {

				var $option = $( this ),
					$item,
					$label
					;

				if ( 'OPTION' === $( this ).prop( 'tagName' ) ) {

					$item = $( '<li></li>' ).appendTo( $items );

					$item.html( $option.text() );

					$item.data( 'value', $option.val() );

					if ( $option.val() == $select.val() ) {
						selectItem( $item, true );
					}

				}
			});

		}

		// Checks the option value for a link
		function handleValue() {

			var $val = $select[0].$value;

			// If option is link, navigate to it
			if ( 'undefined' !== typeof $val ) {

				// If option is link, navigate to it
				if ( $val.match( '^https?:\/\/|#' ) ) {
					window.location.href = $val;
				}
			}
		}

		// Toggle the dropdown state between open/closed
		function stateToggle() {

			if ( $wrap.find( 'select' ).is( ':disabled' ) ) {
				return;
			}

			if ( ! $wrap.hasClass( 'forminator-is_open' ) ) {
				stateOpen();
			} else {
				stateClose();
			}
		}

		// Close the dropdown list
		function stateClose( $item ) {

			if ( ! $item ) {
				$item = $wrap;
			}

			$item.removeClass( 'forminator-is_open' );
			$select.closest( '.forminator-field' ).removeClass( 'forminator-is_active' );

		}

		// Open the dropdown list
		function stateOpen() {

			$( '.forminator-select-container.forminator-is_open' ).each( function() {
				stateClose( $( this ) );
			});

			$wrap.addClass( 'forminator-is_open' );
			$select.closest( '.forminator-field' ).addClass( 'forminator-is_active' );

		}

		// Visually mark the specified option as "selected"
		function selectItem( $option, isInit ) {

			isInit = 'undefined' === typeof isInit ? false : isInit;

			$value.text( $option.text() );

			$( '.current', $items ).removeClass( 'current' );

			$option.addClass( 'current' );

			stateClose();

			// Also update the select list value.
			$select.val( $option.data( 'value' ) );

			if ( ! isInit ) {
				$select.trigger( 'change' );
			}
		}

		// Element constructor
		function init() {

			var $selectID;

			setupElement();
			populateList();
			handleSelectionChange();

			$items.find( 'li' ).on( 'click', function onItemClick( ev ) {

				var $option = $( ev.target );

				$select.valid();

				selectItem( $option, false );
				handleValue();

			});

			$handle.on( 'click', stateToggle );
			$value.on( 'click', stateToggle );
			$select.on( 'focus', stateOpen );

			$wrap.mouseover( function( ev ) {
				$wrap.closest( '.forminator-field' ).addClass( 'forminator-is_hover' );
				ev.stopPropagation();
			}).mouseout( function( ev ) {
				$wrap.closest( '.forminator-field' ).removeClass( 'forminator-is_hover' );
				ev.stopPropagation();
			});

			$( document ).click( function onOutsideClick( ev ) {

				var $select = $( ev.target );

				if ( $select.closest( '.forminator-select-container' ).length ) {
					return;
				}

				stateClose();

			});

			$selectID = $select.attr( 'id' );

			if ( '' !== $selectID ) {
				$( 'label[for="' + $selectID + '"]' ).on( 'click', stateOpen );
			}
		}

		init();

		return this;

	};

}( jQuery ) );
