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

var recipeObj = undefined;

/** Load recipe database */
dbRef.child('recipe').once('value').then(snapshot => {
    recipeObj = snapshot.val();
});

/**
 * POST Request
 * Returns the feed recipes
 */
app.post('/', (req, res) => {
    
    res.end(JSON.stringify(recipeObj));
}) 

app.listen(process.env.PORT1, () => { 
  console.log("Recipe microservice started.");
});