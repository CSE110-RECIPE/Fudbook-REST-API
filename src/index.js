const express = require('express');
const admin = require('firebase-admin');
const fs = require('fs');
const request = require('./js/request');

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

    request.service(options, process.env.PORT1, res, 'filterRecipe');
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

    request.service(options, process.env.PORT1, res, 'filterRecipe');
});

/**
 * GET Request
 * Returns the recipes in the given book
 */
app.get('/book', (req, res) => {
    /**
     * req.body
     * {
     *      recipes: recipe_id[]
     * }
     */

    const options = {
        method: 'POST',
        header: {},
        body: {
            recipes: req.body.recipes
        }
    };

    request.service(options, process.env.PORT1, res, 'getRecipes');
});

/**
 * GET Request
 * Returns the books in bookshelf
 */
app.get('/bookshelf', (req, res) => {
    /**
     * req.body
     * {
     *      bookshelf: book_id[]
     * }
     */

    const options = {
        method: 'POST',
        header: {},
        body: {
            bookshelf: req.body.bookshelf
        }
    };

    request.service(options, process.env.PORT2, res);
});

/** Category server */

/**
 * POST Request
 * Creates a new recipe
 */
app.post('/createRecipe', (req, res) => {
    /**
     * req.body
     * {
     *      "uid": string,
     *      "name": string,
     *      "ingredients": string[],
     *      "categories": string[],
     *      "steps": string[],
     *      "image": string,
     *      "author": string,
     *      "editor": string
     * }
     */

    /**
     * TODO:
     * Add ingredient.json
     * Add the recipe_id to each corresponding ingredients
     */

    admin.auth().getUser(req.body.uid)
        .then(userRecord => {
            const newRecipeKey = dbRef.child('recipe').push().key;

            dbRef.child('recipe/' + newRecipeKey ).set(req.body);

            dbRef.child('book/' + userRecord.my_book + '/recipes').set({
                newRecipeKey: newRecipeKey
            });

            res.end(`User created a recipe.`);
        })
        .catch(err => {
            console.log(err.message);
            res.end(`POST request create recipe: User authentication failed.`);
        });
});

/**
 * POST request
 * Creates new book
 */
app.post('/createBook', (req, res) => {
    /**
     * req.body
     * {
     *      name: string,
     *      recipes: string[],
     *      uid: string,
     *      default: boolean
     * 
     * }
     */

    admin.auth().getUser(req.body.uid)
        .then( val => {

            const newBookKey = dbRef.child('book').push().key;

            dbRef.child('book/' + newBookKey).set({
                name: req.body.name,
                recipes: req.body.recipes,
                author: req.body.uid,
                default: false
            });

            res.end(`Book created.`);
        })
        .catch( err => {
            res.end(`POST request create book: User authentication failed.`);
        });    
})

/**
 * POST request
 * Setup favorite and personal book for new user
 * PS: The frontend should check if the user is new
 */
app.post('/createUser', (req, res) => {
    /**
     * req.body 
     * {
     *      "uid": string
     * }
     */

    admin.auth().getUser(req.body.uid)
        .then(val => {
            const newFavoriteKey = dbRef.child('book').push().key;
            const newPersonalBookKey = dbRef.child('book').push().key;

            dbRef.child('book/' + newFavoriteKey).set({
                name: "Favorite",
                recipes: [],
                author: req.body.uid,
                default: true
            });

            dbRef.child('book/' + newPersonalBookKey).set({
                name: "My Book",
                recipes: [],
                author: req.body.uid,
                default: true
            });
        
            admin.auth().updateUser(req.body.uid, {
                favorite_book: newFavoriteKey,
                my_book: newPersonalBookKey
            })
                .catch(err => {
                    console.log(err.message);
                    res.end(`POST request create user: User update failed.`);
                });
        
            res.end(`Your bookshelf has been setup.`);
        })
        .catch(err => {
            console.log(err.message);
            res.end(`POST request create user: User authentication failed.`);
        });
})

/**
 * PUT Request
 * Edit an existing recipe in recipe database
 */
app.put('/edit', (req, res) => {
    /**
     * req.body
     * {
     *      "uid": string,
     *      "recipe_id": string,
     *      "name": string,
     *      "ingredients": string[],
     *      "categories": string[],
     *      "steps": string[],
     *      "image": string,
     *      "editor": string
     * }
     */

    admin.auth().getUser(req.body.uid)
        .then(val => {
            var updates = {};

            if (req.body.name !== '')
                updates[req.body.recipe_id + '/name'] = req.body.name;

            if (req.body.ingredients.length !== 0 )
                updates[req.body.recipe_id + '/ingredients'] = req.body.ingredients;

            if (req.body.categories.length !== 0 )
                updates[req.body.recipe_id + '/categories'] = req.body.categories;
            
            if (req.body.steps.length !== 0 )
                updates[req.body.recipe_id + '/steps'] = req.body.steps;

            if (req.body.image !== '')
                updates[req.body.recipe_id + '/image'] = req.body.image;

            if (req.body.editor !== '')
                updates[req.body.recipe_id + '/editor'] = req.body.editor;

            dbRef.child('recipe').update(updates);

            res.end(JSON.stringify(updates));
        })
        .catch(err => {
            console.log(err.message);
            res.end(`PUT request edit: User authentication failed.`);
        })
    
});

/**
 * DELETE Request
 * Delete an existing recipe in recipe database
 */
app.delete('/delete', (req, res) => {
    /**
     * req.body
     * {
     *      "uid": string
     *      "recipe_id": string
     * }
     */
    
    /**
     * TODO:
     * Priority high
     * 
     * Issue:
     * If you delete a recipe then the recipe should be removed in 
     * all books it was in.
     * 
     * Resolution:
     * 1. Iterate through all books to remove recipe from each book
     *    Catch: bad run time.
     * 2. Add pointers in recipes, pointing back to book 
     *    Catch: bad space complexity
     * 
     * Resolved:
     * Lazy deletion
     */
    dbRef.child('recipe').child(req.body.recipe_id).remove();

    res.end(`Recipe ${req.body.recipe_id} deleted`);
});

/*******************************************************************************
 * Activates port
 ******************************************************************************/
app.listen(process.env.PORT, () => {
    console.log(`Server running on PORT:${process.env.PORT}.`);
    console.log(`Click the link to open the server` +
        ` https://localhost:${process.env.PORT}`);
})