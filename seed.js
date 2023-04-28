const words = require('./data/words.js');
const users = require('./data/users.js')
const connection = require('./config/mongoConnection');

const main=async()=>{
    for(let i=0;i<10;i++){
        await words.addWord();
    }

    try {
        await users.createUser("hi", "hello")
        console.log("This should not print");
    } catch (e) {
        console.log(e);
        console.log("The above test case fails");
    }

    try {
        await users.createUser("TestUser123", "545IsCool")
        console.log("This test case passes");
    } catch (e) {
        console.log(e);
    }

    try {
        await users.createUser("Luke602", "02Luke02");
        console.log("The second user is now in the database");
    } catch (e) {
        console.log(e);
    }


    const db = await connection.connectToDb();
    await connection.closeConnection();
}

main().catch((error)=>{
    console.log(error);
});