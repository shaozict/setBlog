/**
 * Created by yangjie5 on 2016/6/14.
 */
var express = require('express');
var router = express.Router();
var User = require('../models/user.js')

var message = require('./data');

router.get('/', function(req, res, next) {
    var newUser = new User();
    User.get(function(err,docs){
        res.send(docs);
        //res.render('reply', { title: 'Express',reps:docs});
    })

});
router.post('/mes', function(req, res, next) {
    var newUser = new User({
        name:req.body["name"],
        text: req.body["text"],
        email: req.body["email"],
        date:checkDate(req._startTime)
    });
    newUser.save(function(err,obj) {
        //req.session.user = newUser;
        res.send( '回复成功！');
    });
});
function checkDate(ct){
    var date = new Date(ct);
    return date.getFullYear()+"年"+date.getMonth()+"月"+date.getDate();
}

module.exports = router;