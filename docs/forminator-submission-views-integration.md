# Integrate FUI Submission Views into Forminator

Implement the frontend Submission Views table using the standalone FUI component. Forminator supplies the configuration, authorized submission data and server operations. FUI supplies the table interactions, field rendering and dialog behavior.

## 1. Load the build assets

Copy the matching assets from the FUI build into Forminator's `assets/forminator-ui/` directory:

- `css/forminator-icons.min.css`
- `css/forminator-submission-views.min.css`
- `js/forminator-submission-views.min.js`
- Updated `fonts/forminator-icons-font.*` files referenced by the icon stylesheet.

Load jQuery before the Views JavaScript. Load the Forminator integration script after Views. Use Forminator's existing enqueue/versioning conventions, and its Divi asset handling where applicable; the build also supplies `forminator-submission-views.builder_divi.min.css`.

Views is a separate bundle. Loading the forms, quizzes or aggregate UI bundle does not initialize this component. Do not enqueue the showcase's `public.min.css` or copy its demo data handler into production.

## 2. Save the View configuration

Keep these selections separate:

- **Table fields:** up to five selected fields, in the configured order. This limit belongs to Forminator; FUI does not truncate the table automatically.
- **Detail fields:** all fields selected for the sidebar, independently of the table selection.
- **Export fields:** the fields available for CSV export, including fields absent from the table.

Use stable field IDs throughout. For example, a form with ten fields can render five table columns, show all ten in the sidebar and export all ten. Manage columns only changes visibility among the rendered table fields; it does not change the detail or export configuration.

Define who can view, export and delete submissions. Hide unavailable actions in the markup and enforce the same rules on the server.

## 3. Render one scoped HTML instance

Use `page-views.html` in FUI as the reference for the complete component markup. The local Forminator sample in `samples/submission-views-demo/view.php` demonstrates PHP rendering. Adapt the component structure, replacing all fixture values with escaped, authorized data.

Each rendered View needs its own root ID, even when the same form appears twice on a page:

```html
<section
	id="forminator-submission-views-123-instance-1"
	class="forminator-ui forminator-submission-views"
	aria-label="Form submissions"
>
	<!-- Toolbar, table, pagination, detail dialog and delete dialog. -->
</section>
```

Generate unique descendant IDs from that instance ID. Update every matching `aria-controls`, `aria-labelledby` and `aria-describedby` reference. FUI does not generate or repair these IDs.

Required markup conventions:

| Element | Contract |
| --- | --- |
| Table wrapper | `__frame` containing `__scroll`; the scroll region has an accessible name and `tabindex="0"` |
| Table | `forminator-submission-views__table`, a caption and a first header row with `th scope="col"` |
| Data headers | `data-resizable`, stable `data-field-id`, and the accessible `__resize-handle` markup from the example |
| Submission row | `tr data-id="123"`; use the actual submission ID understood by the backend |
| Final header and body cell | `forminator-submission-views__detail-cell`; no resize handle on the Actions header |
| Row actions | `__row-actions` containing `button type="button" data-detail` and, if permitted, `button type="button" class="forminator-submission-views__delete" data-delete` |
| Manage columns | `data-columns-toggle` and its hidden `data-columns` group; checkboxes use zero-based `data-column` indexes matching the table headers |
| Export | Plain `button type="button" data-download` labeled “Download as CSV” |
| Page size | Labeled select with `data-page-size` |
| Pagination | Buttons with `data-page="first"`, `previous`, `next`, `last` |
| Page status | `<span class="forminator-submission-views__page-status" data-page-status role="status" aria-live="polite"></span>` |
| Detail sidebar | One native `dialog.__panel` per View, with `data-submission-title` on the heading, `__panel-body`, and a `data-close` button |
| Sidebar delete | Optional `data-delete` button in `__panel-footer`, outside the scrolling body |
| Delete confirmation | One separate native `dialog` per View with `data-delete-dialog`, `role="alertdialog"`, title/description references and `data-delete-cancel` / `data-delete-confirm` buttons |

All `__…` class names above use the `forminator-submission-views` prefix. Copy the complete reference markup for resize handles, dialogs, tooltips and icon spans. Keep both dialogs inside the View root. Render an empty sidebar body initially; FUI builds its fields from the selected record.

Do not include an Actions checkbox in Manage columns. FUI prevents hiding the last visible data column. After loading a new page of rows, Forminator must preserve the selected visibility on the new cells; `refresh()` does not automatically reapply hidden header states to replacement rows.

## 4. Initialize the component

Initialize after the markup and assets exist:

```js
const section = document.getElementById( 'forminator-submission-views-123-instance-1' );
const view = FUI.submissionViews( section );
```

Initialize each root separately. Repeated initialization of the same root returns its existing controller. Keep request state and data caches scoped to that instance too.

