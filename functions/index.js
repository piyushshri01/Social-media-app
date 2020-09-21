const functions = require('firebase-functions');
const admin = require('firebase-admin');
const app = require('express')();
admin.initializeApp();

const firebaseConfig = {
    apiKey: "AIzaSyCKPgU63bdCzCwzV7RLzg_Gzun_b-CjPHg",
    authDomain: "socialapp-1249f.firebaseapp.com",
    databaseURL: "https://socialapp-1249f.firebaseio.com",
    projectId: "socialapp-1249f",
    storageBucket: "socialapp-1249f.appspot.com",
    messagingSenderId: "232345512570",
    appId: "1:232345512570:web:65582005455f20153a69c3",
    measurementId: "G-WREXF1VD13"
};


const firebase = require('firebase');
firebase.initializeApp(firebaseConfig);

const db = admin.firestore();

app.get('/screams', (req, res) => {
    db
        .collection('screams')
        .orderBy('createdAt', 'desc')
        .get()
        .then(data => {
            let screams = [];
            data.forEach(doc => {
                screams.push({
                    screamId: doc.id,
                    body: doc.data().body,
                    userHandle: doc.data().userHandle,
                    createdAt: doc.data().createdAt,
                });
            });
            return res.json(screams);
        })
        .catch(err => console.log(err))
})


app.post('/scream', (req,res) => {
    if(req.method !== 'POST'){
        return res.status(400).json({ error: 'Method not llowed '});
    }
    const newScream = {
        body: req.body.body,
        userHandle: req.body.userHandle,
        createdAt: new Date().toISOString()
    };

    db
        .collection('screams')
        .add(newScream)
        .then(doc => {
            res.json({ message: `document ${doc.id} created successfully`})
        })
        .catch(err => {
            res.status(500).json({ error: 'something went wrong'});
            console.log(err);
            
        })
})

// Sign Up route
app.post('/signup', (req, res) => {
    const newUser = {
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
        handle: req.body.handle
    };

    // TODO validate data
    let token, userId;
    db.doc(`/users/${newUser.handle}`).get()
        .then(doc => {
            if(doc.exists) {
                return res.status(400).json({ handle: 'this handle is already been taken'})
            }else {
                return firebase
                            .auth()
                            .createUserWithEmailAndPassword(newUser.email, newUser.password);
            }
        })
        .then(data => {
            userId = data.user.uid
            return data.user.getIdToken();
        })
        .then(idToken => {
            token = idToken
            const userCredentials = {
                handle: newUser.handle,
                email: newUser.email,
                createdAt: new Date().toISOString(),
                userId,
            };
            return db.doc(`/user/${newUser.handle}`).set(userCredentials)
        })
        .then(() => {
            return res.status(201).json({ token });
        })
        .catch(err => {
            console.error(err);
            if(err.code === 'auth/email-already-in-use'){
                return res.status(400).json({ email: 'Email is already in use'});
            }else{
                return res.status(500).json({ error: err.code })
            }
        })
});

exports.api = functions.https.onRequest(app); 