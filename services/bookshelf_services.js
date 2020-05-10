const express = require('express')
const admin = require('firebase-admin')

const securedPath = "../fudbook-b3184-firebase-adminsdk-oj6pw-e9861767b6.json";
var serviceAccount = require(securedPath);

admin.initiaizeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: "https://fudbook=b3184.firebaseio.com"
});

/** Initialize app */
const app = express();

/** Initialize database */
const dbRef = admin.database().ref();

var shelfObj = undefined;

//** Load bookshelf database */
dbRef.child('bookshelf').once('value').then(snapshot => {
	shelfObj = snapshot.val();
});

app.post('/', (req,res) => {
	res.end(JSON.stringify(shelfObj));
})

//listen
