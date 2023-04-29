const mongoCollections = require("../config/mongoCollections");
const users = mongoCollections.users;

/*  USERNAME VALIDATION
    Has at least 6 characters
    Contains at least one letter and one number
    Returns true/false on validity! */

function validName(name) {
    if (name.length < 6) { return false; }

    /* Username must contain at least one letter and one number */
    if (/[a-zA-Z]/g.test(name) === false || /\d/.test(name) === false) { return false; }

    return true;
};


/*  PASSWORD VALIDATION
    Has at least 8 characters
    Contains at least one letter and one number
    Returns true/false on validity */

function validPassword(password) {
    if (password.length < 8) { return false; }

    /* Password must contain at least one letter and one number */
    if (/[a-zA-Z]/g.test(password) === false || /\d/.test(password) === false) { return false; }

    return true;
}

let exportedMethod = {

    /*  CREATE USER
    The createUser function takes in a username and password
    Utilizes the two helper functions above to ensure username/password validity
    Then, it uploads it to the MongoDB database */

    async createUser(username, password) {
        if (!username || !password) {
            throw "Error: Username and/or password missing";
        }
    
        if (typeof username !== 'string' || typeof password !== 'string') {
            throw "Error: Username and/or password must be a string";
        }
    
        username = username.trim();
        if (validName(username) == false) { throw "Error: Username is invalid!"; }
        
        password = password.trim();
        if (validPassword(password) == false) { throw "Error: Password is invalid!"; }
    
    
        /* Step 2: Insert user */
    
        const newUser = {username: username, password: password};

        const user = await users();

        const userList = await this.getAllUsers();

        for (let x of userList) {
            if (x.username.toLowerCase() === username.toLowerCase()) {
                throw "Error: Username already exists in database!";
            }
        }
    
        const insertInfo = await user.insertOne(newUser);
        if (!insertInfo.acknowledged || !insertInfo.insertedId) { throw 'Error: Could not add user'; }
    
    
        return {created: true};
    },

    async getAllUsers() {
        const userData = await users();
        let userList = await userData.find({}).toArray();
        if (!userList) { throw "Error: Unable to find all users!"; }
        
        userList = userList.map((item) =>  { 
        item._id = item._id.toString(); 
        return item; });
        return userList;
    },

    async getUser(id) {
        if (!id) { throw "Error: id parameter doesn't exist!"; }
        if (typeof id !== 'string' || id.trim().length === 0) { throw "Error: id parameter must be of string type and a non-empty string!"; }

        // TRIM ID
        id = id.trim();

        if (!ObjectId.isValid(id)) { throw "Error: Invalid object ID!"; }
        
        const userData = await users();

        let user = await userData.findOne({_id: new ObjectId(id)});

        if (user === null) { throw "Error: User not found in database!"; }
        user._id = user._id.toString();

        return user;
    }
}

module.exports = exportedMethod;