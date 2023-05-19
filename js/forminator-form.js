/*!
 * WPMU DEV Forminator UI
 * Copyright 2019 Incsub (https://incsub.com)
 * Licensed under GPL v3 (http://www.gnu.org/licenses/gpl-3.0.html)
 */
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
(function ($) {
  // Enable strict mode.
  'use strict';

  // Define global SUI object if it doesn't exist.
  if ('object' !== _typeof(window.FUI)) {
    window.FUI = {};
  }
  FUI.inputStates = function (el) {
    var input = $(el);
    var form = input.closest('form');
    if (!input.is('input') && (!form.is('.forminator-poll') || !form.is('.forminator-ui') && !form.is('.forminator-custom-form'))) {
      return;
    }
    function hover(element) {
      var getInput = $(element);
      var getField = getInput.closest('.forminator-field');
      getInput.mouseover(function (e) {
        getField.addClass('forminator-is_hover');
        e.stopPropagation();
      }).mouseout(function (e) {
        getField.removeClass('forminator-is_hover');
        e.stopPropagation();
      });
    }
    function focused(element) {
      var getInput = $(element);
      var getField = getInput.closest('.forminator-field');
      getInput.focus(function (e) {
        getField.addClass('forminator-is_active');
        e.stopPropagation();
      }).blur(function (e) {
        getField.removeClass('forminator-is_active');
        e.stopPropagation();
      });
    }
    function filled(element) {
      var getInput = $(element);
      var getField = getInput.closest('.forminator-field');

      // On input load
      if ('' !== getInput.val().trim()) {
        getField.addClass('forminator-is_filled');
      }

      // On input changes
      getInput.on('change', function () {
        if ('' !== getInput.val().trim()) {
          getField.addClass('forminator-is_filled');
        } else {
          getField.removeClass('forminator-is_filled');
        }
      });
    }
    function init() {
      input.each(function () {
        hover(this);
        focused(this);
        filled(this);
      });
    }
    init();
    return this;
  };
})(jQuery);
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
(function ($) {
  // Enable strict mode.
  'use strict';

  // Define global SUI object if it doesn't exist.
  if ('object' !== _typeof(window.FUI)) {
    window.FUI = {};
  }
  FUI.inputMaterial = function (el) {
    var input = $(el);
    var field = input.closest('.forminator-field');
    var label = field.find('.forminator-label');
    var form = input.closest('form');
    if (!input.is('input') && (!form.is('.forminator-poll') || !form.is('.forminator-ui') && !form.is('.forminator-custom-form'))) {
      return;
    }
    function init() {
      // Wrap Element
      if (!input.parent().hasClass('forminator-input--wrap')) {
        input.wrap('<div class="forminator-input--wrap"></div>');
      }

      // Wrap Label
      if (label.length) {
        // Add floating class
        label.addClass('forminator-floating--input');

        // Add icon class (if applies)
        if (field.find('.forminator-input-with-icon').length) {
          label.addClass('forminator-has_icon');
        }

        // Add phone class (if applies)
        if (field.find('.forminator-input-with-phone').length) {
          label.addClass('forminator-has_phone');
          if (field.find('.intl-tel-input').hasClass('allow-dropdown')) {
            label.addClass('allow-dropdown');
          }
        }
      }
    }
    init();
    return this;
  };
})(jQuery);
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
(function ($) {
  // Enable strict mode.
  'use strict';

  // Define global SUI object if it doesn't exist.
  if ('object' !== _typeof(window.FUI)) {
    window.FUI = {};
  }
  FUI.textareaStates = function (el) {
    var textarea = $(el);
    var form = textarea.closest('form');
    if (!textarea.is('textarea') && !form.is('.forminator-ui') && !form.is('.forminator-custom-form')) {
      return;
    }
    function hover(element) {
      var getTextarea = $(element);
      var getField = getTextarea.closest('.forminator-field');
      getTextarea.mouseover(function (e) {
        getField.addClass('forminator-is_hover');
        e.stopPropagation();
      }).mouseout(function (e) {
        getField.removeClass('forminator-is_hover');
        e.stopPropagation();
      });
    }
    function focused(element) {
      var getTextarea = $(element);
      var getField = getTextarea.closest('.forminator-field');
      getTextarea.focus(function (e) {
        getField.addClass('forminator-is_active');
        e.stopPropagation();
      }).blur(function (e) {
        getField.removeClass('forminator-is_active');
        e.stopPropagation();
      });
    }
    function filled(element) {
      var getTextarea = $(element);
      var getField = getTextarea.closest('.forminator-field');

      // On textarea load
      getTextarea.on('load', function () {
        if ('' !== getTextarea.val().trim()) {
          getField.addClass('forminator-is_filled');
        }
      });

      // On textarea changes
      getTextarea.on('change', function () {
        if ('' !== getTextarea.val().trim()) {
          getField.addClass('forminator-is_filled');
        } else {
          getField.removeClass('forminator-is_filled');
        }
      });
    }
    function init() {
      textarea.each(function () {
        hover(this);
        focused(this);
        filled(this);
      });
    }
    init();
    return this;
  };
})(jQuery);
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
(function ($) {
  // Enable strict mode.
  'use strict';

  // Define global SUI object if it doesn't exist.
  if ('object' !== _typeof(window.FUI)) {
    window.FUI = {};
  }
  FUI.textareaMaterial = function (el) {
    var textarea = $(el);
    var field = textarea.closest('.forminator-field');
    var label = field.find('.forminator-label');
    var form = textarea.closest('form');
    if (!textarea.is('textarea') && !form.is('.forminator-ui') && !form.is('.forminator-custom-form')) {
      return;
    }
    if (textarea.hasClass('wp-editor-area')) {
      return;
    }
    function init() {
      // Wrap Element
      if (!textarea.parent().hasClass('forminator-textarea--wrap')) {
        textarea.wrap('<div class="forminator-textarea--wrap"></div>');
      }

      // Wrap Label
      if (label.length) {
        var labelHeight = 0 === label.height() ? 20 : label.height();
        var labelPadding = 9;
        var labelMath = labelHeight + labelPadding;

        // Add floating class
        label.addClass('forminator-floating--textarea');

        // Align textarea
        field.css({
          'position': 'relative'
        });
        if (!field.hasClass('forminator-is_filled') || !field.hasClass('forminator-is_active')) {
          label.css({
            'padding-top': labelMath + 'px'
          });
        }
        textarea.css({
          'padding-top': labelMath + 'px'
        });
      }
    }
    init();
    return this;
  };
})(jQuery);
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
(function ($) {
  // Enable strict mode.
  'use strict';

  // Define global FUI object if it doesn't exist.
  if ('object' !== _typeof(window.FUI)) {
    window.FUI = {};
  }
  FUI.radioStates = function (el) {
    var label = $(el);
    var input = label.find('input');
    if (!label.is('label') || 'radio' !== input.prop('type')) {
      return;
    }
    function init() {
      input.each(function () {
        $(this).on('click', function () {
          var radioInput = $(this);
          var radioLabel = radioInput.parent();
          var radioField = radioLabel.closest('.forminator-field');
          var radioOptions = radioField.find('.forminator-radio');

          // Remove checked attribute
          radioOptions.find('input').prop('checked', false);

          // Remove checked class
          radioOptions.removeClass('forminator-is_checked');

          // Assign checked attribute
          radioInput.prop('checked', 'checked');

          // Assign checked class
          radioLabel.addClass('forminator-is_checked');
        });
      });
    }
    init();
    return this;
  };
})(jQuery);
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
(function ($) {
  // Enable strict mode.
  'use strict';

  // Define global FUI object if it doesn't exist.
  if ('object' !== _typeof(window.FUI)) {
    window.FUI = {};
  }
  FUI.checkboxStates = function (el) {
    var label = $(el);
    var input = label.find('input');
    if (!label.is('label') || 'checkbox' !== input.prop('type')) {
      return;
    }
    function init() {
      input.each(function () {
        $(this).on('click', function () {
          var checkInput = $(this);
          var checkLabel = checkInput.parent();
          if (checkLabel.is('.forminator-is_checked')) {
            checkLabel.removeClass('forminator-is_checked');
          } else {
            checkLabel.addClass('forminator-is_checked');
          }
        });
      });
    }
    init();
    return this;
  };
})(jQuery);
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
(function ($) {
  // Enable strict mode.
  'use strict';

  // Define global FUI object if it doesn't exist.
  if ('object' !== _typeof(window.FUI)) {
    window.FUI = {};
  }
  FUI.multiSelectStates = function (el) {
    var container = $(el);
    var option = container.find('.forminator-option');
    var input = option.find('input');
    if (!container.is('.forminator-multiselect') || 0 === option.length) {
      return;
    }
    function init() {
      input.each(function () {
        $(this).on('click', function () {
          var checkInput = $(this);
          var checkLabel = checkInput.parent();
          if (checkLabel.is('.forminator-is_checked')) {
            checkLabel.removeClass('forminator-is_checked');
          } else {
            checkLabel.addClass('forminator-is_checked');
          }
        });
      });
    }
    init();
    return this;
  };
})(jQuery);
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
(function ($) {
  // Enable strict mode
  'use strict';

  // Define global FUI object if it doesn't exist.
  if ('object' !== _typeof(window.FUI)) {
    window.FUI = {};
  }
  FUI.select2 = function () {
    $('.forminator-custom-form').each(function () {
      var $element = $(this),
        $formid = $element.data('form-id'),
        $select = $element.find('.forminator-select2');
      var $themes = ['bold', 'flat', 'default', 'material', 'none'];
      $.each($themes, function (index, $theme) {
        var $dir,
          $language = 'en',
          $placeholder = 'Search',
          $hasSearch = -1;
        if ($element.hasClass('forminator-design--' + $theme) && $select.length) {
          $select.each(function () {
            var $select = $(this),
              $dialog = $select.closest('.sui-dialog-content'),
              $parent = $dialog.length ? $dialog : $select.closest('.elementor-popup-modal');
            if (true === $select.data('rtl-support')) {
              $dir = 'rtl';
            } else {
              $dir = 'ltr';
            }
            if ('' !== $select.data('placeholder')) {
              $placeholder = $select.data('placeholder');
            } else {
              $placeholder = 'Search';
            }
            if ('' !== $select.data('language')) {
              $language = $select.data('language');
            } else {
              $language = 'en';
            }
            if (true === $select.data('search')) {
              $hasSearch = 0;
            } else {
              $hasSearch = -1;
            }
            if (!$parent.length) {
              $parent = $(document.body);
            }
            $select.FUIselect2({
              dir: $dir,
              language: $language,
              placeholder: $placeholder,
              dropdownCssClass: 'forminator-custom-form-' + $formid + ' forminator-dropdown--' + $theme,
              minimumResultsForSearch: $hasSearch,
              dropdownParent: $parent
            }).on('select2:opening', function () {
              $select.data('select2').$dropdown.find(':input.select2-search__field').prop('placeholder', '' !== $select.data('placeholder') ? $select.data('placeholder') : 'Search');
              if ($select.closest('.hustle-popup').length || $select.closest('.hustle-slidein')) {
                $(document.body).addClass('forminator-hustle-dropdown-fix');
              }
            }).on('select2:closing', function () {
              $(document.body).removeClass('forminator-hustle-dropdown-fix');
            });
          });
        }
      });
    });
  };
})(jQuery);
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
(function () {
  // Enable strict mode.
  'use strict';

  // Define global FUI object if it doesn't exist.
  if ('object' !== _typeof(window.FUI)) {
    window.FUI = {};
  }

  /**
   * @namespace aria
   */
  var aria = aria || {};

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
  aria.Utils.remove = function (item) {
    if (item.remove && 'function' === typeof item.remove) {
      return item.remove();
    }
    if (item.parentNode && item.parentNode.removeChild && 'function' === typeof item.parentNode.removeChild) {
      return item.parentNode.removeChild(item);
    }
    return false;
  };

  // UTILS: Verify if element can be focused.
  aria.Utils.isFocusable = function (element) {
    if (0 < element.tabIndex || 0 === element.tabIndex && null !== element.getAttribute('tabIndex')) {
      return true;
    }
    if (element.disabled) {
      return false;
    }
    switch (element.nodeName) {
      case 'A':
        return !!element.href && 'ignore' != element.rel;
      case 'INPUT':
        return 'hidden' != element.type && 'file' != element.type;
      case 'BUTTON':
      case 'SELECT':
      case 'TEXTAREA':
        return true;
      default:
        return false;
    }
  };

  /**
   * Simulate a click event.
   * @public
   * @param {Element} element the element to simulate a click on
   */
  aria.Utils.simulateClick = function (element) {
    // Create our event (with options)
    var evt = new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      view: window
    });

    // If cancelled, don't dispatch our event
    var canceled = !element.dispatchEvent(evt);
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
  aria.Utils.focusFirstDescendant = function (element) {
    for (var i = 0; i < element.childNodes.length; i++) {
      var child = element.childNodes[i];
      if (aria.Utils.attemptFocus(child) || aria.Utils.focusFirstDescendant(child)) {
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
  aria.Utils.focusLastDescendant = function (element) {
    for (var i = element.childNodes.length - 1; 0 <= i; i--) {
      var child = element.childNodes[i];
      if (aria.Utils.attemptFocus(child) || aria.Utils.focusLastDescendant(child)) {
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
  aria.Utils.attemptFocus = function (element) {
    if (!aria.Utils.isFocusable(element)) {
      return false;
    }
    aria.Utils.IgnoreUtilFocusChanges = true;
    try {
      element.focus();
    } catch (e) {}
    aria.Utils.IgnoreUtilFocusChanges = false;
    return document.activeElement === element;
  }; // end attemptFocus

  // Modals can open modals. Keep track of them with this array.
  aria.OpenDialogList = aria.OpenDialogList || new Array(0);

  /**
   * @returns the last opened dialog (the current dialog)
   */
  aria.getCurrentDialog = function () {
    if (aria.OpenDialogList && aria.OpenDialogList.length) {
      return aria.OpenDialogList[aria.OpenDialogList.length - 1];
    }
  };
  aria.closeCurrentDialog = function () {
    var currentDialog = aria.getCurrentDialog();
    if (currentDialog) {
      currentDialog.close();
      return true;
    }
    return false;
  };
  aria.handleEscape = function (event) {
    var key = event.which || event.keyCode;
    if (key === aria.Utils.ESC && aria.closeCurrentDialog()) {
      event.stopPropagation();
    }
  };
  document.addEventListener('keyup', aria.handleEscape);

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
  aria.Authentication = function (dialogId, focusAfterClosed, focusFirst) {
    this.dialogNode = document.getElementById(dialogId);
    if (null === this.dialogNode) {
      throw new Error('No element found with id="' + dialogId + '".');
    }
    var validRoles = ['dialog', 'alertdialog'];
    var isDialog = (this.dialogNode.getAttribute('role') || '').trim().split(/\s+/g).some(function (token) {
      return validRoles.some(function (role) {
        return token === role;
      });
    });
    if (!isDialog) {
      throw new Error('Dialog() requires a DOM element with ARIA role of dialog or alertdialog.');
    }

    // Wrap in an individual backdrop element if one doesn't exist
    // Native <dialog> elements use the ::backdrop pseudo-element, which
    // works similarly.
    var backdropClass = 'forminator-authentication';
    if (this.dialogNode.parentNode.classList.contains(backdropClass)) {
      this.backdropNode = this.dialogNode.parentNode;
    } else {
      this.backdropNode = document.createElement('div');
      this.backdropNode.className = backdropClass;
      this.backdropNode.data('markup', 'new');
      this.dialogNode.parentNode.insertBefore(this.backdropNode, this.dialogNodev);
      this.backdropNode.appendChild(this.dialogNode);
    }
    this.backdropNode.classList.add('forminator-active');

    // Disable scroll on the body element
    document.body.parentNode.classList.add(aria.Utils.dialogOpenClass);
    if ('string' === typeof focusAfterClosed) {
      this.focusAfterClosed = document.getElementById(focusAfterClosed);
    } else if ('object' === _typeof(focusAfterClosed)) {
      this.focusAfterClosed = focusAfterClosed;
    } else {
      throw new Error('the focusAfterClosed parameter is required for the aria.Authentication constructor.');
    }
    if ('string' === typeof focusFirst) {
      this.focusFirst = document.getElementById(focusFirst);
    } else if ('object' === _typeof(focusFirst)) {
      this.focusFirst = focusFirst;
    } else {
      this.focusFirst = null;
    }

    // Bracket the dialog node with two invisible, focusable nodes.
    // While this dialog is open, we use these to make sure that focus never
    // leaves the document even if dialogNode is the first or last node.
    var preDiv = document.createElement('div');
    this.preNode = this.dialogNode.parentNode.insertBefore(preDiv, this.dialogNode);
    this.preNode.tabIndex = 0;
    var postDiv = document.createElement('div');
    this.postNode = this.dialogNode.parentNode.insertBefore(postDiv, this.dialogNode.nextSibling);
    this.postNode.tabIndex = 0;

    // If this modal is opening on top of one that is already open,
    // get rid of the document focus listener of the open dialog.
    if (0 < aria.OpenDialogList.length) {
      aria.getCurrentDialog().removeListeners();
    }
    this.addListeners();
    aria.OpenDialogList.push(this);
    this.dialogNode.classList.add('forminator-authentication-fade-in'); // make visible
    this.dialogNode.classList.remove('forminator-authentication-fade-out');
    if (this.focusFirst) {
      this.focusFirst.focus();
    } else {
      aria.Utils.focusFirstDescendant(this.dialogNode);
    }
    this.lastFocus = document.activeElement;
  }; // end Dialog constructor.

  /**
   * @desc Hides the current top dialog, removes listeners of the top dialog,
   * restore listeners of a parent dialog if one was open under the one that
   * just closed, and sets focus on the element specified for focusAfterClosed.
   */
  aria.Authentication.prototype.close = function () {
    var self = this;
    aria.OpenDialogList.pop();
    this.removeListeners();
    this.preNode.parentNode.removeChild(this.preNode);
    this.postNode.parentNode.removeChild(this.postNode);
    this.dialogNode.classList.add('forminator-content-fade-out');
    this.dialogNode.classList.remove('forminator-content-fade-in');
    this.focusAfterClosed.focus();
    setTimeout(function () {
      self.backdropNode.classList.remove('forminator-active');
    }, 300);

    // If a dialog was open underneath this one, restore its listeners.
    if (0 < aria.OpenDialogList.length) {
      aria.getCurrentDialog().addListeners();
    } else {
      document.body.parentNode.classList.remove(aria.Utils.dialogOpenClass);
    }
  }; // end close.

  aria.Authentication.prototype.addListeners = function () {
    document.addEventListener('focus', this.trapFocus, true);
  }; // end addListeners.

  aria.Authentication.prototype.removeListeners = function () {
    document.removeEventListener('focus', this.trapFocus, true);
  }; // end removeListeners.

  aria.Authentication.prototype.trapFocus = function (event) {
    if (aria.Utils.IgnoreUtilFocusChanges) {
      return;
    }
    var currentDialog = aria.getCurrentDialog();
    if (currentDialog.dialogNode.contains(event.target)) {
      currentDialog.lastFocus = event.target;
    } else {
      aria.Utils.focusFirstDescendant(currentDialog.dialogNode);
      if (currentDialog.lastFocus == document.activeElement) {
        aria.Utils.focusLastDescendant(currentDialog.dialogNode);
      }
      currentDialog.lastFocus = document.activeElement;
    }
  }; // end trapFocus.

  FUI.openAuthentication = function (dialogId, focusAfterClosed, focusFirst) {
    var dialog = new aria.Authentication(dialogId, focusAfterClosed, focusFirst);
  }; // end openAuthentication.

  FUI.closeAuthentication = function () {
    var topDialog = aria.getCurrentDialog();
    topDialog.close();
  }; // end closeAuthentication.
})();