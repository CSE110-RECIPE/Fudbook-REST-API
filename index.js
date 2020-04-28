const express = require('express');
const admin = require('firebase-admin');
const fetch = require('node-fetch');

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
 * Returns the feed recipes
 * get the recipe of the day done by the algorithm
 */
app.get('/feed', (req, res) => {
    /**
     * req.body
     * {
     *      exclude_filter: string[],
     *      include_filter: string[],
     *      custom_token: string // optional and low priority
     * }
     */

    const options = {
        method: 'POST',
        header: {},
        body: {
            exclude_filter: req.body.exclude_filter,
            include_filter: req.body.include_filter,
            type: 'Feed'
        }
    };

    const getRecipe = async () => {
        try {
            const recipes = await fetch(`http://localhost:${process.env.PORT1}`,
                                        options)
                                    .then(fres => fres.json());

            // TODO: format data returning 
            
            res.send(JSON.stringify(recipes));
        } catch(error) {
            res.end(error.message);
        }
    };

    getRecipe();
});

/**
 * GET Request
 * Returns the explore recipes
 */
app.get('/explore', (req, res) => {
    //console.log(req.body.name);
    //res.end('');
    const options = {
        method: 'POST',
        header: {},
        body: {
            exclude_filter: req.body.exclude_filter,
            include_filter: req.body.include_filter,
            type: 'Explore'
        }
    };

    const getRecipe = async () => {
        try {
            const recipes = await fetch(`http://localhost:${process.env.PORT1}`,
                                        options)
                                    .then(fres => fres.json());

            // TODO: format data returning 
            
            res.send(JSON.stringify(recipes));
        } catch(error) {
            res.end(error.message);
        }
    };

    getRecipe();
});

/**
 * GET Request
 * Returns the recipes in the given book
 */
app.get('/book', (req, res) => {
    const options = {
        method: 'POST',
        header: {},
        body: {
            book_id: req.body.id
        }
    };

    const getBook = async () => {
        try {
            const books = await fetch(`http://localhost:${process.env.PORT2}`,
                                        options)
                                    .then(fres => fres.json());

            // TODO: format data returning 
            
            res.send(JSON.stringify(books));
        } catch(error) {
            res.end(error.message);
        }
    };

    getBook();
});

/**
 * GET Request
 * Returns the books in bookshelf
 */
app.get('/bookshelf', (req, res) => {
    const options = {
        method: 'POST',
        header: {},
        body: {
            bookshelf: req.body.name
        }
    };

    const getBookshelf = async () => {
        try {
            const bookshelf = await fetch(`http://localhost:${process.env.PORT3}`,
                                        options)
                                    .then(fres => fres.json());

            // TODO: format data returning 
            
            res.send(JSON.stringify(bookshelf));
        } catch(error) {
            res.end(error.message);
        }
    };

    getBookshelf();
});

/** Category server */

/**
 * POST Request
 * Creates a new recipe
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