/**
 * Created by yangjie5 on 2016/6/14.
 */
var express = require('express');
var router = express.Router();
var User = require('../models/user.js')

var message = require('./data');

router.get('/', function(req, res, next) {
    res.render('reply', { title: 'Express' });
});
router.post('/mes', function(req, res, next) {
    var newUser = new User({
        "name":req.body["name"],
        password: req._startTime,
    });
    newUser.save(function(err,obj) {
        req.session.user = newUser;
        res.send( '注册成功');
    });
});


module.exports = router;