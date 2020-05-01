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

var recipeObj = undefined;
var ingredientObj = undefined;

/** Load recipe database */
dbRef.child('recipe').once('value').then(snapshot => {
    recipeObj = snapshot.val();
});

dbRef.child('ingredient').once('value').then(snapshot => {
    ingredientObj = snapshot.val();
});




/**
 * POST Request
 * Returns the feed recipes
 */
app.post('/filterRecipe', (req, res) => {
    // TODO: Implement data structure search
    // req.body.exclude_filter;
    // req.body.include_filter;

    res.end(JSON.stringify(recipeObj));
});

/**
 * POST Request
 * Returns the feed recipes
 */
app.post('/getRecipes', (req, res) => {
  // TODO: Implement data structure search
  /**
   * req.body
   * {
   *    recipes: recipe_id[]
   * }
   */

  res.end(JSON.stringify(recipeObj));
});

app.listen(process.env.PORT1, () => { 
  console.log(`Recipe microservice started on port: ${process.env.PORT1}`);
});