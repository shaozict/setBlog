/**
 * Created by yangjie5 on 2016/6/14.
 */
var express = require('express');
var router = express.Router();

router.get('/:number', function(req, res, next) {
    res.render('article/'+req.params.number, { title: 'Express',reply:1});
});



module.exports = router;