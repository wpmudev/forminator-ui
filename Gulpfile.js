// Load packages
var gulp         = require( 'gulp' ),
	watch        = require( 'gulp-watch' ),
	sass         = require( 'gulp-sass' ),
	sourcemaps   = require( 'gulp-sourcemaps' ),
	autoprefixer = require( 'gulp-autoprefixer' ),
	rename       = require( 'gulp-rename' ),
	notify       = require( 'gulp-notify' )
	;

// List of browsers
var browserlist = [
	'last 2 version',
	'> 1%'
];

// Paths
var paths = {
	src:      'src/assets/scss/',
	dist:     'public/assets/css/'
};

// Index
var index = [
	paths.src + 'index.scss',
	paths.src + 'index-ui/*.scss'
];

// Forminator UI
var forminator = [
	paths.src + 'forminator-ui.scss',
	paths.src + 'forminator-ui/**/*.scss'
];

// ==================================================
// Tasks

// Task: Compress index styles
gulp.task( 'index', function() {

	gulp.src( index )
		.pipe( sourcemaps.init() )
		.pipe( sass({ outputStyle: 'compressed' }) ).on( 'error', function( err ) {
			notify().write( err );
		} )
		.pipe( autoprefixer( browserlist ) )
		.pipe( sourcemaps.write( 'maps' ) )
		.pipe( rename({
			suffix: '.min'
		}) )
		.pipe( gulp.dest( paths.dist ) )
		.pipe( notify({
			message: 'Index styles are ready',
			onLast: true
		}) )
		;
} );

gulp.task( 'watch-index', function() {
	gulp.watch( index, [ 'index' ] );
} );

// Task: Compress forminator styles
gulp.task( 'forminator', function() {

	gulp.src( forminator )
		.pipe( sourcemaps.init() )
		.pipe( sass({ outputStyle: 'compressed' }) ).on( 'error', function( err ) {
			notify().write( err );
		} )
		.pipe( autoprefixer( browserlist ) )
		.pipe( sourcemaps.write( 'maps' ) )
		.pipe( rename({
			suffix: '.min'
		}) )
		.pipe( gulp.dest( paths.dist ) )
		.pipe( notify({
			message: 'Forminator styles are ready',
			onLast: true
		}) )
		;
} );

gulp.task( 'watch-forminator', function() {
	gulp.watch( forminator, [ 'forminator' ] );
} );

// ==================================================
// Watch

// Watch all tasks
gulp.task( 'default', [ 'watch-index', 'watch-forminator' ] );
