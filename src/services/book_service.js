/**
 * Access bookshelf and returns list of books
 */
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

/** Load recipe database */
var bookObj = undefined;

dbRef.child('book').once('value').then(snapshot => {
    bookObj = snapshot.val();
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
     *    bookshelf: book_id[]
     * }
     */
    res.end(JSON.stringify(bookObj));
}) 

app.listen(process.env.PORT2, () => { 
  console.log(`Book microservice started on port: ${process.env.PORT2}`);
});