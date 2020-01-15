const gulp = require('gulp'),
stylus = require('gulp-stylus'),
concat = require('gulp-concat'),
prefixes = require('autoprefixer'),
cssnano = require('cssnano'),
postcss = require('gulp-postcss'),
uglify = require('gulp-uglify'),
sourcemaps = require('gulp-sourcemaps');

const config = {
        js: {
            src : 'src/js/*.js',
            },

        css : {
            src: 'src/stylus/main.styl',
            watch: 'src/scss/**/*.styl'

        },
            dist: 'dist',
            postCSSModules: [
            prefixes(),
            cssnano({ zindex: false, reduceIdents: false, removeAll: true }),
            ]

        };

        gulp.task('css', () => {
            return gulp.src('src/stylus/*.styl')
            .pipe(stylus())
            .pipe(sourcemaps.init())
            .pipe(postcss(config.postCSSModules))
            .pipe(sourcemaps.write('.'))
            .pipe(gulp.dest(config.dist));
        });

        gulp.task('js', () => {
            return gulp.src(config.js.src)
            .pipe(sourcemaps.init())    
            .pipe(concat('app.js'))
            .pipe(uglify())
            .pipe(sourcemaps.write('.'))
            .pipe(gulp.dest(config.dist))

        });

        gulp.task('watch', (done) => {
            gulp.watch(config.css.watch, gulp.series('css'));
            gulp.watch(config.js.src, gulp.series('js'));
            done;
        });

        gulp.task('default', gulp.series('js','css', 'watch'));