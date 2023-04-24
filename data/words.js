const mongoCollections=require("../config/mongoCollections");
const words=mongoCollections.words;
const axios=require('axios');

let exportedMethod={
    async addWord(){
        let newWord;
        const wordsCollections=await words();
        let getWordInfo;
        let runAgain=false;
        while(true){
            newWord=await axios.get('https://random-word-api.herokuapp.com/word');
            newWord=newWord.data[0];
            try{
                getWordInfo=await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${newWord}`);
                runAgain=false;
            }catch(e){
                if(e.response.status===404){
                    runAgain=true;
                    continue;
                }
            }
            const findWord = await wordsCollections.findOne({ word: newWord });
            if (findWord == null && !runAgain) {
                break;
            }
        }
        getWordInfo=getWordInfo.data[0];
        let newWordStuff={
            word: newWord,
            partOfSpeech: getWordInfo.meanings && getWordInfo.meanings[0] && getWordInfo.meanings[0].partOfSpeech ? getWordInfo.meanings[0].partOfSpeech : "No Part of Speech",
            definition: getWordInfo.meanings && getWordInfo.meanings[0] && getWordInfo.meanings[0].definitions && getWordInfo.meanings[0].definitions[0] && getWordInfo.meanings[0].definitions[0].definition ? 
            getWordInfo.meanings[0].definitions[0].definition : "No Definition"
        }
        const insertInfo=await wordsCollections.insertOne(newWordStuff);
        if(!insertInfo.acknowledged || !insertInfo.insertedId){
            throw "Could not add word";
        }
        return {wordInserted: newWord}
    }
}

module.exports=exportedMethod;