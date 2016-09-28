var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var webserver = require('gulp-webserver');

gulp.task('browserify', function() {
    browserify('./js/components/App.jsx', { debug: true })
        .transform(babelify, { presets: ["es2015", "react"] })
        .bundle()
        .on("error", function (err) { console.log("Error : " + err.message); })
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('./js/'))
});

gulp.task('watch', function() {
    gulp.watch(['./js/components/*.jsx', './js/actions/*.js', './js/*.jsx'], ['browserify'])
});

gulp.task('webserver', function() {
    gulp.src('./')
        .pipe(webserver({
            host: '127.0.0.1',
            livereload: true
        })
    );
});

gulp.task('default', ['browserify', 'watch', 'webserver']);

/*
http://qiita.com/hkusu/items/e068bba0ae036b447754
とても参考

http://umai-bow.hateblo.jp/entry/2014/10/08/002235
より

## browserify
requireとかをみて、1ファイルにまとめてくれる

#### .bundle()
変換を実行

.pipe(source('bundle.js'))
vinyl-source-streamを使って、vinylに変換

.pipe()
streams.Transformを受け取って、変形をする

gulp.src()
vinylオブジェクトを作って返す


uglifyを使うと小さくできるらしい？

ES6 = ECMASCriptの6th Edition = ECMASCript2015 = ES2015

Babel: トランスパイラ
https://github.com/babel/babelify

Bower
あんま使われてないっぽい

gulp.task('default', [task, task, task]);
デフォルトのタスクを登録

gulp.task('name', function(){})
nameという名前でタスクを登録

*/
