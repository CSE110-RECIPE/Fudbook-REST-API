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

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

/** Initialize database */
const dbRef = admin.database().ref();

var recipe = undefined;
var ingredient = undefined;

dbRef.child('recipe').on('value', snapshot => {
    recipe = snapshot.val();

    dbRef.child('ingredient').once('value')
      .then(snapshot => {
        ingredient = snapshot.val();
    });
});

app.post('/filterRecipe', (req, res) => {
    /**
     * req.body
     * {
     *      exclude_filter: string[],
     *      include_filter: string[]
     * }
     */

    // the algorithm returns matching key value and element.

     var newRecipe = filter(ingredient, recipe,
        req.body.include_filter, req.body.exclude_filter);

    res.end(JSON.stringify(newRecipe));
});

app.post('/getRecipe', (req, res) => {
    /**
     * req.body
     * {
     *    recipes: recipe_id[]
     * }
     */

    var newRecipe = {};

    req.body.recipes.forEach(id => {
        newRecipe[`${id}`] = recipe[`${id}`]
    });

    res.end(JSON.stringify(newRecipe));
});


app.listen(process.env.PORT1, () => { 
  console.log(`Recipe microservice started on port: ${process.env.PORT1}`);
});