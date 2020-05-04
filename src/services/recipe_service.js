const express = require('express');
const admin = require('firebase-admin');
const fs = require('fs');

const recipeServiceRouter = require('./router/recipeRouter');

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
app.use(express.urlencoded());

/** Initialize database */
const dbRef = admin.database().ref();

dbRef.child('recipe').once('value')
  .then(snapshot => {
    const recipe = snapshot.val();

    dbRef.child('ingredient').once('value')
      .then(snapshot => {
        const ingredient = snapshot.val();

        app.use('/', recipeServiceRouter(recipe, ingredient));
    });
});

app.listen(process.env.PORT1, () => { 
  console.log(`Recipe microservice started on port: ${process.env.PORT1}`);
});