( function() {
	'use strict';

	if ( 'object' !== typeof window.FUI ) {
		window.FUI = {};
	}

	FUI._submissionViews = FUI._submissionViews || {};
	FUI._submissionViews.csv = function( context ) {

		// Export data is explicit and independent of the table's displayed values.
		function getCsv( options ) {
			if ( context.destroyed || ! options || ! Array.isArray( options.fields ) || ! Array.isArray( options.rows ) ) {
				return false;
			}
			const mode = options.mode || 'all';
			if ( ! [ 'all', 'visible' ].includes( mode ) ) {
				return false;
			}
			const ids = new Set();
			for ( const field of options.fields ) {
				if ( ! field || 'string' !== typeof field.id || ! field.id || ids.has( field.id ) ) {
					return false;
				}
				ids.add( field.id );
			}
			let fields = options.fields;
			if ( 'visible' === mode ) {
				let visibleIds = options.visibleFieldIds;
				if ( undefined === visibleIds ) {
					visibleIds = context.headers.filter( context.isDataColumn ).filter( context.isVisibleColumn ).map( header => header.dataset.fieldId );
				}
				if ( ! Array.isArray( visibleIds ) ) {
					return false;
				}
				fields = fields.filter( field => visibleIds.includes( field.id ) );
			}
			if ( ! fields.length ) {
				return false;
			}
			try {
				const lines = [ fields.map( field => FUI.utils.quoteCsvValue( undefined === field.label ? field.id : field.label ) ).join( ',' ) ];
				for ( const row of options.rows ) {
					if ( ! row || 'object' !== typeof row || Array.isArray( row ) ) {
						return false;
					}
					lines.push( fields.map( function( field ) {
						const value = Object.prototype.hasOwnProperty.call( row, field.id ) ? row[field.id] : null;
						return FUI.utils.quoteCsvValue( value );
					}).join( ',' ) );
				}
				return lines.join( '\r\n' ) + '\r\n';
			} catch ( error ) {

				// Cyclic or otherwise unserializable field data must not produce a partial file.
				return false;
			}
		}

		function downloadCsv( options ) {
			const csv = context.getCsv( options );
			if ( false === csv ) {
				return false;
			}
			let filename = 'string' === typeof options.filename ? options.filename.trim() : 'submissions.csv';
			filename = filename.replace( /[\\/:*?"<>|\u0000-\u001f]/g, '-' ) || 'submissions.csv';
			if ( ! /\.csv$/i.test( filename ) ) {
				filename += '.csv';
			}
			const content = false === options.bom ? csv : '\uFEFF' + csv;
			const url = URL.createObjectURL( new Blob([ content ], {
				type: 'text/csv;charset=utf-8;'
			}) );
			const link = document.createElement( 'a' );
			link.href = url;
			link.download = filename;
			link.hidden = true;
			document.body.appendChild( link );
			try {
				link.click();
			} finally {
				link.remove();
				setTimeout( () => URL.revokeObjectURL( url ), 1000 );
			}
			return true;
		}

		function requestExport() {
			context.emit( 'export', {
				format: 'csv'
			});
		}

		Object.assign( context, {
			getCsv,
			downloadCsv,
			requestExport
		});
	};
}() );
