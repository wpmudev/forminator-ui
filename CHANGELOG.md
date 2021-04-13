v1.9.4
- 🐛 fix(phone field): Fix flag selector positioning for phone field when using material style.
- 🐛 fix(unordered list): Unordered list does not have bullets in admin preview.

v1.9.3
- 🐛 fix(textarea): Text editor shows up on error even if visual editor is selected.

v1.9.2
- fix(select2): Select field has space between dropdown and field.

v1.9.1
- 🐛 fix(select2): Wrong selection arrow size.
- 🐛 fix(multiselect): Page jumps when selecting an option.


v1.9.0
- [Fix] Forms UI: Change dropdown parent when inside SUI dialog.
- [Enhance] Forms UI: Upgrade to Select2 4.1.0-rc.0.


v1.8.15
- [Fix] Forms UI: File import not found or unreadable.


v1.8.14
- [Fix] Forms UI: Split Select2 in different stylesheets.
- [Fix] Forms UI: Remove old select styles.


v1.8.13
- [Fix] Forms UI: reCAPTCHA 3 not showing up with Divi themes.


v1.8.12
- [Fix] Forms UI: Minify Select2.


v1.8.11
- [Fix] Forms UI: Multiselect options not having enough padding.
- [Fix] Forms UI: Remove `FUI.select()` function.
- [Fix] Forms UI: Select2 dropdown overlaps selected option.
- [Fix] Forms UI: Select2 only loads first element attributes.
- [Enhance] Forms UI: Option to enable/disable Select2 search.


v1.8.10
- [Fix] Forms UI: Material textarea label overlaps value when field is part of pagination form.
- [Fix] Forms UI: Make eSign field looks fine when sizing gets broken if part of pagination form.


v1.8.9
- [Fix] Adding a check if select2 is initialised.


v1.8.8
- [Fix] Quiz UI: Retake button wrong styles on small screens.


v1.8.7
- [Fix] Forms UI: PayPal field doesn't work properly when using conditionals.


v1.8.6
- [Fix] Polls UI: Votes count hide not working on pie legend.


v1.8.5
- [Fix] Quiz UI: Retake button styles have conflicts with WordPress themes.


v1.8.4
- [Fix] Get all styles on a single file.
- [Fix] Forms UI: Input with suffix bad alignment.


v1.8.3
- [Fix] Missing quiz leads styles from full stylesheet.


v1.8.2
- [Fix] Polls UI: Votes count hide not working.
- [Enhance] Forms UI: Add last row class for grid.


v1.8.1
- [Fix] Quiz UI: Missing stylesheets for quiz leads.


v1.8.0
- [New] Quiz UI: Styles for quizzes with leads improved markup.


v1.7.11
- [Fix] Forms UI: Material pagination steps styles being overwritten by theme styles.


v1.7.10
- [Update] Forms UI: Improve styles for pagination steps.


v1.7.9
- [Fix] Forms UI: Prefix and suffix not vertical aligning correctly.


v1.7.8
- [New] Forms UI: Input with inline prefix and/or suffix.


v1.7.6
- [Fix] Forms UI: Select dropdown not visualizing when is placed last on paginated form.


v1.7.5
- [Fix] Forms UI: Pagination issues with Divi.
- [Enhance] Forms UI: Add wrapper to select chosen value.


v1.7.4
- [Fix] Forms UI: Allow select2 for vanilla theme.


v1.7.3
- [Fix] Forms UI: Uncaught TypeError: FUI.select2 is not a function.


v1.7.2
- [Fix] Form: Missing select2 JS file.


v1.7.1
- [Enhance] Poll UI: Create js file with only poll dedicated functions.
- [Enhance] Form UI: Create js file with only form dedicated functions.
- [Enhance] Form UI: Split custom select2 in its own file.
- [Enhance] Remove emtpy file.


v1.7.0
- [Enhance] Quizzes UI: Social share icons color need to be managed on plugin side.


v1.6.0
- [New] [Element] E-Signature.
- [Fix] Icons Font: Updated font is not uploaded to master branch.


v1.5.1
- [Fix] Icons Font: Updated font is not uploaded to master branch.


v1.5.0
- [Fix] Icons Font: Recently added icons not showing up.
- [Enhance] [Element] Multiple Upload: Add styles to flat, bold and material designs.


v1.4.0
- [New] Forms UI: Multiple uploads element.
- [Fix] Icons Font: Latest added icons not showing up.


v1.3.0
- [Enhance] New icons added to Forminator icons font: warning, reset, file, upload.


v1.2.0
- [New] Quizzes UI.
- [New] Update icon font file to latest.
- [Fix] Ensure icons font remain visible during webfont load.
- [Fix] [Element] Response Message: Text goes outside the container.
- [Fix] [Element] Pagination Steps: Step label broken words.
- [Fix] [Element] Calendar: Increase z-index value.


v1.1.4
- [Fix] Forms UI: Stripe field missing focused and filled styles on Material UI form.
- [Fix] Forms UI: Missing styles for input with icon field on Material UI form.
- [Fix] Forms UI: Missing styles for input with suffix field on Material UI form.


v1.1.3
- [Fix] Forms UI: Reduce assets file size.
- [New] Forms UI: Partial disabled state (class).


v1.1.2
- [Fix] [Element] Select2: Stop requesting base styles from external sources.


v1.1.1
- [Fix] Forms UI: Material floating label for Stripe card field.
- [Fix] Forms UI: Disabled fields class not working with paginated forms.


v1.1.0
- [New] Polls UI.


v1.0.1
- [New]     Update icon font file to latest.
- [New]     Forms UI: Inline radio options.
- [New]     Forms UI: Inline checkbox options.
- [New]     Forms UI: Loading response message.
- [New]     Forms UI: Disable fields mask.
- [Fix]     Forms UI: Localise Select2 strings.
- [Fix]     Forms UI: Radio button selection kicks you to the top.
- [Fix]     Forms UI: Checkbox button selection kicks you to the top.
- [Fix]     Forms UI: PayPal button overfloats calendar and other dropdown elements.
- [Fix]     Forms UI: Prevent material floating label on post content field.
- [Enhance] Forms UI: Move grid styles to a separate file.
- [Enhance] Create a new file for global styles.


v1.0.0
- [New] Forminator icons font.
- [New] Forms UI: Default design styles.
- [New] Forms UI: Flat design styles.
- [New] Forms UI: Bold design styles.
- [New] Forms UI: Material design styles.
- [New] Forms UI: Flexible grid with three different spacing variations: 30px, 20px and custom (defined by user).
- [New] Forms UI: Fields have an accessible markup.
- [New] Forms UI: Simple library for select field.
- [New] Forms UI: Integrate with select2 for complex select.
			Dev Notes: Use this library when it's necessary to include
			a search box in the dropdown.
- [New] Forms UI: State class for fields: on hover, on focus, when filled and on error.