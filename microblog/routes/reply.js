/**
 * Created by yangjie5 on 2016/6/14.
 */
var express = require('express');
var router = express.Router();
var Sets = require('../models/sets.js')

var message = require('./data');

var leavsSet = new Sets({
    "setName": "leavs"
});

router.get('/', function (req, res, next) {
    leavsSet.get(function (err, docs) {
        res.send(docs);
        //res.render('reply', { title: 'Express',reps:docs});
    })
});
router.post('/mes', function (req, res, next) {
    leavsSet.save({
        id: req.body["name"],
        name: req.body["name"],
        text: req.body["text"],
        email: req.body["email"],
        date: checkDate(req._startTime)
    }, function (err, obj) {
        //req.session.user = newUser;
        res.send('回复成功！');
    });
});
function checkDate(ct) {
    var date = new Date(ct);
    return date.getFullYear() + "年" + date.getMonth() + "月" + date.getDate();
}

module.exports = router;