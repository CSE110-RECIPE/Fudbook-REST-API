const express = require('express');
const admin = require('firebase-admin');

/** Initialize firebase admin */
const securedPath = "../fudbook-b3184-firebase-adminsdk-oj6pw-e9861767b6.json";
var serviceAccount = require(securedPath);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://fudbook-b3184.firebaseio.com"
});

/** Initialize app */
const app = express();

/** Initialize database */
const dbRef = admin.database().ref();

var catObj = undefined;

/** Load recipe database */
dbRef.child('category').once('value').then(snapshot => {
    catObj = snapshot.val();
});

/** Initialize data structure */

/**
 * POST Request
 * Returns the feed recipes
 */
app.post('/', (req, res) => {
    // TODO: Implement data structure search
    // req.body.exclude_filter;
    // req.body.include_filter;
    res.end(JSON.stringify(catObj));
}) 

app.listen(process.env.PORT1, () => { 
  console.log("Category microservice started.");
});