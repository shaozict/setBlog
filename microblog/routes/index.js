var express = require('express');
var fs = require('fs');
var router = express.Router();
//var art = require('./views/article/');
var src = "./views/article/";
/* GET home page. */
//try {
//  var options = fs.readdirSync(src);
//
//}
//catch(err) {
//  var options = 0;
//  console.log(err);
//}
var message = require('./data');


router.get('/', function(req, res, next) {

  res.render('index', { title: 'Express',artlist:message.art.data });
});



module.exports = router;
