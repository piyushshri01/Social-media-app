const functions = require('firebase-functions');
const app = require('express')();
const FBAuth = require('./util/FBAuth');

const { db } = require('./util/admin');

// Screams and User
const { getAllScreams, postOneScream, getScream, commentOnScream, likeScream, unlikeScream, deleteScream } = require('./handlers/screams');
const { signUp, logIn, uploadImage, addUserDetails, getAuthenticatedUser, getUserDetails, markNotificationsRead } = require('./handlers/user')


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
// get user
app.get('/user/:handle', getUserDetails);
// mark notification
app.get('/notifications',FBAuth, markNotificationsRead);
// Sign Up route
app.post('/signup', signUp);
//Log In route
app.post('/login', logIn);


exports.api = functions.region('us-central1').https.onRequest(app); 

exports.createNotificationOnLike = functions.region('us-central1').firestore.document('likes/{id}')
    .onCreate((snapshot) => {
        db.doc(`/screams/${snapshot.data().screamId}`).get()
            .then(doc => {
                if(doc.exists){
                    return db.doc(`/notifications/${snapshot.id}`).set({
                        createdAt: new Date().toISOString(),
                        recipient: doc.data().userHandle,
                        sender: snapshot.data().userHandle,
                        type: 'like',
                        read: false,
                        screamId: doc.id
                    });
                }
            })
            .then(() => {
                return;
            })
            .catch(err => {
                console.error(err);
                return;
            })
    });

exports.deleteNotificationOnUnLike = functions.region('us-central1').firestore.document('likes/{id}')
.onDelete((snapshot) => {
    db.doc(`/notifications/${snapshot.id}`)
    .delete()
    .then(() => {
        return;
    })
    .catch((err) => {
        console.error(err);
        return;
    })
})

exports.createNotificationOnComment = functions.region('us-central1').firestore.document('comments/{id}')
.onCreate((snapshot) => {
    db.doc(`/screams/${snapshot.data().screamId}`).get()
        .then(doc => {
            if(doc.exists){
                return db.doc(`/notifications/${snapshot.id}`).set({
                    createdAt: new Date().toISOString(),
                    recipient: doc.data().userHandle,
                    sender: snapshot.data().userHandle,
                    type: 'comment',
                    read: false,
                    screamId: doc.id
                });
            }
        })
        .then(() => {
            return;
        })
        .catch(err => {
            console.error(err);
            return 
        })
})