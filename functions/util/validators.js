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

// signup helper
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

// log in helper
exports.validateLogInData = (user) => {
    let errors = {};

    if(isEmpty(user.email)) errors.email = 'Must not be empty'
    if(isEmpty(user.password)) errors.password = 'Must not be empty'
 
    return {
        errors,
        valid: Object.keys(errors).length === 0 ? true : false
    }
}

// user details helper
exports.reduceUserDetails = (data) => {
    let userDetails = {};

    if(!isEmpty(data.bio.trim())) userDetails.bio = data.bio;
    if(!isEmpty(data.website.trim())) {
        // https://website.com
        if(data.website.trim().substring(0, 4) !== 'http'){
            userDetails.website = `http://${data.website.trim()}`;
        }else {
            userDetails.website = data.website;
        }
    }
    if(!isEmpty(data.location.trim())) userDetails.location = data.location;

    return userDetails;
}