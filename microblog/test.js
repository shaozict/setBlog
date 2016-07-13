/**
 * Created by yangjie5 on 2016/6/14.
 */
var fs = require('fs');
var markdown = require( "markdown" ).markdown;

fs.readFile("views/article/a3.md",function(err, data){
    if (err) {
        return console.error(err);
    }
    //console.log("异步读取: " + data);
    var html = markdown.toHTML(data.toString());
    fs.writeFile('views/article/4.ejs', html,  function(err) {
        if (err) {
            return console.error(err);
        }
        console.log("数据写入成功！");
    });
});

