'use strict';

// Import `src` and `dest` from gulp for use in the task.
const { src, dest } = require( 'gulp' );

/**
 * Supported Packages
 * List here all dependencies necessary to run required tasks.
 *
 * @since 1.7.0
 */

const fs           = require( 'fs' );
const pump         = require( 'pump' );
const gulp         = require( 'gulp' );
const babel        = require( 'gulp-babel' );
const autoprefixer = require( 'gulp-autoprefixer' );
const cleanCSS     = require( 'gulp-clean-css' );
const concat       = require( 'gulp-concat' );
const eslint       = require( 'gulp-eslint' );
const header       = require( 'gulp-header' );
const htmlmin      = require( 'gulp-htmlmin' );
const rename       = require( 'gulp-rename' );
const sass         = require( 'gulp-sass' );
const uglify       = require( 'gulp-uglify-es' ).default;
const watch        = require( 'gulp-watch' );
const browserSync  = require( 'browser-sync' ).create();

/**
 * Get Package File
 *
 * @since 1.7.0
 */

const pckg = JSON.parse( fs.readFileSync( './package.json' ) );

/**
 * WPMU DEV Banner
 *
 * @since 1.7.0
 */

const banner = [
	'/*!',
	' * WPMU DEV Forminator UI',
	' * Copyright 2019 Incsub (https://incsub.com)',
	' * Licensed under GPL v3 (http://www.gnu.org/licenses/gpl-3.0.html)',
	' */',
	''
].join( '\n' );

/**
 * List of Supported Browsers
 *
 * @since 1.7.0
 */

const browsersList = [
	'last 2 version',
	'> 1%'
];

/**
 * Library Paths & Files
 *
 * @since 1.7.0
 */

const library = {
	source: {},
	output: {},
	watch: {}
};

library.source.main = './library/';
library.source.fonts = './library/fonts/';
library.source.scripts = './library/js/';
library.source.styles = './library/scss/';

library.output.main = './build/library/';
library.output.fonts = './build/library/fonts';
library.output.scripts = './build/library/js/';
library.output.styles = './build/library/css/';

library.watch.files = [
	'./README.md',
	'./CHANGELOG.md'
];

library.watch.fonts = [
	library.source.fonts + '*'
];

library.watch.scripts = {};

library.watch.scripts.all = [
	library.source.scripts + 'form-load.js',
	library.source.scripts + 'form-simulation.js',
	library.source.scripts + 'input-states.js',
	library.source.scripts + 'input-material.js',
	library.source.scripts + 'textarea-states.js',
	library.source.scripts + 'textarea-material.js',
	library.source.scripts + 'radio-states.js',
	library.source.scripts + 'checkbox-states.js',
	library.source.scripts + 'multiselect-states.js',
	library.source.scripts + 'upload.js',
	library.source.scripts + 'select2.js',
	library.source.scripts + 'authentication.js',
	library.source.scripts + 'poll-chart.js',
	library.source.scripts + 'form-submit.js'
];

library.watch.scripts.form = [
	library.source.scripts + 'input-states.js',
	library.source.scripts + 'input-material.js',
	library.source.scripts + 'textarea-states.js',
	library.source.scripts + 'textarea-material.js',
	library.source.scripts + 'radio-states.js',
	library.source.scripts + 'checkbox-states.js',
	library.source.scripts + 'multiselect-states.js',
	library.source.scripts + 'select2.js',
	library.source.scripts + 'authentication.js'
];

library.watch.scripts.poll = [
	library.source.scripts + 'input-states.js',
	library.source.scripts + 'input-material.js',
	library.source.scripts + 'radio-states.js',
	library.source.scripts + 'poll-chart.js'
];

library.watch.scripts.select2 = [
	library.source.scripts + 'select2.full.js'
];

library.watch.styles = [
	library.source.styles + '**/**/**/*.scss'
];

/**
 * Public Paths & Files
 *
 * @since 1.7.0
 */

const showcase = {
	source: {},
	output: {},
	watch: {}
};

showcase.source.main = './';
showcase.source.assets = './assets/';
showcase.source.images = './assets/images/';
showcase.source.scripts = './assets/js/public/';
showcase.source.styles = './assets/scss/';
showcase.source.templates = './templates/';

showcase.output.main = './build/public/';
showcase.output.fonts = './assets/fonts/';
showcase.output.images = './assets/images/';
showcase.output.scripts = './assets/js/';
showcase.output.styles = './assets/css/';
showcase.output.templates = './build/public/templates/';

showcase.watch.fonts = [
	library.source.fonts + '*'
];

showcase.watch.scripts = [
	showcase.source.scripts + '**/*.js'
];

showcase.watch.styles = [
	showcase.source.styles + '**/*.scss'
];

