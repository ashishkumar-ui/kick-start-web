//Include gulp
var gulp=require('gulp');

var jshint=require('gulp-jshint'),
    sass=require('gulp-sass'),
    uglify=require('gulp-uglify'),
    rename=require('gulp-rename'),
    queue=require('q'),
    jsdoc=require('gulp-jsdoc'),
	openFile = require('gulp-open');

//var indexFile='index.html';

gulp.task('lint', function(){
    var deferred=queue.defer();
    setTimeout(function() {
        deferred.resolve();
        return gulp
		.src(['Content/scripts/global/*.js','Content/scripts/modules/*.js'])
		.pipe(jshint())
		.pipe(jshint.reporter('gulp-html-log', {filename:'Content/scripts/logs/index.html'}));
    }, 1);
    
    return deferred.promise; 
});

gulp.task('jsdoc',function(){
    var deferred=queue.defer();
    setTimeout(function() {
        deferred.resolve();
        return gulp.src(['Content/scripts/global/*.js', 'Content/scripts/modules/*.js']).pipe(jsdoc('Content/scripts/doc'));
    }, 1);

    return deferred.promise; 
});

gulp.task('jsdoc1',function(){
    var deferred=queue.defer();
    setTimeout(function() {
        deferred.resolve();
        return gulp.src([
		'Content/scripts/modules/bcg.header.js'
		,'Content/scripts/modules/bcg.errorPage.js'
		//,'Content/scripts/modules/bcg.clientManagement.js'
		]).pipe(jsdoc('Content/scripts/doc'));
    }, 1);

    return deferred.promise; 
});

//Task for Sass compilation
gulp.task('sass', function(){
    var deferred=queue.defer();
    setTimeout(function() {
        deferred.resolve();
        return gulp.src('Content/css/sass/*.scss').pipe(sass({outputStyle: 'compressed'})).pipe(gulp.dest('Content/css'));
    }, 1);

    return deferred.promise;
});

//Task for minifying and uglifying the scripts
gulp.task('jsmin',function(){
    var deferred=queue.defer();
    setTimeout(function() {
        deferred.resolve();
        return gulp.src('Content/scripts/modules/*.js')
		.pipe(uglify())
		.pipe(gulp.dest('Content/scripts/modules-min'));
    }, 1);

    return deferred.promise;
});

//Initiating the watcher
gulp.task('watch',function(){
    var deferred=queue.defer();
    setTimeout(function() {
        //gulp.watch('Content/scripts/modules/*.js',['jsmin']);
        gulp.watch('Content/css/sass/*.scss',['sass']);
        deferred.resolve();
    }, 1);

    return deferred.promise;
});

// buils task
gulp.task('build',['sass', 'lint', 'jsmin'], function(){
	console.log("Task completed...");
	console.log("- CSS Compilation");
	console.log("- JS Linting");
	gulp.src('Content/scripts/logs/index.html').pipe(openFile());
	console.log("- JS Minification");
});

//Default Task
gulp.task('css',['sass', 'watch']);
gulp.task('js',['lint', 'jsmin']);
gulp.task('default', ["build"]);