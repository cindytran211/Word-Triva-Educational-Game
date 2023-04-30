const mongoCollections = require("../config/mongoCollections");
const users = mongoCollections.users;
const validation=require('../validation');
const bcrypt=require('bcrypt');
let exportedMethod = {

    /*  CREATE USER
    The createUser function takes in a username and password
    Utilizes the two helper functions above to ensure username/password validity
    Then, it uploads it to the MongoDB database */

    async createUser(username, email, password) {
        username=validation.validName(username);
        password=validation.validPassword(password);
        const newUserName=username.toLowerCase();
        const usersCollection= await users();
        const findUser=await usersCollection.find({username: newUserName}).toArray();
        if(findUser.length==0)
        {
            const saltRounds=16;
            const hash=await bcrypt.hash(password,saltRounds);
            const holder=
            {
                username: newUserName,
                email: email,
                password: hash,
            }
            const newUser=await usersCollection.insertOne(holder);
            if(!newUser.acknowledged || !newUser.insertedId)
            {
                throw "Error: Could not Add User"
            }
            const inserted=
            {
                userInserted: true
            }
            return inserted;
        }
        else
        {
            throw "Error: There is Already A User With That UserName"
        }
    },
    async checkUser(username,password){
        username=validation.validName(username)
        password=validation.validPassword(password);
        const newUserName=username.toLowerCase();
        const usersCollection=await users();
        const findUser=await usersCollection.find({username: newUserName}).toArray();
        if(!findUser)
        {
            throw "Error: Either the username or password is invalid"
        }
        else
        {
            const comparePasswords=await bcrypt.compare(password,findUser[0].password);
            if(comparePasswords)
            {
                const holder=
                {
                    authenticated: true
                }
                return holder;
            }
            else
            {
                throw "Error: Either the username or password is invalid"
            }
        }
    }

}

module.exports = exportedMethod;