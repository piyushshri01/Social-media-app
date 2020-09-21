// Helpers Methods
const isEmail = (email) => {
    const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(email.match(regEx)) return true;
    else return false;
}

const isEmpty = (string) => {
    if(string.trim() === '') return true;
    else return false;
}

exports.validateSignUpData = (newUser) => {
    let errors = {};

    // validate email
    if(isEmpty(newUser.email)) {
        errors.email = 'Email must not be empty'
    }else if(!isEmail(newUser.email)) {
        errors.email = 'Must be a valid email address'
    }

    // validate password and !empty
    if(isEmpty(newUser.password)) errors.password = 'Must not be empty';
    if(newUser.password !== newUser.confirmPassword) errors.confirmPassword = 'Passwords must match';
    if(isEmpty(newUser.handle)) errors.handle = 'Must not be empty';

    return {
        errors,
        valid: Object.keys(errors).length === 0 ? true : false
    }
}

exports.validateLogInData = (user) => {
    let errors = {};

    if(isEmpty(user.email)) errors.email = 'Must not be empty'
    if(isEmpty(user.password)) errors.password = 'Must not be empty'
 
    return {
        errors,
        valid: Object.keys(errors).length === 0 ? true : false
    }
}