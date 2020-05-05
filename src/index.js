const express = require('express');
const admin = require('firebase-admin');
const fs = require('fs');

const recipeRouter = require('./router/recipeRouter');
const bookRouter = require('./router/bookRouter');
const categoryRouter = require('./router/categoryRouter');

/** Initialize firebase admin */
const securedPath = "./fudbook-b3184-firebase-adminsdk-oj6pw-e9861767b6.json";
const serviceAccount = JSON.parse(fs.readFileSync(securedPath, 'utf8'));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://fudbook-b3184.firebaseio.com"
});

const dbRef = admin.database().ref();

/**
 * Initialize express instance
 */
const app = express();

/* Middleware setup */
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use('/', recipeRouter(admin, dbRef));
app.use('/', bookRouter(admin, dbRef));
app.use('/', categoryRouter());

/*******************************************************************************
 * Activates port
 ******************************************************************************/
app.listen(process.env.PORT, () => {
    console.log(`Server running on PORT:${process.env.PORT}.`);
    console.log(`Click the link to open the server` +
        ` https://localhost:${process.env.PORT}`);
})