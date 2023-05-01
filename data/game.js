const mongoCollections=require("../config/mongoCollections");
const words=mongoCollections.words;
const word = require('./words');

let exportedMethod = {

    async mcGame(){
        const wordsCollections=await words();
        const getAllWords=await wordsCollections.find({}).toArray();
        let question = 'Given this defintion, what is the word: ';
        let randomNum = Math.floor(Math.random() * getAllWords.length);
        let questionInfo = getAllWords[randomNum];
        console.log(questionInfo);
        let completeQuestion = question + questionInfo.definition;
        randomNum = Math.floor(Math.random() * getAllWords.length);
        let answer2 = await wordsCollections.find().skip(randomNum).limit(1).next();
        randomNum = Math.floor(Math.random() * getAllWords.length);
        let answer3 = await wordsCollections.find().skip(randomNum).limit(1).next();
        let answers = {
            a: questionInfo.word,
            b: answer2.word,
            c: answer3.word
        }
        let finalQuestion = {
            question: completeQuestion,
            answers: answers
        }
        console.log(finalQuestion);
        return finalQuestion;
    }
}

module.exports=exportedMethod;