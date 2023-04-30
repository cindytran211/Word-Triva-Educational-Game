module.exports={
    /*  USERNAME VALIDATION
    Has at least 6 characters
    Contains at least one letter and one number
    Returns true/false on validity! */

    validName(name) {
    if (name.length < 6) { throw 'Error: The Username is not in the correct format'}

    /* Username must contain at least one letter and one number */
    if (/[a-zA-Z]/g.test(name) === false || /\d/.test(name) === false) { 
        throw 'Error: The Username is not in the correct format'
    }
    return name;
},
/*  PASSWORD VALIDATION
    Has at least 8 characters
    Contains at least one letter and one number
    Returns true/false on validity */
    
    validPassword(password) {
    if (password.length < 8) { throw "Error: The Password is not in the correct format" }

    /* Password must contain at least one letter and one number */
    if (/[a-zA-Z]/g.test(password) === false || /\d/.test(password) === false) { 
        throw "Error: The Password is not in the correct format"
    }
    return password;
},
validateEmail(mail) 
{
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
  {
    return mail
  }else{
    throw "Error: The Email is in the incorrect format"
  }
}
}