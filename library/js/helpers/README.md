# Shared FUI helpers

These independently loadable source files register utilities under `FUI.utils`. Include the required files in a bundle's ordered Gulp sources rather than copying helper implementations. Submission Views already includes all three in its single bundle.

- `urls.js`: `FUI.utils.getSafeUrl(value)` returns a resolved HTTP/HTTPS URL or null. Rejects embedded credentials, control characters and other protocols. Relative URLs use `document.baseURI`. It does not authorize access or establish trust in the destination.
- `notices.js`: `FUI.utils.renderNoticeHtml(html, linkClass)` returns a DocumentFragment of restricted formatting and safe anchors. Load `urls.js` first. `linkClass` is optional and applies only to rebuilt anchors; source classes/styles/event attributes are not accepted. The caller supplies the containing alert and localized text.
- `csv.js`: `FUI.utils.quoteCsvValue(value)` returns one quoted CSV cell with formula-like text protection. Objects/arrays use JSON text, and typed numbers retain numeric representation. Serialization errors can throw; the export controller catches them and rejects partial exports.

Example after the relevant helpers/bundle are loaded:

```js
const href = FUI.utils.getSafeUrl('/help');
const notice = FUI.utils.renderNoticeHtml(
	'Please <a href="/help">read the guide</a>.',
	'my-notice-link'
);
const cell = FUI.utils.quoteCsvValue('A value, with a comma');
```

These helpers operate in the browser and do not replace server-side validation or authorization.
