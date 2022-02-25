( function( $ ) {

	'use strict';

	// Define global SHOWCASE object if it doesn't exist.
	if ( 'object' !== typeof window.SHOWCASE ) {
		window.SHOWCASE = {};
	}

	SHOWCASE.uniqueFormField = function( el ) {

		const element = $( el );
		const form = element.closest( '.forminator-custom-form' );

		if ( '' === form.prop( 'id' ) ) {
			return;
		}

		function uniqueInput( column ) {

			const input = column.find( '.forminator-input' );

			if ( input.length ) {

				input.each( function() {

					const field = $( this ).closest( '.forminator-field' );
					const label = field.find( '.forminator-label' );
					const dscrp = field.find( '.forminator-description' );
					const error = field.find(  '.forminator-error-message' );

					const getCurrentId = $( this ).prop( 'id' );
					const getFormId = form.data( 'id' );
					const getUniqueId = getCurrentId + '-' + getFormId;
					const getUniqueLabelId = getCurrentId + '-label-' + getFormId;
					const getUniqueDescId = getCurrentId + '-desc-' + getFormId;
					const getUniqueErrorId = getCurrentId + '-error-' + getFormId;

					$( this ).prop( 'id', getUniqueId );

					if ( label.length ) {
						label.prop({
							id: getUniqueLabelId,
							for: getUniqueId
						});
						$( this ).attr( 'aria-labelledby', getUniqueLabelId );
					}

					if ( error.length ) {
						error.prop({
							id: getUniqueErrorId
						});
						$( this ).attr( 'aria-describedby', getUniqueErrorId );
					}

					if ( dscrp.length ) {
						dscrp.prop({
							id: getUniqueDescId
						});
						error.length ?
						$( this ).attr( 'aria-describedby', getUniqueDescId + ' ' + getUniqueErrorId ) :
						$( this ).attr( 'aria-describedby', getUniqueDescId );
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
				const error = field.find(  '.forminator-error-message' );

				const getCurrentId = $( this ).prop( 'id' );
				const getFormId = form.data( 'id' );
				const getUniqueId = getCurrentId + '-' + getFormId;
				const getUniqueLabelId = getCurrentId + '-label-' + getFormId;
				const getUniqueDescId = getCurrentId + '-desc-' + getFormId;
				const getUniqueErrorId = getCurrentId + '-error-' + getFormId;

				$( this ).prop( 'id', getUniqueId );

				if ( label.length ) {
					label.prop({
						id: getUniqueLabelId,
						for: getUniqueId
					});
					$( this ).attr( 'aria-labelledby', getUniqueLabelId );
				}

				if ( error.length ) {
					error.prop({
						id: getUniqueErrorId
					});
					$( this ).attr( 'aria-describedby', getUniqueErrorId );
				}

				if ( dscrp.length ) {
					dscrp.prop({
						id: getUniqueDescId
					});
					error.length ?
					$( this ).attr( 'aria-describedby', getUniqueDescId + ' ' + getUniqueErrorId ) :
					$( this ).attr( 'aria-describedby', getUniqueDescId );
				}
			});
		}

		function uniqueRadio( column ) {

			column.find( '.forminator-field-radio' ).each( function() {

				if ( $( this ).find( '.forminator-radio' ).length ) {

					$( this ).find( '.forminator-radio input' ).each( function() {

						const input = $( this );
						const label = input.parent();
						const iname = input.prop( 'name' );
						const curid = input.prop( 'id' );
						const forid = form.data( 'id' );
						const uname = iname + '-' + forid;
						const unqid = curid + '-' + forid;

						input.prop( 'id', unqid );
						input.prop( 'name', uname );
						label.prop( 'for', unqid );

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
						const curid = input.prop( 'id' );
						const forid = form.data( 'id' );
						const unqid = curid + '-' + forid;

						input.prop( 'id', unqid );
						label.prop( 'for', unqid );

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

					const idCurrent = $( this ).prop( 'id' );
					const idForm = form.data( 'id' );
					const idUnique = idCurrent + '-' + idForm;

					$( this ).prop( 'id', idUnique );

					if ( label.length ) {
						label.prop( 'for', idUnique );
					}

					if ( dscrp.length ) {
						dscrp.prop( 'aria-describedby', idUnique );
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

					const idCurrent = $( this ).prop( 'id' );
					const idForm = form.data( 'id' );
					const idUnique = idCurrent + '-' + idForm;

					$( this ).prop( 'id', idUnique );

					if ( label.length ) {
						label.prop( 'for', idUnique );
					}

					if ( dscrp.length ) {
						dscrp.prop( 'aria-describedby', idUnique );
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
						const curid = input.prop( 'id' );
						const forid = form.data( 'id' );
						const unqid = curid + '-' + forid;

						input.prop( 'id', unqid );
						label.prop( 'for', unqid );

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