| Method | Use |
| --- | --- |
| `setSubmission( submission )` | Replace sidebar title and fields; returns `true` on success, `false` on invalid input |
| `open( trigger )` | Open the populated sidebar and remember the focus return target |
| `close()` | Close the sidebar through its animated lifecycle |
| `refresh()` | Recompute layout after updating rows, headers, visibility or sizing |
| `getCsv( options )` | Return CSV text, or `false` for invalid options |
| `downloadCsv( options )` | Download supplied data as CSV; return success/failure |
| `destroy()` | Remove FUI listeners/observers and close dialogs before discarding the component |

Call `refresh()` after updating the existing table. If replacing the whole table, dialogs or section, destroy the old instance first and initialize the new markup. Forminator must also remove its own listeners and cancel outstanding requests during teardown.

## 5. Connect the Forminator data adapter

Listen on the individual section using native `addEventListener`. Events bubble and use the prefix `forminator:submission-views:`. With jQuery, read the payload through `event.originalEvent.detail`.

| Event suffix | Payload | Forminator action |
| --- | --- | --- |
| `search` | `{ value }` | Debounce server search, reset the page and render results |
| `page-size` | `{ value }` | Change page size, reset/clamp the page and render results |
| `page` | `{ action }` | Fetch the requested page |
| `detail` | `{ id, trigger }` | Fetch/map authorized detail fields and populate the sidebar |
| `columns` | `{ index, visible }` | Optionally persist visibility, preferably mapped to a stable field ID |
| `export` | `{ format: 'csv' }` | Fetch authorized export data and download it |
| `delete` | `{ id, trigger, source }` | Perform the confirmed server deletion |
| `close` | `{}` | Optional sidebar-close notification |

FUI does not fetch, filter or paginate records. Forminator updates the rows, result/empty messages, page status and disabled pagination buttons, then calls `refresh()`. Handle loading/errors and discard stale search/detail responses so a slower request cannot replace a newer selection.

### Populate the detail sidebar

For asynchronous detail loading, call `event.preventDefault()` synchronously, before awaiting a request. Otherwise FUI opens immediately with the current content.

Example adapter flow below: `fetchSubmissionForView` and `showViewError` are application functions to implement in Forminator, not FUI methods.

```js
let detailRequest = 0;

section.addEventListener( 'forminator:submission-views:detail', async function( event ) {
	event.preventDefault();
	const request = ++detailRequest;
	const { id, trigger } = event.detail;

	try {
		// Return { id, title, fields } mapped to the display contract below.
		const submission = await fetchSubmissionForView( id );
		if ( request !== detailRequest || ! section.isConnected || ! trigger.isConnected ) {
			return;
		}
		if ( view.setSubmission( submission ) ) {
			view.open( trigger );
		} else {
			showViewError( 'Unable to display this submission.' );
		}
	} catch ( error ) {
		if ( request === detailRequest && section.isConnected ) {
			showViewError( error );
		}
	}
} );
```

Localize user-facing messages in the production adapter. If data is already available synchronously, set it in the detail event handler; FUI opens afterward. Prevent default if population fails to avoid displaying a previous record.

## 6. Map stored values to display fields

Pass display data rather than HTML or raw Forminator storage objects:

```js
view.setSubmission( {
	id: '123',
	title: 'Submission #123',
	emptyValue: '—',
	fields: [
		{ id: 'name-1', label: 'Name', value: 'Olivia Martinez' },
		{ id: 'email-1', label: 'Email', value: 'olivia@example.com' },
		{
			id: 'address-1', label: 'Address',
			fields: [
				{ id: 'street', label: 'Street', value: '12 Example Road' },
				{ id: 'city', label: 'City', value: 'London' }
			]
		},
		{
			id: 'attendees', label: 'Attendees', type: 'repeater',
			entries: [
				{ label: 'Entry 1', fields: [
					{ id: 'email', label: 'Email', value: 'one@example.com' }
				] },
				{ label: 'Entry 2', fields: [
					{ id: 'email', label: 'Email', value: 'two@example.com' }
				] }
			]
		},
		{
			id: 'website', label: 'Website', type: 'link', newTab: true,
			value: { url: 'https://example.com', label: 'Visit website' }
		},
		{
			id: 'files', label: 'Attachments', type: 'upload',
			value: [ { url: '/authorized-download/123', name: 'Proposal.pdf' } ]
		}
	]
} );
```

- `title` must be a non-empty string; `fields` must be an array. Supply `id` so programmatic sidebar deletion targets the correct record.
- Scalars render as text; scalar arrays render as lists. Empty values use `emptyValue` (default em dash).
- Compound fields use child `fields` arrays.
- Repeaters use `type: 'repeater'` and `entries[].fields`. Include `entries[].label` for named entry groups. Omit it to render the child fields directly inside the Address-style group. Both forms support nested compound fields and repeaters.
- Link types are `link` / `url`; file types are `file` / `upload`. Values accept a URL string, `{ url, label }`, `{ url, name }`, or arrays of these.
- Ordinary values do not render HTML. Do not pre-escape JSON strings into HTML entities; use safe JSON serialization and let FUI render text.

## 7. Handle deletion after FUI confirmation

FUI already opens the confirmation modal from either table Delete or sidebar Delete. Cancel/Escape emits no delete event. Confirm emits one `delete` event; `source` is `table` or `sidebar`.

