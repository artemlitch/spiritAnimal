var sentiment = require('sentiment');
var natural = require('natural');
var workData = require('../data/workData.js')
var extraversion = require('../data/extraversion.js')
var openness = require('../data/openness.js')
var neuroticism = require('../data/neuroticism.js')
var agreeableness = require('../data/agreeableness.js')
var conscientiousness = require('../data/conscientiousness.js')

var anaylizer = {

    getBigFive: function(userPosts) {
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
            if(userPosts.posts[n]) {
                for (i in neuroticism) {
                    reg = new RegExp("\\b(" + i + ")\\b");
                    if(userPosts.posts[n].search(reg) > -1) {
                        var neuroVal = neuroticism[i];
                        totalNeuro +=(-neuroVal.neu);
                        neuroCount++;
                    }
                }
                for (i in openness) {
                    reg = new RegExp("\\b(" + i + ")\\b");
                    if(userPosts.posts[n].search(reg) > -1) {
                        var openVal = openness[i];
                        totalOpen +=openVal.ope;
                        openCount++;
                    }
                }
                for (i in extraversion) {
                    reg = new RegExp("\\b(" + i + ")\\b");
                    if(userPosts.posts[n].search(reg) > -1) {
                        extVal = extraversion[i];
                        totalExt +=extVal.ext;
                        extCount++;
                    }
                }
                for (i in agreeableness) {
                    reg = new RegExp("\\b(" + i + ")\\b");
                    if(userPosts.posts[n].search(reg) > -1) {
                        console.log(i)
                        agreeVal = agreeableness[i];
                        totalAgree +=agreeVal.agr;
                        agreeCount++;
                    }
                }
                for (i in conscientiousness) {
                    reg = new RegExp("\\b(" + i + ")\\b");
                    if(userPosts.posts[n].search(reg) > -1) {
                        conVal = conscientiousness[i];
                        totalCon +=conVal.con;
                        conCount++;
                    }
                }
            }
        }

        var bigFive = {
            extraversion:  (((totalExt/extCount)*1000)+100)/2,
            openness: (((totalOpen/openCount)*1000)+100)/2,
            neuroticism: (((totalNeuro/neuroCount)*1000)+100)/2,
            agreeableness: (((totalAgree/agreeCount)*1000)+100)/2,
            conscientiousness: (((totalCon/conCount)*1000)+100)/2
        }

        return bigFive;
    }
}


module.exports = anaylizer;
