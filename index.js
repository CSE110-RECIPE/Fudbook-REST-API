const express = require('express');
const admin = require('firebase-admin');

/** Initialize firebase admin */
const securedPath = "./fudbook-b3184-firebase-adminsdk-oj6pw-e9861767b6.json";
var serviceAccount = require(securedPath);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://fudbook-b3184.firebaseio.com"
});


/**
 * Initialize express instance
 */
const app = express();

/* Middleware setup */
app.use(express.json());
app.use(express.urlencoded());

/*******************************************************************************
 * HTTP Requests
 * ---------------------------------------------------------------------------
 * GET
 * POST
 * PUT
 * DELETE
 ******************************************************************************/
/**
 * GET Request
 */
app.get('/', (req, res) => {
    console.log(req.body.name);
    res.end('<h1>This is a GET response</h1>');
});

/**
 * POST Request
 */
app.post('/', (req, res) => {
    console.log(req.body.name);
    res.end(`Post request: ${req.body.name}`);
})

/*******************************************************************************
 * Activates port
 ******************************************************************************/
app.listen(process.env.PORT, () => {
    console.log(`Server running on PORT:${process.env.PORT}.`);
    console.log(`Click the link to open the server` +
        ` https://localhost:${process.env.PORT}`);
})