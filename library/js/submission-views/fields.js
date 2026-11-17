( function() {
	'use strict';

	if ( 'object' !== typeof window.FUI ) {
		window.FUI = {};
	}

	FUI._submissionViews = FUI._submissionViews || {};
	FUI._submissionViews.fields = function( context ) {

		// Submission content is supplied by Forminator, independently of table columns.
		function createText( value, emptyValue ) {
			const text = document.createElement( 'bdi' );
			text.dir = 'auto';
			text.textContent = null === value || undefined === value || '' === value ? emptyValue : String( value );
			return text;
		}

		function renderValue( container, value, emptyValue ) {
			if ( Array.isArray( value ) ) {
				const list = document.createElement( 'ul' );
				value.forEach( function( item ) {
					const entry = document.createElement( 'li' );
					entry.appendChild( context.createText( item, emptyValue ) );
					list.appendChild( entry );
				});
				if ( value.length ) {
					container.appendChild( list );
					return;
				}
				value = null;
			}
			container.appendChild( context.createText( value, emptyValue ) );
		}

		// Parse URLs before assigning href; never accept executable or embedded-data schemes.

		function renderLink( container, value, field, emptyValue ) {
			const details = value && 'object' === typeof value ? value : {
				url: value
			};
			const href = FUI.utils.getSafeUrl( details.url );
			const label = details.label || details.name || details.url;
			if ( ! href ) {
				container.appendChild( context.createText( label, emptyValue ) );
				return;
			}
			const link = document.createElement( 'a' );
			link.href = href;
			link.appendChild( context.createText( label, emptyValue ) );
			if ( true === field.newTab ) {
				link.target = '_blank';
				link.rel = 'noopener noreferrer';
			}
			if ([ 'file', 'upload' ].includes( field.type ) ) {
				link.setAttribute( 'download', '' );
			}
			container.appendChild( link );
		}

		function renderLinkField( container, field, emptyValue ) {
			if ( ! Array.isArray( field.value ) ) {
				context.renderLink( container, field.value, field, emptyValue );
				return;
			}
			if ( ! field.value.length ) {
				container.appendChild( context.createText( null, emptyValue ) );
				return;
			}
			const list = document.createElement( 'ul' );
			field.value.forEach( function( value ) {
				const item = document.createElement( 'li' );
				context.renderLink( item, value, field, emptyValue );
				list.appendChild( item );
			});
			container.appendChild( list );
		}

		function renderRepeater( entries, emptyValue ) {
			const group = document.createElement( 'dl' );
			group.className = 'forminator-submission-views__group';
			entries.forEach( function( entry ) {
				if ( ! entry || ! Array.isArray( entry.fields ) ) {
					return;
				}

				// Unlabelled entries show child fields directly, like Address.
				if ( ! entry.label ) {
					const fields = context.renderFields( entry.fields, emptyValue, true );
					group.append( ...Array.from( fields.children ) );
					return;
				}
				const row = document.createElement( 'div' );
				const label = document.createElement( 'dt' );
				const content = document.createElement( 'dd' );

				// Keep a named entry group only when Forminator supplies its label.
				label.appendChild( context.createText( entry.label, emptyValue ) );
				content.appendChild( context.renderFields( entry.fields, emptyValue, true ) );
				row.append( label, content );
				group.appendChild( row );
			});
			return group;
		}

		function renderFields( fields, emptyValue, nested ) {
			const list = document.createElement( 'dl' );
			list.className = nested ? 'forminator-submission-views__group' : 'forminator-submission-views__fields';
			fields.forEach( function( field ) {
				if ( ! field || 'object' !== typeof field ) {
					return;
				}
				const row = document.createElement( 'div' );
				const label = document.createElement( 'dt' );
				const content = document.createElement( 'dd' );
				if ( ! nested ) {
					row.className = 'forminator-submission-views__field';
				}
				if ( undefined !== field.id ) {
					row.dataset.fieldId = String( field.id );
				}
				label.appendChild( context.createText( field.label, emptyValue ) );
				if ( 'repeater' === field.type && Array.isArray( field.entries ) && field.entries.length ) {
					content.appendChild( context.renderRepeater( field.entries, emptyValue ) );
				} else if ( Array.isArray( field.fields ) ) {
					content.appendChild( context.renderFields( field.fields, emptyValue, true ) );
				} else if ([ 'link', 'url', 'file', 'upload' ].includes( field.type ) ) {
					context.renderLinkField( content, field, emptyValue );
				} else {
					context.renderValue( content, field.value, emptyValue );
				}
				row.append( label, content );
				list.appendChild( row );
			});
			return list;
		}

		/** Replace dialog fields without opening it or changing the table. */

		Object.assign( context, {
			createText,
			renderValue,
			renderLink,
			renderLinkField,
			renderRepeater,
			renderFields
		});
	};
}() );
