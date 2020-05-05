const express = require('express');
const admin = require('firebase-admin');
const fs = require('fs');

const categoryRouter = require('./router/categoryRouter');

/** Initialize firebase admin */
const securedPath = './fudbook-b3184-firebase-adminsdk-oj6pw-e9861767b6.json';
const serviceAccount = JSON.parse(fs.readFileSync(securedPath, 'utf8'));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://fudbook-b3184.firebaseio.com"
});

/** Initialize app */
const app = express();

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

/** Initialize database */
const dbRef = admin.database().ref();

/** Load recipe database */
dbRef.child('category').once('value').then(snapshot => {
    const category = snapshot.val();

    /** Load Router */
    app.use('/', categoryRouter(category));
});

app.listen(process.env.PORT3, () => { 
  console.log(`Category microservice started on port: ${process.env.PORT3}`);
});