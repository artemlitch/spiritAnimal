var jobs = {}
var personalityTypes = [ENFJ, ENFP, INFJ, INFP, INTP, INTJ, ENTP, ENTJ, ISFP, ISTP, ESFP, ESTP, ISFJ, ESFJ, ESTJ];
var personalityTypesString = ['ENFJ', 'ENFP', 'INFJ', 'INFP', 'INTP', 'INTJ', 'ENTP', 'ENTJ', 'ISFP', 'ISTP', 'ESFP', 'ESTP', 'ISFJ', 'ESFJ', 'ESTJ'];
function buildWorkData() {
    console.log(ENTP); 
    for (type in personalityTypes) {
        careers = personalityTypes[type];
        console.log(personalityTypes[type])
        for(i in careers) {
            if(!jobs[careers[i]]) {
                jobs[careers[i]] = [];
            }
            jobs[careers[i]].push(personalityTypesString[type]);
        }
    }
}

buildWorkData();
