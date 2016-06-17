/**
 * Created by yangjie5 on 2016/6/14.
 */
var fs = require('fs');
fs.readdir("views/article/", function (err, files) {
    if (err) {
        return console.error(err);
    }
    files.forEach(function (file) {
        console.log( file );
    });
});
var i=0;