Forminator must:

1. Resolve the record from `event.detail.id`. Do not rely on `trigger.closest('tr')`: sidebar actions have no row ancestor.
2. Send an authenticated, nonce-protected deletion request through the chosen Forminator endpoint.
3. Recheck view access, delete permission and the record's form association on the server.
4. On success, remove/reload the record, update counts and pagination, load the previous page if the current page becomes empty, and call `refresh()`.
5. On failure, keep the record and show an accessible error. Prevent duplicate in-flight requests in the adapter.

The FUI confirmation closes independently of the server request. Sidebar confirmation also closes the detail sidebar. Forminator owns pending/success/error feedback. FUI never deletes stored data itself.

## 8. Supply CSV data explicitly

The export button emits an event; it does not automatically scrape table cells. Fetch the permitted records and pass field definitions and rows to FUI:

```js
view.downloadCsv( {
	fields: [
		{ id: 'name-1', label: 'Name' },
		{ id: 'email-1', label: 'Email' },
		{ id: 'extra-field', label: 'Additional field' }
	],
	rows: [ {
		'name-1': 'Olivia',
		'email-1': 'olivia@example.com',
		'extra-field': 'Included even when absent from the table'
	} ],
	mode: 'all',
	filename: 'submissions.csv'
} );
```

- `all` is the default: exports every supplied field regardless of Manage columns.
- `visible` exports supplied fields matching visible resizable headers' `data-field-id` values. Alternatively pass `visibleFieldIds` explicitly.
- Field order follows `fields`. Record scope—current page, filtered results or all permitted records—is a separate Forminator decision.
- Objects/repeater arrays become JSON in a CSV cell. Supply formatted strings if a different export representation is required.
- FUI handles CSV quoting, formula-like text protection and UTF-8 BOM (optional). Check the helper's return value. Use a server-generated/streamed download for large exports.

## 9. Theme, RTL and security requirements

Use the inherit-theme stylesheet. Override supported CSS variables on each View root where needed; defaults live in `library/scss/submission-views/_variables.scss`. Avoid importing a form theme or adding broad resets. Supply an opaque `surface` matching the embedding area for sticky cells and the sidebar. Native Manage columns checkboxes retain browser/theme rendering.

Direction follows the root/ancestor `dir`. Keep the reference pagination icon wrappers with `dir="ltr"`; FUI mirrors them for RTL. Use `<bdi dir="auto">` around dynamic table text. Table headers stick within the table scroll region; set `--forminator-submission-views-table-max-height` to a bounded value such as `500px` when vertical table scrolling is wanted (current default is `100%`).

FUI owns resize behavior, sticky offsets, overflow flags, dropdown state, last-visible-column protection, dialog animations, outside-click/Escape closing and focus restoration. Do not duplicate those behaviors or add a page-scroll lock in the adapter.

Forminator must authorize every list/detail/export/delete/download request, validate inputs, escape generated HTML/attributes, localize labels and safely serialize JSON. FUI's text rendering and HTTP/HTTPS URL checks are additional client protections, not server authorization. Invalid links render as text. Protected files must use authorized download endpoints; the browser `download` attribute does not secure a file.

## Acceptance checks

- Five selected table fields and ten detail/export fields work independently.
- Two instances, including two Views of the same form, work without duplicate IDs or shared state.
- Search, page size, empty results and pagination update correctly; stale responses cannot overwrite newer data.
- Manage columns preserves at least one field; column visibility survives refreshed rows.
- Equal data-column widths, resizing, sticky View detail and end-of-scroll Delete work in LTR and RTL, with and without horizontal overflow.
- Sidebar content matches the selected record; compound fields, named/unnamed repeaters, empty values and authorized file links render correctly.
- Cancel/Escape preserves records; confirmed table/sidebar deletion targets the correct ID and handles server failure.
- CSV all/visible modes export the intended fields and record scope, including fields absent from the table.
- Keyboard navigation, focus return, reduced motion, mobile widths and different WordPress themes remain usable.
- Unauthorized access, deletion, exports and file downloads are rejected on the server.

The existing `[forminator_submission_views_demo]` shortcode is a local fixture for testing only. It does not read or delete real submissions and is not the production integration.

## Additional layout variables

Use the `--forminator-submission-views-` prefix for these per-instance settings: `search-width` (240px), `page-status-margin` (0 4px), `page-size-padding-inline` (4px 20px), `page-size-icon-offset` (4px), `columns-checkbox-margin` (2px 0), `resize-handle-width` (12px), `resize-divider-height` (24px), `sidebar-border-width` (1px), and `delete-button-border-width` (1px). RTL shadows have separate `rtl-sticky-shadow` and `rtl-panel-shadow` defaults.

Set `columns-offset` (8px) and `columns-viewport-gutter` (16px) on the root in pixels. CSS and JavaScript use them together for dropdown placement and available space; zero is supported. Reopen the dropdown after changing these settings to recalculate its placement. The viewport gutter now consistently applies to horizontal clamping and vertical clearance as well as the CSS width limit.
