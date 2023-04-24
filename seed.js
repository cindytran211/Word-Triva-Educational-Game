const words=require('./data/words');
const connection = require('./config/mongoConnection');

const main=async()=>{
    for(let i=0;i<10;i++){
        await words.addWord();
    }

    const db = await connection.connectToDb();
    await connection.closeConnection();
}

main().catch((error)=>{
    console.log(error);
});