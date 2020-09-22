const functions = require('firebase-functions');
const app = require('express')();
const FBAuth = require('./util/FBAuth');

// Screams and User
const { getAllScreams, postOneScream, getScream, commentOnScream, likeScream, unlikeScream, deleteScream } = require('./handlers/screams');
const { signUp, logIn, uploadImage, addUserDetails, getAuthenticatedUser } = require('./handlers/user')


// get Screams Route
app.get('/screams', getAllScreams);
// post one scream route
app.post('/scream', FBAuth, postOneScream)
// get one screm
app.get('/scream/:screamId', getScream)
// TODO delete scream
app.delete('/scream/:screamId', FBAuth, deleteScream)
// TODO like a scream
app.get('/scream/:screamId/like', FBAuth, likeScream)
// TODO unlike a scream
app.get('/scream/:screamId/unlike', FBAuth, unlikeScream)
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