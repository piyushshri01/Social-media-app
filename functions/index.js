const functions = require('firebase-functions');
const app = require('express')();
const FBAuth = require('./util/FBAuth');

// Screams and User
const { getAllScreams, postOneScream } = require('./handlers/screams');
const { signUp, logIn, uploadImage } = require('./handlers/user')


// get Screams Route
app.get('/screams', getAllScreams);
// post one scream route
app.post('/scream', FBAuth, postOneScream)
// Sign Up route
app.post('/signup', signUp);
//Log In route
app.post('/login', logIn);
// 
app.post('/user/image', FBAuth, uploadImage)

exports.api = functions.https.onRequest(app); 