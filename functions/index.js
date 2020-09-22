const functions = require('firebase-functions');
const app = require('express')();
const FBAuth = require('./util/FBAuth');

// Screams and User
const { getAllScreams, postOneScream, getScream, commentOnScream } = require('./handlers/screams');
const { signUp, logIn, uploadImage, addUserDetails, getAuthenticatedUser } = require('./handlers/user')


// get Screams Route
app.get('/screams', getAllScreams);
// post one scream route
app.post('/scream', FBAuth, postOneScream)
// get one screm
app.get('/scream/:screamId', getScream)
// TODO delete scream
// TODO like a scream
// TODO unlike a scream
// TODO comment on scream
app.post('/scream/:screamId/comment', FBAuth, commentOnScream)


// User Route
// upload image router
app.post('/user/image', FBAuth, uploadImage)
// upload user details router
app.post('/user', FBAuth, addUserDetails)
// get user details 
app.get('/user', FBAuth, getAuthenticatedUser)
// Sign Up route
app.post('/signup', signUp);
//Log In route
app.post('/login', logIn);



exports.api = functions.https.onRequest(app); 