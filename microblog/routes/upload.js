/**
 * Created by yangjie5 on 2016/6/14.
 */
var express = require('express');
var router = express.Router();
var Sets = require('../models/sets.js');
var markdown = require( "markdown" ).markdown;

var aSet = new Sets({
    "setName": "aSet"
});

router.get('/', function (req, res, next) {
    res.render('upload', { title: 'Express'});
});
router.post('/mes', function (req, res, next) {
    var result = req.body["result"];
    var html = markdown.toHTML(result.toString());
    var cc;
    aSet.save({
        id: req.body["name"],
        name: req.body["name"],
        result: html
    }, function (err, obj) {
        //req.session.user = newUser;
        res.send('mask成功！');
    });
});
module.exports = router;