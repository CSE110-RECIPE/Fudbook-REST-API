const express = require('express');
const admin = require('firebase-admin');
const fetch = require('node-fetch');
const fs = require('fs');

/** Initialize firebase admin */
const securedPath = "./fudbook-b3184-firebase-adminsdk-oj6pw-e9861767b6.json";
const serviceAccount = JSON.parse(fs.readFileSync(securedPath, 'utf8'));

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
            type: 'feed'
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
            type: 'explore'
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
    /**
     * req.body
     * {
     *      bookId: string
     * }
     */

    const options = {
        method: 'POST',
        header: {},
        body: {
            book_id: req.body.bookId
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
    /**
     * req.body
     * {
     *      bookshelfId: string
     * }
     */

    const options = {
        method: 'POST',
        header: {},
        body: {
            bookshelf: req.body.bookshelfId
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
app.post('/create', (req, res) => {
    /**
     * req.body
     * {
     *      "name": string,
     *      "ingredients": string[],
     *      "categories": string[],
     *      "steps": string[],
     *      "image": string,
     *      "author": string
     * }
     */

    res.end(`Post request: ${req.body.name}`);
})

/**
 * PUT Request
 * Edit an existing recipe in recipe database
 */
app.put('/edit', (req, res) => {
    /**
     * req.body
     * {
     *      "recipeId": string
     *      "name": string,
     *      "ingredients": string[],
     *      "categories": string[],
     *      "steps": string[],
     *      "image": string,
     *      "editor": string
     * }
     */
    res.end(`Recipe ${req.body.name} edited`);
});

/**
 * DELETE Request
 * Delete an existing recipe in recipe database
 */
app.delete('/delete', (req, res) => {
    /**
     * req.body
     * {
     *      "recipeId": string
     * }
     */
    res.end(`Recipe ${req.body.name} deleted`);
});

/*******************************************************************************
 * Activates port
 ******************************************************************************/
app.listen(process.env.PORT, () => {
    console.log(`Server running on PORT:${process.env.PORT}.`);
    console.log(`Click the link to open the server` +
        ` https://localhost:${process.env.PORT}`);
})