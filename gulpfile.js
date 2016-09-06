var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    concat = require('gulp-concat-util'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    iconfont = require('gulp-iconfont'),
    iconfontCss = require('gulp-iconfont-css'),
    rename = require('gulp-rename'),
    args = require('yargs').argv,
    config = require('./gulp.config')(),
    del = require('del'),
    server = require('gulp-server-livereload'),
    $ = require('gulp-load-plugins')({lazy: true});

gulp.task('templates', function () {
    log('Update All html files!');
    return gulp
        .src(config.srcTemplates)
        .pipe(gulp.dest(config.pubTemplates));
});

gulp.task('styles', ['iconFont'], function () {
    log('Compiling SASS --> CSS');
    return gulp
        .src(config.srcStyles)
        .pipe($.plumber())
        .pipe($.sass())
        .pipe($.autoprefixer({browsers: ['last 2 version', '> 5%']}))
        .pipe($.cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(config.pubStyles));
});

gulp.task('scripts', function () {
    log('Analyzing source with JSHint and generate main javascript!');
    return gulp
        .src(config.srcScripts)
        .pipe($.if(args.verbose, $.print()))
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish', {verbose: true}))
        .pipe($.jshint.reporter('fail'))
        .pipe(concat('main.js'))
        .pipe(concat.header('// file: <%= file.path %>\n'))
        .pipe(concat.footer('\n// end\n'))
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(config.pubScripts))
});

gulp.task('images', function () {
    log('Compress all images!');
    return gulp.src(config.srcImages)
        .pipe(imagemin())
        .pipe(gulp.dest(config.pubImages))
});

gulp.task('favicon', function () {
    log('Copy favicon!!');
    return gulp.src(config.srcFavicon)
        .pipe(gulp.dest(config.pubFavicon))
});

gulp.task('copyFonts', function () {
    log('Copy all fonts!');
    return gulp.src(config.srcFonts)
        .pipe(gulp.dest(config.pubFonts));
});

gulp.task('iconFont', function () {
    log('Create font icon with SVG!');
    return gulp.src(config.srcSvgFont)
        .pipe(iconfontCss({
            fontName: 'Icons',
            targetPath: config.srcSvgFontStyle,
            fontPath: config.pubSvgFont
        }))
        .pipe(iconfont({
            fontName: 'Icons',
            appendCodepoints: true,
            formats: ['ttf', 'eot', 'woff', 'woff2', 'svg'],
            normalize: true,
            fontHeight: 1001
        }))
        .pipe(gulp.dest(config.pubSvgFont));
});

gulp.task('vendors', function () {
    log('Create vendor javascript!');
    return gulp.src(config.srcVendors)
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest(config.pubVendors))
});

gulp.task('clean', function (done) {
    var files = config.pubTemplates + '**/*';
    clean(files, done);
});

gulp.task('clean-templates', function (done) {
    var files = config.pubTemplates + '**/*.html';
    clean(files, done);
});

gulp.task('clean-scripts', function (done) {
    var files = config.pubScripts + '**/*.js';
    clean(files, done);
});

gulp.task('clean-styles', function (done) {
    var files = config.pubStyles + '**/*.css';
    clean(files, done);
});

gulp.task('clean-images', function (done) {
    var files = config.pubImages + '**/*';
    clean(files, done);
});

gulp.task('build', [
    'templates',
    'styles',
    'scripts',
    'vendors',
    'images',
    'favicon',
    'copyFonts'
]);

gulp.task('watch', ['build', 'webserver'], function() {
    gulp.watch(config.srcTemplates, ['templates']);
    gulp.watch(config.srcStyles, ['styles']);
    gulp.watch(config.srcScripts, ['scripts']);
});

gulp.task('webserver', function() {
    gulp.src('public')
        .pipe(server({
            livereload: true,
            directoryListing: false,
            open: true
        }));
});

gulp.task('default', ['build', 'webserver', 'watch']);

/*
 * common functions
 */
function clean(path, done) {
    log('Cleaning: ' + $.util.colors.blue(path));
    del(path, done);
}

function log(msg) {
    if (typeof(msg) === 'object') {
        for (var item in msg) {
            if (msg.hasOwnProperty(item)) {
                $.util.log($.util.colors.blue(msg[item]));
            }
        }
    } else {
        $.util.log($.util.colors.blue(msg));
    }
}
