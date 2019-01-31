// Load Packages
var fs          = require( 'fs' ),
	browserSync = require( 'browser-sync' ).create(),
	pump        = require( 'pump' ),
	ghpages     = require( 'gh-pages' )
	;

var gulp         = require( 'gulp' ),
	watch        = require( 'gulp-watch' ),
	sass         = require( 'gulp-sass' ),
	autoprefixer = require( 'gulp-autoprefixer' ),
	cleanCSS     = require( 'gulp-clean-css' ),
	eslint       = require( 'gulp-eslint' ),
	uglify       = require( 'gulp-uglify-es' ).default,
	concat       = require( 'gulp-concat' ),
	rename       = require( 'gulp-rename' ),
	replace      = require( 'gulp-replace' )
	;

// Get package.json file
var pckg = JSON.parse( fs.readFileSync( './package.json' ) );

// ==================================================
// Paths

// Main
var paths = {
	src: './src/',
	public: './public/'
};

// Production
var production = {
	themes: paths.src + 'themes/',
	showcaseJS: paths.src + 'showcase/js/',
	showcaseCSS: paths.src + 'showcase/scss/',
	forminatorJS: paths.src + 'forminator-ui/js/',
	forminatorCSS: paths.src + 'forminator-ui/scss/'
};

// Public
var public = {
	js: paths.public + 'assets/js/',
	css: paths.public + 'assets/css/'
};

// ==================================================
// Compatible browsers
var browserslist = [
	'> 1%',
	'ie > 9'
];

// ==================================================
// List of files to watch/build

// Themes
var cssThemes = [
	production.themes + 'forminator-themes.scss',
	production.themes + '**/*.scss'
];

// Forminator UI (Styles)
var scssFUI = [
	production.forminatorCSS + '**/*.scss'
];

// Forminator UI (Scripts)
var jsFUI = [
	production.forminatorJS + '*.js'
];

// Showcase UI (Styles)
var scssSUI = [
	production.showcaseCSS + '**/*.scss'
];

// Showcase UI (Scripts)
var jsSUI = [
	production.showcaseJS + '*.js'
];

// ==================================================
// Github Pages

// Publish files to `gh-pages` branch on Github
ghpages.publish( 'public', {

	user: {
		name: 'Leighton Sapir',
		email: 'leigh@incsub.com'
	}
});

// ==================================================
// BrowserSync

// Initialize the server
gulp.task( 'browser-sync', function() {

	browserSync.init({

		server: {
			baseDir: paths.public
		}
	});
});

// ==================================================
// Tasks

// Task: Build forminator themes
gulp.task( 'styles:themes', function() {

	gulp.src( cssThemes )
		.pipe(
			sass({ outputStyle: 'compressed' })
			.on( 'error', sass.logError )
		)
		.pipe( autoprefixer( browserslist ) )
		.pipe( cleanCSS() )
		.pipe( rename({
			suffix: '.min'
		}) )
		.pipe( gulp.dest( public.css ) )
		.pipe( browserSync.stream() )
		;
});

// Task: Build forminator styles
gulp.task( 'styles:forminator', function() {

	gulp.src( scssFUI )
		.pipe(
			sass({ outputStyle: 'compressed' })
			.on( 'error', sass.logError )
		)
		.pipe( autoprefixer( browserslist ) )
		.pipe( cleanCSS() )
		.pipe( rename({
			suffix: '.min'
		}) )
		.pipe( gulp.dest( public.css ) )
		.pipe( browserSync.stream() )
		;
});

// Task: Build forminator scripts
gulp.task( 'scripts:forminator', function( cb ) {

	pump([
		gulp.src( jsFUI ),
		eslint(),
		eslint.format(),
		eslint.failAfterError(),
		concat( 'forminator-ui.js' ),
		uglify(),
		rename({
			suffix: '.min'
		}),
		gulp.dest( public.js ),
		browserSync.stream()
	], cb );
});

// Task: Build showcase styles
gulp.task( 'styles:showcase', function() {

	gulp.src( scssSUI )
		.pipe(
			sass({ outputStyle: 'compressed' })
			.on( 'error', sass.logError )
		)
		.pipe( autoprefixer( browserslist ) )
		.pipe( cleanCSS() )
		.pipe( rename({
			suffix: '.min'
		}) )
		.pipe( gulp.dest( public.css ) )
		.pipe( browserSync.stream() )
		;
});

// Task: Build showcase scripts
gulp.task( 'scripts:showcase', function( cb ) {

	pump([
		gulp.src( jsSUI ),
		eslint(),
		eslint.format(),
		eslint.failAfterError(),
		concat( 'showcase-ui.js' ),
		uglify(),
		rename({
			suffix: '.min'
		}),
		gulp.dest( public.js ),
		browserSync.stream()
	], cb );
});

// Task: Watch for changes across project
gulp.task( 'watch', function() {

	// Watch for forminator themes changes
	gulp.watch( cssThemes, [ 'styles:themes' ]);

	// Watch for forminator styles changes
	gulp.watch( scssFUI, [ 'styles:forminator' ]);

	// Watch for forminator js changes
	gulp.watch( jsFUI, [ 'scripts:forminator' ]);

	// Watch for showcase styles changes
	gulp.watch( scssSUI, [ 'styles:showcase' ]);

	// Watch for showcase js changes
	gulp.watch( jsSUI, [ 'scripts:showcase' ]);

	// Watch for HTML changes
	gulp.watch( paths.public + '*.html' ).on( 'change', browserSync.reload );

});

// Task: Build forminator themes
gulp.task( 'build:themes', [
	'styles:themes'
]);

// Task: Build forminator files
gulp.task( 'build:forminator', [
	'styles:forminator',
	'scripts:forminator'
]);

// Task: Build showcase files
gulp.task( 'build:showcase', [
	'styles:showcase',
	'scripts:showcase'
]);

// Task: Run development environment
gulp.task( 'start', [
	'build:themes',
	'build:forminator',
	'build:showcase',
	'browser-sync',
	'watch'
]);
