# Submission Views source modules

`../submission-views.js` owns initialization, per-instance state, lifecycle and the public controller API. Feature factories attach methods to the same instance context through the internal `FUI._submissionViews` registry. They do not fetch data or initialize DOM roots on their own.

| File | Responsibility |
| --- | --- |
| `events.js` | Scoped delegation, event dispatch and listener cleanup |
| `table-lifecycle.js` | Reconnect replacement tables, restore old layout and manage table-scoped listeners/observers |
| `layout.js` | Column widths, horizontal overflow and sticky actions |
| `resizing.js` | Pointer and keyboard column resizing |
| `fields.js` | Structured sidebar fields, repeaters and links |
| `sidebar.js` | Submission population and sidebar lifecycle |
| `pagination.js` | Pagination state and navigation events |
| `columns.js` | Column dropdown and visibility |
| `deletion.js` | Delete confirmation lifecycle and events |
| `feedback.js` | Error notices, loading and disabled controls |
| `csv.js` | Export selection and browser download |
| `controls.js` | Toolbar action handlers and event bindings |

Shared URL, notice and CSV utilities live in `../helpers/`. These have no dependency on a View instance.

The ordered source list is `library.watch.scripts.submissionViews` in `gulpfile.js`. The same list drives the build and watcher. Helpers load first, feature factories next, and the entry point last. Build with `npx gulp library:scripts:submission-views`.

Consumers still load only `forminator-submission-views.min.js` after jQuery. The public `FUI.submissionViews(root)` API and event names are unchanged. Do not call `FUI._submissionViews` factories from integrations.

`refresh()` can reconnect a replacement table/frame inside the same root. Unique data-field-id values carry widths and visibility between matching data columns; integrations provide corresponding Manage columns markup. Replacing the root/dialogs/loader still requires a new instance.
