( function() {
	'use strict';

	if ( 'object' !== typeof window.FUI ) {
		window.FUI = {};
	}

	FUI.utils = FUI.utils || {};

	/** Rebuild allowed notice markup; never insert parsed source nodes directly. */
	function renderNoticeHtml( html, linkClass ) {
		const template = document.createElement( 'template' );
		template.innerHTML = html;
		const fragment = document.createDocumentFragment();
		const allowed = [ 'a', 'strong', 'b', 'em', 'i', 'br', 'p', 'ul', 'ol', 'li', 'code', 'span' ];
		const excluded = [ 'script', 'style', 'iframe', 'object', 'embed', 'template', 'noscript', 'textarea', 'select', 'button' ];
		function appendNode( source, parent, depth ) {
			if ( 3 === source.nodeType ) {
				parent.appendChild( document.createTextNode( source.textContent ) );
				return;
			}
			if ( 1 !== source.nodeType || 'http://www.w3.org/1999/xhtml' !== source.namespaceURI || excluded.includes( source.localName ) || 50 <= depth ) {
				return;
			}
			let target = parent;
			const tag = source.localName;
			const href = 'a' === tag ? FUI.utils.getSafeUrl( source.getAttribute( 'href' ) ) : null;
			if ( allowed.includes( tag ) && ( 'a' !== tag || href ) ) {
				target = document.createElement( tag );
				if ( 'a' === tag ) {
					target.className = linkClass || '';
					target.href = href;
					if ( source.hasAttribute( 'title' ) ) {
						target.title = source.getAttribute( 'title' );
					}
					if ( '_blank' === source.getAttribute( 'target' ) ) {
						target.target = '_blank';
						target.rel = 'noopener noreferrer';
					}
				}
				parent.appendChild( target );
			}
			Array.from( source.childNodes ).forEach( function( child ) {
				appendNode( child, target, depth + 1 );
			});
		}
		Array.from( template.content.childNodes ).forEach( function( node ) {
			appendNode( node, fragment, 0 );
		});
		return fragment;
	}

	/** Display restricted HTML strings or a plain-text structured error. */
	FUI.utils.renderNoticeHtml = renderNoticeHtml;
}() );
