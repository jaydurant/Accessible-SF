var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer =require('vinyl-buffer');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var cssnano = require('gulp-cssnano');
var eslint =require('gulp-eslint');
var rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var babelify = require('babelify');
var watchify = require('watchify');
var gutil = require('gulp-util');
var browserSync = require('browser-sync');
var reload = browserSync.reload;


var b = browserify({
		entries: './app/js/app.jsx',
		transform: [babelify],
		plugin: [watchify],
		extensions:['.jsx'],
		cache:{},
		packageCache: {},
		debug:true
	})


function bundle(){
	gutil.log('Compiling Javascript to ES5...');
	return b.bundle()
		   .on('error',gutil.log.bind(gutil,'Browserify Error'))
		   .pipe(source('app.js'))
		   .pipe(buffer())
		   .pipe(sourcemaps.init({loadMaps:true}))
		   .pipe(sourcemaps.write('./'))
		   .pipe(gulp.dest('app/js/'))
}

gulp.task('compilejs',bundle);
b.on('update',bundle);
b.on('log',gutil.log);



gulp.task('styles',function(){
	return gulp.src('sass/**/*.scss')
		.pipe(sass().on('error',sass.logError))
		.pipe(autoprefixer())
		.pipe(gulp.dest('app/css/'))
		.pipe(reload({stream:true}))
		.pipe(rename({suffix:'.min'}))
		.pipe(sourcemaps.init())
		.pipe(cssnano())
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('app/css/'))
})

gulp.task('uglify',function(){
	return gulp.src('app/js/app.js')
		 .pipe(uglify())
		 .pipe(rename({suffix:'.min'}))
		 .pipe(gulp.dest('app/js/'))
})

gulp.task('lint',function(){
	return gulp.src(['app/js/components/**','app/js/utils/**','!node_modules/**'])
		 .pipe(eslint())
		 .pipe(eslint.format())
		 .pipe(eslint.failAfterError());
})

gulp.task('default',['styles'],function(){
	browserSync.init({
		server:{
			baseDir: ["./"]
		}
	})
	gulp.watch(['app/js/components/**','app/js/utils/**'],['lint']);
	gulp.watch('sass/**/*.scss',['styles']);
	gulp.watch('*.html').on('change',reload);
	gulp.watch('app/js/*.js').on('change',reload);
})