showcase.watch.assetsCss = [
	showcase.source.assets + 'css/*.min.css'
];

showcase.watch.assetsJs = [
	showcase.source.assets + 'js/*.min.js'
];

showcase.watch.assetsFonts = [
	showcase.source.assets + 'fonts/*'
];

showcase.watch.assetsImages = [
	showcase.source.assets + 'images/*'
];

showcase.watch.html = [
	showcase.source.main + '*.html',
	showcase.source.templates + '**/*.html'
];

showcase.watch.pages = [
	showcase.source.main + '*.html'
];

showcase.watch.templates = [
	showcase.source.templates + '**/*.html'
];

/**
 * BrowserSync
 *
 * @since 1.7.0
 */

gulp.task( 'browser-sync', function() {

	browserSync.init({
		injectChanges: true,
		server: {
			baseDir: './'
		}
	});
});

/**
 * Library Tasks
 *
 * @since 1.7.0
 */

// Copy files
gulp.task( 'library:files', function() {

	gulp.src( library.watch.files )
		.pipe( gulp.dest( library.output.main ) )
		;
});

// Copy fonts
gulp.task( 'library:fonts', function() {

	gulp.src( library.watch.fonts )
		.pipe( gulp.dest( library.output.fonts ) )
		.pipe( gulp.dest( showcase.output.fonts ) )
		.pipe( browserSync.stream() )
		;
});

// Build styles
gulp.task( 'library:styles', function() {

	gulp.src( library.watch.styles )
		.pipe(
			sass({ outputStyle: 'compressed' })
			.on( 'error', sass.logError )
		)
		.pipe( autoprefixer( browsersList ) )
		.pipe( header( banner ) )
		.pipe( cleanCSS() )
		.pipe( rename({
			suffix: '.min'
		}) )
		.pipe( gulp.dest( library.output.styles ) )
		.pipe( gulp.dest( showcase.output.styles ) )
		.pipe( browserSync.stream({
			match: '**/*.css'
		}) )
		;
});

// Build scripts
gulp.task( 'library:scripts:all', function( cb ) {

	pump([
		gulp.src( library.watch.scripts.all ),
		eslint(),
		eslint.format(),
		eslint.failAfterError(),
		babel({
			presets: [
				[ '@babel/env', {
					modules: false
				} ]
			]
		}),
		concat( 'forminator-ui.js' ),
		header( banner ),
		gulp.dest( library.output.scripts ),
		uglify(),
		rename({
			suffix: '.min'
		}),
		header( banner ),
		gulp.dest( library.output.scripts ),
		gulp.dest( showcase.output.scripts ),
		browserSync.stream()
	], cb );
});

gulp.task( 'library:scripts:form', function( cb ) {

	pump([
		gulp.src( library.watch.scripts.form ),
		eslint(),
		eslint.format(),
		eslint.failAfterError(),
		babel({
			presets: [
				[ '@babel/env', {
					modules: false
				} ]
			]
		}),
		concat( 'forminator-form.js' ),
		header( banner ),
		gulp.dest( library.output.scripts ),
		uglify(),
		rename({
			suffix: '.min'
		}),
		header( banner ),
		gulp.dest( library.output.scripts ),
		gulp.dest( showcase.output.scripts ),
		browserSync.stream()
	], cb );
});

gulp.task( 'library:scripts:poll', function( cb ) {

	pump([
		gulp.src( library.watch.scripts.poll ),
		eslint(),
		eslint.format(),
		eslint.failAfterError(),
		babel({
			presets: [
				[ '@babel/env', {
					modules: false
				} ]
			]
		}),
		concat( 'forminator-poll.js' ),
		header( banner ),
		gulp.dest( library.output.scripts ),
		uglify(),
		rename({
			suffix: '.min'
		}),
		header( banner ),
		gulp.dest( library.output.scripts ),
		gulp.dest( showcase.output.scripts ),
		browserSync.stream()
	], cb );
});

gulp.task( 'library:scripts:select2', function( cb ) {

	pump([
		gulp.src( library.watch.scripts.select2 ),
		gulp.dest( library.output.scripts ),
		gulp.dest( showcase.output.scripts ),
		browserSync.stream()
	], cb );
});

// Build library
gulp.task( 'library:build', [
	'library:files',
	'library:fonts',
	'library:scripts:all',
	'library:scripts:form',
	'library:scripts:poll',
	'library:scripts:select2',
	'library:styles'
]);

// Watch library
gulp.task( 'library:watch', function() {

	// Watch files
	gulp.watch( library.watch.files, [ 'library:files' ]);

	// Watch fonts
	gulp.watch( library.watch.fonts, [ 'library:fonts' ]);

	// Watch styles
	gulp.watch( library.watch.styles, [ 'library:styles' ]);

	// Watch scripts
	gulp.watch( library.watch.scripts.all, [ 'library:scripts:all', 'library:scripts:form', 'library:scripts:poll', 'library:scripts:select2' ]);

});

