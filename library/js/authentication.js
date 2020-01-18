( function() {

	// Enable strict mode.
	'use strict';

	// Define global FUI object if it doesn't exist.
	if ( 'object' !== typeof window.FUI ) {
		window.FUI = {};
	}

	/**
	 * @namespace aria
	 */
	let aria = aria || {};

	// REF: Key codes.
	aria.KeyCode = {
		BACKSPACE: 8,
		TAB: 9,
		RETURN: 13,
		ESC: 27,
		SPACE: 32,
		PAGE_UP: 33,
		PAGE_DOWN: 34,
		END: 35,
		HOME: 36,
		LEFT: 37,
		UP: 38,
		RIGHT: 39,
		DOWN: 40,
		DELETE: 46
	};

	aria.Utils = aria.Utils || {};

	// UTILS: Remove function.
	aria.Utils.remove = function( item ) {

		if ( item.remove && 'function' === typeof item.remove ) {
			return item.remove();
		}

		if (
			item.parentNode &&
			item.parentNode.removeChild &&
			'function' === typeof item.parentNode.removeChild
		) {
			return item.parentNode.removeChild( item );
		}

		return false;

	};

	// UTILS: Verify if element can be focused.
	aria.Utils.isFocusable = function( element ) {

		if (
			0 < element.tabIndex ||
			( 0 === element.tabIndex && null !== element.getAttribute( 'tabIndex' ) )
		) {
			return true;
		}

		if ( element.disabled ) {
			return false;
		}

		switch ( element.nodeName ) {

			case 'A' :
				return !! element.href && 'ignore' != element.rel;

			case 'INPUT' :
				return 'hidden' != element.type && 'file' != element.type;

			case 'BUTTON' :
			case 'SELECT' :
			case 'TEXTAREA' :
				return true;

			default :
				return false;
		}
	};

	/**
	 * Simulate a click event.
	 * @public
	 * @param {Element} element the element to simulate a click on
	 */
	aria.Utils.simulateClick = function( element ) {

		// Create our event (with options)
		var evt = new MouseEvent( 'click', {
			bubbles: true,
			cancelable: true,
			view: window
		});

		// If cancelled, don't dispatch our event
		var canceled = ! element.dispatchEvent( evt );

	};

	// When util functions move focus around, set this true so
	// the focus listener can ignore the events.
	aria.Utils.IgnoreUtilFocusChanges = false;
	aria.Utils.dialogOpenClass = 'forminator-authentication-enabled';

	/**
	 * @desc Set focus on descendant nodes until the first
	 * focusable element is found.
	 *
	 * @param element
	 * DOM node for which to find the first focusable descendant.
	 *
	 * @returns
	 * true if a focusable element is found and focus is set.
	 */
	aria.Utils.focusFirstDescendant = function( element ) {

		for ( let i = 0; i < element.childNodes.length; i++ ) {

			let child = element.childNodes[i];

			if ( aria.Utils.attemptFocus( child ) || aria.Utils.focusFirstDescendant( child ) ) {
				return true;
			}
		}

		return false;

	}; // end focusFirstDescendant.

	/**
	 * @desc Find the last descendant node that is focusable.
	 *
	 * @param element
	 * DOM node for which to find the last focusable descendant.
	 *
	 * @returns
	 * true if a focusable element is found and focus is set.
	 */
	aria.Utils.focusLastDescendant = function( element ) {

		for ( let i = element.childNodes.length - 1; 0 <= i; i-- ) {

			let child = element.childNodes[i];

			if ( aria.Utils.attemptFocus( child ) || aria.Utils.focusLastDescendant( child ) ) {
				return true;
			}
		}

		return false;

	}; // end focusLastDescendant

	/**
	 * @desc Set Attempt to set focus on the current node.
	 *
	 * @param element
	 * The node to attempt to focus on.
	 *
	 * @returns
	 * true if element is focused.
	 */
	aria.Utils.attemptFocus = function( element ) {

		if ( ! aria.Utils.isFocusable( element ) ) {
			return false;
		}

		aria.Utils.IgnoreUtilFocusChanges = true;

		try {
			element.focus();
		} catch ( e ) {}

		aria.Utils.IgnoreUtilFocusChanges = false;

		return (
			document.activeElement === element
		);
	}; // end attemptFocus

	// Modals can open modals. Keep track of them with this array.
	aria.OpenDialogList = aria.OpenDialogList || new Array( 0 );

	/**
	 * @returns the last opened dialog (the current dialog)
	 */
	aria.getCurrentDialog = function() {

		if ( aria.OpenDialogList && aria.OpenDialogList.length ) {
			return aria.OpenDialogList[aria.OpenDialogList.length - 1];
		}
	};

	aria.closeCurrentDialog = function() {

		var currentDialog = aria.getCurrentDialog();

		if ( currentDialog ) {
			currentDialog.close();
			return true;
		}

		return false;
	};

	aria.handleEscape = function( event ) {

		var key = event.which || event.keyCode;

		if ( key === aria.Utils.ESC && aria.closeCurrentDialog() ) {
			event.stopPropagation();
		}
	};

	document.addEventListener( 'keyup', aria.handleEscape );

	/**
	 * @constructor
	 * @desc Dialog object providing modal focus management.
	 *
	 * Assumptions: The element serving as the dialog container is present in the
	 * DOM and hidden. The dialog container has role='dialog'.
	 *
	 * @param dialogId
	 * The ID of the element serving as the dialog container.
	 *
	 * @param focusAfterClosed
	 * Either the DOM node or the ID of the DOM node to focus when the
	 * dialog closes.
	 *
	 * @param focusFirst
	 * Optional parameter containing either the DOM node or the ID of the
	 * DOM node to focus when the dialog opens. If not specified, the
	 * first focusable element in the dialog will receive focus.
	 */
	aria.Authentication = function( dialogId, focusAfterClosed, focusFirst ) {

		this.dialogNode = document.getElementById( dialogId );

		if ( null === this.dialogNode ) {
			throw new Error( 'No element found with id="' + dialogId + '".' );
		}

		let validRoles = [ 'dialog', 'alertdialog' ];
		let isDialog = ( this.dialogNode.getAttribute( 'role' ) || '' )
			.trim()
			.split( /\s+/g )
			.some( function( token ) {
				return validRoles.some( function( role ) {
					return token === role;
				});
			});

		if ( ! isDialog ) {
			throw new Error(
				'Dialog() requires a DOM element with ARIA role of dialog or alertdialog.'
			);
		}

		// Wrap in an individual backdrop element if one doesn't exist
		// Native <dialog> elements use the ::backdrop pseudo-element, which
		// works similarly.
		let backdropClass = 'forminator-authentication';

		if ( this.dialogNode.parentNode.classList.contains( backdropClass ) ) {
			this.backdropNode = this.dialogNode.parentNode;
		} else {
			this.backdropNode = document.createElement( 'div' );
			this.backdropNode.className = backdropClass;
			this.backdropNode.setAttribute( 'data-markup', 'new' );
			this.dialogNode.parentNode.insertBefore( this.backdropNode, this.dialogNodev );
			this.backdropNode.appendChild( this.dialogNode );
		}

		this.backdropNode.classList.add( 'forminator-active' );

		// Disable scroll on the body element
		document.body.parentNode.classList.add( aria.Utils.dialogOpenClass );

		if ( 'string' === typeof focusAfterClosed ) {
			this.focusAfterClosed = document.getElementById( focusAfterClosed );
		} else if ( 'object' === typeof focusAfterClosed ) {
			this.focusAfterClosed = focusAfterClosed;
		} else {
			throw new Error( 'the focusAfterClosed parameter is required for the aria.Authentication constructor.' );
		}

		if ( 'string' === typeof focusFirst ) {
			this.focusFirst = document.getElementById( focusFirst );
		} else if ( 'object' === typeof focusFirst ) {
			this.focusFirst = focusFirst;
		} else {
			this.focusFirst = null;
		}

		// Bracket the dialog node with two invisible, focusable nodes.
		// While this dialog is open, we use these to make sure that focus never
		// leaves the document even if dialogNode is the first or last node.
		let preDiv = document.createElement( 'div' );

		this.preNode = this.dialogNode.parentNode.insertBefore( preDiv, this.dialogNode );
		this.preNode.tabIndex = 0;

		let postDiv = document.createElement( 'div' );

		this.postNode = this.dialogNode.parentNode.insertBefore( postDiv, this.dialogNode.nextSibling );
		this.postNode.tabIndex = 0;

		// If this modal is opening on top of one that is already open,
		// get rid of the document focus listener of the open dialog.
		if ( 0 < aria.OpenDialogList.length ) {
			aria.getCurrentDialog().removeListeners();
		}

		this.addListeners();
		aria.OpenDialogList.push( this );
		this.dialogNode.classList.add( 'forminator-authentication-fade-in' ); // make visible
		this.dialogNode.classList.remove( 'forminator-authentication-fade-out' );

		if ( this.focusFirst ) {
			this.focusFirst.focus();
		} else {
			aria.Utils.focusFirstDescendant( this.dialogNode );
		}

		this.lastFocus = document.activeElement;

	}; // end Dialog constructor.

	/**
	 * @desc Hides the current top dialog, removes listeners of the top dialog,
	 * restore listeners of a parent dialog if one was open under the one that
	 * just closed, and sets focus on the element specified for focusAfterClosed.
	 */
	aria.Authentication.prototype.close = function() {

		let self = this;

		aria.OpenDialogList.pop();
		this.removeListeners();

		this.preNode.parentNode.removeChild( this.preNode );
		this.postNode.parentNode.removeChild( this.postNode );

		this.dialogNode.classList.add( 'forminator-content-fade-out' );
		this.dialogNode.classList.remove( 'forminator-content-fade-in' );

		this.focusAfterClosed.focus();

		setTimeout( function() {
			self.backdropNode.classList.remove( 'forminator-active' );
		}, 300 );

		// If a dialog was open underneath this one, restore its listeners.
		if ( 0 < aria.OpenDialogList.length ) {
			aria.getCurrentDialog().addListeners();
		} else {
			document.body.parentNode.classList.remove( aria.Utils.dialogOpenClass );
		}
	}; // end close.

	aria.Authentication.prototype.addListeners = function() {
		document.addEventListener( 'focus', this.trapFocus, true );
	}; // end addListeners.

	aria.Authentication.prototype.removeListeners = function() {
		document.removeEventListener( 'focus', this.trapFocus, true );
	}; // end removeListeners.

	aria.Authentication.prototype.trapFocus = function( event ) {

		if ( aria.Utils.IgnoreUtilFocusChanges ) {
			return;
		}

		let currentDialog = aria.getCurrentDialog();

		if ( currentDialog.dialogNode.contains( event.target ) ) {
			currentDialog.lastFocus = event.target;
		} else {

			aria.Utils.focusFirstDescendant( currentDialog.dialogNode );

			if ( currentDialog.lastFocus == document.activeElement ) {
				aria.Utils.focusLastDescendant( currentDialog.dialogNode );
			}

			currentDialog.lastFocus = document.activeElement;
		}
	}; // end trapFocus.

	FUI.openAuthentication = function( dialogId, focusAfterClosed, focusFirst ) {
		let dialog = new aria.Authentication( dialogId, focusAfterClosed, focusFirst );
	}; // end openAuthentication.

	FUI.closeAuthentication = function() {
		let topDialog = aria.getCurrentDialog();
		topDialog.close();
	}; // end closeAuthentication.

}() );
