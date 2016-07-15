/**
 * Created by yangjie5 on 2016/6/14.
 */
var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.render('upload', { title: 'Express'});
});

module.exports = router;