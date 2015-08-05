var express = require('express');
var router = express.Router();
var sentiment = require('sentiment');
var natural = require('natural');
var workData = require('../data/workData.js')
var extraversion = require('../data/extraversion.js')
var openness = require('../data/openness.js')
var neuroticism = require('../data/neuroticism.js')
var agreeableness = require('../data/agreeableness.js')
var conscientiousness = require('../data/conscientiousness.js')

/* GET home page. */
var jobs = workData.buildWorkData();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/analyzePosts', function(req, res, next) {
    var userPosts = req.body;
    var totalExt = 0;
    var extCount = 0;
    var totalOpen = 0;
    var openCount = 0;
    var totalNeuro = 0;
    var neuroCount = 0;
    var totalAgree = 0;
    var agreeCount = 0;
    var totalCon = 0;
    var conCount = 0;
    for( n in userPosts.posts) {
        tokenizer = new natural.TreebankWordTokenizer();
        if(userPosts.posts[n]) {
            var postToken = tokenizer.tokenize(userPosts.posts[n]); 
            for (i in postToken) {
                var extVal = extraversion[postToken[i]];
                var openVal = openness[postToken[i]];
                var neuroVal = neuroticism[postToken[i]];
                var agreeVal = agreeableness[postToken[i]];
                var conVal = conscientiousness[postToken[i]];
               if(extVal) {
                    totalExt +=extVal.ext;
                    extCount++;
               }
               if(openVal) {
                    totalOpen +=openVal.ope;
                    openCount++;
               }
               if(neuroVal) {
                    totalNeuro +=neuroVal.neu;
                    neuroCount++;
               }
               if(agreeVal) {
                    totalAgree +=agreeVal.agr;
                    agreeCount++;
               }
               if(conVal) {
                    totalCon +=conVal.con;
                    conCount++;
               }
            }
        }
    }
    var body = {
        extraversion:  (((totalExt/extCount)*1000)+100)/2,
        openness: (((totalOpen/openCount)*1000)+100)/2,
        neuroticism: (((totalNeuro/neuroCount)*1000)+100)/2,
        agreeableness: (((totalAgree/agreeCount)*1000)+100)/2,
        conscientiousness: (((totalCon/conCount)*1000)+100)/2

    }
    res.send(body);
});

router.post('/analyzeWork', function(req, res, next) {
    var userWork = req.body;
    console.log(userWork);
    var tokenizer = new natural.WordTokenizer();
    var personalities;
    for (i in userWork.positions) {
        var jobTokens = (tokenizer.tokenize(userWork.positions[i].name));
        for(x in jobTokens) {
            if(jobs[jobTokens[x]]){
                personalities = jobs[jobTokens[x]];
                break;
            }
        }
    }
    var body = {
        personalities: personalities
    }
    res.send(body);
});
module.exports = router;
