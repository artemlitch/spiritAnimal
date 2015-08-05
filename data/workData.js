var express = require('express');
var nt = require('./nt');
var nf = require('./nf');
var sj = require('./sj');
var sp = require('./sp');
var personalityCategory = [nf, nt, sj, sp];

var workData = {
    'buildWorkData': function() {
        var jobs = {};
        for (category in personalityCategory) {
            personalityTypes = personalityCategory[category].types;
            personalityTypesString = personalityCategory[category].typesString;
            for (type in personalityTypes) {
                careers = personalityTypes[type];
                for(i in careers) {
                    if(!jobs[careers[i]]) {
                        jobs[careers[i]] = [];
                    }
                    jobs[careers[i]].push(personalityTypesString[type]);
                }
            }
        }    
        return jobs;
    },
}

module.exports = workData;
