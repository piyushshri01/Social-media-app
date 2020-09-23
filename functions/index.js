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
       return db.doc(`/screams/${snapshot.data().screamId}`).get()
            .then((doc) => {
                if(doc.exists && doc.data().userHandle !== snapshot.data().userHandle){
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
            .catch(err => {
                console.error(err);
            })
    });

exports.deleteNotificationOnUnLike = functions.region('us-central1').firestore.document('likes/{id}')
.onDelete((snapshot) => {
    return db.doc(`/notifications/${snapshot.id}`)
    .delete()
    .catch((err) => {
        console.error(err);
        return;
    })
})

exports.createNotificationOnComment = functions.region('us-central1').firestore.document('comments/{id}')
.onCreate((snapshot) => {
   return db.doc(`/screams/${snapshot.data().screamId}`).get()
        .then(doc => {
            if(doc.exists && doc.data().userHandle !== snapshot.data().userHandle){
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
        .catch(err => {
            console.error(err);
            return 
        })
})

exports.onUserimageChange = functions.region('us-central1').firestore.document('/users/{userId}')
    .onUpdate((change) => {
        console.log(change.before.data());
        console.log(change.after.data());
        if(change.before.data().imageUrl !== change.after.data().imageUrl ) {
            let batch = db.batch();
            return db
                    .collection('screams')
                    .where('userHandle', '==', change.before.data().handle)
                    .get()
                    .then((data) => {
                        data.forEach(doc => {
                            const scream = db.doc(`/screams/${doc.id}`);
                            batch.update(scream, { userImage: change.after.data().imageUrl });
                        })
                        return batch.commit();
                    })
        } else return true;
    })

exports.onScreamDelete = functions.region('us-central1').firestore.document('/screams/{screamId}')
.onDelete((snapshot, context) => {
    const screamId = context.params.screamId;
    const batch = db.batch();
    return db.collection('comments').where('screamId', '==', screamId).get()
        .then(data => {
            data.forEach(doc => {
                batch.delete(db.doc(`/comments/${doc.id}`))
            })
            return db.collection('likes').where('screamId', '==', screamId).get()
        })
        .then(data => {
            data.forEach(doc => {
                batch.delete(db.doc(`/likes/${doc.id}`))
            })
            return db.collection('notifications').where('screamId', '==', screamId)
        })
        .then(data => {
            data.forEach(doc => {
                batch.delete(db.doc(`/notifications/${doc.id}`))
            })
            return batch.commit();
        })
        .catch(err => {
            console.error(err); 
        })
})