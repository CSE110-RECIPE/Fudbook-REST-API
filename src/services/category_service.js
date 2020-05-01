const express = require('express');
const admin = require('firebase-admin');
const fs = require('fs');

/** Initialize firebase admin */
const securedPath = './fudbook-b3184-firebase-adminsdk-oj6pw-e9861767b6.json';
const serviceAccount = JSON.parse(fs.readFileSync(securedPath, 'utf8'));

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







/**
 * POST Request
 * Returns the feed recipes
 */
app.post('/', (req, res) => {
    // TODO: Implement data structure search
    /**
     * req.body
     * {
     *    category: category_name
     * }
     */
    res.end(JSON.stringify(catObj));
}) 

app.listen(process.env.PORT3, () => { 
  console.log(`Category microservice started on port: ${process.env.PORT3}`);
});