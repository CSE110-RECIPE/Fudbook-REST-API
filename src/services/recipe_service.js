const express = require('express');
const admin = require('firebase-admin');
const recipeServiceRouter = require('./router/recipeRouter');
const fs = require('fs');

/** Initialize firebase admin */
const securedPath = './fudbook-5e7edf-firebase-adminsdk-20jr7-73e9a6e404.json';
const serviceAccount = JSON.parse(fs.readFileSync(securedPath, 'utf8'));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://fudbook-5e7edf.firebaseio.com"
});

/** Initialize app */
const app = express();

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

/** Initialize database */
const dbRef = admin.database().ref();

var container = {
  recipe: undefined,
  ingredient: undefined
};

dbRef.child('recipe').on('value', snapshot => {
    container.recipe = snapshot.val();

    dbRef.child('ingredient').once('value')
      .then(snapshot => {
        container.ingredient = snapshot.val();
    });
});

app.use('/', recipeServiceRouter(dbRef, container));

app.listen(process.env.PORT1, () => { 
  console.log(`Recipe microservice started on port: ${process.env.PORT1}`);
});