/**
 * Public Tasks
 *
 * @since 1.7.0
 */

// Minify Pages
gulp.task( 'public:pages', function() {

	gulp.src( showcase.watch.pages )
		.pipe( htmlmin({
			collapseWhitespace: true,
			removeComments: true
		}) )
		.pipe( gulp.dest( showcase.output.main ) )
		.pipe( browserSync.stream() )
		;
});

// Minify Templates
gulp.task( 'public:templates', function() {

	gulp.src( showcase.watch.templates )
		.pipe( htmlmin({
			collapseWhitespace: true,
			removeComments: true
		}) )
		.pipe( gulp.dest( showcase.output.templates ) )
		.pipe( browserSync.stream() )
		;
});

// Build styles
gulp.task( 'public:styles', function() {

	gulp.src( showcase.watch.styles )
		.pipe(
			sass({ outputStyle: 'compressed' })
			.on( 'error', sass.logError )
		)
		.pipe( autoprefixer( browsersList ) )
		.pipe( cleanCSS() )
		.pipe( rename({
			suffix: '.min'
		}) )
		.pipe( gulp.dest( showcase.output.styles ) )
		.pipe( browserSync.stream({
			match: '**/*.css'
		}) )
		;
});

// Build scripts
gulp.task( 'public:scripts', function( cb ) {

	pump([
		gulp.src( showcase.watch.scripts ),
		eslint(),
		eslint.format(),
		eslint.failAfterError(),
		babel({
			presets: [
				[ '@babel/env', {
					modules: false
				} ]
			]
		}),
		concat( 'public.js' ),
		uglify(),
		rename({
			suffix: '.min'
		}),
		gulp.dest( showcase.output.scripts ),
		browserSync.stream()
	], cb );
});

// Copy assets – styles
gulp.task( 'public:assets:css', function() {

	gulp.src( showcase.watch.assetsCss )
		.pipe( gulp.dest( showcase.output.main + 'assets/css/' ) )
		.pipe( browserSync.stream() )
		;
});

// Copy assets – scripts
gulp.task( 'public:assets:js', function() {

	gulp.src( showcase.watch.assetsJs )
		.pipe( gulp.dest( showcase.output.main + 'assets/js/' ) )
		.pipe( browserSync.stream() )
		;
});

// Copy assets – fonts
gulp.task( 'public:assets:fonts', function() {

	gulp.src( showcase.watch.assetsFonts )
		.pipe( gulp.dest( showcase.output.main + 'assets/fonts/' ) )
		.pipe( browserSync.stream() )
		;
});

// Copy assets – images
gulp.task( 'public:assets:images', function() {

	gulp.src( showcase.watch.assetsImages )
		.pipe( gulp.dest( showcase.output.main + 'assets/images/' ) )
		.pipe( browserSync.stream() )
		;
});

// Copy assets
gulp.task( 'public:assets', [
	'public:assets:css',
	'public:assets:js',
	'public:assets:fonts',
	'public:assets:images'
]);

// Build public
gulp.task( 'public:build', [
	'public:pages',
	'public:templates',
	'public:styles',
	'public:scripts',
	'public:assets'
]);

// Watch public
gulp.task( 'public:watch', function() {

	// Watch pages
	gulp.watch( showcase.watch.pages, [ 'public:pages' ]);

	// Watch templates
	gulp.watch( showcase.watch.templates, [ 'public:templates' ]);

	// Watch styles
	gulp.watch( showcase.watch.styles, [ 'public:styles' ]);

	// Watch scripts
	gulp.watch( showcase.watch.scripts, [ 'public:scripts' ]);

	// Watch assets – styles
	gulp.watch( showcase.watch.assetsCss, [ 'public:assets:css' ]);

	// Watch assets – scripts
	gulp.watch( showcase.watch.assetsJs, [ 'public:assets:js' ]);

	// Watch assets – fonts
	gulp.watch( showcase.watch.assetsFonts, [ 'public:assets:fonts' ]);

	// Watch assets – images
	gulp.watch( showcase.watch.assetsImages, [ 'public:assets:images' ]);

	// Watch for HTML changes
	gulp.watch( showcase.watch.pages ).on( 'change', browserSync.reload );
	gulp.watch( showcase.watch.templates ).on( 'change', browserSync.reload );

});

/**
 * Development
 * Main task for development environment.
 *
 * @since 1.7.0
 */

gulp.task( 'development', [
	'library:build',
	'public:build',
	'browser-sync',
	'library:watch',
	'public:watch'
]);
