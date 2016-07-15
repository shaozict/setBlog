var express = require('express');
var fs = require('fs');
var router = express.Router();

var src = "./views/article/";

var message = require('./data');


router.get('/', function(req, res, next) {

  res.render('index', { title: 'Express',artlist:message.art.data });
});



module.exports = router;
