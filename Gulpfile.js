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
	uglify       = require( 'gulp-uglify' ),
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
	src:    './src/',
	public: './public/',
};

// Production
var src = {
	js:   './src/js/',
	scss: './src/scss/',
};

// Public
var public = {
	js:  './public/assets/js/',
	css: './public/assets/css/',
};

// ==================================================
// Compatible browsers
var browserslist = [
	'> 1%',
	'ie > 9',
];

// ==================================================
// List of files to watch/build

// Forminator UI (Styles)
var scssFUI = [
	src.scss + 'forminator-ui.scss',
	src.scss + 'forminator-ui/*.scss',
];

// Forminator UI (Scripts)
var jsFUI = [
	src.js + 'forminator-ui/*.js'
];

// Showcase UI (Styles)
var scssSUI = [
	src.scss + 'showcase-ui.scss',
	src.scss + 'showcase-ui/*.scss'
];

// Showcase UI (Scripts)
var jsSUI = [
	src.js + 'showcase-ui/*.js'
];

// ==================================================
// Github Pages

// Publish files to `gh-pages` branch on Github
ghpages.publish( 'public', {

	user: {
		name:  'Leighton Sapir',
		email: 'leigh@incsub.com'
	}
} );

// ==================================================
// BrowserSync

// Initialize the server
gulp.task( 'browser-sync', function() {

	browserSync.init({

		server: {
			baseDir: './public/'
		}
	});
} );

// ==================================================
// Tasks

// Task: Build forminator styles
gulp.task( 'styles:forminator', function() {

	gulp.src( scssFUI )
		.pipe(
			sass({ outputStyle: 'compressed' })
			.on( 'error', sass.logError )
		)
		.pipe( autoprefixer( browserslist ) )
		.pipe( gulp.dest( public.css ) )
		.pipe( cleanCSS() )
		.pipe( rename({
			suffix: '.min'
		}) )
		.pipe( gulp.dest( public.css ) )
		.pipe( browserSync.stream() )
		;
} );

// Task: Build showcase styles
gulp.task( 'styles:showcase', function() {

	gulp.src( scssSUI )
		.pipe(
			sass({ outputStyle: 'compressed' })
			.on( 'error', sass.logError )
		)
		.pipe( autoprefixer( browserslist ) )
		.pipe( gulp.dest( public.css ) )
		.pipe( cleanCSS() )
		.pipe( rename({
			suffix: '.min'
		}) )
		.pipe( gulp.dest( public.css ) )
		.pipe( browserSync.stream() )
		;
} );

// Task: Build showcase scripts
gulp.task( 'scripts:showcase', function( cb ) {

	pump( [
		gulp.src( jsSUI ),
		eslint(),
		eslint.format(),
		eslint.failAfterError(),
		uglify(),
		rename({
			suffix: '.min'
		}),
		gulp.dest( public.js ),
		browserSync.stream()
	], cb );
} );

// Task: Watch for changes across project
gulp.task( 'watch', function() {

	// Watch for forminator styles changes
	gulp.watch( scssFUI, [ 'styles:forminator' ] );

	// Watch for showcase styles changes
	gulp.watch( scssSUI, [ 'styles:showcase' ] );

	// Watch for HTML changes
	gulp.watch( paths.public + '*.html' ).on( 'change', browserSync.reload );

} );

// Task: Build forminator files
gulp.task( 'build:forminator', [
	'styles:forminator'
] );

// Task: Build showcase files
gulp.task( 'build:showcase', [
	'styles:showcase'
] );

// Task: Run development environment
gulp.task( 'start', [
	'build:forminator',
	'build:showcase',
	'browser-sync',
	'watch'
] );