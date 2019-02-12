( function( $ ) {

	'use strict';

	// Define global SHOWCASE object if it doesn't exist.
	if ( 'object' !== typeof window.SHOWCASE ) {
		window.SHOWCASE = {};
	}

	SHOWCASE.uniqueFormField = function( el ) {

		const element = $( el );
		const form = element.closest( '.forminator-custom-form' );

		if ( '' === form.attr( 'data-id' ) ) {
			return;
		}

		function uniqueInput( column ) {

			const input = column.find( '.forminator-input' );

			if ( input.length ) {

				input.each( function() {

					const field = $( this ).closest( '.forminator-field' );
					const label = field.find( '.forminator-label' );
					const dscrp = field.find( '.forminator-description' );

					const getCurrentId = $( this ).attr( 'id' );
					const getFormId = form.data( 'id' );
					const getUniqueId = getCurrentId + '-' + getFormId;

					$( this ).attr( 'id', getUniqueId );

					if ( label.length ) {
						label.attr( 'for', getUniqueId );
					}

					if ( dscrp.length ) {
						dscrp.attr( 'aria-describedby', getUniqueId );
					}
				});
			}
		}

		function uniqueTextarea( column ) {

			const textarea = column.find( '.forminator-textarea' );

			textarea.each( function() {

				const field = $( this ).closest( '.forminator-field' );
				const label = field.find( '.forminator-label' );
				const dscrp = field.find( '.forminator-description' );

				const getCurrentId = $( this ).attr( 'id' );
				const getFormId = form.data( 'id' );
				const getUniqueId = getCurrentId + '-' + getFormId;

				$( this ).attr( 'id', getUniqueId );

				if ( label.length ) {
					label.attr( 'for', getUniqueId );
				}

				if ( dscrp.length ) {
					dscrp.attr( 'aria-describedby', getUniqueId );
				}
			});
		}

		function uniqueRadio( column ) {

			column.find( '.forminator-field-radio' ).each( function() {

				if ( $( this ).find( '.forminator-radio' ).length ) {

					$( this ).find( '.forminator-radio input' ).each( function() {

						const input = $( this );
						const label = input.parent();
						const iname = input.attr( 'name' );
						const curid = input.attr( 'id' );
						const forid = form.data( 'id' );
						const uname = iname + '-' + forid;
						const unqid = curid + '-' + forid;

						input.attr( 'id', unqid );
						input.attr( 'name', uname );
						label.attr( 'for', unqid );

					});
				}
			});
		}

		function uniqueCheckbox( column ) {

			column.find( '.forminator-field-checkbox' ).each( function() {

				if ( $( this ).find( '.forminator-checkbox' ).length ) {

					$( this ).find( '.forminator-checkbox input' ).each( function() {

						const input = $( this );
						const label = input.parent();
						const curid = input.attr( 'id' );
						const forid = form.data( 'id' );
						const unqid = curid + '-' + forid;

						input.attr( 'id', unqid );
						label.attr( 'for', unqid );

					});
				}
			});
		}

		function uniqueSelect( column ) {

			const select = column.find( '.forminator-select' );

			if ( select.length ) {

				select.each( function() {

					const field = $( this ).closest( '.forminator-field' );
					const label = field.find( '.forminator-label' );
					const dscrp = field.find( '.forminator-description' );

					const idCurrent = $( this ).attr( 'id' );
					const idForm = form.data( 'id' );
					const idUnique = idCurrent + '-' + idForm;

					$( this ).attr( 'id', idUnique );

					if ( label.length ) {
						label.attr( 'for', idUnique );
					}

					if ( dscrp.length ) {
						dscrp.attr( 'aria-describedby', idUnique );
					}
				});
			}
		}

		function uniqueSelect2( column ) {

			const select = column.find( '.forminator-select2' );

			if ( select.length ) {

				select.each( function() {

					const field = $( this ).closest( '.forminator-field' );
					const label = field.find( '.forminator-label' );
					const dscrp = field.find( '.forminator-description' );

					const idCurrent = $( this ).attr( 'id' );
					const idForm = form.data( 'id' );
					const idUnique = idCurrent + '-' + idForm;

					$( this ).attr( 'id', idUnique );

					if ( label.length ) {
						label.attr( 'for', idUnique );
					}

					if ( dscrp.length ) {
						dscrp.attr( 'aria-describedby', idUnique );
					}
				});
			}
		}

		function uniqueMultiSelect( column ) {

			column.find( '.forminator-multiselect' ).each( function() {

				if ( $( this ).find( '.forminator-option' ).length ) {

					$( this ).find( '.forminator-option input' ).each( function() {

						const input = $( this );
						const label = input.parent();
						const curid = input.attr( 'id' );
						const forid = form.data( 'id' );
						const unqid = curid + '-' + forid;

						input.attr( 'id', unqid );
						label.attr( 'for', unqid );

					});
				}
			});
		}

		function init() {
			uniqueInput( element );
			uniqueTextarea( element );
			uniqueRadio( element );
			uniqueCheckbox( element );
			uniqueSelect( element );
			uniqueSelect2( element );
			uniqueMultiSelect( element );
		}

		init();

		return this;

	};

}( jQuery ) );
