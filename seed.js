const words = require('./data/words.js');
const users = require('./data/users.js')
const connection = require('./config/mongoConnection');

const main=async()=>{
    for(let i=0;i<100;i++){
        await words.addWord();
    }

    try {
        await users.createUser("name","hi", "hi@gmail","hello")
        console.log("This should not print");
    } catch (e) {
        console.log(e);
        console.log("The above test case fails");
    }

    try {
        await users.createUser("User","TestUser123","testuser@gmail.com" ,"545IsCool")
        console.log("This test case passes");
    } catch (e) {
        console.log(e);
    }

    try {
        await users.createUser("luke","Luke602", "luke@gmail.com","02Luke02");
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