var express = require('express');
var router = express.Router();
var personality = require('../analytics/personality')
/* GET home page. */
//var jobs = workData.buildWorkData();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Facebook analyze' });
});

router.post('/analyzePosts', function(req, res, next) {
    body = personality.getBigFive(req.body);
    res.send(body);
});

module.exports = router;
