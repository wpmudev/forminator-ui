/*!
 * WPMU DEV Forminator UI
 * Copyright 2019 Incsub (https://incsub.com)
 * Licensed under GPL v3 (http://www.gnu.org/licenses/gpl-3.0.html)
 */
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
(function () {
  'use strict';

  if ('object' !== _typeof(window.FUI)) {
    window.FUI = {};
  }
  FUI.utils = FUI.utils || {};

  // Parse URLs before assigning href; never accept executable or embedded-data schemes.
  function getSafeUrl(value) {
    if ('string' !== typeof value || !value.trim() || /[\u0000-\u001f\u007f]/.test(value)) {
      return null;
    }
    try {
      var url = new window.URL(value.trim(), document.baseURI);
      if (!['https:', 'http:'].includes(url.protocol) || url.username || url.password) {
        return null;
      }
      return url.href;
    } catch (error) {
      return null;
    }
  }
  FUI.utils.getSafeUrl = getSafeUrl;
})();
(function () {
  'use strict';

  if ('object' !== _typeof(window.FUI)) {
    window.FUI = {};
  }
  FUI.utils = FUI.utils || {};

  /** Rebuild allowed notice markup; never insert parsed source nodes directly. */
  function renderNoticeHtml(html, linkClass) {
    var template = document.createElement('template');
    template.innerHTML = html;
    var fragment = document.createDocumentFragment();
    var allowed = ['a', 'strong', 'b', 'em', 'i', 'br', 'p', 'ul', 'ol', 'li', 'code', 'span'];
    var excluded = ['script', 'style', 'iframe', 'object', 'embed', 'template', 'noscript', 'textarea', 'select', 'button'];
    function appendNode(source, parent, depth) {
      if (3 === source.nodeType) {
        parent.appendChild(document.createTextNode(source.textContent));
        return;
      }
      if (1 !== source.nodeType || 'http://www.w3.org/1999/xhtml' !== source.namespaceURI || excluded.includes(source.localName) || 50 <= depth) {
        return;
      }
      var target = parent;
      var tag = source.localName;
      var href = 'a' === tag ? FUI.utils.getSafeUrl(source.getAttribute('href')) : null;
      if (allowed.includes(tag) && ('a' !== tag || href)) {
        target = document.createElement(tag);
        if ('a' === tag) {
          target.className = linkClass || '';
          target.href = href;
          if (source.hasAttribute('title')) {
            target.title = source.getAttribute('title');
          }
          if ('_blank' === source.getAttribute('target')) {
            target.target = '_blank';
            target.rel = 'noopener noreferrer';
          }
        }
        parent.appendChild(target);
      }
      Array.from(source.childNodes).forEach(function (child) {
        appendNode(child, target, depth + 1);
      });
    }
    Array.from(template.content.childNodes).forEach(function (node) {
      appendNode(node, fragment, 0);
    });
    return fragment;
  }

  /** Display restricted HTML strings or a plain-text structured error. */
  FUI.utils.renderNoticeHtml = renderNoticeHtml;
})();
(function () {
  'use strict';

  if ('object' !== _typeof(window.FUI)) {
    window.FUI = {};
  }
  FUI.utils = FUI.utils || {};
  function quoteCsvValue(value) {
    var text = '';
    if (null !== value && undefined !== value) {
      text = 'object' === _typeof(value) ? JSON.stringify(value) : String(value);
    }

    // Quote CSV syntax and neutralize spreadsheet formulas, including leading whitespace.
    if (/^[\s\u0000-\u001f]*[=+@-]|^[\t\r\n]/.test(text) && 'number' !== typeof value) {
      text = '\'' + text;
    }
    return '"' + text.replace(/"/g, '""') + '"';
  }
  FUI.utils.quoteCsvValue = quoteCsvValue;
})();
(function () {
  'use strict';

  if ('object' !== _typeof(window.FUI)) {
    window.FUI = {};
  }
  FUI._submissionViews = FUI._submissionViews || {};
  FUI._submissionViews.events = function (context) {
    // Shared event helpers. Every registered listener is removed on destroy.
    function listen(target, type, handler, options) {
      target.addEventListener(type, handler, options);
      context.listeners.push(function () {
        return target.removeEventListener(type, handler, options);
      });
    }
    function delegate(type, targetSelector, handler) {
      context.listen(context.view, type, function (event) {
        var target = event.target.closest(targetSelector);
        if (target && target.closest('.forminator-submission-views') === context.view) {
          handler(event, target);
        }
      });
    }
    function emit(name, detail) {
      return context.view.dispatchEvent(new CustomEvent('forminator:submission-views:' + name, {
        bubbles: true,
        cancelable: true,
        detail: detail
      }));
    }

    // Table layout and overflow.

    Object.assign(context, {
      listen: listen,
      delegate: delegate,
      emit: emit
    });
  };
})();
(function () {
  'use strict';

  if ('object' !== _typeof(window.FUI)) {
    window.FUI = {};
  }
  FUI._submissionViews = FUI._submissionViews || {};
  FUI._submissionViews.feedback = function (context) {
    // Keep the intended state separate from the temporary loading disabled state.
    function setControlDisabled(control, disabled) {
      if (context.loading) {
        context.loadingControls.set(control, disabled);
        control.disabled = true;
      } else {
        control.disabled = disabled;
      }
    }
    function syncLoadingRegions() {
      context.view.querySelectorAll(context.selector + 'toolbar, ' + context.selector + 'frame, ' + context.selector + 'footer').forEach(function (region) {
        if (!context.loadingRegions.has(region)) {
          context.loadingRegions.set(region, region.getAttribute('inert'));
        }
        region.setAttribute('inert', '');
        region.querySelectorAll('button, input, select, textarea, fieldset').forEach(function (control) {
          if (!context.loadingControls.has(control)) {
            context.loadingControls.set(control, control.disabled);
          }
          control.disabled = true;
        });
      });
    }

    /** Rebuild allowed notice markup; never insert parsed source nodes directly. */

    /** Display restricted HTML strings or a plain-text structured error. */
    function setError(value) {
      if (context.destroyed) {
        return false;
      }
      var details = value && 'object' === _typeof(value) && !Array.isArray(value) ? value : {
        message: value
      };
      if (null !== details.message && 'string' !== typeof details.message) {
        return false;
      }
      var text = null === details.message ? '' : details.message.trim();
      var link = details.link;
      if (undefined !== link && (!text || !link || 'object' !== _typeof(link) || Array.isArray(link) || 'string' !== typeof link.url || 'string' !== typeof link.label || !link.label.trim() || undefined !== link.newTab && 'boolean' !== typeof link.newTab)) {
        return false;
      }
      var alert = context.view.querySelector('[data-view-error]');
      if (!alert) {
        return false;
      }
      if ('string' === typeof value) {
        var content = FUI.utils.renderNoticeHtml(text, 'forminator-submission-views__alert-link');
        alert.hidden = !content.textContent.trim();
        alert.replaceChildren(content);
        return true;
      }
      alert.hidden = !text;
      alert.textContent = text;
      if (link) {
        alert.appendChild(document.createTextNode(' '));
        var href = FUI.utils.getSafeUrl(link.url);
        if (href) {
          var anchor = document.createElement('a');
          anchor.className = 'forminator-submission-views__alert-link';
          anchor.href = href;
          anchor.textContent = link.label;
          if (true === link.newTab) {
            anchor.target = '_blank';
            anchor.rel = 'noopener noreferrer';
          }
          alert.appendChild(anchor);
        } else {
          alert.appendChild(document.createTextNode(link.label));
        }
      }
      return true;
    }

    /** Temporarily disable table controls while the integration updates data. */

    /** Temporarily disable table controls while the integration updates data. */
    function setLoading(value) {
      if (context.destroyed || 'boolean' !== typeof value || value && !context.loader) {
        return false;
      }
      if (context.loading === value) {
        return true;
      }
      context.loading = value;
      context.view.classList.toggle(context.loadingClass, context.loading);
      if (context.loading) {
        context.setColumnOptionsOpen(false, false);
        context.stopResizing();
        context.loadingFocus = document.activeElement;
        context.view.setAttribute('aria-busy', 'true');
        context.loader.hidden = false;
        if (context.loadingFocus && context.loadingFocus.closest(context.selector + 'toolbar, ' + context.selector + 'frame, ' + context.selector + 'footer')) {
          context.loader.focus({
            preventScroll: true
          });
        }
        context.syncLoadingRegions();
      } else {
        context.loadingRegions.forEach(function (inert, region) {
          if (null === inert) {
            region.removeAttribute('inert');
          } else {
            region.setAttribute('inert', inert);
          }
        });
        context.loadingRegions.clear();
        context.loadingControls.forEach(function (disabled, control) {
          control.disabled = disabled;
        });
        context.loadingControls.clear();
        if (null === context.originalBusy) {
          context.view.removeAttribute('aria-busy');
        } else {
          context.view.setAttribute('aria-busy', context.originalBusy);
        }
        if (document.activeElement === context.loader && context.loadingFocus && context.loadingFocus.isConnected) {
          context.loadingFocus.focus({
            preventScroll: true
          });
        }
        context.loader.hidden = true;
        context.loadingFocus = null;
      }
      return true;
    }

    // Shared event helpers. Every registered listener is removed on destroy.

    Object.assign(context, {
      setControlDisabled: setControlDisabled,
      syncLoadingRegions: syncLoadingRegions,
      setError: setError,
      setLoading: setLoading
    });
  };
})();
(function () {
  'use strict';

  if ('object' !== _typeof(window.FUI)) {
    window.FUI = {};
  }
  FUI._submissionViews = FUI._submissionViews || {};
  FUI._submissionViews.layout = function (context) {
    // Table layout and overflow.
    function readWidth(name, fallback) {
      var value = getComputedStyle(context.view).getPropertyValue('--forminator-submission-views-' + name);
      var number = parseFloat(value);
      return Number.isFinite(number) ? number : fallback;
    }
    function isVisibleColumn(header) {
      return !header.hidden;
    }
    function isDataColumn(header) {
      return header.hasAttribute('data-resizable');
    }
    function detailWidth() {
      return context.readWidth('detail-column-width', 180);
    }
    function updateScrollState() {
      var remaining = context.scroll.scrollWidth - context.scroll.clientWidth;
      context.scroll.toggleAttribute('data-scrollable', 1 < remaining);

      // RTL scrollLeft is negative; the distance from the inline start is absolute.
      var contentBehind = Math.max(0, remaining - Math.abs(context.scroll.scrollLeft));
      context.scroll.toggleAttribute('data-content-behind', 1 < contentBehind);
      context.updateStickyActionWidth(contentBehind);
    }
    function updateStickyActionWidth(contentBehind) {
      var button = context.table.querySelector('tbody tr:not([hidden]) td:not([hidden]) [data-detail]');
      var offset = 0;
      if (button && 1 < contentBehind) {
        var cell = button.closest('td');
        var styles = getComputedStyle(cell);
        var cellBounds = cell.getBoundingClientRect();
        var buttonBounds = button.getBoundingClientRect();
        var rtl = 'rtl' === styles.direction;
        var startSpace = rtl ? cellBounds.right - buttonBounds.right : buttonBounds.left - cellBounds.left;
        var endSpace = parseFloat(styles.paddingInlineEnd) || 0;
        var stickyWidth = startSpace + buttonBounds.width + endSpace;

        // Let the rest of the action column enter naturally over the final scroll pixels.
        offset = Math.min(contentBehind, Math.max(0, cellBounds.width - stickyWidth));
      }
      context.scroll.style.setProperty('--forminator-submission-views-sticky-action-offset', offset + 'px');
    }
    function applyColumnWidths() {
      var _context$colgroup;
      var visibleHeaders = context.headers.filter(context.isVisibleColumn);
      var dataColumns = visibleHeaders.filter(context.isDataColumn);
      var actionWidth = context.detailWidth();
      var totalWidth = 0;
      visibleHeaders.forEach(function (header) {
        totalWidth += context.isDataColumn(header) ? context.widths.get(header) : actionWidth;
      });

      // Distribute spare space among data columns, keeping the action column fixed.
      var spareWidth = Math.max(0, context.scroll.clientWidth - totalWidth);
      var extraPerColumn = spareWidth / (dataColumns.length || 1);
      var columns = visibleHeaders.map(function (header) {
        var column = document.createElement('col');
        var width = actionWidth;
        if (context.isDataColumn(header)) {
          width = context.widths.get(header) + extraPerColumn;
        }
        column.style.width = width + 'px';
        var handle = header.querySelector(context.selector + 'resize-handle');
        if (handle) {
          handle.setAttribute('aria-valuenow', String(Math.round(width)));
        }
        return column;
      });
      (_context$colgroup = context.colgroup).replaceChildren.apply(_context$colgroup, _toConsumableArray(columns));
      context.table.style.setProperty('--forminator-submission-views-data-column-count', dataColumns.length);
      context.table.style.setProperty('--forminator-submission-views-action-column-width', visibleHeaders.some(function (header) {
        return !context.isDataColumn(header);
      }) ? actionWidth + 'px' : '0px');
      context.table.style.tableLayout = 'fixed';
      context.table.style.width = Math.max(context.scroll.clientWidth, totalWidth) + 'px';
      context.updateScrollState();
    }
    function captureColumnWidths() {
      context.headers.filter(function (header) {
        return !header.hidden;
      }).forEach(function (header) {
        return context.widths.set(header, header.getBoundingClientRect().width);
      });
    }
    function resizeColumn(header, width) {
      context.widths.set(header, Math.max(context.minColumnWidth, Math.min(context.maxColumnWidth, width)));
      context.applyColumnWidths();
    }

    // Pointer and keyboard column resizing.

    Object.assign(context, {
      readWidth: readWidth,
      isVisibleColumn: isVisibleColumn,
      isDataColumn: isDataColumn,
      detailWidth: detailWidth,
      updateScrollState: updateScrollState,
      updateStickyActionWidth: updateStickyActionWidth,
      applyColumnWidths: applyColumnWidths,
      captureColumnWidths: captureColumnWidths,
      resizeColumn: resizeColumn
    });
  };
})();
(function () {
  'use strict';

  if ('object' !== _typeof(window.FUI)) {
    window.FUI = {};
  }
  FUI._submissionViews = FUI._submissionViews || {};
  FUI._submissionViews.resizing = function (context) {
    // Pointer and keyboard column resizing.
    function bindResizeHandles() {
      context.headers.forEach(function (header) {
        var handle = header.querySelector(context.selector + 'resize-handle');
        if (!handle) {
          return;
        }
        if (!context.boundHandles.has(handle)) {
          context.rememberHandleAttributes(handle);
          context.boundHandles.add(handle);
          context.listen(handle, 'pointerdown', context.startResizing);
          context.listen(handle, 'pointermove', context.moveResizeHandle);
          context.listen(handle, 'pointerup', context.stopResizing);
          context.listen(handle, 'pointercancel', context.stopResizing);
          context.listen(handle, 'lostpointercapture', context.stopResizing);
          context.listen(handle, 'keydown', context.resizeWithKeyboard);
        }
        handle.setAttribute('aria-valuemin', String(context.minColumnWidth));
        handle.setAttribute('aria-valuemax', String(context.maxColumnWidth));
      });
    }
    function rememberHandleAttributes(handle) {
      var names = ['style', 'aria-valuemin', 'aria-valuemax', 'aria-valuenow'];
      var attributes = names.map(function (name) {
        return [name, handle.getAttribute(name)];
      });
      context.handleAttributes.set(handle, attributes);
    }
    function getResizeDirection() {
      return 'rtl' === getComputedStyle(context.table).direction ? -1 : 1;
    }
    function startResizing(event) {
      if (0 !== event.button || context.resizing) {
        return;
      }
      event.preventDefault();
      context.captureColumnWidths();
      var header = event.currentTarget.closest('th');
      context.resizing = {
        header: header,
        x: event.clientX,
        width: context.widths.get(header),
        direction: context.getResizeDirection()
      };
      context.view.setAttribute('data-column-resizing', '');
      event.currentTarget.setPointerCapture(event.pointerId);
    }
    function moveResizeHandle(event) {
      if (!context.resizing || context.resizing.header !== event.currentTarget.closest('th')) {
        return;
      }
      var distance = (event.clientX - context.resizing.x) * context.resizing.direction;
      context.resizeColumn(context.resizing.header, context.resizing.width + distance);
    }
    function stopResizing() {
      context.resizing = null;
      context.view.removeAttribute('data-column-resizing');
    }
    function resizeWithKeyboard(event) {
      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) {
        return;
      }
      event.preventDefault();
      context.captureColumnWidths();
      var header = event.currentTarget.closest('th');
      var step = event.shiftKey ? 50 : 10;
      var width = context.widths.get(header);
      if ('Home' === event.key) {
        width = context.minColumnWidth;
      } else if ('End' === event.key) {
        width = context.maxColumnWidth;
      } else {
        var direction = 'ArrowRight' === event.key ? 1 : -1;
        width += direction * context.getResizeDirection() * step;
      }
      context.resizeColumn(header, width);
    }

    // Submission content is supplied by Forminator, independently of table columns.

    Object.assign(context, {
      bindResizeHandles: bindResizeHandles,
      rememberHandleAttributes: rememberHandleAttributes,
      getResizeDirection: getResizeDirection,
      startResizing: startResizing,
      moveResizeHandle: moveResizeHandle,
      stopResizing: stopResizing,
      resizeWithKeyboard: resizeWithKeyboard
    });
  };
})();
(function () {
  'use strict';

  if ('object' !== _typeof(window.FUI)) {
    window.FUI = {};
  }
  FUI._submissionViews = FUI._submissionViews || {};
  FUI._submissionViews.fields = function (context) {
    // Submission content is supplied by Forminator, independently of table columns.
    function createText(value, emptyValue) {
      var text = document.createElement('bdi');
      text.dir = 'auto';
      text.textContent = null === value || undefined === value || '' === value ? emptyValue : String(value);
      return text;
    }
    function renderValue(container, value, emptyValue) {
      if (Array.isArray(value)) {
        var list = document.createElement('ul');
        value.forEach(function (item) {
          var entry = document.createElement('li');
          entry.appendChild(context.createText(item, emptyValue));
          list.appendChild(entry);
        });
        if (value.length) {
          container.appendChild(list);
          return;
        }
        value = null;
      }
      container.appendChild(context.createText(value, emptyValue));
    }

    // Parse URLs before assigning href; never accept executable or embedded-data schemes.

    function renderLink(container, value, field, emptyValue) {
      var details = value && 'object' === _typeof(value) ? value : {
        url: value
      };
      var href = FUI.utils.getSafeUrl(details.url);
      var label = details.label || details.name || details.url;
      if (!href) {
        container.appendChild(context.createText(label, emptyValue));
        return;
      }
      var link = document.createElement('a');
      link.href = href;
      link.appendChild(context.createText(label, emptyValue));
      if (true === field.newTab) {
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
      }
      if (['file', 'upload'].includes(field.type)) {
        link.setAttribute('download', '');
      }
      container.appendChild(link);
    }
    function renderLinkField(container, field, emptyValue) {
      if (!Array.isArray(field.value)) {
        context.renderLink(container, field.value, field, emptyValue);
        return;
      }
      if (!field.value.length) {
        container.appendChild(context.createText(null, emptyValue));
        return;
      }
      var list = document.createElement('ul');
      field.value.forEach(function (value) {
        var item = document.createElement('li');
        context.renderLink(item, value, field, emptyValue);
        list.appendChild(item);
      });
      container.appendChild(list);
    }
    function renderRepeater(entries, emptyValue) {
      var group = document.createElement('dl');
      group.className = 'forminator-submission-views__group';
      entries.forEach(function (entry) {
        if (!entry || !Array.isArray(entry.fields)) {
          return;
        }

        // Unlabelled entries show child fields directly, like Address.
        if (!entry.label) {
          var fields = context.renderFields(entry.fields, emptyValue, true);
          group.append.apply(group, _toConsumableArray(Array.from(fields.children)));
          return;
        }
        var row = document.createElement('div');
        var label = document.createElement('dt');
        var content = document.createElement('dd');

        // Keep a named entry group only when Forminator supplies its label.
        label.appendChild(context.createText(entry.label, emptyValue));
        content.appendChild(context.renderFields(entry.fields, emptyValue, true));
        row.append(label, content);
        group.appendChild(row);
      });
      return group;
    }
    function renderFields(fields, emptyValue, nested) {
      var list = document.createElement('dl');
      list.className = nested ? 'forminator-submission-views__group' : 'forminator-submission-views__fields';
      fields.forEach(function (field) {
        if (!field || 'object' !== _typeof(field)) {
          return;
        }
        var row = document.createElement('div');
        var label = document.createElement('dt');
        var content = document.createElement('dd');
        if (!nested) {
          row.className = 'forminator-submission-views__field';
        }
        if (undefined !== field.id) {
          row.dataset.fieldId = String(field.id);
        }
        label.appendChild(context.createText(field.label, emptyValue));
        if ('repeater' === field.type && Array.isArray(field.entries) && field.entries.length) {
          content.appendChild(context.renderRepeater(field.entries, emptyValue));
        } else if (Array.isArray(field.fields)) {
          content.appendChild(context.renderFields(field.fields, emptyValue, true));
        } else if (['link', 'url', 'file', 'upload'].includes(field.type)) {
          context.renderLinkField(content, field, emptyValue);
        } else {
          context.renderValue(content, field.value, emptyValue);
        }
        row.append(label, content);
        list.appendChild(row);
      });
      return list;
    }

    /** Replace dialog fields without opening it or changing the table. */

    Object.assign(context, {
      createText: createText,
      renderValue: renderValue,
      renderLink: renderLink,
      renderLinkField: renderLinkField,
      renderRepeater: renderRepeater,
      renderFields: renderFields
    });
  };
})();
(function () {
  'use strict';

  if ('object' !== _typeof(window.FUI)) {
    window.FUI = {};
  }
  FUI._submissionViews = FUI._submissionViews || {};
  FUI._submissionViews.sidebar = function (context) {
    /** Replace dialog fields without opening it or changing the table. */
    function setSubmission(submission) {
      if (context.destroyed || !context.panelBody || !submission || !Array.isArray(submission.fields)) {
        return false;
      }

      // Validate the whole record before replacing either its title or fields.
      var title = context.panel.querySelector('[data-submission-title]');
      if (!title || 'string' !== typeof submission.title || !submission.title.trim()) {
        return false;
      }
      var emptyValue = undefined === submission.emptyValue ? '—' : String(submission.emptyValue);
      var fields = context.renderFields(submission.fields, emptyValue, false);
      title.textContent = submission.title.trim();
      context.activeSubmissionId = submission.id;
      context.updateSidebarDelete();
      context.panelBody.replaceChildren(fields);
      context.panelBody.scrollTop = 0;
      return true;
    }

    // Sidebar opening, animated dismissal and focus restoration.

    // Sidebar opening, animated dismissal and focus restoration.
    function openPanel(trigger) {
      if (!context.panel || context.panel.open || context.destroyed) {
        return;
      }
      context.opener = trigger || document.activeElement;
      var row = trigger && trigger.closest('tr');
      if (row) {
        context.activeSubmissionId = row.dataset.id;
      }
      context.updateSidebarDelete();
      context.panel.dataset.state = 'closed';
      context.panel.showModal();

      // Establish the offscreen position before starting the CSS transition.
      context.panel.getBoundingClientRect();
      context.panel.dataset.state = 'open';
      if (context.panelBody) {
        context.panelBody.scrollTop = 0;
      }
    }
    function finishClose() {
      if ('closing' !== context.panel.dataset.state) {
        return;
      }
      clearTimeout(context.closeTimer);
      context.panel.close();
    }
    function closePanel() {
      if (!context.panel || !context.panel.open || 'closing' === context.panel.dataset.state) {
        return;
      }
      context.panel.dataset.state = 'closing';
      if (context.reducedMotion.matches) {
        context.finishClose();
        return;
      }

      // A fallback also handles zero-duration overrides or interrupted transitions.
      var durations = getComputedStyle(context.panel).transitionDuration.split(',').map(function (value) {
        return parseFloat(value) * (value.trim().endsWith('ms') ? 1 : 1000);
      });
      context.closeTimer = setTimeout(context.finishClose, Math.max.apply(Math, _toConsumableArray(durations)) + 50);
    }
    function isOutsidePanel(event) {
      var bounds = context.panel.getBoundingClientRect();
      return event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom;
    }
    function rememberOutsidePointer(event) {
      context.pointerStartedOutside = event.target === context.panel && context.isOutsidePanel(event);
    }
    function resetOutsidePointer() {
      context.pointerStartedOutside = false;
    }
    function dismissOutsideClick(event) {
      if (context.pointerStartedOutside && event.target === context.panel && context.isOutsidePanel(event)) {
        context.closePanel();
      }
      context.resetOutsidePointer();
    }
    function cancelPanel(event) {
      event.preventDefault();
      context.closePanel();
    }
    function finishPanelTransition(event) {
      if (event.target === context.panel && 'transform' === event.propertyName) {
        context.finishClose();
      }
    }
    function handlePanelClosed() {
      clearTimeout(context.closeTimer);
      delete context.panel.dataset.state;
      context.emit('close', {});
      if (context.opener && context.opener.isConnected) {
        context.opener.focus();
      } else {
        context.focusAvailableControl();
      }
    }
    function bindPanelEvents() {
      if (!context.panel) {
        return;
      }
      context.listen(context.panel, 'pointerdown', context.rememberOutsidePointer);
      context.listen(context.panel, 'pointercancel', context.resetOutsidePointer);
      context.listen(context.panel, 'click', context.dismissOutsideClick);
      context.listen(context.panel, 'cancel', context.cancelPanel);
      context.listen(context.panel, 'transitionend', context.finishPanelTransition);
      context.listen(context.panel, 'close', context.handlePanelClosed);
      context.delegate('click', '[data-close]', context.closePanel);
    }

    // Controls request data actions; Forminator owns result rendering and exports.

    Object.assign(context, {
      setSubmission: setSubmission,
      openPanel: openPanel,
      finishClose: finishClose,
      closePanel: closePanel,
      isOutsidePanel: isOutsidePanel,
      rememberOutsidePointer: rememberOutsidePointer,
      resetOutsidePointer: resetOutsidePointer,
      dismissOutsideClick: dismissOutsideClick,
      cancelPanel: cancelPanel,
      finishPanelTransition: finishPanelTransition,
      handlePanelClosed: handlePanelClosed,
      bindPanelEvents: bindPanelEvents
    });
  };
})();
(function () {
  'use strict';

  if ('object' !== _typeof(window.FUI)) {
    window.FUI = {};
  }
  FUI._submissionViews = FUI._submissionViews || {};
  FUI._submissionViews.pagination = function (context) {
    /** Update pagination markup after Forminator supplies the current results. */
    function setPagination(options) {
      if (context.destroyed || !options || 'object' !== _typeof(options)) {
        return false;
      }
      var page = options.page,
        pageSize = options.pageSize,
        totalPages = options.totalPages,
        statusText = options.statusText;
      if (!Number.isSafeInteger(page) || !Number.isSafeInteger(pageSize) || !Number.isSafeInteger(totalPages) || 1 > pageSize || 0 > totalPages || 0 > page || (0 === totalPages ? 1 < page : 1 > page || page > totalPages) || undefined !== statusText && 'string' !== typeof statusText) {
        return false;
      }

      // Query current controls so replaced pagination markup works too.
      var size = context.view.querySelector('[data-page-size]');
      if (size && !Array.from(size.options).some(function (option) {
        return option.value === String(pageSize);
      })) {
        return false;
      }
      var empty = 0 === totalPages;
      var status = context.view.querySelector('[data-page-status]');
      if (status) {
        status.textContent = undefined === statusText ? empty ? '0 of 0' : page + ' of ' + totalPages : statusText;
      }
      if (size) {
        size.value = String(pageSize);
      }
      var disabled = {
        first: empty || 1 >= page,
        previous: empty || 1 >= page,
        next: empty || page >= totalPages,
        last: empty || page >= totalPages
      };
      context.view.querySelectorAll('[data-page]').forEach(function (button) {
        if (Object.prototype.hasOwnProperty.call(disabled, button.dataset.page)) {
          context.setControlDisabled(button, disabled[button.dataset.page]);
        }
      });
      return true;
    }
    function requestPageSize(event, input) {
      context.emit('page-size', {
        value: Number(input.value)
      });
    }
    function requestPage(event, button) {
      if (!button.disabled) {
        context.emit('page', {
          action: button.dataset.page
        });
      }
    }
    Object.assign(context, {
      setPagination: setPagination,
      requestPageSize: requestPageSize,
      requestPage: requestPage
    });
  };
})();
(function () {
  'use strict';

  if ('object' !== _typeof(window.FUI)) {
    window.FUI = {};
  }
  FUI._submissionViews = FUI._submissionViews || {};
  FUI._submissionViews.columns = function (context) {
    function setColumnOptionsOpen(open, restoreFocus) {
      if (!context.columnOptions || !context.columnsButton) {
        return;
      }
      context.columnOptions.hidden = !open;
      context.columnsButton.setAttribute('aria-expanded', String(open));
      if (open) {
        context.positionColumnOptions();
        var checkbox = context.columnOptions.querySelector('input:not(:disabled)');
        if (checkbox) {
          checkbox.focus({
            preventScroll: true
          });
        }
      } else if (restoreFocus) {
        context.columnsButton.focus();
      }
    }
    function positionColumnOptions() {
      var anchor = context.columnsButton.getBoundingClientRect();
      var gap = Math.max(0, context.readWidth('columns-offset', 8));
      var gutter = Math.max(0, context.readWidth('columns-viewport-gutter', 16));
      var below = window.innerHeight - anchor.bottom - gap - gutter;
      var above = anchor.top - gap - gutter;
      var placeAbove = 200 > below && above > below;
      context.columnOptions.dataset.placement = placeAbove ? 'top' : 'bottom';
      context.columnOptions.style.maxHeight = Math.max(0, Math.min(context.readWidth('columns-max-height', 360), placeAbove ? above : below)) + 'px';
      context.columnOptions.style.transform = '';
      var bounds = context.columnOptions.getBoundingClientRect();
      var offset = Math.max(gutter - bounds.left, Math.min(0, document.documentElement.clientWidth - gutter - bounds.right));
      context.columnOptions.style.transform = 'translateX(' + offset + 'px)';
    }
    function toggleColumnOptions() {
      if (context.columnOptions) {
        context.setColumnOptionsOpen(context.columnOptions.hidden, false);
      }
    }
    function dismissColumnOptions(event) {
      if (!context.columnOptions || !context.columnsButton || context.columnOptions.hidden) {
        return;
      }
      if (!context.columnOptions.contains(event.target) && !context.columnsButton.contains(event.target)) {
        context.setColumnOptionsOpen(false, false);
      }
    }
    function handleColumnOptionsKeydown(event) {
      if ('Escape' === event.key && context.columnOptions && !context.columnOptions.hidden) {
        event.preventDefault();
        context.setColumnOptionsOpen(false, true);
      }
    }
    function setColumnVisible(index, visible) {
      Array.from(context.table.rows).forEach(function (row) {
        if (row.cells[index]) {
          row.cells[index].hidden = !visible;
        }
      });
    }
    function updateColumnOptions() {
      var dataColumns = context.headers.filter(context.isDataColumn);
      var visibleColumns = dataColumns.filter(context.isVisibleColumn);
      if (!visibleColumns.length && dataColumns.length) {
        context.setColumnVisible(context.headers.indexOf(dataColumns[0]), true);
        visibleColumns = [dataColumns[0]];
      }
      if (!context.columnOptions) {
        return;
      }
      context.columnOptions.querySelectorAll('[data-column]').forEach(function (input) {
        var header = context.headers[Number(input.dataset.column)];
        if (!header || !context.isDataColumn(header)) {
          return;
        }
        if (!context.originalColumnDisabled.has(input)) {
          context.originalColumnDisabled.set(input, context.loadingControls.has(input) ? context.loadingControls.get(input) : input.disabled);
        }
        input.checked = !header.hidden;
        context.setControlDisabled(input, context.originalColumnDisabled.get(input) || input.checked && 1 === visibleColumns.length);
      });
    }
    function changeColumnVisibility(event, input) {
      var index = Number(input.dataset.column);
      if (!Number.isInteger(index) || !context.headers[index] || !context.isDataColumn(context.headers[index])) {
        return;
      }
      var visibleColumns = context.headers.filter(context.isDataColumn).filter(context.isVisibleColumn);
      if (!input.checked && !context.headers[index].hidden && 1 === visibleColumns.length) {
        context.updateColumnOptions();
        return;
      }
      context.setColumnVisible(index, input.checked);
      context.updateColumnOptions();
      context.applyColumnWidths();
      context.emit('columns', {
        index: index,
        visible: input.checked
      });
    }

    // Export data is explicit and independent of the table's displayed values.

    Object.assign(context, {
      setColumnOptionsOpen: setColumnOptionsOpen,
      positionColumnOptions: positionColumnOptions,
      toggleColumnOptions: toggleColumnOptions,
      dismissColumnOptions: dismissColumnOptions,
      handleColumnOptionsKeydown: handleColumnOptionsKeydown,
      setColumnVisible: setColumnVisible,
      updateColumnOptions: updateColumnOptions,
      changeColumnVisibility: changeColumnVisibility
    });
  };
})();
(function () {
  'use strict';

  if ('object' !== _typeof(window.FUI)) {
    window.FUI = {};
  }
  FUI._submissionViews = FUI._submissionViews || {};
  FUI._submissionViews.deletion = function (context) {
    function updateSidebarDelete() {
      if (context.sidebarDelete) {
        context.sidebarDelete.disabled = undefined === context.activeSubmissionId || null === context.activeSubmissionId;
      }
    }
    function requestDelete(event, trigger) {
      if (!context.deleteDialog || context.deleteDialog.open || context.pendingDelete) {
        return;
      }
      var row = trigger.closest('tr');
      var fromSidebar = context.panel && context.panel.contains(trigger);
      var id = row ? row.dataset.id : context.activeSubmissionId;
      if (undefined === id || null === id || !row && !fromSidebar) {
        return;
      }
      context.pendingDelete = {
        id: id,
        trigger: trigger,
        source: fromSidebar ? 'sidebar' : 'table'
      };
      context.deleteConfirmed = false;
      context.setColumnOptionsOpen(false, false);
      context.deleteDialog.dataset.state = 'closed';
      context.deleteDialog.showModal();

      // Establish the entry frame before transitioning the dialog and backdrop.
      context.deleteDialog.getBoundingClientRect();
      getComputedStyle(context.deleteDialog, '::backdrop').opacity;
      context.deleteDialog.dataset.state = 'open';
      var cancel = context.deleteDialog.querySelector('[data-delete-cancel]');
      if (cancel) {
        cancel.focus();
      }
    }
    function finishDeleteDialogClose() {
      if (context.deleteDialog && 'closing' === context.deleteDialog.dataset.state) {
        clearTimeout(context.deleteCloseTimer);
        context.deleteDialog.close();
      }
    }
    function closeDeleteDialog() {
      if (!context.deleteDialog || !context.deleteDialog.open || 'closing' === context.deleteDialog.dataset.state) {
        return;
      }
      context.deleteDialog.dataset.state = 'closing';
      var durations = getComputedStyle(context.deleteDialog).transitionDuration.split(',').map(function (value) {
        var duration = parseFloat(value) || 0;
        return duration * (value.trim().endsWith('ms') ? 1 : 1000);
      });
      var duration = Math.max.apply(Math, [0].concat(_toConsumableArray(durations)));
      if (!duration) {
        context.finishDeleteDialogClose();
        return;
      }
      context.deleteCloseTimer = setTimeout(context.finishDeleteDialogClose, duration + 50);
    }
    function finishDeleteTransition(event) {
      if (event.target === context.deleteDialog && 'opacity' === event.propertyName) {
        context.finishDeleteDialogClose();
      }
    }
    function cancelDelete(event) {
      if (event) {
        event.preventDefault();
      }
      context.closeDeleteDialog();
    }
    function confirmDelete() {
      if (!context.deleteDialog || !context.deleteDialog.open || !context.pendingDelete || context.deleteConfirmed) {
        return;
      }
      context.deleteConfirmed = true;
      var request = context.pendingDelete;
      context.closeDeleteDialog();
      if ('sidebar' === request.source) {
        context.closePanel();
      }

      // No record is removed by FUI. Forminator handles the confirmed request.
      context.emit('delete', request);
    }
    function handleDeleteDialogClosed() {
      clearTimeout(context.deleteCloseTimer);
      delete context.deleteDialog.dataset.state;
      var trigger = context.pendingDelete && context.pendingDelete.trigger;
      if (!context.deleteConfirmed && trigger && trigger.isConnected) {
        trigger.focus();
      } else if (!context.panel || !context.panel.open) {
        context.focusAvailableControl();
      }
      context.pendingDelete = null;
    }
    function focusAvailableControl() {
      var action = context.view.querySelector('tbody tr:not([hidden]) td:not([hidden]) [data-detail]');
      var search = context.view.querySelector('[type="search"]');
      var target = action || search;
      if (target) {
        target.focus();
      }
    }
    function bindDeleteDialogEvents() {
      if (!context.deleteDialog) {
        return;
      }
      context.listen(context.deleteDialog, 'cancel', context.cancelDelete);
      context.listen(context.deleteDialog, 'close', context.handleDeleteDialogClosed);
      context.listen(context.deleteDialog, 'transitionend', context.finishDeleteTransition);
      context.delegate('click', '[data-delete-cancel]', context.cancelDelete);
      context.delegate('click', '[data-delete-confirm]', context.confirmDelete);
    }
    Object.assign(context, {
      updateSidebarDelete: updateSidebarDelete,
      requestDelete: requestDelete,
      finishDeleteDialogClose: finishDeleteDialogClose,
      closeDeleteDialog: closeDeleteDialog,
      finishDeleteTransition: finishDeleteTransition,
      cancelDelete: cancelDelete,
      confirmDelete: confirmDelete,
      handleDeleteDialogClosed: handleDeleteDialogClosed,
      focusAvailableControl: focusAvailableControl,
      bindDeleteDialogEvents: bindDeleteDialogEvents
    });
  };
})();
(function () {
  'use strict';

  if ('object' !== _typeof(window.FUI)) {
    window.FUI = {};
  }
  FUI._submissionViews = FUI._submissionViews || {};
  FUI._submissionViews.csv = function (context) {
    // Export data is explicit and independent of the table's displayed values.
    function getCsv(options) {
      if (context.destroyed || !options || !Array.isArray(options.fields) || !Array.isArray(options.rows)) {
        return false;
      }
      var mode = options.mode || 'all';
      if (!['all', 'visible'].includes(mode)) {
        return false;
      }
      var ids = new Set();
      var _iterator = _createForOfIteratorHelper(options.fields),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var field = _step.value;
          if (!field || 'string' !== typeof field.id || !field.id || ids.has(field.id)) {
            return false;
          }
          ids.add(field.id);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      var fields = options.fields;
      if ('visible' === mode) {
        var visibleIds = options.visibleFieldIds;
        if (undefined === visibleIds) {
          visibleIds = context.headers.filter(context.isDataColumn).filter(context.isVisibleColumn).map(function (header) {
            return header.dataset.fieldId;
          });
        }
        if (!Array.isArray(visibleIds)) {
          return false;
        }
        fields = fields.filter(function (field) {
          return visibleIds.includes(field.id);
        });
      }
      if (!fields.length) {
        return false;
      }
      try {
        var lines = [fields.map(function (field) {
          return FUI.utils.quoteCsvValue(undefined === field.label ? field.id : field.label);
        }).join(',')];
        var _iterator2 = _createForOfIteratorHelper(options.rows),
          _step2;
        try {
          var _loop = function _loop() {
              var row = _step2.value;
              if (!row || 'object' !== _typeof(row) || Array.isArray(row)) {
                return {
                  v: false
                };
              }
              lines.push(fields.map(function (field) {
                var value = Object.prototype.hasOwnProperty.call(row, field.id) ? row[field.id] : null;
                return FUI.utils.quoteCsvValue(value);
              }).join(','));
            },
            _ret;
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            _ret = _loop();
            if (_ret) return _ret.v;
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
        return lines.join('\r\n') + '\r\n';
      } catch (error) {
        // Cyclic or otherwise unserializable field data must not produce a partial file.
        return false;
      }
    }
    function downloadCsv(options) {
      var csv = context.getCsv(options);
      if (false === csv) {
        return false;
      }
      var filename = 'string' === typeof options.filename ? options.filename.trim() : 'submissions.csv';
      filename = filename.replace(/[\\/:*?"<>|\u0000-\u001f]/g, '-') || 'submissions.csv';
      if (!/\.csv$/i.test(filename)) {
        filename += '.csv';
      }
      var content = false === options.bom ? csv : "\uFEFF" + csv;
      var url = URL.createObjectURL(new Blob([content], {
        type: 'text/csv;charset=utf-8;'
      }));
      var link = document.createElement('a');
      link.href = url;
      link.download = filename;
      link.hidden = true;
      document.body.appendChild(link);
      try {
        link.click();
      } finally {
        link.remove();
        setTimeout(function () {
          return URL.revokeObjectURL(url);
        }, 1000);
      }
      return true;
    }
    function requestExport() {
      context.emit('export', {
        format: 'csv'
      });
    }
    Object.assign(context, {
      getCsv: getCsv,
      downloadCsv: downloadCsv,
      requestExport: requestExport
    });
  };
})();
(function () {
  'use strict';

  if ('object' !== _typeof(window.FUI)) {
    window.FUI = {};
  }
  FUI._submissionViews = FUI._submissionViews || {};
  FUI._submissionViews.controls = function (context) {
    // Controls request data actions; Forminator owns result rendering and exports.
    function requestDetail(event, trigger) {
      if (context.panel && context.panel.open) {
        return;
      }
      var row = trigger.closest('tr');
      var id = row ? row.dataset.id : trigger.dataset.detail;

      // A consumer can prevent opening while it loads the selected record.
      if (context.emit('detail', {
        trigger: trigger,
        id: id
      })) {
        context.openPanel(trigger);
      }
    }
    function requestSearch(event, input) {
      context.emit('search', {
        value: input.value
      });
    }

    /** Update pagination markup after Forminator supplies the current results. */

    function bindControlEvents() {
      context.delegate('click', '[data-detail]', context.requestDetail);
      context.delegate('click', '[data-delete]', context.requestDelete);
      context.listen(document, 'pointerdown', context.dismissColumnOptions);
      context.listen(document, 'focusin', context.dismissColumnOptions);
      context.listen(context.view, 'keydown', context.handleColumnOptionsKeydown);
      context.delegate('input', '[type="search"]', context.requestSearch);
      context.delegate('change', '[data-page-size]', context.requestPageSize);
      context.delegate('click', '[data-page]', context.requestPage);
      context.delegate('click', '[data-columns-toggle]', context.toggleColumnOptions);
      context.delegate('change', '[data-column]', context.changeColumnVisibility);
      context.delegate('click', '[data-download]', context.requestExport);
    }

    // Instance lifecycle.

    Object.assign(context, {
      requestDetail: requestDetail,
      requestSearch: requestSearch,
      bindControlEvents: bindControlEvents
    });
  };
})();
(function ($) {
  'use strict';

  if ('object' !== _typeof(window.FUI)) {
    window.FUI = {};
  }
  var instances = new WeakMap();

  /**
   * Initialize one view. Repeated calls return its existing controller.
   * Forminator supplies data through the events emitted by this module.
   */
  FUI.submissionViews = function (element) {
    var context = {};
    context.view = $(element)[0];
    if (!context.view || !context.view.matches('.forminator-ui.forminator-submission-views')) {
      return;
    }
    if (instances.has(context.view)) {
      return instances.get(context.view);
    }

    // Cache this instance's elements before binding any behavior.
    context.selector = '.forminator-submission-views__';
    context.table = context.view.querySelector('table');
    context.scroll = context.view.querySelector(context.selector + 'scroll');
    context.panel = context.view.querySelector(context.selector + 'panel');
    context.deleteDialog = context.view.querySelector('[data-delete-dialog]');
    context.sidebarDelete = context.panel ? context.panel.querySelector('[data-delete]') : null;
    context.panelBody = context.view.querySelector(context.selector + 'panel-body');
    context.columnOptions = context.view.querySelector('[data-columns]');
    context.columnsButton = context.view.querySelector('[data-columns-toggle]');
    context.originalColumnStyle = context.columnOptions ? context.columnOptions.getAttribute('style') : null;
    if (!context.table || !context.table.tHead || !context.table.tHead.rows.length || !context.scroll) {
      return;
    }

    // Per-instance state and original markup needed by destroy().
    context.listeners = [];
    context.boundHandles = new WeakSet();
    context.handleAttributes = new Map();
    context.originalColumnDisabled = new Map();
    context.widths = new Map();
    context.originalColgroup = context.table.querySelector('colgroup');
    context.colgroup = context.originalColgroup || document.createElement('colgroup');
    context.originalColumns = Array.from(context.colgroup.childNodes);
    context.originalTableStyle = context.table.getAttribute('style');
    context.originalScrollStyle = context.scroll.getAttribute('style');
    context.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    context.headers = [];
    context.minColumnWidth = 200;
    context.maxColumnWidth = 1200;
    context.deleteConfirmed = false;
    context.pointerStartedOutside = false;
    context.destroyed = false;
    context.loading = false;
    context.loadingClass = 'forminator-submission-views--loading';
    context.initiallyLoading = context.view.classList.contains(context.loadingClass);
    context.originalBusy = context.view.getAttribute('aria-busy');
    context.loadingRegions = new Map();
    context.loadingControls = new Map();
    context.loader = context.view.querySelector(context.selector + 'loader');
    context.originalLoaderHidden = context.loader ? context.loader.hidden : true;

    // Each feature attaches its methods to this instance’s shared context.
    Object.values(FUI._submissionViews).forEach(function (register) {
      register(context);
    });
    Object.assign(context, {
      refresh: refresh,
      destroy: destroy,
      updateLayout: updateLayout,
      refreshDirection: refreshDirection,
      observeLayout: observeLayout,
      init: init
    });

    // Instance lifecycle.
    function refresh() {
      if (context.destroyed || !context.table.tHead || !context.table.tHead.rows.length) {
        return;
      }
      if (context.loading) {
        context.syncLoadingRegions();
      }
      context.minColumnWidth = context.readWidth('column-min-width', 200);
      context.maxColumnWidth = Math.max(1200, context.minColumnWidth);
      context.headers = Array.from(context.table.tHead.rows[0].cells);
      context.headers.forEach(function (header) {
        var savedWidth = context.widths.get(header) || context.minColumnWidth;
        context.widths.set(header, Math.max(context.minColumnWidth, savedWidth));
      });
      context.updateColumnOptions();

      // New AJAX rows inherit visibility from the current data headers.
      context.headers.forEach(function (header, index) {
        if (context.isDataColumn(header)) {
          context.setColumnVisible(index, context.isVisibleColumn(header));
        }
      });
      context.bindResizeHandles();
      context.applyColumnWidths();
    }
    function destroy() {
      if (context.destroyed) {
        return;
      }
      context.setLoading(false);
      if (context.loader) {
        context.loader.hidden = context.originalLoaderHidden;
      }
      context.view.classList.toggle(context.loadingClass, context.initiallyLoading);
      context.destroyed = true;
      clearTimeout(context.deleteCloseTimer);
      context.pendingDelete = null;
      if (context.deleteDialog && context.deleteDialog.open) {
        context.deleteDialog.close();
      }
      context.setColumnOptionsOpen(false, false);
      if (context.columnOptions) {
        delete context.columnOptions.dataset.placement;
        if (null === context.originalColumnStyle) {
          context.columnOptions.removeAttribute('style');
        } else {
          context.columnOptions.setAttribute('style', context.originalColumnStyle);
        }
      }
      clearTimeout(context.closeTimer);
      if (context.observer) {
        context.observer.disconnect();
      }
      context.directionObserver.disconnect();
      context.listeners.forEach(function (remove) {
        return remove();
      });
      context.originalColumnDisabled.forEach(function (disabled, input) {
        input.disabled = disabled;
      });
      context.handleAttributes.forEach(function (attributes, handle) {
        attributes.forEach(function (_ref) {
          var _ref2 = _slicedToArray(_ref, 2),
            name = _ref2[0],
            value = _ref2[1];
          if (null === value) {
            handle.removeAttribute(name);
          } else {
            handle.setAttribute(name, value);
          }
        });
      });
      if (context.panel && context.panel.open) {
        context.panel.close();
        if (context.opener && context.opener.isConnected) {
          context.opener.focus();
        }
      }
      if (context.panel) {
        delete context.panel.dataset.state;
      }
      if (context.originalColgroup) {
        var _context$colgroup2;
        (_context$colgroup2 = context.colgroup).replaceChildren.apply(_context$colgroup2, _toConsumableArray(context.originalColumns));
      } else {
        context.colgroup.remove();
      }
      if (null === context.originalTableStyle) {
        context.table.removeAttribute('style');
      } else {
        context.table.setAttribute('style', context.originalTableStyle);
      }
      context.scroll.removeAttribute('data-scrollable');
      context.scroll.removeAttribute('data-content-behind');
      if (null === context.originalScrollStyle) {
        context.scroll.removeAttribute('style');
      } else {
        context.scroll.setAttribute('style', context.originalScrollStyle);
      }
      context.view.removeAttribute('data-column-resizing');
      instances["delete"](context.view);
    }
    function updateLayout() {
      if (!context.destroyed) {
        context.applyColumnWidths();
      }
    }
    function refreshDirection() {
      if (!context.destroyed) {
        context.refresh();
      }
    }
    function observeLayout() {
      context.listen(context.scroll, 'scroll', context.updateScrollState, {
        passive: true
      });
      if ('function' === typeof window.ResizeObserver) {
        context.observer = new window.ResizeObserver(context.updateLayout);
        context.observer.observe(context.scroll);
      } else {
        context.listen(window, 'resize', context.updateLayout);
      }
      context.directionObserver = new window.MutationObserver(context.refreshDirection);

      // Direction can come from this root, a wrapper or the page itself.
      for (var ancestor = context.view; ancestor; ancestor = ancestor.parentElement) {
        context.directionObserver.observe(ancestor, {
          attributes: true,
          attributeFilter: ['dir']
        });
      }
    }
    function init() {
      ['click', 'input', 'change', 'keydown', 'pointerdown'].forEach(function (type) {
        context.listen(context.view, type, function (event) {
          if (context.loading && event.target.closest(context.selector + 'toolbar, ' + context.selector + 'frame, ' + context.selector + 'footer')) {
            event.preventDefault();
            event.stopImmediatePropagation();
          }
        }, true);
      });
      if (!context.originalColgroup) {
        context.table.insertBefore(context.colgroup, context.table.tHead);
      }
      context.bindPanelEvents();
      context.bindDeleteDialogEvents();
      context.bindControlEvents();
      context.refresh();
      context.observeLayout();
      if (context.initiallyLoading) {
        context.setLoading(true);
      }
    }

    // Preserve the public controller API; feature modules are internal.
    context.api = {
      refresh: context.refresh,
      destroy: context.destroy,
      setLoading: context.setLoading,
      setPagination: context.setPagination,
      setError: context.setError,
      open: context.openPanel,
      close: context.closePanel,
      setSubmission: context.setSubmission,
      getCsv: context.getCsv,
      downloadCsv: context.downloadCsv
    };
    instances.set(context.view, context.api);
    context.init();
    return context.api;
  };
})(jQuery);